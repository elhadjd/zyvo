import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import type { MarketCode } from '@/lib/markets/types';
import { getMarket, getMarketAlternates } from '@/lib/markets/registry';
import { stripMarketPrefix } from '@/lib/markets/routing';
import { SITE_NAME, SITE_URL } from '@/data/site';

export function buildMarketMetadata(
  marketCode: MarketCode,
  pageKey: string,
  fallback?: { title: string; description: string; keywords?: string; path: string }
): Metadata {
  const market = getMarket(marketCode);
  const page = market.pages[pageKey] ?? fallback;

  if (!page) {
    return buildMetadata({
      title: market.tagline,
      description: market.description,
      canonical: market.routePrefix ?? '/',
    });
  }

  const base = buildMetadata({
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    canonical: page.path,
    locale: market.locale,
  });

  const { path } = stripMarketPrefix(page.path);

  return {
    ...base,
    alternates: {
      canonical: `${SITE_URL}${page.path}`,
      languages: getMarketAlternates(path),
    },
  };
}

export function buildMarketHomeMetadata(marketCode: MarketCode): Metadata {
  const market = getMarket(marketCode);
  const page = market.pages.home;

  return {
    ...buildMarketMetadata(marketCode, 'home', {
      title: `${SITE_NAME} ${market.countryNameLocal} — ${market.tagline}`,
      description: market.description,
      keywords: page?.keywords,
      path: market.routePrefix ?? '/',
    }),
    openGraph: {
      siteName: SITE_NAME,
      title: page?.title ?? market.tagline,
      description: page?.description ?? market.description,
      locale: market.locale,
      type: 'website',
      url: `${SITE_URL}${market.routePrefix ?? ''}`,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
  };
}
