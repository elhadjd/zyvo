import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getCountryConfig } from '../countries';
import { logAiEvent } from '../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getDb } from '../db';
import { contentArticles, countryAiConfig } from '../db/schema';
import { syncAllSitemaps } from '../seo-engine/sitemap-manager';
import { notifySearchConsoleOfArticle } from '../seo-engine/google-publish-notify';
import { markOpportunityUsed } from '../research-engine/opportunity-finder';
import type { AgentContext } from '../types';

function now(): string {
  return new Date().toISOString();
}

export async function runPublisherAgent(ctx: AgentContext): Promise<number | null> {
  if (!isAgentEnabled('publisher')) {
    throw new Error('Publisher Agent está desativado');
  }

  const config = getCountryConfig(ctx.countryCode);
  if (!config) throw new Error(`País não configurado: ${ctx.countryCode}`);

  const taskId = createTask('publisher', ctx.countryCode, 'publish_article');
  logAiEvent('publisher', `Publicando conteúdo para ${config.countryName}`, { countryCode: ctx.countryCode });

  try {
    const db = getDb();
    const countrySettings = db
      .select()
      .from(countryAiConfig)
      .where(eq(countryAiConfig.countryCode, ctx.countryCode))
      .get();

    const requireApproval = countrySettings?.requireApproval ?? true;
    const autoPublish = countrySettings?.autoPublish ?? false;

    const article = ctx.articleId
      ? db.select().from(contentArticles).where(eq(contentArticles.id, ctx.articleId)).get()
      : db
          .select()
          .from(contentArticles)
          .where(eq(contentArticles.countryCode, ctx.countryCode))
          .orderBy(desc(contentArticles.createdAt))
          .limit(1)
          .get();

    if (!article) {
      completeTask(taskId, 'publisher', { published: false, reason: 'no_article' });
      return null;
    }

    const canPublish =
      article.status === 'approved' ||
      (autoPublish && !requireApproval && article.status === 'pending_review') ||
      (ctx.publishNow && ['pending_review', 'approved', 'draft'].includes(article.status));

    if (!canPublish) {
      completeTask(taskId, 'publisher', {
        published: false,
        reason: 'awaiting_approval',
        articleId: article.id,
        status: article.status,
      });
      logAiEvent('publisher', `Artigo aguardando aprovação: ${article.title}`, {
        countryCode: ctx.countryCode,
        level: 'info',
      });
      return null;
    }

    const timestamp = now();
    let googleNotify: Awaited<ReturnType<typeof notifySearchConsoleOfArticle>> | null = null;

    if (!ctx.dryRun) {
      db.update(contentArticles)
        .set({ status: 'published', publishedAt: timestamp, updatedAt: timestamp })
        .where(eq(contentArticles.id, article.id))
        .run();

      try {
        revalidatePath(`/${ctx.countryCode}/blog`);
        revalidatePath(`/${ctx.countryCode}/blog/${article.slug}`);
        revalidatePath('/sitemap.xml');
        revalidatePath('/sitemap-articles.xml');
        revalidatePath('/sitemap-countries.xml');
        revalidatePath('/sitemap-categories.xml');
        syncAllSitemaps();
      } catch {
        // revalidatePath may fail outside request context
      }

      try {
        googleNotify = await notifySearchConsoleOfArticle(ctx.countryCode, article.slug);
      } catch (notifyError) {
        const message = notifyError instanceof Error ? notifyError.message : 'Erro notificação Google';
        logAiEvent('publisher', `Search Console notify falhou: ${message}`, {
          countryCode: ctx.countryCode,
          level: 'warn',
          metadata: { slug: article.slug },
        });
      }

      markOpportunityUsed(ctx.countryCode, ctx.topic ?? article.title);
    }

    completeTask(taskId, 'publisher', {
      published: true,
      articleId: article.id,
      slug: article.slug,
      googleNotify: googleNotify ?? undefined,
    });

    logAiEvent('publisher', `Artigo publicado: ${article.title}`, {
      countryCode: ctx.countryCode,
      metadata: {
        slug: article.slug,
        googleIndexing: googleNotify?.indexing.ok ?? false,
        gscSitemap: googleNotify?.gscSitemap.ok ?? false,
      },
    });

    return article.id;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'publisher', message);
    logAiEvent('publisher', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
