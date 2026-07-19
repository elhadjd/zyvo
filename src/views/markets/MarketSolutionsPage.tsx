'use client';

import { MarketIndustriesSection } from '@/components/markets/MarketPricingSection';
import MarketCTA from '@/components/markets/MarketCTA';
import LocalizedLink from '@/components/markets/LocalizedLink';
import MarketBreadcrumbs, { useMarketPageSeo } from '@/components/markets/MarketBreadcrumbs';
import { solutions } from '@/data/solutions';
import { ArrowRight } from 'lucide-react';

const solutionLabels: Record<string, { title: string; description: string }> = {
  'point-of-sale': {
    title: 'Caisse (POS)',
    description: 'Encaissement rapide, tickets, remises et suivi des ventes journalières.',
  },
  'inventory-management': {
    title: 'Gestion d\'inventaire',
    description: 'Stock en temps réel, alertes de rupture et transferts entre magasins.',
  },
  'employee-management': {
    title: 'Gestion des employés',
    description: 'Horaires, rôles, commissions et contrôle d\'accès pour votre équipe.',
  },
  'customer-queue-management': {
    title: 'File d\'attente & SMS',
    description: 'Notifications SMS et gestion de la salle d\'attente pour salons et services.',
  },
  invoicing: {
    title: 'Facturation',
    description: 'Factures conformes, devis et suivi des paiements clients.',
  },
  'financial-management': {
    title: 'Gestion financière',
    description: 'Comptabilité, dépenses, marges et rapports pour piloter votre activité.',
  },
};

export default function MarketSolutionsPage() {
  const pageSeo = useMarketPageSeo();
  const featured = solutions.filter((s) => solutionLabels[s.slug]);

  return (
    <>
      <MarketBreadcrumbs />
      <section className="pt-8 pb-12 lg:pt-12 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {pageSeo?.h1 ?? 'Solutions'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {pageSeo?.description ??
              'Des outils modulaires pour chaque aspect de votre entreprise.'}
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((solution) => {
              const localized = solutionLabels[solution.slug];
              return (
                <LocalizedLink
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-brand-primary/30 dark:hover:border-brand-accent/30 hover:shadow-lg transition-all"
                >
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                    {localized.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{localized.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary dark:text-brand-accent">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </LocalizedLink>
              );
            })}
          </div>
        </div>
      </section>

      <MarketIndustriesSection />
      <MarketCTA />
    </>
  );
}
