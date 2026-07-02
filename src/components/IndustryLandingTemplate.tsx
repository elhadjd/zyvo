import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import type { IndustryLanding } from '../data/industry-landings';
import { getBreadcrumbSchema, getFAQSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

interface Props {
  landing: IndustryLanding;
}

export default function IndustryLandingTemplate({ landing }: Props) {
  const allFaqs = [...landing.faqs];

  return (
    <>
      <SEO
        title={landing.metaTitle}
        description={landing.metaDescription}
        keywords={landing.keywords}
        canonical={landing.path}
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: landing.industryName, url: `${SITE_URL}${landing.path}` },
          ]),
          getFAQSchema(allFaqs),
        ]}
      />
      <Breadcrumbs items={[{ label: landing.industryName }]} />

      <section className="py-12 lg:py-20 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-medium text-brand-primary dark:text-brand-accent mb-3">
                ZYVO for {landing.industryName}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {landing.headline}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{landing.subheadline}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/getting-started"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors min-h-[48px]"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-brand-primary text-brand-primary dark:border-brand-accent dark:text-brand-accent font-semibold rounded-lg hover:bg-brand-primary-light dark:hover:bg-gray-800 transition-colors min-h-[48px]"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
            <img
              src={landing.heroImage}
              alt={landing.heroImageAlt}
              className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Features for {landing.industryName.toLowerCase()}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {landing.features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-brand-surface dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-brand-surface dark:bg-gray-800/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Benefits
          </h2>
          <ul className="space-y-4">
            {landing.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQSection
        items={landing.faqs}
        title={`${landing.industryName} FAQ`}
        subtitle={`Common questions from ${landing.industryName.toLowerCase()} owners.`}
        className="py-16 lg:py-20 bg-white dark:bg-gray-900"
      />

      <section className="py-16 bg-brand-primary text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to simplify your {landing.industryName.toLowerCase()} operations?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Start your free trial today or book a demo with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/getting-started"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors min-h-[48px]"
            >
              Start Free Trial
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors min-h-[48px]"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
