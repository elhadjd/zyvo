import { MarketIndustriesSection } from '@/components/markets/MarketPricingSection';
import MarketCTA from '@/components/markets/MarketCTA';
import LocalizedLink from '@/components/markets/LocalizedLink';
import { solutions } from '@/data/solutions';
import { ArrowRight } from 'lucide-react';

const gnSolutionLabels: Record<string, { title: string; description: string }> = {
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
  const featured = solutions.filter((s) => gnSolutionLabels[s.slug]);

  return (
    <>
      <section className="pt-28 pb-12 lg:pt-36 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Solutions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Des outils modulaires pour chaque aspect de votre entreprise en Guinée.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((solution) => {
              const localized = gnSolutionLabels[solution.slug];
              return (
                <LocalizedLink
                  key={solution.slug}
                  href={`/solutions/${solution.slug}`}
                  className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-brand-primary dark:hover:border-brand-accent hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                    {localized?.title ?? solution.shortTitle}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {localized?.description ?? solution.metaDescription}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-brand-primary dark:text-brand-accent">
                    En savoir plus
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
