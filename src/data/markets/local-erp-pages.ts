import type { MarketCode } from '@/lib/markets/types';
import { getMarket } from '@/lib/markets/registry';
import { PROGRAMMATIC_INDUSTRIES } from '@/lib/ai/seo-engine/types';
import { getLocalCity, getMarketLocalCities, type LocalCity } from './local-cities';

export interface LocalErpPageContent {
  industry: string;
  citySlug: string;
  cityName: string;
  title: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string[];
  faq: { question: string; answer: string }[];
  cta: string;
}

const INDUSTRY_LABELS_FR: Record<string, string> = {
  restaurants: 'restaurants et maquis',
  pharmacies: 'pharmacies',
  'retail-stores': 'boutiques et commerces',
  salons: 'salons de coiffure',
  clinics: 'cliniques et cabinets médicaux',
  supermarkets: 'supermarchés et superettes',
};

function industryLabel(industry: string): string {
  return INDUSTRY_LABELS_FR[industry] ?? industry;
}

function buildContent(
  market: ReturnType<typeof getMarket>,
  city: LocalCity,
  industry: string
): string[] {
  const label = industryLabel(industry);
  const districts = city.districts?.length
    ? ` (${city.districts.slice(0, 3).join(', ')})`
    : '';
  const currency = market.currencySymbol;

  return [
    `À ${city.name}${districts}, les ${label} font face aux mêmes défis : gestion manuelle du stock, encaissements mobiles non tracés, facturation non conforme et difficulté à piloter la marge en ${currency}.`,
    `ZYVO est un logiciel de gestion cloud conçu pour les PME de ${market.countryNameLocal} : caisse POS, inventaire temps réel, facturation TVA, employés et rapports — en français, avec tarifs en ${currency}.`,
    `Que vous soyez à ${city.name} ou en province, centralisez vos ventes, stocks et équipes depuis un seul tableau de bord. Mode hors-ligne partiel pour les connexions instables.`,
    `Essai gratuit de 7 jours sans carte bancaire internationale. Support en français et accompagnement WhatsApp pour votre équipe à ${city.name}.`,
  ];
}

function buildFaq(market: ReturnType<typeof getMarket>, city: LocalCity): { question: string; answer: string }[] {
  return [
    {
      question: `ZYVO fonctionne-t-il à ${city.name} ?`,
      answer: `Oui. ZYVO est 100 % cloud et fonctionne sur smartphone, tablette ou PC à ${city.name} et dans toute la ${market.countryNameLocal}.`,
    },
    {
      question: 'Puis-je essayer gratuitement ?',
      answer: 'Oui, 7 jours d\'essai gratuit avec accès complet. Aucune carte bancaire internationale requise.',
    },
    {
      question: `Quel est le prix en ${market.currencySymbol} ?`,
      answer: `Les plans démarrent à partir de tarifs transparents en ${market.currencySymbol}. Consultez notre page tarifs ou contactez-nous sur WhatsApp.`,
    },
  ];
}

export function buildLocalErpPage(
  marketCode: MarketCode,
  industry: string,
  citySlug: string
): LocalErpPageContent | null {
  const city = getLocalCity(marketCode, citySlug);
  if (!city) return null;

  const industryDef = PROGRAMMATIC_INDUSTRIES.find((i) => i.slug === industry);
  if (!industryDef) return null;

  const market = getMarket(marketCode);
  const label = industryLabel(industry);
  const headline = `Logiciel ERP pour ${label} à ${city.name}`;
  const metaTitle = `ERP ${label} ${city.name} — Caisse POS & Stock | ZYVO ${market.countryNameLocal}`;
  const metaDescription = `Logiciel de gestion pour ${label} à ${city.name}, ${market.countryNameLocal}. Caisse POS, stock, facturation TVA et rapports en ${market.currencySymbol}. Essai gratuit 7 jours.`;

  return {
    industry,
    citySlug,
    cityName: city.name,
    title: `ZYVO — ${label} à ${city.name}`,
    headline,
    metaTitle,
    metaDescription,
    keywords: `ERP ${city.name}, logiciel ${industry} ${city.name}, caisse POS ${city.name}, gestion ${market.countryNameLocal}`,
    content: buildContent(market, city, industry),
    faq: buildFaq(market, city),
    cta: `Démarrer l'essai gratuit à ${city.name}`,
  };
}

export function getAllLocalErpParams(marketCode: MarketCode): { industry: string; city: string }[] {
  const cities = getMarketLocalCities(marketCode);
  if (!cities.length) return [];

  const params: { industry: string; city: string }[] = [];
  for (const industry of PROGRAMMATIC_INDUSTRIES) {
    for (const city of cities) {
      params.push({ industry: industry.slug, city: city.slug });
    }
  }
  return params;
}
