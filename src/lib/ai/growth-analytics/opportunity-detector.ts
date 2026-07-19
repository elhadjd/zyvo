import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { growthOpportunities } from '../db/schema';
import type { SupportedCountry } from '../types';
import type { GrowthOpportunity } from './types';
import { analyzeSearchPerformance } from './search-performance-analyzer';
import { getWeakArticles } from './content-performance-analyzer';

function now(): string {
  return new Date().toISOString();
}

export function detectOpportunities(countryCode: SupportedCountry): GrowthOpportunity[] {
  const search = analyzeSearchPerformance(countryCode);
  const opportunities: GrowthOpportunity[] = [];

  for (const kw of search.growingKeywords) {
    opportunities.push({
      keyword: kw.keyword,
      opportunityType: 'new_content',
      title: `Criar conteúdo sobre "${kw.keyword}"`,
      description: `Keyword com ${kw.impressions} impressões e posição ${kw.position.toFixed(1)}. Oportunidade de subir no ranking.`,
      currentPosition: kw.position,
      impressions: kw.impressions,
      clicks: kw.clicks,
      priority: kw.position < 20 ? 'high' : 'medium',
      suggestedAction: 'Criar artigo complementar e adicionar links internos',
    });
  }

  for (const item of search.underperforming) {
    opportunities.push({
      keyword: item.keyword,
      pageUrl: item.pageUrl,
      opportunityType: 'improve_meta',
      title: `Melhorar CTR: "${item.keyword}"`,
      description: `${item.impressions} impressões mas apenas ${item.clicks} cliques (CTR ${(item.ctr * 100).toFixed(1)}%)`,
      currentPosition: item.position,
      impressions: item.impressions,
      clicks: item.clicks,
      priority: item.impressions > 500 ? 'high' : 'medium',
      suggestedAction: 'Melhorar título e meta description para aumentar cliques',
    });
  }

  const weakArticles = getWeakArticles(countryCode, 3);
  for (const article of weakArticles) {
    opportunities.push({
      opportunityType: 'update_content',
      title: `Atualizar: artigo com score ${article.totalScore}`,
      description: `Artigo #${article.articleId} com SEO ${article.seoScore}, Engagement ${article.engagementScore}`,
      priority: article.totalScore < 50 ? 'high' : 'medium',
      suggestedAction: 'Revisar conteúdo, adicionar links internos e atualizar informações',
      articleId: article.articleId,
    });
  }

  const position18 = search.topKeywords.find((k) => k.position >= 15 && k.position <= 25);
  if (position18) {
    opportunities.push({
      keyword: position18.keyword,
      opportunityType: 'add_links',
      title: `Impulsionar "${position18.keyword}" (posição ${position18.position.toFixed(0)})`,
      description: 'Keyword na página 2 do Google. Links internos podem ajudar a subir.',
      currentPosition: position18.position,
      impressions: position18.impressions,
      priority: 'high',
      suggestedAction: 'Adicionar links internos de artigos relacionados',
    });
  }

  return opportunities;
}

export function saveOpportunities(countryCode: SupportedCountry, opportunities: GrowthOpportunity[]): number {
  const db = getDb();
  const timestamp = now();
  let saved = 0;

  for (const opp of opportunities) {
    const existing = db
      .select()
      .from(growthOpportunities)
      .where(eq(growthOpportunities.country, countryCode))
      .all()
      .find((o) => o.title === opp.title && o.status === 'open');

    if (existing) continue;

    db.insert(growthOpportunities)
      .values({
        country: countryCode,
        keyword: opp.keyword ?? null,
        pageUrl: opp.pageUrl ?? null,
        opportunityType: opp.opportunityType,
        title: opp.title,
        description: opp.description,
        currentPosition: opp.currentPosition ?? null,
        impressions: opp.impressions ?? 0,
        clicks: opp.clicks ?? 0,
        priority: opp.priority,
        suggestedAction: opp.suggestedAction,
        status: 'open',
        articleId: opp.articleId ?? null,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
      .run();
    saved++;
  }

  return saved;
}

export function getGrowthOpportunities(country?: SupportedCountry, status = 'open') {
  const db = getDb();
  let rows = db.select().from(growthOpportunities).all();
  if (country) rows = rows.filter((r) => r.country === country);
  if (status) rows = rows.filter((r) => r.status === status);
  return rows.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return (priorityOrder[a.priority as keyof typeof priorityOrder] ?? 1) -
      (priorityOrder[b.priority as keyof typeof priorityOrder] ?? 1);
  });
}
