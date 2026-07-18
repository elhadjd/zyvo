import { getDb } from '../db';
import { researchLogs } from '../db/schema';
import type { SupportedCountry } from '../types';

export function logResearchEvent(
  countryCode: SupportedCountry,
  module: string,
  action: string,
  message: string,
  options: {
    level?: 'info' | 'warn' | 'error';
    metadata?: Record<string, unknown>;
  } = {}
): void {
  try {
    const db = getDb();
    db.insert(researchLogs)
      .values({
        countryCode,
        module,
        action,
        message,
        level: options.level ?? 'info',
        metadata: options.metadata ?? null,
        createdAt: new Date().toISOString(),
      })
      .run();
  } catch {
    console.error('[ResearchEngine]', module, action, message);
  }
}

export function getResearchLogs(countryCode?: string, limit = 100) {
  const db = getDb();
  let logs = db.select().from(researchLogs).all();
  if (countryCode) logs = logs.filter((l) => l.countryCode === countryCode);
  return logs
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}
