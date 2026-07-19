'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Handshake, Users, Wrench, Megaphone, Store } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllPartnershipPrograms, getPartnershipHubContent } from '@/data/partnerships/content';
import type { PartnershipProgramSlug } from '@/data/partnerships/types';

const programIcons: Record<PartnershipProgramSlug, typeof Store> = {
  reseller: Store,
  referral: Users,
  implementation: Wrench,
  affiliate: Megaphone,
};

export default function PartnershipHubPage() {
  const { market, marketCode, isDefaultMarket } = useMarket();
  const content = getPartnershipHubContent(marketCode);
  const programs = getAllPartnershipPrograms(marketCode);
  const NavLink = isDefaultMarket ? Link : LocalizedLink;

  return (
    <>
      {isDefaultMarket ? (
        <Breadcrumbs items={[{ label: 'Partnerships' }]} />
      ) : (
        <MarketBreadcrumbs />
      )}

      <section className="pt-8 pb-16 lg:pt-12 lg:pb-20 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary dark:text-brand-accent text-sm font-medium mb-6">
              <Handshake className="w-4 h-4" aria-hidden="true" />
              {isDefaultMarket ? 'Partner ecosystem' : `Partenariats ${market.countryNameLocal}`}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-5">
              {content.headline}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{content.subtitle}</p>
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">{content.intro}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {programs.map((program) => {
              const Icon = programIcons[program.slug];
              return (
                <NavLink
                  key={program.slug}
                  href={`/partnerships/${program.slug}`}
                  className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-primary/40 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{program.shortTitle}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{program.tagline}</p>
                  <span className="text-sm font-semibold text-brand-primary dark:text-brand-accent inline-flex items-center gap-1">
                    {isDefaultMarket ? 'Learn more' : 'En savoir plus'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </span>
                </NavLink>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{content.whyPartnerTitle}</h2>
              <div className="space-y-4">
                {content.whyPartnerPoints.map((point) => (
                  <div key={point.title} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{point.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{content.howItWorksTitle}</h2>
              <div className="space-y-4">
                {content.howItWorksSteps.map((step) => (
                  <div key={step.step} className="flex gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{step.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-br from-brand-primary to-brand-primary-hover text-white rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{content.ctaTitle}</h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">{content.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <NavLink
                href="/contact?service=not-sure"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                {content.ctaButton}
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </NavLink>
              <NavLink
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                {content.contactButton}
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
