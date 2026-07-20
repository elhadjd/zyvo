'use client';

import Link from 'next/link';
import { ArrowRight, Building2, Calculator, Percent, Receipt, Wallet, Sparkles } from 'lucide-react';
import type { TaxCountryConfig } from '@/data/tax-calculators/types';

const ICONS = {
  percent: Percent,
  wallet: Wallet,
  building: Building2,
  receipt: Receipt,
  calculator: Calculator,
};

interface TaxToolsHubProps {
  config: TaxCountryConfig;
  basePath: string;
}

export default function TaxToolsHub({ config, basePath }: TaxToolsHubProps) {
  const { content } = config;
  const isUs = config.code === 'us';

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-8 lg:p-12 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            {content.freeBadge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {content.hubTitle}
          </h1>
          <p className="text-lg text-white/90 mb-6">{content.hubSubtitle}</p>
          <p className="text-white/80 leading-relaxed">{content.freeNotice}</p>
        </div>
      </section>

      {/* How it works */}
      <section className="grid sm:grid-cols-3 gap-6">
        <StepCard number="1" title={content.step1} />
        <StepCard number="2" title={content.step2} />
        <StepCard number="3" title={content.step3} />
      </section>

      {/* Calculator cards */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {isUs ? 'Choose a calculator' : 'Choisissez un calculateur'}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {content.calculators.map((calc) => {
            const Icon = ICONS[calc.icon];
            return (
              <Link
                key={calc.id}
                href={`${basePath}/${calc.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-brand-primary/40 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-primary dark:text-brand-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                      {calc.title}
                    </h3>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      {content.freeBadge}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 mb-4 leading-relaxed">
                  {calc.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary dark:text-brand-accent">
                  {isUs ? 'Open calculator' : 'Ouvrir le calculateur'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SEO content */}
      <section className="prose prose-gray dark:prose-invert max-w-none">
        {content.seoSections.map((section) => (
          <div key={section.heading} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{section.heading}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">{section.body}</p>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{content.faqTitle}</h2>
        <div className="space-y-4">
          {content.faqs.map((faq) => (
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

      <p className="text-xs text-gray-500 dark:text-gray-500 text-center">{content.disclaimer}</p>
    </div>
  );
}

function StepCard({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</p>
    </div>
  );
}
