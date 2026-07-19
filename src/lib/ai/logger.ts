import { getDb } from './db';
import { aiLogs } from './db/schema';
import type { AgentCode } from './types';

function now(): string {
  return new Date().toISOString();
}

export function logAiEvent(
  agentCode: AgentCode | string,
  message: string,
  options: {
    countryCode?: string;
    level?: 'info' | 'warn' | 'error';
    metadata?: Record<string, unknown>;
  } = {}
): void {
  try {
    const db = getDb();
    db.insert(aiLogs)
      .values({
        agentCode,
        countryCode: options.countryCode ?? null,
        level: options.level ?? 'info',
        message,
        metadata: options.metadata ?? null,
        createdAt: now(),
      })
      .run();
  } catch (error) {
    console.error('[AI Log]', agentCode, message, error);
  }
}
