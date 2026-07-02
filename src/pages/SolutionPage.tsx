import { Link, useParams, Navigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getSolutionBySlug } from '../data/solutions';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? getSolutionBySlug(slug) : undefined;

  if (!solution) return <Navigate to="/solutions" replace />;

  const Icon = solution.icon;

  return (
    <>
      <SEO
        title={solution.metaTitle}
        description={solution.metaDescription}
        keywords={solution.keywords}
        canonical={`/solutions/${solution.slug}`}
        structuredData={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solutions', url: `${SITE_URL}/solutions` },
          { name: solution.shortTitle, url: `${SITE_URL}/solutions/${solution.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: 'Solutions', href: '/solutions' },
          { label: solution.shortTitle },
        ]}
      />
      <article className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                {solution.category}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {solution.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">{solution.description}</p>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Benefits</h2>
                <ul className="space-y-4">
                  {solution.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Features</h2>
                <ul className="space-y-3">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ideal For</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {solution.useCases.map((useCase) => (
                  <div
                    key={useCase}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Try {solution.shortTitle} free for 7 days</h2>
              <p className="text-blue-100 mb-6">No credit card required. Full access to all features.</p>
              <Link
                to="/getting-started"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
