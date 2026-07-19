import { desc } from 'drizzle-orm';
import { getDb } from '../db';
import { discoveredKeywords } from '../db/schema';
import { deepseekService } from '../services/deepseek-service';
import { getCountryConfig } from '../countries';
import { getManagedSources } from './source-manager';
import { logResearchEvent } from './research-logger';
import { scoreToPriority } from './scoring';
import type { DiscoveredKeyword, SearchIntent } from './types';
import type { SupportedCountry } from '../types';
import { RESEARCH_CATEGORIES } from './types';

function now(): string {
  return new Date().toISOString();
}

interface KeywordDiscoveryResult {
  keywords: {
    keyword: string;
    searchIntent: SearchIntent;
    category: string;
    seoScore: number;
    priority: string;
  }[];
  faqQuestions: string[];
  painPoints: string[];
}

export async function discoverKeywords(
  countryCode: SupportedCountry,
  topic?: string
): Promise<DiscoveredKeyword[]> {
  const config = getCountryConfig(countryCode);
  if (!config) throw new Error(`País não configurado: ${countryCode}`);

  const sources = getManagedSources(countryCode, 'active');
  const sourceList = sources.map((s) => `${s.name} (${s.url}) [${s.type}]`).join('\n');

  logResearchEvent(countryCode, 'keyword_discovery', 'start', `Descobrindo keywords${topic ? `: ${topic}` : ''}`);

  const response = await deepseekService.chat(
    [
      {
        role: 'system',
        content: `Tu es expert en recherche SEO pour entrepreneurs en ${config.countryName}.
Trouve des mots-clés et questions réelles pour PME locales.
Catégories: ${RESEARCH_CATEGORIES.join(', ')}
Sources fiables:
${sourceList}

NE JAMAIS inventer de lois ou chiffres.
Réponds en JSON:
{
  "keywords": [{"keyword":"...","searchIntent":"informational|transactional|navigational|commercial","category":"...","seoScore":75,"priority":"high"}],
  "faqQuestions": ["..."],
  "painPoints": ["..."]
}`,
      },
      {
        role: 'user',
        content: topic
          ? `Trouve 10-15 mots-clés et questions sur: "${topic}"`
          : `Trouve les 15 meilleurs mots-clés pour entrepreneurs en ${config.countryName} aujourd'hui.`,
      },
    ],
    { jsonMode: true, temperature: 0.2, agentCode: 'research', countryCode }
  );

  const result = deepseekService.parseJson<KeywordDiscoveryResult>(response.content);
  const db = getDb();
  const timestamp = now();
  const saved: DiscoveredKeyword[] = [];

  for (const kw of result.keywords) {
    const priority = scoreToPriority(kw.seoScore);
    const insertResult = db
      .insert(discoveredKeywords)
      .values({
        countryCode,
        keyword: kw.keyword,
        searchIntent: kw.searchIntent,
        category: kw.category,
        priority,
        seoScore: kw.seoScore,
        status: 'discovered',
        createdAt: timestamp,
      })
      .run();

    saved.push({
      id: Number(insertResult.lastInsertRowid),
      countryCode,
      keyword: kw.keyword,
      searchIntent: kw.searchIntent,
      category: kw.category,
      priority: priority as DiscoveredKeyword['priority'],
      seoScore: kw.seoScore,
      status: 'discovered',
      createdAt: timestamp,
    });
  }

  logResearchEvent(countryCode, 'keyword_discovery', 'complete', `${saved.length} keywords descobertas`, {
    metadata: { count: saved.length, painPoints: result.painPoints.length },
  });

  return saved;
}

export function getDiscoveredKeywords(countryCode?: SupportedCountry, limit = 100): DiscoveredKeyword[] {
  const db = getDb();
  let keywords = db.select().from(discoveredKeywords).orderBy(desc(discoveredKeywords.seoScore)).all();
  if (countryCode) keywords = keywords.filter((k) => k.countryCode === countryCode);
  return keywords.slice(0, limit) as DiscoveredKeyword[];
}
