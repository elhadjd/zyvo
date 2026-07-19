'use client';

import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';
import { getMarketInternalLinkGroups, getMarketPageSeo } from '@/lib/markets/seo';

function getLinkLabel(marketCode: ReturnType<typeof useMarket>['marketCode'], path: string): string {
  const slug = path.split('/');
  const seo = getMarketPageSeo(marketCode, slug);
  return seo?.breadcrumb ?? seo?.h1 ?? seo?.title.split('—')[0].trim() ?? path;
}

export default function MarketInternalLinks() {
  const { marketCode } = useMarket();
  const linkGroups = getMarketInternalLinkGroups(marketCode);

  return (
    <section
      className="py-12 bg-brand-surface/50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-800"
      aria-label="Liens utiles"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.paths.map((path) => (
                  <li key={path}>
                    <LocalizedLink
                      href={`/${path}`}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
                    >
                      {getLinkLabel(marketCode, path)}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
