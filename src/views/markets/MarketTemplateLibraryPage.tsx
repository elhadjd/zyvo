'use client';

import { notFound } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import TemplateLibraryPageContent from '@/components/invoice-templates/TemplateLibraryPageContent';
import { getTemplateLibraryConfig, isTemplateLibrarySlug } from '@/data/invoice-templates/config';

interface MarketTemplateLibraryPageProps {
  calculatorSlug?: string;
  calculator?: string;
}

export default function MarketTemplateLibraryPage({
  calculatorSlug,
  calculator,
}: MarketTemplateLibraryPageProps) {
  const { marketCode } = useMarket();
  const slug = calculatorSlug ?? calculator;

  if (!slug || !isTemplateLibrarySlug(marketCode, slug)) notFound();

  const config = getTemplateLibraryConfig(marketCode);

  return (
    <>
      <MarketBreadcrumbs lastLabel={config.title} />
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <TemplateLibraryPageContent
          config={config}
          basePath={config.toolsBasePath}
          hubLabel="← Outils gratuits"
        />
      </div>
    </>
  );
}
