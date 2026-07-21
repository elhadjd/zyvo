import type { CodeCountryConfig, CodeGeneratorDefinition } from './types';

const FR_FREE_BADGE = '100 % gratuit';
const FR_FREE_NOTICE =
  'Ces générateurs QR code et codes-barres sont entièrement gratuits — aucune inscription, aucun paiement, aucune limite. Téléchargez en PNG ou SVG instantanément.';
const FR_DISCLAIMER =
  'Les codes générés sont fournis à titre gratuit pour un usage personnel et professionnel. Vérifiez toujours la lisibilité avant impression ou étiquetage.';

const US_FREE_BADGE = '100% Free';
const US_FREE_NOTICE =
  'These QR code and barcode generators are completely free — no signup, no payment, no limits. Download as PNG or SVG instantly.';
const US_DISCLAIMER =
  'Generated codes are provided free for personal and business use. Always verify scannability before printing or labeling.';

function frGenerators(country: string, city: string): CodeGeneratorDefinition[] {
  return [
    {
      id: 'qr-code',
      slug: 'generateur-qr-code',
      icon: 'qr',
      title: `Générateur QR code ${country}`,
      shortDescription: `Créez des QR codes gratuits pour liens, contacts, Wi-Fi, WhatsApp et plus — idéal pour commerces et entrepreneurs à ${city}.`,
      seoKeywords: [
        `générateur QR code gratuit ${country}`,
        `créer QR code ${city}`,
        `QR code lien gratuit`,
        `générateur QR code WiFi`,
        `QR code contact vCard`,
        `QR code WhatsApp ${country}`,
      ],
    },
    {
      id: 'barcode',
      slug: 'generateur-code-barres',
      icon: 'barcode',
      title: `Générateur code-barres ${country}`,
      shortDescription: `Générez des codes-barres EAN-13, Code 128, UPC et plus — gratuit pour produits, inventaire et étiquettes à ${city}.`,
      seoKeywords: [
        `générateur code-barres gratuit ${country}`,
        `créer code-barres EAN13`,
        `code-barres produit ${city}`,
        `générateur barcode gratuit`,
        `étiquette code-barres ${country}`,
        `Code 128 générateur`,
      ],
    },
  ];
}

function frFaqs(country: string) {
  return [
    {
      question: 'Ces générateurs QR et codes-barres sont-ils vraiment gratuits ?',
      answer: `Oui, 100 % gratuits au ${country}. Aucune inscription, aucun filigrane, aucune limite d'utilisation. Créez et téléchargez autant de codes que nécessaire.`,
    },
    {
      question: 'Quels types de QR codes puis-je créer ?',
      answer:
        'Liens web (URL), texte libre, e-mail, numéro de téléphone, SMS, WhatsApp, réseau Wi-Fi et carte de contact (vCard). Tous les formats courants sont supportés.',
    },
    {
      question: 'Quels formats de codes-barres sont disponibles ?',
      answer:
        'Code 128, Code 39, EAN-13, EAN-8, UPC-A, ITF-14, MSI et Pharmacode. Idéal pour produits retail, inventaire et étiquetage professionnel.',
    },
    {
      question: 'Puis-je télécharger mes codes ?',
      answer:
        'Oui. Téléchargez en PNG (haute résolution) ou SVG (vectoriel pour impression). Parfait pour étiquettes, affiches, menus et cartes de visite.',
    },
    {
      question: 'Les codes fonctionnent-ils sur mobile ?',
      answer:
        'Oui. L\'interface est optimisée smartphone et tablette. Générez et téléchargez vos codes directement depuis votre téléphone.',
    },
  ];
}

function frSeoSections(country: string, city: string) {
  return [
    {
      heading: `Générateur QR code gratuit — ${country}`,
      body: `Créez des QR codes professionnels gratuitement au ${country}. Encodez un lien web, un numéro de téléphone, un e-mail, un réseau Wi-Fi ou une carte de contact vCard. Outil 100 % gratuit pour commerçants, restaurateurs et entrepreneurs à ${city} et partout au ${country}. Téléchargement PNG et SVG sans inscription.`,
    },
    {
      heading: `Générateur code-barres gratuit — EAN-13, Code 128, UPC`,
      body: `Générez des codes-barres pour vos produits et votre inventaire au ${country}. Support EAN-13 (retail), Code 128 (logistique), Code 39, UPC-A, EAN-8, ITF-14 et Pharmacode. Idéal pour boutiques, pharmacies, entrepôts et PME à ${city}. Gratuit, sans limite, téléchargement instantané.`,
    },
    {
      heading: 'Pourquoi utiliser nos outils gratuits ?',
      body: 'Pas de compte requis, pas de filigrane, pas de limite. Nos générateurs sont conçus pour être simples — même un débutant peut créer un QR code ou un code-barres en quelques secondes. Compatible impression et scan mobile.',
    },
  ];
}

function buildFrConfig(
  code: 'sn' | 'gn' | 'ci',
  country: string,
  city: string,
  toolsBasePath: string,
  locale: string,
  hubTitle: string
): CodeCountryConfig {
  return {
    code,
    locale,
    toolsBasePath,
    content: {
      freeBadge: FR_FREE_BADGE,
      freeNotice: FR_FREE_NOTICE,
      disclaimer: FR_DISCLAIMER,
      hubTitle,
      hubSubtitle: 'QR codes, codes-barres et calculateurs fiscaux — 100 % gratuits',
      hubDescription: `Outils gratuits au ${country} : générateur QR code, générateur code-barres (EAN-13, Code 128) et calculateurs fiscaux. Sans inscription, téléchargement instantané.`,
      sectionQrTitle: 'Générateurs QR code',
      sectionBarcodeTitle: 'Générateurs code-barres',
      sectionTaxTitle: 'Calculateurs fiscaux',
      step1: 'Choisissez un outil ci-dessous',
      step2: 'Entrez vos données (lien, texte, code produit…)',
      step3: 'Téléchargez votre code gratuitement — c\'est instantané !',
      relatedTools: 'Autres outils gratuits',
      faqTitle: 'Questions fréquentes',
      generators: frGenerators(country, city),
      faqs: frFaqs(country),
      seoSections: frSeoSections(country, city),
    },
  };
}

const SN_CODE_CONFIG = buildFrConfig(
  'sn',
  'Sénégal',
  'Dakar',
  '/sn/outils',
  'fr-SN',
  'Outils gratuits — Sénégal'
);

const GN_CODE_CONFIG = buildFrConfig(
  'gn',
  'Guinée',
  'Conakry',
  '/gn/outils',
  'fr-GN',
  'Outils gratuits — Guinée'
);

const CI_CODE_CONFIG = buildFrConfig(
  'ci',
  "Côte d'Ivoire",
  'Abidjan',
  '/ci/outils',
  'fr-CI',
  "Outils gratuits — Côte d'Ivoire"
);

const US_CODE_CONFIG: CodeCountryConfig = {
  code: 'us',
  locale: 'en-US',
  toolsBasePath: '/tools',
  content: {
    freeBadge: US_FREE_BADGE,
    freeNotice: US_FREE_NOTICE,
    disclaimer: US_DISCLAIMER,
    hubTitle: 'Free Tools — United States',
    hubSubtitle: 'QR codes, barcodes & tax calculators — 100% free',
    hubDescription:
      'Free tools for Americans: QR code generator, barcode generator (EAN-13, Code 128, UPC) and tax calculators. No signup, instant download.',
    sectionQrTitle: 'QR Code Generators',
    sectionBarcodeTitle: 'Barcode Generators',
    sectionTaxTitle: 'Tax Calculators',
    step1: 'Pick a tool below',
    step2: 'Enter your data (link, text, product code…)',
    step3: 'Download your code for free — instantly!',
    relatedTools: 'Other free tools',
    faqTitle: 'Frequently asked questions',
    generators: [
      {
        id: 'qr-code',
        slug: 'qr-code-generator',
        icon: 'qr',
        title: 'Free QR Code Generator',
        shortDescription:
          'Create free QR codes for links, contacts, Wi-Fi, WhatsApp and more — perfect for businesses and entrepreneurs.',
        seoKeywords: [
          'free QR code generator',
          'create QR code online',
          'QR code maker USA',
          'WiFi QR code generator',
          'vCard QR code',
          'WhatsApp QR code generator',
        ],
      },
      {
        id: 'barcode',
        slug: 'barcode-generator',
        icon: 'barcode',
        title: 'Free Barcode Generator',
        shortDescription:
          'Generate EAN-13, Code 128, UPC and more barcodes — free for products, inventory and labels.',
        seoKeywords: [
          'free barcode generator',
          'EAN-13 barcode maker',
          'Code 128 generator',
          'UPC barcode generator',
          'create barcode online free',
          'product barcode generator USA',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are these QR and barcode generators really free?',
        answer:
          'Yes, 100% free. No signup, no watermark, no usage limits. Create and download as many codes as you need.',
      },
      {
        question: 'What QR code types can I create?',
        answer:
          'Website links (URL), plain text, email, phone number, SMS, WhatsApp, Wi-Fi network and contact card (vCard). All common formats are supported.',
      },
      {
        question: 'What barcode formats are available?',
        answer:
          'Code 128, Code 39, EAN-13, EAN-8, UPC-A, ITF-14, MSI and Pharmacode. Ideal for retail products, inventory and professional labeling.',
      },
      {
        question: 'Can I download my codes?',
        answer:
          'Yes. Download as PNG (high resolution) or SVG (vector for printing). Perfect for labels, posters, menus and business cards.',
      },
      {
        question: 'Do the codes work on mobile?',
        answer:
          'Yes. The interface is mobile-optimized. Generate and download codes directly from your phone.',
      },
    ],
    seoSections: [
      {
        heading: 'Free QR Code Generator — USA',
        body: 'Create professional QR codes for free. Encode a website link, phone number, email, Wi-Fi network or vCard contact. 100% free for businesses, restaurants and entrepreneurs. PNG and SVG download with no signup required.',
      },
      {
        heading: 'Free Barcode Generator — EAN-13, Code 128, UPC',
        body: 'Generate barcodes for your products and inventory. Supports EAN-13 (retail), Code 128 (logistics), Code 39, UPC-A, EAN-8, ITF-14 and Pharmacode. Ideal for stores, pharmacies and warehouses. Free, unlimited, instant download.',
      },
      {
        heading: 'Why use our free tools?',
        body: 'No account required, no watermark, no limits. Our generators are designed to be simple — anyone can create a QR code or barcode in seconds. Print-ready and mobile-scannable.',
      },
    ],
  },
};

const CONFIGS: Record<string, CodeCountryConfig> = {
  sn: SN_CODE_CONFIG,
  gn: GN_CODE_CONFIG,
  ci: CI_CODE_CONFIG,
  us: US_CODE_CONFIG,
  ao: SN_CODE_CONFIG,
};

export function getCodeConfig(marketCode: string): CodeCountryConfig {
  return CONFIGS[marketCode] ?? SN_CODE_CONFIG;
}

export function getCodeGeneratorBySlug(
  marketCode: string,
  slug: string
): CodeGeneratorDefinition | null {
  const config = getCodeConfig(marketCode);
  return config.content.generators.find((g) => g.slug === slug) ?? null;
}

export function getCodeGeneratorById(
  marketCode: string,
  id: string
): CodeGeneratorDefinition | null {
  const config = getCodeConfig(marketCode);
  return config.content.generators.find((g) => g.id === id) ?? null;
}

export function getAllCodeGeneratorSlugs(marketCode: string): string[] {
  return getCodeConfig(marketCode).content.generators.map((g) => g.slug);
}
