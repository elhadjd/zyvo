'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { CodeCountryConfig, CodeGeneratorId } from '@/data/code-generators/types';
import type { TaxCountryConfig } from '@/data/tax-calculators/types';
import QrCodeGeneratorWidget from './QrCodeGeneratorWidget';
import BarcodeGeneratorWidget from './BarcodeGeneratorWidget';

interface CodeGeneratorPageContentProps {
  codeConfig: CodeCountryConfig;
  taxConfig: TaxCountryConfig;
  generatorId: CodeGeneratorId;
  generatorTitle: string;
  generatorDescription: string;
  basePath: string;
  hubLabel: string;
}

export default function CodeGeneratorPageContent({
  codeConfig,
  taxConfig,
  generatorId,
  generatorTitle,
  generatorDescription,
  basePath,
  hubLabel,
}: CodeGeneratorPageContentProps) {
  const isUs = codeConfig.code === 'us';
  const otherGenerators = codeConfig.content.generators.filter((g) => g.id !== generatorId);
  const taxCalculators = taxConfig.content.calculators.slice(0, 3);

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
          {codeConfig.content.freeBadge}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {generatorTitle}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          {generatorDescription}
        </p>
        <p className="mt-3 text-sm text-gray-500">{codeConfig.content.freeNotice}</p>
      </header>

      {generatorId === 'qr-code' ? (
        <QrCodeGeneratorWidget config={codeConfig} />
      ) : (
        <BarcodeGeneratorWidget config={codeConfig} />
      )}

      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {codeConfig.content.relatedTools}
        </h2>
        <div className="flex flex-wrap gap-3">
          {otherGenerators.map((gen) => (
            <Link
              key={gen.id}
              href={`${basePath}/${gen.slug}`}
              className="rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              {gen.title}
            </Link>
          ))}
          {taxCalculators.map((calc) => (
            <Link
              key={calc.id}
              href={`${basePath}/${calc.slug}`}
              className="rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-primary hover:text-brand-primary transition-colors"
            >
              {calc.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
          {isUs ? 'Important notice' : 'Avis important'}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {codeConfig.content.disclaimer}
        </p>
      </section>
    </div>
  );
}
