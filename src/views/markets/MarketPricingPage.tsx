'use client';

import MarketBreadcrumbs, { useMarketPageSeo } from '@/components/markets/MarketBreadcrumbs';
import MarketPricingSection from '@/components/markets/MarketPricingSection';
import MarketFAQSection from '@/components/markets/MarketFAQSection';
import MarketCTA from '@/components/markets/MarketCTA';

export default function MarketPricingPage() {
  const pageSeo = useMarketPageSeo();

  return (
    <>
      <MarketBreadcrumbs />
      <section className="pt-8 pb-4 lg:pt-12 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {pageSeo?.h1 ?? 'Tarifs'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Plans ERP transparents en francs guinéens (GNF) — essai gratuit 7 jours, paiement
            Orange Money ou virement local.
          </p>
        </div>
      </section>
      <MarketPricingSection showTitle={false} />
      <MarketFAQSection className="bg-brand-surface dark:bg-gray-800/50" />
      <MarketCTA />
    </>
  );
}
