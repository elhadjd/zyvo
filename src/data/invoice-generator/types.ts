export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
}

export interface PartyInfo {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  taxId: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  company: PartyInfo;
  client: PartyInfo;
  items: InvoiceLineItem[];
  globalDiscount: number;
  globalDiscountType: 'percent' | 'fixed';
  notes: string;
  paymentTerms: string;
  isPaid: boolean;
  paymentMethod: string;
  paymentDate: string;
}

export interface InvoiceTotals {
  subtotal: number;
  lineDiscounts: number;
  globalDiscountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  total: number;
}

export interface InvoiceCountryConfig {
  code: 'sn' | 'gn' | 'ci' | 'us';
  locale: string;
  currency: string;
  currencySymbol: string;
  decimalPlaces: number;
  defaultTaxRate: number;
  taxLabel: string;
  taxIdLabel: string;
  slug: string;
  toolsBasePath: string;
  title: string;
  shortDescription: string;
  privacyNotice: string;
  disclaimer: string;
  freeBadge: string;
  seoKeywords: string[];
  faqs: { question: string; answer: string }[];
  seoSections: { heading: string; body: string }[];
  labels: InvoiceLabels;
}

export interface InvoiceLabels {
  company: string;
  client: string;
  invoiceDetails: string;
  lineItems: string;
  summary: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  taxId: string;
  description: string;
  quantity: string;
  unitPrice: string;
  tax: string;
  discount: string;
  subtotal: string;
  totalTax: string;
  total: string;
  notes: string;
  paymentTerms: string;
  addItem: string;
  removeItem: string;
  printInvoice: string;
  printReceipt: string;
  newInvoice: string;
  markPaid: string;
  markUnpaid: string;
  paymentMethod: string;
  paymentDate: string;
  receipt: string;
  invoice: string;
  paid: string;
  unpaid: string;
  globalDiscount: string;
  percent: string;
  fixed: string;
  preview: string;
  privacyTitle: string;
  billTo: string;
  from: string;
  amountDue: string;
  thankYou: string;
}
