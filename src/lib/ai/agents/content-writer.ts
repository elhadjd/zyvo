import { desc, eq } from 'drizzle-orm';
import { callDeepSeek, parseJsonResponse } from '../deepseek';
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

  const taskId = createTask('content_writer', ctx.countryCode, 'write_article');
  logAiEvent('content_writer', `Criando artigo para ${config.countryName}`, { countryCode: ctx.countryCode });

  try {
    const db = getDb();
    const entries = db
      .select()
      .from(knowledgeBase)
      .where(eq(knowledgeBase.countryCode, ctx.countryCode))
      .orderBy(desc(knowledgeBase.createdAt))
      .limit(5)
      .all();

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

    const langInstruction =
      config.language === 'fr'
        ? 'Écris en français professionnel adapté aux entrepreneurs guinéens.'
        : config.language === 'pt'
          ? 'Escreve em português profissional adaptado a empresários locais.'
          : 'Write in professional English for local business owners.';

    const response = await callDeepSeek(
      [
        {
          role: 'system',
          content: `Tu es rédacteur expert pour ZYVO ERP, plateforme de gestion d'entreprise.
${langInstruction}
Règles STRICTES:
- Utilise UNIQUEMENT les informations de la base de connaissance fournie
- Ne jamais inventer de chiffres, lois ou institutions
- Cite les sources dans le contenu quand pertinent
- Structure: introduction, contenu principal (paragraphes), exemples pratiques, FAQ (3-5 questions), conclusion, CTA ZYVO
Réponds en JSON:
{"title":"...","excerpt":"...","introduction":"...","content":["paragraphe1","..."],"faq":[{"question":"...","answer":"..."}],"conclusion":"...","cta":"...","category":"...","readTime":"X min"}`,
        },
        {
          role: 'user',
          content: `Crée un article professionnel basé sur ces entrées de connaissance:\n${JSON.stringify(knowledgeData, null, 2)}`,
        },
      ],
      { jsonMode: true, temperature: 0.4, maxTokens: 6000 }
    );

    const article = parseJsonResponse<WrittenArticle>(response.content);
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
          content: article.content,
          faq: article.faq,
          conclusion: article.conclusion,
          cta: article.cta,
          category: article.category,
          author: `Équipe ZYVO ${config.countryName}`,
          language: config.language,
          readTime: article.readTime,
          status: 'draft',
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
