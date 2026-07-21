import type { MarketModuleSlug } from '@/data/markets/market-modules';

export interface ModuleImageSet {
  hero: string;
  alt: string;
  gallery: string[];
}

const P = '/images/modules';

const MODULE_IMAGE_REGISTRY: Record<MarketModuleSlug, ModuleImageSet> = {
  'point-of-sale': {
    hero: `${P}/pos/zyvo-pos-checkout-main-interface.png`,
    alt: 'ZYVO POS software — point of sale checkout interface with product catalog and payment screen',
    gallery: [
      `${P}/pos/zyvo-pos-checkout-main-interface.png`,
      `${P}/pos/zyvo-pos-product-catalog-grid.png`,
      `${P}/pos/zyvo-pos-favorite-products-shortcut.png`,
      `${P}/pos/zyvo-pos-customer-lookup-screen.png`,
      `${P}/pos/zyvo-pos-orders-panel-active.png`,
      `${P}/pos/zyvo-pos-payment-checkout-screen.png`,
      `${P}/pos/zyvo-pos-cash-register-list.png`,
      `${P}/pos/zyvo-pos-pin-security-lock-screen.png`,
      `${P}/pos/zyvo-pos-orders-history-list.png`,
      `${P}/pos/zyvo-pos-daily-operations-dashboard.png`,
      `${P}/pos/zyvo-pos-sales-report-analytics.png`,
    ],
  },
  'inventory-management': {
    hero: `${P}/stock-management/zyvo-inventory-stock-summary-dashboard.png`,
    alt: 'ZYVO inventory management — real-time stock summary dashboard for retail and wholesale',
    gallery: [
      `${P}/stock-management/zyvo-inventory-stock-summary-dashboard.png`,
      `${P}/stock-management/zyvo-inventory-product-articles-list.png`,
      `${P}/stock-management/zyvo-inventory-stock-transfers-between-stores.png`,
      `${P}/stock-management/zyvo-inventory-stock-movements-tracking.png`,
      `${P}/stock-management/zyvo-inventory-composite-products-bundles.png`,
      `${P}/stock-management/zyvo-inventory-product-variants-options.png`,
      `${P}/stock-management/zyvo-inventory-movements-log-history.png`,
    ],
  },
  'employee-management': {
    hero: `${P}/employee/zyvo-hr-employee-management-team.png`,
    alt: 'ZYVO HR module — employee management, roles and team permissions for SMEs',
    gallery: [
      `${P}/employee/zyvo-hr-employee-management-team.png`,
      `${P}/employee/zyvo-hr-employee-time-attendance.png`,
      `${P}/employee/zyvo-hr-employee-departments-organisation.png`,
    ],
  },
  logistics: {
    hero: `${P}/stock-management/zyvo-inventory-stock-transfers-between-stores.png`,
    alt: 'ZYVO logistics module — stock transfers between stores and delivery tracking',
    gallery: [
      `${P}/stock-management/zyvo-inventory-stock-transfers-between-stores.png`,
      `${P}/stock-management/zyvo-inventory-stock-movements-tracking.png`,
      `${P}/stock-management/zyvo-inventory-movements-log-history.png`,
    ],
  },
  scheduling: {
    hero: `${P}/appointment/zyvo-appointment-scheduling-calendar.png`,
    alt: 'ZYVO appointment scheduling — online calendar, staff planning and booking management',
    gallery: [
      `${P}/appointment/zyvo-appointment-scheduling-calendar.png`,
    ],
  },
  'customer-queue-management': {
    hero: `${P}/appointment/zyvo-appointment-scheduling-calendar.png`,
    alt: 'ZYVO customer queue management — appointment scheduling and walk-in queue for salons',
    gallery: [
      `${P}/appointment/zyvo-appointment-scheduling-calendar.png`,
    ],
  },
  'marketing-analytics': {
    hero: `${P}/marketing/zyvo-marketing-google-ads-integration.png`,
    alt: 'ZYVO marketing analytics — Google Ads integration and campaign performance dashboard',
    gallery: [
      `${P}/marketing/zyvo-marketing-google-ads-integration.png`,
      `${P}/marketing/zyvo-marketing-meta-facebook-instagram.png`,
      `${P}/marketing/zyvo-marketing-email-campaigns-automation.png`,
    ],
  },
  'online-store': {
    hero: `${P}/virtual-store/zyvo-virtual-store-public-orders-catalog.png`,
    alt: 'ZYVO virtual store — online shop catalog with public orders and e-commerce for African SMEs',
    gallery: [
      `${P}/virtual-store/zyvo-virtual-store-public-orders-catalog.png`,
      `${P}/virtual-store/zyvo-virtual-store-cj-dropshipping-integration.png`,
      `${P}/virtual-store/zyvo-virtual-store-aliexpress-dropshipping.png`,
      `${P}/virtual-store/mobile/zyvo-virtual-store-mobile-home-page.jpeg`,
      `${P}/virtual-store/mobile/zyvo-virtual-store-mobile-product-page.jpeg`,
      `${P}/virtual-store/mobile/zyvo-virtual-store-mobile-cart-page.jpeg`,
      `${P}/virtual-store/mobile/zyvo-virtual-store-mobile-checkout-page.jpeg`,
    ],
  },
  'financial-management': {
    hero: `${P}/finance/zyvo-finance-dashboard-overview.png`,
    alt: 'ZYVO financial management — business dashboard with revenue, expenses and cash flow reports',
    gallery: [
      `${P}/finance/zyvo-finance-dashboard-overview.png`,
      `${P}/finance/zyvo-finance-billing-report-summary.png`,
      `${P}/finance/zyvo-finance-pos-sales-report.png`,
    ],
  },
  invoicing: {
    hero: `${P}/invoicing/zyvo-invoicing-billing-payments-tracking.png`,
    alt: 'ZYVO invoicing software — billing, payments tracking and VAT-compliant invoices for SMEs',
    gallery: [
      `${P}/invoicing/zyvo-invoicing-billing-payments-tracking.png`,
      `${P}/invoicing/zyvo-invoicing-billing-report-summary.png`,
      `${P}/invoicing/zyvo-invoicing-credit-notes-refunds.png`,
      `${P}/invoicing/zyvo-invoicing-installment-payment-plans.png`,
      `${P}/invoicing/zyvo-invoicing-billing-notes-documents.png`,
    ],
  },
  purchasing: {
    hero: `${P}/purchases/zyvo-purchasing-orders-payments-tracking.png`,
    alt: 'ZYVO purchasing module — supplier orders, procurement and payment tracking',
    gallery: [
      `${P}/purchases/zyvo-purchasing-orders-payments-tracking.png`,
      `${P}/purchases/zyvo-purchasing-billing-report-summary.png`,
    ],
  },
};

/** Homepage hero — flagship POS screenshot */
export const HOMEPAGE_HERO_IMAGE = MODULE_IMAGE_REGISTRY['point-of-sale'].hero;
export const HOMEPAGE_HERO_ALT =
  'ZYVO ERP point of sale software — fast checkout, product catalog and mobile payments for SMEs';

export const INTEGRATIONS_HERO_IMAGE = `${P}/marketing/zyvo-marketing-meta-facebook-instagram.png`;
export const INTEGRATIONS_HERO_ALT =
  'ZYVO integrations — Meta Facebook Instagram WhatsApp Business marketing platform';

/** Virtual store mobile — for mobile product showcase */
export const MOBILE_APP_HERO_IMAGE = `${P}/virtual-store/mobile/zyvo-virtual-store-mobile-home-page.jpeg`;
export const MOBILE_APP_HERO_ALT =
  'ZYVO mobile app — virtual store home page on smartphone for e-commerce shopping';

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
const PRODUCT_ID_TO_SLUG: Record<string, MarketModuleSlug | 'mobile-app'> = {
  pos: 'point-of-sale',
  inventory: 'inventory-management',
  employees: 'employee-management',
  queues: 'customer-queue-management',
  restaurant: 'point-of-sale',
  crm: 'marketing-analytics',
  finance: 'financial-management',
  reports: 'financial-management',
  mobile: 'mobile-app',
};

export function getProductModuleImage(productId: string): ModuleImageSet | undefined {
  const mapping = PRODUCT_ID_TO_SLUG[productId];
  if (mapping === 'mobile-app') {
    return {
      hero: MOBILE_APP_HERO_IMAGE,
      alt: MOBILE_APP_HERO_ALT,
      gallery: [
        MOBILE_APP_HERO_IMAGE,
        `${P}/virtual-store/mobile/zyvo-virtual-store-mobile-product-page.jpeg`,
        `${P}/virtual-store/mobile/zyvo-virtual-store-mobile-cart-page.jpeg`,
        `${P}/virtual-store/mobile/zyvo-virtual-store-mobile-checkout-page.jpeg`,
      ],
    };
  }
  return mapping ? MODULE_IMAGE_REGISTRY[mapping] : undefined;
}

/** Map market feature titles (FR) to module slugs for localized pages */
const FEATURE_TITLE_SLUGS: Record<string, MarketModuleSlug> = {
  'caisse (pos) rapide': 'point-of-sale',
  'inventaire & stock': 'inventory-management',
  'clients & fidélité': 'marketing-analytics',
  'employés & permissions': 'employee-management',
  "rendez-vous & file d'attente": 'scheduling',
  'comptabilité & rapports': 'financial-management',
};

export function getFeatureModuleSlug(title: string): MarketModuleSlug | undefined {
  return FEATURE_TITLE_SLUGS[title.toLowerCase().trim()];
}

/** Curated highlights for homepage module bento grid */
export const HOMEPAGE_MODULE_HIGHLIGHTS: MarketModuleSlug[] = [
  'point-of-sale',
  'online-store',
  'inventory-management',
  'scheduling',
  'financial-management',
  'marketing-analytics',
];
