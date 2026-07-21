import type { MarketCode } from '@/lib/markets/types';

export function formatDevPrice(marketCode: MarketCode, amount: number): string {
  if (marketCode === 'us') {
    return `$${amount.toLocaleString('en-US')}`;
  }
  if (marketCode === 'gn') {
    return `${amount.toLocaleString('fr-GN')} FG`;
  }
  return `${amount.toLocaleString('fr-FR')} FCFA`;
}

export function formatDevPriceFrom(marketCode: MarketCode, amount: number): string {
  const prefix = marketCode === 'us' ? 'From ' : 'À partir de ';
  return `${prefix}${formatDevPrice(marketCode, amount)}`;
}
