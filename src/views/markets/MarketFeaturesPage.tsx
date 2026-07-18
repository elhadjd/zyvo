import { MarketFeaturesGrid } from '@/components/markets/MarketPricingSection';
import MarketMobileMoneySection from '@/components/markets/MarketMobileMoneySection';
import MarketFAQSection from '@/components/markets/MarketFAQSection';
import MarketCTA from '@/components/markets/MarketCTA';

export default function MarketFeaturesPage() {
  return (
    <>
      <section className="pt-28 pb-12 lg:pt-36 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Fonctionnalités
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tout ce dont votre PME a besoin pour vendre, gérer et grandir — adapté au marché guinéen.
          </p>
        </div>
      </section>
      <MarketFeaturesGrid />
      <MarketMobileMoneySection />
      <MarketFAQSection className="bg-white dark:bg-gray-900" />
      <MarketCTA />
    </>
  );
}
