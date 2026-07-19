import { SITE_NAME, SITE_URL } from '@/data/site';
import type { ContentArticle } from '../db/schema';
import type { SupportedCountry } from '../types';
import { getCountryConfig } from '../countries';
import type { OpenGraphMeta, TwitterCardMeta } from './types';
import { buildHreflangTags } from './schema-generator';

const META_TITLE_MAX = 60;
const META_DESC_MAX = 160;

export function truncateMeta(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 3).trimEnd() + '...';
}

export function generateMetaTitle(title: string, countryCode: SupportedCountry): string {
  const config = getCountryConfig(countryCode);
  const suffix = ` | ${SITE_NAME}`;
  const countrySuffix = config ? ` — ${config.countryName}` : '';
  const base = truncateMeta(title, META_TITLE_MAX - suffix.length - countrySuffix.length);
  return `${base}${countrySuffix}${suffix}`;
}

export function generateMetaDescription(
  excerpt: string,
  primaryKeyword: string,
  countryCode: SupportedCountry
): string {
  const config = getCountryConfig(countryCode);
  const cta =
    config?.language === 'pt'
      ? 'Descubra como o ZYVO pode ajudar a sua empresa.'
      : 'Découvrez comment ZYVO peut aider votre entreprise.';
  const base = excerpt.includes(primaryKeyword)
    ? excerpt
    : `${primaryKeyword}: ${excerpt}`;
  return truncateMeta(`${base} ${cta}`, META_DESC_MAX);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
    .replace(/^-|-$/g, '');
}

export function generateCanonicalUrl(
  countryCode: SupportedCountry,
  slug: string,
  pageType: 'blog' | 'erp' = 'blog'
): string {
  const path =
    pageType === 'blog' ? `/${countryCode}/blog/${slug}` : `/${countryCode}/erp/${slug}`;
  return `${SITE_URL}${path}`;
}

export function generateOpenGraph(
  article: ContentArticle,
  countryCode: SupportedCountry,
  metaTitle: string,
  metaDescription: string,
  slug: string
): OpenGraphMeta {
  const config = getCountryConfig(countryCode);
  const url = generateCanonicalUrl(countryCode, slug);

  return {
    title: metaTitle,
    description: metaDescription,
    url,
    type: 'article',
    siteName: `${SITE_NAME} ${config?.countryName ?? ''}`.trim(),
    locale: config?.locale ?? 'fr_GN',
    image: `${SITE_URL}/og-image.png`,
  };
}

export function generateTwitterCard(
  metaTitle: string,
  metaDescription: string
): TwitterCardMeta {
  return {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    image: `${SITE_URL}/og-image.png`,
  };
}

export function buildFullMetaPackage(
  article: ContentArticle,
  countryCode: SupportedCountry,
  primaryKeyword: string
) {
  const slug = generateSlug(article.title);
  const metaTitle = generateMetaTitle(article.title, countryCode);
  const metaDescription = generateMetaDescription(article.excerpt, primaryKeyword, countryCode);
  const canonicalUrl = generateCanonicalUrl(countryCode, slug);
  const hreflangTags = buildHreflangTags(countryCode, slug);
  const openGraph = generateOpenGraph(article, countryCode, metaTitle, metaDescription, slug);
  const twitterCard = generateTwitterCard(metaTitle, metaDescription);

  return { slug, metaTitle, metaDescription, canonicalUrl, hreflangTags, openGraph, twitterCard };
}
