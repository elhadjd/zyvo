import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import type { MarketCode } from '@/lib/markets/types';
import { isValidMarketCode } from '@/lib/markets/registry';
import { resolveMarketPage, getAllMarketStaticParams } from '@/lib/markets/pages';
import { buildMarketMetadata } from '@/lib/markets/metadata';
import JsonLd from '@/components/JsonLd';
import { getMarketOrganizationSchema, getMarketSoftwareSchema, getFAQSchema } from '@/data/structured-data';
import { getMarket } from '@/lib/markets/registry';

interface CountryPageProps {
  params: Promise<{ country: string; slug?: string[] }>;
}

export async function generateStaticParams() {
  return getAllMarketStaticParams();
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country, slug = [] } = await params;

  if (!isValidMarketCode(country) || country === 'us') {
    return {};
  }

  const resolved = resolveMarketPage(country as MarketCode, slug);
  if (!resolved) return {};

  return buildMarketMetadata(country as MarketCode, resolved.pageKey);
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country, slug = [] } = await params;

  if (!isValidMarketCode(country) || country === 'us') {
    notFound();
  }

  const resolved = resolveMarketPage(country as MarketCode, slug);
  if (!resolved) {
    notFound();
  }

  const market = getMarket(country as MarketCode);
  const Page = resolved.component as ComponentType<{
    industryId?: string;
    solutionSlug?: string;
  }>;
  const pageProps = {
    industryId: resolved.params.industry,
    solutionSlug: resolved.params.solution,
  };

  const schemas =
    resolved.pageKey === 'home'
      ? [
          getMarketOrganizationSchema(market),
          getMarketSoftwareSchema(market),
          getFAQSchema(market.faqs),
        ]
      : resolved.pageKey === 'faq'
        ? [getFAQSchema(market.faqs)]
        : [];

  return (
    <>
      {schemas.length > 0 && <JsonLd data={schemas} />}
      <Page {...pageProps} />
    </>
  );
}
