import { desc, eq } from 'drizzle-orm';
import { callDeepSeek, parseJsonResponse } from '../deepseek';
import { getCountryConfig } from '../countries';
import { logAiEvent } from '../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getDb } from '../db';
import { contentArticles, seoMetadata } from '../db/schema';
import type { AgentContext, SeoResult } from '../types';

function now(): string {
  return new Date().toISOString();
}

export async function runSeoOptimizerAgent(ctx: AgentContext): Promise<number | null> {
  if (!isAgentEnabled('seo_optimizer')) {
    throw new Error('SEO Optimizer Agent está desativado');
  }

  const config = getCountryConfig(ctx.countryCode);
  if (!config) throw new Error(`País não configurado: ${ctx.countryCode}`);

  const taskId = createTask('seo_optimizer', ctx.countryCode, 'optimize_seo');
  logAiEvent('seo_optimizer', `Otimizando SEO para ${config.countryName}`, { countryCode: ctx.countryCode });

  try {
    const db = getDb();
    const article = db
      .select()
      .from(contentArticles)
      .where(eq(contentArticles.countryCode, ctx.countryCode))
      .orderBy(desc(contentArticles.createdAt))
      .limit(1)
      .get();

    if (!article || article.status !== 'draft') {
      completeTask(taskId, 'seo_optimizer', { optimized: false });
      return null;
    }

    const articleContent = {
      title: article.title,
      excerpt: article.excerpt,
      introduction: article.introduction,
      content: article.content,
      faq: article.faq,
      category: article.category,
      language: article.language,
    };

    const response = await callDeepSeek(
      [
        {
          role: 'system',
          content: `Tu es expert SEO pour ZYVO ERP en ${config.countryName}.
Génère des métadonnées SEO optimisées. Langue: ${config.language}.
Réponds en JSON:
{
  "metaTitle": "max 60 chars | Blog ZYVO",
  "metaDescription": "max 155 chars",
  "slug": "url-amigavel",
  "keywords": "mot1, mot2, mot3",
  "schemaArticle": {"@context":"https://schema.org","@type":"Article","headline":"...","description":"..."},
  "schemaFaq": {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"...","acceptedAnswer":{"@type":"Answer","text":"..."}}]},
  "internalLinks": [{"title":"...","url":"/gn/features"}],
  "imageSuggestions": ["description image 1"]
}`,
        },
        {
          role: 'user',
          content: `Optimise le SEO de cet article:\n${JSON.stringify(articleContent, null, 2)}`,
        },
      ],
      { jsonMode: true, temperature: 0.2 }
    );

    const seo = parseJsonResponse<SeoResult>(response.content);
    const timestamp = now();
    let seoId: number | null = null;

    if (!ctx.dryRun) {
      const result = db
        .insert(seoMetadata)
        .values({
          articleId: article.id,
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
          slug: seo.slug,
          keywords: seo.keywords,
          schemaArticle: seo.schemaArticle,
          schemaFaq: seo.schemaFaq,
          internalLinks: seo.internalLinks,
          imageSuggestions: seo.imageSuggestions,
          createdAt: timestamp,
          updatedAt: timestamp,
        })
        .run();

      seoId = Number(result.lastInsertRowid);

      db.update(contentArticles)
        .set({ slug: seo.slug, status: 'pending_review', updatedAt: timestamp })
        .where(eq(contentArticles.id, article.id))
        .run();
    }

    completeTask(taskId, 'seo_optimizer', {
      seoId,
      articleId: article.id,
      tokensUsed: response.usage.totalTokens,
    });

    logAiEvent('seo_optimizer', `SEO otimizado para: ${article.title}`, {
      countryCode: ctx.countryCode,
      metadata: { seoId },
    });

    return seoId;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'seo_optimizer', message);
    logAiEvent('seo_optimizer', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
