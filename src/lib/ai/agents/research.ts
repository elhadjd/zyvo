import { callDeepSeek, parseJsonResponse } from '../deepseek';
import { getCountryConfig } from '../countries';
import { logAiEvent } from '../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getDb } from '../db';
import { researchSources } from '../db/schema';
import type { AgentContext, ResearchResult, SupportedCountry } from '../types';

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

  const taskId = createTask('research', ctx.countryCode, 'daily_research');
  logAiEvent('research', `Iniciando pesquisa para ${config.countryName}`, { countryCode: ctx.countryCode });

  try {
    const sourceList = config.sources.map((s) => `- ${s.name} (${s.url}) [${s.type}]`).join('\n');
    const topicList = config.topics.join(', ');

    const response = await callDeepSeek(
      [
        {
          role: 'system',
          content: `Tu es un agent de recherche spécialisé en affaires et entrepreneuriat en ${config.countryName}.
Tu dois UNIQUEMENT proposer des sujets et sources basés sur des institutions réelles.
NE JAMAIS inventer de lois, chiffres ou URLs.
Réponds en JSON avec cette structure exacte:
{
  "sources": [{"title": "...", "url": "...", "category": "...", "keywords": ["..."], "snippet": "...", "relevanceScore": 0.8}],
  "trends": ["..."],
  "faqQuestions": ["..."],
  "seoKeywords": ["..."]
}`,
        },
        {
          role: 'user',
          content: `Recherche les sujets les plus pertinents aujourd'hui pour entrepreneurs en ${config.countryName}.
Catégories: ${config.categories.join(', ')}
Sujets prioritaires: ${topicList}
Sources officielles à considérer:
${sourceList}

Trouve 5-8 sujets tendance, 5 questions FAQ fréquentes et 10 mots-clés SEO.
Pour chaque source, utilise uniquement des domaines des institutions listées ou des URLs plausibles sur ces domaines.`,
        },
      ],
      { jsonMode: true, temperature: 0.2 }
    );

    const result = parseJsonResponse<ResearchResult>(response.content);

    if (!ctx.dryRun) {
      const db = getDb();
      const timestamp = now();

      for (const source of result.sources) {
        db.insert(researchSources)
          .values({
            countryCode: ctx.countryCode,
            title: source.title,
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
      trends: result.trends.length,
      keywords: result.seoKeywords.length,
      tokensUsed: response.usage.totalTokens,
    });

    logAiEvent('research', `Pesquisa concluída: ${result.sources.length} fontes`, {
      countryCode: ctx.countryCode,
      metadata: { trends: result.trends.length },
    });

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'research', message);
    logAiEvent('research', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
