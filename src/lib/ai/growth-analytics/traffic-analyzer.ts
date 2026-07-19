import type { SupportedCountry } from '../../types';
import { getTrafficSummary, getVisitorMetrics } from './integrations/google-analytics';
import { getSearchConsoleMetrics, getTopPages } from './integrations/google-search-console';

export function analyzeTraffic(country?: SupportedCountry) {
  const summary = getTrafficSummary(country);
  const visitorData = getVisitorMetrics(country, 7);
  const searchData = getSearchConsoleMetrics(country, 7);

  const dailyTraffic = visitorData.reduce(
    (acc, m) => {
      const day = m.date;
      acc[day] = (acc[day] ?? 0) + m.sessions;
      return acc;
    },
    {} as Record<string, number>
  );

  const organicClicks = searchData.reduce((sum, m) => sum + m.clicks, 0);
  const organicImpressions = searchData.reduce((sum, m) => sum + m.impressions, 0);

  const topPages = country ? getTopPages(country, 5) : [];

  const prevWeek = getVisitorMetrics(country, 14).filter((m) => {
    const d = new Date(m.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 14);
    const weekMid = new Date();
    weekMid.setDate(weekMid.getDate() - 7);
    return d >= weekAgo && d < weekMid;
  });

  const thisWeek = getVisitorMetrics(country, 7);
  const prevSessions = prevWeek.reduce((s, m) => s + m.sessions, 0);
  const thisSessions = thisWeek.reduce((s, m) => s + m.sessions, 0);
  const weeklyGrowth =
    prevSessions > 0 ? ((thisSessions - prevSessions) / prevSessions) * 100 : 0;

  return {
    users: summary.users,
    sessions: summary.sessions,
    conversions: summary.conversions,
    topCountry: summary.topCountry,
    organicClicks,
    organicImpressions,
    avgCtr: organicImpressions > 0 ? organicClicks / organicImpressions : 0,
    dailyTraffic,
    topPages,
    weeklyGrowth: Math.round(weeklyGrowth * 10) / 10,
  };
}

export function getCountryTrafficBreakdown() {
  const countries: SupportedCountry[] = ['gn', 'sn', 'ci', 'ao', 'mz'];
  return countries.map((c) => ({
    country: c,
    ...getTrafficSummary(c),
  }));
}
