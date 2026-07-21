import type { InvoiceData, InvoiceLineItem, InvoiceTotals } from './types';

export function roundMoney(value: number, decimals = 0): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function calculateLineSubtotal(item: InvoiceLineItem): number {
  const gross = item.quantity * item.unitPrice;
  const discount = item.discount > 0 ? gross * (item.discount / 100) : 0;
  return Math.max(0, gross - discount);
}

export function calculateLineTax(item: InvoiceLineItem, decimals = 0): number {
  const subtotal = calculateLineSubtotal(item);
  return roundMoney(subtotal * (item.taxRate / 100), decimals);
}

export function calculateInvoiceTotals(data: InvoiceData, decimals = 0): InvoiceTotals {
  let subtotal = 0;
  let lineDiscounts = 0;
  let taxAmount = 0;

  for (const item of data.items) {
    const gross = item.quantity * item.unitPrice;
    const discount = item.discount > 0 ? gross * (item.discount / 100) : 0;
    const lineSub = gross - discount;
    subtotal += gross;
    lineDiscounts += discount;
    taxAmount += lineSub * (item.taxRate / 100);
  }

  const afterLineDiscounts = subtotal - lineDiscounts;
  const globalDiscountAmount =
    data.globalDiscountType === 'percent'
      ? afterLineDiscounts * (data.globalDiscount / 100)
      : data.globalDiscount;

  const taxableAmount = Math.max(0, afterLineDiscounts - globalDiscountAmount);
  const taxRatio = afterLineDiscounts > 0 ? taxableAmount / afterLineDiscounts : 1;
  const adjustedTax = taxAmount * taxRatio;

  return {
    subtotal: roundMoney(subtotal, decimals),
    lineDiscounts: roundMoney(lineDiscounts, decimals),
    globalDiscountAmount: roundMoney(globalDiscountAmount, decimals),
    taxableAmount: roundMoney(taxableAmount, decimals),
    taxAmount: roundMoney(adjustedTax, decimals),
    total: roundMoney(taxableAmount + adjustedTax, decimals),
  };
}

export function formatInvoiceAmount(value: number, locale: string, currency: string, decimals: number): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function createEmptyLineItem(defaultTaxRate: number): InvoiceLineItem {
  return {
    id: crypto.randomUUID(),
    description: '',
    quantity: 1,
    unitPrice: 0,
    taxRate: defaultTaxRate,
    discount: 0,
  };
}

export function createDefaultInvoice(defaultTaxRate: number): InvoiceData {
  const today = new Date().toISOString().split('T')[0];
  const due = new Date();
  due.setDate(due.getDate() + 30);

  return {
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    issueDate: today,
    dueDate: due.toISOString().split('T')[0],
    company: { name: '', address: '', city: '', phone: '', email: '', taxId: '' },
    client: { name: '', address: '', city: '', phone: '', email: '', taxId: '' },
    items: [createEmptyLineItem(defaultTaxRate)],
    globalDiscount: 0,
    globalDiscountType: 'percent',
    notes: '',
    paymentTerms: '',
    isPaid: false,
    paymentMethod: '',
    paymentDate: today,
  };
}
