import type { MarketCode, MarketConfig } from '@/lib/markets/types';
import { gnMarket } from '@/data/markets/gn';
import { snMarket } from '@/data/markets/sn';
import { ciMarket } from '@/data/markets/ci';
import { usMarket } from '@/data/markets/us';

export const MARKET_CODES: MarketCode[] = ['us', 'gn', 'sn', 'ci', 'ao'];

const markets: Record<MarketCode, MarketConfig> = {
  us: usMarket,
  gn: gnMarket,
  sn: snMarket,
  ci: ciMarket,
  ao: {
    ...gnMarket,
    code: 'ao',
    countryName: 'Angola',
    countryNameLocal: 'Angola',
    flag: '🇦🇴',
    locale: 'pt_AO',
    hreflang: 'pt-AO',
    language: 'pt',
    languageLabel: 'Português',
    routePrefix: '/ao',
    active: false,
    comingSoon: true,
    contact: {
      ...gnMarket.contact,
      phone: '+244 923 000 000',
      address: { street: 'Luanda', city: 'Luanda', country: 'AO' },
    },
    signup: {
      language: 'pt',
      country: { id: 6, name: 'Angola', code: 'ao' },
      currency: { code: 'AOA', currency: 'Angolan Kwanza', digits: 2, number: 973 },
    },
    pages: {},
    navigation: [],
  },
};

export function getMarket(code: MarketCode = 'us'): MarketConfig {
  return markets[code] ?? markets.us;
}

export function isValidMarketCode(code: string): code is MarketCode {
  return MARKET_CODES.includes(code as MarketCode);
}

export function getActiveMarkets(): MarketConfig[] {
  return MARKET_CODES.map((code) => markets[code]).filter((m) => m.active);
}

export function getRoutableMarkets(): MarketConfig[] {
  return MARKET_CODES.map((code) => markets[code]).filter(
    (m) => m.active && m.routePrefix && m.code !== 'us'
  );
}

export function getMarketAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {
    'en-US': path === '/' ? '/' : path,
  };

  for (const market of getRoutableMarkets()) {
    if (market.comingSoon) continue;
    const localized =
      path === '/'
        ? (market.routePrefix ?? '/')
        : `${market.routePrefix}${path.startsWith('/') ? path : `/${path}`}`;
    alternates[market.hreflang] = localized;
  }

  return alternates;
}
