import type { Metadata } from 'next';
import { buildMetadata, buildPageTitle } from '@/lib/seo';
import type { MarketCode } from '@/lib/markets/types';
import { getMarket, getMarketAlternates } from '@/lib/markets/registry';
import { stripMarketPrefix } from '@/lib/markets/routing';
import { getMarketPageSeo } from '@/lib/markets/seo';
import { GN_GEO_TARGETS } from '@/data/markets/gn-seo';
import { SITE_NAME, SITE_URL } from '@/data/site';
import type { MarketBlogPost } from '@/data/markets/blog/types';

export function buildMarketBlogPostMetadata(
  marketCode: MarketCode,
  post: MarketBlogPost
): Metadata {
  const market = getMarket(marketCode);
  const canonicalPath = `${market.routePrefix}/blog/${post.slug}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const absoluteTitle = post.metaTitle.includes(SITE_NAME)
    ? post.metaTitle
    : buildPageTitle(post.metaTitle);

  const base = buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    canonical: canonicalPath,
    locale: market.locale,
    ogType: 'article',
  });

  const { path } = stripMarketPrefix(canonicalPath);

  return {
    ...base,
    title: { absolute: absoluteTitle },
    alternates: {
      canonical: canonicalUrl,
      languages: getMarketAlternates(path),
    },
    openGraph: {
      ...base.openGraph,
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      locale: market.locale,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      authors: [post.author],
      section: post.category,
      tags: post.keywords.split(',').map((k) => k.trim()).filter(Boolean),
      siteName: `${SITE_NAME} ${market.countryNameLocal}`,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      ...base.twitter,
      title: post.metaTitle,
      description: post.metaDescription,
    },
    other: {
      'geo.region': `GN-${market.contact.address.country}`,
      'geo.placename': market.contact.address.city,
      'content-language': market.language,
      target: GN_GEO_TARGETS.join(', '),
      'article:author': post.author,
      'article:section': post.category,
    },
    category: 'business software',
  };
}

export function buildMarketMetadata(
  marketCode: MarketCode,
  slug: string[] = [],
  fallbackPageKey?: string
): Metadata {
  const market = getMarket(marketCode);
  const pageSeo = getMarketPageSeo(marketCode, slug);
  const legacyPage = fallbackPageKey ? market.pages[fallbackPageKey] : undefined;

  const title = pageSeo?.title ?? legacyPage?.title ?? market.tagline;
  const description = pageSeo?.description ?? legacyPage?.description ?? market.description;
  const keywords = pageSeo?.keywords ?? legacyPage?.keywords;
  const canonicalPath = pageSeo?.path ?? legacyPage?.path ?? market.routePrefix ?? '/';
  const ogTitle = pageSeo?.ogTitle ?? title;

  const absoluteTitle = title.includes(SITE_NAME) ? title : buildPageTitle(title);

  const base = buildMetadata({
    title,
    description,
    keywords,
    canonical: canonicalPath,
    locale: market.locale,
    ogType: pageSeo?.ogType ?? 'website',
  });

  const { path } = stripMarketPrefix(canonicalPath);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  const geoPlacename = market.contact.address.city;
  const geoRegion = `GN-${market.contact.address.country === 'GN' ? 'C' : market.contact.address.country}`;

  return {
    ...base,
    title: { absolute: absoluteTitle },
    alternates: {
      canonical: canonicalUrl,
      languages: getMarketAlternates(path),
    },
    openGraph: {
      ...base.openGraph,
      title: ogTitle,
      description,
      url: canonicalUrl,
      locale: market.locale,
      alternateLocale: ['en_US'],
      type: 'website',
      siteName: `${SITE_NAME} ${market.countryNameLocal}`,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${market.tagline}`,
        },
      ],
    },
    twitter: {
      ...base.twitter,
      title: ogTitle,
      description,
    },
    other: {
      'geo.region': geoRegion,
      'geo.placename': geoPlacename,
      'geo.position': '9.6412;-13.5784',
      ICBM: '9.6412, -13.5784',
      'content-language': market.language,
      target: GN_GEO_TARGETS.join(', '),
    },
    category: 'business software',
  };
}

export function buildMarketBreadcrumbs(
  marketCode: MarketCode,
  slug: string[],
  options?: { blogPostTitle?: string }
): { name: string; url: string }[] {
  const market = getMarket(marketCode);
  const base = `${SITE_URL}${market.routePrefix}`;
  const pageSeo = getMarketPageSeo(marketCode, slug);

  const crumbs: { name: string; url: string }[] = [
    { name: 'Accueil', url: base ?? SITE_URL },
  ];

  if (slug.length === 0) return crumbs;

  if (slug[0] === 'solutions' && slug.length === 1) {
    crumbs.push({ name: 'Solutions', url: `${base}/solutions` });
    return crumbs;
  }

  if (slug[0] === 'industries' && slug.length === 1) {
    crumbs.push({ name: 'Secteurs', url: `${base}/industries` });
    return crumbs;
  }

  if (slug[0] === 'solutions' && slug.length === 2) {
    crumbs.push({ name: 'Solutions', url: `${base}/solutions` });
    crumbs.push({
      name: pageSeo?.breadcrumb ?? slug[1],
      url: `${base}/solutions/${slug[1]}`,
    });
    return crumbs;
  }

  if (slug[0] === 'industries' && slug.length === 2) {
    crumbs.push({ name: 'Secteurs', url: `${base}/industries` });
    crumbs.push({
      name: pageSeo?.breadcrumb ?? slug[1],
      url: `${base}/industries/${slug[1]}`,
    });
    return crumbs;
  }

  if (slug[0] === 'blog' && slug.length === 1) {
    crumbs.push({ name: 'Blog', url: `${base}/blog` });
    return crumbs;
  }

  if (slug[0] === 'blog' && slug.length === 2) {
    crumbs.push({ name: 'Blog', url: `${base}/blog` });
    crumbs.push({
      name: options?.blogPostTitle ?? pageSeo?.h1 ?? slug[1],
      url: `${base}/blog/${slug[1]}`,
    });
    return crumbs;
  }

  if (pageSeo?.breadcrumb) {
    crumbs.push({ name: pageSeo.breadcrumb, url: `${SITE_URL}${pageSeo.path}` });
  }

  return crumbs;
}
