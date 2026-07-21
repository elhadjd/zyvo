'use client';

import { notFound } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import TaxCalculatorPageContent from '@/components/tax-calculators/TaxCalculatorPageContent';
import MarketCodeGeneratorPage from '@/views/markets/MarketCodeGeneratorPage';
import MarketInvoicePage from '@/views/markets/MarketInvoicePage';
import MarketTemplateLibraryPage from '@/views/markets/MarketTemplateLibraryPage';
import { getTaxConfig, getCalculatorBySlug } from '@/data/tax-calculators/config';
import { getCodeGeneratorBySlug } from '@/data/code-generators/config';
import { isInvoiceSlug } from '@/data/invoice-generator/config';
import { isTemplateLibrarySlug } from '@/data/invoice-templates/config';

interface MarketToolPageProps {
  calculatorSlug?: string;
  calculator?: string;
}

export default function MarketToolPage({ calculatorSlug, calculator }: MarketToolPageProps) {
  const { marketCode } = useMarket();
  const slug = calculatorSlug ?? calculator;

  if (!slug) notFound();

  const taxCalc = getCalculatorBySlug(marketCode, slug);
  if (taxCalc) {
    const taxConfig = getTaxConfig(marketCode);
    return (
      <>
        <MarketBreadcrumbs lastLabel={taxCalc.title} />
        <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
          <TaxCalculatorPageContent
            config={taxConfig}
            calculatorId={taxCalc.id}
            calculatorTitle={taxCalc.title}
            calculatorDescription={taxCalc.shortDescription}
            basePath={taxConfig.toolsBasePath}
            hubLabel="← Outils gratuits"
          />
        </div>
      </>
    );
  }

  const codeGen = getCodeGeneratorBySlug(marketCode, slug);
  if (codeGen) {
    return <MarketCodeGeneratorPage calculatorSlug={slug} />;
  }

  if (isInvoiceSlug(marketCode, slug)) {
    return <MarketInvoicePage calculatorSlug={slug} />;
  }

  if (isTemplateLibrarySlug(marketCode, slug)) {
    return <MarketTemplateLibraryPage calculatorSlug={slug} />;
  }

  notFound();
}
