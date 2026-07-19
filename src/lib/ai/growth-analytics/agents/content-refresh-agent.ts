import { eq } from 'drizzle-orm';
import { deepseekService } from '../../services/deepseek-service';
import { getDb } from '../../db';
import { contentArticles, contentRefreshTasks } from '../../db/schema';
import { logAiEvent } from '../../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from '../../agents/task-helpers';
import { getPendingFreshnessChecks } from '../../seo-engine/agents/content-update-agent';
import type { AgentContext, SupportedCountry } from '../../types';

function now(): string {
  return new Date().toISOString();
}

const STALE_DAYS = 365;

async function analyzeRefreshNeeds(
  article: {
    id: number;
    title: string;
    content: string[];
    category: string;
    publishedAt: string | null;
    updatedAt: string;
  },
  countryCode: SupportedCountry
): Promise<{ issues: string[]; reason: string; priority: string }> {
  const age = Math.floor(
    (Date.now() - new Date(article.publishedAt ?? article.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (age < STALE_DAYS) {
    return { issues: [], reason: '', priority: 'low' };
  }

  const prompt = `Check this article for refresh needs: outdated info, broken links, legal changes.
Return JSON: { "issues": ["issue1"], "reason": "...", "priority": "low|medium|high" }

Title: ${article.title}
Published: ${article.publishedAt}
Age: ${age} days
Category: ${article.category}`;

  try {
    const response = await deepseekService.chat(
      [
        { role: 'system', content: 'You are a content refresh analyst for African business content.' },
        { role: 'user', content: prompt },
      ],
      { jsonMode: true, temperature: 0.2, agentCode: 'research', countryCode }
    );

    return deepseekService.parseJson(response.content);
  } catch {
    return {
      issues: ['Informação potencialmente desatualizada', 'Revisar regulamentações'],
      reason: `Artigo publicado há ${age} dias sem atualização`,
      priority: age > 365 ? 'high' : 'medium',
    };
  }
}

export async function runContentRefreshAgent(ctx: AgentContext): Promise<number> {
  if (!isAgentEnabled('research')) {
    throw new Error('Research Agent está desativado');
  }

  const taskId = createTask('research', ctx.countryCode, 'content_refresh');
  logAiEvent('research', `Content Refresh Agent para ${ctx.countryCode}`, {
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

    let tasksCreated = 0;
    const timestamp = now();

    for (const article of articles) {
      const analysis = await analyzeRefreshNeeds(article, ctx.countryCode);
      if (analysis.issues.length === 0) continue;

      const existing = db
        .select()
        .from(contentRefreshTasks)
        .where(eq(contentRefreshTasks.articleId, article.id))
        .all()
        .find((t) => t.status === 'pending');

      if (existing) continue;

      if (!ctx.dryRun) {
        db.insert(contentRefreshTasks)
          .values({
            articleId: article.id,
            country: ctx.countryCode,
            reason: analysis.reason,
            issues: analysis.issues,
            priority: analysis.priority,
            status: 'pending',
            assignedAt: timestamp,
            createdAt: timestamp,
          })
          .run();
        tasksCreated++;
      }
    }

    const freshnessChecks = getPendingFreshnessChecks().filter((c) => {
      const art = db.select().from(contentArticles).where(eq(contentArticles.id, c.articleId)).get();
      return art?.countryCode === ctx.countryCode;
    });

    completeTask(taskId, 'research', {
      checked: articles.length,
      tasksCreated,
      freshnessPending: freshnessChecks.length,
    });

    return tasksCreated;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'research', message);
    throw error;
  }
}

export function getRefreshTasks(country?: SupportedCountry) {
  const db = getDb();
  let rows = db.select().from(contentRefreshTasks).all();
  if (country) rows = rows.filter((r) => r.country === country);
  return rows.filter((r) => r.status === 'pending');
}
