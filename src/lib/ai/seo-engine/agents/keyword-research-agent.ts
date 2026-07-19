import { desc, eq } from 'drizzle-orm';
import { getDb } from '../../db';
import { contentArticles } from '../../db/schema';
import { logAiEvent } from '../../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from '../../agents/task-helpers';
import type { AgentContext } from '../../types';
import { analyzeKeywords, saveSeoKeywords } from '../keyword-analyzer';

export async function runKeywordResearchAgent(ctx: AgentContext): Promise<number | null> {
  if (!isAgentEnabled('seo_optimizer')) {
    throw new Error('SEO Optimizer Agent está desativado');
  }

  const taskId = createTask('seo_optimizer', ctx.countryCode, 'keyword_research');
  logAiEvent('seo_optimizer', `Keyword research para ${ctx.countryCode}`, {
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
      completeTask(taskId, 'seo_optimizer', { keywords: 0 });
      return null;
    }

    const analysis = await analyzeKeywords(article, ctx.countryCode);
    let keywordCount = 0;

    if (!ctx.dryRun) {
      const ids = saveSeoKeywords(article, ctx.countryCode, analysis);
      keywordCount = ids.length;
    }

    completeTask(taskId, 'seo_optimizer', {
      articleId: article.id,
      primaryKeyword: analysis.primaryKeyword,
      keywordCount,
    });

    return keywordCount;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'seo_optimizer', message);
    throw error;
  }
}
