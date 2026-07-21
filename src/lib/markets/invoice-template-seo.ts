import type { MarketCode } from '@/lib/markets/types';
import type { GnSeoPageMeta } from '@/data/markets/gn-seo';
import { getTemplateLibraryConfig, isTemplateLibrarySlug } from '@/data/invoice-templates/config';

const COUNTRY_SEO: Record<'sn' | 'gn' | 'ci', { title: string; description: string; keywords: string; h1: string }> = {
  sn: {
    title: 'Modèles facture et reçu gratuits Sénégal — 24 templates professionnels | ZYVO',
    description:
      'Bibliothèque de 24 modèles de factures et reçus gratuits au Sénégal. Téléchargez en HTML, TVA 18 %, formats retail, restaurant, freelance, SYSCOHADA. Sans inscription.',
    keywords:
      'modèle facture gratuit Sénégal, template facture Dakar, modèle reçu gratuit, facture proforma Sénégal, bon de livraison modèle, facture TVA 18% FCFA, modèle facture PME, template facture HTML gratuit, modèle reçu paiement Wave, facture SYSCOHADA Sénégal, bibliothèque modèles facture',
    h1: 'Modèles de factures et reçus gratuits — Sénégal',
  },
  gn: {
    title: 'Modèles facture et reçu gratuits Guinée — 24 templates professionnels | ZYVO',
    description:
      'Bibliothèque de 24 modèles de factures et reçus gratuits en Guinée. Téléchargez en HTML, TVA 18 %, formats commerce, restaurant, freelance. Sans inscription.',
    keywords:
      'modèle facture gratuit Guinée, template facture Conakry, modèle reçu gratuit GNF, facture proforma Guinée, modèle facture TVA 18%, template facture PME Guinée, bibliothèque modèles facture Guinée',
    h1: 'Modèles de factures et reçus gratuits — Guinée',
  },
  ci: {
    title: "Modèles facture et reçu gratuits Côte d'Ivoire — 24 templates | ZYVO",
    description:
      "Bibliothèque de 24 modèles de factures et reçus gratuits en Côte d'Ivoire. Téléchargez en HTML, TVA 18 %, formats pro. Sans inscription.",
    keywords:
      "modèle facture gratuit Côte d'Ivoire, template facture Abidjan, modèle reçu gratuit FCFA, facture proforma CI, modèle facture TVA, bibliothèque modèles facture Côte d'Ivoire",
    h1: "Modèles de factures et reçus gratuits — Côte d'Ivoire",
  },
};

export const US_TEMPLATE_LIBRARY_SEO: GnSeoPageMeta = {
  title: 'Free Invoice & Receipt Templates — 24 Professional Designs | ZYVO',
  description:
    'Download 24 free professional invoice and receipt templates. HTML format, print-ready. Invoices, proforma, delivery notes, credit notes — no signup.',
  keywords:
    'free invoice template, receipt template free download, invoice template library, professional invoice design, HTML invoice template, free billing template USA, invoice receipt templates download, small business invoice template free',
  path: '/tools/invoice-receipt-templates',
  h1: 'Free Invoice & Receipt Templates',
  breadcrumb: 'Invoice Templates',
  schemaType: 'service',
};

export function getTemplateLibrarySeo(marketCode: MarketCode, slug: string[]): GnSeoPageMeta | null {
  if (slug.length !== 2) return null;
  if (!isTemplateLibrarySlug(marketCode, slug[1])) return null;

  const config = getTemplateLibraryConfig(marketCode);

  if (marketCode === 'sn' || marketCode === 'gn' || marketCode === 'ci') {
    const seo = COUNTRY_SEO[marketCode];
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      path: `${config.toolsBasePath}/${slug[1]}`,
      h1: seo.h1,
      breadcrumb: config.title,
      schemaType: 'service',
    };
  }

  return null;
}

export function getUsTemplateLibrarySeo(): GnSeoPageMeta {
  return US_TEMPLATE_LIBRARY_SEO;
}
