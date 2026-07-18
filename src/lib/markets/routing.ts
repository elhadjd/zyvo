import type { MarketCode } from './types';
import { getMarket, isValidMarketCode, MARKET_CODES } from './registry';

const RESERVED_ROOT_SEGMENTS = new Set([
  'api',
  'blog',
  'features',
  'pricing',
  'security',
  'demo',
  'faq',
  'about',
  'contact',
  'solutions',
  'industries',
  'development-services',
  'custom-website-development',
  'custom-software-development',
  'website-maintenance-services',
  'getting-started',
  'integrations',
  'help-center',
  'privacy-policy',
  'terms-of-service',
  'refund-policy',
  'cookie-policy',
  'salon-management-software',
  'barbershop-management-software',
  'restaurant-pos-system',
  'retail-management-software',
  'clinic-management-software',
  'pharmacy-management-software',
  '_next',
]);

export function parseMarketFromPathname(pathname: string): MarketCode {
  const segment = pathname.split('/').filter(Boolean)[0]?.toLowerCase();
  if (segment && isValidMarketCode(segment) && segment !== 'us') {
    return segment as MarketCode;
  }
  return 'us';
}

export function isCountryRouteSegment(segment: string): boolean {
  return MARKET_CODES.includes(segment as MarketCode) && segment !== 'us';
}

export function isReservedRootSegment(segment: string): boolean {
  return RESERVED_ROOT_SEGMENTS.has(segment);
}

const GLOBAL_PATH_PREFIXES = [
  '/blog',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
  '/cookie-policy',
  '/getting-started',
  '/development-services',
  '/custom-website-development',
  '/custom-software-development',
  '/website-maintenance-services',
  '/help-center',
  '/integrations',
  '/security',
];

function isGlobalPath(path: string): boolean {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return GLOBAL_PATH_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`)
  );
}

export function localizedPath(path: string, marketCode: MarketCode = 'us'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;

  if (isGlobalPath(normalized)) {
    return normalized;
  }

  if (normalized === '/') {
    const market = getMarket(marketCode);
    return market.routePrefix ?? '/';
  }

  const market = getMarket(marketCode);
  if (!market.routePrefix) {
    return normalized;
  }

  if (normalized.startsWith(market.routePrefix)) {
    return normalized;
  }

  return `${market.routePrefix}${normalized}`;
}

export function stripMarketPrefix(pathname: string): { market: MarketCode; path: string } {
  const market = parseMarketFromPathname(pathname);
  const marketConfig = getMarket(market);

  if (!marketConfig.routePrefix) {
    return { market: 'us', path: pathname || '/' };
  }

  if (pathname === marketConfig.routePrefix) {
    return { market, path: '/' };
  }

  if (pathname.startsWith(`${marketConfig.routePrefix}/`)) {
    return { market, path: pathname.slice(marketConfig.routePrefix.length) || '/' };
  }

  return { market: 'us', path: pathname || '/' };
}

export function getMarketBasePath(marketCode: MarketCode): string {
  return getMarket(marketCode).routePrefix ?? '/';
}
