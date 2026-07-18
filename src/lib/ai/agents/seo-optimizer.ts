import { desc, eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getSeoPrompt } from './prompts';
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

    const promptConfig = getSeoPrompt(ctx.countryCode);

    const response = await deepseekService.chat(
      [
        { role: 'system', content: promptConfig.systemPrompt },
        { role: 'user', content: `Optimise SEO:\n${JSON.stringify(articleContent, null, 2)}` },
      ],
      { jsonMode: true, temperature: 0.2, agentCode: 'seo_optimizer', countryCode: ctx.countryCode }
    );

    const seo = deepseekService.parseJson<SeoResult>(response.content);
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
        .set({
          slug: seo.slug,
          status: ctx.saveAsDraft ? 'pending_review' : 'pending_review',
          updatedAt: timestamp,
        })
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
