import { notFound } from 'next/navigation';
import type { MarketCode } from '@/lib/markets/types';
import { getMarket, isValidMarketCode } from '@/lib/markets/registry';

export default async function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;

  if (!isValidMarketCode(country) || country === 'us') {
    notFound();
  }

  const market = getMarket(country as MarketCode);

  if (!market.active || market.comingSoon) {
    notFound();
  }

  return children;
}
