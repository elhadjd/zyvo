import type { MarketCode } from '@/lib/markets/types';
import { getGnPageSeo, getGnSeoPath } from '@/data/markets/gn-seo';
import type { GnSeoPageMeta } from '@/data/markets/gn-seo';

export function getMarketPageSeo(marketCode: MarketCode, slug: string[]): GnSeoPageMeta | null {
  if (marketCode !== 'gn') return null;
  return getGnPageSeo(slug);
}

export function getMarketSeoPath(slug: string[]): string {
  return getGnSeoPath(slug);
}
