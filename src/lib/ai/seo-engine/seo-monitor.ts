import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import {
  contentArticles,
  seoKeywords,
  topicClusters,
  internalLinks,
  seoSitemapEntries,
  programmaticPages,
  contentFreshnessChecks,
  contentOpportunities,
} from '../db/schema';
import type { SupportedCountry } from '../types';
import type { SeoDashboardStats } from './types';

export function getSeoDashboardStats(country?: SupportedCountry): SeoDashboardStats {
  const db = getDb();

  const articles = db.select().from(contentArticles).all();
  const indexable = articles.filter(
    (a) =>
      (!country || a.countryCode === country) &&
      (a.status === 'published' || a.status === 'approved' || a.status === 'pending_review')
  );

  const keywords = country
    ? db.select().from(seoKeywords).where(eq(seoKeywords.country, country)).all()
    : db.select().from(seoKeywords).all();

  const clusters = country
    ? db.select().from(topicClusters).where(eq(topicClusters.country, country)).all()
    : db.select().from(topicClusters).all();

  const links = country
    ? db.select().from(internalLinks).where(eq(internalLinks.country, country)).all()
    : db.select().from(internalLinks).all();

  const sitemap = db.select().from(seoSitemapEntries).all();

  const progPages = country
    ? db
        .select()
        .from(programmaticPages)
        .where(eq(programmaticPages.country, country))
        .all()
    : db.select().from(programmaticPages).all();

  const freshness = db
    .select()
    .from(contentFreshnessChecks)
    .all()
    .filter((f) => f.status === 'pending');

  const opportunities = country
    ? db
        .select()
        .from(contentOpportunities)
        .where(eq(contentOpportunities.countryCode, country))
        .all()
        .filter((o) => o.status === 'pending')
    : db
        .select()
        .from(contentOpportunities)
        .all()
        .filter((o) => o.status === 'pending');

  return {
    indexableArticles: indexable.length,
    keywordsCount: keywords.length,
    clustersCount: clusters.length,
    internalLinksCount: links.length,
    sitemapEntries: sitemap.length,
    programmaticPages: progPages.filter((p) => p.status === 'published').length,
    freshnessPending: freshness.length,
    opportunities: opportunities.length,
  };
}

export function getRecentFreshnessChecks(limit = 20) {
  const db = getDb();
  return db.select().from(contentFreshnessChecks).all().slice(0, limit);
}
