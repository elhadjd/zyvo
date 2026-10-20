import { NextResponse } from 'next/server';
import { buildExternalSignupUrl } from '@/lib/external-signup';
import type { MarketCode } from '@/lib/markets/types';
import { getMarket } from '@/lib/markets/registry';

function resolveMarketCode(body: Record<string, unknown>): MarketCode {
  const market = body.market ?? body.country;
  if (typeof market === 'string') {
    const code = market.toLowerCase();
    if (code === 'gn' || code === 'sn' || code === 'ci' || code === 'ao' || code === 'us') {
      return code;
    }
  }
  const country = body.country;
  if (country && typeof country === 'object' && !Array.isArray(country)) {
    const code = (country as Record<string, unknown>).code;
    if (typeof code === 'string') {
      const normalized = code.toLowerCase();
      if (normalized === 'gn' || normalized === 'sn' || normalized === 'ci' || normalized === 'ao') {
        return normalized;
      }
    }
  }
  return 'us';
}

/** Signup is handled on app.zyvoerp.com — this route only returns the external URL. */
export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  const marketCode = resolveMarketCode(body);
  const market = getMarket(marketCode);
  const redirectUrl = buildExternalSignupUrl(market.countryName);

  return NextResponse.json(
    {
      success: true,
      redirect: redirectUrl,
      link: redirectUrl,
      message: 'Redirect to ZYVO app signup',
    },
    { status: 200 }
  );
}
