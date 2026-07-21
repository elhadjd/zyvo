import { desc, eq, and } from 'drizzle-orm';
import { getDb } from '../db';
import { contentArticles, seoMetadata } from '../db/schema';
import type { SupportedCountry } from '../types';

export const DEFAULT_RECENT_DAYS = 60;
export const ALL_TIME_SIMILARITY_THRESHOLD = 0.42;
export const RECENT_SIMILARITY_THRESHOLD = 0.38;
export const TITLE_DEDUP_THRESHOLD = 0.55;

const BUSINESS_ACRONYMS = new Set([
  'tva', 'iva', 'erp', 'pme', 'rccm', 'ninea', 'syscohada', 'ohada', 'dgi', 'agt', 'fne',
]);

const STOP_WORDS = new Set([
  'pour', 'guide', 'tout', 'votre', 'les', 'des', 'une', 'comment', 'avec', 'dans', 'sur',
  'que', 'est', 'sont', 'plus', 'bien', 'faire', 'entre', 'par', 'aux', 'son', 'ses',
  'doit', 'doivent', 'peut', 'peuvent', 'etre', 'avoir', 'cette', 'ceci', 'cela', 'leurs',
  'notre', 'tous', 'toutes', 'aussi', 'comme', 'sans', 'sous', 'vers', 'chez', 'depuis',
  'pendant', 'avant', 'apres', 'encore', 'deja', 'jamais', 'toujours', 'meme', 'autre',
  'autres', 'chaque', 'quel', 'quels', 'quelle', 'quelles', 'celui', 'celle', 'ceux',
  'celles', 'lequel', 'laquelle', 'lesquels', 'lesquelles',
]);

/** Geographic and article-template words shared across unrelated topics in the same market */
const GEO_TEMPLATE_WORDS = new Set([
  'guinee', 'guineenne', 'conakry', 'senegal', 'senegalaise', 'dakar', 'abidjan', 'ivoire',
  'cote', 'afrique', 'africain', 'africaine', 'pme', 'pmes', 'erp', 'entreprise', 'entreprises',
  'societe', 'societes', 'guide', 'complet', 'complete', 'digitalisation', 'digitalization',
  'choisir', 'reussir', 'reussite', 'business', 'commerce', 'commercial', 'marche', 'marches',
  'petite', 'petites', 'moyenne', 'moyennes', 'locale', 'locales', 'local', 'locaux',
  'conseils', 'astuces', 'pratique', 'pratiques', 'essentiel', 'essentiels', 'essentielle',
  'essentielles', 'decouvrir', 'comprendre', 'optimiser', 'ameliorer', 'developper',
  'gestion', 'manager', 'management', 'savoir', 'besoin', 'besoins', 'solution', 'solutions',
  'logiciel', 'logiciels', 'systeme', 'systemes', 'outil', 'outils', 'service', 'services',
  'secteur', 'secteurs', 'activite', 'activites', 'professionnel', 'professionnelle',
  'professionnels', 'professionnelles', 'entreprendre', 'entrepreneur', 'entrepreneurs',
  'entrepreneuriat', 'startup', 'startups', '2024', '2025', '2026', '2027',
]);

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
      .filter((w) => w.length >= 3 || BUSINESS_ACRONYMS.has(w))
  );
}

function distinctiveTokens(value: string): Set<string> {
  return new Set(
    [...tokenize(value)].filter(
      (word) => !STOP_WORDS.has(word) && !GEO_TEMPLATE_WORDS.has(word) && word.length >= 2
    )
  );
}

function coreTokens(value: string): Set<string> {
  return distinctiveTokens(value);
}

function countOverlap(a: Set<string>, b: Set<string>): number {
  let overlap = 0;
  for (const word of a) {
    if (b.has(word)) overlap++;
  }
  return overlap;
}

export function topicSimilarity(a: string, b: string): number {
  const distA = distinctiveTokens(a);
  const distB = distinctiveTokens(b);
  if (distA.size === 0 || distB.size === 0) return 0;

  const overlap = countOverlap(distA, distB);
  if (overlap === 0) return 0;

  const jaccard = overlap / (distA.size + distB.size - overlap);
  const minRatio = overlap / Math.min(distA.size, distB.size);

  if (overlap === 1) {
    const shared = [...distA].find((word) => distB.has(word));
    if (shared && BUSINESS_ACRONYMS.has(shared)) {
      return Math.max(jaccard, minRatio, 0.45);
    }
    return Math.min(jaccard, minRatio) * 0.35;
  }

  if (overlap < 2) {
    return Math.min(jaccard, minRatio) * 0.5;
  }

  return Math.max(jaccard, minRatio);
}

function daysAgoIso(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export interface ArticleCorpusEntry {
  title: string;
  slug: string;
  excerpt: string;
  keywords: string;
  createdAt: string;
  status: string;
}

export function getPublishedArticleCorpus(countryCode: SupportedCountry): ArticleCorpusEntry[] {
  const db = getDb();
  const articles = db
    .select()
    .from(contentArticles)
    .orderBy(desc(contentArticles.createdAt))
    .all()
    .filter(
      (article) =>
        article.countryCode === countryCode &&
        (article.status === 'published' ||
          article.status === 'pending_review' ||
          article.status === 'approved' ||
          article.status === 'draft')
    );

  return articles.map((article) => {
    const seo = db
      .select()
      .from(seoMetadata)
      .where(eq(seoMetadata.articleId, article.id))
      .get();

    return {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      keywords: seo?.keywords ?? '',
      createdAt: article.createdAt,
      status: article.status,
    };
  });
}

function matchesExistingTopic(
  topic: string,
  existing: string,
  threshold: number,
  options: { titleOnly?: boolean } = {}
): boolean {
  const normalizedTopic = normalizeText(topic);
  const normalizedExisting = normalizeText(existing);
  if (!normalizedTopic || !normalizedExisting) return false;

  if (normalizedTopic === normalizedExisting) return true;

  const topicDistinct = distinctiveTokens(topic);
  const existingDistinct = distinctiveTokens(existing);
  const overlap = countOverlap(topicDistinct, existingDistinct);

  if (overlap >= 2) {
    const topicPrefix = [...topicDistinct].sort((a, b) => b.length - a.length)[0] ?? '';
    if (
      topicPrefix.length >= 5 &&
      normalizedExisting.includes(topicPrefix) &&
      normalizedTopic.includes(topicPrefix)
    ) {
      return true;
    }
  }

  if (
    overlap >= 2 &&
    (normalizedExisting.includes(normalizedTopic) || normalizedTopic.includes(normalizedExisting))
  ) {
    return true;
  }

  return topicSimilarity(topic, existing) >= threshold;
}

export function wasTopicAlreadyCovered(
  countryCode: SupportedCountry,
  topic: string,
  options: { recentDays?: number; corpus?: ArticleCorpusEntry[] } = {}
): boolean {
  const recentDays = options.recentDays ?? DEFAULT_RECENT_DAYS;
  const corpus = options.corpus ?? getPublishedArticleCorpus(countryCode);
  const cutoff = daysAgoIso(recentDays);

  for (const article of corpus) {
    const texts = [article.title, article.excerpt, article.keywords, article.slug.replace(/-/g, ' ')];
    const threshold = article.createdAt >= cutoff
      ? RECENT_SIMILARITY_THRESHOLD
      : ALL_TIME_SIMILARITY_THRESHOLD;

    for (const text of texts) {
      if (matchesExistingTopic(topic, text, threshold)) {
        return true;
      }
    }
  }

  return false;
}

export function getRecentArticleTopics(
  countryCode: SupportedCountry,
  recentDays = DEFAULT_RECENT_DAYS
): string[] {
  const cutoff = daysAgoIso(recentDays);
  return getPublishedArticleCorpus(countryCode)
    .filter((article) => article.createdAt >= cutoff)
    .flatMap((article) => [article.title, article.excerpt, article.keywords]);
}

export function normalizeTopicKey(topic: string): string {
  return normalizeText(topic);
}

export function topicFingerprint(countryCode: string, topic: string): string {
  return `${countryCode}:${normalizeText(topic)}`;
}

export function findArticleBySourceTopic(
  countryCode: SupportedCountry,
  topic: string
): { id: number; title: string; slug: string } | undefined {
  const fingerprint = normalizeText(topic);
  if (!fingerprint) return undefined;

  const db = getDb();
  return db
    .select({
      id: contentArticles.id,
      title: contentArticles.title,
      slug: contentArticles.slug,
    })
    .from(contentArticles)
    .where(and(eq(contentArticles.countryCode, countryCode), eq(contentArticles.sourceTopic, fingerprint)))
    .get();
}

export function findSimilarPublishedArticle(
  countryCode: SupportedCountry,
  subject: string,
  slug?: string,
  options: { titleOnly?: boolean; threshold?: number } = {}
): ArticleCorpusEntry | undefined {
  const corpus = getPublishedArticleCorpus(countryCode);
  const threshold = options.threshold ?? TITLE_DEDUP_THRESHOLD;

  for (const article of corpus) {
    if (slug && article.slug === slug) return article;

    const texts = options.titleOnly
      ? [article.title]
      : [article.title, article.excerpt, article.keywords];

    for (const text of texts) {
      if (matchesExistingTopic(subject, text, threshold, options)) {
        return article;
      }
    }
  }

  return undefined;
}

export function filterUniqueTopics(
  countryCode: SupportedCountry,
  topics: string[],
  options: { recentDays?: number; exclude?: Set<string> } = {}
): string[] {
  const corpus = getPublishedArticleCorpus(countryCode);
  const unique: string[] = [];
  const seen = new Set<string>();

  for (const raw of topics) {
    const topic = raw.trim();
    const key = normalizeText(topic);
    if (!key || seen.has(key)) continue;
    if (options.exclude?.has(key)) continue;
    if (wasTopicAlreadyCovered(countryCode, topic, { recentDays: options.recentDays, corpus })) {
      continue;
    }

    let tooSimilarToBatch = false;
    for (const picked of unique) {
      if (topicSimilarity(topic, picked) >= RECENT_SIMILARITY_THRESHOLD) {
        tooSimilarToBatch = true;
        break;
      }
    }
    if (tooSimilarToBatch) continue;

    seen.add(key);
    unique.push(topic);
  }

  return unique;
}
