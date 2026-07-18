import { desc, eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getFactCheckerPrompt } from './prompts';
import { getCountryConfig } from '../countries';
import { logAiEvent } from '../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getDb } from '../db';
import { contentArticles, factChecks, knowledgeBase } from '../db/schema';
import type { AgentContext, FactCheckResult } from '../types';

function now(): string {
  return new Date().toISOString();
}

export async function runFactCheckerAgent(ctx: AgentContext): Promise<FactCheckResult | null> {
  if (!isAgentEnabled('fact_checker')) {
    throw new Error('Fact Checker Agent está desativado');
  }

  const config = getCountryConfig(ctx.countryCode);
  if (!config) throw new Error(`País não configurado: ${ctx.countryCode}`);

  const taskId = createTask('fact_checker', ctx.countryCode, 'fact_check');
  logAiEvent('fact_checker', `Verificando fatos para ${config.countryName}`, { countryCode: ctx.countryCode });

  try {
    const db = getDb();
    const article = db
      .select()
      .from(contentArticles)
      .where(eq(contentArticles.countryCode, ctx.countryCode))
      .orderBy(desc(contentArticles.createdAt))
      .limit(1)
      .get();

    if (!article || !['pending_review', 'draft'].includes(article.status)) {
      completeTask(taskId, 'fact_checker', { checked: false });
      return null;
    }

    const knowledgeEntries = article.knowledgeIds.length
      ? db
          .select()
          .from(knowledgeBase)
          .where(eq(knowledgeBase.countryCode, ctx.countryCode))
          .all()
          .filter((k) => article.knowledgeIds.includes(k.id))
      : [];

    const promptConfig = getFactCheckerPrompt(ctx.countryCode);

    const response = await deepseekService.chat(
      [
        { role: 'system', content: promptConfig.systemPrompt },
        {
          role: 'user',
          content: `Article:\n${JSON.stringify({ title: article.title, introduction: article.introduction, content: article.content, faq: article.faq }, null, 2)}\n\nSources:\n${JSON.stringify(knowledgeEntries.map((k) => ({ title: k.title, source: k.sourceTitle, content: k.content })), null, 2)}`,
        },
      ],
      { jsonMode: true, temperature: 0.1, agentCode: 'fact_checker', countryCode: ctx.countryCode }
    );

    const result = deepseekService.parseJson<FactCheckResult>(response.content);
    const timestamp = now();

    if (!ctx.dryRun) {
      db.insert(factChecks)
        .values({
          articleId: article.id,
          status: result.status,
          issues: result.issues,
          checkerNotes: result.notes,
          checkedAt: timestamp,
          createdAt: timestamp,
        })
        .run();

      const newStatus =
        result.status === 'approved' || result.status === 'passed'
          ? ctx.saveAsDraft
            ? 'pending_review'
            : 'approved'
          : 'pending_review';

      db.update(contentArticles)
        .set({ status: newStatus, updatedAt: timestamp })
        .where(eq(contentArticles.id, article.id))
        .run();
    }

    completeTask(taskId, 'fact_checker', {
      articleId: article.id,
      status: result.status,
      issuesCount: result.issues.length,
      tokensUsed: response.usage.totalTokens,
    });

    logAiEvent(
      'fact_checker',
      `Fact-check ${result.status}: ${article.title} (${result.issues.length} issues)`,
      { countryCode: ctx.countryCode, level: result.status === 'failed' ? 'warn' : 'info' }
    );

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'fact_checker', message);
    logAiEvent('fact_checker', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
