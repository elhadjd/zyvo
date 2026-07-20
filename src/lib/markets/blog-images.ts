import type { MarketBlogPost } from '@/data/markets/blog/types';
import { resolvePostHeroImage } from '@/lib/ai/services/stock-image-library';

/** Returns post with heroImage/heroImageAlt filled from category fallback if missing */
export function withResolvedHeroImage(post: MarketBlogPost): MarketBlogPost {
  if (post.heroImage) return post;
  const hero = resolvePostHeroImage(post);
  return { ...post, heroImage: hero.url, heroImageAlt: hero.alt };
}
