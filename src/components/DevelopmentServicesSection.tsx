'use client';

import Link from 'next/link'
import { ArrowRight, Check, Code2, Globe, Search, Wrench } from 'lucide-react';
import PortfolioShowcase from './PortfolioShowcase';
import { developmentServices, servicePricingTiers } from '../data/development-services';

const iconMap = {
  globe: Globe,
  code: Code2,
  wrench: Wrench,
};

export default function DevelopmentServicesSection() {
  const featuredTiers = servicePricingTiers.filter((t) =>
    ['Business Website', 'Custom System', 'Website Care'].includes(t.name)
  );

  return (
    <section
      id="development-services"
      className="py-20 lg:py-32 bg-white dark:bg-gray-900"
      aria-labelledby="dev-services-heading"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero block */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary-light dark:bg-brand-primary/20 border border-brand-primary/20 mb-6">
              <Search className="w-4 h-4 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-brand-primary dark:text-brand-accent">
                Custom Development · SEO Built In
              </span>
            </div>
            <h2 id="dev-services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Websites, systems & maintenance — crafted for businesses that want to be found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              We build more than software products. Our team designs custom websites, business management systems,
              and ongoing care plans — with search engine optimization woven into every layer so your customers
              discover you when they search Google for what you offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/development-services"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
              >
                Explore all services
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact?service=not-sure"
                className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-brand-primary text-brand-primary dark:border-brand-accent dark:text-brand-accent font-semibold rounded-lg hover:bg-brand-primary-light dark:hover:bg-gray-800 transition-colors"
              >
                Get a free quote
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {developmentServices.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Link
                  key={service.slug}
                  href={service.path}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-brand-surface dark:bg-gray-800/50 hover:border-brand-primary/40 dark:hover:border-brand-accent/40 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{service.shortTitle}</h3>
                      <span className="text-sm font-bold text-brand-primary dark:text-brand-accent shrink-0">
                        {service.priceLabel}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{service.subheadline}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-primary dark:group-hover:text-brand-accent shrink-0 mt-1 transition-colors" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Pricing highlight */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Transparent pricing — below typical US agency rates
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Quality work without enterprise overhead. SEO optimization included — not sold as an add-on.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-6 rounded-2xl border bg-brand-surface dark:bg-gray-800/50 ${
                  tier.popular
                    ? 'border-brand-primary shadow-lg ring-1 ring-brand-primary/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-brand-primary text-white">
                    Most Popular
                  </span>
                )}
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{tier.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tier.description}</p>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">${tier.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{tier.priceNote}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=${tier.service}`}
                  className={`block w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-brand-primary text-white hover:bg-brand-primary-hover'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  Request quote
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <PortfolioShowcase compact />
      </div>
    </section>
  );
}
