'use client';

import { useMarket } from '@/contexts/market-context';
import { getMarketHomeSeoContent } from '@/lib/markets/seo';
import { MarketStats, MarketWhySection } from '@/components/markets/MarketHero';
import MarketCTA from '@/components/markets/MarketCTA';

export default function MarketAboutPage() {
  const { market, marketCode } = useMarket();
  const seoContent = getMarketHomeSeoContent(marketCode);

  return (
    <>
      <section className="pt-28 pb-12 lg:pt-36 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            ZYVO en {market.countryNameLocal}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {market.description}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            {market.trustMessage}
          </p>
        </div>
      </section>
      <MarketStats />
      <MarketWhySection />
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {seoContent.title}
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-4">
            {seoContent.sections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {section.heading}
                </h3>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <MarketCTA />
    </>
  );
}
