'use client';

import { useCallback, useState } from 'react';
import {
  Plus,
  Trash2,
  Printer,
  FileText,
  Shield,
  RotateCcw,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import type { InvoiceCountryConfig, InvoiceData, PartyInfo } from '@/data/invoice-generator/types';
import {
  createDefaultInvoice,
  createEmptyLineItem,
} from '@/data/invoice-generator/calculations';
import InvoicePreview from './InvoicePreview';

interface InvoiceGeneratorWidgetProps {
  config: InvoiceCountryConfig;
}

export default function InvoiceGeneratorWidget({ config }: InvoiceGeneratorWidgetProps) {
  const [invoice, setInvoice] = useState<InvoiceData>(() =>
    createDefaultInvoice(config.defaultTaxRate)
  );
  const [previewMode, setPreviewMode] = useState<'invoice' | 'receipt'>('invoice');
  const [activeTab, setActiveTab] = useState<'company' | 'client' | 'items' | 'settings'>('company');

  const { labels } = config;
  const isUs = config.code === 'us';

  const updateParty = (party: 'company' | 'client', field: keyof PartyInfo, value: string) => {
    setInvoice((prev) => ({
      ...prev,
      [party]: { ...prev[party], [field]: value },
    }));
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, createEmptyLineItem(config.defaultTaxRate)],
    }));
  };

  const removeItem = (id: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((i) => i.id !== id) : prev.items,
    }));
  };

  const resetInvoice = () => {
    setInvoice(createDefaultInvoice(config.defaultTaxRate));
    setPreviewMode('invoice');
  };

  const handlePrint = useCallback((mode: 'invoice' | 'receipt') => {
    setPreviewMode(mode);
    setTimeout(() => window.print(), 100);
  }, []);

  const tabs = [
    { id: 'company' as const, label: labels.company },
    { id: 'client' as const, label: labels.client },
    { id: 'items' as const, label: labels.lineItems },
    { id: 'settings' as const, label: labels.invoiceDetails },
  ];

  return (
    <>
      <style jsx global>{`
        @media print {
          body * { visibility: hidden !important; }
          #invoice-print-root, #invoice-print-root * { visibility: visible !important; }
          #invoice-print-root {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Privacy banner */}
      <div className="no-print mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 p-4">
        <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-green-800 dark:text-green-400 text-sm">{labels.privacyTitle}</p>
          <p className="text-sm text-green-700 dark:text-green-500 mt-1">{config.privacyNotice}</p>
        </div>
      </div>

      <div className="no-print grid xl:grid-cols-2 gap-8">
        {/* Form panel */}
        <div className="space-y-4">
          {/* Action bar */}
          <div className="flex flex-wrap gap-2">
            <ActionBtn onClick={() => handlePrint('invoice')} icon={<Printer className="w-4 h-4" />}>
              {labels.printInvoice}
            </ActionBtn>
            <ActionBtn onClick={() => handlePrint('receipt')} icon={<FileText className="w-4 h-4" />}>
              {labels.printReceipt}
            </ActionBtn>
            <ActionBtn
              onClick={() => setInvoice((p) => ({ ...p, isPaid: !p.isPaid }))}
              icon={invoice.isPaid ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
              variant="secondary"
            >
              {invoice.isPaid ? labels.markUnpaid : labels.markPaid}
            </ActionBtn>
            <ActionBtn onClick={resetInvoice} icon={<RotateCcw className="w-4 h-4" />} variant="secondary">
              {labels.newInvoice}
            </ActionBtn>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto rounded-2xl bg-gray-100 dark:bg-gray-800 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit rounded-xl px-4 py-2.5 text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-900 text-brand-primary shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            {activeTab === 'company' && (
              <PartyForm
                party={invoice.company}
                labels={labels}
                onChange={(f, v) => updateParty('company', f, v)}
              />
            )}
            {activeTab === 'client' && (
              <PartyForm
                party={invoice.client}
                labels={labels}
                onChange={(f, v) => updateParty('client', f, v)}
              />
            )}
            {activeTab === 'items' && (
              <div className="space-y-4">
                {invoice.items.map((item, idx) => (
                  <div key={item.id} className="rounded-2xl border border-gray-100 dark:border-gray-800 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-400">#{idx + 1}</span>
                      {invoice.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          aria-label={labels.removeItem}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <Input
                      label={labels.description}
                      value={item.description}
                      onChange={(v) => updateItem(item.id, 'description', v)}
                      placeholder={isUs ? 'Product or service' : 'Produit ou service'}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <Input
                        label={labels.quantity}
                        type="number"
                        value={String(item.quantity)}
                        onChange={(v) => updateItem(item.id, 'quantity', Math.max(0, parseFloat(v) || 0))}
                      />
                      <Input
                        label={labels.unitPrice}
                        type="number"
                        value={String(item.unitPrice)}
                        onChange={(v) => updateItem(item.id, 'unitPrice', Math.max(0, parseFloat(v) || 0))}
                      />
                      <Input
                        label={`${labels.tax} (${config.taxLabel})`}
                        type="number"
                        value={String(item.taxRate)}
                        onChange={(v) => updateItem(item.id, 'taxRate', Math.max(0, parseFloat(v) || 0))}
                      />
                      <Input
                        label={labels.discount}
                        type="number"
                        value={String(item.discount)}
                        onChange={(v) => updateItem(item.id, 'discount', Math.max(0, Math.min(100, parseFloat(v) || 0)))}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addItem}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 py-3 text-sm font-semibold text-brand-primary hover:border-brand-primary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {labels.addItem}
                </button>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={labels.invoiceNumber}
                    value={invoice.invoiceNumber}
                    onChange={(v) => setInvoice((p) => ({ ...p, invoiceNumber: v }))}
                  />
                  <div />
                  <Input
                    label={labels.issueDate}
                    type="date"
                    value={invoice.issueDate}
                    onChange={(v) => setInvoice((p) => ({ ...p, issueDate: v }))}
                  />
                  <Input
                    label={labels.dueDate}
                    type="date"
                    value={invoice.dueDate}
                    onChange={(v) => setInvoice((p) => ({ ...p, dueDate: v }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label={labels.globalDiscount}
                    type="number"
                    value={String(invoice.globalDiscount)}
                    onChange={(v) => setInvoice((p) => ({ ...p, globalDiscount: Math.max(0, parseFloat(v) || 0) }))}
                  />
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">{labels.globalDiscount}</label>
                    <select
                      value={invoice.globalDiscountType}
                      onChange={(e) => setInvoice((p) => ({ ...p, globalDiscountType: e.target.value as 'percent' | 'fixed' }))}
                      className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm"
                    >
                      <option value="percent">{labels.percent} (%)</option>
                      <option value="fixed">{labels.fixed} ({config.currencySymbol})</option>
                    </select>
                  </div>
                </div>
                <Input
                  label={labels.paymentTerms}
                  value={invoice.paymentTerms}
                  onChange={(v) => setInvoice((p) => ({ ...p, paymentTerms: v }))}
                  placeholder={isUs ? 'Net 30, bank transfer...' : 'Paiement à 30 jours, virement...'}
                />
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">{labels.notes}</label>
                  <textarea
                    value={invoice.notes}
                    onChange={(e) => setInvoice((p) => ({ ...p, notes: e.target.value }))}
                    rows={3}
                    className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
                  />
                </div>
                {invoice.isPaid && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                    <Input
                      label={labels.paymentMethod}
                      value={invoice.paymentMethod}
                      onChange={(v) => setInvoice((p) => ({ ...p, paymentMethod: v }))}
                      placeholder={isUs ? 'Cash, card, transfer...' : 'Espèces, Wave, virement...'}
                    />
                    <Input
                      label={labels.paymentDate}
                      type="date"
                      value={invoice.paymentDate}
                      onChange={(v) => setInvoice((p) => ({ ...p, paymentDate: v }))}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Live preview */}
        <div>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
            {labels.preview}
          </p>
          <div className="sticky top-4">
            <div className="flex gap-2 mb-3">
              <PreviewTab active={previewMode === 'invoice'} onClick={() => setPreviewMode('invoice')}>
                {labels.invoice}
              </PreviewTab>
              <PreviewTab active={previewMode === 'receipt'} onClick={() => setPreviewMode('receipt')}>
                {labels.receipt}
              </PreviewTab>
            </div>
            <InvoicePreview data={invoice} config={config} mode={previewMode} />
          </div>
        </div>
      </div>

      {/* Print-only root */}
      <div id="invoice-print-root" className="hidden print:block">
        <InvoicePreview data={invoice} config={config} mode={previewMode} />
      </div>
    </>
  );
}

function PartyForm({
  party,
  labels,
  onChange,
}: {
  party: PartyInfo;
  labels: InvoiceCountryConfig['labels'];
  onChange: (field: keyof PartyInfo, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <Input label={labels.name} value={party.name} onChange={(v) => onChange('name', v)} />
      <Input label={labels.address} value={party.address} onChange={(v) => onChange('address', v)} />
      <Input label={labels.city} value={party.city} onChange={(v) => onChange('city', v)} />
      <div className="grid grid-cols-2 gap-3">
        <Input label={labels.phone} value={party.phone} onChange={(v) => onChange('phone', v)} />
        <Input label={labels.email} value={party.email} onChange={(v) => onChange('email', v)} />
      </div>
      <Input label={labels.taxId} value={party.taxId} onChange={(v) => onChange('taxId', v)} />
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm font-medium focus:border-brand-primary focus:outline-none"
      />
    </div>
  );
}

function ActionBtn({
  onClick,
  icon,
  children,
  variant = 'primary',
}: {
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
        variant === 'primary'
          ? 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function PreviewTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
        active ? 'bg-brand-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
      }`}
    >
      {children}
    </button>
  );
}
