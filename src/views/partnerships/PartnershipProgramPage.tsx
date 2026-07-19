'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';
import MarketBreadcrumbs from '@/components/markets/MarketBreadcrumbs';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getPartnershipProgram } from '@/data/partnerships/content';
import { isPartnershipProgramSlug } from '@/data/partnerships/programs';
import type { PartnershipProgramSlug } from '@/data/partnerships/types';

interface Props {
  programSlug: string;
}

export default function PartnershipProgramPage({ programSlug }: Props) {
  const { marketCode, isDefaultMarket } = useMarket();

  if (!isPartnershipProgramSlug(programSlug)) {
    notFound();
  }

  const program = getPartnershipProgram(marketCode, programSlug as PartnershipProgramSlug);
  const NavLink = isDefaultMarket ? Link : LocalizedLink;
  const hubLabel = isDefaultMarket ? 'Partnerships' : 'Partenariats';
  const applyLabel = isDefaultMarket ? 'Apply for this program' : 'Postuler à ce programme';
  const requirementsLabel = isDefaultMarket ? 'Requirements' : 'Prérequis';
  const benefitsLabel = isDefaultMarket ? 'Partner benefits' : 'Avantages partenaires';
  const faqLabel = isDefaultMarket ? 'FAQ' : 'Questions fréquentes';
  const backLabel = isDefaultMarket ? 'All partnership programs' : 'Tous les programmes partenaires';

  return (
    <>
      {isDefaultMarket ? (
        <Breadcrumbs
          items={[
            { label: hubLabel, href: '/partnerships' },
            { label: program.shortTitle },
          ]}
        />
      ) : (
        <MarketBreadcrumbs />
      )}

      <article className="pt-8 pb-16 lg:pt-12 lg:pb-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <NavLink
            href="/partnerships"
            className="text-sm text-brand-primary dark:text-brand-accent hover:underline mb-6 inline-block"
          >
            ← {backLabel}
          </NavLink>

          <header className="mb-10">
            <p className="text-sm font-medium text-brand-primary dark:text-brand-accent mb-3">
              {program.shortTitle}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {program.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{program.tagline}</p>
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">{program.description}</p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <strong className="text-gray-700 dark:text-gray-300">
                {isDefaultMarket ? 'Ideal for:' : 'Idéal pour :'}
              </strong>{' '}
              {program.audience}
            </p>
          </header>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{benefitsLabel}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {program.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-brand-surface/30 dark:bg-gray-800/50"
                >
                  <div className="flex gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" aria-hidden="true" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 pl-7">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{requirementsLabel}</h2>
            <ul className="space-y-2">
              {program.requirements.map((req) => (
                <li key={req} className="flex gap-2 text-gray-600 dark:text-gray-400">
                  <span className="text-brand-primary dark:text-brand-accent">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </section>

          {program.faq.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{faqLabel}</h2>
              <div className="space-y-3">
                {program.faq.map((item) => (
                  <details
                    key={item.question}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="bg-brand-primary text-white rounded-xl p-8 text-center">
            <p className="text-lg mb-4">{program.cta}</p>
            <NavLink
              href={`/contact?service=not-sure&program=${program.slug}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {applyLabel}
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </NavLink>
          </div>
        </div>
      </article>
    </>
  );
}
