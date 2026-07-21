import { getCountryConfig } from '../countries';
import { getNextTopicForCountry } from '../countries/registry';
import {
  clearSearchConsoleMetrics,
  fetchSearchConsoleData,
  getSearchConsoleMetrics,
  getTopKeywords,
  isSearchConsoleConfigured,
  saveSearchConsoleMetrics,
} from '../growth-analytics/integrations/google-search-console';
import { getContentOpportunities } from './opportunity-finder';
import { analyzeTrends } from './trend-analyzer';
import { logResearchEvent } from './research-logger';
import {
  DEFAULT_RECENT_DAYS,
  filterUniqueTopics,
  RECENT_SIMILARITY_THRESHOLD,
  topicSimilarity,
  wasTopicAlreadyCovered,
} from './topic-dedup';
import type { SupportedCountry } from '../types';
import {
  CONTENT_NICHES,
  classifyTopicNiche,
  getAllNicheSeedTopics,
  getNicheSeedTopics,
  nicheToCategoryLabel,
  type ContentNiche,
  type DiverseTopicResult,
} from './topic-niches';

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
    'publicité facebook instagram guinée',
    'whatsapp business commerce conakry',
    'vendre en ligne guinée',
    'intelligence artificielle PME guinée',
    'développer entreprise conakry',
    'paiement impôts en ligne guinée',
    'facture électronique guinée',
    'salaire net guinée calcul',
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
    'publicité facebook instagram dakar',
    'whatsapp business vente sénégal',
    'vendre en ligne dakar',
    'intelligence artificielle PME sénégal',
    'expansion entreprise dakar',
    'déclaration TVA en ligne sénégal',
    'facture proforma sénégal',
    'gestion stock superette dakar',
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
    'publicité facebook instagram abidjan',
    'whatsapp business vente abidjan',
    'e-commerce PME abidjan',
    'intelligence artificielle entreprises CI',
    'croissance PME abidjan',
    'déclaration fiscale en ligne côte ivoire',
    'facture FNE côte ivoire',
    'gestion restaurant abidjan',
  ],
  ao: [
    'criar empresa angola',
    'gestão PME luanda',
    'IVA angola empresas',
    'software gestão comercial angola',
    'AGT impostos angola',
    'marketing digital angola',
    'publicidade facebook instagram angola',
    'vender online angola',
    'inteligência artificial empresas angola',
    'crescer negócio luanda',
    'facturação electrónica angola',
    'gestão stock loja luanda',
  ],
  mz: [
    'criar empresa moçambique',
    'gestão PME maputo',
    'IVA moçambique empresas',
    'software gestão comercial maputo',
    'marketing digital moçambique',
    'publicidade facebook maputo',
    'vender online moçambique',
    'inteligência artificial PME moçambique',
    'expansão negócio maputo',
    'facturação electrónica moçambique',
    'gestão stock loja maputo',
  ],
};

const BUSINESS_HINTS = [
  'entreprise', 'entreprises', 'pme', 'gestion', 'fiscal', 'fiscalité', 'fiscalidade',
  'commerce', 'comercial', 'marketing', 'digital', 'logiciel', 'software', 'caisse', 'pos',
  'stock', 'tva', 'iva', 'impôt', 'imposto', 'créer', 'criar', 'entrepreneur', 'boutique',
  'restaurant', 'orange', 'wave', 'money', 'syscohada', 'ohada', 'ninea', 'rccm', 'facebook',
  'instagram', 'whatsapp', 'e-commerce', 'ecommerce', 'intelligence', 'artificielle',
  'artificial', 'croissance', 'crescimento', 'expansion', 'expansão', 'publicité',
  'publicidade', 'vendre', 'vender', 'facture', 'factura', 'déclaration', 'salaire',
];

type CandidateSource = 'gsc' | 'google' | 'trend' | 'opportunity' | 'calendar' | 'config' | 'niche';

interface ScoredCandidate {
  topic: string;
  score: number;
  source: CandidateSource;
}

const SOURCE_WEIGHT: Record<CandidateSource, number> = {
  gsc: 100,
  google: 92,
  trend: 86,
  opportunity: 78,
  calendar: 28,
  config: 24,
  niche: 18,
};

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isBusinessRelevant(topic: string): boolean {
  const normalized = normalizeText(topic);
  return BUSINESS_HINTS.some((hint) => normalized.includes(hint));
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

  const gscSeeds = getTopKeywords(countryCode, 6).map((row) => row.keyword);
  const staticSeeds = SEED_QUERIES[countryCode] ?? config?.topics ?? [];
  const seeds = [...new Set([...gscSeeds, ...staticSeeds])];

  const suggestions = new Set<string>();

  for (const seed of seeds.slice(0, 12)) {
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
    { metadata: { count: suggestions.size, gscSeeds: gscSeeds.length } }
  );

  return [...suggestions];
}

async function ensureFreshGscKeywords(countryCode: SupportedCountry): Promise<void> {
  if (!isSearchConsoleConfigured()) return;

  const recent = getSearchConsoleMetrics(countryCode, 2);
  if (recent.length > 0) return;

  try {
    const rows = await fetchSearchConsoleData(countryCode);
    if (rows.length === 0) return;

    clearSearchConsoleMetrics(countryCode);
    saveSearchConsoleMetrics(rows);

    logResearchEvent(
      countryCode,
      'topic_resolver',
      'gsc_refresh',
      `${rows.length} keywords GSC actualizados`,
      { metadata: { count: rows.length } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro GSC';
    logResearchEvent(countryCode, 'topic_resolver', 'gsc_refresh_error', message, {
      level: 'warn',
    });
  }
}

function addCandidate(
  map: Map<string, ScoredCandidate>,
  topic: string,
  source: CandidateSource,
  bonus = 0
): void {
  const trimmed = topic.trim();
  const key = normalizeText(trimmed);
  if (!key || key.length < 6) return;

  const score = SOURCE_WEIGHT[source] + bonus + (isBusinessRelevant(trimmed) ? 8 : 0);
  const existing = map.get(key);
  if (!existing || score > existing.score) {
    map.set(key, { topic: trimmed, score, source });
  }
}

async function collectScoredCandidates(countryCode: SupportedCountry): Promise<ScoredCandidate[]> {
  const config = getCountryConfig(countryCode);
  const map = new Map<string, ScoredCandidate>();

  await ensureFreshGscKeywords(countryCode);

  for (const row of getTopKeywords(countryCode, 20)) {
    addCandidate(map, row.keyword, 'gsc', Math.min(20, Math.round(row.clicks / 2)));
  }

  const googleQueries = await fetchGoogleTrendingQueries(countryCode);
  for (const query of googleQueries) {
    addCandidate(map, query, 'google');
  }

  try {
    const trends = await analyzeTrends(countryCode);
    for (const trend of trends.trends) {
      const bonus = trend.growth === 'rising' ? 12 : trend.growth === 'stable' ? 4 : 0;
      addCandidate(map, trend.topic, 'trend', bonus + Math.round(trend.relevance / 10));
    }
    for (const topic of [...trends.emergingTopics, ...trends.seasonalTopics]) {
      addCandidate(map, topic, 'trend', 6);
    }
  } catch {
    // trends optional
  }

  for (const opp of getContentOpportunities(countryCode, 20)) {
    if (opp.status === 'used') continue;
    addCandidate(map, opp.topic, 'opportunity', Math.round(opp.totalScore / 10));
  }

  const calendarTopic = getNextTopicForCountry(countryCode);
  if (calendarTopic) addCandidate(map, calendarTopic, 'calendar');

  if (config?.topics) {
    for (const topic of config.topics) {
      addCandidate(map, topic, 'config');
    }
  }

  return [...map.values()].sort((a, b) => b.score - a.score);
}

function configFallbackTopics(
  countryCode: SupportedCountry,
  needed: number,
  alreadyPicked: string[],
  recentDays: number
): string[] {
  const nicheSeeds = getAllNicheSeedTopics(countryCode);
  const config = getCountryConfig(countryCode);
  const pool = [...nicheSeeds, ...(config?.topics ?? [])];

  const filtered = filterUniqueTopics(countryCode, pool, {
    recentDays,
    exclude: new Set(alreadyPicked.map((topic) => normalizeText(topic))),
  });

  return filtered.slice(0, needed);
}

export async function resolveFreshTopics(
  countryCode: SupportedCountry,
  count: number,
  options: { recentDays?: number } = {}
): Promise<string[]> {
  const recentDays = options.recentDays ?? DEFAULT_RECENT_DAYS;

  logResearchEvent(
    countryCode,
    'topic_resolver',
    'resolve_start',
    `A resolver ${count} tópico(s) frescos`,
    { metadata: { count, recentDays } }
  );

  const candidates = await collectScoredCandidates(countryCode);
  const rankedTopics = candidates.map((candidate) => candidate.topic);
  const fresh = filterUniqueTopics(countryCode, rankedTopics, { recentDays });

  if (fresh.length < count) {
    const extras = configFallbackTopics(countryCode, count - fresh.length, fresh, recentDays);
    fresh.push(...extras);
  }

  logResearchEvent(
    countryCode,
    'topic_resolver',
    'resolve_complete',
    `${Math.min(fresh.length, count)} tópico(s) seleccionados`,
    {
      metadata: {
        topics: fresh.slice(0, count),
        sources: candidates.slice(0, 10).map((c) => ({ topic: c.topic, source: c.source, score: c.score })),
      },
    }
  );

  return fresh.slice(0, count);
}

function groupCandidatesByNiche(
  candidates: string[],
  countryCode: SupportedCountry
): Map<ContentNiche, string[]> {
  const grouped = new Map<ContentNiche, string[]>();

  for (const niche of CONTENT_NICHES) {
    grouped.set(niche, []);
  }

  for (const topic of candidates) {
    const niche = classifyTopicNiche(topic);
    grouped.get(niche)!.push(topic);
  }

  for (const niche of CONTENT_NICHES) {
    const pool = grouped.get(niche)!;
    if (pool.length === 0) {
      pool.push(...getNicheSeedTopics(countryCode, niche));
    }
  }

  return grouped;
}

export async function resolveDiverseTopics(
  countryCode: SupportedCountry,
  count: number,
  options: { recentDays?: number } = {}
): Promise<DiverseTopicResult[]> {
  const recentDays = options.recentDays ?? DEFAULT_RECENT_DAYS;
  const config = getCountryConfig(countryCode);
  const language = config?.language === 'pt' ? 'pt' : 'fr';

  logResearchEvent(
    countryCode,
    'topic_resolver',
    'diverse_start',
    `A seleccionar ${count} tópico(s) diversos por nicho`,
    { metadata: { count, recentDays } }
  );

  const scored = await collectScoredCandidates(countryCode);
  const rankedTopics = scored.map((candidate) => candidate.topic);
  const byNiche = groupCandidatesByNiche(rankedTopics, countryCode);
  const picked: DiverseTopicResult[] = [];
  const usedTopics = new Set<string>();

  for (const niche of CONTENT_NICHES) {
    if (picked.length >= count) break;

    const pool = filterUniqueTopics(countryCode, byNiche.get(niche) ?? [], {
      recentDays,
      exclude: usedTopics,
    });

    for (const topic of pool) {
      const key = normalizeText(topic);
      if (usedTopics.has(key)) continue;

      usedTopics.add(key);
      picked.push({
        topic,
        niche,
        category: nicheToCategoryLabel(niche, language),
      });
      break;
    }
  }

  if (picked.length < count) {
    const remaining = filterUniqueTopics(
      countryCode,
      rankedTopics,
      { recentDays, exclude: usedTopics }
    );

    for (const topic of remaining) {
      const key = normalizeText(topic);
      if (usedTopics.has(key)) continue;
      usedTopics.add(key);
      picked.push({
        topic,
        niche: classifyTopicNiche(topic),
        category: nicheToCategoryLabel(classifyTopicNiche(topic), language),
      });
      if (picked.length >= count) break;
    }
  }

  if (picked.length < count) {
    const extras = configFallbackTopics(
      countryCode,
      count - picked.length,
      picked.map((item) => item.topic),
      recentDays
    );

    for (const topic of extras) {
      const key = normalizeText(topic);
      if (usedTopics.has(key)) continue;
      if (wasTopicAlreadyCovered(countryCode, topic, { recentDays })) continue;
      usedTopics.add(key);
      picked.push({
        topic,
        niche: classifyTopicNiche(topic),
        category: nicheToCategoryLabel(classifyTopicNiche(topic), language),
      });
      if (picked.length >= count) break;
    }
  }

  logResearchEvent(
    countryCode,
    'topic_resolver',
    'diverse_complete',
    `${picked.length} tópico(s) diversos: ${picked.map((p) => p.niche).join(', ')}`,
    { metadata: { topics: picked.map((p) => ({ topic: p.topic, niche: p.niche })) } }
  );

  return picked.slice(0, count);
}

/** Rotate niche seed topics when Google/GSC pools are exhausted — batch-local dedup only */
function pickRotatedNicheSeeds(
  countryCode: SupportedCountry,
  count: number,
  usedKeys: Set<string>,
  language: 'fr' | 'pt'
): DiverseTopicResult[] {
  const pool: DiverseTopicResult[] = [];
  for (const niche of CONTENT_NICHES) {
    for (const topic of getNicheSeedTopics(countryCode, niche)) {
      pool.push({
        topic,
        niche,
        category: nicheToCategoryLabel(niche, language),
      });
    }
  }
  if (pool.length === 0) return [];

  const picked: DiverseTopicResult[] = [];
  const dayOffset = new Date().getDate() + new Date().getMonth() * 31;

  for (let attempt = 0; attempt < pool.length * 2 && picked.length < count; attempt++) {
    const item = pool[(dayOffset + attempt) % pool.length];
    const key = normalizeText(item.topic);
    if (usedKeys.has(key)) continue;

    let tooSimilar = false;
    for (const existing of picked) {
      if (topicSimilarity(item.topic, existing.topic) >= RECENT_SIMILARITY_THRESHOLD) {
        tooSimilar = true;
        break;
      }
    }
    if (tooSimilar) continue;

    usedKeys.add(key);
    picked.push(item);
  }

  return picked;
}

/**
 * Guarantee N distinct topics per country for admin batch runs.
 * Falls back to rotated niche seeds when dedup filters Google/GSC suggestions.
 */
export async function resolveBatchTopics(
  countryCode: SupportedCountry,
  count: number,
  options: { recentDays?: number; fixedTopic?: string } = {}
): Promise<DiverseTopicResult[]> {
  const recentDays = options.recentDays ?? DEFAULT_RECENT_DAYS;
  const config = getCountryConfig(countryCode);
  const language = config?.language === 'pt' ? 'pt' : 'fr';
  const results: DiverseTopicResult[] = [];
  const usedKeys = new Set<string>();

  const add = (item: DiverseTopicResult): boolean => {
    const key = normalizeText(item.topic);
    if (!key || usedKeys.has(key)) return false;
    usedKeys.add(key);
    results.push(item);
    return true;
  };

  if (options.fixedTopic?.trim()) {
    const topic = options.fixedTopic.trim();
    add({
      topic,
      niche: classifyTopicNiche(topic),
      category: nicheToCategoryLabel(classifyTopicNiche(topic), language),
    });
  }

  const needed = () => Math.max(0, count - results.length);

  if (needed() > 0) {
    const diverse = await resolveDiverseTopics(countryCode, needed(), { recentDays });
    for (const item of diverse) {
      add(item);
      if (needed() <= 0) break;
    }
  }

  if (needed() > 0) {
    const fresh = await resolveFreshTopics(countryCode, needed(), { recentDays });
    for (const topic of fresh) {
      const niche = classifyTopicNiche(topic);
      add({
        topic,
        niche,
        category: nicheToCategoryLabel(niche, language),
      });
      if (needed() <= 0) break;
    }
  }

  if (needed() > 0) {
    for (const item of pickRotatedNicheSeeds(countryCode, needed(), usedKeys, language)) {
      add(item);
      if (needed() <= 0) break;
    }
  }

  return results.slice(0, count);
}

export async function resolveNextFreshTopic(
  countryCode: SupportedCountry,
  recentDays = DEFAULT_RECENT_DAYS
): Promise<string | undefined> {
  const topics = await resolveFreshTopics(countryCode, 1, { recentDays });
  return topics[0];
}

export { wasTopicAlreadyCovered as wasTopicPublishedRecently, topicSimilarity, getRecentArticleTopics } from './topic-dedup';
export { DEFAULT_RECENT_DAYS } from './topic-dedup';
