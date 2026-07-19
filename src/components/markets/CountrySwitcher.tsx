'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Globe } from 'lucide-react';
import { getMarket, getRoutableMarkets } from '@/lib/markets/registry';
import { stripMarketPrefix } from '@/lib/markets/routing';

export default function CountrySwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { market: currentMarket, path } = stripMarketPrefix(pathname);
  const markets = [{ ...getMarket('us'), routePrefix: '/' as string | null }, ...getRoutableMarkets()];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const buildHref = (marketCode: string, prefix: string | null) => {
    if (marketCode === 'us') {
      return path === '/' ? '/' : path;
    }
    if (path === '/') {
      return prefix ?? '/';
    }
    return `${prefix}${path}`;
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Changer de pays"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">{getMarket(currentMarket).flag}</span>
        <span className="hidden md:inline text-xs font-medium">
          {getMarket(currentMarket).code.toUpperCase()}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
          role="listbox"
        >
          {markets.map((market) => {
            const isActive = market.code === currentMarket;
            const href = buildHref(market.code, market.routePrefix);
            const isDisabled = market.comingSoon;

            if (isDisabled) {
              return (
                <div
                  key={market.code}
                  className="px-4 py-2.5 text-sm text-gray-400 dark:text-gray-500 flex items-center justify-between cursor-not-allowed"
                  role="option"
                  aria-disabled="true"
                >
                  <span>
                    {market.flag} {market.countryNameLocal}
                  </span>
                  <span className="text-xs">Bientôt</span>
                </div>
              );
            }

            return (
              <Link
                key={market.code}
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-brand-primary/10 text-brand-primary dark:text-brand-accent font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                role="option"
                aria-selected={isActive}
              >
                <span className="mr-2">{market.flag}</span>
                {market.countryNameLocal}
                <span className="text-xs text-gray-400 ml-1">({market.languageLabel})</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
