import type { MarketModuleSlug } from '@/data/markets/market-modules';

export interface ModuleImageSet {
  hero: string;
  alt: string;
  gallery: string[];
}

const MODULE_IMAGE_REGISTRY: Record<MarketModuleSlug, ModuleImageSet> = {
  'point-of-sale': {
    hero: '/images/modules/pos/82-pos-main.png',
    alt: 'Interface caisse POS ZYVO — catalogue produits et encaissement',
    gallery: [
      '/images/modules/pos/82-pos-main.png',
      '/images/modules/pos/83-pos-products.png',
      '/images/modules/pos/84-pos-favorites.png',
      '/images/modules/pos/85-pos-clients.png',
      '/images/modules/pos/86-pos-orders-panel.png',
      '/images/modules/pos/87-pos-payment.png',
      '/images/modules/pos/80-pos-cash-list.png',
      '/images/modules/pos/81-pos-pin-lock.png',
      '/images/modules/pos/14-orders-pos.png',
      '/images/modules/pos/15-pos-operations.png',
      '/images/modules/pos/16-pdv-report.png',
    ],
  },
  'inventory-management': {
    hero: '/images/modules/stock-management/24-stock-summary.png',
    alt: 'Tableau de bord gestion de stock ZYVO — inventaire temps réel',
    gallery: [
      '/images/modules/stock-management/24-stock-summary.png',
      '/images/modules/stock-management/23-articles.png',
      '/images/modules/stock-management/25-stock-transfers.png',
      '/images/modules/stock-management/26-stock-movements.png',
      '/images/modules/stock-management/27-composite-products.png',
      '/images/modules/stock-management/28-variants.png',
      '/images/modules/stock-management/34-movements.png',
    ],
  },
  'employee-management': {
    hero: '/images/modules/employee/29-employees.png',
    alt: 'Gestion des employés ZYVO — équipe, rôles et permissions',
    gallery: [
      '/images/modules/employee/29-employees.png',
      '/images/modules/employee/30-employee-time.png',
      '/images/modules/employee/31-employee-departments.png',
    ],
  },
  logistics: {
    hero: '/images/modules/stock-management/25-stock-transfers.png',
    alt: 'Logistique ZYVO — transferts de stock et livraisons',
    gallery: [
      '/images/modules/stock-management/25-stock-transfers.png',
      '/images/modules/stock-management/26-stock-movements.png',
      '/images/modules/stock-management/34-movements.png',
    ],
  },
  scheduling: {
    hero: '/images/modules/employee/30-employee-time.png',
    alt: 'Planning et rendez-vous ZYVO — horaires et agenda',
    gallery: ['/images/modules/employee/30-employee-time.png'],
  },
  'customer-queue-management': {
    hero: '/images/salon-queue.png',
    alt: 'File d\'attente ZYVO — notifications SMS pour salons',
    gallery: ['/images/salon-queue.png'],
  },
  'marketing-analytics': {
    hero: '/images/modules/marketing/37-marketing-google.png',
    alt: 'Marketing ZYVO — intégration Google Ads et analyses',
    gallery: [
      '/images/modules/marketing/37-marketing-google.png',
      '/images/modules/marketing/38-marketing-meta.png',
      '/images/modules/marketing/40-marketing-emails.png',
    ],
  },
  'online-store': {
    hero: '/images/modules/e-commerce/41-public-orders.png',
    alt: 'Boutique en ligne ZYVO — commandes publiques e-commerce',
    gallery: [
      '/images/modules/e-commerce/41-public-orders.png',
      '/images/modules/e-commerce/20-cj-dropshipping.png',
      '/images/modules/e-commerce/21-aliexpress.png',
    ],
  },
  'financial-management': {
    hero: '/images/modules/finance/02-dashboard.png',
    alt: 'Tableau de bord financier ZYVO — trésorerie et rapports',
    gallery: [
      '/images/modules/finance/02-dashboard.png',
      '/images/modules/finance/09-billing-report.png',
      '/images/modules/finance/16-pdv-report.png',
    ],
  },
  invoicing: {
    hero: '/images/modules/invoicing/08-billing-payments.png',
    alt: 'Facturation ZYVO — paiements et suivi des factures',
    gallery: [
      '/images/modules/invoicing/08-billing-payments.png',
      '/images/modules/invoicing/06-price-lists.png',
      '/images/modules/invoicing/09-billing-report.png',
      '/images/modules/invoicing/10-credit-notes.png',
      '/images/modules/invoicing/12-installments.png',
      '/images/modules/invoicing/13-billing-notes.png',
    ],
  },
  purchasing: {
    hero: '/images/modules/purchases/08-billing-payments.png',
    alt: 'Achats ZYVO — commandes fournisseurs et approvisionnement',
    gallery: [
      '/images/modules/purchases/08-billing-payments.png',
      '/images/modules/purchases/06-price-lists.png',
      '/images/modules/purchases/09-billing-report.png',
      '/images/modules/purchases/10-credit-notes.png',
      '/images/modules/purchases/12-installments.png',
      '/images/modules/purchases/13-billing-notes.png',
    ],
  },
};

/** Homepage hero — flagship POS screenshot */
export const HOMEPAGE_HERO_IMAGE = MODULE_IMAGE_REGISTRY['point-of-sale'].hero;
export const HOMEPAGE_HERO_ALT =
  'Interface caisse POS ZYVO — encaissement rapide, catalogue produits et paiements';

export const INTEGRATIONS_HERO_IMAGE = '/images/modules/marketing/38-marketing-meta.png';
export const INTEGRATIONS_HERO_ALT =
  'Intégrations ZYVO — Meta, WhatsApp Business et plateformes marketing';

export function getModuleImages(slug: MarketModuleSlug): ModuleImageSet {
  return MODULE_IMAGE_REGISTRY[slug];
}

export function getModuleHeroImage(slug: MarketModuleSlug): string {
  return MODULE_IMAGE_REGISTRY[slug].hero;
}

export function getModuleHeroAlt(slug: MarketModuleSlug): string {
  return MODULE_IMAGE_REGISTRY[slug].alt;
}

/** Map US product-showcase ids to module image sets */
const PRODUCT_ID_TO_SLUG: Record<string, MarketModuleSlug> = {
  pos: 'point-of-sale',
  inventory: 'inventory-management',
  employees: 'employee-management',
  queues: 'customer-queue-management',
  restaurant: 'point-of-sale',
  crm: 'marketing-analytics',
  finance: 'financial-management',
  reports: 'financial-management',
  mobile: 'point-of-sale',
};

export function getProductModuleImage(productId: string): ModuleImageSet | undefined {
  const slug = PRODUCT_ID_TO_SLUG[productId];
  return slug ? MODULE_IMAGE_REGISTRY[slug] : undefined;
}

/** Map market feature titles (FR) to module slugs for localized pages */
const FEATURE_TITLE_SLUGS: Record<string, MarketModuleSlug> = {
  'caisse (pos) rapide': 'point-of-sale',
  'inventaire & stock': 'inventory-management',
  'clients & fidélité': 'marketing-analytics',
  'employés & permissions': 'employee-management',
  "rendez-vous & file d'attente": 'customer-queue-management',
  'comptabilité & rapports': 'financial-management',
};

export function getFeatureModuleSlug(title: string): MarketModuleSlug | undefined {
  return FEATURE_TITLE_SLUGS[title.toLowerCase().trim()];
}

/** Curated highlights for homepage module bento grid */
export const HOMEPAGE_MODULE_HIGHLIGHTS: MarketModuleSlug[] = [
  'point-of-sale',
  'inventory-management',
  'financial-management',
  'employee-management',
  'online-store',
  'marketing-analytics',
];
