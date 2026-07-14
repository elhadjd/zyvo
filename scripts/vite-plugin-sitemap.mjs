import { writeSitemap, syncRobotsTxt } from './sitemap-lib.mjs';

/**
 * Vite plugin: generates sitemap.xml automatically on every build.
 * - buildStart → public/sitemap.xml (dev + copied by Vite)
 * - closeBundle → dist/sitemap.xml (production output, always fresh)
 */
export function sitemapPlugin() {
  return {
    name: 'zyvo-sitemap',
    buildStart() {
      const { outputPath, urlCount } = writeSitemap('public');
      console.log(`[sitemap] ${outputPath} (${urlCount} URLs)`);
    },
    closeBundle() {
      const { outputPath, urlCount } = writeSitemap('dist');
      syncRobotsTxt('dist');
      console.log(`[sitemap] ${outputPath} (${urlCount} URLs)`);
    },
  };
}
