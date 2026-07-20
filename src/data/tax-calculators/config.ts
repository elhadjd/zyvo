import type { TaxCalculatorId, TaxCountryConfig, TaxMarketCode } from './types';
import {
  CI_IRPP_BRACKETS,
  GN_IRPP_BRACKETS,
  SN_IRPP_BRACKETS,
  US_FEDERAL_BRACKETS_2024,
  US_STANDARD_DEDUCTION_2024,
  US_STATE_SALES_TAX,
} from './rates';

const FR_FREE_BADGE = '100 % gratuit';
const FR_FREE_NOTICE =
  'Ces calculateurs fiscaux sont entièrement gratuits — aucune inscription, aucun paiement, aucune limite d\'utilisation.';
const FR_DISCLAIMER =
  'Les résultats sont fournis à titre indicatif et éducatif. Ils ne remplacent pas un conseil fiscal professionnel ni une déclaration officielle auprès de l\'administration fiscale. Les taux peuvent évoluer — vérifiez auprès de la DGI.';

const US_FREE_BADGE = '100% Free';
const US_FREE_NOTICE =
  'These tax calculators are completely free — no signup, no payment, no usage limits.';
const US_DISCLAIMER =
  'Results are estimates for educational purposes only. They do not constitute tax advice or official IRS filings. Tax rates may change — consult a CPA or tax professional.';

function frCalculators(country: string, city: string): TaxCountryConfig['content']['calculators'] {
  return [
    {
      id: 'vat',
      slug: 'calculateur-tva',
      icon: 'percent',
      title: `Calculateur TVA ${country}`,
      shortDescription: `Convertissez HT ↔ TTC avec le taux TVA officiel de 18 % — idéal pour factures et devis à ${city}.`,
      seoKeywords: [
        `calculateur TVA ${country}`,
        `TVA 18% ${country}`,
        `HT TTC ${country}`,
        `calcul TVA gratuit ${country}`,
        `simulateur TVA DGI`,
      ],
    },
    {
      id: 'income',
      slug: 'calculateur-impot-revenu',
      icon: 'wallet',
      title: `Calculateur impôt sur le revenu ${country}`,
      shortDescription: `Estimez votre IRPP annuel selon le barème progressif officiel — gratuit et instantané.`,
      seoKeywords: [
        `calculateur impôt revenu ${country}`,
        `IRPP ${country}`,
        `simulation impôt ${country}`,
        `calcul impôt gratuit`,
      ],
    },
    {
      id: 'corporate',
      slug: 'calculateur-impot-societes',
      icon: 'building',
      title: `Calculateur impôt sur les sociétés ${country}`,
      shortDescription: `Estimez l'impôt sur les bénéfices (IS) de votre entreprise en quelques secondes.`,
      seoKeywords: [
        `impôt sociétés ${country}`,
        `calculateur IS ${country}`,
        `impôt bénéfices entreprise`,
      ],
    },
    {
      id: 'paycheck',
      slug: 'calculateur-salaire-net',
      icon: 'calculator',
      title: `Calculateur salaire net ${country}`,
      shortDescription: `Calculez votre salaire net mensuel à partir du brut — cotisations et IRPP inclus.`,
      seoKeywords: [
        `salaire net ${country}`,
        `calcul salaire brut net`,
        `simulateur paie ${country}`,
        `salaire net gratuit`,
      ],
    },
  ];
}

function frFaqs(country: string, authority: string) {
  return [
    {
      question: `Ces calculateurs fiscaux sont-ils vraiment gratuits ?`,
      answer: `Oui, 100 % gratuits. Aucune inscription, aucun paiement. Utilisez-les autant de fois que nécessaire pour estimer TVA, IRPP ou impôt sociétés au ${country}.`,
    },
    {
      question: `Les calculs sont-ils officiels pour la ${authority} ?`,
      answer: `Les taux utilisés correspondent aux barèmes publiés par l'administration fiscale. Les résultats restent des estimations — pour une déclaration officielle, consultez un expert-comptable.`,
    },
    {
      question: `Comment calculer la TVA à 18 % ?`,
      answer: `Montant TTC = Montant HT × 1,18. Montant HT = Montant TTC ÷ 1,18. Notre calculateur fait ce calcul automatiquement dans les deux sens.`,
    },
    {
      question: `Puis-je utiliser ces outils sur mobile ?`,
      answer: `Oui. L'interface est conçue pour être simple — même un enfant peut comprendre et utiliser les calculateurs sur smartphone ou tablette.`,
    },
  ];
}

const SN_CONFIG: TaxCountryConfig = {
  code: 'sn',
  currency: 'XOF',
  currencySymbol: 'FCFA',
  decimalPlaces: 0,
  locale: 'fr-SN',
  toolsBasePath: '/sn/outils',
  vatRate: 18,
  vatLabel: 'TVA',
  taxAuthority: 'DGI Sénégal',
  corporateTaxRate: 30,
  incomeTaxBrackets: SN_IRPP_BRACKETS,
  socialSecurityRate: 7,
  content: {
    freeBadge: FR_FREE_BADGE,
    freeNotice: FR_FREE_NOTICE,
    disclaimer: FR_DISCLAIMER,
    hubTitle: 'Calculateurs fiscaux gratuits — Sénégal',
    hubSubtitle: 'TVA, impôt sur le revenu, impôt sociétés et salaire net',
    hubDescription:
      'Outils gratuits pour estimer vos impôts au Sénégal : calculateur TVA 18 % DGI, IRPP, impôt sur les sociétés et salaire net. Simple, rapide, sans inscription.',
    howItWorks: 'Comment ça marche ?',
    step1: 'Choisissez un calculateur ci-dessous',
    step2: 'Entrez votre montant ou salaire',
    step3: 'Obtenez le résultat instantanément — c\'est gratuit !',
    resultLabel: 'Résultat',
    calculate: 'Calculer',
    reset: 'Réinitialiser',
    learnMore: 'En savoir plus',
    relatedTools: 'Autres calculateurs',
    faqTitle: 'Questions fréquentes',
    calculators: frCalculators('Sénégal', 'Dakar'),
    faqs: frFaqs('Sénégal', 'DGI'),
    seoSections: [
      {
        heading: 'Calculateur TVA Sénégal — HT, TTC et montant de taxe',
        body: 'Le taux de TVA standard au Sénégal est de 18 %, conformément à la réglementation de la Direction Générale des Impôts (DGI). Que vous soyez commerçant à Dakar, Thiès ou Saint-Louis, notre calculateur TVA gratuit convertit instantanément vos montants hors taxes (HT) en toutes taxes comprises (TTC) et inversement. Idéal pour préparer vos factures, devis et déclarations fiscales.',
      },
      {
        heading: 'Simulateur IRPP et salaire net au Sénégal',
        body: 'L\'impôt sur le revenu des personnes physiques (IRPP) au Sénégal suit un barème progressif de 0 % à 43 %. Notre calculateur estime votre impôt annuel et votre salaire net mensuel en tenant compte des cotisations sociales simplifiées. Outil 100 % gratuit pour salariés, freelancers et entrepreneurs.',
      },
      {
        heading: 'Impôt sur les sociétés (IS) — 30 % au Sénégal',
        body: 'Les entreprises soumises à l\'impôt sur les sociétés au Sénégal paient un taux standard de 30 % sur leurs bénéfices imposables. Utilisez notre calculateur gratuit pour estimer votre charge fiscale avant de préparer votre déclaration à la DGI.',
      },
    ],
  },
};

const GN_CONFIG: TaxCountryConfig = {
  code: 'gn',
  currency: 'GNF',
  currencySymbol: 'GNF',
  decimalPlaces: 0,
  locale: 'fr-GN',
  toolsBasePath: '/gn/outils',
  vatRate: 18,
  vatLabel: 'TVA',
  taxAuthority: 'DGI Guinée',
  corporateTaxRate: 25,
  incomeTaxBrackets: GN_IRPP_BRACKETS,
  socialSecurityRate: 5,
  content: {
    freeBadge: FR_FREE_BADGE,
    freeNotice: FR_FREE_NOTICE,
    disclaimer: FR_DISCLAIMER,
    hubTitle: 'Calculateurs fiscaux gratuits — Guinée',
    hubSubtitle: 'TVA, impôt sur le revenu, impôt sociétés et salaire net',
    hubDescription:
      'Outils gratuits pour estimer vos impôts en Guinée : calculateur TVA 18 % DGI, IRPP, impôt sur les sociétés et salaire net en francs guinéens (GNF). Simple et sans inscription.',
    howItWorks: 'Comment ça marche ?',
    step1: 'Choisissez un calculateur ci-dessous',
    step2: 'Entrez votre montant ou salaire',
    step3: 'Obtenez le résultat instantanément — c\'est gratuit !',
    resultLabel: 'Résultat',
    calculate: 'Calculer',
    reset: 'Réinitialiser',
    learnMore: 'En savoir plus',
    relatedTools: 'Autres calculateurs',
    faqTitle: 'Questions fréquentes',
    calculators: frCalculators('Guinée', 'Conakry'),
    faqs: frFaqs('Guinée', 'DGI'),
    seoSections: [
      {
        heading: 'Calculateur TVA Guinée — HT et TTC en GNF',
        body: 'La TVA standard en Guinée est de 18 %. Notre calculateur gratuit convertit vos montants HT en TTC pour vos factures et devis à Conakry et dans tout le pays. Conforme aux pratiques de la Direction Générale des Impôts (DGI).',
      },
      {
        heading: 'IRPP et salaire net en Guinée',
        body: 'Estimez votre impôt sur le revenu et votre salaire net mensuel en francs guinéens (GNF) avec notre simulateur gratuit basé sur le barème progressif guinéen.',
      },
      {
        heading: 'Impôt sur les sociétés — 25 % en Guinée',
        body: 'Le taux standard de l\'impôt sur les bénéfices des sociétés en Guinée est de 25 %. Calculez gratuitement votre impôt estimé avant votre déclaration fiscale.',
      },
    ],
  },
};

const CI_CONFIG: TaxCountryConfig = {
  code: 'ci',
  currency: 'XOF',
  currencySymbol: 'FCFA',
  decimalPlaces: 0,
  locale: 'fr-CI',
  toolsBasePath: '/ci/outils',
  vatRate: 18,
  vatLabel: 'TVA',
  taxAuthority: 'DGI Côte d\'Ivoire',
  corporateTaxRate: 25,
  incomeTaxBrackets: CI_IRPP_BRACKETS,
  socialSecurityRate: 6.3,
  content: {
    freeBadge: FR_FREE_BADGE,
    freeNotice: FR_FREE_NOTICE,
    disclaimer: FR_DISCLAIMER,
    hubTitle: 'Calculateurs fiscaux gratuits — Côte d\'Ivoire',
    hubSubtitle: 'TVA, impôt sur le revenu, impôt sociétés et salaire net',
    hubDescription:
      'Outils gratuits pour estimer vos impôts en Côte d\'Ivoire : calculateur TVA 18 % DGI, IRPP, impôt sur les sociétés et salaire net en FCFA. Simple, rapide, sans inscription.',
    howItWorks: 'Comment ça marche ?',
    step1: 'Choisissez un calculateur ci-dessous',
    step2: 'Entrez votre montant ou salaire',
    step3: 'Obtenez le résultat instantanément — c\'est gratuit !',
    resultLabel: 'Résultat',
    calculate: 'Calculer',
    reset: 'Réinitialiser',
    learnMore: 'En savoir plus',
    relatedTools: 'Autres calculateurs',
    faqTitle: 'Questions fréquentes',
    calculators: frCalculators('Côte d\'Ivoire', 'Abidjan'),
    faqs: frFaqs('Côte d\'Ivoire', 'DGI'),
    seoSections: [
      {
        heading: 'Calculateur TVA Côte d\'Ivoire — 18 % en FCFA',
        body: 'Le taux de TVA en Côte d\'Ivoire est de 18 %. Notre calculateur gratuit convertit HT en TTC pour les commerçants d\'Abidjan, Bouaké et partout en CI. Conforme aux exigences de la DGI.',
      },
      {
        heading: 'Simulateur IRPP et salaire net en Côte d\'Ivoire',
        body: 'Calculez gratuitement votre impôt sur le revenu et votre salaire net mensuel en FCFA selon le barème progressif ivoirien.',
      },
      {
        heading: 'Impôt sur les sociétés — 25 % en Côte d\'Ivoire',
        body: 'Estimez l\'impôt sur les bénéfices de votre entreprise au taux de 25 % avec notre calculateur gratuit.',
      },
    ],
  },
};

const US_CONFIG: TaxCountryConfig = {
  code: 'us',
  currency: 'USD',
  currencySymbol: '$',
  decimalPlaces: 2,
  locale: 'en-US',
  toolsBasePath: '/tools',
  vatRate: 0,
  vatLabel: 'Sales Tax',
  taxAuthority: 'IRS',
  corporateTaxRate: 21,
  incomeTaxBrackets: US_FEDERAL_BRACKETS_2024,
  incomeStandardDeduction: US_STANDARD_DEDUCTION_2024,
  socialSecurityRate: 6.2,
  socialSecurityCap: 168600,
  medicareRate: 1.45,
  medicareAdditionalThreshold: 200000,
  medicareAdditionalRate: 0.9,
  usStates: US_STATE_SALES_TAX,
  content: {
    freeBadge: US_FREE_BADGE,
    freeNotice: US_FREE_NOTICE,
    disclaimer: US_DISCLAIMER,
    hubTitle: 'Free Tax Calculators — United States',
    hubSubtitle: 'Income tax, paycheck, sales tax & corporate tax',
    hubDescription:
      'Free tax calculators for Americans: federal income tax estimator, paycheck calculator with FICA, sales tax by state, and corporate tax. No signup required.',
    howItWorks: 'How it works',
    step1: 'Pick a calculator below',
    step2: 'Enter your amount or income',
    step3: 'Get instant results — it\'s free!',
    resultLabel: 'Result',
    calculate: 'Calculate',
    reset: 'Reset',
    learnMore: 'Learn more',
    relatedTools: 'Other calculators',
    faqTitle: 'Frequently asked questions',
    calculators: [
      {
        id: 'income',
        slug: 'income-tax-calculator',
        icon: 'wallet',
        title: 'Federal Income Tax Calculator',
        shortDescription: 'Estimate your federal income tax using 2024 IRS brackets and standard deduction.',
        seoKeywords: ['income tax calculator', 'federal tax calculator', 'IRS tax estimator', 'free tax calculator USA'],
      },
      {
        id: 'paycheck',
        slug: 'paycheck-calculator',
        icon: 'calculator',
        title: 'Paycheck Calculator',
        shortDescription: 'Calculate take-home pay after federal tax, state tax, Social Security and Medicare.',
        seoKeywords: ['paycheck calculator', 'take home pay calculator', 'salary after tax USA', 'net pay calculator'],
      },
      {
        id: 'sales-tax',
        slug: 'sales-tax-calculator',
        icon: 'receipt',
        title: 'Sales Tax Calculator',
        shortDescription: 'Add or remove sales tax for all 50 US states — perfect for shopping and invoicing.',
        seoKeywords: ['sales tax calculator', 'state sales tax', 'tax calculator by state', 'free sales tax tool'],
      },
      {
        id: 'corporate',
        slug: 'corporate-tax-calculator',
        icon: 'building',
        title: 'Corporate Tax Calculator',
        shortDescription: 'Estimate federal corporate income tax at the 21% rate on business profits.',
        seoKeywords: ['corporate tax calculator', 'business tax estimator', '21% corporate tax USA'],
      },
    ],
    faqs: [
      {
        question: 'Are these tax calculators really free?',
        answer: 'Yes, 100% free. No signup, no payment, no limits. Use them as many times as you need to estimate income tax, paycheck deductions, sales tax, or corporate tax.',
      },
      {
        question: 'Are the calculations official IRS filings?',
        answer: 'No. These are educational estimates based on published tax rates and brackets. For official filings, consult a CPA or tax professional.',
      },
      {
        question: 'Which tax year do you use?',
        answer: 'We use 2024 federal income tax brackets and standard deduction. State sales tax rates are combined averages for estimation.',
      },
      {
        question: 'Can I use these on my phone?',
        answer: 'Yes. The interface is designed to be simple enough for anyone to use — enter a number and get your result instantly.',
      },
    ],
    seoSections: [
      {
        heading: 'Free Federal Income Tax Calculator for 2024',
        body: 'Estimate your federal income tax using the official IRS tax brackets for single filers. Includes the $14,600 standard deduction. Perfect for employees, freelancers, and small business owners planning their taxes.',
      },
      {
        heading: 'Paycheck Calculator — Take-Home Pay After Taxes',
        body: 'See your net pay after federal income tax, state income tax, Social Security (6.2%), and Medicare (1.45%). Select your state for a more accurate estimate of your monthly or annual take-home pay.',
      },
      {
        heading: 'Sales Tax Calculator for All 50 States',
        body: 'Calculate sales tax for any US state. Add tax to a price or extract tax from a total. Uses combined state and average local rates for quick estimates when shopping or creating invoices.',
      },
    ],
  },
};

const CONFIGS: Record<TaxMarketCode, TaxCountryConfig> = {
  sn: SN_CONFIG,
  gn: GN_CONFIG,
  ci: CI_CONFIG,
  us: US_CONFIG,
  ao: SN_CONFIG,
};

export function getTaxConfig(marketCode: TaxMarketCode): TaxCountryConfig {
  return CONFIGS[marketCode] ?? SN_CONFIG;
}

export function getCalculatorBySlug(
  marketCode: TaxMarketCode,
  slug: string
): TaxCountryConfig['content']['calculators'][number] | null {
  const config = getTaxConfig(marketCode);
  return config.content.calculators.find((c) => c.slug === slug) ?? null;
}

export function getCalculatorById(
  marketCode: TaxMarketCode,
  id: TaxCalculatorId
): TaxCountryConfig['content']['calculators'][number] | null {
  const config = getTaxConfig(marketCode);
  return config.content.calculators.find((c) => c.id === id) ?? null;
}

export function formatTaxAmount(
  value: number,
  config: TaxCountryConfig
): string {
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  }).format(value);
}

export function formatTaxNumber(value: number, config: TaxCountryConfig): string {
  return new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  }).format(value);
}
