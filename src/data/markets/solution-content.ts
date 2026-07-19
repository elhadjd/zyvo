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
  logistics: {
    title: 'Logistique & livraisons',
    subtitle:
      'Suivez vos expéditions, tournées de livraison et flotte à Conakry et en province. Optimisez les trajets et informez vos clients.',
    benefits: [
      'Suivi des livraisons en temps réel',
      'Gestion des tournées et chauffeurs',
      'Preuve de livraison',
      'Facturation transport intégrée',
      'Rapports par zone (Kaloum, Ratoma…)',
    ],
  },
  purchasing: {
    title: 'Achats & approvisionnement',
    subtitle:
      'Centralisez vos commandes fournisseurs, bons d\'achat et réceptions de marchandises pour mieux contrôler vos coûts.',
    benefits: [
      'Bons de commande numériques',
      'Base fournisseurs locale',
      'Workflow d\'approbation',
      'Liaison automatique avec le stock',
      'Analyse des dépenses d\'achat',
    ],
  },
  scheduling: {
    title: 'Rendez-vous & planning',
    subtitle:
      'Gérez les rendez-vous de vos salons, cliniques et services. Rappels SMS et agenda partagé pour votre équipe.',
    benefits: [
      'Agenda en ligne pour clients',
      'Rappels SMS automatiques',
      'Planning par employé',
      'Réduction des rendez-vous manqués',
      'Sync avec caisse POS',
    ],
  },
  'online-store': {
    title: 'Boutique en ligne',
    subtitle:
      'Lancez votre e-commerce en Guinée avec catalogue produits, paiement mobile et stock synchronisé avec votre magasin physique.',
    benefits: [
      'Catalogue produits en ligne',
      'Stock sync POS ↔ boutique',
      'Paiement Orange Money / MTN MoMo',
      'Commandes et livraisons',
      'Pages optimisées mobile',
    ],
  },
  'marketing-analytics': {
    title: 'Marketing & analyses',
    subtitle:
      'Comprenez vos meilleures ventes, lancez des campagnes SMS et fidélisez vos clients avec des données actionnables.',
    benefits: [
      'Tableaux de bord ventes',
      'Segmentation clients',
      'Campagnes SMS promotionnelles',
      'Programme de fidélité',
      'Rapports par produit et période',
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
  logistics: {
    title: 'Logistique & livraisons',
    subtitle:
      'Suivez vos expéditions, livraisons et flotte à Dakar, Pikine et en région. Optimisez les tournées et informez vos clients par SMS.',
    benefits: [
      'Suivi des livraisons en temps réel',
      'Gestion des tournées et chauffeurs',
      'Preuve de livraison photo',
      'Facturation transport intégrée',
      'Rapports par zone (Plateau, Almadies…)',
    ],
  },
  purchasing: {
    title: 'Achats & approvisionnement',
    subtitle:
      'Centralisez vos commandes fournisseurs, bons d\'achat et réceptions pour contrôler vos coûts en FCFA.',
    benefits: [
      'Bons de commande numériques',
      'Base fournisseurs sénégalais',
      'Workflow d\'approbation',
      'Liaison automatique avec le stock',
      'Analyse des dépenses d\'achat',
    ],
  },
  scheduling: {
    title: 'Rendez-vous & planning',
    subtitle:
      'Gérez les rendez-vous de vos salons, cliniques et cabinets à Dakar. Rappels SMS et agenda partagé.',
    benefits: [
      'Agenda en ligne pour clients',
      'Rappels SMS automatiques',
      'Planning par employé',
      'Réduction des rendez-vous manqués',
      'Sync avec caisse POS',
    ],
  },
  'online-store': {
    title: 'Boutique en ligne',
    subtitle:
      'Lancez votre e-commerce au Sénégal avec catalogue produits, Wave/Orange Money et stock synchronisé avec votre magasin.',
    benefits: [
      'Catalogue produits en ligne',
      'Stock sync POS ↔ boutique',
      'Paiement Wave et Orange Money',
      'Commandes et livraisons Dakar',
      'Pages optimisées mobile',
    ],
  },
  'marketing-analytics': {
    title: 'Marketing & analyses',
    subtitle:
      'Analysez vos ventes, lancez des campagnes SMS et fidélisez vos clients avec des rapports clairs en FCFA.',
    benefits: [
      'Tableaux de bord ventes',
      'Segmentation clients',
      'Campagnes SMS promotionnelles',
      'Programme de fidélité',
      'Rapports par produit et période',
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
