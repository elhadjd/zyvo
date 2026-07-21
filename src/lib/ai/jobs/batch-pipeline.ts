import { runFullPipeline, type PipelineResult } from '../agents/orchestrator';
import { resolveFreshTopics, resolveDiverseTopics } from '../research-engine/topic-resolver';
import { DEFAULT_RECENT_DAYS } from '../research-engine/topic-dedup';
import { getEnabledCountryCodes, isCountryEnabled } from '../countries/registry';
import { logAiEvent } from '../logger';
import { SITE_AI_COUNTRIES } from '../country-labels';
import type { AgentCode, SupportedCountry } from '../types';

export interface BatchPipelineJob {
  countryCode: SupportedCountry;
  topic: string;
  targetCategory?: string;
}

export interface BatchPipelineResult {
  jobs: Array<{
    countryCode: SupportedCountry;
    topic: string;
    result: PipelineResult;
    success: boolean;
  }>;
  countries: SupportedCountry[];
  articlesPerCountry: number;
  succeeded: number;
  failed: number;
  completedAt: string;
}

export interface BatchPipelineOptions {
  countryCodes?: SupportedCountry[];
  articlesPerCountry?: number;
  topic?: string;
  publishNow?: boolean;
  dryRun?: boolean;
  stages?: AgentCode[];
  recentDays?: number;
  concurrency?: number;
  siteCountriesOnly?: boolean;
}

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  async function runWorker(): Promise<void> {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => runWorker());
  await Promise.all(workers);
  return results;
}

function resolveCountries(options: BatchPipelineOptions): SupportedCountry[] {
  const pool = options.countryCodes?.length
    ? options.countryCodes.filter((c) => isCountryEnabled(c))
    : options.siteCountriesOnly
      ? SITE_AI_COUNTRIES.filter((c) => isCountryEnabled(c))
      : getEnabledCountryCodes();

  if (pool.length === 0) {
    throw new Error('Nenhum país activo. Configure em /admin/ai-engine/settings');
  }

  return pool;
}

async function buildJobs(options: BatchPipelineOptions): Promise<BatchPipelineJob[]> {
  const countries = resolveCountries(options);
  const articlesPerCountry = Math.max(1, Math.min(options.articlesPerCountry ?? 1, 5));
  const recentDays = options.recentDays ?? DEFAULT_RECENT_DAYS;
  const jobs: BatchPipelineJob[] = [];
  const usedTopics = new Map<SupportedCountry, Set<string>>();

  for (const countryCode of countries) {
    usedTopics.set(countryCode, new Set());

    if (options.topic?.trim()) {
      const topic = options.topic.trim();
      jobs.push({ countryCode, topic });
      continue;
    }

    const useDiverse = articlesPerCountry > 1;

    if (useDiverse) {
      const diverse = await resolveDiverseTopics(countryCode, articlesPerCountry, { recentDays });
      for (const item of diverse) {
        const key = item.topic.toLowerCase();
        const used = usedTopics.get(countryCode)!;
        if (used.has(key)) continue;
        used.add(key);
        jobs.push({ countryCode, topic: item.topic, targetCategory: item.category });
      }
      continue;
    }

    const topics = await resolveFreshTopics(countryCode, articlesPerCountry, { recentDays });

    for (const topic of topics) {
      const key = topic.toLowerCase();
      const used = usedTopics.get(countryCode)!;
      if (used.has(key)) continue;
      used.add(key);
      jobs.push({ countryCode, topic });
    }
  }

  return jobs;
}

export async function runBatchPipeline(options: BatchPipelineOptions = {}): Promise<BatchPipelineResult> {
  const jobs = await buildJobs(options);
  const concurrency = Math.max(1, Math.min(options.concurrency ?? 3, 6));
  const publishNow = options.publishNow ?? false;

  logAiEvent('research', `Batch pipeline: ${jobs.length} artigo(s) em ${[...new Set(jobs.map((j) => j.countryCode))].join(', ')}`, {
    metadata: { jobs: jobs.length, publishNow, concurrency },
  });

  const results = await runWithConcurrency(jobs, concurrency, async (job) => {
    try {
      const result = await runFullPipeline(job.countryCode, {
        topic: job.topic,
        dryRun: options.dryRun,
        stages: options.stages,
        saveAsDraft: !publishNow,
        publishNow,
        skipTopicDiscovery: true,
        targetCategory: job.targetCategory,
      });

      const success = !Object.values(result.stages).some((s) => s && !s.success);
      return { ...job, result, success };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        ...job,
        success: false,
        result: {
          countryCode: job.countryCode,
          topic: job.topic,
          stages: {},
          completedAt: new Date().toISOString(),
        } as PipelineResult,
        error: message,
      };
    }
  });

  const succeeded = results.filter((r) => r.success).length;
  const failed = results.length - succeeded;

  logAiEvent('research', `Batch pipeline concluído: ${succeeded}/${results.length} sucesso`, {
    metadata: { succeeded, failed },
  });

  return {
    jobs: results.map((r) => ({
      countryCode: r.countryCode,
      topic: r.topic,
      result: r.result,
      success: r.success,
    })),
    countries: [...new Set(jobs.map((j) => j.countryCode))],
    articlesPerCountry: options.articlesPerCountry ?? 1,
    succeeded,
    failed,
    completedAt: new Date().toISOString(),
  };
}
