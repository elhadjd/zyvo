'use client';

import LocalizedLink from '@/components/markets/LocalizedLink';
import WhatsAppButton from '@/components/markets/WhatsAppButton';
import type { LocalErpPageContent } from '@/data/markets/local-erp-pages';
import type { MarketCode } from '@/lib/markets/types';
import { getMarket } from '@/lib/markets/registry';

interface Props {
  page: LocalErpPageContent;
  marketCode: MarketCode;
}

export default function MarketLocalErpPage({ page, marketCode }: Props) {
  const market = getMarket(marketCode);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <LocalizedLink href="/" className="hover:text-brand-primary">
          Accueil
        </LocalizedLink>
        <span className="mx-2">/</span>
        <LocalizedLink href="/erp/restaurants" className="hover:text-brand-primary">
          ERP
        </LocalizedLink>
        <span className="mx-2">/</span>
        <span>{page.cityName}</span>
      </nav>

      <p className="text-sm font-medium text-brand-primary dark:text-brand-accent mb-3">
        {market.countryNameLocal} · {page.cityName}
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
        {page.headline}
      </h1>

      <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
        {page.content.map((paragraph, i) => (
          <p key={i} className="mb-4 text-gray-700 dark:text-gray-300">
            {paragraph}
          </p>
        ))}
      </div>

      {page.faq.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">FAQ</h2>
          <div className="space-y-4">
            {page.faq.map((item, i) => (
              <details
                key={i}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                  {item.question}
                </summary>
                <p className="mt-3 text-gray-600 dark:text-gray-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="bg-brand-primary text-white rounded-xl p-8 text-center space-y-4">
        <p className="text-lg">{page.cta}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <LocalizedLink
            href="/getting-started"
            className="inline-block px-6 py-3 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100"
          >
            Essai gratuit 7 jours
          </LocalizedLink>
          <WhatsAppButton
            variant="onPrimary"
            placement="local_erp_cta"
            label="WhatsApp"
            className="inline-flex justify-center"
          />
        </div>
      </div>
    </div>
  );
}
