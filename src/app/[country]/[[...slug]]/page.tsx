import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import type { MarketCode } from '@/lib/markets/types';
import { isValidMarketCode, getMarket } from '@/lib/markets/registry';
import { resolveMarketPage, getAllMarketStaticParams } from '@/lib/markets/pages';
import { buildMarketMetadata, buildMarketBreadcrumbs, buildMarketBlogPostMetadata } from '@/lib/markets/metadata';
import { getMarketPageSeo } from '@/lib/markets/seo';
import { isLocalErpSlug } from '@/lib/markets/local-erp-seo';
import { isPartnershipSlug } from '@/lib/partnerships/seo';
import { getPartnershipProgram } from '@/data/partnerships/content';
import { isPartnershipProgramSlug } from '@/data/partnerships/programs';
import { buildLocalErpPage } from '@/data/markets/local-erp-pages';
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

  if (slug[0] === 'blog' && slug.length === 2) {
    const post = getMergedMarketBlogPostBySlug(country as MarketCode, slug[1]);
    if (post) {
      return buildMarketBlogPostMetadata(country as MarketCode, post);
    }
  }

  const resolved = resolveMarketPage(country as MarketCode, slug);
  if (!resolved) return {};

  return buildMarketMetadata(country as MarketCode, slug, resolved.pageKey);
}

function buildPageSchemas(marketCode: MarketCode, slug: string[], market: ReturnType<typeof getMarket>) {
  const pageSeo = getMarketPageSeo(marketCode, slug);
  const blogPost =
    slug[0] === 'blog' && slug.length === 2
      ? getMergedMarketBlogPostBySlug(marketCode, slug[1])
      : undefined;
  const breadcrumbs = buildMarketBreadcrumbs(marketCode, slug, {
    blogPostTitle: blogPost?.title,
  });
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
    if (blogPost) {
      schemas.push(
        getMarketArticleSchema(market, {
          title: blogPost.title,
          description: blogPost.metaDescription,
          author: blogPost.author,
          date: blogPost.date,
          slug: blogPost.slug,
        })
      );
      if (blogPost.faq?.length) {
        schemas.push(getFAQSchema(blogPost.faq));
      }
    }
  } else if (slug[0] === 'blog' && slug.length === 1) {
    const posts = getMergedMarketBlogPosts(marketCode);
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `Blog ZYVO ${market.countryNameLocal}`,
      url: `${SITE_URL}${market.routePrefix}/blog`,
      description: 'Conseils gestion, caisse POS et digitalisation PME',
      blogPost: posts.slice(0, 10).map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${SITE_URL}${market.routePrefix}/blog/${p.slug}`,
        datePublished: p.date,
      })),
    });
  } else if (pageSeo && (slug[0] === 'solutions' || slug[0] === 'industries')) {
    schemas.push(
      getMarketServiceSchema(market, {
        name: pageSeo.h1 ?? pageSeo.title,
        description: pageSeo.description,
        url: `${SITE_URL}${pageSeo.path}`,
      })
    );
  } else if (isLocalErpSlug(slug)) {
    const localPage = buildLocalErpPage(marketCode, slug[1], slug[2]);
    if (localPage) {
      schemas.push(
        getMarketServiceSchema(market, {
          name: localPage.headline,
          description: localPage.metaDescription,
          url: `${SITE_URL}/${marketCode}/erp/${slug[1]}/${slug[2]}`,
        })
      );
      if (localPage.faq.length > 0) {
        schemas.push(getFAQSchema(localPage.faq));
      }
    }
  } else if (isPartnershipSlug(slug)) {
    if (slug.length === 2 && isPartnershipProgramSlug(slug[1])) {
      const program = getPartnershipProgram(marketCode, slug[1]);
      schemas.push(
        getMarketServiceSchema(market, {
          name: program.title,
          description: program.description,
          url: `${SITE_URL}${market.routePrefix}/partnerships/${program.slug}`,
        })
      );
      if (program.faq.length > 0) {
        schemas.push(getFAQSchema(program.faq));
      }
    } else if (slug.length === 1) {
      schemas.push(
        getMarketServiceSchema(market, {
          name: pageSeo?.h1 ?? 'Programme partenariat ZYVO',
          description: pageSeo?.description ?? market.description,
          url: `${SITE_URL}${market.routePrefix}/partnerships`,
        })
      );
    }
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
    countryCode?: string;
    industry?: string;
    city?: string;
    program?: string;
    posts?: ReturnType<typeof getMergedMarketBlogPosts>;
    post?: ReturnType<typeof getMergedMarketBlogPostBySlug>;
  }>;

  const pageProps: Record<string, unknown> = {
    industryId: resolved.params.industry,
    solutionSlug: resolved.params.solution,
    postSlug: resolved.params.post,
    countryCode: country,
    industry: resolved.params.industry,
    city: resolved.params.city,
    program: resolved.params.program,
  };

  if (slug[0] === 'blog' && slug.length === 1) {
    pageProps.posts = getMergedMarketBlogPosts(country as MarketCode);
  } else if (slug[0] === 'blog' && slug.length === 2 && resolved.params.post) {
    pageProps.post = getMergedMarketBlogPostBySlug(country as MarketCode, resolved.params.post);
    pageProps.allPosts = getMergedMarketBlogPosts(country as MarketCode);
  }

  const schemas = buildPageSchemas(country as MarketCode, slug, market);

  return (
    <>
      {schemas.length > 0 && <JsonLd data={schemas} />}
      <Page {...pageProps} />
    </>
  );
}
