import type { ContentArticle } from '../db/schema';
import type { SupportedCountry } from '../types';
import type { SeoOptimizationResult } from './types';
import { analyzeKeywords, saveSeoKeywords } from './keyword-analyzer';
import { buildFullMetaPackage } from './meta-generator';
import {
  generateArticleSchema,
  generateFaqSchema,
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
} from './schema-generator';
import { suggestInternalLinks, saveInternalLinks } from './internal-link-builder';
import { findOrCreateClusterForArticle } from './topic-cluster-manager';
import { syncArticleSitemap } from './sitemap-manager';
import { fetchHeroImageForArticle } from '../services/stock-image-service';

export async function optimizeArticleContent(
  article: ContentArticle,
  countryCode: SupportedCountry,
  options: { saveKeywords?: boolean; saveLinks?: boolean; saveCluster?: boolean } = {}
): Promise<SeoOptimizationResult> {
  const {
    saveKeywords = true,
    saveLinks = true,
    saveCluster = true,
  } = options;

  const keywordAnalysis = await analyzeKeywords(article, countryCode);

  if (saveKeywords) {
    saveSeoKeywords(article, countryCode, keywordAnalysis);
  }

  const meta = buildFullMetaPackage(article, countryCode, keywordAnalysis.primaryKeyword);

  const schemaArticle = generateArticleSchema(article, countryCode, meta.metaDescription);
  const schemaFaq = article.faq?.length ? generateFaqSchema(article.faq) : {};
  const schemaOrganization = generateOrganizationSchema(countryCode);
  const schemaSoftware = generateSoftwareApplicationSchema(countryCode);

  const linkSuggestions = await suggestInternalLinks(article, countryCode);
  const internalLinks = linkSuggestions.map((l) => ({
    title: l.title,
    url: l.targetUrl,
    anchorText: l.anchorText,
  }));

  if (saveLinks && linkSuggestions.length > 0) {
    saveInternalLinks(article.id, countryCode, linkSuggestions);
  }

  if (saveCluster) {
    findOrCreateClusterForArticle(
      countryCode,
      article.category,
      keywordAnalysis.primaryKeyword,
      article.id
    );
  }

  syncArticleSitemap(countryCode);

  const heroImage = await fetchHeroImageForArticle(
    article,
    countryCode,
    keywordAnalysis.primaryKeyword,
    meta.slug
  );

  const openGraph = { ...meta.openGraph, image: heroImage.url };
  const twitterCard = { ...meta.twitterCard, image: heroImage.url };

  return {
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    slug: meta.slug,
    keywords: [keywordAnalysis.primaryKeyword, ...keywordAnalysis.secondaryKeywords].join(', '),
    canonicalUrl: meta.canonicalUrl,
    hreflangTags: meta.hreflangTags,
    schemaArticle,
    schemaFaq,
    schemaOrganization,
    schemaSoftware,
    openGraph,
    twitterCard,
    internalLinks,
    imageSuggestions: [heroImage.url],
    heroImage,
    keywordAnalysis,
  };
}
