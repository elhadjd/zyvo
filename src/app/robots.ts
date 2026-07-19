import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-articles.xml`,
      `${SITE_URL}/sitemap-countries.xml`,
      `${SITE_URL}/sitemap-categories.xml`,
      `${SITE_URL}/sitemap-programmatic.xml`,
    ],
  };
}
