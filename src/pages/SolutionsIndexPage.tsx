import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { solutions } from '../data/solutions';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function SolutionsIndexPage() {
  return (
    <>
      <SEO
        title="Business Solutions — POS, Inventory, HR, Finance & More"
        description="Explore 10+ integrated business solutions: POS, inventory management, HR, logistics, e-commerce, invoicing, and financial management for US companies."
        keywords="business solutions software, integrated business platform, POS inventory HR finance USA"
        canonical="/solutions"
        structuredData={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solutions', url: `${SITE_URL}/solutions` },
        ])}
      />
      <Breadcrumbs items={[{ label: 'Solutions' }]} />
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Integrated solutions for every part of your business
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              10+ modules that work together seamlessly. No integrations needed — one platform, one login, one source of truth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <Link
                  key={solution.slug}
                  to={`/solutions/${solution.slug}`}
                  className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                      {solution.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{solution.shortTitle}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{solution.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
