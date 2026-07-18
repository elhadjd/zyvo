import { getCountryConfig } from '../countries';
import { deepseekService } from '../services/deepseek-service';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getResearchPrompt } from './prompts';
import { getDb } from '../db';
import { researchSources } from '../db/schema';
import { logAiEvent } from '../logger';
import type { AgentContext, ResearchResult } from '../types';

function now(): string {
  return new Date().toISOString();
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export async function runResearchAgent(ctx: AgentContext): Promise<ResearchResult> {
  if (!isAgentEnabled('research')) {
    throw new Error('Research Agent está desativado');
  }

  const config = getCountryConfig(ctx.countryCode);
  if (!config) throw new Error(`País não configurado: ${ctx.countryCode}`);

  const taskId = createTask('research', ctx.countryCode, 'research_content');
  const promptConfig = getResearchPrompt(ctx.countryCode, ctx.topic);

  logAiEvent('research', `Pesquisando: ${ctx.topic ?? config.countryName}`, {
    countryCode: ctx.countryCode,
    metadata: { topic: ctx.topic },
  });

  try {
    const topicList = ctx.topic ?? config.topics.join(', ');

    const response = await deepseekService.chat(
      [
        { role: 'system', content: promptConfig.systemPrompt },
        {
          role: 'user',
          content: `Recherche les sujets les plus pertinents pour entrepreneurs en ${config.countryName}.
${ctx.topic ? `FOCUS: "${ctx.topic}"` : ''}
Sujets prioritaires: ${topicList}
Trouve 5-8 sources, 5 questions FAQ et 10 mots-clés SEO.`,
        },
      ],
      { jsonMode: true, temperature: 0.2, agentCode: 'research', countryCode: ctx.countryCode }
    );

    const result = deepseekService.parseJson<ResearchResult & { sources: ResearchResult['sources'] & { topic?: string }[] }>(response.content);

    if (!ctx.dryRun) {
      const db = getDb();
      const timestamp = now();

      for (const source of result.sources) {
        db.insert(researchSources)
          .values({
            countryCode: ctx.countryCode,
            title: source.title,
            topic: (source as { topic?: string }).topic ?? ctx.topic ?? source.title,
            url: source.url,
            domain: extractDomain(source.url),
            category: source.category,
            keywords: source.keywords,
            snippet: source.snippet,
            relevanceScore: source.relevanceScore,
            taskId,
            fetchedAt: timestamp,
            createdAt: timestamp,
          })
          .run();
      }
    }

    completeTask(taskId, 'research', {
      sourcesFound: result.sources.length,
      topic: ctx.topic,
      tokensUsed: response.usage.totalTokens,
    });

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'research', message);
    logAiEvent('research', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
