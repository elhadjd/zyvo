'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { TemplateLibraryConfig } from '@/data/invoice-templates/types';
import TemplateLibraryWidget from './TemplateLibraryWidget';
import { INVOICE_TEMPLATES } from '@/data/invoice-templates/templates';

interface TemplateLibraryPageContentProps {
  config: TemplateLibraryConfig;
  basePath: string;
  hubLabel: string;
}

export default function TemplateLibraryPageContent({
  config,
  basePath,
  hubLabel,
}: TemplateLibraryPageContentProps) {
  const isUs = config.code === 'us';

  return (
    <div className="space-y-10">
      <Link
        href={basePath}
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary dark:text-brand-accent hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        {hubLabel}
      </Link>

      <header>
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          {config.freeBadge} — {INVOICE_TEMPLATES.length} {config.labels.templates}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {config.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
          {config.shortDescription}
        </p>
      </header>

      <TemplateLibraryWidget config={config} />

      <section className="prose prose-gray dark:prose-invert max-w-none">
        {config.seoSections.map((section) => (
          <div key={section.heading} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{section.heading}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">{section.body}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {isUs ? 'Frequently asked questions' : 'Questions fréquentes'}
        </h2>
        <div className="space-y-4">
          {config.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-gray-100 dark:border-gray-800 p-4 open:bg-gray-50 dark:open:bg-gray-800/50"
            >
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                {faq.question}
                <span className="text-brand-primary group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{config.disclaimer}</p>
      </section>
    </div>
  );
}
