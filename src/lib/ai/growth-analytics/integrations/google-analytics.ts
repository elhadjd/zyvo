import { eq } from 'drizzle-orm';
import { getDb } from '../../db';
import { visitorMetrics } from '../../db/schema';
import type { SupportedCountry } from '../../types';
import type { VisitorMetricRow } from '../types';
import { GA4_SCOPE, getGoogleAccessToken } from './google-auth';

function now(): string {
  return new Date().toISOString();
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;

export function isGoogleAnalyticsConfigured(): boolean {
  return Boolean(GA4_PROPERTY_ID && process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
}

export function clearVisitorMetrics(countryCode?: SupportedCountry): number {
  const db = getDb();
  const rows = countryCode
    ? db.select().from(visitorMetrics).all().filter((r) => r.country === countryCode)
    : db.select().from(visitorMetrics).all();

  for (const row of rows) {
    db.delete(visitorMetrics).where(eq(visitorMetrics.id, row.id)).run();
  }

  return rows.length;
}

export function saveVisitorMetrics(rows: VisitorMetricRow[]): number {
  const db = getDb();
  const timestamp = now();
  let saved = 0;

  for (const row of rows) {
    db.insert(visitorMetrics)
      .values({
        country: row.country,
        pageUrl: row.pageUrl,
        users: row.users,
        sessions: row.sessions,
        avgTimeOnPage: row.avgTimeOnPage,
        bounceRate: row.bounceRate,
        landingPage: row.landingPage ?? null,
        conversions: row.conversions,
        date: row.date,
        createdAt: timestamp,
      })
      .run();
    saved++;
  }

  return saved;
}

export async function fetchGoogleAnalyticsData(
  countryCode: SupportedCountry
): Promise<VisitorMetricRow[]> {
  if (!isGoogleAnalyticsConfigured()) {
    throw new Error(
      'GA4 não configurado. Defina GA4_PROPERTY_ID e GOOGLE_SERVICE_ACCOUNT_JSON no .env'
    );
  }

  const token = await getGoogleAccessToken([GA4_SCOPE]);
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
          { name: 'conversions' },
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: { matchType: 'BEGINS_WITH', value: `/${countryCode}/` },
          },
        },
        limit: 250,
      }),
      signal: AbortSignal.timeout(30_000),
    }
  );

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`GA4 API erro ${response.status}: ${body.slice(0, 400)}`);
  }

  const data = JSON.parse(body) as {
    rows?: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[];
  };

  const date = today();
  return (data.rows ?? []).map((row) => ({
    country: countryCode,
    pageUrl: row.dimensionValues[0]?.value ?? '/',
    users: parseInt(row.metricValues[0]?.value ?? '0', 10),
    sessions: parseInt(row.metricValues[1]?.value ?? '0', 10),
    avgTimeOnPage: parseFloat(row.metricValues[2]?.value ?? '0'),
    bounceRate: parseFloat(row.metricValues[3]?.value ?? '0'),
    conversions: parseInt(row.metricValues[4]?.value ?? '0', 10),
    date,
  }));
}

export function getVisitorMetrics(country?: SupportedCountry, days = 30) {
  const db = getDb();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split('T')[0];

  let rows = db.select().from(visitorMetrics).all();
  if (country) rows = rows.filter((r) => r.country === country);
  return rows.filter((r) => r.date >= cutoffStr);
}

export function getTrafficSummary(country?: SupportedCountry) {
  const metrics = getVisitorMetrics(country);
  const totals = metrics.reduce(
    (acc, m) => ({
      users: acc.users + m.users,
      sessions: acc.sessions + m.sessions,
      conversions: acc.conversions + m.conversions,
    }),
    { users: 0, sessions: 0, conversions: 0 }
  );

  const byCountry = new Map<string, number>();
  for (const m of metrics) {
    byCountry.set(m.country, (byCountry.get(m.country) ?? 0) + m.users);
  }

  const topCountry = [...byCountry.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  return { ...totals, topCountry };
}
