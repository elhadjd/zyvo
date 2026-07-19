'use client';

import { Smartphone, CreditCard, Banknote, Clock } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';

const methodIcons = [Smartphone, Smartphone, Banknote, Clock];

export default function MarketMobileMoneySection() {
  const { market } = useMarket();
  const { mobileMoney } = market;

  if (!mobileMoney.title || mobileMoney.methods.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-brand-surface dark:bg-gray-800/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {mobileMoney.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{mobileMoney.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mobileMoney.methods.map((method, index) => {
            const Icon = methodIcons[index % methodIcons.length];
            return (
              <div
                key={method.name}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{method.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
              </div>
            );
          })}
        </div>

        {mobileMoney.note && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {mobileMoney.note}
          </p>
        )}
      </div>
    </section>
  );
}
