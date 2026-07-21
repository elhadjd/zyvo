'use client';

import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';
import ProductScreenshot from './ProductScreenshot';
import {
  HOMEPAGE_MODULE_HIGHLIGHTS,
  getModuleImages,
} from '@/data/module-images';
import { getMarketModuleLabels } from '@/data/markets/market-modules';
import { ArrowRight } from 'lucide-react';

export default function MarketModulesShowcase() {
  const { market } = useMarket();
  const modules = getMarketModuleLabels();
  const highlights = HOMEPAGE_MODULE_HIGHLIGHTS.map((slug) => {
    const mod = modules.find((m) => m.slug === slug)!;
    const images = getModuleImages(slug);
    return { ...mod, images };
  });

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary dark:text-brand-accent mb-3">
            Interface réelle
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Le logiciel en action — pas des maquettes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Captures d&apos;écran du système ZYVO utilisé par les PME en {market.countryNameLocal}.
            Caisse, stock, facturation et plus — tout dans une seule plateforme.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {highlights.map((mod, index) => (
            <LocalizedLink
              key={mod.slug}
              href={`/solutions/${mod.slug}`}
              className={`group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-brand-surface/30 dark:bg-gray-800/30 overflow-hidden hover:border-brand-primary/30 dark:hover:border-brand-accent/30 hover:shadow-xl transition-all duration-300 ${
                index === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-1' : ''
              }`}
            >
              <div className={`p-4 pb-0 ${index === 0 ? 'lg:p-6 lg:pb-0' : ''}`}>
                <ProductScreenshot
                  src={mod.images.hero}
                  alt={mod.images.alt}
                  variant={index === 0 ? 'hero' : 'card'}
                  priority={index === 0}
                />
              </div>
              <div className="p-5 lg:p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                  {mod.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                  {mod.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-primary dark:text-brand-accent">
                  Voir le module
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </LocalizedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
