import { eq } from 'drizzle-orm';
import { getDb } from '../../db';
import { searchConsoleMetrics } from '../../db/schema';
import type { SupportedCountry } from '../types';
import type { SearchConsoleRow } from '../types';
import { GSC_SCOPE, getGoogleAccessToken } from './google-auth';

function now(): string {
  return new Date().toISOString();
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

const GSC_SITE_URL = process.env.GSC_SITE_URL ?? 'https://www.zyvoerp.com';

export function isSearchConsoleConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
}

export function clearSearchConsoleMetrics(countryCode?: SupportedCountry): number {
  const db = getDb();
  const rows = countryCode
    ? db.select().from(searchConsoleMetrics).all().filter((r) => r.country === countryCode)
    : db.select().from(searchConsoleMetrics).all();

  for (const row of rows) {
    db.delete(searchConsoleMetrics).where(eq(searchConsoleMetrics.id, row.id)).run();
  }

  return rows.length;
}

export function saveSearchConsoleMetrics(rows: SearchConsoleRow[]): number {
  const db = getDb();
  const timestamp = now();
  let saved = 0;

  for (const row of rows) {
    db.insert(searchConsoleMetrics)
      .values({
        country: row.country,
        pageUrl: row.pageUrl,
        keyword: row.keyword,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
        date: row.date,
        createdAt: timestamp,
      })
      .run();
    saved++;
  }

  return saved;
}

export async function fetchSearchConsoleData(
  countryCode: SupportedCountry,
  startDate?: string,
  endDate?: string
): Promise<SearchConsoleRow[]> {
  if (!isSearchConsoleConfigured()) {
    throw new Error('GSC não configurado. Defina GOOGLE_SERVICE_ACCOUNT_JSON no .env');
  }

  const token = await getGoogleAccessToken([GSC_SCOPE]);
  const siteUrl = encodeURIComponent(GSC_SITE_URL);
  const start = startDate ?? getDateDaysAgo(28);
  const end = endDate ?? today();

  const response = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        startDate: start,
        endDate: end,
        dimensions: ['page', 'query'],
        rowLimit: 500,
        dimensionFilterGroups: [
          {
            filters: [
              { dimension: 'page', operator: 'contains', expression: `/${countryCode}/` },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(30_000),
    }
  );

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`GSC API erro ${response.status}: ${body.slice(0, 400)}`);
  }

  const data = JSON.parse(body) as {
    rows?: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }[];
  };

  return (data.rows ?? []).map((row) => ({
    country: countryCode,
    pageUrl: row.keys[0] ?? '/',
    keyword: row.keys[1] ?? '',
    clicks: row.clicks,
    impressions: row.impressions,
    ctr: row.ctr,
    position: row.position,
    date: end,
  }));
}

function getDateDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export function getSearchConsoleMetrics(country?: SupportedCountry, days = 30) {
  const db = getDb();
  const cutoff = getDateDaysAgo(days);
  let rows = db.select().from(searchConsoleMetrics).all();

  if (country) rows = rows.filter((r) => r.country === country);
  return rows.filter((r) => r.date >= cutoff);
}

export function getTopKeywords(country: SupportedCountry, limit = 10) {
  const metrics = getSearchConsoleMetrics(country);
  const byKeyword = new Map<string, { clicks: number; impressions: number; position: number }>();

  for (const m of metrics) {
    const existing = byKeyword.get(m.keyword) ?? { clicks: 0, impressions: 0, position: 0 };
    byKeyword.set(m.keyword, {
      clicks: existing.clicks + m.clicks,
      impressions: existing.impressions + m.impressions,
      position: (existing.position + m.position) / 2,
    });
  }

  return [...byKeyword.entries()]
    .map(([keyword, data]) => ({ keyword, ...data }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, limit);
}

export function getTopPages(country: SupportedCountry, limit = 10) {
  const metrics = getSearchConsoleMetrics(country);
  const byPage = new Map<string, { clicks: number; impressions: number }>();

  for (const m of metrics) {
    const existing = byPage.get(m.pageUrl) ?? { clicks: 0, impressions: 0 };
    byPage.set(m.pageUrl, {
      clicks: existing.clicks + m.clicks,
      impressions: existing.impressions + m.impressions,
    });
  }

  return [...byPage.entries()]
    .map(([pageUrl, data]) => ({ pageUrl, ...data }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, limit);
}
