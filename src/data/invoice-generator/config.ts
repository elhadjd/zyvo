import type { InvoiceCountryConfig, InvoiceLabels } from './types';

const FR_LABELS: InvoiceLabels = {
  company: 'Votre entreprise',
  client: 'Client',
  invoiceDetails: 'Détails de la facture',
  lineItems: 'Articles / services',
  summary: 'Récapitulatif',
  invoiceNumber: 'N° facture',
  issueDate: 'Date d\'émission',
  dueDate: 'Date d\'échéance',
  name: 'Nom / Raison sociale',
  address: 'Adresse',
  city: 'Ville',
  phone: 'Téléphone',
  email: 'E-mail',
  taxId: 'N° fiscal',
  description: 'Description',
  quantity: 'Qté',
  unitPrice: 'Prix unitaire HT',
  tax: 'TVA (%)',
  discount: 'Remise (%)',
  subtotal: 'Sous-total HT',
  totalTax: 'Montant TVA',
  total: 'Total TTC',
  notes: 'Notes / conditions',
  paymentTerms: 'Conditions de paiement',
  addItem: 'Ajouter une ligne',
  removeItem: 'Supprimer',
  printInvoice: 'Imprimer la facture',
  printReceipt: 'Imprimer le reçu',
  newInvoice: 'Nouvelle facture',
  markPaid: 'Marquer comme payée',
  markUnpaid: 'Marquer comme impayée',
  paymentMethod: 'Mode de paiement',
  paymentDate: 'Date de paiement',
  receipt: 'Reçu de paiement',
  invoice: 'Facture',
  paid: 'Payée',
  unpaid: 'Impayée',
  globalDiscount: 'Remise globale',
  percent: 'Pourcentage',
  fixed: 'Montant fixe',
  preview: 'Aperçu en direct',
  privacyTitle: 'Vos données restent privées',
  billTo: 'Facturer à',
  from: 'De',
  amountDue: 'Montant dû',
  thankYou: 'Merci pour votre confiance !',
};

const US_LABELS: InvoiceLabels = {
  company: 'Your business',
  client: 'Client',
  invoiceDetails: 'Invoice details',
  lineItems: 'Items / services',
  summary: 'Summary',
  invoiceNumber: 'Invoice #',
  issueDate: 'Issue date',
  dueDate: 'Due date',
  name: 'Name / Business',
  address: 'Address',
  city: 'City',
  phone: 'Phone',
  email: 'Email',
  taxId: 'Tax ID / EIN',
  description: 'Description',
  quantity: 'Qty',
  unitPrice: 'Unit price',
  tax: 'Tax (%)',
  discount: 'Discount (%)',
  subtotal: 'Subtotal',
  totalTax: 'Tax amount',
  total: 'Total',
  notes: 'Notes / terms',
  paymentTerms: 'Payment terms',
  addItem: 'Add line item',
  removeItem: 'Remove',
  printInvoice: 'Print invoice',
  printReceipt: 'Print receipt',
  newInvoice: 'New invoice',
  markPaid: 'Mark as paid',
  markUnpaid: 'Mark as unpaid',
  paymentMethod: 'Payment method',
  paymentDate: 'Payment date',
  receipt: 'Payment receipt',
  invoice: 'Invoice',
  paid: 'Paid',
  unpaid: 'Unpaid',
  globalDiscount: 'Global discount',
  percent: 'Percentage',
  fixed: 'Fixed amount',
  preview: 'Live preview',
  privacyTitle: 'Your data stays private',
  billTo: 'Bill to',
  from: 'From',
  amountDue: 'Amount due',
  thankYou: 'Thank you for your business!',
};

function frFaqs(country: string) {
  return [
    {
      question: `Ce logiciel de facturation est-il vraiment gratuit au ${country} ?`,
      answer: `Oui, 100 % gratuit. Créez, imprimez et téléchargez vos factures sans inscription ni paiement. Idéal pour entrepreneurs, PME et freelances au ${country}.`,
    },
    {
      question: 'Mes factures sont-elles stockées sur vos serveurs ?',
      answer: 'Non. Toutes les données restent dans votre navigateur. Aucune facture, aucun client ni aucune information n\'est envoyée ou stockée sur nos serveurs. Votre confidentialité est garantie.',
    },
    {
      question: 'Puis-je imprimer une facture et un reçu ?',
      answer: 'Oui. Imprimez la facture professionnelle ou le reçu de paiement en un clic. Format optimisé pour l\'impression A4.',
    },
    {
      question: 'La TVA est-elle calculée automatiquement ?',
      answer: 'Oui. Le taux de TVA par défaut correspond à la réglementation locale. Vous pouvez ajuster le taux par ligne si nécessaire.',
    },
    {
      question: 'Puis-je utiliser cet outil sur mobile ?',
      answer: 'Oui. L\'interface est responsive — créez et imprimez vos factures depuis votre smartphone ou tablette.',
    },
  ];
}

function buildFrConfig(
  code: 'sn' | 'gn' | 'ci',
  country: string,
  city: string,
  currency: string,
  currencySymbol: string,
  locale: string,
  taxIdLabel: string
): InvoiceCountryConfig {
  return {
    code,
    locale,
    currency,
    currencySymbol,
    decimalPlaces: 0,
    defaultTaxRate: 18,
    taxLabel: 'TVA',
    taxIdLabel,
    slug: 'facture-gratuite',
    toolsBasePath: `/${code}/outils`,
    title: `Facture gratuite en ligne — ${country}`,
    shortDescription: `Créez, imprimez et gérez vos factures professionnelles gratuitement au ${country}. TVA ${taxIdLabel}, lignes d'articles, reçu de paiement — sans inscription, données 100 % privées.`,
    privacyNotice:
      'Aucune donnée n\'est envoyée ni stockée sur nos serveurs. Vos factures restent uniquement dans votre navigateur.',
    disclaimer:
      'Outil gratuit à titre indicatif. Vérifiez la conformité de vos factures avec la réglementation fiscale locale (DGI) avant utilisation officielle.',
    freeBadge: '100 % gratuit — données privées',
    seoKeywords: [
      `logiciel facturation gratuit ${country}`,
      `créer facture gratuitement ${city}`,
      `facture en ligne gratuite ${country}`,
      `générateur facture TVA ${country}`,
      `modèle facture gratuit FCFA`,
      `facture proforma gratuite`,
      `imprimer facture ${city}`,
      `reçu de paiement gratuit`,
      `facturation PME ${country}`,
      `outil facture sans inscription`,
    ],
    faqs: frFaqs(country),
    seoSections: [
      {
        heading: `Logiciel de facturation gratuit — ${country}`,
        body: `Créez des factures professionnelles gratuitement au ${country}. Ajoutez votre entreprise, vos clients, des lignes d'articles avec TVA à 18 %, remises et conditions de paiement. Imprimez la facture ou le reçu en un clic. Aucune inscription requise — vos données ne quittent jamais votre navigateur.`,
      },
      {
        heading: `Facture avec TVA — conforme DGI ${country}`,
        body: `Notre générateur de factures intègre le taux de TVA standard (18 %) applicable au ${country}. Saisissez votre numéro fiscal (${taxIdLabel}), les coordonnées client et générez une facture HT/TTC prête à imprimer pour vos clients à ${city} et partout au ${country}.`,
      },
      {
        heading: 'Confidentialité garantie — zéro stockage serveur',
        body: 'Contrairement aux logiciels de facturation en ligne classiques, nous ne stockons aucune de vos données. Pas de compte, pas de cloud, pas de risque. Vos factures, clients et montants restent 100 % privés dans votre navigateur.',
      },
    ],
    labels: { ...FR_LABELS, taxId: taxIdLabel },
  };
}

const CONFIGS: Record<string, InvoiceCountryConfig> = {
  sn: buildFrConfig('sn', 'Sénégal', 'Dakar', 'XOF', 'FCFA', 'fr-SN', 'NINEA / RCCM'),
  gn: buildFrConfig('gn', 'Guinée', 'Conakry', 'GNF', 'GNF', 'fr-GN', 'NIF'),
  ci: buildFrConfig('ci', "Côte d'Ivoire", 'Abidjan', 'XOF', 'FCFA', 'fr-CI', 'NCC / Compte contribuable'),
  us: {
    code: 'us',
    locale: 'en-US',
    currency: 'USD',
    currencySymbol: '$',
    decimalPlaces: 2,
    defaultTaxRate: 0,
    taxLabel: 'Sales Tax',
    taxIdLabel: 'EIN / Tax ID',
    slug: 'free-invoice-generator',
    toolsBasePath: '/tools',
    title: 'Free Invoice Generator — USA',
    shortDescription:
      'Create, print and manage professional invoices for free. Line items, sales tax, payment receipts — no signup, 100% private browser-only data.',
    privacyNotice:
      'No data is sent to or stored on our servers. Your invoices stay only in your browser.',
    disclaimer:
      'Free tool for educational and business use. Verify compliance with federal and state tax regulations before official use.',
    freeBadge: '100% Free — Private data',
    seoKeywords: [
      'free invoice generator',
      'create invoice online free',
      'invoice maker USA',
      'free billing software',
      'print invoice free',
      'payment receipt generator',
      'small business invoice template',
      'invoice generator no signup',
      'free invoicing tool',
      'sales tax invoice calculator',
    ],
    faqs: [
      {
        question: 'Is this invoicing software really free?',
        answer: 'Yes, 100% free. Create, print and download invoices with no signup or payment. Ideal for freelancers, small businesses and entrepreneurs.',
      },
      {
        question: 'Are my invoices stored on your servers?',
        answer: 'No. All data stays in your browser. No invoice, client or business information is ever sent to or stored on our servers. Your privacy is guaranteed.',
      },
      {
        question: 'Can I print an invoice and a receipt?',
        answer: 'Yes. Print a professional invoice or payment receipt in one click. Optimized for letter/A4 printing.',
      },
      {
        question: 'Is sales tax calculated automatically?',
        answer: 'Yes. Set your sales tax rate per line item or use the default. Totals update instantly.',
      },
      {
        question: 'Can I use this on mobile?',
        answer: 'Yes. The interface is fully responsive — create and print invoices from your phone or tablet.',
      },
    ],
    seoSections: [
      {
        heading: 'Free Invoice Generator — United States',
        body: 'Create professional invoices for free. Add your business, clients, line items with sales tax, discounts and payment terms. Print invoice or receipt in one click. No signup — your data never leaves your browser.',
      },
      {
        heading: 'Invoice with Sales Tax — for US Businesses',
        body: 'Our free invoice maker supports configurable sales tax rates for all 50 states. Enter your EIN, client details and generate a print-ready invoice for your customers.',
      },
      {
        heading: 'Privacy Guaranteed — Zero Server Storage',
        answer: 'Unlike typical online invoicing software, we store nothing. No account, no cloud, no risk. Your invoices, clients and amounts stay 100% private in your browser.',
      } as unknown as { heading: string; body: string },
    ],
    labels: US_LABELS,
  },
};

// Fix US seo section typo
CONFIGS.us.seoSections[2] = {
  heading: 'Privacy Guaranteed — Zero Server Storage',
  body: 'Unlike typical online invoicing software, we store nothing. No account, no cloud, no risk. Your invoices, clients and amounts stay 100% private in your browser.',
};

export function getInvoiceConfig(marketCode: string): InvoiceCountryConfig {
  return CONFIGS[marketCode] ?? CONFIGS.sn;
}

export function getInvoiceSlug(marketCode: string): string {
  return getInvoiceConfig(marketCode).slug;
}

export function isInvoiceSlug(marketCode: string, slug: string): boolean {
  return slug === getInvoiceSlug(marketCode);
}
