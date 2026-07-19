import type { OpportunityScoreInput } from './types';

export function calculateOpportunityScore(input: OpportunityScoreInput): number {
  const weights = {
    searchInterest: 0.3,
    businessRelevance: 0.3,
    competition: 0.2,
    zyvoRelevance: 0.2,
  };

  const competitionScore = 100 - Math.min(input.competition, 100);

  const total =
    input.searchInterest * weights.searchInterest +
    input.businessRelevance * weights.businessRelevance +
    competitionScore * weights.competition +
    input.zyvoRelevance * weights.zyvoRelevance;

  return Math.round(Math.min(100, Math.max(0, total)));
}

export function scoreToPriority(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score >= 85) return 'critical';
  if (score >= 70) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

export function estimateZyvoRelevance(topic: string, category: string): number {
  const zyvoKeywords = [
    'erp', 'gestão', 'gestion', 'caisse', 'pos', 'stock', 'inventaire',
    'facture', 'comptabilité', 'pme', 'entreprise', 'commerce', 'boutique',
    'orange money', 'tva', 'fiscal', 'digital', 'logiciel', 'software',
  ];

  const text = `${topic} ${category}`.toLowerCase();
  const matches = zyvoKeywords.filter((kw) => text.includes(kw)).length;
  return Math.min(100, 40 + matches * 12);
}

export function estimateBusinessRelevance(category: string): number {
  const scores: Record<string, number> = {
    Negócios: 90,
    Fiscalidade: 95,
    Empreendedorismo: 85,
    Tecnologia: 75,
    IA: 70,
    Marketing: 80,
    Vendas: 85,
    Gestão: 90,
  };
  return scores[category] ?? 60;
}
