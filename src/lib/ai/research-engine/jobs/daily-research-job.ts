import { researchEngine } from '../index';
import { seedManagedSources } from '../source-manager';
import { logResearchEvent } from '../research-logger';
import { enqueueJob } from '../../jobs/queue';
import type { ResearchEngineResult } from '../types';
import type { SupportedCountry } from '../../types';

export async function runDailyResearchJob(countryCode: SupportedCountry): Promise<ResearchEngineResult> {
  seedManagedSources();
  logResearchEvent(countryCode, 'daily_research_job', 'start', 'DailyResearchJob iniciado');

  const result = await researchEngine.runDailyResearch(countryCode);

  const topTopic = result.topOpportunities[0]?.topic;
  if (topTopic) {
    enqueueJob('generate_article', countryCode, { topic: topTopic, saveAsDraft: true });
    logResearchEvent(countryCode, 'daily_research_job', 'enqueue_writer', `Tema enviado ao Writer: ${topTopic}`, {
      score: result.topOpportunities[0]?.totalScore,
    });
  }

  logResearchEvent(countryCode, 'daily_research_job', 'complete', 'DailyResearchJob concluído', {
    keywords: result.keywordsDiscovered,
    opportunities: result.opportunitiesFound,
  });

  return result;
}
