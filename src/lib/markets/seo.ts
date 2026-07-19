import type { MarketCode } from '@/lib/markets/types';
import { getGnPageSeo, getGnSeoPath } from '@/data/markets/gn-seo';
import { getSnPageSeo } from '@/data/markets/sn-seo';
import { getCiPageSeo } from '@/data/markets/ci-seo';
import type { GnSeoPageMeta } from '@/data/markets/gn-seo';
import { GN_HOME_SEO_CONTENT } from '@/data/markets/gn-seo';
import { SN_HOME_SEO_CONTENT } from '@/data/markets/sn-seo';
import { CI_HOME_SEO_CONTENT } from '@/data/markets/ci-seo';

export type MarketSeoPageMeta = GnSeoPageMeta;

export function getMarketPageSeo(marketCode: MarketCode, slug: string[]): MarketSeoPageMeta | null {
  if (marketCode === 'gn') return getGnPageSeo(slug);
  if (marketCode === 'sn') return getSnPageSeo(slug);
  if (marketCode === 'ci') return getCiPageSeo(slug);
  return null;
}

export function getMarketSeoPath(slug: string[]): string {
  return getGnSeoPath(slug);
}

export function getMarketHomeSeoContent(marketCode: MarketCode) {
  if (marketCode === 'sn') return SN_HOME_SEO_CONTENT;
  if (marketCode === 'ci') return CI_HOME_SEO_CONTENT;
  return GN_HOME_SEO_CONTENT;
}

export function getMarketPricingLinkLabel(marketCode: MarketCode): string {
  if (marketCode === 'gn') return 'Voir les tarifs en GNF →';
  return 'Voir les tarifs en FCFA →';
}

const BLOG_SLUGS: Record<string, { guide: string; payment: string; accounting: string; sectorLabel: string }> = {
  gn: {
    guide: 'choisir-logiciel-gestion-entreprise-guinee',
    payment: 'orange-money-caisse-pos-conakry',
    accounting: 'syscohada-tva-dgi-digitaliser-comptabilite-guinee',
    sectorLabel: 'Secteurs en Guinée',
  },
  sn: {
    guide: 'choisir-logiciel-gestion-entreprise-senegal',
    payment: 'wave-orange-money-caisse-pos-dakar',
    accounting: 'syscohada-tva-dgi-digitaliser-comptabilite-senegal',
    sectorLabel: 'Secteurs au Sénégal',
  },
  ci: {
    guide: 'choisir-logiciel-gestion-entreprise-cote-ivoire',
    payment: 'wave-orange-money-caisse-pos-abidjan',
    accounting: 'syscohada-tva-dgi-digitaliser-comptabilite-cote-ivoire',
    sectorLabel: 'Secteurs en Côte d\'Ivoire',
  },
};

export function getMarketInternalLinkGroups(marketCode: MarketCode) {
  const slugs = BLOG_SLUGS[marketCode] ?? BLOG_SLUGS.gn;

  return [
    {
      title: 'Modules ERP',
      paths: [
        'solutions/point-of-sale',
        'solutions/inventory-management',
        'solutions/invoicing',
        'solutions/employee-management',
        'solutions/logistics',
        'solutions/online-store',
      ],
    },
    {
      title: slugs.sectorLabel,
      paths: [
        'industries/retail',
        'industries/restaurants',
        'industries/salons',
        'industries/pharmacies',
      ],
    },
    {
      title: 'Blog & ressources',
      paths: ['blog', `blog/${slugs.guide}`, `blog/${slugs.payment}`, `blog/${slugs.accounting}`],
    },
    {
      title: 'Découvrir ZYVO',
      paths: ['features', 'pricing', 'faq', 'demo', 'contact'],
    },
  ] as const;
}
