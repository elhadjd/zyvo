import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { conversionEvents } from '../db/schema';
import type { ConversionAction } from './types';
import type { SupportedCountry } from '../types';

function now(): string {
  return new Date().toISOString();
}

export interface ConversionEventInput {
  userAction: ConversionAction;
  page: string;
  country: SupportedCountry;
  source?: string;
  metadata?: Record<string, unknown>;
}

export function trackConversion(event: ConversionEventInput): number {
  const db = getDb();
  const result = db
    .insert(conversionEvents)
    .values({
      userAction: event.userAction,
      page: event.page,
      country: event.country,
      source: event.source ?? 'direct',
      metadata: event.metadata ?? null,
      createdAt: now(),
    })
    .run();

  return Number(result.lastInsertRowid);
}

export function getConversionEvents(country?: SupportedCountry, days = 30) {
  const db = getDb();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  let rows = db.select().from(conversionEvents).all();
  if (country) rows = rows.filter((r) => r.country === country);
  return rows.filter((r) => new Date(r.createdAt) >= cutoff);
}

export function getConversionSummary(country?: SupportedCountry) {
  const events = getConversionEvents(country);
  const byAction = new Map<string, number>();

  for (const e of events) {
    byAction.set(e.userAction, (byAction.get(e.userAction) ?? 0) + 1);
  }

  return {
    total: events.length,
    byAction: Object.fromEntries(byAction),
    recent: events.slice(0, 10),
  };
}

export function getConversionsByPage(country?: SupportedCountry) {
  const events = getConversionEvents(country);
  const byPage = new Map<string, number>();

  for (const e of events) {
    byPage.set(e.page, (byPage.get(e.page) ?? 0) + 1);
  }

  return [...byPage.entries()]
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count);
}
