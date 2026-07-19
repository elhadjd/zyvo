import { desc, eq, sql } from 'drizzle-orm';
import { getDb } from '../db';
import { aiJobs } from '../db/schema';
import { logAiEvent } from '../logger';
import type { JobStatus, JobType, SupportedCountry } from '../types';

function now(): string {
  return new Date().toISOString();
}

export interface JobPayload {
  topic?: string;
  articleId?: number;
  countryCode: SupportedCountry;
  saveAsDraft?: boolean;
}

export function enqueueJob(
  type: JobType,
  countryCode: SupportedCountry,
  payload: Omit<JobPayload, 'countryCode'> = {},
  scheduledAt?: string
): number {
  const db = getDb();
  const result = db
    .insert(aiJobs)
    .values({
      type,
      countryCode,
      status: 'pending',
      payload: { ...payload, countryCode },
      attempts: 0,
      maxAttempts: 3,
      scheduledAt: scheduledAt ?? now(),
      createdAt: now(),
    })
    .run();

  const jobId = Number(result.lastInsertRowid);
  logAiEvent('publisher', `Job enfileirado: ${type}`, {
    countryCode,
    metadata: { jobId, type },
  });
  return jobId;
}

export function getNextPendingJob(): (typeof aiJobs.$inferSelect) | null {
  const db = getDb();
  const jobs = db
    .select()
    .from(aiJobs)
    .where(eq(aiJobs.status, 'pending'))
    .orderBy(aiJobs.scheduledAt)
    .limit(1)
    .all();

  return jobs[0] ?? null;
}

export function markJobProcessing(jobId: number): void {
  const db = getDb();
  const current = db.select().from(aiJobs).where(eq(aiJobs.id, jobId)).get();
  db.update(aiJobs)
    .set({
      status: 'processing',
      startedAt: now(),
      attempts: (current?.attempts ?? 0) + 1,
    })
    .where(eq(aiJobs.id, jobId))
    .run();
}

export function completeJob(jobId: number, result: Record<string, unknown>): void {
  const db = getDb();
  db.update(aiJobs)
    .set({ status: 'completed', result, completedAt: now() })
    .where(eq(aiJobs.id, jobId))
    .run();
}

export function failJob(jobId: number, error: string, retry = true): void {
  const db = getDb();
  const job = db.select().from(aiJobs).where(eq(aiJobs.id, jobId)).get();
  if (!job) return;

  const shouldRetry = retry && job.attempts < job.maxAttempts;
  db.update(aiJobs)
    .set({
      status: shouldRetry ? 'pending' : 'failed',
      error,
      completedAt: shouldRetry ? null : now(),
    })
    .where(eq(aiJobs.id, jobId))
    .run();
}

export function getJobsByStatus(status?: JobStatus, countryCode?: string, limit = 50) {
  const db = getDb();
  let jobs = db.select().from(aiJobs).orderBy(desc(aiJobs.createdAt)).limit(limit).all();
  if (status) jobs = jobs.filter((j) => j.status === status);
  if (countryCode) jobs = jobs.filter((j) => j.countryCode === countryCode);
  return jobs;
}

export function getPendingJobCount(): number {
  const db = getDb();
  return db
    .select()
    .from(aiJobs)
    .all()
    .filter((j) => j.status === 'pending' || j.status === 'retrying').length;
}
