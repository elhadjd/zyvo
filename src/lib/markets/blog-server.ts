import type { MarketCode } from '@/lib/markets/types';
import type { MarketBlogPost } from '@/data/markets/blog/types';
import {
  getMarketBlogPosts,
  getMarketBlogPostBySlug,
  getAllMarketBlogSlugs,
} from '@/data/markets/blog';
import {
  getPublishedDbArticles,
  getPublishedDbArticleBySlug,
  getAllPublishedDbSlugs,
} from '@/lib/ai/blog-repository';

function mergePosts(staticPosts: MarketBlogPost[], dbPosts: MarketBlogPost[]): MarketBlogPost[] {
  const slugSet = new Set<string>();
  const merged: MarketBlogPost[] = [];

  for (const post of dbPosts) {
    if (!slugSet.has(post.slug)) {
      slugSet.add(post.slug);
      merged.push(post);
    }
  }

  for (const post of staticPosts) {
    if (!slugSet.has(post.slug)) {
      slugSet.add(post.slug);
      merged.push(post);
    }
  }

  return merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMergedMarketBlogPosts(marketCode: MarketCode): MarketBlogPost[] {
  const staticPosts = getMarketBlogPosts(marketCode);
  const dbPosts = getPublishedDbArticles(marketCode);
  return mergePosts(staticPosts, dbPosts);
}

export function getMergedMarketBlogPostBySlug(
  marketCode: MarketCode,
  slug: string
): MarketBlogPost | undefined {
  const dbPost = getPublishedDbArticleBySlug(marketCode, slug);
  if (dbPost) return dbPost;
  return getMarketBlogPostBySlug(marketCode, slug);
}

export function getAllMergedMarketBlogSlugs(marketCode: MarketCode): string[] {
  const staticSlugs = getAllMarketBlogSlugs(marketCode);
  const dbSlugs = getAllPublishedDbSlugs(marketCode);
  return [...new Set([...dbSlugs, ...staticSlugs])];
}
