'use client';

import { useMarket } from '@/contexts/market-context';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import FreeToolsHub from '@/components/code-generators/FreeToolsHub';
import { getCodeConfig } from '@/data/code-generators/config';
import { getTaxConfig } from '@/data/tax-calculators/config';

export default function MarketTaxToolsHubPage() {
  const { marketCode } = useMarket();
  const codeConfig = getCodeConfig(marketCode);
  const taxConfig = getTaxConfig(marketCode);
  const basePath = codeConfig.toolsBasePath;

  return (
    <>
      <MarketBreadcrumbs lastLabel="Outils gratuits" />
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <FreeToolsHub codeConfig={codeConfig} taxConfig={taxConfig} basePath={basePath} />
      </div>
    </>
  );
}
