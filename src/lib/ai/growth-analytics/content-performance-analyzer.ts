import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import {
  contentArticles,
  contentPerformanceScores,
  internalLinks,
  seoKeywords,
} from '../db/schema';
import type { SupportedCountry } from '../types';
import type { ContentScore } from './types';
import { getSearchConsoleMetrics } from './integrations/google-search-console';
import { getVisitorMetrics } from './integrations/google-analytics';

function now(): string {
  return new Date().toISOString();
}

function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
}

export function scoreArticle(
  article: {
    id: number;
    title: string;
    countryCode: string;
    slug: string;
    category: string;
    updatedAt: string;
    publishedAt: string | null;
    status: string;
  },
  countryCode: SupportedCountry
): ContentScore {
  const db = getDb();
  const pageUrl = `/${countryCode}/blog/${article.slug}`;

  const gscData = getSearchConsoleMetrics(countryCode).filter((m) => m.pageUrl.includes(article.slug));
  const visitorData = getVisitorMetrics(countryCode).filter((m) => m.pageUrl.includes(article.slug));

  const traffic = gscData.reduce((s, m) => s + m.clicks, 0) + visitorData.reduce((s, m) => s + m.users, 0);
  const avgPosition =
    gscData.length > 0 ? gscData.reduce((s, m) => s + m.position, 0) / gscData.length : 50;

  const linksCount = db
    .select()
    .from(internalLinks)
    .where(eq(internalLinks.sourceArticleId, article.id))
    .all().length;

  const hasKeywords = db
    .select()
    .from(seoKeywords)
    .where(eq(seoKeywords.articleId, article.id))
    .all().length;

  const freshnessDays = daysSince(article.publishedAt ?? article.updatedAt);
  const conversions = visitorData.reduce((s, m) => s + m.conversions, 0);
  const avgTime = visitorData.length > 0
    ? visitorData.reduce((s, m) => s + m.avgTimeOnPage, 0) / visitorData.length
    : 0;

  const seoScore = Math.min(100, Math.round(
    (hasKeywords > 0 ? 25 : 0) +
    (linksCount > 0 ? 20 : 0) +
    (avgPosition < 20 ? 30 : avgPosition < 40 ? 15 : 5) +
    (traffic > 50 ? 25 : traffic > 10 ? 15 : 5)
  ));

  const engagementScore = Math.min(100, Math.round(
    (avgTime > 120 ? 35 : avgTime > 60 ? 20 : 10) +
    (traffic > 100 ? 35 : traffic > 20 ? 20 : 10) +
    (freshnessDays < 90 ? 30 : freshnessDays < 180 ? 15 : 5)
  ));

  const conversionScore = Math.min(100, Math.round(
    (conversions > 5 ? 40 : conversions > 0 ? 25 : 5) +
    (traffic > 0 ? (conversions / traffic) * 300 : 0) +
    (linksCount > 2 ? 20 : 10)
  ));

  const totalScore = Math.round((seoScore + engagementScore + conversionScore) / 3);

  return {
    articleId: article.id,
    title: article.title,
    country: countryCode,
    seoScore,
    engagementScore,
    conversionScore,
    totalScore,
    traffic,
    avgPosition: Math.round(avgPosition * 10) / 10,
  };
}

export function analyzeAllContent(countryCode: SupportedCountry): ContentScore[] {
  const db = getDb();
  const articles = db
    .select()
    .from(contentArticles)
    .where(eq(contentArticles.countryCode, countryCode))
    .all()
    .filter((a) => a.status === 'published' || a.status === 'approved');

  return articles.map((a) => scoreArticle(a, countryCode));
}

export function saveContentScores(scores: ContentScore[]): number {
  const db = getDb();
  const timestamp = now();
  let saved = 0;

  for (const score of scores) {
    const article = db
      .select()
      .from(contentArticles)
      .where(eq(contentArticles.id, score.articleId))
      .get();

    if (!article) continue;

    const freshnessDays = daysSince(article.publishedAt ?? article.updatedAt);
    const linksCount = db
      .select()
      .from(internalLinks)
      .where(eq(internalLinks.sourceArticleId, score.articleId))
      .all().length;

    db.insert(contentPerformanceScores)
      .values({
        articleId: score.articleId,
        country: score.country,
        seoScore: score.seoScore,
        engagementScore: score.engagementScore,
        conversionScore: score.conversionScore,
        totalScore: score.totalScore,
        traffic: score.traffic,
        avgPosition: score.avgPosition,
        internalLinksCount: linksCount,
        freshnessDays,
        analyzedAt: timestamp,
        createdAt: timestamp,
      })
      .run();
    saved++;
  }

  return saved;
}

export function getContentScores(country?: SupportedCountry) {
  const db = getDb();
  let scores = db.select().from(contentPerformanceScores).all();
  if (country) scores = scores.filter((s) => s.country === country);

  const latest = new Map<number, typeof scores[0]>();
  for (const s of scores.sort((a, b) => b.analyzedAt.localeCompare(a.analyzedAt))) {
    if (!latest.has(s.articleId)) latest.set(s.articleId, s);
  }

  return [...latest.values()];
}

export function getTopArticles(country: SupportedCountry, limit = 5) {
  return getContentScores(country)
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, limit);
}

export function getWeakArticles(country: SupportedCountry, limit = 5) {
  return getContentScores(country)
    .sort((a, b) => a.totalScore - b.totalScore)
    .slice(0, limit);
}
