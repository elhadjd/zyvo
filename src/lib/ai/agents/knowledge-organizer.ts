import { desc, eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getKnowledgePrompt } from './prompts';
import { getCountryConfig } from '../countries';
import { logAiEvent } from '../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getDb } from '../db';
import { knowledgeBase, researchSources } from '../db/schema';
import type { AgentContext, SupportedCountry } from '../types';

function now(): string {
  return new Date().toISOString();
}

interface OrganizedKnowledge {
  entries: {
    title: string;
    sourceUrl: string;
    sourceTitle: string;
    category: string;
    keywords: string[];
    summary: string;
    content: string;
    referenceDate: string;
  }[];
}

export async function runKnowledgeOrganizerAgent(ctx: AgentContext): Promise<number> {
  if (!isAgentEnabled('knowledge_organizer')) {
    throw new Error('Knowledge Organizer Agent está desativado');
  }

  const config = getCountryConfig(ctx.countryCode);
  if (!config) throw new Error(`País não configurado: ${ctx.countryCode}`);

  const taskId = createTask('knowledge_organizer', ctx.countryCode, 'organize_knowledge');
  logAiEvent('knowledge_organizer', `Organizando conhecimento para ${config.countryName}`, {
    countryCode: ctx.countryCode,
  });

  try {
    const db = getDb();
    const sources = db
      .select()
      .from(researchSources)
      .where(eq(researchSources.countryCode, ctx.countryCode))
      .orderBy(desc(researchSources.fetchedAt))
      .limit(20)
      .all();

    if (sources.length === 0) {
      completeTask(taskId, 'knowledge_organizer', { entriesCreated: 0 });
      return 0;
    }

    const sourceData = sources.map((s) => ({
      title: s.title,
      url: s.url,
      category: s.category,
      keywords: s.keywords,
      snippet: s.snippet,
    }));

    const promptConfig = getKnowledgePrompt(ctx.countryCode);

    const response = await deepseekService.chat(
      [
        { role: 'system', content: promptConfig.systemPrompt },
        { role: 'user', content: `Organise:\n${JSON.stringify(sourceData, null, 2)}` },
      ],
      { jsonMode: true, temperature: 0.1, agentCode: 'knowledge_organizer', countryCode: ctx.countryCode }
    );

    const organized = deepseekService.parseJson<OrganizedKnowledge>(response.content);
    let created = 0;
    const timestamp = now();

    if (!ctx.dryRun) {
      for (const entry of organized.entries) {
        const matchingSource = sources.find((s) => s.url === entry.sourceUrl);
        db.insert(knowledgeBase)
          .values({
            countryCode: ctx.countryCode,
            title: entry.title,
            sourceId: matchingSource?.id ?? null,
            sourceUrl: entry.sourceUrl,
            sourceTitle: entry.sourceTitle,
            category: entry.category,
            keywords: entry.keywords,
            summary: entry.summary,
            content: entry.content,
            referenceDate: entry.referenceDate,
            verified: false,
            taskId,
            createdAt: timestamp,
            updatedAt: timestamp,
          })
          .run();
        created++;
      }
    } else {
      created = organized.entries.length;
    }

    completeTask(taskId, 'knowledge_organizer', {
      entriesCreated: created,
      tokensUsed: response.usage.totalTokens,
    });

    logAiEvent('knowledge_organizer', `${created} entradas criadas na base de conhecimento`, {
      countryCode: ctx.countryCode,
    });

    return created;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'knowledge_organizer', message);
    logAiEvent('knowledge_organizer', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
