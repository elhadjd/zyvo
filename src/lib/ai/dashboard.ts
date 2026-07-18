import { count, desc, eq, sql } from 'drizzle-orm';
import { getDb } from './db';
import {
  aiAgents,
  aiLogs,
  contentArticles,
  countryAiConfig,
  knowledgeBase,
  researchSources,
} from './db/schema';
import type { DashboardStats } from './types';

export function getDashboardStats(countryCode?: string): DashboardStats {
  const db = getDb();

  const publishedFilter = countryCode
    ? sql`${contentArticles.countryCode} = ${countryCode} AND ${contentArticles.status} = 'published'`
    : sql`${contentArticles.status} = 'published'`;

  const pendingFilter = countryCode
    ? sql`${contentArticles.countryCode} = ${countryCode} AND ${contentArticles.status} IN ('draft', 'pending_review', 'approved', 'fact_check_failed')`
    : sql`${contentArticles.status} IN ('draft', 'pending_review', 'approved', 'fact_check_failed')`;

  const publishedArticles = db
    .select({ count: count() })
    .from(contentArticles)
    .where(publishedFilter)
    .get()?.count ?? 0;

  const pendingArticles = db
    .select({ count: count() })
    .from(contentArticles)
    .where(pendingFilter)
    .get()?.count ?? 0;

  const sourcesFilter = countryCode
    ? eq(researchSources.countryCode, countryCode)
    : undefined;

  const researchCount = sourcesFilter
    ? db.select({ count: count() }).from(researchSources).where(sourcesFilter).get()?.count ?? 0
    : db.select({ count: count() }).from(researchSources).get()?.count ?? 0;

  const knowledgeFilter = countryCode
    ? eq(knowledgeBase.countryCode, countryCode)
    : undefined;

  const knowledgeCount = knowledgeFilter
    ? db.select({ count: count() }).from(knowledgeBase).where(knowledgeFilter).get()?.count ?? 0
    : db.select({ count: count() }).from(knowledgeBase).get()?.count ?? 0;

  const agents = db.select().from(aiAgents).all();
  const agentStatuses = agents.map((a) => ({
    code: a.code as DashboardStats['agentStatuses'][0]['code'],
    name: a.name,
    status: a.status,
    enabled: a.enabled,
    lastRunAt: a.lastRunAt,
  }));

  const tokensUsed = countryCode
    ? db
        .select()
        .from(countryAiConfig)
        .where(eq(countryAiConfig.countryCode, countryCode))
        .get()?.deepseekTokensUsed ?? 0
    : db
        .select({ total: sql<number>`COALESCE(SUM(${countryAiConfig.deepseekTokensUsed}), 0)` })
        .from(countryAiConfig)
        .get()?.total ?? 0;

  const recentErrors = db
    .select()
    .from(aiLogs)
    .where(eq(aiLogs.level, 'error'))
    .orderBy(desc(aiLogs.createdAt))
    .limit(10)
    .all()
    .map((l) => ({
      id: l.id,
      agentCode: l.agentCode,
      message: l.message,
      createdAt: l.createdAt,
    }));

  const allKeywords = db.select({ keywords: researchSources.keywords }).from(researchSources).all();
  const seoKeywords = allKeywords.reduce((acc, s) => acc + (s.keywords?.length ?? 0), 0);

  return {
    publishedArticles,
    pendingArticles,
    researchSources: researchCount,
    knowledgeEntries: knowledgeCount,
    seoKeywords,
    agentStatuses,
    deepseekTokensUsed: tokensUsed,
    recentErrors,
  };
}
