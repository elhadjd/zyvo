import type { MarketCode } from '@/lib/markets/types';

export interface SolutionContent {
  title: string;
  subtitle: string;
  benefits: string[];
}

const GN_SOLUTION_CONTENT: Record<string, SolutionContent> = {
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
      'Suivi TVA 18 %',
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

const SN_SOLUTION_CONTENT: Record<string, SolutionContent> = {
  'point-of-sale': {
    title: 'Caisse (POS) pour entreprises sénégalaises',
    subtitle:
      'Encaissez rapidement en espèces, Wave, Orange Money ou Free Money. Interface optimisée pour tablettes et connexions 4G à Dakar.',
    benefits: [
      'Encaissement Wave et Orange Money',
      'Tickets et reçus personnalisés',
      'Suivi des ventes par caissier',
      'Mode dégradé hors connexion',
      'Compatible tablette Android',
    ],
  },
  'inventory-management': {
    title: 'Gestion d\'inventaire',
    subtitle:
      'Suivez votre stock en temps réel, recevez des alertes de rupture et gérez les transferts entre vos points de vente à Dakar, Pikine et en province.',
    benefits: [
      'Stock en temps réel',
      'Alertes de rupture automatiques',
      'Transferts inter-magasins',
      'Inventaires périodiques',
      'Valorisation du stock en FCFA',
    ],
  },
  'employee-management': {
    title: 'Gestion des employés',
    subtitle:
      'Horaires, rôles, commissions et permissions pour protéger vos données et motiver votre équipe au Sénégal.',
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
      'Réduisez l\'attente dans vos salons et services dakarois avec des notifications SMS automatiques.',
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
      'Générez des factures conformes NINEA, suivez la TVA DGI et envoyez des devis professionnels à vos clients B2B.',
    benefits: [
      'Factures et devis en PDF',
      'Suivi TVA 18 %',
      'Relances de paiement',
      'Historique client',
      'Export SYSCOHADA pour comptable',
    ],
  },
  'financial-management': {
    title: 'Gestion financière',
    subtitle:
      'Pilotez votre trésorerie en FCFA, suivez les dépenses et analysez vos marges avec des rapports clairs.',
    benefits: [
      'Journal des ventes et dépenses',
      'Tableaux de bord',
      'Rapports de marge',
      'Export Excel',
      'Vue multi-magasins',
    ],
  },
};

export function getMarketSolutionContent(
  marketCode: MarketCode,
  slug: string
): SolutionContent | undefined {
  if (marketCode === 'sn') return SN_SOLUTION_CONTENT[slug];
  return GN_SOLUTION_CONTENT[slug];
}
