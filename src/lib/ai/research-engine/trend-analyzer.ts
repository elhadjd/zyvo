import { getDiscoveredKeywords } from './keyword-discovery';
import { getCountryConfig } from '../countries';
import { deepseekService } from '../services/deepseek-service';
import { logResearchEvent } from './research-logger';
import type { SupportedCountry } from '../types';

export interface TrendAnalysis {
  trends: { topic: string; growth: 'rising' | 'stable' | 'declining'; relevance: number }[];
  seasonalTopics: string[];
  emergingTopics: string[];
}

export async function analyzeTrends(countryCode: SupportedCountry): Promise<TrendAnalysis> {
  const config = getCountryConfig(countryCode);
  if (!config) throw new Error(`País não configurado: ${countryCode}`);

  const recentKeywords = getDiscoveredKeywords(countryCode, 30);
  const keywordList = recentKeywords.map((k) => k.keyword).join(', ');

  logResearchEvent(countryCode, 'trend_analyzer', 'start', 'Analisando tendências de mercado');

  const response = await deepseekService.chat(
    [
      {
        role: 'system',
        content: `Tu analyses les tendances business pour ${config.countryName}.
Basé sur les mots-clés et le contexte local (Conakry, PME, fiscalité, digitalisation).
Réponds en JSON:
{
  "trends": [{"topic":"...","growth":"rising|stable|declining","relevance":85}],
  "seasonalTopics": ["..."],
  "emergingTopics": ["..."]
}`,
      },
      {
        role: 'user',
        content: `Analyse les tendances actuelles. Mots-clés récents: ${keywordList || config.topics.join(', ')}`,
      },
    ],
    { jsonMode: true, temperature: 0.3, agentCode: 'research', countryCode }
  );

  const analysis = deepseekService.parseJson<TrendAnalysis>(response.content);

  logResearchEvent(countryCode, 'trend_analyzer', 'complete', `${analysis.trends.length} tendências identificadas`, {
    metadata: { emerging: analysis.emergingTopics.length },
  });

  return analysis;
}
