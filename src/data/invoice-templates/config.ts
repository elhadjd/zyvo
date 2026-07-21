import type { TemplateLibraryConfig } from './types';

const FR_LABELS = {
  libraryTitle: 'Bibliothèque de modèles',
  download: 'Télécharger',
  preview: 'Aperçu',
  close: 'Fermer',
  all: 'Tous',
  invoices: 'Factures',
  receipts: 'Reçus',
  proforma: 'Proforma',
  delivery: 'Livraison',
  credit: 'Avoirs',
  search: 'Rechercher un modèle...',
  templates: 'modèles',
  freeDownload: 'Téléchargement gratuit',
  privacyTitle: 'Téléchargement 100 % gratuit et privé',
  sampleCompany: 'Entreprise Exemple SARL',
  sampleClient: 'Client Exemple',
};

const US_LABELS = {
  libraryTitle: 'Template Library',
  download: 'Download',
  preview: 'Preview',
  close: 'Close',
  all: 'All',
  invoices: 'Invoices',
  receipts: 'Receipts',
  proforma: 'Proforma',
  delivery: 'Delivery',
  credit: 'Credit notes',
  search: 'Search templates...',
  templates: 'templates',
  freeDownload: 'Free download',
  privacyTitle: '100% free and private download',
  sampleCompany: 'Acme Solutions LLC',
  sampleClient: 'John Smith',
};

function buildFrConfig(
  code: 'sn' | 'gn' | 'ci',
  country: string,
  city: string,
  taxIdLabel: string
): TemplateLibraryConfig {
  return {
    code,
    locale: code === 'gn' ? 'fr-GN' : code === 'ci' ? 'fr-CI' : 'fr-SN',
    currency: code === 'gn' ? 'GNF' : 'XOF',
    currencySymbol: code === 'gn' ? 'GNF' : 'FCFA',
    taxLabel: 'TVA',
    taxRate: 18,
    taxIdLabel,
    slug: 'modeles-facture-recu',
    toolsBasePath: `/${code}/outils`,
    title: `Modèles de factures et reçus gratuits — ${country}`,
    shortDescription: `Bibliothèque de 24 modèles de factures et reçus professionnels gratuits au ${country}. Téléchargez en HTML prêt à imprimer — TVA 18 %, sans inscription.`,
    freeBadge: '24 modèles gratuits',
    privacyNotice: 'Les modèles se téléchargent directement dans votre navigateur. Aucune donnée n\'est stockée sur nos serveurs.',
    disclaimer: 'Modèles fournis à titre gratuit. Vérifiez la conformité avec la réglementation fiscale locale (DGI) avant utilisation officielle.',
    labels: FR_LABELS,
    faqs: [
      {
        question: `Ces modèles de facture sont-ils gratuits au ${country} ?`,
        answer: `Oui, les 24 modèles sont 100 % gratuits. Téléchargez autant de modèles que nécessaire sans inscription ni paiement.`,
      },
      {
        question: 'Dans quel format sont les modèles ?',
        answer: 'Chaque modèle se télécharge en fichier HTML prêt à imprimer. Ouvrez-le dans votre navigateur et imprimez en PDF ou sur papier.',
      },
      {
        question: 'Les modèles incluent-ils la TVA ?',
        answer: `Oui. Les modèles facture incluent la TVA à 18 % conforme à la réglementation du ${country}. Des modèles reçu et proforma sont aussi disponibles.`,
      },
      {
        question: 'Puis-je personnaliser les modèles ?',
        answer: 'Oui. Le fichier HTML téléchargé est entièrement modifiable — changez les textes, couleurs et montants dans votre navigateur ou éditeur.',
      },
    ],
    seoSections: [
      {
        heading: `Bibliothèque de modèles facture et reçu — ${country}`,
        body: `24 modèles professionnels gratuits pour entrepreneurs et PME au ${country}. Factures, reçus, proforma, bons de livraison et avoirs. Téléchargement instantané, TVA 18 %, format HTML imprimable.`,
      },
      {
        heading: `Modèles adaptés aux entreprises de ${city}`,
        body: `Retail, restaurant, freelance, pharmacie, BTP, tech — trouvez le modèle parfait pour votre activité à ${city} et partout au ${country}. Design moderne, professionnel et prêt à l'emploi.`,
      },
    ],
  };
}

const CONFIGS: Record<string, TemplateLibraryConfig> = {
  sn: buildFrConfig('sn', 'Sénégal', 'Dakar', 'NINEA / RCCM'),
  gn: buildFrConfig('gn', 'Guinée', 'Conakry', 'NIF'),
  ci: buildFrConfig('ci', "Côte d'Ivoire", 'Abidjan', 'NCC'),
  us: {
    code: 'us',
    locale: 'en-US',
    currency: 'USD',
    currencySymbol: '$',
    taxLabel: 'Sales Tax',
    taxRate: 0,
    taxIdLabel: 'EIN / Tax ID',
    slug: 'invoice-receipt-templates',
    toolsBasePath: '/tools',
    title: 'Free Invoice & Receipt Templates — USA',
    shortDescription:
      'Library of 24 professional invoice and receipt templates. Free HTML download, print-ready — no signup required.',
    freeBadge: '24 free templates',
    privacyNotice: 'Templates download directly in your browser. No data is stored on our servers.',
    disclaimer: 'Templates provided free of charge. Verify compliance with tax regulations before official use.',
    labels: US_LABELS,
    faqs: [
      {
        question: 'Are these invoice templates really free?',
        answer: 'Yes, all 24 templates are 100% free. Download as many as you need with no signup or payment.',
      },
      {
        question: 'What format are the templates?',
        answer: 'Each template downloads as a print-ready HTML file. Open in your browser and print to PDF or paper.',
      },
      {
        question: 'Can I customize the templates?',
        answer: 'Yes. The downloaded HTML file is fully editable — change text, colors and amounts in your browser or editor.',
      },
      {
        question: 'What types of templates are included?',
        answer: 'Invoices, receipts, proforma quotes, delivery notes, credit notes — 24 designs for every business type.',
      },
    ],
    seoSections: [
      {
        heading: 'Free Invoice & Receipt Template Library — USA',
        body: '24 professional free templates for US businesses. Invoices, receipts, proforma, delivery notes and credit notes. Instant download, print-ready HTML format.',
      },
      {
        heading: 'Templates for every business type',
        body: 'Retail, restaurant, freelance, consulting, tech, medical — find the perfect template for your business. Modern, professional designs ready to use.',
      },
    ],
  },
};

export function getTemplateLibraryConfig(marketCode: string): TemplateLibraryConfig {
  return CONFIGS[marketCode] ?? CONFIGS.sn;
}

export function isTemplateLibrarySlug(marketCode: string, slug: string): boolean {
  return slug === getTemplateLibraryConfig(marketCode).slug;
}

export function getTemplateLibrarySlug(marketCode: string): string {
  return getTemplateLibraryConfig(marketCode).slug;
}
