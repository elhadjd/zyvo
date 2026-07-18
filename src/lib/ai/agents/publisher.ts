import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getCountryConfig } from '../countries';
import { logAiEvent } from '../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getDb } from '../db';
import { contentArticles, countryAiConfig } from '../db/schema';
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

    const article = db
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
      article.status === 'approved' || (autoPublish && !requireApproval && article.status === 'pending_review');

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

    if (!ctx.dryRun) {
      db.update(contentArticles)
        .set({ status: 'published', publishedAt: timestamp, updatedAt: timestamp })
        .where(eq(contentArticles.id, article.id))
        .run();

      try {
        revalidatePath(`/${ctx.countryCode}/blog`);
        revalidatePath(`/${ctx.countryCode}/blog/${article.slug}`);
        revalidatePath('/sitemap.xml');
      } catch {
        // revalidatePath may fail outside request context
      }
    }

    completeTask(taskId, 'publisher', {
      published: true,
      articleId: article.id,
      slug: article.slug,
    });

    logAiEvent('publisher', `Artigo publicado: ${article.title}`, {
      countryCode: ctx.countryCode,
      metadata: { slug: article.slug },
    });

    return article.id;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'publisher', message);
    logAiEvent('publisher', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
