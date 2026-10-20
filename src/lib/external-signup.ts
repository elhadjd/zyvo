import type { MarketCode } from '@/lib/markets/types';
import { getMarket } from '@/lib/markets/registry';

export const EXTERNAL_SIGNUP_BASE_URL = 'https://app.zyvoerp.com/getting-started';

export function buildExternalSignupUrl(countryName: string): string {
  const url = new URL(EXTERNAL_SIGNUP_BASE_URL);
  url.searchParams.set('country', countryName);
  return url.toString();
}

export function getExternalSignupUrlForMarket(marketCode: MarketCode): string {
  const market = getMarket(marketCode);
  return buildExternalSignupUrl(market.countryName);
}
