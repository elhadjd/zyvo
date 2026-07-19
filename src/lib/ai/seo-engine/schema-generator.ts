import { SITE_NAME, SITE_URL } from '@/data/site';
import type { ContentArticle } from '../db/schema';
import type { SupportedCountry } from '../types';
import { COUNTRY_HREFLANG } from './types';
import { getCountryConfig } from '../countries';

export function generateArticleSchema(
  article: ContentArticle,
  countryCode: SupportedCountry,
  metaDescription: string
): Record<string, unknown> {
  const config = getCountryConfig(countryCode);
  const blogPath = `/${countryCode}/blog/${article.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: metaDescription || article.excerpt,
    author: { '@type': 'Organization', name: article.author || SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    datePublished: article.publishedAt ?? article.createdAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${blogPath}` },
    inLanguage: config?.locale ?? article.language,
    articleSection: article.category,
    keywords: article.category,
  };
}

export function generateFaqSchema(
  faq: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function generateOrganizationSchema(countryCode: SupportedCountry): Record<string, unknown> {
  const config = getCountryConfig(countryCode);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: `Logiciel de gestion d'entreprise pour ${config?.countryName ?? countryCode.toUpperCase()}`,
    areaServed: { '@type': 'Country', name: config?.countryName ?? countryCode },
    sameAs: [`${SITE_URL}/${countryCode}`],
  };
}

export function generateSoftwareApplicationSchema(
  countryCode: SupportedCountry
): Record<string, unknown> {
  const config = getCountryConfig(countryCode);
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: countryCode === 'ao' || countryCode === 'mz' ? 'AOA' : 'USD',
      description: 'Essai gratuit disponible',
    },
    description: `ERP et logiciel de gestion pour PME en ${config?.countryName ?? countryCode}`,
    inLanguage: config?.language ?? 'fr',
    availableLanguage: ['fr', 'pt', 'en'],
    areaServed: config?.countryName ?? countryCode,
  };
}

export function buildHreflangTags(
  countryCode: SupportedCountry,
  slug: string,
  pageType: 'blog' | 'erp' = 'blog'
): Record<string, string> {
  const path =
    pageType === 'blog' ? `/${countryCode}/blog/${slug}` : `/${countryCode}/erp/${slug}`;
  const tags: Record<string, string> = {
    [COUNTRY_HREFLANG[countryCode]]: `${SITE_URL}${path}`,
    'x-default': `${SITE_URL}${path}`,
  };
  return tags;
}
