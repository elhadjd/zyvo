import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { industries } from '../data/industries';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function IndustriesIndexPage() {
  return (
    <>
      <SEO
        title="Industries — Business Management by Sector"
        description="ZYVO serves retail, manufacturing, healthcare, hospitality, professional services, and e-commerce businesses across the United States."
        keywords="industry business software, retail ERP, manufacturing software, healthcare practice management USA"
        canonical="/industries"
        structuredData={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Industries', url: `${SITE_URL}/industries` },
        ])}
      />
      <Breadcrumbs items={[{ label: 'Industries' }]} />
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Built for your industry
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              ZYVO adapts to the unique workflows of US businesses across every major industry sector.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <Link
                  key={industry.slug}
                  to={`/industries/${industry.slug}`}
                  className="group p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg"
                >
                  <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{industry.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{industry.description}</p>
                  <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                    Explore solutions
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
