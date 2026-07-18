import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const aiAgents = sqliteTable('ai_agents', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  countryCode: text('country_code'),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  schedule: text('schedule'),
  config: text('config', { mode: 'json' }).$type<Record<string, unknown>>(),
  status: text('status').notNull().default('idle'),
  lastRunAt: text('last_run_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const aiTasks = sqliteTable('ai_tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  agentId: integer('agent_id').references(() => aiAgents.id),
  agentCode: text('agent_code').notNull(),
  countryCode: text('country_code').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull().default('pending'),
  payload: text('payload', { mode: 'json' }).$type<Record<string, unknown>>(),
  result: text('result', { mode: 'json' }).$type<Record<string, unknown>>(),
  error: text('error'),
  scheduledAt: text('scheduled_at'),
  startedAt: text('started_at'),
  completedAt: text('completed_at'),
  createdAt: text('created_at').notNull(),
});

export const researchSources = sqliteTable('research_sources', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  countryCode: text('country_code').notNull(),
  title: text('title').notNull(),
  url: text('url').notNull(),
  domain: text('domain').notNull(),
  category: text('category').notNull(),
  keywords: text('keywords', { mode: 'json' }).$type<string[]>().notNull().default([]),
  snippet: text('snippet'),
  relevanceScore: real('relevance_score').default(0),
  taskId: integer('task_id').references(() => aiTasks.id),
  fetchedAt: text('fetched_at').notNull(),
  createdAt: text('created_at').notNull(),
});

export const knowledgeBase = sqliteTable('knowledge_base', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  countryCode: text('country_code').notNull(),
  title: text('title').notNull(),
  sourceId: integer('source_id').references(() => researchSources.id),
  sourceUrl: text('source_url').notNull(),
  sourceTitle: text('source_title').notNull(),
  category: text('category').notNull(),
  keywords: text('keywords', { mode: 'json' }).$type<string[]>().notNull().default([]),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  referenceDate: text('reference_date'),
  verified: integer('verified', { mode: 'boolean' }).notNull().default(false),
  taskId: integer('task_id').references(() => aiTasks.id),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const contentArticles = sqliteTable('content_articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  countryCode: text('country_code').notNull(),
  knowledgeIds: text('knowledge_ids', { mode: 'json' }).$type<number[]>().notNull().default([]),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  excerpt: text('excerpt').notNull(),
  introduction: text('introduction').notNull(),
  content: text('content', { mode: 'json' }).$type<string[]>().notNull().default([]),
  faq: text('faq', { mode: 'json' }).$type<{ question: string; answer: string }[]>().notNull().default([]),
  conclusion: text('conclusion').notNull(),
  cta: text('cta').notNull(),
  category: text('category').notNull(),
  author: text('author').notNull().default('Équipe ZYVO'),
  language: text('language').notNull().default('fr'),
  readTime: text('read_time').notNull().default('5 min'),
  status: text('status').notNull().default('draft'),
  taskId: integer('task_id').references(() => aiTasks.id),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  publishedAt: text('published_at'),
});

export const seoMetadata = sqliteTable('seo_metadata', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  articleId: integer('article_id')
    .notNull()
    .references(() => contentArticles.id),
  metaTitle: text('meta_title').notNull(),
  metaDescription: text('meta_description').notNull(),
  slug: text('slug').notNull(),
  keywords: text('keywords').notNull(),
  schemaArticle: text('schema_article', { mode: 'json' }).$type<Record<string, unknown>>(),
  schemaFaq: text('schema_faq', { mode: 'json' }).$type<Record<string, unknown>>(),
  internalLinks: text('internal_links', { mode: 'json' }).$type<{ title: string; url: string }[]>().default([]),
  imageSuggestions: text('image_suggestions', { mode: 'json' }).$type<string[]>().default([]),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const factChecks = sqliteTable('fact_checks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  articleId: integer('article_id')
    .notNull()
    .references(() => contentArticles.id),
  status: text('status').notNull().default('pending'),
  issues: text('issues', { mode: 'json' }).$type<{ type: string; detail: string; severity: string }[]>().default([]),
  checkerNotes: text('checker_notes'),
  checkedAt: text('checked_at'),
  createdAt: text('created_at').notNull(),
});

export const aiLogs = sqliteTable('ai_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  agentCode: text('agent_code').notNull(),
  countryCode: text('country_code'),
  level: text('level').notNull().default('info'),
  message: text('message').notNull(),
  metadata: text('metadata', { mode: 'json' }).$type<Record<string, unknown>>(),
  createdAt: text('created_at').notNull(),
});

export const countryAiConfig = sqliteTable('country_ai_config', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  countryCode: text('country_code').notNull().unique(),
  language: text('language').notNull(),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  publishFrequency: text('publish_frequency').notNull().default('daily'),
  autoPublish: integer('auto_publish', { mode: 'boolean' }).notNull().default(false),
  requireApproval: integer('require_approval', { mode: 'boolean' }).notNull().default(true),
  categories: text('categories', { mode: 'json' }).$type<string[]>().notNull().default([]),
  sources: text('sources', { mode: 'json' }).$type<{ name: string; url: string; type: string }[]>().notNull().default([]),
  deepseekTokensUsed: integer('deepseek_tokens_used').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export type AiAgent = typeof aiAgents.$inferSelect;
export type AiTask = typeof aiTasks.$inferSelect;
export type ResearchSource = typeof researchSources.$inferSelect;
export type KnowledgeEntry = typeof knowledgeBase.$inferSelect;
export type ContentArticle = typeof contentArticles.$inferSelect;
export type SeoMeta = typeof seoMetadata.$inferSelect;
export type FactCheck = typeof factChecks.$inferSelect;
export type AiLog = typeof aiLogs.$inferSelect;
export type CountryAiConfig = typeof countryAiConfig.$inferSelect;
