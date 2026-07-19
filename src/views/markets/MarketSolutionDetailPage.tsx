'use client';

import { notFound } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import { solutions } from '@/data/solutions';
import MarketBreadcrumbs, { useMarketPageSeo } from '@/components/markets/MarketBreadcrumbs';
import LocalizedLink from '@/components/markets/LocalizedLink';
import MarketCTA from '@/components/markets/MarketCTA';
import { ArrowRight, Check } from 'lucide-react';

import { getMarketSolutionContent } from '@/data/markets/solution-content';

interface MarketSolutionDetailPageProps {
  solutionSlug?: string;
  countryCode?: string;
}

export default function MarketSolutionDetailPage({
  solutionSlug,
  countryCode: countryCodeProp,
}: MarketSolutionDetailPageProps) {
  const { market, marketCode: contextMarketCode } = useMarket();
  const marketCode = (countryCodeProp as typeof contextMarketCode) || contextMarketCode;
  const solution = solutions.find((s) => s.slug === solutionSlug);
  const content = solutionSlug ? getMarketSolutionContent(marketCode, solutionSlug) : undefined;
  const pageSeo = useMarketPageSeo();

  if (!solution || !content) {
    notFound();
  }

  return (
    <>
      <MarketBreadcrumbs />
      <section className="pt-8 pb-12 lg:pt-12 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <p className="text-sm font-medium text-brand-primary dark:text-brand-accent mb-3">
            Solution · {market.countryNameLocal}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {pageSeo?.h1 ?? content.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{content.subtitle}</p>
          <LocalizedLink
            href="/getting-started"
            className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
          >
            Essai gratuit 7 jours
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </LocalizedLink>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Avantages clés</h2>
          <ul className="space-y-3">
            {content.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <Check className="w-5 h-5 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MarketCTA />
    </>
  );
}
