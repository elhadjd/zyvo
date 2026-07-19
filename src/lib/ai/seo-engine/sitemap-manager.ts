import { eq } from 'drizzle-orm';
import { SITE_URL } from '@/data/site';
import { getDb } from '../db';
import {
  contentArticles,
  programmaticPages,
  seoSitemapEntries,
} from '../db/schema';
import type { SupportedCountry } from '../types';
import { getMarketBlogPosts } from '@/data/markets/blog';
import type { MarketCode } from '@/lib/markets/types';
import { getAllPublishedDbSlugs } from '../blog-repository';
import type { SitemapType } from './types';

function now(): string {
  return new Date().toISOString();
}

export interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

function upsertSitemapEntry(
  url: string,
  type: SitemapType,
  country: string | null,
  priority: number,
  changeFreq: string
): void {
  const db = getDb();
  const timestamp = now();
  const existing = db.select().from(seoSitemapEntries).where(eq(seoSitemapEntries.url, url)).get();

  if (existing) {
    db.update(seoSitemapEntries)
      .set({ lastmod: timestamp, priority, changeFreq })
      .where(eq(seoSitemapEntries.url, url))
      .run();
  } else {
    db.insert(seoSitemapEntries)
      .values({
        url,
        type,
        country,
        priority,
        changeFreq,
        lastmod: timestamp,
        createdAt: timestamp,
      })
      .run();
  }
}

export function syncArticleSitemap(countryCode: SupportedCountry): number {
  const db = getDb();
  const articles = db
    .select()
    .from(contentArticles)
    .where(eq(contentArticles.countryCode, countryCode))
    .all()
    .filter((a) => a.status === 'published');

  let count = 0;

  for (const article of articles) {
    const url = `${SITE_URL}/${countryCode}/blog/${article.slug}`;
    upsertSitemapEntry(url, 'articles', countryCode, 0.8, 'weekly');
    count++;
  }

  const staticPosts = getMarketBlogPosts(countryCode as MarketCode);
  const seenSlugs = new Set(articles.map((a) => a.slug));

  for (const post of staticPosts) {
    if (seenSlugs.has(post.slug)) continue;
    const url = `${SITE_URL}/${countryCode}/blog/${post.slug}`;
    upsertSitemapEntry(url, 'articles', countryCode, 0.8, 'weekly');
    count++;
  }

  return count;
}

export function syncProgrammaticSitemap(countryCode: SupportedCountry): number {
  const db = getDb();
  const pages = db
    .select()
    .from(programmaticPages)
    .where(eq(programmaticPages.country, countryCode))
    .all()
    .filter((p) => p.status === 'published');

  for (const page of pages) {
    const url = `${SITE_URL}/${countryCode}/erp/${page.slug}`;
    upsertSitemapEntry(url, 'programmatic', countryCode, 0.85, 'monthly');
  }

  return pages.length;
}

export function syncCountrySitemap(): number {
  const countries: SupportedCountry[] = ['gn', 'sn', 'ci', 'ao', 'mz'];
  const paths = ['', '/blog', '/pricing', '/features', '/contact', '/faq'];

  let count = 0;
  for (const country of countries) {
    for (const path of paths) {
      const url = `${SITE_URL}/${country}${path}`;
      upsertSitemapEntry(url, 'countries', country, path === '' ? 0.95 : 0.8, 'weekly');
      count++;
    }
  }
  return count;
}

export function syncAllSitemaps(): { articles: number; programmatic: number; countries: number } {
  const countries: SupportedCountry[] = ['gn', 'sn', 'ci', 'ao', 'mz'];
  let articles = 0;
  let programmatic = 0;

  for (const country of countries) {
    articles += syncArticleSitemap(country);
    programmatic += syncProgrammaticSitemap(country);
  }

  const countriesCount = syncCountrySitemap();
  return { articles, programmatic, countries: countriesCount };
}

export function getSitemapEntries(type?: SitemapType): SitemapUrl[] {
  const db = getDb();
  const entries = type
    ? db.select().from(seoSitemapEntries).where(eq(seoSitemapEntries.type, type)).all()
    : db.select().from(seoSitemapEntries).all();

  return entries.map((e) => ({
    url: e.url,
    lastmod: e.lastmod,
    changefreq: e.changeFreq,
    priority: e.priority,
  }));
}

export function buildSitemapXml(urls: SitemapUrl[]): string {
  const items = urls
    .map(
      (u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod.split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
}

export function buildSitemapIndexXml(sitemaps: { loc: string; lastmod: string }[]): string {
  const items = sitemaps
    .map(
      (s) => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod.split('T')[0]}</lastmod>
  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>`;
}

export function getPublishedArticleUrls(countryCode: SupportedCountry): string[] {
  const slugs = getAllPublishedDbSlugs(countryCode);
  return slugs.map((slug) => `${SITE_URL}/${countryCode}/blog/${slug}`);
}
