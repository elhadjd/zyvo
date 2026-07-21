'use client';

import MarketBreadcrumbs, { useMarketPageSeo } from '@/components/markets/MarketBreadcrumbs';
import { MarketFeaturesGrid } from '@/components/markets/MarketPricingSection';
import MarketModulesShowcase from '@/components/modules/MarketModulesShowcase';
import MarketMobileMoneySection from '@/components/markets/MarketMobileMoneySection';
import MarketFAQSection from '@/components/markets/MarketFAQSection';
import MarketCTA from '@/components/markets/MarketCTA';
import MarketInternalLinks from '@/components/markets/MarketInternalLinks';

export default function MarketFeaturesPage() {
  const pageSeo = useMarketPageSeo();

  return (
    <>
      <MarketBreadcrumbs />
      <section className="pt-8 pb-12 lg:pt-12 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {pageSeo?.h1 ?? 'Fonctionnalités'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {pageSeo?.description ??
              'Caisse POS, inventaire, comptabilité SYSCOHADA et rapports — tout ce dont votre PME a besoin pour vendre, gérer et grandir.'}
          </p>
        </div>
      </section>
      <MarketFeaturesGrid />
      <MarketModulesShowcase />
      <MarketMobileMoneySection />
      <MarketFAQSection className="bg-white dark:bg-gray-900" />
      <MarketInternalLinks />
      <MarketCTA />
    </>
  );
}
