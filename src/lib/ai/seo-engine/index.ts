import type { ContentArticle } from '../db/schema';
import type { SupportedCountry } from '../types';
import type { SeoOptimizationResult, SeoDashboardStats } from './types';
import { optimizeArticleContent } from './content-optimizer';
import { analyzeKeywords, saveSeoKeywords, getSeoKeywords } from './keyword-analyzer';
import {
  suggestInternalLinks,
  saveInternalLinks,
  getInternalLinks,
  getInternalLinksForArticle,
} from './internal-link-builder';
import {
  createTopicCluster,
  getTopicClusters,
  getClusterWithArticles,
  findOrCreateClusterForArticle,
} from './topic-cluster-manager';
import {
  syncAllSitemaps,
  getSitemapEntries,
  buildSitemapXml,
  buildSitemapIndexXml,
} from './sitemap-manager';
import {
  generateProgrammaticPage,
  generateAllProgrammaticPages,
  getProgrammaticPages,
  getProgrammaticPage,
} from './programmatic-pages';
import { getSeoDashboardStats, getRecentFreshnessChecks } from './seo-monitor';
import { runKeywordResearchAgent } from './agents/keyword-research-agent';
import { runInternalLinkAgent } from './agents/internal-link-agent';
import { runContentUpdateAgent, getPendingFreshnessChecks } from './agents/content-update-agent';

export {
  getSeoKeywords,
  getInternalLinks,
  getInternalLinksForArticle,
  getTopicClusters,
  getClusterWithArticles,
  getProgrammaticPages,
  getProgrammaticPage,
  getSitemapEntries,
  buildSitemapXml,
  buildSitemapIndexXml,
  getSeoDashboardStats,
  getRecentFreshnessChecks,
  getPendingFreshnessChecks,
  createTopicCluster,
  findOrCreateClusterForArticle,
  generateProgrammaticPage,
  generateAllProgrammaticPages,
  runKeywordResearchAgent,
  runInternalLinkAgent,
  runContentUpdateAgent,
};
export type { SeoOptimizationResult, SeoDashboardStats };

export class SeoEngine {
  async optimizeArticle(
    article: ContentArticle,
    countryCode: SupportedCountry
  ): Promise<SeoOptimizationResult> {
    return optimizeArticleContent(article, countryCode);
  }

  async runFullOptimization(
    article: ContentArticle,
    countryCode: SupportedCountry
  ): Promise<SeoOptimizationResult> {
    return optimizeArticleContent(article, countryCode, {
      saveKeywords: true,
      saveLinks: true,
      saveCluster: true,
    });
  }

  async syncSitemaps() {
    return syncAllSitemaps();
  }

  async generateProgrammaticSeo(countryCode: SupportedCountry) {
    const created = await generateAllProgrammaticPages(countryCode);
    await syncAllSitemaps();
    return created;
  }

  getDashboardStats(country?: SupportedCountry): SeoDashboardStats {
    return getSeoDashboardStats(country);
  }
}

export const seoEngine = new SeoEngine();

export async function runSeoOptimizationJob(countryCode: SupportedCountry): Promise<{
  keywords: number;
  links: number;
  freshness: number;
  programmatic: number;
}> {
  const keywordCount = (await runKeywordResearchAgent({ countryCode })) ?? 0;
  const linkCount = (await runInternalLinkAgent({ countryCode })) ?? 0;
  const freshness = await runContentUpdateAgent({ countryCode });
  const programmatic = await generateAllProgrammaticPages(countryCode);
  await syncAllSitemaps();

  return { keywords: keywordCount, links: linkCount, freshness, programmatic };
}
