import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';
import { blogPosts } from '@/data/blog';
import { developmentServices } from '@/data/development-services';
import { industries } from '@/data/industries';
import { industryLandings } from '@/data/industry-landings';
import { solutions } from '@/data/solutions';

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

  return staticPaths.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/solutions') || path.startsWith('/development') ? 0.9 : 0.7,
  }));
}
