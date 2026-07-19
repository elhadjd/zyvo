'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';

export default function MarketFAQSection({ className = '' }: { className?: string }) {
  const { market } = useMarket();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (market.faqs.length === 0) return null;

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tout ce que vous devez savoir sur ZYVO en {market.countryNameLocal}.
          </p>
        </div>

        <div className="space-y-3">
          {market.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
