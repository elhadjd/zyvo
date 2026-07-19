import { desc, eq } from 'drizzle-orm';
import { getCountryConfig } from '../countries';
import { logAiEvent } from '../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getDb } from '../db';
import { contentArticles, seoMetadata } from '../db/schema';
import { seoEngine } from '../seo-engine';
import type { AgentContext } from '../types';

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
  logAiEvent('seo_optimizer', `SEO Growth Engine para ${config.countryName}`, {
    countryCode: ctx.countryCode,
  });

  try {
    const db = getDb();
    const article = ctx.articleId
      ? db.select().from(contentArticles).where(eq(contentArticles.id, ctx.articleId)).get()
      : db
          .select()
          .from(contentArticles)
          .where(eq(contentArticles.countryCode, ctx.countryCode))
          .orderBy(desc(contentArticles.createdAt))
          .limit(1)
          .get();

    if (!article || (article.status !== 'draft' && article.status !== 'pending_review')) {
      completeTask(taskId, 'seo_optimizer', { optimized: false });
      return null;
    }

    const seo = await seoEngine.runFullOptimization(article, ctx.countryCode);
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
          schemaOrganization: seo.schemaOrganization,
          schemaSoftware: seo.schemaSoftware,
          openGraph: seo.openGraph as unknown as Record<string, unknown>,
          twitterCard: seo.twitterCard as unknown as Record<string, unknown>,
          canonicalUrl: seo.canonicalUrl,
          hreflangTags: seo.hreflangTags,
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
          status: 'pending_review',
          updatedAt: timestamp,
        })
        .where(eq(contentArticles.id, article.id))
        .run();
    }

    completeTask(taskId, 'seo_optimizer', {
      seoId,
      articleId: article.id,
      primaryKeyword: seo.keywordAnalysis.primaryKeyword,
      internalLinks: seo.internalLinks.length,
    });

    logAiEvent('seo_optimizer', `SEO Growth Engine concluído: ${article.title}`, {
      countryCode: ctx.countryCode,
      metadata: { seoId, keyword: seo.keywordAnalysis.primaryKeyword },
    });

    return seoId;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'seo_optimizer', message);
    logAiEvent('seo_optimizer', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
