'use client';

import Link from 'next/link';
import { ArrowRight, Check, Code2, Globe, Search, Wrench } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import Breadcrumbs from '@/components/Breadcrumbs';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import FAQSection from '@/components/FAQSection';
import {
  getDevelopmentFaqs,
  getDevelopmentHubContent,
  getDevelopmentServices,
  getServicePricingTiers,
} from '@/data/development-services/content';
import { formatDevPrice } from '@/lib/development-services/format-price';
import { getMarketInternalLinkGroups } from '@/lib/markets/seo';

const iconMap = { globe: Globe, code: Code2, wrench: Wrench };

export default function DevelopmentServicesPage() {
  const { marketCode, isDefaultMarket } = useMarket();
  const hubMeta = getDevelopmentHubContent(marketCode);
  const developmentServices = getDevelopmentServices(marketCode);
  const servicePricingTiers = getServicePricingTiers(marketCode);
  const developmentFaqs = getDevelopmentFaqs(marketCode);
  const internalLinkGroups = getMarketInternalLinkGroups(marketCode).slice(0, 3);
  const NavLink = isDefaultMarket ? Link : LocalizedLink;
  const hubLabel = isDefaultMarket ? 'Development Services' : 'Services';

  return (
    <>
      {isDefaultMarket ? (
        <Breadcrumbs items={[{ label: hubLabel }]} />
      ) : (
        <MarketBreadcrumbs />
      )}

      <section className="py-12 lg:py-20 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary-light dark:bg-brand-primary/20 border border-brand-primary/20 mb-6">
              <Search className="w-4 h-4 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-brand-primary dark:text-brand-accent">
                {hubMeta.badge}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {hubMeta.headline}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {hubMeta.subheadline}
            </p>
            {hubMeta.promoBadge && (
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-semibold mb-6">
                {hubMeta.promoBadge}
              </p>
            )}
            <div className="mb-8">
            <NavLink
              href="/contact?service=not-sure"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
            >
              {hubMeta.quoteButton}
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900" aria-labelledby="services-list-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 id="services-list-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            {hubMeta.servicesHeading}
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
                  <NavLink
                    href={service.path}
                    className="inline-flex items-center justify-center w-full py-3 px-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
                  >
                    {hubMeta.learnMoreLabel}
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </NavLink>
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
              {hubMeta.pricingHeading}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{hubMeta.pricingSubtitle}</p>
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
                  {formatDevPrice(marketCode, tier.price)}
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

      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900" id="portfolio">
        <div className="container mx-auto px-4 lg:px-8">
          <PortfolioShowcase />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-brand-surface dark:bg-gray-800/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {hubMeta.seoHeading}
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
            {hubMeta.seoBody.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          {hubMeta.seoSections && hubMeta.seoSections.length > 0 && (
            <div className="mt-12 space-y-8">
              {hubMeta.seoSections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{section.heading}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {!isDefaultMarket && (
        <section className="py-12 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {hubMeta.internalLinksHeading ?? 'Découvrir ZYVO'}
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {internalLinkGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-semibold text-brand-primary dark:text-brand-accent mb-3">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.paths.slice(0, 4).map((path) => (
                      <li key={path}>
                        <NavLink href={`/${path}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors">
                          {path.split('/').pop()?.replace(/-/g, ' ')}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection
        items={developmentFaqs}
        title={hubMeta.faqTitle}
        className="py-16 lg:py-24 bg-white dark:bg-gray-900"
      />

      <section className="py-16 bg-brand-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{hubMeta.ctaTitle}</h2>
          <p className="text-brand-surface/90 mb-8 max-w-xl mx-auto">{hubMeta.ctaSubtitle}</p>
          <NavLink
            href="/contact?service=not-sure"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-lg hover:bg-brand-surface transition-colors"
          >
            {hubMeta.ctaButton}
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </NavLink>
        </div>
      </section>
    </>
  );
}
