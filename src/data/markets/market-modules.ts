export const MARKET_SOLUTION_SLUGS = [
  'point-of-sale',
  'inventory-management',
  'employee-management',
  'logistics',
  'scheduling',
  'customer-queue-management',
  'marketing-analytics',
  'online-store',
  'financial-management',
  'invoicing',
  'purchasing',
] as const;

export type MarketModuleSlug = (typeof MARKET_SOLUTION_SLUGS)[number];

export const MODULE_CATEGORY_LABELS = {
  vente: 'Vente & caisse',
  operations: 'Opérations & stock',
  finance: 'Finance & facturation',
  rh: 'RH & planning',
  marketing: 'Marketing & e-commerce',
} as const;

export type MarketModuleCategory = keyof typeof MODULE_CATEGORY_LABELS;

export interface MarketModuleLabel {
  slug: MarketModuleSlug;
  title: string;
  shortDescription: string;
  category: MarketModuleCategory;
}

const MODULE_DEFINITIONS: MarketModuleLabel[] = [
  {
    slug: 'point-of-sale',
    title: 'Caisse (POS)',
    shortDescription: 'Encaissement rapide, tickets et suivi des ventes par caissier.',
    category: 'vente',
  },
  {
    slug: 'online-store',
    title: 'Boutique en ligne',
    shortDescription: 'E-commerce synchronisé avec votre stock et paiements mobiles.',
    category: 'vente',
  },
  {
    slug: 'inventory-management',
    title: 'Gestion de stock',
    shortDescription: 'Inventaire temps réel, alertes rupture et transferts inter-magasins.',
    category: 'operations',
  },
  {
    slug: 'logistics',
    title: 'Logistique & livraisons',
    shortDescription: 'Tournées, suivi des livraisons et preuve de réception.',
    category: 'operations',
  },
  {
    slug: 'purchasing',
    title: 'Achats & approvisionnement',
    shortDescription: 'Commandes fournisseurs, bons d\'achat et réceptions marchandises.',
    category: 'operations',
  },
  {
    slug: 'invoicing',
    title: 'Facturation & devis',
    shortDescription: 'Factures PDF, devis et suivi TVA conforme SYSCOHADA.',
    category: 'finance',
  },
  {
    slug: 'financial-management',
    title: 'Gestion financière',
    shortDescription: 'Trésorerie, dépenses, marges et rapports comptables.',
    category: 'finance',
  },
  {
    slug: 'employee-management',
    title: 'Gestion des employés (RH)',
    shortDescription: 'Horaires, rôles, commissions et permissions d\'accès.',
    category: 'rh',
  },
  {
    slug: 'scheduling',
    title: 'Rendez-vous & planning',
    shortDescription: 'Agenda en ligne, rappels SMS et planning par employé.',
    category: 'rh',
  },
  {
    slug: 'customer-queue-management',
    title: 'File d\'attente & SMS',
    shortDescription: 'File numérique et notifications SMS pour salons et services.',
    category: 'rh',
  },
  {
    slug: 'marketing-analytics',
    title: 'Marketing & analyses',
    shortDescription: 'Tableaux de bord, campagnes SMS et fidélisation clients.',
    category: 'marketing',
  },
];

const NAV_MODULE_SLUGS: MarketModuleSlug[] = [
  'point-of-sale',
  'inventory-management',
  'invoicing',
  'employee-management',
  'financial-management',
  'customer-queue-management',
  'logistics',
  'purchasing',
];

export function getMarketModuleLabels(): MarketModuleLabel[] {
  return MODULE_DEFINITIONS;
}

export function getSolutionsNavSubmenu(): { label: string; href: string }[] {
  const items = NAV_MODULE_SLUGS.map((slug) => {
    const mod = MODULE_DEFINITIONS.find((m) => m.slug === slug)!;
    return { label: mod.title, href: `/solutions/${mod.slug}` };
  });
  return [...items, { label: 'Toutes les solutions', href: '/solutions' }];
}
