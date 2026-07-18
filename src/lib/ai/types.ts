export type AgentCode =
  | 'research'
  | 'knowledge_organizer'
  | 'content_writer'
  | 'seo_optimizer'
  | 'fact_checker'
  | 'translation'
  | 'publisher';

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export type ArticleStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'published'
  | 'fact_check_failed';

export type FactCheckStatus = 'pending' | 'passed' | 'failed' | 'needs_review';

export type SupportedCountry = 'gn' | 'sn' | 'ao' | 'mz';

export interface AgentDefinition {
  code: AgentCode;
  name: string;
  description: string;
  schedule: string;
}

export const AGENT_DEFINITIONS: AgentDefinition[] = [
  {
    code: 'research',
    name: 'Research Agent',
    description: 'Pesquisa diária de tendências, FAQs e palavras-chave SEO em fontes oficiais.',
    schedule: '0 6 * * *',
  },
  {
    code: 'knowledge_organizer',
    name: 'Knowledge Organizer',
    description: 'Organiza pesquisas validadas na base de conhecimento estruturada.',
    schedule: '0 8 * * *',
  },
  {
    code: 'content_writer',
    name: 'Content Writer',
    description: 'Transforma conhecimento validado em artigos profissionais via DeepSeek.',
    schedule: '0 10 * * *',
  },
  {
    code: 'seo_optimizer',
    name: 'SEO Optimizer',
    description: 'Gera meta tags, schema.org, URLs amigáveis e links internos.',
    schedule: '0 12 * * *',
  },
  {
    code: 'fact_checker',
    name: 'Fact Checker',
    description: 'Verifica dados, datas, instituições e leis antes da publicação.',
    schedule: '0 14 * * *',
  },
  {
    code: 'translation',
    name: 'Translation Agent',
    description: 'Prepara traduções PT/FR/EN para expansão multi-país.',
    schedule: '0 15 * * *',
  },
  {
    code: 'publisher',
    name: 'Publisher Agent',
    description: 'Publica artigos aprovados no blog, sitemap e RSS.',
    schedule: '0 16 * * *',
  },
];

export const PIPELINE_STAGES: AgentCode[] = [
  'research',
  'knowledge_organizer',
  'content_writer',
  'seo_optimizer',
  'fact_checker',
  'translation',
  'publisher',
];

export interface CountryAiSettings {
  countryCode: SupportedCountry;
  language: string;
  locale: string;
  countryName: string;
  categories: string[];
  topics: string[];
  sources: { name: string; url: string; type: 'government' | 'institution' | 'business' | 'news' }[];
}

export interface DeepSeekUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AgentContext {
  countryCode: SupportedCountry;
  taskId?: number;
  dryRun?: boolean;
}

export interface ResearchResult {
  sources: {
    title: string;
    url: string;
    domain: string;
    category: string;
    keywords: string[];
    snippet: string;
    relevanceScore: number;
  }[];
  trends: string[];
  faqQuestions: string[];
  seoKeywords: string[];
}

export interface WrittenArticle {
  title: string;
  excerpt: string;
  introduction: string;
  content: string[];
  faq: { question: string; answer: string }[];
  conclusion: string;
  cta: string;
  category: string;
  readTime: string;
}

export interface SeoResult {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  keywords: string;
  schemaArticle: Record<string, unknown>;
  schemaFaq: Record<string, unknown>;
  internalLinks: { title: string; url: string }[];
  imageSuggestions: string[];
}

export interface FactCheckResult {
  status: FactCheckStatus;
  issues: { type: string; detail: string; severity: 'low' | 'medium' | 'high' }[];
  notes: string;
}

export interface DashboardStats {
  publishedArticles: number;
  pendingArticles: number;
  researchSources: number;
  knowledgeEntries: number;
  seoKeywords: number;
  agentStatuses: { code: AgentCode; name: string; status: string; enabled: boolean; lastRunAt: string | null }[];
  deepseekTokensUsed: number;
  recentErrors: { id: number; agentCode: string; message: string; createdAt: string }[];
}
