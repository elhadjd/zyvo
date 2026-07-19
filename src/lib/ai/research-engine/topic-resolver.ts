import { desc, eq } from 'drizzle-orm';
import { getDb } from '../db';
import { contentArticles, seoMetadata } from '../db/schema';
import { getCountryConfig } from '../countries';
import { getNextTopicForCountry } from '../countries/registry';
import { getTopKeywords } from '../growth-analytics/integrations/google-search-console';
import { getContentOpportunities } from './opportunity-finder';
import { analyzeTrends } from './trend-analyzer';
import { logResearchEvent } from './research-logger';
import type { SupportedCountry } from '../types';

const DEFAULT_RECENT_DAYS = 14;
const SIMILARITY_THRESHOLD = 0.5;

const COUNTRY_GOOGLE_GEO: Partial<Record<SupportedCountry, string>> = {
  gn: 'GN',
  sn: 'SN',
  ci: 'CI',
  ao: 'AO',
  mz: 'MZ',
};

const SEED_QUERIES: Partial<Record<SupportedCountry, string[]>> = {
  gn: [
    'gestion entreprise guinée',
    'créer entreprise guinée',
    'fiscalité guinée PME',
    'TVA guinée entreprise',
    'logiciel gestion boutique conakry',
    'orange money commerce guinée',
    'SYSCOHADA guinée',
    'marketing digital PME conakry',
  ],
  sn: [
    'gestion PME dakar',
    'créer entreprise sénégal',
    'fiscalité sénégal entreprise',
    'NINEA sénégal',
    'wave orange money commerce dakar',
    'logiciel gestion restaurant dakar',
    'TVA sénégal PME',
    'digitalisation commerce sénégal',
  ],
  ci: [
    'gestion PME abidjan',
    'créer entreprise côte ivoire',
    'fiscalité côte ivoire entreprise',
    'RCCM abidjan',
    'orange money commerce abidjan',
    'logiciel gestion maquis abidjan',
    'TVA côte ivoire PME',
    'marketing digital abidjan',
  ],
  ao: [
    'criar empresa angola',
    'gestão PME luanda',
    'IVA angola empresas',
    'software gestão comercial angola',
    'AGT impostos angola',
  ],
  mz: [
    'criar empresa moçambique',
    'gestão PME maputo',
    'IVA moçambique empresas',
    'software gestão comercial maputo',
  ],
};

const BUSINESS_HINTS = [
  'entreprise',
  'entreprises',
  'pme',
  'gestion',
  'fiscal',
  'fiscalité',
  'fiscalidade',
  'commerce',
  'comercial',
  'marketing',
  'digital',
  'logiciel',
  'software',
  'caisse',
  'pos',
  'stock',
  'tva',
  'iva',
  'impôt',
  'imposto',
  'créer',
  'criar',
  'entrepreneur',
  'boutique',
  'restaurant',
  'orange',
  'wave',
  'money',
  'syscohada',
  'ohada',
  'ninea',
  'rccm',
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(value: string): Set<string> {
  return new Set(
    normalizeText(value)
      .split(' ')
      .filter((w) => w.length > 3)
  );
}

export function topicSimilarity(a: string, b: string): number {
  const wordsA = tokenize(a);
  const wordsB = tokenize(b);
  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let overlap = 0;
  for (const word of wordsA) {
    if (wordsB.has(word)) overlap++;
  }
  return overlap / Math.max(wordsA.size, wordsB.size);
}

function isBusinessRelevant(topic: string): boolean {
  const normalized = normalizeText(topic);
  return BUSINESS_HINTS.some((hint) => normalized.includes(hint));
}

function daysAgoIso(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export function getRecentArticleTopics(
  countryCode: SupportedCountry,
  recentDays = DEFAULT_RECENT_DAYS
): string[] {
  const db = getDb();
  const cutoff = daysAgoIso(recentDays);

  const articles = db
    .select()
    .from(contentArticles)
    .orderBy(desc(contentArticles.createdAt))
    .all()
    .filter((a) => a.countryCode === countryCode && a.createdAt >= cutoff);

  const topics: string[] = [];
  for (const article of articles) {
    topics.push(article.title, article.excerpt);

    const seo = db
      .select()
      .from(seoMetadata)
      .where(eq(seoMetadata.articleId, article.id))
      .get();
    if (seo?.keywords) topics.push(seo.keywords);
  }

  return topics;
}

export function wasTopicPublishedRecently(
  countryCode: SupportedCountry,
  topic: string,
  recentDays = DEFAULT_RECENT_DAYS
): boolean {
  const normalizedTopic = normalizeText(topic);
  if (!normalizedTopic) return false;

  const recentTopics = getRecentArticleTopics(countryCode, recentDays);

  return recentTopics.some((existing) => {
    const normalizedExisting = normalizeText(existing);
    if (!normalizedExisting) return false;
    if (normalizedExisting.includes(normalizedTopic) || normalizedTopic.includes(normalizedExisting)) {
      return true;
    }
    const topicPrefix = normalizedTopic.slice(0, Math.min(16, normalizedTopic.length));
    if (topicPrefix.length >= 8 && normalizedExisting.includes(topicPrefix)) {
      return true;
    }
    return topicSimilarity(topic, existing) >= SIMILARITY_THRESHOLD;
  });
}

async function fetchGoogleSuggestions(query: string, geo?: string, language = 'fr'): Promise<string[]> {
  const params = new URLSearchParams({
    q: query,
    client: 'firefox',
    hl: language,
  });
  if (geo) params.set('gl', geo);

  try {
    const response = await fetch(`https://www.google.com/complete/search?${params.toString()}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ZYVO-TopicResolver/1.0)',
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) return [];

    const data = (await response.json()) as unknown;
    if (!Array.isArray(data) || !Array.isArray(data[1])) return [];

    return (data[1] as unknown[])
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .map((item) => item.trim());
  } catch {
    return [];
  }
}

export async function fetchGoogleTrendingQueries(countryCode: SupportedCountry): Promise<string[]> {
  const config = getCountryConfig(countryCode);
  const geo = COUNTRY_GOOGLE_GEO[countryCode];
  const language = config?.language ?? 'fr';
  const seeds = SEED_QUERIES[countryCode] ?? config?.topics ?? [];

  const suggestions = new Set<string>();

  for (const seed of seeds.slice(0, 8)) {
    const results = await fetchGoogleSuggestions(seed, geo, language);
    for (const item of results) {
      if (item.length >= 8 && item.length <= 120) {
        suggestions.add(item);
      }
    }
  }

  logResearchEvent(
    countryCode,
    'topic_resolver',
    'google_suggest',
    `${suggestions.size} sugestões Google recolhidas`,
    { metadata: { count: suggestions.size } }
  );

  return [...suggestions];
}

async function collectTopicCandidates(countryCode: SupportedCountry): Promise<string[]> {
  const config = getCountryConfig(countryCode);
  const candidates: string[] = [];

  const googleQueries = await fetchGoogleTrendingQueries(countryCode);
  candidates.push(...googleQueries);

  for (const row of getTopKeywords(countryCode, 12)) {
    candidates.push(row.keyword);
  }

  for (const opp of getContentOpportunities(countryCode, 15)) {
    candidates.push(opp.topic);
  }

  if (config?.topics) {
    candidates.push(...config.topics);
  }

  try {
    const trends = await analyzeTrends(countryCode);
    for (const trend of trends.trends) {
      candidates.push(trend.topic);
    }
    candidates.push(...trends.emergingTopics, ...trends.seasonalTopics);
  } catch {
    // trends optional
  }

  const calendarTopic = getNextTopicForCountry(countryCode);
  if (calendarTopic) candidates.push(calendarTopic);

  const seen = new Set<string>();
  const unique: string[] = [];

  for (const raw of candidates) {
    const topic = raw.trim();
    const key = normalizeText(topic);
    if (!key || key.length < 6 || seen.has(key)) continue;
    seen.add(key);
    unique.push(topic);
  }

  return unique;
}

export async function resolveFreshTopics(
  countryCode: SupportedCountry,
  count: number,
  options: { recentDays?: number; preferBusiness?: boolean } = {}
): Promise<string[]> {
  const recentDays = options.recentDays ?? DEFAULT_RECENT_DAYS;
  const preferBusiness = options.preferBusiness ?? true;

  logResearchEvent(
    countryCode,
    'topic_resolver',
    'resolve_start',
    `A resolver ${count} tópico(s) frescos`,
    { metadata: { count, recentDays } }
  );

  const candidates = await collectTopicCandidates(countryCode);
  const fresh: string[] = [];

  const ranked = preferBusiness
    ? [
        ...candidates.filter((c) => isBusinessRelevant(c)),
        ...candidates.filter((c) => !isBusinessRelevant(c)),
      ]
    : candidates;

  for (const topic of ranked) {
    if (fresh.length >= count) break;
    if (wasTopicPublishedRecently(countryCode, topic, recentDays)) continue;
    fresh.push(topic);
  }

  if (fresh.length < count) {
    const extras = configFallbackTopics(countryCode, count - fresh.length, fresh, recentDays);
    if (extras) fresh.push(...extras);
  }

  logResearchEvent(
    countryCode,
    'topic_resolver',
    'resolve_complete',
    `${fresh.length} tópico(s) seleccionados`,
    { metadata: { topics: fresh } }
  );

  return fresh.slice(0, count);
}

function configFallbackTopics(
  countryCode: SupportedCountry,
  needed: number,
  alreadyPicked: string[],
  recentDays: number
): string[] | null {
  const config = getCountryConfig(countryCode);
  if (!config) return null;

  const extras: string[] = [];
  const day = new Date().getDate();

  for (let offset = 0; offset < config.topics.length && extras.length < needed; offset++) {
    const topic = config.topics[(day + offset) % config.topics.length];
    if (alreadyPicked.includes(topic)) continue;
    if (extras.includes(topic)) continue;
    if (wasTopicPublishedRecently(countryCode, topic, recentDays)) continue;
    extras.push(topic);
  }

  return extras.length > 0 ? extras : null;
}

export async function resolveNextFreshTopic(
  countryCode: SupportedCountry,
  recentDays = DEFAULT_RECENT_DAYS
): Promise<string | undefined> {
  const topics = await resolveFreshTopics(countryCode, 1, { recentDays });
  return topics[0];
}
