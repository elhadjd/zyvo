import Link from 'next/link'
import { ArrowRight, Check, Code2, Globe, Search, Wrench } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import PortfolioShowcase from '../components/PortfolioShowcase';
import FAQSection from '../components/FAQSection';
import {
  developmentServices,
  developmentFaqs,
  hubMeta,
  servicePricingTiers,
} from '../data/development-services';
import {
  getBreadcrumbSchema,
  getFAQSchema,
  getProfessionalServiceSchema,
  getServiceCatalogSchema,
} from '../data/structured-data';
import { SITE_URL } from '../data/site';

const iconMap = { globe: Globe, code: Code2, wrench: Wrench };

export default function DevelopmentServicesPage() {
  const serviceSchemas = developmentServices.map((s) =>
    getProfessionalServiceSchema({
      name: s.title,
      description: s.metaDescription,
      url: `${SITE_URL}${s.path}`,
      priceFrom: s.priceFrom,
    })
  );

  return (
    <>
      <Breadcrumbs items={[{ label: 'Development Services' }]} />

      <section className="py-12 lg:py-20 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary-light dark:bg-brand-primary/20 border border-brand-primary/20 mb-6">
              <Search className="w-4 h-4 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-brand-primary dark:text-brand-accent">
                Web Design · Custom Software · Maintenance
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {hubMeta.headline}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {hubMeta.subheadline}
            </p>
            <Link
              href="/contact?service=not-sure"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
            >
              Get a free project quote
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900" aria-labelledby="services-list-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="services-list-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            What we build for US small businesses
          </h2>
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {developmentServices.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <article
                  key={service.slug}
                  className="flex flex-col p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-brand-surface dark:bg-gray-800/50 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-brand-primary flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-2xl font-bold text-brand-primary dark:text-brand-accent mb-1">{service.priceLabel}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{service.marketCompare}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1 leading-relaxed">{service.subheadline}</p>
                  <ul className="space-y-2 mb-8">
                    {service.includes.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.path}
                    className="inline-flex items-center justify-center w-full py-3 px-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
                  >
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-brand-surface dark:bg-gray-800/50" aria-labelledby="pricing-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="pricing-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Development pricing — competitive & transparent
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our rates are typically 15–25% below comparable US agency pricing, with SEO optimization included in every website project.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {servicePricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-5 rounded-xl border bg-white dark:bg-gray-900 ${
                  tier.popular ? 'border-brand-primary ring-1 ring-brand-primary/20' : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{tier.name}</h3>
                <p className="text-2xl font-bold text-brand-primary dark:text-brand-accent mb-0.5">
                  ${tier.price.toLocaleString()}
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">{tier.priceNote}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{tier.description}</p>
                <ul className="space-y-1">
                  {tier.features.slice(0, 3).map((f) => (
                    <li key={f} className="text-xs text-gray-600 dark:text-gray-400 flex items-start">
                      <Check className="w-3 h-3 text-green-500 mr-1 mt-0.5 shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <PortfolioShowcase />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-brand-surface dark:bg-gray-800/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Why SEO matters in every project we deliver
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              When someone in your city searches for &ldquo;salon website design,&rdquo; &ldquo;all-in-one business management software,&rdquo;
              or &ldquo;website maintenance for small business,&rdquo; you want to appear at the top — not on page three.
              That is why we treat search engine optimization as a foundation, not an afterthought.
            </p>
            <p>
              Every website we build includes semantic HTML structure, optimized page titles and meta descriptions,
              Open Graph tags for social sharing, JSON-LD structured data for rich search results, fast-loading assets,
              and mobile-first responsive design. For custom software, we architect public-facing pages and landing
              sections with the same discipline so your digital presence compounds over time.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        items={developmentFaqs}
        title="Development Services FAQ"
        className="py-16 lg:py-24 bg-white dark:bg-gray-900"
      />

      <section className="py-16 bg-brand-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to start your project?</h2>
          <p className="text-brand-surface/90 mb-8 max-w-xl mx-auto">
            Tell us about your business and goals. We will respond with a clear scope, timeline, and quote — no pressure.
          </p>
          <Link
            href="/contact?service=not-sure"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-lg hover:bg-brand-surface transition-colors"
          >
            Contact our team
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
