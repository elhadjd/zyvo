import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle, Code2, Globe, Wrench } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import PortfolioShowcase from '../components/PortfolioShowcase';
import FAQSection from '../components/FAQSection';
import NotFoundPage from './NotFoundPage';
import { getServiceBySlug, developmentServices, servicePricingTiers } from '../data/development-services';
import { getBreadcrumbSchema, getFAQSchema, getProfessionalServiceSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

const iconMap = { globe: Globe, code: Code2, wrench: Wrench };

interface Props {
  slug?: string;
}

export default function DevelopmentServiceDetailPage({ slug: slugProp }: Props) {
  const location = useLocation();
  const service =
    (slugProp ? getServiceBySlug(slugProp) : undefined) ??
    developmentServices.find((s) => s.path === location.pathname);

  if (!service) return <NotFoundPage />;

  const Icon = iconMap[service.icon];
  const relatedTiers = servicePricingTiers.filter((t) => t.service === service.slug);

  return (
    <>
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={service.keywords}
        canonical={service.path}
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Development Services', url: `${SITE_URL}/development-services` },
            { name: service.title, url: `${SITE_URL}${service.path}` },
          ]),
          getProfessionalServiceSchema({
            name: service.title,
            description: service.metaDescription,
            url: `${SITE_URL}${service.path}`,
            priceFrom: service.priceFrom,
          }),
          getFAQSchema(service.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { label: 'Development Services', href: '/development-services' },
          { label: service.shortTitle },
        ]}
      />

      <section className="py-12 lg:py-20 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-brand-primary dark:text-brand-accent">
                  ZYVO Development Services
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {service.headline}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{service.subheadline}</p>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div>
                  <p className="text-3xl font-bold text-brand-primary dark:text-brand-accent">{service.priceLabel}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{service.marketCompare}</p>
                </div>
                <div className="h-10 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Typical delivery</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{service.deliveryTime}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/contact?service=${service.slug}`}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
                >
                  Get a free quote
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
                <Link
                  to="/development-services"
                  className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  All services
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">What&apos;s included</h2>
              <ul className="space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white dark:bg-gray-900" aria-labelledby="features-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            How we deliver {service.shortTitle.toLowerCase()} that ranks and converts
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-brand-surface dark:bg-gray-800/50"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedTiers.length > 0 && (
        <section className="py-16 lg:py-20 bg-brand-surface dark:bg-gray-800/50" aria-labelledby="tiers-heading">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 id="tiers-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
              Pricing options
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {relatedTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`p-6 rounded-2xl border bg-white dark:bg-gray-900 ${
                    tier.popular ? 'border-brand-primary shadow-lg' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{tier.name}</h3>
                  <p className="text-3xl font-bold text-brand-primary dark:text-brand-accent mb-2">
                    ${tier.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500 ml-1">{tier.priceNote}</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tier.description}</p>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?service=${service.slug}`}
                    className="block w-full text-center py-3 px-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
                  >
                    Request quote
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(service.slug === 'custom-website-development' || service.slug === 'custom-software-development') && (
        <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 lg:px-8">
            <PortfolioShowcase
              heading="See our work in production"
              subheading="Live websites and systems built by the ZYVO team — proof you can click through today."
            />
          </div>
        </section>
      )}

      <FAQSection
        items={service.faqs}
        title={`${service.shortTitle} FAQ`}
        subtitle="Answers to common questions about pricing, process, and results."
      />

      <section className="py-16 bg-brand-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Let&apos;s build something great together</h2>
          <p className="text-brand-surface/90 mb-6 max-w-lg mx-auto">
            Share your vision and we will craft a proposal with clear pricing and timeline.
          </p>
          <Link
            to={`/contact?service=${service.slug}`}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-lg hover:bg-brand-surface transition-colors"
          >
            Start your project
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
