export type TemplateCategory = 'invoice' | 'receipt' | 'proforma' | 'delivery' | 'credit';
export type TemplateVariant =
  | 'classic'
  | 'minimal'
  | 'bold'
  | 'elegant'
  | 'gradient'
  | 'dark'
  | 'sidebar'
  | 'compact'
  | 'thermal';

export interface InvoiceTemplate {
  id: string;
  category: TemplateCategory;
  variant: TemplateVariant;
  nameFr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionEn: string;
  tagsFr: string[];
  tagsEn: string[];
  primaryColor: string;
  accentColor: string;
  isReceipt: boolean;
}

export interface TemplateLibraryConfig {
  code: 'sn' | 'gn' | 'ci' | 'us';
  locale: string;
  currency: string;
  currencySymbol: string;
  taxLabel: string;
  taxRate: number;
  taxIdLabel: string;
  slug: string;
  toolsBasePath: string;
  title: string;
  shortDescription: string;
  freeBadge: string;
  privacyNotice: string;
  disclaimer: string;
  faqs: { question: string; answer: string }[];
  seoSections: { heading: string; body: string }[];
  labels: TemplateLibraryLabels;
}

export interface TemplateLibraryLabels {
  libraryTitle: string;
  download: string;
  preview: string;
  close: string;
  all: string;
  invoices: string;
  receipts: string;
  proforma: string;
  delivery: string;
  credit: string;
  search: string;
  templates: string;
  freeDownload: string;
  privacyTitle: string;
  sampleCompany: string;
  sampleClient: string;
}
