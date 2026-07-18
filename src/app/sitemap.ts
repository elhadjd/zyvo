import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';
import { blogPosts } from '@/data/blog';
import { developmentServices } from '@/data/development-services';
import { industries } from '@/data/industries';
import { industryLandings } from '@/data/industry-landings';
import { solutions } from '@/data/solutions';
import { getMarketStaticParams } from '@/lib/markets/pages';
import { getMarket } from '@/lib/markets/registry';

const staticPaths = [
  '/',
  '/features',
  '/pricing',
  '/security',
  '/demo',
  '/faq',
  '/development-services',
  '/about',
  '/contact',
  '/solutions',
  '/industries',
  '/blog',
  '/getting-started',
  '/integrations',
  '/help-center',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
  '/cookie-policy',
  ...developmentServices.map((s) => s.path),
  ...industryLandings.map((l) => l.path),
  ...solutions.map((s) => `/solutions/${s.slug}`),
  ...industries.map((i) => `/industries/${i.slug}`),
  ...blogPosts.map((p) => `/blog/${p.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const usEntries = staticPaths.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path === '/' ? ('weekly' as const) : ('monthly' as const),
    priority: path === '/' ? 1 : path.startsWith('/solutions') || path.startsWith('/development') ? 0.9 : 0.7,
  }));

  const marketEntries: MetadataRoute.Sitemap = [];
  const gnParams = getMarketStaticParams('gn');
  const gnMarket = getMarket('gn');

  gnParams.forEach(({ slug }) => {
    const path = slug.length > 0 ? `${gnMarket.routePrefix}/${slug.join('/')}` : gnMarket.routePrefix;
    marketEntries.push({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: slug.length === 0 ? 'weekly' : 'monthly',
      priority: slug.length === 0 ? 0.95 : 0.8,
    });
  });

  const subSitemaps: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/sitemap-articles.xml`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/sitemap-countries.xml`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/sitemap-categories.xml`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/sitemap-programmatic.xml`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
  ];

  return [...usEntries, ...marketEntries, ...subSitemaps];
}
