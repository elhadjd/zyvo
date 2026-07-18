import { desc, eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getCountryConfig } from '../countries';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getDb } from '../db';
import { contentArticles } from '../db/schema';
import { logAiEvent } from '../logger';
import { getEditorPrompt } from './prompts';
import type { AgentContext, WrittenArticle } from '../types';

function now(): string {
  return new Date().toISOString();
}

export async function runEditorAgent(ctx: AgentContext): Promise<number | null> {
  if (!isAgentEnabled('editor')) {
    throw new Error('Editor Agent está desativado');
  }

  const config = getCountryConfig(ctx.countryCode);
  if (!config) throw new Error(`País não configurado: ${ctx.countryCode}`);

  const taskId = createTask('editor', ctx.countryCode, 'edit_article');
  logAiEvent('editor', `Editando artigo para ${config.countryName}`, { countryCode: ctx.countryCode });

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

    if (!article || !['approved', 'pending_review', 'draft'].includes(article.status)) {
      completeTask(taskId, 'editor', { edited: false });
      return null;
    }

    const promptConfig = getEditorPrompt(ctx.countryCode);
    const articleData = {
      title: article.title,
      excerpt: article.excerpt,
      introduction: article.introduction,
      content: article.content,
      faq: article.faq,
      conclusion: article.conclusion,
      cta: article.cta,
    };

    const response = await deepseekService.chat(
      [
        { role: 'system', content: promptConfig.systemPrompt },
        { role: 'user', content: `Édite cet article:\n${JSON.stringify(articleData, null, 2)}` },
      ],
      { jsonMode: true, temperature: 0.3, agentCode: 'editor', countryCode: ctx.countryCode }
    );

    const edited = deepseekService.parseJson<WrittenArticle>(response.content);
    const timestamp = now();

    const contentParagraphs = edited.sections
      ? edited.sections.flatMap((s) => [`## ${s.heading}`, s.content])
      : edited.content;

    if (!ctx.dryRun) {
      db.update(contentArticles)
        .set({
          title: edited.title,
          excerpt: edited.excerpt,
          introduction: edited.introduction,
          content: contentParagraphs,
          faq: edited.faq,
          conclusion: edited.conclusion,
          cta: edited.cta,
          status: ctx.saveAsDraft ? 'pending_review' : article.status,
          updatedAt: timestamp,
        })
        .where(eq(contentArticles.id, article.id))
        .run();
    }

    completeTask(taskId, 'editor', {
      articleId: article.id,
      tokensUsed: response.usage.totalTokens,
    });

    logAiEvent('editor', `Artigo editado: ${edited.title}`, {
      countryCode: ctx.countryCode,
      metadata: { articleId: article.id },
    });

    return article.id;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'editor', message);
    logAiEvent('editor', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
