'use client';

import { useMarket } from '@/contexts/market-context';
import { getMarketHomeSeoContent, getMarketPricingLinkLabel } from '@/lib/markets/seo';
import LocalizedLink from '@/components/markets/LocalizedLink';

export default function MarketSEOContent() {
  const { marketCode } = useMarket();
  const content = getMarketHomeSeoContent(marketCode);
  const pricingLabel = getMarketPricingLinkLabel(marketCode);

  return (
    <section
      className="py-16 lg:py-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      aria-labelledby="seo-content-heading"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h2
          id="seo-content-heading"
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8"
        >
          {content.title}
        </h2>

        <div className="space-y-8">
          {content.sections.map((section) => (
            <article key={section.heading}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {section.heading}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <LocalizedLink
            href="/pricing"
            className="text-sm font-medium text-brand-primary dark:text-brand-accent hover:underline"
          >
            {pricingLabel}
          </LocalizedLink>
          <LocalizedLink
            href="/solutions/point-of-sale"
            className="text-sm font-medium text-brand-primary dark:text-brand-accent hover:underline"
          >
            Logiciel caisse POS →
          </LocalizedLink>
          <LocalizedLink
            href="/demo"
            className="text-sm font-medium text-brand-primary dark:text-brand-accent hover:underline"
          >
            Demander une démo gratuite →
          </LocalizedLink>
        </div>
      </div>
    </section>
  );
}
