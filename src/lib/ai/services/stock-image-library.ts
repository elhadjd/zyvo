import { BLOG_IMAGE_FALLBACK } from '@/data/blog-image-library';
import { classifyTopicNiche, type ContentNiche } from '../research-engine/topic-niches';
import { isBlockedBlogImageUrl, pickImageFromLibrary } from './blog-image-picker';

export interface HeroImageResult {
  url: string;
  alt: string;
  credit?: string;
  source: 'pexels' | 'unsplash' | 'curated';
}

/** Guaranteed-accessible fallback (verified) */
export const FALLBACK_HERO_IMAGE: HeroImageResult = {
  url: BLOG_IMAGE_FALLBACK.url,
  alt: BLOG_IMAGE_FALLBACK.alt,
  credit: BLOG_IMAGE_FALLBACK.credit,
  source: BLOG_IMAGE_FALLBACK.source,
};

export function buildRuleBasedSearchQueries(title: string, category: string): string[] {
  const niche = classifyTopicNiche(`${title} ${category}`, category);
  const nicheQueries: Record<ContentNiche, string> = {
    fiscalite: 'business accounting tax calculator receipts africa',
    entrepreneuriat: 'business registration documents signing africa',
    gestion: 'retail inventory stock shelves store africa',
    marketing: 'social media marketing smartphone africa',
    ventes: 'online shopping ecommerce delivery packages africa',
    technologie: 'business software dashboard laptop africa',
    ia: 'artificial intelligence technology business africa',
    croissance: 'african entrepreneur small business growth market',
  };

  const queries = [nicheQueries[niche]];
  const topicHint = title
    .replace(/\b(guinée|sénégal|conakry|dakar|abidjan|angola|moçambique|côte d'ivoire)\b/gi, '')
    .replace(/[^\w\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .join(' ');

  if (topicHint.length > 4) {
    queries.push(`${nicheQueries[niche].split(' ').slice(0, 3).join(' ')} ${topicHint}`);
  }

  return [...new Set(queries)].slice(0, 3);
}

/** Returns ranked candidates from the curated library for a topic */
export function getTopicImageCandidates(title: string, category: string, slug = ''): HeroImageResult[] {
  const primary = pickImageFromLibrary({ title, category, slug: slug || title });
  const secondary = pickImageFromLibrary({
    title: `${title} ${category}`,
    category,
    slug: `${slug}-alt`,
  });

  const seen = new Set<string>();
  const candidates: HeroImageResult[] = [];

  for (const item of [primary, secondary, FALLBACK_HERO_IMAGE]) {
    if (seen.has(item.url) || isBlockedBlogImageUrl(item.url)) continue;
    seen.add(item.url);
    candidates.push(item);
  }

  return candidates;
}

/** Resolve hero image for display — prefers stored image, then library pick */
export function resolvePostHeroImage(post: {
  slug: string;
  title: string;
  category: string;
  heroImage?: string;
  heroImageAlt?: string;
}): { url: string; alt: string } {
  if (post.heroImage && !isBlockedBlogImageUrl(post.heroImage)) {
    return {
      url: post.heroImage,
      alt: post.heroImageAlt ?? post.title,
    };
  }

  const picked = pickImageFromLibrary({
    title: post.title,
    category: post.category,
    slug: post.slug,
  });

  return { url: picked.url, alt: picked.alt };
}

export function getHeroImageFallbackUrl(): string {
  return FALLBACK_HERO_IMAGE.url;
}
