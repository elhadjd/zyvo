import { eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getDb } from '../db';
import { seoKeywords } from '../db/schema';
import type { ContentArticle } from '../db/schema';
import type { SupportedCountry } from '../types';
import { getCountryConfig } from '../countries';
import type { SeoKeywordAnalysis, SearchIntent } from './types';

function now(): string {
  return new Date().toISOString();
}

export async function analyzeKeywords(
  article: ContentArticle,
  countryCode: SupportedCountry
): Promise<SeoKeywordAnalysis> {
  const config = getCountryConfig(countryCode);
  const language = config?.language ?? article.language;

  const prompt = `Analyze SEO keywords for this article targeting ${config?.countryName ?? countryCode} (${language}).
Return JSON:
{
  "primaryKeyword": "main keyword phrase",
  "secondaryKeywords": ["kw1", "kw2", "kw3"],
  "intent": "informational|navigational|transactional|commercial",
  "difficulty": 0-100,
  "opportunity": "brief opportunity description",
  "priorityScore": 0-100
}

Article title: ${article.title}
Category: ${article.category}
Excerpt: ${article.excerpt}`;

  try {
    const response = await deepseekService.chat(
      [
        { role: 'system', content: 'You are an SEO keyword research expert for African markets. Return valid JSON only.' },
        { role: 'user', content: prompt },
      ],
      { jsonMode: true, temperature: 0.2, agentCode: 'seo_optimizer', countryCode }
    );

    const analysis = deepseekService.parseJson<SeoKeywordAnalysis>(response.content);
    return {
      primaryKeyword: analysis.primaryKeyword || article.category,
      secondaryKeywords: analysis.secondaryKeywords ?? [],
      intent: (analysis.intent as SearchIntent) ?? 'informational',
      difficulty: analysis.difficulty ?? 50,
      opportunity: analysis.opportunity ?? 'Medium opportunity',
      priorityScore: analysis.priorityScore ?? 60,
    };
  } catch {
    return {
      primaryKeyword: article.category.toLowerCase(),
      secondaryKeywords: [article.title.split(' ').slice(0, 3).join(' ')],
      intent: 'informational',
      difficulty: 50,
      opportunity: 'Fallback analysis — manual review recommended',
      priorityScore: 50,
    };
  }
}

export function saveSeoKeywords(
  article: ContentArticle,
  countryCode: SupportedCountry,
  analysis: SeoKeywordAnalysis
): number[] {
  const db = getDb();
  const config = getCountryConfig(countryCode);
  const language = config?.language ?? article.language;
  const timestamp = now();
  const ids: number[] = [];

  const primary = db
    .insert(seoKeywords)
    .values({
      keyword: analysis.primaryKeyword,
      country: countryCode,
      language,
      intent: analysis.intent,
      difficulty: analysis.difficulty,
      priorityScore: analysis.priorityScore,
      opportunity: analysis.opportunity,
      relatedContent: [article.id],
      articleId: article.id,
      isPrimary: true,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
    .run();
  ids.push(Number(primary.lastInsertRowid));

  for (const kw of analysis.secondaryKeywords.slice(0, 5)) {
    const result = db
      .insert(seoKeywords)
      .values({
        keyword: kw,
        country: countryCode,
        language,
        intent: analysis.intent,
        difficulty: analysis.difficulty,
        priorityScore: Math.max(analysis.priorityScore - 10, 20),
        opportunity: analysis.opportunity,
        relatedContent: [article.id],
        articleId: article.id,
        isPrimary: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
      .run();
    ids.push(Number(result.lastInsertRowid));
  }

  return ids;
}

export function getSeoKeywords(country?: SupportedCountry) {
  const db = getDb();
  if (country) {
    return db.select().from(seoKeywords).where(eq(seoKeywords.country, country)).all();
  }
  return db.select().from(seoKeywords).all();
}
