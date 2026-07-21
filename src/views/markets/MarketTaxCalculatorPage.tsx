'use client';

import { notFound } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import TaxCalculatorPageContent from '@/components/tax-calculators/TaxCalculatorPageContent';
import { getTaxConfig, getCalculatorBySlug } from '@/data/tax-calculators/config';

interface MarketTaxCalculatorPageProps {
  calculatorSlug?: string;
  calculator?: string;
}

export default function MarketTaxCalculatorPage({
  calculatorSlug,
  calculator,
}: MarketTaxCalculatorPageProps) {
  const { marketCode } = useMarket();
  const slug = calculatorSlug ?? calculator;

  if (!slug) notFound();

  const config = getTaxConfig(marketCode);
  const calc = getCalculatorBySlug(marketCode, slug);

  if (!calc) notFound();

  return (
    <>
      <MarketBreadcrumbs lastLabel={calc.title} />
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <TaxCalculatorPageContent
          config={config}
          calculatorId={calc.id}
          calculatorTitle={calc.title}
          calculatorDescription={calc.shortDescription}
          basePath={config.toolsBasePath}
          hubLabel="← Outils fiscaux gratuits"
        />
      </div>
    </>
  );
}
