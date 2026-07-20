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

export function getTaxToolsPageSeo(
  marketCode: MarketCode,
  slug: string[]
): GnSeoPageMeta | null {
  if (!isTaxToolsSlug(slug)) return null;

  const taxMarket = toTaxMarket(marketCode);
  const config = getTaxConfig(taxMarket);
  const prefix = config.toolsBasePath;
  const country = marketCode === 'sn' ? 'Sénégal' : marketCode === 'ci' ? 'Côte d\'Ivoire' : 'Guinée';

  if (slug.length === 1) {
    return {
      title: `Calculateurs fiscaux gratuits ${country} — TVA, IRPP, IS & salaire net | ZYVO`,
      description: `${config.content.hubDescription} Utilisation 100 % gratuite, sans inscription.`,
      keywords: [
        `calculateur fiscal gratuit ${country}`,
        `calculateur TVA ${country}`,
        `simulateur impôt ${country}`,
        `calcul salaire net ${country}`,
        `outil fiscal gratuit`,
        `TVA 18% ${country}`,
        `IRPP ${country}`,
        `impôt sociétés ${country}`,
      ].join(', '),
      path: prefix,
      h1: config.content.hubTitle,
      breadcrumb: 'Outils fiscaux',
      schemaType: 'service',
    };
  }

  const calculatorSlug = slug[1];
  const calculator = getCalculatorBySlug(taxMarket, calculatorSlug);
  if (!calculator) return null;

  const freeLabel = 'Utilisation 100 % gratuite, sans inscription ni paiement.';

  const seoById: Record<string, { title: string; description: string; h1: string }> = {
    'calculateur-tva': {
      title: `Calculateur TVA ${country} gratuit — HT TTC 18% DGI | ZYVO`,
      description: `Calculez la TVA à 18% au ${country} : conversion HT ↔ TTC gratuite et instantanée. ${freeLabel} Conforme DGI.`,
      h1: `Calculateur TVA ${country} — gratuit`,
    },
    'calculateur-impot-revenu': {
      title: `Calculateur impôt sur le revenu ${country} gratuit — IRPP | ZYVO`,
      description: `Simulez votre IRPP au ${country} avec le barème progressif officiel. ${freeLabel}`,
      h1: `Calculateur impôt sur le revenu — ${country}`,
    },
    'calculateur-impot-societes': {
      title: `Calculateur impôt sociétés ${country} gratuit — IS | ZYVO`,
      description: `Estimez l'impôt sur les bénéfices de votre entreprise au ${country}. ${freeLabel}`,
      h1: `Calculateur impôt sur les sociétés — ${country}`,
    },
    'calculateur-salaire-net': {
      title: `Calculateur salaire net ${country} gratuit — brut en net | ZYVO`,
      description: `Convertissez salaire brut en net au ${country} : cotisations et IRPP inclus. ${freeLabel}`,
      h1: `Calculateur salaire net — ${country}`,
    },
  };

  const seo = seoById[calculatorSlug] ?? {
    title: `${calculator.title} — gratuit | ZYVO`,
    description: `${calculator.shortDescription} ${freeLabel}`,
    h1: calculator.title,
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: calculator.seoKeywords.join(', '),
    path: `${prefix}/${calculatorSlug}`,
    h1: seo.h1,
    breadcrumb: calculator.title,
    schemaType: 'service',
  };
}

export const US_TAX_TOOLS_SEO: Record<string, GnSeoPageMeta> = {
  hub: {
    title: 'Free Tax Calculators USA — Income Tax, Paycheck, Sales Tax | ZYVO',
    description:
      'Free tax calculators for Americans: federal income tax, paycheck estimator, sales tax by state, and corporate tax. 100% free — no signup required.',
    keywords:
      'free tax calculator, income tax calculator USA, paycheck calculator, sales tax calculator, corporate tax calculator, IRS tax estimator',
    path: '/tools',
    h1: 'Free Tax Calculators — United States',
    breadcrumb: 'Tax Tools',
    schemaType: 'service',
  },
  'income-tax-calculator': {
    title: 'Free Federal Income Tax Calculator 2024 — IRS Brackets | ZYVO',
    description:
      'Estimate your federal income tax with 2024 IRS brackets and standard deduction. 100% free, no signup. Educational tax calculator for USA.',
    keywords:
      'income tax calculator, federal tax calculator 2024, IRS tax estimator, free tax calculator USA, tax bracket calculator',
    path: '/tools/income-tax-calculator',
    h1: 'Federal Income Tax Calculator — Free',
    breadcrumb: 'Income Tax Calculator',
    schemaType: 'service',
  },
  'paycheck-calculator': {
    title: 'Free Paycheck Calculator — Take-Home Pay After Tax | ZYVO',
    description:
      'Calculate your net paycheck after federal tax, state tax, Social Security and Medicare. Free paycheck calculator for all US states.',
    keywords:
      'paycheck calculator, take home pay calculator, net pay calculator, salary after tax USA, free paycheck estimator',
    path: '/tools/paycheck-calculator',
    h1: 'Paycheck Calculator — Free',
    breadcrumb: 'Paycheck Calculator',
    schemaType: 'service',
  },
  'sales-tax-calculator': {
    title: 'Free Sales Tax Calculator — All 50 US States | ZYVO',
    description:
      'Add or remove sales tax for any US state. Free sales tax calculator with combined state rates. No signup required.',
    keywords:
      'sales tax calculator, state sales tax calculator, tax calculator by state, free sales tax tool USA',
    path: '/tools/sales-tax-calculator',
    h1: 'Sales Tax Calculator — Free',
    breadcrumb: 'Sales Tax Calculator',
    schemaType: 'service',
  },
  'corporate-tax-calculator': {
    title: 'Free Corporate Tax Calculator — 21% Federal Rate | ZYVO',
    description:
      'Estimate federal corporate income tax at 21% on business profits. Free corporate tax calculator for US businesses.',
    keywords:
      'corporate tax calculator, business tax estimator, 21% corporate tax USA, free corporate tax tool',
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
