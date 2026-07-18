'use client';

import { notFound } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import { solutions } from '@/data/solutions';
import MarketBreadcrumbs, { useMarketPageSeo } from '@/components/markets/MarketBreadcrumbs';
import LocalizedLink from '@/components/markets/LocalizedLink';
import MarketCTA from '@/components/markets/MarketCTA';
import { ArrowRight, Check } from 'lucide-react';

const gnSolutionContent: Record<
  string,
  { title: string; subtitle: string; benefits: string[] }
> = {
  'point-of-sale': {
    title: 'Caisse (POS) pour entreprises guinéennes',
    subtitle:
      'Encaissez rapidement en espèces, Orange Money ou MTN MoMo. Interface optimisée pour tablettes et connexions 3G.',
    benefits: [
      'Encaissement en quelques secondes',
      'Tickets et reçus personnalisés',
      'Suivi des ventes par caissier',
      'Mode dégradé hors connexion',
      'Compatible tablette Android',
    ],
  },
  'inventory-management': {
    title: 'Gestion d\'inventaire',
    subtitle:
      'Suivez votre stock en temps réel, recevez des alertes de rupture et gérez les transferts entre vos points de vente à Conakry et en province.',
    benefits: [
      'Stock en temps réel',
      'Alertes de rupture automatiques',
      'Transferts inter-magasins',
      'Inventaires périodiques',
      'Valorisation du stock en GNF',
    ],
  },
  'employee-management': {
    title: 'Gestion des employés',
    subtitle:
      'Horaires, rôles, commissions et permissions pour protéger vos données et motiver votre équipe.',
    benefits: [
      'Rôles et permissions',
      'Suivi des horaires',
      'Commissions sur ventes',
      'Historique par employé',
      'Accès mobile pour managers',
    ],
  },
  'customer-queue-management': {
    title: 'File d\'attente & SMS',
    subtitle:
      'Réduisez l\'attente dans vos salons et services avec des notifications SMS automatiques.',
    benefits: [
      'File d\'attente numérique',
      'Notifications SMS clients',
      'Affichage temps d\'attente',
      'Historique des visites',
      'Idéal pour salons et cliniques',
    ],
  },
  invoicing: {
    title: 'Facturation & devis',
    subtitle:
      'Générez des factures conformes, suivez la TVA et envoyez des devis professionnels à vos clients B2B.',
    benefits: [
      'Factures et devis en PDF',
      'Suivi TVA',
      'Relances de paiement',
      'Historique client',
      'Export pour comptable',
    ],
  },
  'financial-management': {
    title: 'Gestion financière',
    subtitle:
      'Pilotez votre trésorerie, suivez les dépenses et analysez vos marges avec des rapports clairs.',
    benefits: [
      'Journal des ventes et dépenses',
      'Tableaux de bord',
      'Rapports de marge',
      'Export Excel',
      'Vue multi-magasins',
    ],
  },
};

interface MarketSolutionDetailPageProps {
  solutionSlug?: string;
}

export default function MarketSolutionDetailPage({ solutionSlug }: MarketSolutionDetailPageProps) {
  const { market } = useMarket();
  const solution = solutions.find((s) => s.slug === solutionSlug);
  const content = solutionSlug ? gnSolutionContent[solutionSlug] : undefined;
  const pageSeo = useMarketPageSeo();

  if (!solution || !content) {
    notFound();
  }

  return (
    <>
      <MarketBreadcrumbs />
      <section className="pt-8 pb-12 lg:pt-12 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <p className="text-sm font-medium text-brand-primary dark:text-brand-accent mb-3">
            Solution · {market.countryNameLocal}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {pageSeo?.h1 ?? content.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{content.subtitle}</p>
          <LocalizedLink
            href="/getting-started"
            className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
          >
            Essai gratuit 7 jours
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </LocalizedLink>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Avantages clés</h2>
          <ul className="space-y-3">
            {content.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <Check className="w-5 h-5 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MarketCTA />
    </>
  );
}
