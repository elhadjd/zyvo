'use client';

import { notFound } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import InvoiceGeneratorPageContent from '@/components/invoice-generator/InvoiceGeneratorPageContent';
import { getInvoiceConfig, isInvoiceSlug } from '@/data/invoice-generator/config';

interface MarketInvoicePageProps {
  calculatorSlug?: string;
  calculator?: string;
}

export default function MarketInvoicePage({ calculatorSlug, calculator }: MarketInvoicePageProps) {
  const { marketCode } = useMarket();
  const slug = calculatorSlug ?? calculator;

  if (!slug || !isInvoiceSlug(marketCode, slug)) notFound();

  const config = getInvoiceConfig(marketCode);

  return (
    <>
      <MarketBreadcrumbs lastLabel={config.title} />
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <InvoiceGeneratorPageContent
          config={config}
          basePath={config.toolsBasePath}
          hubLabel="← Outils gratuits"
        />
      </div>
    </>
  );
}
