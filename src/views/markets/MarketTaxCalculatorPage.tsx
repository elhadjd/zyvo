'use client';

import { notFound } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import TaxCalculatorPageContent from '@/components/tax-calculators/TaxCalculatorPageContent';
import { getTaxConfig, getCalculatorBySlug } from '@/data/tax-calculators/config';

interface MarketTaxCalculatorPageProps {
  calculatorSlug?: string;
}

export default function MarketTaxCalculatorPage({ calculatorSlug }: MarketTaxCalculatorPageProps) {
  const { marketCode } = useMarket();

  if (!calculatorSlug) notFound();

  const config = getTaxConfig(marketCode);
  const calculator = getCalculatorBySlug(marketCode, calculatorSlug);

  if (!calculator) notFound();

  return (
    <>
      <MarketBreadcrumbs lastLabel={calculator.title} />
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <TaxCalculatorPageContent
          config={config}
          calculatorId={calculator.id}
          calculatorTitle={calculator.title}
          calculatorDescription={calculator.shortDescription}
          basePath={config.toolsBasePath}
          hubLabel="← Outils fiscaux gratuits"
        />
      </div>
    </>
  );
}
