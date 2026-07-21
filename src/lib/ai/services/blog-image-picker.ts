import {
  BLOG_IMAGE_FALLBACK,
  BLOG_IMAGE_LIBRARY,
  type BlogLibraryImage,
} from '@/data/blog-image-library';
import { classifyTopicNiche, type ContentNiche } from '../research-engine/topic-niches';
import type { HeroImageResult } from './stock-image-library';

const BLOCKED_URL_PATTERNS = [
  '/images/modules/',
  '/images/integrations/',
  'hero-dashboard',
  'integrations-hub',
  '/images/salon-queue',
  'zyvo-pos-',
  'zyvo-inventory-',
  'zyvo-hr-',
  'zyvo-finance-',
  'zyvo-invoicing-',
  'zyvo-marketing-',
  'zyvo-virtual-store-',
  'zyvo-appointment-',
  'zyvo-purchasing-',
];

/** Reject product screenshots, logos and internal brand assets */
export function isBlockedBlogImageUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return BLOCKED_URL_PATTERNS.some((pattern) => lower.includes(pattern));
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function scoreImage(
  image: BlogLibraryImage,
  title: string,
  category: string,
  niche: ContentNiche
): number {
  const text = normalizeText(`${title} ${category}`);
  let score = 0;

  if (image.niches.includes(niche)) score += 40;

  for (const keyword of image.keywords) {
    const normalized = normalizeText(keyword);
    if (normalized.length >= 3 && text.includes(normalized)) {
      score += normalized.length > 6 ? 12 : 8;
    }
  }

  for (const word of text.split(' ')) {
    if (word.length < 4) continue;
    if (image.keywords.some((kw) => normalizeText(kw).includes(word))) score += 3;
    if (image.alt.toLowerCase().includes(word)) score += 2;
  }

  return score;
}

export interface PickBlogImageOptions {
  title: string;
  category: string;
  slug: string;
  excludeUrls?: Set<string>;
}

/** Pick the best stock image from the curated library for a blog post */
export function pickImageFromLibrary(options: PickBlogImageOptions): HeroImageResult {
  const niche = classifyTopicNiche(`${options.title} ${options.category}`, options.category);

  const scored = BLOG_IMAGE_LIBRARY.map((image) => ({
    image,
    score: scoreImage(image, options.title, options.category, niche),
  }))
    .filter(({ image }) => !isBlockedBlogImageUrl(image.url))
    .filter(({ image }) => !options.excludeUrls?.has(image.url))
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    const fallback = BLOG_IMAGE_FALLBACK;
    return {
      url: fallback.url,
      alt: fallback.alt,
      credit: fallback.credit,
      source: fallback.source,
    };
  }

  // Rotate among top matches so similar posts get different images
  const topPool = scored.slice(0, Math.min(6, scored.length));
  const picked = topPool[hashSlug(options.slug) % topPool.length].image;

  return {
    url: picked.url,
    alt: picked.alt,
    credit: picked.credit,
    source: picked.source,
  };
}

export function libraryImageToHero(image: BlogLibraryImage): HeroImageResult {
  return {
    url: image.url,
    alt: image.alt,
    credit: image.credit,
    source: image.source,
  };
}
