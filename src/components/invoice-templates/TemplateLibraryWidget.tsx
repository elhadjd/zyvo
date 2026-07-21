'use client';

import { useMemo, useState } from 'react';
import { Download, Eye, Search, X, FileText, Shield, Sparkles } from 'lucide-react';
import type { TemplateLibraryConfig } from '@/data/invoice-templates/types';
import type { TemplateCategory } from '@/data/invoice-templates/types';
import { INVOICE_TEMPLATES } from '@/data/invoice-templates/templates';
import { downloadTemplateHtml, renderTemplateHtml } from '@/data/invoice-templates/render-html';

interface TemplateLibraryWidgetProps {
  config: TemplateLibraryConfig;
}

const CATEGORIES: { id: TemplateCategory | 'all'; labelKey: keyof TemplateLibraryConfig['labels'] }[] = [
  { id: 'all', labelKey: 'all' },
  { id: 'invoice', labelKey: 'invoices' },
  { id: 'receipt', labelKey: 'receipts' },
  { id: 'proforma', labelKey: 'proforma' },
  { id: 'delivery', labelKey: 'delivery' },
  { id: 'credit', labelKey: 'credit' },
];

export default function TemplateLibraryWidget({ config }: TemplateLibraryWidgetProps) {
  const isUs = config.code === 'us';
  const [category, setCategory] = useState<TemplateCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [previewId, setPreviewId] = useState<string | null>(null);

  const { labels } = config;

  const filtered = useMemo(() => {
    return INVOICE_TEMPLATES.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const name = isUs ? t.nameEn : t.nameFr;
      const desc = isUs ? t.descriptionEn : t.descriptionFr;
      const tags = isUs ? t.tagsEn : t.tagsFr;
      return (
        name.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [category, search, isUs]);

  const previewTemplate = previewId ? INVOICE_TEMPLATES.find((t) => t.id === previewId) : null;
  const previewHtml = previewTemplate ? renderTemplateHtml(previewTemplate, config) : '';

  return (
    <>
      {/* Privacy */}
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 p-4">
        <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-green-800 dark:text-green-400 text-sm">{labels.privacyTitle}</p>
          <p className="text-sm text-green-700 dark:text-green-500 mt-1">{config.privacyNotice}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={labels.search}
            className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-11 pr-4 py-3 text-sm focus:border-brand-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                category === cat.id
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
              }`}
            >
              {labels[cat.labelKey]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} {labels.templates} — {labels.freeDownload}
      </p>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            config={config}
            isUs={isUs}
            onPreview={() => setPreviewId(template.id)}
            onDownload={() => downloadTemplateHtml(template, config)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p>{isUs ? 'No templates found' : 'Aucun modèle trouvé'}</p>
        </div>
      )}

      {/* Preview modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {isUs ? previewTemplate.nameEn : previewTemplate.nameFr}
                </h3>
                <p className="text-sm text-gray-500">
                  {isUs ? previewTemplate.descriptionEn : previewTemplate.descriptionFr}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadTemplateHtml(previewTemplate, config)}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-primary text-white px-4 py-2 text-sm font-semibold hover:bg-brand-primary/90"
                >
                  <Download className="w-4 h-4" />
                  {labels.download}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewId(null)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label={labels.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-gray-800">
              <iframe
                srcDoc={previewHtml}
                title="Template preview"
                className="w-full h-[600px] bg-white rounded-xl shadow-inner border border-gray-200"
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TemplateCard({
  template,
  config,
  isUs,
  onPreview,
  onDownload,
}: {
  template: (typeof INVOICE_TEMPLATES)[number];
  config: TemplateLibraryConfig;
  isUs: boolean;
  onPreview: () => void;
  onDownload: () => void;
}) {
  const name = isUs ? template.nameEn : template.nameFr;
  const desc = isUs ? template.descriptionEn : template.descriptionFr;
  const tags = isUs ? template.tagsEn : template.tagsFr;

  return (
    <div className="group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-brand-primary/40 hover:shadow-lg transition-all">
      {/* Mini preview */}
      <div
        className="h-36 relative overflow-hidden"
        style={{
          background: template.variant === 'gradient'
            ? `linear-gradient(135deg, ${template.primaryColor}, ${template.accentColor})`
            : template.variant === 'dark'
              ? template.primaryColor
              : `linear-gradient(180deg, ${template.primaryColor}15, ${template.accentColor}08)`,
        }}
      >
        <div
          className="absolute top-3 left-3 right-3 h-6 rounded"
          style={{ background: template.primaryColor }}
        />
        <div className="absolute top-12 left-3 right-3 space-y-1.5">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        </div>
        <div className="absolute bottom-3 right-3">
          <span
            className="text-xs font-bold px-2 py-1 rounded-full text-white"
            style={{ background: template.accentColor }}
          >
            {template.isReceipt ? (isUs ? 'Receipt' : 'Reçu') : (isUs ? 'Invoice' : 'Facture')}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight group-hover:text-brand-primary transition-colors">
            {name}
          </h3>
          <span className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            {config.freeBadge.split(' ')[0]}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex-1 mb-3 line-clamp-2">{desc}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPreview}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-brand-primary hover:text-brand-primary transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            {config.labels.preview}
          </button>
          <button
            type="button"
            onClick={onDownload}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-primary text-white py-2 text-xs font-semibold hover:bg-brand-primary/90 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            {config.labels.download}
          </button>
        </div>
      </div>
    </div>
  );
}
