'use client';

import { MarketIndustriesSection } from '@/components/markets/MarketPricingSection';
import MarketCTA from '@/components/markets/MarketCTA';
import LocalizedLink from '@/components/markets/LocalizedLink';
import MarketBreadcrumbs, { useMarketPageSeo } from '@/components/markets/MarketBreadcrumbs';
import {
  getMarketModuleLabels,
  MODULE_CATEGORY_LABELS,
  type MarketModuleLabel,
} from '@/data/markets/market-modules';
import { ArrowRight } from 'lucide-react';

function groupModulesByCategory(modules: MarketModuleLabel[]) {
  const groups = new Map<MarketModuleLabel['category'], MarketModuleLabel[]>();
  for (const mod of modules) {
    const list = groups.get(mod.category) ?? [];
    list.push(mod);
    groups.set(mod.category, list);
  }
  return groups;
}

const CATEGORY_ORDER: MarketModuleLabel['category'][] = [
  'vente',
  'operations',
  'finance',
  'rh',
  'marketing',
];

export default function MarketSolutionsPage() {
  const pageSeo = useMarketPageSeo();
  const modules = getMarketModuleLabels();
  const grouped = groupModulesByCategory(modules);

  return (
    <>
      <MarketBreadcrumbs />
      <section className="pt-8 pb-12 lg:pt-12 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {pageSeo?.h1 ?? 'Solutions'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {pageSeo?.description ??
              '11 modules ERP pour gérer votre entreprise : caisse POS, stock, facturation, RH, logistique et plus.'}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 space-y-14">
          {CATEGORY_ORDER.map((category) => {
            const items = grouped.get(category);
            if (!items?.length) return null;
            return (
              <div key={category}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {MODULE_CATEGORY_LABELS[category]}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((mod) => (
                    <LocalizedLink
                      key={mod.slug}
                      href={`/solutions/${mod.slug}`}
                      className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-brand-primary/30 dark:hover:border-brand-accent/30 hover:shadow-lg transition-all"
                    >
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{mod.shortDescription}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary dark:text-brand-accent">
                        En savoir plus
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </LocalizedLink>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <MarketIndustriesSection />
      <MarketCTA />
    </>
  );
}
