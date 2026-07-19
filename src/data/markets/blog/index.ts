import type { MarketCode } from '@/lib/markets/types';
import type { MarketBlogConfig, MarketBlogPost } from './types';
import { gnBlogConfig, gnBlogPosts } from './gn';
import { snBlogConfig, snBlogPosts } from './sn';
import { ciBlogConfig, ciBlogPosts } from './ci';

const blogPostsByMarket: Partial<Record<MarketCode, MarketBlogPost[]>> = {
  gn: gnBlogPosts,
  sn: snBlogPosts,
  ci: ciBlogPosts,
};

const blogConfigByMarket: Partial<Record<MarketCode, MarketBlogConfig>> = {
  gn: gnBlogConfig,
  sn: snBlogConfig,
  ci: ciBlogConfig,
};

export function getMarketBlogPosts(marketCode: MarketCode): MarketBlogPost[] {
  return blogPostsByMarket[marketCode] ?? [];
}

export function getMarketBlogPostBySlug(
  marketCode: MarketCode,
  slug: string
): MarketBlogPost | undefined {
  return getMarketBlogPosts(marketCode).find((p) => p.slug === slug);
}

export function getMarketBlogConfig(marketCode: MarketCode): MarketBlogConfig | null {
  return blogConfigByMarket[marketCode] ?? null;
}

export function marketHasBlog(marketCode: MarketCode): boolean {
  return getMarketBlogPosts(marketCode).length > 0;
}

export function getAllMarketBlogSlugs(marketCode: MarketCode): string[] {
  return getMarketBlogPosts(marketCode).map((p) => p.slug);
}
