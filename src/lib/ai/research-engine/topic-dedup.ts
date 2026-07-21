import { desc, eq } from 'drizzle-orm';
import { getDb } from '../db';
import { contentArticles, seoMetadata } from '../db/schema';
import type { SupportedCountry } from '../types';

export const DEFAULT_RECENT_DAYS = 60;
export const ALL_TIME_SIMILARITY_THRESHOLD = 0.42;
export const RECENT_SIMILARITY_THRESHOLD = 0.38;

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

const STOP_WORDS = new Set([
  'pour', 'guide', 'tout', 'votre', 'les', 'des', 'une', 'comment', 'avec', 'dans', 'sur',
  'que', 'est', 'sont', 'plus', 'bien', 'faire', 'entre', 'par', 'aux', 'son', 'ses',
  'doit', 'doivent', 'peut', 'peuvent', 'etre', 'avoir', 'cette', 'ceci', 'cela',
]);

function coreTokens(value: string): Set<string> {
  return new Set(
    [...tokenize(value)].filter((word) => !STOP_WORDS.has(word) && word.length > 2)
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
  const baseScore = overlap / Math.max(wordsA.size, wordsB.size);

  const coreA = coreTokens(a);
  const coreB = coreTokens(b);
  if (coreA.size === 0 || coreB.size === 0) return baseScore;

  let coreOverlap = 0;
  for (const word of coreA) {
    if (coreB.has(word)) coreOverlap++;
  }
  const coreScore = coreOverlap / Math.min(coreA.size, coreB.size);

  return Math.max(baseScore, coreScore);
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

function matchesExistingTopic(topic: string, existing: string, threshold: number): boolean {
  const normalizedTopic = normalizeText(topic);
  const normalizedExisting = normalizeText(existing);
  if (!normalizedTopic || !normalizedExisting) return false;

  if (
    normalizedExisting.includes(normalizedTopic) ||
    normalizedTopic.includes(normalizedExisting)
  ) {
    return true;
  }

  const topicPrefix = normalizedTopic.slice(0, Math.min(16, normalizedTopic.length));
  if (topicPrefix.length >= 8 && normalizedExisting.includes(topicPrefix)) {
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

export function findSimilarPublishedArticle(
  countryCode: SupportedCountry,
  title: string,
  slug?: string
): ArticleCorpusEntry | undefined {
  const corpus = getPublishedArticleCorpus(countryCode);

  for (const article of corpus) {
    if (slug && article.slug === slug) return article;

    const texts = [article.title, article.excerpt, article.keywords];
    for (const text of texts) {
      if (matchesExistingTopic(title, text, ALL_TIME_SIMILARITY_THRESHOLD)) {
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
