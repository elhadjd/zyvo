'use client';

import { notFound } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import CodeGeneratorPageContent from '@/components/code-generators/CodeGeneratorPageContent';
import { getCodeConfig, getCodeGeneratorBySlug } from '@/data/code-generators/config';
import { getTaxConfig } from '@/data/tax-calculators/config';

interface MarketCodeGeneratorPageProps {
  calculatorSlug?: string;
  calculator?: string;
}

export default function MarketCodeGeneratorPage({
  calculatorSlug,
  calculator,
}: MarketCodeGeneratorPageProps) {
  const { marketCode } = useMarket();
  const slug = calculatorSlug ?? calculator;

  if (!slug) notFound();

  const codeConfig = getCodeConfig(marketCode);
  const taxConfig = getTaxConfig(marketCode);
  const generator = getCodeGeneratorBySlug(marketCode, slug);

  if (!generator) notFound();

  return (
    <>
      <MarketBreadcrumbs lastLabel={generator.title} />
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <CodeGeneratorPageContent
          codeConfig={codeConfig}
          taxConfig={taxConfig}
          generatorId={generator.id}
          generatorTitle={generator.title}
          generatorDescription={generator.shortDescription}
          basePath={codeConfig.toolsBasePath}
          hubLabel="← Outils gratuits"
        />
      </div>
    </>
  );
}
