#!/usr/bin/env node
/**
 * Generates sitemap.xml from route definitions.
 * Run: node scripts/generate-sitemap.js
 */
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://www.zyvoerp.com';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/features', priority: '0.9', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.9', changefreq: 'monthly' },
  { path: '/security', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/solutions', priority: '0.9', changefreq: 'weekly' },
  { path: '/industries', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/getting-started', priority: '0.9', changefreq: 'monthly' },
  { path: '/help-center', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
];

const solutionSlugs = [
  'point-of-sale', 'inventory-management', 'employee-management', 'logistics',
  'scheduling', 'marketing-analytics', 'online-store', 'financial-management',
  'invoicing', 'purchasing',
];

const industrySlugs = [
  'retail', 'manufacturing', 'healthcare', 'hospitality',
  'professional-services', 'ecommerce',
];

const blogSlugs = [
  'how-to-choose-business-management-software',
  'inventory-management-best-practices',
  'zyvo-vs-quickbooks-comparison',
  'small-business-erp-guide',
];

const lastmod = new Date().toISOString().split('T')[0];

const urls = [
  ...staticRoutes,
  ...solutionSlugs.map((slug) => ({ path: `/solutions/${slug}`, priority: '0.8', changefreq: 'monthly' })),
  ...industrySlugs.map((slug) => ({ path: `/industries/${slug}`, priority: '0.8', changefreq: 'monthly' })),
  ...blogSlugs.map((slug) => ({ path: `/blog/${slug}`, priority: '0.7', changefreq: 'monthly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outputPath, xml);
console.log(`Sitemap generated: ${outputPath} (${urls.length} URLs)`);
