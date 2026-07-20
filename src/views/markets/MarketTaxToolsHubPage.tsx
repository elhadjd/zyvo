'use client';

import { useMarket } from '@/contexts/market-context';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import TaxToolsHub from '@/components/tax-calculators/TaxToolsHub';
import { getTaxConfig } from '@/data/tax-calculators/config';

export default function MarketTaxToolsHubPage() {
  const { marketCode } = useMarket();
  const config = getTaxConfig(marketCode);
  const basePath = `${config.toolsBasePath}`;

  return (
    <>
      <MarketBreadcrumbs lastLabel="Outils fiscaux" />
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <TaxToolsHub config={config} basePath={basePath} />
      </div>
    </>
  );
}
