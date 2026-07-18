import type { Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/data/site';

export interface PageSeoInput {
  title: string;
  description?: string;
  keywords?: string | string[];
  canonical?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

export function buildPageTitle(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  keywords,
  canonical,
  ogType = 'website',
  noindex = false,
}: PageSeoInput): Metadata {
  const fullTitle = buildPageTitle(title);
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      type: ogType,
      url: canonicalUrl,
      locale: 'en_US',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}
