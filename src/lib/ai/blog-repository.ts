import { desc, eq } from 'drizzle-orm';
import { getDb, isDatabaseAvailable } from './db';
import { contentArticles, seoMetadata } from './db/schema';
import type { MarketBlogPost } from '@/data/markets/blog/types';

export function dbArticleToMarketPost(
  article: typeof contentArticles.$inferSelect,
  seo?: typeof seoMetadata.$inferSelect | null
): MarketBlogPost {
  const allContent = [article.introduction, ...article.content, article.conclusion].filter(Boolean);

  return {
    slug: seo?.slug ?? article.slug,
    title: article.title,
    excerpt: article.excerpt,
    metaTitle: seo?.metaTitle ?? article.title,
    metaDescription: seo?.metaDescription ?? article.excerpt,
    keywords: seo?.keywords ?? '',
    author: article.author,
    date: article.publishedAt?.split('T')[0] ?? article.createdAt.split('T')[0],
    readTime: article.readTime,
    category: article.category,
    content: allContent,
    faq: article.faq?.length ? article.faq : undefined,
    internalLinks: seo?.internalLinks?.length ? seo.internalLinks : undefined,
    updatedAt: article.updatedAt,
    heroImage: article.heroImageUrl ?? undefined,
    heroImageAlt: article.heroImageAlt ?? undefined,
    heroImageCredit: article.heroImageCredit ?? undefined,
  };
}

export function getPublishedDbArticles(marketCode: string): MarketBlogPost[] {
  if (!isDatabaseAvailable()) return [];

  try {
    const db = getDb();
    const articles = db
      .select()
      .from(contentArticles)
      .where(eq(contentArticles.countryCode, marketCode))
      .orderBy(desc(contentArticles.publishedAt))
      .all()
      .filter((a) => a.status === 'published');

    return articles.map((article) => {
      const seo = db
        .select()
        .from(seoMetadata)
        .where(eq(seoMetadata.articleId, article.id))
        .get();
      return dbArticleToMarketPost(article, seo);
    });
  } catch {
    return [];
  }
}

export function getPublishedDbArticleBySlug(
  marketCode: string,
  slug: string
): MarketBlogPost | undefined {
  if (!isDatabaseAvailable()) return undefined;

  try {
    const db = getDb();
    const articles = db
      .select()
      .from(contentArticles)
      .where(eq(contentArticles.countryCode, marketCode))
      .all()
      .filter((a) => a.status === 'published');

    for (const article of articles) {
      const seo = db
        .select()
        .from(seoMetadata)
        .where(eq(seoMetadata.articleId, article.id))
        .get();
      const post = dbArticleToMarketPost(article, seo);
      if (post.slug === slug) return post;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function getAllPublishedDbSlugs(marketCode: string): string[] {
  return getPublishedDbArticles(marketCode).map((p) => p.slug);
}
