export type { SupportedCountry } from '../types';
import type { SupportedCountry } from '../types';

export interface GrowthDashboardStats {
  visitors: number;
  sessions: number;
  publishedArticles: number;
  rankedKeywords: number;
  topCountry: string;
  conversions: number;
  openOpportunities: number;
  pendingRefresh: number;
  avgContentScore: number;
  weeklyGrowth: number;
}

export interface ContentScore {
  articleId: number;
  title: string;
  country: SupportedCountry;
  seoScore: number;
  engagementScore: number;
  conversionScore: number;
  totalScore: number;
  traffic: number;
  avgPosition: number;
}

export interface GrowthOpportunity {
  keyword?: string;
  pageUrl?: string;
  opportunityType: 'new_content' | 'improve_meta' | 'add_links' | 'update_content' | 'commercial_page';
  title: string;
  description: string;
  currentPosition?: number;
  impressions?: number;
  clicks?: number;
  priority: 'low' | 'medium' | 'high';
  suggestedAction: string;
  articleId?: number;
}

export interface WeeklyGrowthReport {
  country: SupportedCountry;
  periodStart: string;
  periodEnd: string;
  summary: string;
  insights: string[];
  recommendations: string[];
  metrics: Record<string, number>;
}

export interface ContentWeekPlan {
  week: number;
  items: { category: string; count: number; topics: string[] }[];
}

export type ConversionAction =
  | 'signup'
  | 'demo_request'
  | 'free_trial_click'
  | 'whatsapp_contact'
  | 'contact_form'
  | 'pricing_view';

export interface SearchConsoleRow {
  country: string;
  pageUrl: string;
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  date: string;
}

export interface VisitorMetricRow {
  country: string;
  pageUrl: string;
  users: number;
  sessions: number;
  avgTimeOnPage: number;
  bounceRate: number;
  landingPage?: string;
  conversions: number;
  date: string;
}
