import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { aiAgents, aiTasks } from '../db/schema';
import type { AgentCode, SupportedCountry, TaskStatus } from '../types';

function now(): string {
  return new Date().toISOString();
}

export function createTask(
  agentCode: AgentCode,
  countryCode: SupportedCountry,
  type: string,
  payload?: Record<string, unknown>
): number {
  const db = getDb();
  const timestamp = now();
  const agent = db.select().from(aiAgents).where(eq(aiAgents.code, agentCode)).get();

  const result = db
    .insert(aiTasks)
    .values({
      agentId: agent?.id ?? null,
      agentCode,
      countryCode,
      type,
      status: 'running',
      payload: payload ?? null,
      startedAt: timestamp,
      createdAt: timestamp,
    })
    .run();

  db.update(aiAgents)
    .set({ status: 'running', updatedAt: timestamp })
    .where(eq(aiAgents.code, agentCode))
    .run();

  return Number(result.lastInsertRowid);
}

export function completeTask(
  taskId: number,
  agentCode: AgentCode,
  result?: Record<string, unknown>
): void {
  const db = getDb();
  const timestamp = now();

  db.update(aiTasks)
    .set({ status: 'completed', result: result ?? null, completedAt: timestamp })
    .where(eq(aiTasks.id, taskId))
    .run();

  db.update(aiAgents)
    .set({ status: 'idle', lastRunAt: timestamp, updatedAt: timestamp })
    .where(eq(aiAgents.code, agentCode))
    .run();
}

export function failTask(taskId: number, agentCode: AgentCode, error: string): void {
  const db = getDb();
  const timestamp = now();

  db.update(aiTasks)
    .set({ status: 'failed', error, completedAt: timestamp })
    .where(eq(aiTasks.id, taskId))
    .run();

  db.update(aiAgents)
    .set({ status: 'error', lastRunAt: timestamp, updatedAt: timestamp })
    .where(eq(aiAgents.code, agentCode))
    .run();
}

export function updateAgentStatus(agentCode: AgentCode, status: string): void {
  const db = getDb();
  db.update(aiAgents)
    .set({ status, updatedAt: now() })
    .where(eq(aiAgents.code, agentCode))
    .run();
}

export function isAgentEnabled(agentCode: AgentCode): boolean {
  const db = getDb();
  const agent = db.select().from(aiAgents).where(eq(aiAgents.code, agentCode)).get();
  return agent?.enabled ?? true;
}

export function getTaskStatus(taskId: number): TaskStatus | undefined {
  const db = getDb();
  const task = db.select().from(aiTasks).where(eq(aiTasks.id, taskId)).get();
  return task?.status as TaskStatus | undefined;
}
