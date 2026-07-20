'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { TaxCountryConfig } from '@/data/tax-calculators/types';
import type { TaxCalculatorId } from '@/data/tax-calculators/types';
import TaxCalculatorWidget from './TaxCalculatorWidget';

interface TaxCalculatorPageContentProps {
  config: TaxCountryConfig;
  calculatorId: TaxCalculatorId;
  calculatorTitle: string;
  calculatorDescription: string;
  basePath: string;
  hubLabel: string;
}

export default function TaxCalculatorPageContent({
  config,
  calculatorId,
  calculatorTitle,
  calculatorDescription,
  basePath,
  hubLabel,
}: TaxCalculatorPageContentProps) {
  const isUs = config.code === 'us';
  const otherCalculators = config.content.calculators.filter((c) => c.id !== calculatorId);

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
          {config.content.freeBadge}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {calculatorTitle}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          {calculatorDescription}
        </p>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
          {config.content.freeNotice}
        </p>
      </header>

      <TaxCalculatorWidget calculatorId={calculatorId} config={config} />

      {otherCalculators.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {config.content.relatedTools}
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherCalculators.map((calc) => (
              <Link
                key={calc.id}
                href={`${basePath}/${calc.slug}`}
                className="rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-primary hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
              >
                {calc.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          {isUs ? 'Important notice' : 'Avis important'}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {config.content.disclaimer}
        </p>
      </section>
    </div>
  );
}
