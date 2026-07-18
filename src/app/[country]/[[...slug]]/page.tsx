import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import type { MarketCode } from '@/lib/markets/types';
import { isValidMarketCode, getMarket } from '@/lib/markets/registry';
import { resolveMarketPage, getAllMarketStaticParams } from '@/lib/markets/pages';
import { buildMarketMetadata, buildMarketBreadcrumbs } from '@/lib/markets/metadata';
import { getMarketPageSeo } from '@/lib/markets/seo';
import {
  getMergedMarketBlogPosts,
  getMergedMarketBlogPostBySlug,
} from '@/lib/markets/blog-server';
import JsonLd from '@/components/JsonLd';
import {
  getMarketOrganizationSchema,
  getMarketSoftwareSchema,
  getMarketWebSiteSchema,
  getMarketLocalBusinessSchema,
  getMarketOfferCatalogSchema,
  getMarketServiceSchema,
  getMarketArticleSchema,
  getFAQSchema,
  getBreadcrumbSchema,
} from '@/data/structured-data';
import { SITE_URL } from '@/data/site';

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

  return buildMarketMetadata(country as MarketCode, slug, resolved.pageKey);
}

function buildPageSchemas(marketCode: MarketCode, slug: string[], market: ReturnType<typeof getMarket>) {
  const pageSeo = getMarketPageSeo(marketCode, slug);
  const breadcrumbs = buildMarketBreadcrumbs(marketCode, slug);
  const schemas: object[] = [];

  if (slug.length === 0) {
    schemas.push(
      getMarketWebSiteSchema(market),
      getMarketOrganizationSchema(market),
      getMarketLocalBusinessSchema(market),
      getMarketSoftwareSchema(market),
      getFAQSchema(market.faqs)
    );
  } else if (slug[0] === 'pricing') {
    schemas.push(getMarketOfferCatalogSchema(market), getMarketSoftwareSchema(market));
  } else if (slug[0] === 'faq') {
    schemas.push(getFAQSchema(market.faqs));
  } else if (slug[0] === 'blog' && slug.length === 2) {
    const post = getMergedMarketBlogPostBySlug(marketCode, slug[1]);
    if (post) {
      schemas.push(
        getMarketArticleSchema(market, {
          title: post.title,
          description: post.metaDescription,
          author: post.author,
          date: post.date,
          slug: post.slug,
        })
      );
    }
  } else if (pageSeo && (slug[0] === 'solutions' || slug[0] === 'industries')) {
    schemas.push(
      getMarketServiceSchema(market, {
        name: pageSeo.h1 ?? pageSeo.title,
        description: pageSeo.description,
        url: `${SITE_URL}${pageSeo.path}`,
      })
    );
  }

  if (breadcrumbs.length > 1) {
    schemas.push(getBreadcrumbSchema(breadcrumbs));
  }

  return schemas;
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
    postSlug?: string;
    posts?: ReturnType<typeof getMergedMarketBlogPosts>;
    post?: ReturnType<typeof getMergedMarketBlogPostBySlug>;
  }>;

  const pageProps: Record<string, unknown> = {
    industryId: resolved.params.industry,
    solutionSlug: resolved.params.solution,
    postSlug: resolved.params.post,
  };

  if (slug[0] === 'blog' && slug.length === 1) {
    pageProps.posts = getMergedMarketBlogPosts(country as MarketCode);
  } else if (slug[0] === 'blog' && slug.length === 2 && resolved.params.post) {
    pageProps.post = getMergedMarketBlogPostBySlug(country as MarketCode, resolved.params.post);
  }

  const schemas = buildPageSchemas(country as MarketCode, slug, market);

  return (
    <>
      {schemas.length > 0 && <JsonLd data={schemas} />}
      <Page {...pageProps} />
    </>
  );
}
