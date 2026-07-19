import { runFullPipeline, type PipelineResult } from '../agents/orchestrator';
import { researchEngine } from '../research-engine';
import { getEnabledCountryCodes, getNextTopicForCountry, isCountryEnabled } from '../countries/registry';
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
  countryCodes?: SupportedCountry[];
}

function resolveTopic(countryCode: SupportedCountry): string | undefined {
  const fromResearch = researchEngine.getNextTopicForContent(countryCode);
  if (fromResearch) return fromResearch;
  return getNextTopicForCountry(countryCode);
}

export async function runMultiCountryPipeline(
  options: MultiCountryPipelineOptions = {}
): Promise<MultiCountryPipelineResult> {
  const countries =
    options.countryCodes?.filter((c) => isCountryEnabled(c)) ??
    getEnabledCountryCodes();

  if (countries.length === 0) {
    throw new Error('Nenhum país ativo na configuração. Ative países em /admin/ai-engine/settings');
  }

  logAiEvent('research', `Pipeline multi-país iniciado: ${countries.join(', ')}`, {
    metadata: { countries },
  });

  const results: PipelineResult[] = [];
  let succeeded = 0;
  let failed = 0;

  for (const countryCode of countries) {
    const topic = resolveTopic(countryCode);

    try {
      const result = await runFullPipeline(countryCode, {
        dryRun: options.dryRun,
        stages: options.stages,
        topic,
        saveAsDraft: options.saveAsDraft ?? true,
      });

      results.push(result);

      const hasFailure = Object.values(result.stages).some((s) => s && !s.success);
      if (hasFailure) failed++;
      else succeeded++;
    } catch (error) {
      failed++;
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      results.push({
        countryCode,
        topic,
        stages: {},
        completedAt: new Date().toISOString(),
      });
      logAiEvent('research', `Pipeline falhou para ${countryCode}: ${message}`, {
        countryCode,
        level: 'error',
      });
    }
  }

  logAiEvent('research', `Pipeline multi-país concluído: ${succeeded}/${countries.length} sucesso`, {
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
    const result = await researchEngine.runDailyResearch(country, resolveTopic(country));
    output.push({
      country,
      keywords: result.keywordsDiscovered,
      opportunities: result.opportunitiesFound,
    });
  }

  return output;
}
