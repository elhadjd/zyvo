import { desc, eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getWriterPrompt } from './prompts';
import { searchKnowledge } from '../research-engine/knowledge-storage';
import { getCountryConfig } from '../countries';
import { logAiEvent } from '../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getDb } from '../db';
import { contentArticles, knowledgeBase } from '../db/schema';
import type { AgentContext, WrittenArticle } from '../types';

function now(): string {
  return new Date().toISOString();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

export async function runContentWriterAgent(ctx: AgentContext): Promise<number | null> {
  if (!isAgentEnabled('content_writer')) {
    throw new Error('Content Writer Agent está desativado');
  }

  const config = getCountryConfig(ctx.countryCode);
  if (!config) throw new Error(`País não configurado: ${ctx.countryCode}`);

  const taskId = createTask('content_writer', ctx.countryCode, 'generate_article');
  logAiEvent('content_writer', `Criando artigo: ${ctx.topic ?? config.countryName}`, { countryCode: ctx.countryCode });

  try {
    const db = getDb();
    let entries = db
      .select()
      .from(knowledgeBase)
      .where(eq(knowledgeBase.countryCode, ctx.countryCode))
      .orderBy(desc(knowledgeBase.createdAt))
      .limit(5)
      .all();

    if (ctx.topic) {
      const searchResults = searchKnowledge(ctx.countryCode, ctx.topic, 5);
      if (searchResults.knowledgeEntries.length > 0) {
        const searchIds = new Set(entries.map((e) => e.id));
        for (const entry of searchResults.knowledgeEntries) {
          if (!searchIds.has(entry.id)) {
            const full = db.select().from(knowledgeBase).where(eq(knowledgeBase.id, entry.id)).get();
            if (full) entries.unshift(full);
          }
        }
        entries = entries.slice(0, 8);
      }
      for (const doc of searchResults.documents) {
        entries.unshift({
          id: doc.id,
          countryCode: ctx.countryCode,
          title: doc.title,
          sourceId: doc.sourceId,
          sourceUrl: doc.sourceUrl,
          sourceTitle: doc.sourceName,
          category: doc.category,
          keywords: [],
          summary: doc.content.slice(0, 300),
          content: doc.content.slice(0, 2000),
          referenceDate: doc.extractedAt.split('T')[0],
          verified: true,
          taskId: null,
          createdAt: doc.createdAt,
          updatedAt: doc.createdAt,
        });
      }
    }

    if (entries.length === 0) {
      completeTask(taskId, 'content_writer', { articleCreated: false });
      return null;
    }

    const knowledgeData = entries.map((e) => ({
      title: e.title,
      category: e.category,
      summary: e.summary,
      content: e.content,
      source: e.sourceTitle,
      sourceUrl: e.sourceUrl,
      keywords: e.keywords,
    }));

    const promptConfig = getWriterPrompt(ctx.countryCode, ctx.topic);

    const response = await deepseekService.chat(
      [
        { role: 'system', content: promptConfig.systemPrompt },
        {
          role: 'user',
          content: `Crée un article${ctx.topic ? ` sur "${ctx.topic}"` : ''} basé sur:\n${JSON.stringify(knowledgeData, null, 2)}`,
        },
      ],
      { jsonMode: true, temperature: 0.4, maxTokens: 6000, agentCode: 'content_writer', countryCode: ctx.countryCode }
    );

    const article = deepseekService.parseJson<WrittenArticle>(response.content);
    const contentParagraphs = article.sections
      ? article.sections.flatMap((s) => [`## ${s.heading}`, s.content])
      : article.content;
    const timestamp = now();
    const slug = slugify(article.title);
    const knowledgeIds = entries.map((e) => e.id);

    let articleId: number | null = null;

    if (!ctx.dryRun) {
      const result = db
        .insert(contentArticles)
        .values({
          countryCode: ctx.countryCode,
          knowledgeIds,
          title: article.title,
          slug,
          excerpt: article.excerpt,
          introduction: article.introduction,
          content: contentParagraphs,
          faq: article.faq,
          conclusion: article.conclusion,
          cta: article.cta,
          category: article.category,
          author: `Équipe ZYVO ${config.countryName}`,
          language: config.language,
          readTime: article.readTime,
          status: ctx.saveAsDraft ? 'pending_review' : 'draft',
          taskId,
          createdAt: timestamp,
          updatedAt: timestamp,
        })
        .run();

      articleId = Number(result.lastInsertRowid);
    }

    completeTask(taskId, 'content_writer', {
      articleId,
      title: article.title,
      tokensUsed: response.usage.totalTokens,
    });

    logAiEvent('content_writer', `Artigo criado: ${article.title}`, {
      countryCode: ctx.countryCode,
      metadata: { articleId },
    });

    return articleId;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'content_writer', message);
    logAiEvent('content_writer', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
