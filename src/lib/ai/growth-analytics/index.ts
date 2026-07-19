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
} from './integrations/google-search-console';
import {
  fetchGoogleAnalyticsData,
  getVisitorMetrics,
  isGoogleAnalyticsConfigured,
} from './integrations/google-analytics';
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
  runContentPerformanceAgent,
  runSeoOpportunityAgent,
  runContentStrategistAgent,
  runContentRefreshAgent,
  getRefreshTasks,
};

export class GrowthAnalyticsEngine {
  async syncExternalData(countryCode: SupportedCountry) {
    const gsc = await fetchSearchConsoleData(countryCode);
    const ga = await fetchGoogleAnalyticsData(countryCode);
    return { gscRows: gsc.length, gaRows: ga.length };
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
