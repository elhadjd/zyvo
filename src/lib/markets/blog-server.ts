import type { MarketCode } from '@/lib/markets/types';
import type { MarketBlogPost } from '@/data/markets/blog/types';
import {
  getMarketBlogPosts,
  getAllMarketBlogSlugs,
} from '@/data/markets/blog';
import {
  getPublishedDbArticles,
  getAllPublishedDbSlugs,
} from '@/lib/ai/blog-repository';
import { withResolvedHeroImage } from '@/lib/markets/blog-images';
import { sanitizePostInternalLinks } from '@/lib/markets/internal-links';

function mergePosts(
  staticPosts: MarketBlogPost[],
  dbPosts: MarketBlogPost[],
  marketCode: MarketCode
): MarketBlogPost[] {
  const slugSet = new Set<string>();
  const merged: MarketBlogPost[] = [];

  for (const post of dbPosts) {
    if (!slugSet.has(post.slug)) {
      slugSet.add(post.slug);
      merged.push(withResolvedHeroImage(post));
    }
  }

  for (const post of staticPosts) {
    if (!slugSet.has(post.slug)) {
      slugSet.add(post.slug);
      merged.push(withResolvedHeroImage(post));
    }
  }

  const sorted = merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return sorted.map((post) => sanitizePostInternalLinks(post, marketCode, sorted));
}

export function getMergedMarketBlogPosts(marketCode: MarketCode): MarketBlogPost[] {
  const staticPosts = getMarketBlogPosts(marketCode);
  const dbPosts = getPublishedDbArticles(marketCode);
  return mergePosts(staticPosts, dbPosts, marketCode);
}

export function getMergedMarketBlogPostBySlug(
  marketCode: MarketCode,
  slug: string
): MarketBlogPost | undefined {
  return getMergedMarketBlogPosts(marketCode).find((post) => post.slug === slug);
}

export function getAllMergedMarketBlogSlugs(marketCode: MarketCode): string[] {
  const staticSlugs = getAllMarketBlogSlugs(marketCode);
  const dbSlugs = getAllPublishedDbSlugs(marketCode);
  return [...new Set([...dbSlugs, ...staticSlugs])];
}
