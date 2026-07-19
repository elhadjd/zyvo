'use client';

import { useState } from 'react';
import { Check, Store, Utensils, Scissors, Pill, Truck, Building2 } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';

const industryIcons = {
  store: Store,
  utensils: Utensils,
  scissors: Scissors,
  pill: Pill,
  truck: Truck,
  building: Building2,
};

function formatPrice(amount: number, symbol: string): string {
  return `${amount.toLocaleString('fr-GN')} ${symbol}`;
}

export default function MarketPricingSection({ showTitle = true }: { showTitle?: boolean }) {
  const { market } = useMarket();
  const { pricing } = market;
  const [annual, setAnnual] = useState(true);

  if (pricing.plans.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {pricing.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">{pricing.subtitle}</p>
          </div>
        )}

        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                !annual
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {pricing.monthlyLabel}
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                annual
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {pricing.annualLabel}
              <span className="ml-1 text-xs text-brand-primary dark:text-brand-accent">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricing.plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.popular
                    ? 'border-brand-primary shadow-xl scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700'
                } bg-white dark:bg-gray-800`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-brand-primary text-white text-xs font-semibold rounded-full">
                      Populaire
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(price, plan.currencySymbol)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                    /{annual ? 'mois' : 'mois'}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{plan.users}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <LocalizedLink
                  href={plan.id === 'business' ? '/contact' : '/getting-started'}
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-brand-primary text-white hover:bg-brand-primary-hover'
                      : 'border-2 border-brand-primary text-brand-primary dark:border-brand-accent dark:text-brand-accent hover:bg-brand-primary-light dark:hover:bg-gray-700'
                  }`}
                >
                  {plan.cta}
                </LocalizedLink>
              </div>
            );
          })}
        </div>

        {pricing.footnote && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 max-w-2xl mx-auto">
            {pricing.footnote}
          </p>
        )}
      </div>
    </section>
  );
}

export function MarketIndustriesSection() {
  const { market } = useMarket();
  if (market.industries.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-brand-surface dark:bg-gray-800/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Secteurs que nous accompagnons
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Des solutions adaptées aux réalités de chaque métier en {market.countryNameLocal}.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {market.industries.map((industry) => {
            const Icon = industryIcons[industry.icon];
            return (
              <LocalizedLink
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-accent hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {industry.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{industry.description}</p>
              </LocalizedLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function MarketFeaturesGrid() {
  const { market } = useMarket();
  if (market.features.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tout ce dont votre entreprise a besoin
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Une plateforme complète pour gérer, vendre et grandir en {market.countryNameLocal}.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {market.features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-brand-surface/30 dark:bg-gray-800/30"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
