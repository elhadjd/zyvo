import type { SupportedCountry } from '../types';
import { analyzeTraffic, getCountryTrafficBreakdown } from './traffic-analyzer';
import { analyzeSearchPerformance, getKeywordGrowth } from './search-performance-analyzer';
import {
  analyzeAllContent,
  getContentScores,
  getTopArticles,
  getWeakArticles,
} from './content-performance-analyzer';
import { detectOpportunities, getGrowthOpportunities } from './opportunity-detector';
import { generateAiRecommendations, getRecommendations } from './ai-recommendations';
import {
  generateWeeklyReport,
  saveWeeklyReport,
  getGrowthReports,
  getLatestReport,
  getGrowthDashboardStats,
} from './growth-reports';
import { trackConversion, getConversionEvents, getConversionSummary } from './conversion-tracker';
import {
  fetchSearchConsoleData,
  getSearchConsoleMetrics,
  getTopKeywords,
  isSearchConsoleConfigured,
  saveSearchConsoleMetrics,
  clearSearchConsoleMetrics,
} from './integrations/google-search-console';
import {
  fetchGoogleAnalyticsData,
  getVisitorMetrics,
  isGoogleAnalyticsConfigured,
  saveVisitorMetrics,
  clearVisitorMetrics,
} from './integrations/google-analytics';
import { testGoogleConnection, type GoogleConnectionStatus } from './integrations/google-auth';
import { runContentPerformanceAgent } from './agents/content-performance-agent';
import { runSeoOpportunityAgent } from './agents/seo-opportunity-agent';
import { runContentStrategistAgent } from './agents/content-strategist-agent';
import { runContentRefreshAgent, getRefreshTasks } from './agents/content-refresh-agent';

export {
  analyzeTraffic,
  getCountryTrafficBreakdown,
  analyzeSearchPerformance,
  getKeywordGrowth,
  analyzeAllContent,
  getContentScores,
  getTopArticles,
  getWeakArticles,
  detectOpportunities,
  getGrowthOpportunities,
  generateAiRecommendations,
  getRecommendations,
  generateWeeklyReport,
  saveWeeklyReport,
  getGrowthReports,
  getLatestReport,
  getGrowthDashboardStats,
  trackConversion,
  getConversionEvents,
  getConversionSummary,
  fetchSearchConsoleData,
  getSearchConsoleMetrics,
  getTopKeywords,
  fetchGoogleAnalyticsData,
  getVisitorMetrics,
  isSearchConsoleConfigured,
  isGoogleAnalyticsConfigured,
  saveSearchConsoleMetrics,
  saveVisitorMetrics,
  clearSearchConsoleMetrics,
  clearVisitorMetrics,
  testGoogleConnection,
  runContentPerformanceAgent,
  runSeoOpportunityAgent,
  runContentStrategistAgent,
  runContentRefreshAgent,
  getRefreshTasks,
};

export type { GoogleConnectionStatus };

export function purgeDemoGoogleMetrics(): { visitorRows: number; gscRows: number } {
  return {
    visitorRows: clearVisitorMetrics(),
    gscRows: clearSearchConsoleMetrics(),
  };
}

export class GrowthAnalyticsEngine {
  async syncExternalData(countryCode: SupportedCountry) {
    const errors: string[] = [];
    let gscRows: Awaited<ReturnType<typeof fetchSearchConsoleData>> = [];
    let gaRows: Awaited<ReturnType<typeof fetchGoogleAnalyticsData>> = [];

    try {
      gscRows = await fetchSearchConsoleData(countryCode);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Erro GSC');
    }

    try {
      gaRows = await fetchGoogleAnalyticsData(countryCode);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Erro GA4');
    }

    if (errors.length === 2) {
      throw new Error(errors.join(' | '));
    }

    clearSearchConsoleMetrics(countryCode);
    clearVisitorMetrics(countryCode);

    const savedGsc = saveSearchConsoleMetrics(gscRows);
    const savedGa = saveVisitorMetrics(gaRows);

    return {
      source: 'google',
      gscRows: savedGsc,
      gaRows: savedGa,
      errors,
      syncedAt: new Date().toISOString(),
    };
  }

  async testGoogleConnection(): Promise<GoogleConnectionStatus> {
    return testGoogleConnection();
  }

  async runFullAnalysis(countryCode: SupportedCountry) {
    await this.syncExternalData(countryCode);
    const scores = await runContentPerformanceAgent({ countryCode });
    const opportunities = await runSeoOpportunityAgent({ countryCode });
    const recommendations = await runContentStrategistAgent({ countryCode });
    const refresh = await runContentRefreshAgent({ countryCode });
    return { scores, opportunities, recommendations, refresh };
  }

  async generateReport(countryCode: SupportedCountry) {
    const report = await generateWeeklyReport(countryCode);
    const id = saveWeeklyReport(report);
    return { id, report };
  }

  getDashboard(country?: SupportedCountry) {
    return getGrowthDashboardStats(country);
  }
}

export const growthAnalyticsEngine = new GrowthAnalyticsEngine();

export async function runWeeklyGrowthJob(countryCode: SupportedCountry) {
  await growthAnalyticsEngine.syncExternalData(countryCode);
  const analysis = await growthAnalyticsEngine.runFullAnalysis(countryCode);
  const { id, report } = await growthAnalyticsEngine.generateReport(countryCode);
  return { analysis, reportId: id, report };
}
