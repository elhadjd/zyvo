import { eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getDb } from '../db';
import { growthRecommendations } from '../db/schema';
import type { SupportedCountry } from '../../types';
import type { ContentWeekPlan } from './types';
import { analyzeTraffic } from './traffic-analyzer';
import { analyzeSearchPerformance } from './search-performance-analyzer';
import { getTopArticles, getWeakArticles } from './content-performance-analyzer';
import { getGrowthOpportunities } from './opportunity-detector';
import { getCountryConfig } from '../countries';

function now(): string {
  return new Date().toISOString();
}

export async function generateAiRecommendations(
  countryCode: SupportedCountry
): Promise<{ recommendations: string[]; weekPlan: ContentWeekPlan }> {
  const config = getCountryConfig(countryCode);
  const traffic = analyzeTraffic(countryCode);
  const search = analyzeSearchPerformance(countryCode);
  const topArticles = getTopArticles(countryCode, 3);
  const weakArticles = getWeakArticles(countryCode, 3);
  const opportunities = getGrowthOpportunities(countryCode).slice(0, 5);

  const context = {
    country: config?.countryName ?? countryCode,
    language: config?.language ?? 'fr',
    traffic: { users: traffic.users, sessions: traffic.sessions, weeklyGrowth: traffic.weeklyGrowth },
    search: { clicks: search.totalClicks, keywords: search.rankedKeywords, avgPosition: search.avgPosition },
    topArticles: topArticles.map((a) => ({ id: a.articleId, score: a.totalScore })),
    weakArticles: weakArticles.map((a) => ({ id: a.articleId, score: a.totalScore })),
    opportunities: opportunities.map((o) => o.title),
    categories: config?.categories ?? [],
  };

  const prompt = `Based on real analytics data, create a content strategy for this week.
Return JSON:
{
  "recommendations": ["recommendation 1", "recommendation 2", ...],
  "weekPlan": {
    "week": 1,
    "items": [
      { "category": "Fiscalité", "count": 5, "topics": ["topic1", "topic2"] },
      { "category": "Gestion", "count": 3, "topics": ["topic1"] }
    ]
  }
}

Data: ${JSON.stringify(context, null, 2)}
Answer: "What content should we create this week?"`;

  try {
    const response = await deepseekService.chat(
      [
        {
          role: 'system',
          content: `You are an AI Content Strategist for ZYVO ERP in ${config?.countryName}. Respond in Portuguese. Return valid JSON.`,
        },
        { role: 'user', content: prompt },
      ],
      { jsonMode: true, temperature: 0.4, agentCode: 'research', countryCode }
    );

    const result = deepseekService.parseJson<{
      recommendations: string[];
      weekPlan: ContentWeekPlan;
    }>(response.content);

    return {
      recommendations: result.recommendations ?? [],
      weekPlan: result.weekPlan ?? { week: 1, items: [] },
    };
  } catch {
    return generateFallbackRecommendations(countryCode, config?.categories ?? []);
  }
}

function generateFallbackRecommendations(
  countryCode: SupportedCountry,
  categories: string[]
): { recommendations: string[]; weekPlan: ContentWeekPlan } {
  const traffic = analyzeTraffic(countryCode);
  return {
    recommendations: [
      `Criar mais artigos sobre ${categories[0] ?? 'fiscalidade'} — tema com potencial de crescimento`,
      `Atualizar artigos com score baixo para melhorar posicionamento`,
      `Adicionar links internos nos artigos com mais impressões e poucos cliques`,
      `Criar 2 páginas comerciais programáticas para indústrias em alta`,
      `Foco em conversões: ${traffic.conversions} conversões esta semana — otimizar CTAs`,
    ],
    weekPlan: {
      week: 1,
      items: [
        { category: categories[0] ?? 'Fiscalité', count: 5, topics: ['TVA', 'impôts PME'] },
        { category: categories[1] ?? 'Gestion', count: 3, topics: ['gestion stock', 'ERP'] },
        { category: 'Commercial', count: 2, topics: ['páginas programáticas'] },
      ],
    },
  };
}

export function saveRecommendations(
  countryCode: SupportedCountry,
  recommendations: string[],
  weekPlan: ContentWeekPlan
): number {
  const db = getDb();
  const timestamp = now();
  let saved = 0;

  for (const rec of recommendations) {
    db.insert(growthRecommendations)
      .values({
        country: countryCode,
        category: 'strategy',
        recommendation: rec,
        rationale: 'Gerado pelo AI Content Strategist com base em dados reais',
        priority: 'medium',
        articleCount: weekPlan.items.reduce((s, i) => s + i.count, 0),
        status: 'pending',
        weekPlan: [weekPlan],
        createdAt: timestamp,
      })
      .run();
    saved++;
  }

  return saved;
}

export function getRecommendations(country?: SupportedCountry) {
  const db = getDb();
  let rows = db.select().from(growthRecommendations).all();
  if (country) rows = rows.filter((r) => r.country === country);
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 20);
}
