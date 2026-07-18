'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { getSolutionBySlug } from '../data/solutions';

interface Props {
  slug: string;
}

export default function SolutionPage({ slug }: Props) {
  const solution = getSolutionBySlug(slug);
  if (!solution) return null;

  const Icon = solution.icon;

  return (
    <>
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
              <div className="w-14 h-14 rounded-xl bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center">
                <Icon className="w-7 h-7 text-brand-primary dark:text-brand-accent" />
              </div>
              <span className="text-sm font-medium px-3 py-1 bg-brand-primary-light dark:bg-brand-primary/20 text-brand-primary dark:text-brand-accent rounded-full">
                {solution.category}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {solution.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{solution.description}</p>

            {solution.image && (
              <img
                src={solution.image}
                alt={solution.imageAlt ?? solution.title}
                className="w-full rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-12 object-cover max-h-96"
              />
            )}

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Benefits</h2>
                <ul className="space-y-4">
                  {solution.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-primary dark:text-brand-accent flex-shrink-0 mt-0.5" />
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

            <div className="bg-gradient-to-r from-brand-primary to-brand-primary-hover rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Try {solution.shortTitle} free for 7 days</h2>
              <p className="text-white/80 mb-6">No credit card required. Full access to all features.</p>
              <Link
                href="/getting-started"
                className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
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
