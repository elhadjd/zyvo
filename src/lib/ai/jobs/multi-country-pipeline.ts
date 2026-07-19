import { runFullPipeline, type PipelineResult } from '../agents/orchestrator';
import { resolveFreshTopics } from '../research-engine/topic-resolver';
import { getEnabledCountryCodes, isCountryEnabled } from '../countries/registry';
import { logAiEvent } from '../logger';
import type { AgentCode, SupportedCountry } from '../types';

export interface MultiCountryPipelineResult {
  countries: SupportedCountry[];
  results: PipelineResult[];
  completedAt: string;
  succeeded: number;
  failed: number;
}

export interface MultiCountryPipelineOptions {
  dryRun?: boolean;
  stages?: AgentCode[];
  saveAsDraft?: boolean;
  publishNow?: boolean;
  countryCodes?: SupportedCountry[];
  articlesPerCountry?: number;
  recentDays?: number;
  concurrency?: number;
}

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  async function runWorker(): Promise<void> {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => runWorker()));
  return results;
}

export async function runMultiCountryPipeline(
  options: MultiCountryPipelineOptions = {}
): Promise<MultiCountryPipelineResult> {
  const countries =
    options.countryCodes?.filter((c) => isCountryEnabled(c)) ?? getEnabledCountryCodes();

  if (countries.length === 0) {
    throw new Error('Nenhum país ativo na configuração. Ative países em /admin/ai-engine/settings');
  }

  const articlesPerCountry = Math.max(1, options.articlesPerCountry ?? 1);
  const concurrency = Math.max(1, Math.min(options.concurrency ?? 3, 6));

  logAiEvent('research', `Pipeline multi-país iniciado: ${countries.join(', ')}`, {
    metadata: { countries, articlesPerCountry },
  });

  type Job = { countryCode: SupportedCountry; topic: string };
  const jobs: Job[] = [];

  for (const countryCode of countries) {
    const topics = await resolveFreshTopics(countryCode, articlesPerCountry, {
      recentDays: options.recentDays ?? 14,
    });
    for (const topic of topics) {
      jobs.push({ countryCode, topic });
    }
  }

  const results = await runWithConcurrency(jobs, concurrency, async (job) => {
    try {
      return await runFullPipeline(job.countryCode, {
        dryRun: options.dryRun,
        stages: options.stages,
        topic: job.topic,
        saveAsDraft: options.publishNow ? false : (options.saveAsDraft ?? true),
        publishNow: options.publishNow,
        skipTopicDiscovery: true,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      logAiEvent('research', `Pipeline falhou para ${job.countryCode}: ${message}`, {
        countryCode: job.countryCode,
        level: 'error',
      });
      return {
        countryCode: job.countryCode,
        topic: job.topic,
        stages: {},
        completedAt: new Date().toISOString(),
      };
    }
  });

  let succeeded = 0;
  let failed = 0;

  for (const result of results) {
    const hasFailure = Object.values(result.stages).some((s) => s && !s.success);
    if (hasFailure || Object.keys(result.stages).length === 0) failed++;
    else succeeded++;
  }

  logAiEvent('research', `Pipeline multi-país concluído: ${succeeded}/${jobs.length} sucesso`, {
    metadata: { succeeded, failed, countries },
  });

  return {
    countries,
    results,
    completedAt: new Date().toISOString(),
    succeeded,
    failed,
  };
}

export async function runMultiCountryResearch(): Promise<
  { country: SupportedCountry; keywords: number; opportunities: number }[]
> {
  const countries = getEnabledCountryCodes();
  const output = [];

  for (const country of countries) {
    const topics = await resolveFreshTopics(country, 1);
    const topic = topics[0];
    const { researchEngine } = await import('../research-engine');
    const result = await researchEngine.runDailyResearch(country, topic);
    output.push({
      country,
      keywords: result.keywordsDiscovered,
      opportunities: result.opportunitiesFound,
    });
  }

  return output;
}
