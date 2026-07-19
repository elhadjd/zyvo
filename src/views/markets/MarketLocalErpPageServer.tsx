import { notFound } from 'next/navigation';
import { buildLocalErpPage } from '@/data/markets/local-erp-pages';
import type { MarketCode } from '@/lib/markets/types';
import MarketLocalErpPage from '@/views/markets/MarketLocalErpPage';

interface Props {
  countryCode?: string;
  industry?: string;
  city?: string;
}

export default function MarketLocalErpPageServer({ countryCode, industry, city }: Props) {
  if (!countryCode || !industry || !city) {
    notFound();
  }

  const page = buildLocalErpPage(countryCode as MarketCode, industry, city);
  if (!page) {
    notFound();
  }

  return <MarketLocalErpPage page={page} marketCode={countryCode as MarketCode} />;
}
