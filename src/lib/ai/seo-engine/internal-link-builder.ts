import { and, desc, eq, ne } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getDb } from '../db';
import { contentArticles, internalLinks } from '../db/schema';
import type { ContentArticle } from '../db/schema';
import type { SupportedCountry } from '../types';
import type { InternalLinkSuggestion } from './types';

function now(): string {
  return new Date().toISOString();
}

export function getRelatedArticles(
  article: ContentArticle,
  countryCode: SupportedCountry,
  limit = 10
): ContentArticle[] {
  const db = getDb();
  return db
    .select()
    .from(contentArticles)
    .where(
      and(
        eq(contentArticles.countryCode, countryCode),
        ne(contentArticles.id, article.id)
      )
    )
    .orderBy(desc(contentArticles.createdAt))
    .limit(limit)
    .all()
    .filter((a) => a.status === 'published' || a.status === 'pending_review' || a.status === 'approved');
}

export async function suggestInternalLinks(
  article: ContentArticle,
  countryCode: SupportedCountry
): Promise<InternalLinkSuggestion[]> {
  const candidates = getRelatedArticles(article, countryCode, 15);

  if (candidates.length === 0) return [];

  const candidateList = candidates.map((c) => ({
    id: c.id,
    title: c.title,
    category: c.category,
    slug: c.slug,
    url: `/blog/${c.slug}`,
  }));

  const prompt = `Select up to 4 most relevant internal links for this article. Rules:
- Natural anchor text in the article's language (${article.language})
- Don't over-link (max 4)
- Improve user experience
- Return JSON array: [{ "targetArticleId": number, "targetUrl": string, "anchorText": string, "title": string, "relevanceScore": 0.0-1.0 }]

New article: "${article.title}" (${article.category})
Candidates: ${JSON.stringify(candidateList)}`;

  try {
    const response = await deepseekService.chat(
      [
        { role: 'system', content: 'You are an internal linking SEO expert. Return valid JSON array only.' },
        { role: 'user', content: prompt },
      ],
      { jsonMode: true, temperature: 0.3, agentCode: 'seo_optimizer', countryCode }
    );

    const suggestions = deepseekService.parseJson<InternalLinkSuggestion[]>(response.content);
    return (Array.isArray(suggestions) ? suggestions : []).slice(0, 4);
  } catch {
    return candidates.slice(0, 3).map((c) => ({
      targetArticleId: c.id,
      targetUrl: `/blog/${c.slug}`,
      anchorText: c.title.split(' ').slice(0, 4).join(' '),
      title: c.title,
      relevanceScore: 0.7,
    }));
  }
}

export function saveInternalLinks(
  sourceArticleId: number,
  countryCode: SupportedCountry,
  suggestions: InternalLinkSuggestion[]
): number {
  const db = getDb();
  const timestamp = now();
  let count = 0;

  for (const link of suggestions) {
    db.insert(internalLinks)
      .values({
        sourceArticleId,
        targetArticleId: link.targetArticleId ?? null,
        targetUrl: link.targetUrl,
        anchorText: link.anchorText,
        country: countryCode,
        relevanceScore: link.relevanceScore,
        createdAt: timestamp,
      })
      .run();
    count++;
  }

  return count;
}

export function getInternalLinks(country?: SupportedCountry) {
  const db = getDb();
  if (country) {
    return db.select().from(internalLinks).where(eq(internalLinks.country, country)).all();
  }
  return db.select().from(internalLinks).all();
}

export function getInternalLinksForArticle(articleId: number) {
  const db = getDb();
  return db
    .select()
    .from(internalLinks)
    .where(eq(internalLinks.sourceArticleId, articleId))
    .all();
}
