import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { MarketCode } from '@/lib/markets/types';
import { getMarket, isValidMarketCode } from '@/lib/markets/registry';
import { buildMarketMetadata } from '@/lib/markets/metadata';
import MarketLangSetter from '@/components/markets/MarketLangSetter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  if (!isValidMarketCode(country) || country === 'us') return {};
  return buildMarketMetadata(country as MarketCode, []);
}

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

  return (
    <>
      <MarketLangSetter language={market.language} />
      {children}
    </>
  );
}
