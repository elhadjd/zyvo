import type { MarketCode } from '@/lib/markets/types';
import type { GnSeoPageMeta } from '@/data/markets/gn-seo';
import { getInvoiceConfig, isInvoiceSlug } from '@/data/invoice-generator/config';

const COUNTRY_INVOICE_SEO: Record<
  'sn' | 'gn' | 'ci',
  { title: string; description: string; keywords: string; h1: string }
> = {
  sn: {
    title: 'Facture gratuite en ligne Sénégal — logiciel facturation TVA 18% Dakar | ZYVO',
    description:
      'Créez des factures professionnelles gratuitement au Sénégal. TVA 18%, NINEA, lignes d\'articles, impression facture et reçu. 100 % gratuit, sans inscription — vos données ne sont jamais stockées sur nos serveurs.',
    keywords:
      'logiciel facturation gratuit Sénégal, créer facture gratuitement Dakar, facture en ligne gratuite Sénégal, générateur facture TVA 18%, modèle facture FCFA gratuit, facture proforma Sénégal, imprimer facture Dakar, reçu paiement gratuit, facturation PME Sénégal, outil facture sans inscription, facture NINEA Sénégal',
    h1: 'Facture gratuite en ligne — Sénégal',
  },
  gn: {
    title: 'Facture gratuite en ligne Guinée — logiciel facturation TVA 18% Conakry | ZYVO',
    description:
      'Créez des factures professionnelles gratuitement en Guinée. TVA 18%, NIF, lignes d\'articles, impression facture et reçu. 100 % gratuit, sans inscription — données 100 % privées dans votre navigateur.',
    keywords:
      'logiciel facturation gratuit Guinée, créer facture gratuitement Conakry, facture en ligne gratuite Guinée, générateur facture TVA GNF, modèle facture gratuit Guinée, imprimer facture Conakry, reçu paiement gratuit, facturation PME Guinée, outil facture sans inscription',
    h1: 'Facture gratuite en ligne — Guinée',
  },
  ci: {
    title: "Facture gratuite en ligne Côte d'Ivoire — logiciel facturation TVA 18% Abidjan | ZYVO",
    description:
      "Créez des factures professionnelles gratuitement en Côte d'Ivoire. TVA 18%, NCC, lignes d'articles, impression facture et reçu. 100 % gratuit, sans inscription — aucune donnée stockée sur nos serveurs.",
    keywords:
      "logiciel facturation gratuit Côte d'Ivoire, créer facture gratuitement Abidjan, facture en ligne gratuite CI, générateur facture TVA FCFA, modèle facture gratuit Côte d'Ivoire, imprimer facture Abidjan, reçu paiement gratuit, facturation PME CI, outil facture sans inscription, facture NCC",
    h1: "Facture gratuite en ligne — Côte d'Ivoire",
  },
};

export const US_INVOICE_SEO: GnSeoPageMeta = {
  title: 'Free Invoice Generator — Create & Print Invoices Online | ZYVO',
  description:
    'Create professional invoices for free. Line items, sales tax, print invoice and payment receipt. 100% free, no signup — your data is never stored on our servers.',
  keywords:
    'free invoice generator, create invoice online free, invoice maker USA, free billing software, print invoice free, payment receipt generator, small business invoice template, invoice generator no signup, free invoicing tool, sales tax invoice',
  path: '/tools/free-invoice-generator',
  h1: 'Free Invoice Generator — USA',
  breadcrumb: 'Free Invoice Generator',
  schemaType: 'service',
};

export function getInvoiceToolsSeo(marketCode: MarketCode, slug: string[]): GnSeoPageMeta | null {
  if (slug.length !== 2) return null;
  if (!isInvoiceSlug(marketCode, slug[1])) return null;

  const config = getInvoiceConfig(marketCode);
  const prefix = config.toolsBasePath;

  if (marketCode === 'sn' || marketCode === 'gn' || marketCode === 'ci') {
    const seo = COUNTRY_INVOICE_SEO[marketCode];
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      path: `${prefix}/${slug[1]}`,
      h1: seo.h1,
      breadcrumb: config.title,
      schemaType: 'service',
    };
  }

  return null;
}

export function getUsInvoiceSeo(): GnSeoPageMeta {
  return US_INVOICE_SEO;
}
