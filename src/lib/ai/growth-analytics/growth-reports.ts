import { eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getDb } from '../db';
import { contentArticles, growthReports } from '../db/schema';
import type { SupportedCountry } from '../types';
import type { WeeklyGrowthReport } from './types';
import { analyzeTraffic } from './traffic-analyzer';
import { analyzeSearchPerformance } from './search-performance-analyzer';
import { getContentScores } from './content-performance-analyzer';
import { getGrowthOpportunities } from './opportunity-detector';
import { generateAiRecommendations } from './ai-recommendations';
import { getCountryConfig } from '../countries';
import { isGoogleAnalyticsConfigured, getVisitorMetrics } from './integrations/google-analytics';
import { isSearchConsoleConfigured, getSearchConsoleMetrics } from './integrations/google-search-console';

function now(): string {
  return new Date().toISOString();
}

function getWeekRange(): { start: string; end: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 7);
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  };
}

export async function generateWeeklyReport(
  countryCode: SupportedCountry
): Promise<WeeklyGrowthReport> {
  const config = getCountryConfig(countryCode);
  const { start, end } = getWeekRange();
  const traffic = analyzeTraffic(countryCode);
  const search = analyzeSearchPerformance(countryCode);
  const scores = getContentScores(countryCode);
  const opportunities = getGrowthOpportunities(countryCode).slice(0, 5);
  const { recommendations } = await generateAiRecommendations(countryCode);

  const avgScore =
    scores.length > 0
      ? Math.round(scores.reduce((s, c) => s + c.totalScore, 0) / scores.length)
      : 0;

  const metrics = {
    visitors: traffic.users,
    sessions: traffic.sessions,
    organicClicks: search.totalClicks,
    conversions: traffic.conversions,
    rankedKeywords: search.rankedKeywords,
    avgContentScore: avgScore,
    weeklyGrowth: traffic.weeklyGrowth,
    openOpportunities: opportunities.length,
  };

  const prompt = `Generate a weekly growth report summary for ZYVO ERP in ${config?.countryName}.
Return JSON: { "summary": "one paragraph summary", "insights": ["insight1", ...], "recommendations": ["rec1", ...] }

Metrics: ${JSON.stringify(metrics)}
Top opportunities: ${opportunities.map((o) => o.title).join(', ')}`;

  try {
    const response = await deepseekService.chat(
      [
        {
          role: 'system',
          content: 'You are a growth marketing analyst. Write in Portuguese. Return valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      { jsonMode: true, temperature: 0.3, agentCode: 'research', countryCode }
    );

    const aiReport = deepseekService.parseJson<{
      summary: string;
      insights: string[];
      recommendations: string[];
    }>(response.content);

    return {
      country: countryCode,
      periodStart: start,
      periodEnd: end,
      summary: aiReport.summary,
      insights: aiReport.insights ?? [],
      recommendations: aiReport.recommendations ?? recommendations,
      metrics,
    };
  } catch {
    return {
      country: countryCode,
      periodStart: start,
      periodEnd: end,
      summary: `Esta semana o ZYVOERP registrou ${traffic.sessions} sessões e ${search.totalClicks} cliques orgânicos em ${config?.countryName}. Crescimento semanal: ${traffic.weeklyGrowth}%.`,
      insights: [
        `O tema com mais tráfego continua sendo conteúdo sobre ${config?.categories?.[0] ?? 'gestão empresarial'}`,
        `${search.rankedKeywords} keywords posicionadas com posição média ${search.avgPosition}`,
        `${opportunities.length} oportunidades de crescimento identificadas`,
      ],
      recommendations,
      metrics,
    };
  }
}

export function saveWeeklyReport(report: WeeklyGrowthReport): number {
  const db = getDb();
  const timestamp = now();

  const result = db
    .insert(growthReports)
    .values({
      country: report.country,
      reportType: 'weekly',
      periodStart: report.periodStart,
      periodEnd: report.periodEnd,
      summary: report.summary,
      insights: report.insights,
      recommendations: report.recommendations,
      metrics: report.metrics,
      status: 'generated',
      createdAt: timestamp,
    })
    .run();

  return Number(result.lastInsertRowid);
}

export function getGrowthReports(country?: SupportedCountry, limit = 10) {
  const db = getDb();
  let rows = db.select().from(growthReports).all();
  if (country) rows = rows.filter((r) => r.country === country);
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export function getLatestReport(country: SupportedCountry) {
  return getGrowthReports(country, 1)[0] ?? null;
}

export function getGrowthDashboardStats(country?: SupportedCountry) {
  const traffic = analyzeTraffic(country);
  const search = country ? analyzeSearchPerformance(country) : { rankedKeywords: 0, totalClicks: 0 };
  const scores = getContentScores(country);
  const db = getDb();

  const hasGaData = getVisitorMetrics(country, 30).length > 0;
  const hasGscData = country
    ? getSearchConsoleMetrics(country, 30).length > 0
    : getSearchConsoleMetrics(undefined, 30).length > 0;

  const published = db
    .select()
    .from(contentArticles)
    .all()
    .filter(
      (a) =>
        (!country || a.countryCode === country) && a.status === 'published'
    ).length;

  const opportunities = getGrowthOpportunities(country).length;

  const pendingRefresh = db
    .select()
    .from(contentArticles)
    .all()
    .filter((a) => {
      if (country && a.countryCode !== country) return false;
      if (a.status !== 'published') return false;
      const age = Date.now() - new Date(a.publishedAt ?? a.updatedAt).getTime();
      return age > 180 * 24 * 60 * 60 * 1000;
    }).length;

  const avgContentScore =
    scores.length > 0
      ? Math.round(scores.reduce((s, c) => s + c.totalScore, 0) / scores.length)
      : 0;

  return {
    visitors: traffic.users,
    sessions: traffic.sessions,
    publishedArticles: published,
    rankedKeywords: search.rankedKeywords,
    topCountry: traffic.topCountry,
    conversions: traffic.conversions,
    openOpportunities: opportunities,
    pendingRefresh,
    avgContentScore,
    weeklyGrowth: traffic.weeklyGrowth,
    organicClicks: search.totalClicks,
    google: {
      ga4Configured: isGoogleAnalyticsConfigured(),
      gscConfigured: isSearchConsoleConfigured(),
      hasGaData,
      hasGscData,
      dataSource: hasGaData || hasGscData ? 'google' : 'none',
    },
  };
}
