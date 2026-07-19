import { seedManagedSources } from './source-manager';
import { discoverKeywords } from './keyword-discovery';
import { findContentOpportunities, getTopApprovedOpportunity } from './opportunity-finder';
import { extractAndStoreDocument, searchKnowledge } from './knowledge-storage';
import { getManagedSources, testManagedSource } from './source-manager';
import { logResearchEvent, getResearchLogs } from './research-logger';
import type { ResearchEngineResult, KnowledgeSearchResult } from './types';
import type { SupportedCountry } from '../types';

export { searchKnowledge, getKnowledgeDocuments, approveKnowledgeDocument, rejectKnowledgeDocument } from './knowledge-storage';
export { getManagedSources, createManagedSource, updateManagedSource, deleteManagedSource, testManagedSource, seedManagedSources } from './source-manager';
export { resolveFreshTopics, resolveNextFreshTopic, wasTopicPublishedRecently } from './topic-resolver';
export { getDiscoveredKeywords } from './keyword-discovery';
export { getContentOpportunities, getTopApprovedOpportunity } from './opportunity-finder';
export { getResearchLogs } from './research-logger';
export type { ManagedSource, DiscoveredKeyword, KnowledgeDocument, ContentOpportunity, KnowledgeSearchResult } from './types';

export class ResearchEngine {
  async runDailyResearch(countryCode: SupportedCountry, topic?: string): Promise<ResearchEngineResult> {
    seedManagedSources();
    logResearchEvent(countryCode, 'research_engine', 'daily_start', `Pesquisa diária iniciada${topic ? `: ${topic}` : ''}`);

    const keywords = await discoverKeywords(countryCode, topic);
    const opportunities = await findContentOpportunities(countryCode);

    const sources = getManagedSources(countryCode, 'active');
    let documentsExtracted = 0;
    let documentsValidated = 0;

    const sourcesToExtract = sources.slice(0, 3);
    for (const source of sourcesToExtract) {
      await testManagedSource(source.id);
      const doc = await extractAndStoreDocument(countryCode, source.id, 'Geral');
      if (doc) {
        documentsExtracted++;
        if (doc.validationStatus === 'validated') documentsValidated++;
      }
    }

    const topOpportunities = opportunities.slice(0, 5);

    logResearchEvent(countryCode, 'research_engine', 'daily_complete', 'Pesquisa diária concluída', {
      keywords: keywords.length,
      opportunities: opportunities.length,
      documents: documentsExtracted,
    });

    return {
      countryCode,
      keywordsDiscovered: keywords.length,
      opportunitiesFound: opportunities.length,
      documentsExtracted,
      documentsValidated,
      topOpportunities,
      completedAt: new Date().toISOString(),
    };
  }

  async queryKnowledge(countryCode: SupportedCountry, query: string): Promise<KnowledgeSearchResult> {
    return searchKnowledge(countryCode, query);
  }

  getNextTopicForContent(countryCode: SupportedCountry): string | undefined {
    const top = getTopApprovedOpportunity(countryCode);
    return top?.topic;
  }
}

export const researchEngine = new ResearchEngine();

export async function runDailyResearchJob(countryCode: SupportedCountry): Promise<ResearchEngineResult> {
  const topic = researchEngine.getNextTopicForContent(countryCode);
  return researchEngine.runDailyResearch(countryCode, topic);
}
