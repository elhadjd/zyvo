import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { contentOpportunities } from '../db/schema';
import { getDiscoveredKeywords } from './keyword-discovery';
import { analyzeTrends } from './trend-analyzer';
import {
  calculateOpportunityScore,
  estimateBusinessRelevance,
  estimateZyvoRelevance,
} from './scoring';
import { logResearchEvent } from './research-logger';
import { wasTopicAlreadyCovered } from './topic-dedup';
import type { ContentOpportunity } from './types';
import type { SupportedCountry } from '../types';

function now(): string {
  return new Date().toISOString();
}

function normalizeTopic(topic: string): string {
  return topic
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getExistingOpportunityTopics(countryCode: SupportedCountry): Set<string> {
  const db = getDb();
  const rows = db.select().from(contentOpportunities).all().filter((row) => row.countryCode === countryCode);
  return new Set(rows.map((row) => normalizeTopic(row.topic)));
}

export async function findContentOpportunities(
  countryCode: SupportedCountry
): Promise<ContentOpportunity[]> {
  logResearchEvent(countryCode, 'opportunity_finder', 'start', 'Buscando oportunidades de conteúdo');

  const keywords = getDiscoveredKeywords(countryCode, 50);
  const trends = await analyzeTrends(countryCode);
  const db = getDb();
  const timestamp = now();
  const opportunities: ContentOpportunity[] = [];
  const existingTopics = getExistingOpportunityTopics(countryCode);

  const topicCandidates = new Map<string, { category: string; keywordIds: number[]; seoScore: number }>();

  for (const kw of keywords) {
    const existing = topicCandidates.get(kw.keyword);
    if (existing) {
      existing.keywordIds.push(kw.id);
      existing.seoScore = Math.max(existing.seoScore, kw.seoScore);
    } else {
      topicCandidates.set(kw.keyword, {
        category: kw.category,
        keywordIds: [kw.id],
        seoScore: kw.seoScore,
      });
    }
  }

  for (const trend of trends.trends) {
    if (!topicCandidates.has(trend.topic)) {
      topicCandidates.set(trend.topic, {
        category: 'Negócios',
        keywordIds: [],
        seoScore: trend.relevance,
      });
    }
  }

  for (const [topic, data] of topicCandidates) {
    const normalized = normalizeTopic(topic);
    if (existingTopics.has(normalized)) continue;
    if (wasTopicAlreadyCovered(countryCode, topic)) continue;

    const businessRelevance = estimateBusinessRelevance(data.category);
    const zyvoRelevance = estimateZyvoRelevance(topic, data.category);
    const competition = Math.max(20, 100 - data.seoScore);
    const totalScore = calculateOpportunityScore({
      searchInterest: data.seoScore,
      businessRelevance,
      competition,
      zyvoRelevance,
    });

    if (totalScore < 40) continue;

    const result = db
      .insert(contentOpportunities)
      .values({
        countryCode,
        topic,
        category: data.category,
        seoScore: data.seoScore,
        businessRelevance,
        competition,
        zyvoRelevance,
        totalScore,
        status: totalScore >= 70 ? 'approved' : 'pending',
        keywordIds: data.keywordIds,
        createdAt: timestamp,
      })
      .run();

    existingTopics.add(normalized);
    opportunities.push({
      id: Number(result.lastInsertRowid),
      countryCode,
      topic,
      category: data.category,
      seoScore: data.seoScore,
      businessRelevance,
      competition,
      zyvoRelevance,
      totalScore,
      status: totalScore >= 70 ? 'approved' : 'pending',
      keywordIds: data.keywordIds,
      createdAt: timestamp,
    });
  }

  opportunities.sort((a, b) => b.totalScore - a.totalScore);

  logResearchEvent(countryCode, 'opportunity_finder', 'complete', `${opportunities.length} oportunidades encontradas`, {
    metadata: { topScore: opportunities[0]?.totalScore ?? 0 },
  });

  return opportunities;
}

export function getContentOpportunities(countryCode?: SupportedCountry, limit = 50): ContentOpportunity[] {
  const db = getDb();
  let opps = db.select().from(contentOpportunities).all();
  if (countryCode) opps = opps.filter((o) => o.countryCode === countryCode);
  return opps
    .filter((o) => o.status !== 'used')
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, limit) as ContentOpportunity[];
}

export function getTopApprovedOpportunity(countryCode: SupportedCountry): ContentOpportunity | undefined {
  return getContentOpportunities(countryCode).find((o) => o.status === 'approved');
}

export function markOpportunityUsed(countryCode: SupportedCountry, topic: string): void {
  const db = getDb();
  const normalized = normalizeTopic(topic);
  const rows = db
    .select()
    .from(contentOpportunities)
    .all()
    .filter((row) => row.countryCode === countryCode && normalizeTopic(row.topic) === normalized);

  for (const row of rows) {
    db.update(contentOpportunities)
      .set({ status: 'used' })
      .where(eq(contentOpportunities.id, row.id))
      .run();
  }
}
