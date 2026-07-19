import type { SupportedCountry } from '../../types';
import {
  getSearchConsoleMetrics,
  getTopKeywords,
  getTopPages,
} from './integrations/google-search-console';

export function analyzeSearchPerformance(country: SupportedCountry) {
  const metrics = getSearchConsoleMetrics(country, 30);
  const topKeywords = getTopKeywords(country, 15);
  const topPages = getTopPages(country, 10);

  const totalClicks = metrics.reduce((s, m) => s + m.clicks, 0);
  const totalImpressions = metrics.reduce((s, m) => s + m.impressions, 0);
  const avgPosition =
    metrics.length > 0
      ? metrics.reduce((s, m) => s + m.position, 0) / metrics.length
      : 0;

  const growingKeywords = topKeywords.filter((k) => k.impressions > 200 && k.position > 10 && k.position < 30);
  const underperforming = metrics.filter((m) => m.impressions > 100 && m.ctr < 0.02);

  const indexedPages = new Set(metrics.map((m) => m.pageUrl)).size;

  return {
    totalClicks,
    totalImpressions,
    avgCtr: totalImpressions > 0 ? totalClicks / totalImpressions : 0,
    avgPosition: Math.round(avgPosition * 10) / 10,
    rankedKeywords: topKeywords.length,
    indexedPages,
    topKeywords,
    topPages,
    growingKeywords,
    underperforming: underperforming.slice(0, 10),
  };
}

export function getKeywordGrowth(country: SupportedCountry) {
  const recent = getSearchConsoleMetrics(country, 7);
  const previous = getSearchConsoleMetrics(country, 14).filter((m) => {
    const d = new Date(m.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 14);
    const weekMid = new Date();
    weekMid.setDate(weekMid.getDate() - 7);
    return d >= weekAgo && d < weekMid;
  });

  const recentByKw = aggregateByKeyword(recent);
  const prevByKw = aggregateByKeyword(previous);

  return [...recentByKw.entries()]
    .map(([keyword, data]) => {
      const prev = prevByKw.get(keyword);
      const growth = prev
        ? ((data.impressions - prev.impressions) / Math.max(prev.impressions, 1)) * 100
        : 100;
      return { keyword, ...data, growth: Math.round(growth) };
    })
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 10);
}

function aggregateByKeyword(metrics: { keyword: string; clicks: number; impressions: number; position: number }[]) {
  const map = new Map<string, { clicks: number; impressions: number; position: number }>();
  for (const m of metrics) {
    const existing = map.get(m.keyword) ?? { clicks: 0, impressions: 0, position: 0 };
    map.set(m.keyword, {
      clicks: existing.clicks + m.clicks,
      impressions: existing.impressions + m.impressions,
      position: (existing.position + m.position) / 2,
    });
  }
  return map;
}
