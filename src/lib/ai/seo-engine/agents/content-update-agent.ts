import { eq } from 'drizzle-orm';
import { deepseekService } from '../../services/deepseek-service';
import { getDb } from '../../db';
import { contentArticles, contentFreshnessChecks } from '../../db/schema';
import { logAiEvent } from '../../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from '../../agents/task-helpers';
import type { AgentContext, SupportedCountry } from '../../types';
import type { FreshnessCheckResult } from '../types';

function now(): string {
  return new Date().toISOString();
}

const STALE_DAYS = 180;

function isArticleStale(article: { updatedAt: string; publishedAt: string | null }): boolean {
  const ref = article.publishedAt ?? article.updatedAt;
  const age = Date.now() - new Date(ref).getTime();
  return age > STALE_DAYS * 24 * 60 * 60 * 1000;
}

async function analyzeFreshness(
  article: {
    id: number;
    title: string;
    content: string[];
    category: string;
    updatedAt: string;
  },
  countryCode: SupportedCountry
): Promise<FreshnessCheckResult> {
  if (!isArticleStale(article)) {
    return { articleId: article.id, status: 'fresh', reason: 'Conteúdo recente', severity: 'low' };
  }

  const prompt = `Analyze if this article needs updating. Check for outdated laws, regulations, or trends.
Return JSON: { "status": "fresh|needs_update|outdated", "reason": "...", "severity": "low|medium|high", "suggestedAction": "..." }

Title: ${article.title}
Category: ${article.category}
Last updated: ${article.updatedAt}
Content preview: ${article.content.slice(0, 2).join(' ').slice(0, 500)}`;

  try {
    const response = await deepseekService.chat(
      [
        { role: 'system', content: 'You are a content freshness analyst for African business content.' },
        { role: 'user', content: prompt },
      ],
      { jsonMode: true, temperature: 0.2, agentCode: 'seo_optimizer', countryCode }
    );

    const result = deepseekService.parseJson<FreshnessCheckResult>(response.content);
    return { ...result, articleId: article.id };
  } catch {
    return {
      articleId: article.id,
      status: 'needs_update',
      reason: `Artigo com mais de ${STALE_DAYS} dias sem atualização`,
      severity: 'medium',
      suggestedAction: 'Revisar dados fiscais e regulamentações',
    };
  }
}

function saveFreshnessCheck(result: FreshnessCheckResult): void {
  if (result.status === 'fresh') return;

  const db = getDb();
  const timestamp = now();
  db.insert(contentFreshnessChecks)
    .values({
      articleId: result.articleId,
      status: 'pending',
      reason: result.reason,
      severity: result.severity,
      suggestedAction: result.suggestedAction ?? null,
      checkedAt: timestamp,
      createdAt: timestamp,
    })
    .run();
}

export async function runContentUpdateAgent(ctx: AgentContext): Promise<number> {
  if (!isAgentEnabled('seo_optimizer')) {
    throw new Error('SEO Optimizer Agent está desativado');
  }

  const taskId = createTask('seo_optimizer', ctx.countryCode, 'content_freshness');
  logAiEvent('seo_optimizer', `Content freshness check para ${ctx.countryCode}`, {
    countryCode: ctx.countryCode,
  });

  try {
    const db = getDb();
    const articles = db
      .select()
      .from(contentArticles)
      .where(eq(contentArticles.countryCode, ctx.countryCode))
      .all()
      .filter((a) => a.status === 'published');

    let flagged = 0;

    for (const article of articles) {
      const result = await analyzeFreshness(article, ctx.countryCode);
      if (!ctx.dryRun && result.status !== 'fresh') {
        saveFreshnessCheck(result);
        flagged++;
      }
    }

    completeTask(taskId, 'seo_optimizer', { checked: articles.length, flagged });
    return flagged;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'seo_optimizer', message);
    throw error;
  }
}

export function getPendingFreshnessChecks() {
  const db = getDb();
  return db
    .select()
    .from(contentFreshnessChecks)
    .where(eq(contentFreshnessChecks.status, 'pending'))
    .all();
}
