import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
export const SITE_URL = 'https://www.zyvoerp.com';

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/features', priority: '0.9', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.9', changefreq: 'monthly' },
  { path: '/security', priority: '0.8', changefreq: 'monthly' },
  { path: '/demo', priority: '0.9', changefreq: 'monthly' },
  { path: '/faq', priority: '0.8', changefreq: 'monthly' },
  { path: '/development-services', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/solutions', priority: '0.9', changefreq: 'weekly' },
  { path: '/industries', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/getting-started', priority: '0.9', changefreq: 'monthly' },
  { path: '/integrations', priority: '0.8', changefreq: 'monthly' },
  { path: '/help-center', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  { path: '/refund-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
];

function readSource(relativePath) {
  return readFileSync(join(ROOT, relativePath), 'utf8');
}

function extractSlugs(relativePath) {
  const content = readSource(relativePath);
  return [...content.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
}

function extractPaths(relativePath) {
  const content = readSource(relativePath);
  return [...content.matchAll(/path:\s*'(\/[^']+)'/g)].map((match) => match[1]);
}

/**
 * Collects all site routes by reading slugs/paths from source data files.
 * Stays in sync automatically when new pages are added to src/data/.
 */
export function collectSitemapRoutes() {
  const industryLandingPaths = extractPaths('src/data/industry-landings.ts');
  const developmentServicePaths = extractPaths('src/data/development-services.ts').filter(
    (path) => path !== '/development-services'
  );
  const solutionSlugs = extractSlugs('src/data/solutions.ts');
  const industrySlugs = extractSlugs('src/data/industries.ts');
  const blogSlugs = extractSlugs('src/data/blog.ts');

  return [
    ...STATIC_ROUTES,
    ...developmentServicePaths.map((path) => ({
      path,
      priority: '0.9',
      changefreq: 'monthly',
    })),
    ...industryLandingPaths.map((path) => ({
      path,
      priority: '0.9',
      changefreq: 'monthly',
    })),
    ...solutionSlugs.map((slug) => ({
      path: `/solutions/${slug}`,
      priority: '0.8',
      changefreq: 'monthly',
    })),
    ...industrySlugs.map((slug) => ({
      path: `/industries/${slug}`,
      priority: '0.7',
      changefreq: 'monthly',
    })),
    ...blogSlugs.map((slug) => ({
      path: `/blog/${slug}`,
      priority: '0.7',
      changefreq: 'monthly',
    })),
  ];
}

export function buildSitemapXml(routes = collectSitemapRoutes()) {
  const lastmod = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
}

export function writeSitemap(outputDir, routes = collectSitemapRoutes()) {
  const xml = buildSitemapXml(routes);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'sitemap.xml'), xml, 'utf8');
  return { outputPath: join(outputDir, 'sitemap.xml'), urlCount: routes.length };
}

export function syncRobotsTxt(outputDir) {
  const sourcePath = join(ROOT, 'public', 'robots.txt');
  if (!existsSync(sourcePath)) return;

  const robots = readFileSync(sourcePath, 'utf8');
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'robots.txt'), robots, 'utf8');
}
