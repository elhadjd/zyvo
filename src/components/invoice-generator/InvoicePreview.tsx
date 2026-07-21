'use client';

import type { InvoiceCountryConfig, InvoiceData } from '@/data/invoice-generator/types';
import { calculateInvoiceTotals, calculateLineSubtotal, formatInvoiceAmount } from '@/data/invoice-generator/calculations';

interface InvoicePreviewProps {
  data: InvoiceData;
  config: InvoiceCountryConfig;
  mode: 'invoice' | 'receipt';
}

export default function InvoicePreview({ data, config, mode }: InvoicePreviewProps) {
  const { labels } = config;
  const totals = calculateInvoiceTotals(data, config.decimalPlaces);
  const fmt = (v: number) => formatInvoiceAmount(v, config.locale, config.currency, config.decimalPlaces);

  const isReceipt = mode === 'receipt';

  return (
    <div className="invoice-preview bg-white text-gray-900 p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-6 mb-8 pb-6 border-b-2 border-brand-primary/20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-1">
            {isReceipt ? labels.receipt : labels.invoice}
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            {data.company.name || labels.company}
          </h2>
          {data.company.address && <p className="text-sm text-gray-600 mt-1">{data.company.address}</p>}
          {data.company.city && <p className="text-sm text-gray-600">{data.company.city}</p>}
          {data.company.phone && <p className="text-sm text-gray-600">{data.company.phone}</p>}
          {data.company.email && <p className="text-sm text-gray-600">{data.company.email}</p>}
          {data.company.taxId && (
            <p className="text-sm text-gray-500 mt-1">{labels.taxId}: {data.company.taxId}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-brand-primary">
            {isReceipt ? labels.receipt : labels.invoice}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-semibold">{labels.invoiceNumber}:</span> {data.invoiceNumber}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{labels.issueDate}:</span>{' '}
            {formatDate(data.issueDate, config.locale)}
          </p>
          {!isReceipt && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{labels.dueDate}:</span>{' '}
              {formatDate(data.dueDate, config.locale)}
            </p>
          )}
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
              data.isPaid
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {data.isPaid ? labels.paid : labels.unpaid}
          </span>
        </div>
      </div>

      {/* Client */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          {labels.billTo}
        </p>
        <p className="font-bold text-lg">{data.client.name || '—'}</p>
        {data.client.address && <p className="text-sm text-gray-600">{data.client.address}</p>}
        {data.client.city && <p className="text-sm text-gray-600">{data.client.city}</p>}
        {data.client.phone && <p className="text-sm text-gray-600">{data.client.phone}</p>}
        {data.client.email && <p className="text-sm text-gray-600">{data.client.email}</p>}
        {data.client.taxId && (
          <p className="text-sm text-gray-500">{labels.taxId}: {data.client.taxId}</p>
        )}
      </div>

      {/* Line items */}
      {!isReceipt && (
        <table className="w-full mb-8 text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left text-xs uppercase tracking-wider text-gray-500">
              <th className="pb-3 pr-2">{labels.description}</th>
              <th className="pb-3 px-2 text-right w-16">{labels.quantity}</th>
              <th className="pb-3 px-2 text-right w-24">{labels.unitPrice}</th>
              <th className="pb-3 px-2 text-right w-16">{labels.tax}</th>
              <th className="pb-3 pl-2 text-right w-24">Total HT</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 pr-2">{item.description || '—'}</td>
                <td className="py-3 px-2 text-right">{item.quantity}</td>
                <td className="py-3 px-2 text-right">{fmt(item.unitPrice)}</td>
                <td className="py-3 px-2 text-right">{item.taxRate}%</td>
                <td className="py-3 pl-2 text-right font-medium">
                  {fmt(calculateLineSubtotal(item))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-full sm:w-72 space-y-2 text-sm">
          {!isReceipt && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">{labels.subtotal}</span>
                <span>{fmt(totals.subtotal - totals.lineDiscounts)}</span>
              </div>
              {totals.globalDiscountAmount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>{labels.globalDiscount}</span>
                  <span>-{fmt(totals.globalDiscountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">{labels.totalTax} ({config.taxLabel})</span>
                <span>{fmt(totals.taxAmount)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between text-lg font-bold border-t-2 border-gray-900 pt-2">
            <span>{isReceipt ? labels.total : labels.total}</span>
            <span className="text-brand-primary">{fmt(totals.total)}</span>
          </div>
          {!isReceipt && !data.isPaid && (
            <div className="flex justify-between text-amber-700 font-semibold">
              <span>{labels.amountDue}</span>
              <span>{fmt(totals.total)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Receipt payment info */}
      {isReceipt && data.isPaid && (
        <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="font-semibold text-green-800">{labels.paid}</p>
          {data.paymentMethod && (
            <p className="text-sm text-green-700 mt-1">
              {labels.paymentMethod}: {data.paymentMethod}
            </p>
          )}
          {data.paymentDate && (
            <p className="text-sm text-green-700">
              {labels.paymentDate}: {formatDate(data.paymentDate, config.locale)}
            </p>
          )}
        </div>
      )}

      {/* Notes */}
      {(data.notes || data.paymentTerms) && !isReceipt && (
        <div className="border-t border-gray-200 pt-4 text-sm text-gray-600 space-y-2">
          {data.paymentTerms && (
            <p>
              <span className="font-semibold">{labels.paymentTerms}:</span> {data.paymentTerms}
            </p>
          )}
          {data.notes && (
            <p>
              <span className="font-semibold">{labels.notes}:</span> {data.notes}
            </p>
          )}
        </div>
      )}

      <p className="text-center text-sm text-gray-400 mt-8 italic">{labels.thankYou}</p>
    </div>
  );
}

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
