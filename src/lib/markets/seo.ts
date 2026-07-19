import type { MarketCode } from '@/lib/markets/types';
import { getGnPageSeo, getGnSeoPath } from '@/data/markets/gn-seo';
import { getSnPageSeo } from '@/data/markets/sn-seo';
import type { GnSeoPageMeta } from '@/data/markets/gn-seo';
import { GN_HOME_SEO_CONTENT } from '@/data/markets/gn-seo';
import { SN_HOME_SEO_CONTENT } from '@/data/markets/sn-seo';

export type MarketSeoPageMeta = GnSeoPageMeta;

export function getMarketPageSeo(marketCode: MarketCode, slug: string[]): MarketSeoPageMeta | null {
  if (marketCode === 'gn') return getGnPageSeo(slug);
  if (marketCode === 'sn') return getSnPageSeo(slug);
  return null;
}

export function getMarketSeoPath(slug: string[]): string {
  return getGnSeoPath(slug);
}

export function getMarketHomeSeoContent(marketCode: MarketCode) {
  if (marketCode === 'sn') return SN_HOME_SEO_CONTENT;
  return GN_HOME_SEO_CONTENT;
}

export function getMarketPricingLinkLabel(marketCode: MarketCode): string {
  if (marketCode === 'sn') return 'Voir les tarifs en FCFA →';
  return 'Voir les tarifs en GNF →';
}

export function getMarketInternalLinkGroups(marketCode: MarketCode) {
  const blogSlug =
    marketCode === 'sn'
      ? 'choisir-logiciel-gestion-entreprise-senegal'
      : 'choisir-logiciel-gestion-entreprise-guinee';
  const paymentSlug =
    marketCode === 'sn' ? 'wave-orange-money-caisse-pos-dakar' : 'orange-money-caisse-pos-conakry';
  const accountingSlug =
    marketCode === 'sn'
      ? 'syscohada-tva-dgi-digitaliser-comptabilite-senegal'
      : 'syscohada-tva-dgi-digitaliser-comptabilite-guinee';
  const sectorLabel = marketCode === 'sn' ? 'Secteurs au Sénégal' : 'Secteurs en Guinée';

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
      title: sectorLabel,
      paths: [
        'industries/retail',
        'industries/restaurants',
        'industries/salons',
        'industries/pharmacies',
      ],
    },
    {
      title: 'Blog & ressources',
      paths: ['blog', `blog/${blogSlug}`, `blog/${paymentSlug}`, `blog/${accountingSlug}`],
    },
    {
      title: 'Découvrir ZYVO',
      paths: ['features', 'pricing', 'faq', 'demo', 'contact'],
    },
  ] as const;
}
