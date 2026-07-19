import { and, eq } from 'drizzle-orm';
import { getMarketBlogPosts } from '@/data/markets/blog';
import type { MarketCode } from '@/lib/markets/types';
import { getDb } from './index';
import { knowledgeBase } from './schema';
import { SITE_AI_COUNTRIES } from '../country-labels';

function now(): string {
  return new Date().toISOString();
}

/**
 * Seed validated knowledge entries from static market blog posts
 * so Writer/Research agents have local context before live crawling runs.
 */
export function seedMarketKnowledgeFromBlog(): number {
  const db = getDb();
  const timestamp = now();
  let inserted = 0;

  for (const market of SITE_AI_COUNTRIES as unknown as MarketCode[]) {
    const posts = getMarketBlogPosts(market);
    const routePrefix = `/${market}`;

    for (const post of posts) {
      const existing = db
        .select()
        .from(knowledgeBase)
        .where(and(eq(knowledgeBase.countryCode, market), eq(knowledgeBase.title, post.title)))
        .get();

      if (existing) continue;

      const sourceUrl = `https://www.zyvoerp.com${routePrefix}/blog/${post.slug}`;
      const keywords = post.keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);

      db.insert(knowledgeBase)
        .values({
          countryCode: market,
          title: post.title,
          sourceId: null,
          sourceUrl,
          sourceTitle: `Blog ZYVO ${market.toUpperCase()}`,
          category: post.category,
          keywords,
          summary: post.excerpt,
          content: [
            post.excerpt,
            ...post.content,
            ...(post.faq?.map((f) => `Q: ${f.question}\nR: ${f.answer}`) ?? []),
          ].join('\n\n'),
          referenceDate: post.date,
          verified: true,
          taskId: null,
          createdAt: timestamp,
          updatedAt: timestamp,
        })
        .run();

      inserted++;
    }
  }

  return inserted;
}
