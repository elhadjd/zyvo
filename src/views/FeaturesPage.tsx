import Link from 'next/link'
import Breadcrumbs from '../components/Breadcrumbs';
import Features from '../components/Features';
import { ArrowRight } from 'lucide-react';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function FeaturesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Features' }]} />
      <Features />
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            See features in action
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your 7-day free trial and explore every feature with no credit card required.
          </p>
          <Link
            href="/getting-started"
            className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
          >
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
