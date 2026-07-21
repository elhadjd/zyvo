import type { MarketCode } from '@/lib/markets/types';

export type TaxCalculatorId = 'vat' | 'income' | 'corporate' | 'paycheck' | 'sales-tax';

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface UsStateSalesTax {
  code: string;
  name: string;
  rate: number;
}

export interface VatResult {
  amountExclTax: number;
  taxAmount: number;
  amountInclTax: number;
  rate: number;
}

export interface IncomeTaxResult {
  grossIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
  netIncome: number;
  breakdown: { label: string; amount: number }[];
}

export interface CorporateTaxResult {
  taxableProfit: number;
  taxAmount: number;
  netProfit: number;
  rate: number;
}

export interface PaycheckResult {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  otherDeductions: number;
  netPay: number;
  breakdown: { label: string; amount: number }[];
}

export interface SalesTaxResult {
  priceExclTax: number;
  taxAmount: number;
  priceInclTax: number;
  rate: number;
  stateName: string;
}

export interface TaxCalculatorDefinition {
  id: TaxCalculatorId;
  slug: string;
  icon: 'percent' | 'wallet' | 'building' | 'receipt' | 'calculator';
  title: string;
  shortDescription: string;
  seoKeywords: string[];
}

export interface TaxCalculatorLocaleContent {
  freeBadge: string;
  freeNotice: string;
  disclaimer: string;
  hubTitle: string;
  hubSubtitle: string;
  hubDescription: string;
  howItWorks: string;
  step1: string;
  step2: string;
  step3: string;
  resultLabel: string;
  calculate: string;
  reset: string;
  learnMore: string;
  relatedTools: string;
  faqTitle: string;
  calculators: TaxCalculatorDefinition[];
  faqs: { question: string; answer: string }[];
  seoSections: { heading: string; body: string }[];
}

export type TaxMarketCode = MarketCode | 'us';

export interface TaxCountryConfig {
  code: TaxMarketCode;
  currency: string;
  currencySymbol: string;
  decimalPlaces: number;
  locale: string;
  toolsBasePath: string;
  vatRate: number;
  vatLabel: string;
  taxAuthority: string;
  corporateTaxRate: number;
  incomeTaxBrackets: TaxBracket[];
  incomeStandardDeduction?: number;
  socialSecurityRate?: number;
  socialSecurityCap?: number;
  medicareRate?: number;
  medicareAdditionalThreshold?: number;
  medicareAdditionalRate?: number;
  usStates?: UsStateSalesTax[];
  content: TaxCalculatorLocaleContent;
}
