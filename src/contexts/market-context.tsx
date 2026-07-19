'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import type { MarketCode, MarketConfig } from '@/lib/markets/types';
import { getMarket, getRoutableMarkets } from '@/lib/markets/registry';
import { localizedPath, parseMarketFromPathname } from '@/lib/markets/routing';

interface MarketContextValue {
  market: MarketConfig;
  marketCode: MarketCode;
  isDefaultMarket: boolean;
  localizedHref: (path: string) => string;
  availableMarkets: MarketConfig[];
}

const MarketContext = createContext<MarketContextValue | undefined>(undefined);

export function MarketProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const marketCode = parseMarketFromPathname(pathname);
  const market = getMarket(marketCode);

  useEffect(() => {
    document.documentElement.lang = market.language;
  }, [market.language]);

  const localizedHref = useCallback(
    (path: string) => localizedPath(path, marketCode),
    [marketCode]
  );

  const value = useMemo(
    () => ({
      market,
      marketCode,
      isDefaultMarket: marketCode === 'us',
      localizedHref,
      availableMarkets: getRoutableMarkets(),
    }),
    [market, marketCode, localizedHref]
  );

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket(): MarketContextValue {
  const context = useContext(MarketContext);
  if (!context) {
    const market = getMarket('us');
    return {
      market,
      marketCode: 'us',
      isDefaultMarket: true,
      localizedHref: (path: string) => localizedPath(path, 'us'),
      availableMarkets: getRoutableMarkets(),
    };
  }
  return context;
}
