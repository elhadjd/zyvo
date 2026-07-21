import type { MarketCode } from '@/lib/markets/types';
import type { GnSeoPageMeta } from '@/data/markets/gn-seo';
import { getTaxConfig, getCalculatorBySlug } from '@/data/tax-calculators/config';
import type { TaxMarketCode } from '@/data/tax-calculators/types';

function toTaxMarket(code: MarketCode): TaxMarketCode {
  return code;
}

export function isTaxToolsSlug(slug: string[]): boolean {
  return slug[0] === 'outils';
}

/** SEO hub + calculator pages — keywords ciblés par pays (recherches FR les plus fréquentes) */
const COUNTRY_TAX_SEO: Record<
  'sn' | 'gn' | 'ci',
  {
    hub: { title: string; description: string; keywords: string };
    calculators: Record<string, { title: string; description: string; keywords: string; h1: string }>;
  }
> = {
  sn: {
    hub: {
      title: 'Calculateurs fiscaux gratuits Sénégal — TVA 18%, IRPP, IS & salaire net FCFA | ZYVO',
      description:
        'Calculez vos impôts au Sénégal gratuitement : TVA 18% HT/TTC, IRPP Dakar, impôt sociétés 30%, salaire brut en net FCFA. Outil 100% gratuit, sans inscription — conforme DGI Sénégal.',
      keywords:
        'calculateur fiscal gratuit Sénégal, calculateur TVA Sénégal, simulateur TVA 18% Dakar, calcul impôt revenu Sénégal, IRPP Sénégal gratuit, salaire net Sénégal FCFA, impôt sociétés Sénégal, convertisseur HT TTC FCFA, outil fiscal Dakar gratuit, DGI Sénégal calculateur',
    },
    calculators: {
      'calculateur-tva': {
        title: 'Calculateur TVA Sénégal gratuit — HT TTC 18% FCFA DGI | ZYVO',
        description:
          'Convertissez HT en TTC au Sénégal en 1 clic. Calculateur TVA 18% gratuit pour factures, devis et déclarations DGI à Dakar. Montant HT, TTC et taxe — 100% gratuit, sans inscription.',
        keywords:
          'calculateur TVA Sénégal, TVA 18% Sénégal, HT TTC FCFA, convertisseur TVA Dakar, calcul TVA gratuit Sénégal, montant TVA facture, simulateur TVA DGI, TVA toutes taxes comprises Sénégal, calculer TVA 18 pour cent',
        h1: 'Calculateur TVA Sénégal — 18% gratuit',
      },
      'calculateur-impot-revenu': {
        title: 'Calculateur impôt revenu Sénégal gratuit — IRPP barème DGI | ZYVO',
        description:
          'Simulez votre IRPP au Sénégal avec le barème progressif officiel (0% à 43%). Calculateur impôt sur le revenu gratuit pour salariés et indépendants à Dakar — estimation instantanée en FCFA.',
        keywords:
          'calculateur impôt revenu Sénégal, IRPP Sénégal, simulation impôt Dakar, barème IRPP Sénégal, calcul impôt gratuit FCFA, impôt sur le revenu Sénégal 2024, simulateur fiscal Sénégal, DGI impôt revenu',
        h1: 'Calculateur impôt sur le revenu — Sénégal',
      },
      'calculateur-impot-societes': {
        title: 'Calculateur impôt sociétés Sénégal gratuit — IS 30% bénéfices | ZYVO',
        description:
          'Estimez l\'impôt sur les sociétés (IS) à 30% sur vos bénéfices au Sénégal. Calculateur gratuit pour PME, SARL et entreprises — résultat instantané avant déclaration DGI.',
        keywords:
          'impôt sociétés Sénégal, calculateur IS Sénégal, impôt bénéfices 30%, IS entreprise Dakar, calcul impôt société gratuit, impôt sur les bénéfices Sénégal, DGI déclaration IS',
        h1: 'Calculateur impôt sur les sociétés — Sénégal',
      },
      'calculateur-salaire-net': {
        title: 'Calculateur salaire net Sénégal gratuit — brut en net FCFA | ZYVO',
        description:
          'Calculez votre salaire net mensuel au Sénégal à partir du brut. Cotisations sociales et IRPP inclus — simulateur paie gratuit pour salariés à Dakar, Thiès et tout le Sénégal.',
        keywords:
          'salaire net Sénégal, calcul salaire brut net FCFA, simulateur paie Dakar, salaire net mensuel Sénégal, convertir brut en net, calculateur salaire gratuit Sénégal, net à payer Sénégal',
        h1: 'Calculateur salaire net — Sénégal',
      },
    },
  },
  gn: {
    hub: {
      title: 'Calculateurs fiscaux gratuits Guinée — TVA 18%, IRPP, IS & salaire net GNF | ZYVO',
      description:
        'Calculez vos impôts en Guinée gratuitement : TVA 18% HT/TTC, IRPP Conakry, impôt sociétés 25%, salaire brut en net GNF. Outil 100% gratuit, sans inscription — conforme DGI Guinée.',
      keywords:
        'calculateur fiscal gratuit Guinée, calculateur TVA Guinée, simulateur TVA 18% Conakry, calcul impôt revenu Guinée, IRPP Guinée gratuit, salaire net Guinée GNF, impôt sociétés Guinée, convertisseur HT TTC GNF, outil fiscal Conakry gratuit, DGI Guinée calculateur',
    },
    calculators: {
      'calculateur-tva': {
        title: 'Calculateur TVA Guinée gratuit — HT TTC 18% GNF DGI | ZYVO',
        description:
          'Convertissez HT en TTC en Guinée en 1 clic. Calculateur TVA 18% gratuit pour factures et devis à Conakry. Montant HT, TTC et taxe en francs guinéens — 100% gratuit.',
        keywords:
          'calculateur TVA Guinée, TVA 18% Guinée, HT TTC GNF, convertisseur TVA Conakry, calcul TVA gratuit Guinée, montant TVA facture Guinée, simulateur TVA DGI Guinée, calculer TVA franc guinéen',
        h1: 'Calculateur TVA Guinée — 18% gratuit',
      },
      'calculateur-impot-revenu': {
        title: 'Calculateur impôt revenu Guinée gratuit — IRPP barème DGI | ZYVO',
        description:
          'Simulez votre IRPP en Guinée avec le barème progressif officiel. Calculateur impôt sur le revenu gratuit pour salariés et entrepreneurs à Conakry — estimation en GNF.',
        keywords:
          'calculateur impôt revenu Guinée, IRPP Guinée, simulation impôt Conakry, barème IRPP Guinée, calcul impôt gratuit GNF, impôt sur le revenu Guinée, simulateur fiscal Guinée',
        h1: 'Calculateur impôt sur le revenu — Guinée',
      },
      'calculateur-impot-societes': {
        title: 'Calculateur impôt sociétés Guinée gratuit — IS 25% bénéfices | ZYVO',
        description:
          'Estimez l\'impôt sur les sociétés (IS) à 25% sur vos bénéfices en Guinée. Calculateur gratuit pour PME et entreprises — résultat instantané avant déclaration DGI.',
        keywords:
          'impôt sociétés Guinée, calculateur IS Guinée, impôt bénéfices 25%, IS entreprise Conakry, calcul impôt société gratuit Guinée, DGI déclaration IS Guinée',
        h1: 'Calculateur impôt sur les sociétés — Guinée',
      },
      'calculateur-salaire-net': {
        title: 'Calculateur salaire net Guinée gratuit — brut en net GNF | ZYVO',
        description:
          'Calculez votre salaire net mensuel en Guinée à partir du brut. Cotisations et IRPP inclus — simulateur paie gratuit pour salariés à Conakry et en province.',
        keywords:
          'salaire net Guinée, calcul salaire brut net GNF, simulateur paie Conakry, salaire net mensuel Guinée, convertir brut en net Guinée, calculateur salaire gratuit GNF',
        h1: 'Calculateur salaire net — Guinée',
      },
    },
  },
  ci: {
    hub: {
      title: 'Calculateurs fiscaux gratuits Côte d\'Ivoire — TVA 18%, IRPP, IS & salaire net FCFA | ZYVO',
      description:
        'Calculez vos impôts en Côte d\'Ivoire gratuitement : TVA 18% HT/TTC, IRPP Abidjan, impôt sociétés 25%, salaire brut en net FCFA. Outil 100% gratuit, sans inscription — conforme DGI CI.',
      keywords:
        'calculateur fiscal gratuit Côte d\'Ivoire, calculateur TVA Côte d\'Ivoire, simulateur TVA 18% Abidjan, calcul impôt revenu CI, IRPP Côte d\'Ivoire gratuit, salaire net FCFA, impôt sociétés CI, convertisseur HT TTC, outil fiscal Abidjan gratuit, DGI Côte d\'Ivoire calculateur',
    },
    calculators: {
      'calculateur-tva': {
        title: 'Calculateur TVA Côte d\'Ivoire gratuit — HT TTC 18% FCFA DGI | ZYVO',
        description:
          'Convertissez HT en TTC en Côte d\'Ivoire en 1 clic. Calculateur TVA 18% gratuit pour factures et devis à Abidjan. Montant HT, TTC et taxe en FCFA — 100% gratuit, sans inscription.',
        keywords:
          'calculateur TVA Côte d\'Ivoire, TVA 18% CI, HT TTC FCFA Abidjan, convertisseur TVA Côte d\'Ivoire, calcul TVA gratuit CI, simulateur TVA DGI Côte d\'Ivoire, calculer TVA facture Abidjan',
        h1: 'Calculateur TVA Côte d\'Ivoire — 18% gratuit',
      },
      'calculateur-impot-revenu': {
        title: 'Calculateur impôt revenu Côte d\'Ivoire gratuit — IRPP barème DGI | ZYVO',
        description:
          'Simulez votre IRPP en Côte d\'Ivoire avec le barème progressif officiel. Calculateur impôt sur le revenu gratuit pour salariés à Abidjan, Bouaké et partout en CI — estimation FCFA.',
        keywords:
          'calculateur impôt revenu Côte d\'Ivoire, IRPP CI, simulation impôt Abidjan, barème IRPP Côte d\'Ivoire, calcul impôt gratuit FCFA, impôt sur le revenu CI, simulateur fiscal Abidjan',
        h1: 'Calculateur impôt sur le revenu — Côte d\'Ivoire',
      },
      'calculateur-impot-societes': {
        title: 'Calculateur impôt sociétés Côte d\'Ivoire gratuit — IS 25% bénéfices | ZYVO',
        description:
          'Estimez l\'impôt sur les sociétés (IS) à 25% sur vos bénéfices en Côte d\'Ivoire. Calculateur gratuit pour PME et entreprises — résultat instantané avant déclaration DGI.',
        keywords:
          'impôt sociétés Côte d\'Ivoire, calculateur IS CI, impôt bénéfices 25% Abidjan, IS entreprise Côte d\'Ivoire, calcul impôt société gratuit CI, DGI déclaration IS',
        h1: 'Calculateur impôt sur les sociétés — Côte d\'Ivoire',
      },
      'calculateur-salaire-net': {
        title: 'Calculateur salaire net Côte d\'Ivoire gratuit — brut en net FCFA | ZYVO',
        description:
          'Calculez votre salaire net mensuel en Côte d\'Ivoire à partir du brut. Cotisations sociales et IRPP inclus — simulateur paie gratuit pour salariés à Abidjan et en province.',
        keywords:
          'salaire net Côte d\'Ivoire, calcul salaire brut net FCFA, simulateur paie Abidjan, salaire net mensuel CI, convertir brut en net Côte d\'Ivoire, calculateur salaire gratuit FCFA',
        h1: 'Calculateur salaire net — Côte d\'Ivoire',
      },
    },
  },
};

export function getTaxToolsPageSeo(
  marketCode: MarketCode,
  slug: string[]
): GnSeoPageMeta | null {
  if (!isTaxToolsSlug(slug)) return null;
  if (marketCode !== 'sn' && marketCode !== 'gn' && marketCode !== 'ci') return null;

  const taxMarket = toTaxMarket(marketCode);
  const config = getTaxConfig(taxMarket);
  const prefix = config.toolsBasePath;
  const countrySeo = COUNTRY_TAX_SEO[marketCode];

  if (slug.length === 1) {
    return {
      title: countrySeo.hub.title,
      description: countrySeo.hub.description,
      keywords: countrySeo.hub.keywords,
      path: prefix,
      h1: config.content.hubTitle,
      breadcrumb: 'Outils fiscaux',
      schemaType: 'service',
    };
  }

  const calculatorSlug = slug[1];
  const calculator = getCalculatorBySlug(taxMarket, calculatorSlug);
  if (!calculator) return null;

  const seo = countrySeo.calculators[calculatorSlug] ?? {
    title: `${calculator.title} — gratuit | ZYVO`,
    description: `${calculator.shortDescription} Utilisation 100 % gratuite, sans inscription.`,
    keywords: calculator.seoKeywords.join(', '),
    h1: calculator.title,
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: `${prefix}/${calculatorSlug}`,
    h1: seo.h1,
    breadcrumb: calculator.title,
    schemaType: 'service',
  };
}

export const US_TAX_TOOLS_SEO: Record<string, GnSeoPageMeta> = {
  hub: {
    title: 'Free Tax Calculators USA 2024 — Income Tax, Paycheck, Sales Tax | ZYVO',
    description:
      'Calculate your taxes for free: federal income tax with IRS 2024 brackets, paycheck after FICA, sales tax for all 50 states, and 21% corporate tax. 100% free — no signup, no limits.',
    keywords:
      'free tax calculator USA, income tax calculator 2024, paycheck calculator free, sales tax calculator by state, corporate tax calculator, IRS tax estimator, take home pay calculator, federal tax brackets 2024',
    path: '/tools',
    h1: 'Free Tax Calculators — United States',
    breadcrumb: 'Tax Tools',
    schemaType: 'service',
  },
  'income-tax-calculator': {
    title: 'Free Federal Income Tax Calculator 2024 — IRS Brackets & Standard Deduction | ZYVO',
    description:
      'Estimate your 2024 federal income tax with official IRS brackets and $14,600 standard deduction. Free tax calculator — instant results, no signup. Plan your taxes smarter.',
    keywords:
      'income tax calculator 2024, federal tax calculator free, IRS tax estimator, tax bracket calculator, standard deduction 2024, federal income tax estimator USA, how much tax will I pay',
    path: '/tools/income-tax-calculator',
    h1: 'Federal Income Tax Calculator — Free',
    breadcrumb: 'Income Tax Calculator',
    schemaType: 'service',
  },
  'paycheck-calculator': {
    title: 'Free Paycheck Calculator 2024 — Take-Home Pay After Tax & FICA | ZYVO',
    description:
      'See your net paycheck after federal tax, state tax, Social Security (6.2%) and Medicare (1.45%). Free paycheck calculator for weekly, bi-weekly and monthly pay — all 50 states.',
    keywords:
      'paycheck calculator free, take home pay calculator, net pay calculator 2024, salary after tax USA, FICA calculator, how much will my paycheck be, biweekly paycheck calculator',
    path: '/tools/paycheck-calculator',
    h1: 'Paycheck Calculator — Free',
    breadcrumb: 'Paycheck Calculator',
    schemaType: 'service',
  },
  'sales-tax-calculator': {
    title: 'Free Sales Tax Calculator — All 50 US States 2024 | ZYVO',
    description:
      'Add or remove sales tax for any US state instantly. Free sales tax calculator with combined state + local rates. Perfect for shopping, invoicing and price comparisons.',
    keywords:
      'sales tax calculator free, state sales tax calculator, sales tax by state 2024, calculate sales tax USA, tax calculator shopping, add sales tax to price, remove tax from total',
    path: '/tools/sales-tax-calculator',
    h1: 'Sales Tax Calculator — Free',
    breadcrumb: 'Sales Tax Calculator',
    schemaType: 'service',
  },
  'corporate-tax-calculator': {
    title: 'Free Corporate Tax Calculator — 21% Federal Business Tax | ZYVO',
    description:
      'Estimate federal corporate income tax at 21% on your business profits. Free corporate tax calculator for LLCs, S-Corps and C-Corps — instant after-tax profit estimate.',
    keywords:
      'corporate tax calculator free, business tax estimator 21%, federal corporate tax USA, C corp tax calculator, LLC tax estimate, business profit tax calculator',
    path: '/tools/corporate-tax-calculator',
    h1: 'Corporate Tax Calculator — Free',
    breadcrumb: 'Corporate Tax Calculator',
    schemaType: 'service',
  },
};

export function getUsTaxToolsSeo(slug: string): GnSeoPageMeta {
  if (slug === 'hub') return US_TAX_TOOLS_SEO.hub;
  return US_TAX_TOOLS_SEO[slug] ?? US_TAX_TOOLS_SEO.hub;
}
