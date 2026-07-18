export type AgentCode =
  | 'research'
  | 'knowledge_organizer'
  | 'content_writer'
  | 'seo_optimizer'
  | 'fact_checker'
  | 'editor'
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

export type FactCheckStatus = 'pending' | 'approved' | 'passed' | 'failed' | 'needs_review';

export type SupportedCountry = 'gn' | 'sn' | 'ao' | 'mz';

export interface AgentDefinition {
  code: AgentCode;
  name: string;
  description: string;
  objective: string;
  schedule: string;
}

export const AGENT_DEFINITIONS: AgentDefinition[] = [
  { code: 'research', name: 'Research Agent', description: 'Pesquisa tendências, FAQs e keywords SEO.', objective: 'Identificar temas populares e oportunidades SEO por país.', schedule: '0 6 * * *' },
  { code: 'knowledge_organizer', name: 'Knowledge Agent', description: 'Organiza pesquisas na base de conhecimento.', objective: 'Transformar pesquisas em memória empresarial.', schedule: '0 8 * * *' },
  { code: 'content_writer', name: 'Writer Agent', description: 'Cria artigos via DeepSeek com fontes validadas.', objective: 'Produzir artigos completos sem inventar informações.', schedule: '0 10 * * *' },
  { code: 'seo_optimizer', name: 'SEO Agent', description: 'Gera meta tags, schema.org e links internos.', objective: 'Otimizar artigos para motores de busca.', schedule: '0 12 * * *' },
  { code: 'fact_checker', name: 'Fact Checker', description: 'Verifica dados, datas, leis e instituições.', objective: 'Garantir precisão factual antes da publicação.', schedule: '0 14 * * *' },
  { code: 'editor', name: 'Editor Agent', description: 'Melhora clareza, gramática e estrutura.', objective: 'Polir artigos aprovados sem alterar fatos.', schedule: '0 15 * * *' },
  { code: 'translation', name: 'Translation Agent', description: 'Prepara traduções PT/FR/EN.', objective: 'Preparar versões multilíngues.', schedule: '0 15 * * *' },
  { code: 'publisher', name: 'Publisher Agent', description: 'Publica no blog, sitemap e RSS.', objective: 'Publicar conteúdo aprovado.', schedule: '0 16 * * *' },
];

export const PIPELINE_STAGES: AgentCode[] = [
  'research',
  'knowledge_organizer',
  'content_writer',
  'seo_optimizer',
  'fact_checker',
  'editor',
  'publisher',
];

export type JobType =
  | 'research_content'
  | 'organize_knowledge'
  | 'generate_article'
  | 'optimize_seo'
  | 'fact_check'
  | 'edit_article'
  | 'publish_article';

export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';

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
  topic?: string;
  articleId?: number;
  saveAsDraft?: boolean;
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
  sections?: { heading: string; content: string }[];
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
  schemaOrganization?: Record<string, unknown>;
  schemaSoftware?: Record<string, unknown>;
  openGraph?: Record<string, unknown>;
  twitterCard?: Record<string, unknown>;
  canonicalUrl?: string;
  hreflangTags?: Record<string, string>;
  internalLinks: { title: string; url: string; anchorText?: string }[];
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
  pendingJobs: number;
  recentErrors: { id: number; agentCode: string; message: string; createdAt: string }[];
  apiRequestsToday: number;
}
