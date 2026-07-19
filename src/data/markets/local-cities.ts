import type { MarketCode } from '@/lib/markets/types';

export interface LocalCity {
  slug: string;
  name: string;
  districts?: string[];
}

/** Villes ciblées pour pages ERP locales (SEO longue traîne) */
export const MARKET_LOCAL_CITIES: Partial<Record<MarketCode, LocalCity[]>> = {
  gn: [
    { slug: 'conakry', name: 'Conakry', districts: ['Kaloum', 'Ratoma', 'Matam', 'Dixinn'] },
    { slug: 'kindia', name: 'Kindia' },
    { slug: 'labe', name: 'Labé' },
    { slug: 'kankan', name: 'Kankan' },
    { slug: 'nzerekore', name: 'Nzérékoré' },
  ],
  sn: [
    { slug: 'dakar', name: 'Dakar', districts: ['Plateau', 'Almadies', 'Pikine', 'Guédiawaye'] },
    { slug: 'thies', name: 'Thiès' },
    { slug: 'saint-louis', name: 'Saint-Louis' },
    { slug: 'mbour', name: 'Mbour' },
    { slug: 'touba', name: 'Touba' },
  ],
  ci: [
    { slug: 'abidjan', name: 'Abidjan', districts: ['Cocody', 'Plateau', 'Yopougon', 'Marcory', 'Treichville'] },
    { slug: 'bouake', name: 'Bouaké' },
    { slug: 'yamoussoukro', name: 'Yamoussoukro' },
    { slug: 'san-pedro', name: 'San-Pédro' },
    { slug: 'korhogo', name: 'Korhogo' },
  ],
};

export function getMarketLocalCities(marketCode: MarketCode): LocalCity[] {
  return MARKET_LOCAL_CITIES[marketCode] ?? [];
}

export function getLocalCity(marketCode: MarketCode, citySlug: string): LocalCity | undefined {
  return getMarketLocalCities(marketCode).find((c) => c.slug === citySlug);
}
