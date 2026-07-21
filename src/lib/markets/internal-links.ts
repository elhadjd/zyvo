import type { MarketBlogPost } from '@/data/markets/blog/types';
import type { MarketCode } from '@/lib/markets/types';
import { resolveMarketPage } from '@/lib/markets/pages';
import { localizedPath, stripMarketPrefix } from '@/lib/markets/routing';

export interface InternalLink {
  title: string;
  url: string;
  anchorText?: string;
}

function normalizePath(url: string, marketCode: MarketCode): string {
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const { market, path } = stripMarketPrefix(withSlash);

  if (market !== marketCode && market !== 'us') {
    return withSlash;
  }

  return path.startsWith('/') ? path : `/${path}`;
}

function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

function findBlogSlugByTitle(title: string, posts: MarketBlogPost[]): string | undefined {
  const normalized = title.toLowerCase().trim();
  const exact = posts.find((post) => post.title.toLowerCase().trim() === normalized);
  if (exact) return exact.slug;

  const partial = posts.find((post) => {
    const postTitle = post.title.toLowerCase();
    return postTitle.includes(normalized) || normalized.includes(postTitle);
  });

  return partial?.slug;
}

function isValidInternalPath(path: string, marketCode: MarketCode, blogSlugs: Set<string>): boolean {
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return true;

  if (segments[0] === 'blog') {
    if (segments.length === 1) return true;
    return blogSlugs.has(segments[1]);
  }

  return resolveMarketPage(marketCode, segments) !== null;
}

export function resolveInternalLinkHref(
  link: InternalLink,
  marketCode: MarketCode,
  blogSlugs: Set<string>,
  allPosts: MarketBlogPost[] = []
): string | null {
  if (isExternalUrl(link.url)) {
    return link.url;
  }

  let path = normalizePath(link.url, marketCode);

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch && !blogSlugs.has(blogMatch[1])) {
    const fallbackSlug = findBlogSlugByTitle(link.title, allPosts);
    if (fallbackSlug) {
      path = `/blog/${fallbackSlug}`;
    }
  }

  if (!isValidInternalPath(path, marketCode, blogSlugs)) {
    return null;
  }

  return localizedPath(path, marketCode);
}

export function sanitizeInternalLinks(
  links: InternalLink[] | undefined,
  marketCode: MarketCode,
  allPosts: MarketBlogPost[]
): InternalLink[] | undefined {
  if (!links?.length) return undefined;

  const blogSlugs = new Set(allPosts.map((post) => post.slug));
  const seen = new Set<string>();
  const sanitized: InternalLink[] = [];

  for (const link of links) {
    const href = resolveInternalLinkHref(link, marketCode, blogSlugs, allPosts);
    if (!href || seen.has(href)) continue;

    seen.add(href);
    sanitized.push({
      ...link,
      url: href,
    });
  }

  return sanitized.length > 0 ? sanitized : undefined;
}

export function sanitizePostInternalLinks(
  post: MarketBlogPost,
  marketCode: MarketCode,
  allPosts: MarketBlogPost[]
): MarketBlogPost {
  if (!post.internalLinks?.length) return post;

  return {
    ...post,
    internalLinks: sanitizeInternalLinks(post.internalLinks, marketCode, allPosts),
  };
}
