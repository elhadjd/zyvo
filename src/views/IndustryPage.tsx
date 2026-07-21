'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductScreenshot from '../components/modules/ProductScreenshot';
import { getIndustryBySlug } from '../data/industries';
import { getSolutionBySlug } from '../data/solutions';

interface Props {
  slug: string;
}

export default function IndustryPage({ slug }: Props) {
  const industry = getIndustryBySlug(slug);
  if (!industry) return null;

  const Icon = industry.icon;
  const relatedSolutions = industry.solutions
    .map((s) => getSolutionBySlug(s))
    .filter(Boolean);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Industries', href: '/industries' },
          { label: industry.title },
        ]}
      />
      <article className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-16 rounded-xl bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center mb-6">
              <Icon className="w-8 h-8 text-brand-primary dark:text-brand-accent" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {industry.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{industry.description}</p>

            <div className="mb-12">
              <ProductScreenshot src={industry.image} alt={industry.imageAlt} variant="hero" />
            </div>

            <div className="grid grid-cols-3 gap-6 mb-16">
              {industry.stats.map((stat) => (
                <div key={stat.label} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="text-3xl font-bold text-brand-primary dark:text-brand-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Industry Challenges</h2>
                <ul className="space-y-4">
                  {industry.challenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">ZYVO Solutions</h2>
                <div className="space-y-3">
                  {relatedSolutions.map((solution) =>
                    solution ? (
                      <Link
                        key={solution.slug}
                        href={`/solutions/${solution.slug}`}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-brand-primary/40 dark:hover:border-brand-accent/40 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{solution.shortTitle}</span>
                        <ArrowRight className="w-4 h-4 text-brand-primary dark:text-brand-accent" />
                      </Link>
                    ) : null
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-primary to-brand-primary-hover rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to transform your {industry.slug.replace('-', ' ')} business?</h2>
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
