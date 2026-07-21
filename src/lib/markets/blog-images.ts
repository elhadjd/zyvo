import type { MarketBlogPost } from '@/data/markets/blog/types';
import { resolvePostHeroImage } from '@/lib/ai/services/stock-image-library';

/** Returns post with heroImage/heroImageAlt filled from curated library if missing */
export function withResolvedHeroImage(post: MarketBlogPost): MarketBlogPost {
  const hero = resolvePostHeroImage(post);
  return {
    ...post,
    heroImage: hero.url,
    heroImageAlt: post.heroImageAlt ?? hero.alt,
  };
}
