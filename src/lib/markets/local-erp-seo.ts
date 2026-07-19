import type { MarketCode } from '@/lib/markets/types';
import { buildLocalErpPage } from '@/data/markets/local-erp-pages';

export function getLocalErpPageSeo(marketCode: MarketCode, industry: string, city: string) {
  const page = buildLocalErpPage(marketCode, industry, city);
  if (!page) return null;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    path: `/${marketCode}/erp/${industry}/${city}`,
    h1: page.headline,
    breadcrumb: page.cityName,
    schemaType: 'service' as const,
  };
}

export function isLocalErpSlug(slug: string[]): boolean {
  return slug[0] === 'erp' && slug.length === 3;
}
