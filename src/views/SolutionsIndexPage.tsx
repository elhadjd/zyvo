import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductScreenshot from '../components/modules/ProductScreenshot';
import { solutions } from '../data/solutions';
import { getModuleImages } from '../data/module-images';
import type { MarketModuleSlug } from '../data/markets/market-modules';

export default function SolutionsIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Solutions' }]} />
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary dark:text-brand-accent mb-3">
              Real screenshots
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Integrated solutions for every part of your business
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              10+ modules that work together seamlessly. No integrations needed — one platform, one login, one source of truth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              const images = getModuleImages(solution.slug as MarketModuleSlug);
              return (
                <Link
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-brand-primary/40 dark:hover:border-brand-accent/40 hover:shadow-xl transition-all bg-gray-50/50 dark:bg-gray-800/50"
                >
                  <div className="p-3 pb-0">
                    <ProductScreenshot src={images.hero} alt={images.alt} variant="compact" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                        <Icon className="w-6 h-6 text-brand-primary dark:text-brand-accent group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                        {solution.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{solution.shortTitle}</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">{solution.description}</p>
                    <span className="inline-flex items-center text-sm font-medium text-brand-primary dark:text-brand-accent">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
