import type { SupportedCountry } from '../types';

export type SourceType = 'official' | 'government' | 'education' | 'news' | 'business' | 'institution';
export type SourceStatus = 'active' | 'inactive' | 'error' | 'pending';
export type ValidationStatus = 'validated' | 'requires_review' | 'rejected' | 'pending';
export type KeywordPriority = 'low' | 'medium' | 'high' | 'critical';
export type SearchIntent = 'informational' | 'transactional' | 'navigational' | 'commercial';

export interface ManagedSource {
  id: number;
  countryCode: SupportedCountry;
  name: string;
  url: string;
  type: SourceType;
  category: string;
  trustLevel: number;
  status: SourceStatus;
  lastChecked: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DiscoveredKeyword {
  id: number;
  countryCode: SupportedCountry;
  keyword: string;
  searchIntent: SearchIntent;
  category: string;
  priority: KeywordPriority;
  seoScore: number;
  status: string;
  createdAt: string;
}

export interface KnowledgeDocument {
  id: number;
  countryCode: SupportedCountry;
  title: string;
  content: string;
  sourceId: number | null;
  sourceUrl: string;
  sourceName: string;
  category: string;
  validationStatus: ValidationStatus;
  extractedAt: string;
  createdAt: string;
}

export interface ContentOpportunity {
  id: number;
  countryCode: SupportedCountry;
  topic: string;
  category: string;
  seoScore: number;
  businessRelevance: number;
  competition: number;
  zyvoRelevance: number;
  totalScore: number;
  status: string;
  keywordIds: number[];
  createdAt: string;
}

export interface ResearchLogEntry {
  id: number;
  countryCode: SupportedCountry;
  action: string;
  module: string;
  message: string;
  metadata: Record<string, unknown> | null;
  level: 'info' | 'warn' | 'error';
  createdAt: string;
}

export interface OpportunityScoreInput {
  searchInterest: number;
  businessRelevance: number;
  competition: number;
  zyvoRelevance: number;
}

export interface ResearchEngineResult {
  countryCode: SupportedCountry;
  keywordsDiscovered: number;
  opportunitiesFound: number;
  documentsExtracted: number;
  documentsValidated: number;
  topOpportunities: ContentOpportunity[];
  completedAt: string;
}

export interface KnowledgeSearchResult {
  documents: KnowledgeDocument[];
  knowledgeEntries: { id: number; title: string; summary: string; sourceUrl: string; category: string }[];
  query: string;
  totalResults: number;
}

export const RESEARCH_CATEGORIES = [
  'Negócios',
  'Fiscalidade',
  'Empreendedorismo',
  'Tecnologia',
  'IA',
  'Marketing',
  'Vendas',
  'Gestão',
] as const;

export const TRUST_LEVELS: Record<SourceType, number> = {
  government: 95,
  official: 90,
  institution: 85,
  education: 80,
  business: 70,
  news: 60,
};
