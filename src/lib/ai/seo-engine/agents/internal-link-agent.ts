import { desc, eq } from 'drizzle-orm';
import { getDb } from '../../db';
import { contentArticles } from '../../db/schema';
import { logAiEvent } from '../../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from '../../agents/task-helpers';
import type { AgentContext } from '../../types';
import { suggestInternalLinks, saveInternalLinks } from '../internal-link-builder';

export async function runInternalLinkAgent(ctx: AgentContext): Promise<number | null> {
  if (!isAgentEnabled('seo_optimizer')) {
    throw new Error('SEO Optimizer Agent está desativado');
  }

  const taskId = createTask('seo_optimizer', ctx.countryCode, 'internal_links');
  logAiEvent('seo_optimizer', `Internal links para ${ctx.countryCode}`, {
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

    if (!article) {
      completeTask(taskId, 'seo_optimizer', { links: 0 });
      return null;
    }

    const suggestions = await suggestInternalLinks(article, ctx.countryCode);
    let linkCount = 0;

    if (!ctx.dryRun && suggestions.length > 0) {
      linkCount = saveInternalLinks(article.id, ctx.countryCode, suggestions);
    }

    completeTask(taskId, 'seo_optimizer', {
      articleId: article.id,
      linkCount,
      suggestions: suggestions.map((s) => s.anchorText),
    });

    return linkCount;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'seo_optimizer', message);
    throw error;
  }
}
