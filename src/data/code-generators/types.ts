import type { MarketCode } from '@/lib/markets/types';

export type CodeGeneratorId = 'qr-code' | 'barcode';

export type QrContentType =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'vcard'
  | 'whatsapp';

export type BarcodeFormat =
  | 'CODE128'
  | 'CODE39'
  | 'EAN13'
  | 'EAN8'
  | 'UPC'
  | 'ITF14'
  | 'MSI'
  | 'pharmacode';

export interface CodeGeneratorDefinition {
  id: CodeGeneratorId;
  slug: string;
  icon: 'qr' | 'barcode';
  title: string;
  shortDescription: string;
  seoKeywords: string[];
}

export interface CodeGeneratorLocaleContent {
  freeBadge: string;
  freeNotice: string;
  disclaimer: string;
  hubTitle: string;
  hubSubtitle: string;
  hubDescription: string;
  sectionQrTitle: string;
  sectionBarcodeTitle: string;
  sectionTaxTitle: string;
  step1: string;
  step2: string;
  step3: string;
  relatedTools: string;
  faqTitle: string;
  generators: CodeGeneratorDefinition[];
  faqs: { question: string; answer: string }[];
  seoSections: { heading: string; body: string }[];
}

export type CodeMarketCode = MarketCode | 'us';

export interface CodeCountryConfig {
  code: CodeMarketCode;
  locale: string;
  toolsBasePath: string;
  content: CodeGeneratorLocaleContent;
}
