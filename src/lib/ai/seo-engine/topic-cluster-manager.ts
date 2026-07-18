import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { topicClusters, contentArticles } from '../db/schema';
import type { SupportedCountry } from '../types';
import type { TopicClusterInput } from './types';

function now(): string {
  return new Date().toISOString();
}

export function createTopicCluster(input: TopicClusterInput): number {
  const db = getDb();
  const timestamp = now();

  const result = db
    .insert(topicClusters)
    .values({
      name: input.name,
      country: input.country,
      category: input.category,
      mainKeyword: input.mainKeyword,
      relatedArticles: input.relatedArticleIds,
      pillarArticleId: input.pillarArticleId ?? null,
      status: 'active',
      createdAt: timestamp,
      updatedAt: timestamp,
    })
    .run();

  return Number(result.lastInsertRowid);
}

export function assignArticleToCluster(
  clusterId: number,
  articleId: number,
  asPillar = false
): void {
  const db = getDb();
  const cluster = db.select().from(topicClusters).where(eq(topicClusters.id, clusterId)).get();
  if (!cluster) return;

  const related = [...(cluster.relatedArticles ?? [])];
  if (!related.includes(articleId)) related.push(articleId);

  db.update(topicClusters)
    .set({
      relatedArticles: related,
      pillarArticleId: asPillar ? articleId : cluster.pillarArticleId,
      updatedAt: now(),
    })
    .where(eq(topicClusters.id, clusterId))
    .run();
}

export function findOrCreateClusterForArticle(
  countryCode: SupportedCountry,
  category: string,
  mainKeyword: string,
  articleId: number
): number {
  const db = getDb();
  const existing = db
    .select()
    .from(topicClusters)
    .where(eq(topicClusters.country, countryCode))
    .all()
    .find((c) => c.category === category || c.mainKeyword === mainKeyword);

  if (existing) {
    assignArticleToCluster(existing.id, articleId);
    return existing.id;
  }

  return createTopicCluster({
    name: `${category} — ${countryCode.toUpperCase()}`,
    country: countryCode,
    category,
    mainKeyword,
    relatedArticleIds: [articleId],
    pillarArticleId: articleId,
  });
}

export function getTopicClusters(country?: SupportedCountry) {
  const db = getDb();
  if (country) {
    return db.select().from(topicClusters).where(eq(topicClusters.country, country)).all();
  }
  return db.select().from(topicClusters).all();
}

export function getClusterWithArticles(clusterId: number) {
  const db = getDb();
  const cluster = db.select().from(topicClusters).where(eq(topicClusters.id, clusterId)).get();
  if (!cluster) return null;

  const articles = (cluster.relatedArticles ?? [])
    .map((id) => db.select().from(contentArticles).where(eq(contentArticles.id, id)).get())
    .filter(Boolean);

  return { cluster, articles };
}
