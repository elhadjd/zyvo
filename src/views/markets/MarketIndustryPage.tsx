'use client';

import { notFound } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';
import MarketCTA from '@/components/markets/MarketCTA';
import { ArrowRight } from 'lucide-react';

interface MarketIndustryPageProps {
  industryId?: string;
}

export default function MarketIndustryPage({ industryId }: MarketIndustryPageProps) {
  const { market } = useMarket();
  const industry = market.industries.find((i) => i.id === industryId);

  if (!industry) {
    notFound();
  }

  return (
    <>
      <section className="pt-28 pb-12 lg:pt-36 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <p className="text-sm font-medium text-brand-primary dark:text-brand-accent mb-3">
            Secteur · {market.countryNameLocal}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {industry.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{industry.description}</p>
          <LocalizedLink
            href="/demo"
            className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
          >
            Demander une démo
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </LocalizedLink>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Pourquoi ZYVO pour ce secteur ?
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              En {market.countryNameLocal}, le secteur {industry.name.toLowerCase()} fait face à des
              défis spécifiques : gestion manuelle du stock, suivi des paiements mobiles, turnover
              des employés et connexion internet variable.
            </p>
            <p>
              ZYVO centralise vos opérations dans une plateforme simple, en français, avec des tarifs
              en {market.currency} et un support adapté au contexte local.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {market.features.slice(0, 4).map((f) => (
              <div
                key={f.title}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketCTA />
    </>
  );
}
