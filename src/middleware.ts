import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getMarket } from '@/lib/markets/registry';
import { parseMarketFromPathname } from '@/lib/markets/routing';
import { buildExternalSignupUrl } from '@/lib/external-signup';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isGettingStarted =
    pathname === '/getting-started' ||
    /^\/(gn|sn|ci|ao)\/getting-started\/?$/.test(pathname);

  if (!isGettingStarted) {
    return NextResponse.next();
  }

  const marketCode = parseMarketFromPathname(pathname);
  const market = getMarket(marketCode);
  const destination = buildExternalSignupUrl(market.countryName);

  return NextResponse.redirect(destination);
}

export const config = {
  matcher: [
    '/getting-started',
    '/gn/getting-started',
    '/sn/getting-started',
    '/ci/getting-started',
    '/ao/getting-started',
  ],
};
