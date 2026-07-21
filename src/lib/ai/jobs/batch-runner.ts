import { asc, desc, eq } from 'drizzle-orm';
import { runFullPipeline } from '../agents/orchestrator';
import { getDb } from '../db';
import { aiBatchRuns, aiJobs } from '../db/schema';
import { seedDatabase } from '../db/seed';
import { SITE_AI_COUNTRIES } from '../country-labels';
import { logAiEvent } from '../logger';
import { parseArticlesPerCountry } from './article-count';
import { resolveBatchTopics } from '../research-engine/topic-resolver';
import { topicFingerprint } from '../research-engine/topic-dedup';
import type { AgentCode, SupportedCountry } from '../types';

const PIPELINE_STAGES: AgentCode[] = [
  'research',
  'knowledge_organizer',
  'content_writer',
  'seo_optimizer',
  'fact_checker',
  'editor',
  'publisher',
];

function now(): string {
  return new Date().toISOString();
}

export interface BatchRunConfig {
  countryCodes: SupportedCountry[];
  articlesPerCountry: number;
  topic?: string;
  publishNow: boolean;
  recentDays: number;
}

export interface BatchJobView {
  jobId: number;
  countryCode: SupportedCountry;
  topic: string;
  status: string;
  success?: boolean;
  articleId?: number;
  error?: string;
}

export interface BatchStatusView {
  id: number;
  status: string;
  phase: string;
  totalJobs: number;
  completedJobs: number;
  succeededJobs: number;
  failedJobs: number;
  jobs: BatchJobView[];
  error?: string | null;
  createdAt: string;
  completedAt?: string | null;
}

function pipelineSucceeded(stages: Record<string, { success?: boolean }> | undefined): boolean {
  if (!stages) return false;
  return Object.values(stages).every((stage) => !stage || stage.success !== false);
}

export function createBatchRun(options: {
  countryCodes?: SupportedCountry[];
  articlesPerCountry?: number;
  topic?: string;
  publishNow?: boolean;
  recentDays?: number;
  siteCountriesOnly?: boolean;
}): number {
  seedDatabase();

  const countryCodes = (
    options.countryCodes?.length
      ? options.countryCodes
      : options.siteCountriesOnly
        ? [...SITE_AI_COUNTRIES]
        : [...SITE_AI_COUNTRIES]
  ) as SupportedCountry[];

  const config: BatchRunConfig = {
    countryCodes,
    articlesPerCountry: parseArticlesPerCountry(options.articlesPerCountry),
    topic: options.topic?.trim() || undefined,
    publishNow: options.publishNow ?? true,
    recentDays: options.recentDays ?? 14,
  };

  const db = getDb();
  const result = db
    .insert(aiBatchRuns)
    .values({
      status: 'pending',
      phase: 'prepare',
      config: config as unknown as Record<string, unknown>,
      preparedCountries: [],
      totalJobs: 0,
      completedJobs: 0,
      succeededJobs: 0,
      failedJobs: 0,
      createdAt: now(),
    })
    .run();

  const batchId = Number(result.lastInsertRowid);
  logAiEvent('publisher', `Batch ${batchId} criado: ${countryCodes.join(', ')}`, {
    metadata: { batchId, ...config },
  });
  return batchId;
}

function getBatchConfig(batch: { config: Record<string, unknown> | null }): BatchRunConfig {
  return batch.config as unknown as BatchRunConfig;
}

function getBatch(batchId: number) {
  const db = getDb();
  return db.select().from(aiBatchRuns).where(eq(aiBatchRuns.id, batchId)).get();
}

function getBatchJobs(batchId: number) {
  const db = getDb();
  return db
    .select()
    .from(aiJobs)
    .where(eq(aiJobs.batchId, batchId))
    .orderBy(asc(aiJobs.id))
    .all();
}

export function getBatchStatus(batchId: number): BatchStatusView | null {
  const batch = getBatch(batchId);
  if (!batch) return null;

  const jobs = getBatchJobs(batchId).map((job) => {
    const payload = (job.payload ?? {}) as { topic?: string };
    const result = (job.result ?? {}) as { articleId?: number; stages?: Record<string, { success?: boolean }> };
    return {
      jobId: job.id,
      countryCode: job.countryCode as SupportedCountry,
      topic: payload.topic ?? '',
      status: job.status,
      success: job.status === 'completed' ? pipelineSucceeded(result.stages) : undefined,
      articleId: result.articleId,
      error: job.error ?? undefined,
    };
  });

  return {
    id: batch.id,
    status: batch.status,
    phase: batch.phase,
    totalJobs: batch.totalJobs,
    completedJobs: batch.completedJobs,
    succeededJobs: batch.succeededJobs,
    failedJobs: batch.failedJobs,
    jobs,
    error: batch.error,
    createdAt: batch.createdAt,
    completedAt: batch.completedAt,
  };
}

async function prepareNextCountry(batchId: number): Promise<boolean> {
  const batch = getBatch(batchId);
  if (!batch) return false;

  const config = getBatchConfig(batch);
  const prepared = batch.preparedCountries ?? [];
  const nextCountry = config.countryCodes.find((code) => !prepared.includes(code));
  if (!nextCountry) return false;

  const topics = await resolveBatchTopics(nextCountry, config.articlesPerCountry, {
    recentDays: config.recentDays,
    fixedTopic: config.topic,
  });

  const db = getDb();
  const timestamp = now();

  for (const item of topics) {
    const idempotencyKey = topicFingerprint(nextCountry, item.topic);
    const existing = db
      .select()
      .from(aiJobs)
      .where(eq(aiJobs.batchId, batchId))
      .all()
      .find((job) => job.idempotencyKey === idempotencyKey);

    if (existing) continue;

    db.insert(aiJobs)
      .values({
        type: 'full_pipeline',
        countryCode: nextCountry,
        batchId,
        idempotencyKey,
        status: 'pending',
        payload: {
          countryCode: nextCountry,
          topic: item.topic,
          targetCategory: item.category,
          publishNow: config.publishNow,
          saveAsDraft: !config.publishNow,
          skipTopicDiscovery: true,
          stages: config.publishNow ? PIPELINE_STAGES : PIPELINE_STAGES.filter((s) => s !== 'publisher'),
        },
        attempts: 0,
        maxAttempts: 1,
        scheduledAt: timestamp,
        createdAt: timestamp,
      })
      .run();
  }

  const updatedPrepared = [...prepared, nextCountry];
  const allPrepared = updatedPrepared.length >= config.countryCodes.length;
  const totalJobs = getBatchJobs(batchId).length;

  db.update(aiBatchRuns)
    .set({
      preparedCountries: updatedPrepared,
      totalJobs,
      status: 'running',
      phase: allPrepared ? 'run' : 'prepare',
      startedAt: batch.startedAt ?? timestamp,
    })
    .where(eq(aiBatchRuns.id, batchId))
    .run();

  logAiEvent('publisher', `Batch ${batchId}: tópicos preparados para ${nextCountry}`, {
    countryCode: nextCountry,
    metadata: { topics: topics.length, totalJobs },
  });

  return true;
}

async function runNextJob(batchId: number): Promise<boolean> {
  const db = getDb();
  const job = db
    .select()
    .from(aiJobs)
    .where(eq(aiJobs.batchId, batchId))
    .all()
    .find((row) => row.status === 'pending');

  if (!job) return false;

  const payload = (job.payload ?? {}) as {
    topic: string;
    targetCategory?: string;
    publishNow?: boolean;
    saveAsDraft?: boolean;
    skipTopicDiscovery?: boolean;
    stages?: AgentCode[];
  };

  db.update(aiJobs)
    .set({ status: 'processing', startedAt: now(), attempts: 1 })
    .where(eq(aiJobs.id, job.id))
    .run();

  try {
    const result = await runFullPipeline(job.countryCode as SupportedCountry, {
      topic: payload.topic,
      targetCategory: payload.targetCategory,
      publishNow: payload.publishNow,
      saveAsDraft: payload.saveAsDraft,
      skipTopicDiscovery: payload.skipTopicDiscovery ?? true,
      stages: payload.stages,
    });

    const success = pipelineSucceeded(result.stages as Record<string, { success?: boolean }>);
    const completedAt = now();

    db.update(aiJobs)
      .set({
        status: 'completed',
        result: result as unknown as Record<string, unknown>,
        completedAt,
        error: success ? null : 'Pipeline incompleto',
      })
      .where(eq(aiJobs.id, job.id))
      .run();

    const batch = getBatch(batchId);
    if (batch) {
      db.update(aiBatchRuns)
        .set({
          completedJobs: batch.completedJobs + 1,
          succeededJobs: batch.succeededJobs + (success ? 1 : 0),
          failedJobs: batch.failedJobs + (success ? 0 : 1),
        })
        .where(eq(aiBatchRuns.id, batchId))
        .run();
    }

    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    db.update(aiJobs)
      .set({ status: 'failed', error: message, completedAt: now() })
      .where(eq(aiJobs.id, job.id))
      .run();

    const batch = getBatch(batchId);
    if (batch) {
      db.update(aiBatchRuns)
        .set({
          completedJobs: batch.completedJobs + 1,
          failedJobs: batch.failedJobs + 1,
        })
        .where(eq(aiBatchRuns.id, batchId))
        .run();
    }

    return true;
  }
}

function finalizeBatchIfDone(batchId: number): void {
  const batch = getBatch(batchId);
  if (!batch) return;

  const pendingJobs = getBatchJobs(batchId).some((job) => job.status === 'pending' || job.status === 'processing');
  const config = getBatchConfig(batch);
  const prepared = batch.preparedCountries ?? [];
  const allPrepared = prepared.length >= config.countryCodes.length;

  if (!allPrepared || pendingJobs) return;

  const completedAt = now();
  const status = batch.failedJobs > 0 && batch.succeededJobs === 0 ? 'failed' : 'completed';

  const db = getDb();
  db.update(aiBatchRuns)
    .set({ status, phase: 'done', completedAt })
    .where(eq(aiBatchRuns.id, batchId))
    .run();

  logAiEvent('publisher', `Batch ${batchId} concluído: ${batch.succeededJobs}/${batch.totalJobs}`, {
    metadata: { batchId, succeeded: batch.succeededJobs, failed: batch.failedJobs },
  });
}

export async function processBatchTick(batchId: number): Promise<BatchStatusView | null> {
  seedDatabase();
  const batch = getBatch(batchId);
  if (!batch || batch.status === 'completed' || batch.status === 'failed') {
    return getBatchStatus(batchId);
  }

  const config = getBatchConfig(batch);
  const prepared = batch.preparedCountries ?? [];
  const allPrepared = prepared.length >= config.countryCodes.length;

  if (!allPrepared) {
    await prepareNextCountry(batchId);
    finalizeBatchIfDone(batchId);
    return getBatchStatus(batchId);
  }

  const hasPending = getBatchJobs(batchId).some((job) => job.status === 'pending');
  if (hasPending) {
    await runNextJob(batchId);
  }

  finalizeBatchIfDone(batchId);
  return getBatchStatus(batchId);
}

export async function processActiveBatches(limit = 1): Promise<number> {
  seedDatabase();
  const db = getDb();
  const activeBatches = db
    .select()
    .from(aiBatchRuns)
    .orderBy(asc(aiBatchRuns.createdAt))
    .all()
    .filter((batch) => batch.status === 'pending' || batch.status === 'running')
    .slice(0, limit);

  let processed = 0;
  for (const batch of activeBatches) {
    await processBatchTick(batch.id);
    processed++;
  }
  return processed;
}

export function getLatestActiveBatch(): BatchStatusView | null {
  seedDatabase();
  const db = getDb();
  const batch = db
    .select()
    .from(aiBatchRuns)
    .orderBy(desc(aiBatchRuns.createdAt))
    .all()
    .find((row) => row.status === 'pending' || row.status === 'running');

  return batch ? getBatchStatus(batch.id) : null;
}
