import type { SupportedCountry } from '../types';

export type SearchIntent = 'informational' | 'navigational' | 'transactional' | 'commercial';

export type SitemapType = 'index' | 'articles' | 'countries' | 'categories' | 'programmatic' | 'local_erp';

export interface SeoKeywordAnalysis {
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: SearchIntent;
  difficulty: number;
  opportunity: string;
  priorityScore: number;
}

export interface OpenGraphMeta {
  title: string;
  description: string;
  url: string;
  type: string;
  siteName: string;
  locale: string;
  image: string;
}

export interface TwitterCardMeta {
  card: 'summary_large_image';
  title: string;
  description: string;
  image: string;
}

export interface SeoOptimizationResult {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string;
  canonicalUrl: string;
  hreflangTags: Record<string, string>;
  schemaArticle: Record<string, unknown>;
  schemaFaq: Record<string, unknown>;
  schemaOrganization: Record<string, unknown>;
  schemaSoftware: Record<string, unknown>;
  openGraph: OpenGraphMeta;
  twitterCard: TwitterCardMeta;
  internalLinks: { title: string; url: string; anchorText: string }[];
  imageSuggestions: string[];
  keywordAnalysis: SeoKeywordAnalysis;
}

export interface InternalLinkSuggestion {
  targetArticleId?: number;
  targetUrl: string;
  anchorText: string;
  title: string;
  relevanceScore: number;
}

export interface TopicClusterInput {
  name: string;
  country: SupportedCountry;
  category: string;
  mainKeyword: string;
  relatedArticleIds: number[];
  pillarArticleId?: number;
}

export interface ProgrammaticPageInput {
  country: SupportedCountry;
  industry: string;
  language: string;
}

export interface FreshnessCheckResult {
  articleId: number;
  status: 'fresh' | 'needs_update' | 'outdated';
  reason: string;
  severity: 'low' | 'medium' | 'high';
  suggestedAction?: string;
}

export interface SeoDashboardStats {
  indexableArticles: number;
  keywordsCount: number;
  clustersCount: number;
  internalLinksCount: number;
  sitemapEntries: number;
  programmaticPages: number;
  freshnessPending: number;
  opportunities: number;
}

export const PROGRAMMATIC_INDUSTRIES = [
  { slug: 'restaurants', labels: { fr: 'restaurants', pt: 'restaurantes', en: 'restaurants' } },
  { slug: 'pharmacies', labels: { fr: 'pharmacies', pt: 'farmácias', en: 'pharmacies' } },
  { slug: 'retail-stores', labels: { fr: 'magasins', pt: 'lojas', en: 'retail stores' } },
  { slug: 'salons', labels: { fr: 'salons de beauté', pt: 'salões de beleza', en: 'beauty salons' } },
  { slug: 'clinics', labels: { fr: 'cliniques', pt: 'clínicas', en: 'clinics' } },
  { slug: 'supermarkets', labels: { fr: 'supermarchés', pt: 'supermercados', en: 'supermarkets' } },
] as const;

export const COUNTRY_HREFLANG: Record<SupportedCountry, string> = {
  gn: 'fr-GN',
  sn: 'fr-SN',
  ci: 'fr-CI',
  ao: 'pt-AO',
  mz: 'pt-MZ',
};
