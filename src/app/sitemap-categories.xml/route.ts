import { NextResponse } from 'next/server';
import { SITE_URL } from '@/data/site';
import { buildSitemapXml } from '@/lib/ai/seo-engine';
import { COUNTRY_AI_CONFIGS } from '@/lib/ai/countries/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const timestamp = new Date().toISOString();
  const categories = ['Fiscalité', 'Affaires', 'Entrepreneuriat', 'Technologie', 'Marketing', 'Gestion'];

  const urls = COUNTRY_AI_CONFIGS.flatMap((config) =>
    categories.map((cat) => ({
      url: `${SITE_URL}/${config.countryCode}/blog?category=${encodeURIComponent(cat)}`,
      lastmod: timestamp,
      changefreq: 'weekly',
      priority: 0.7,
    }))
  );

  const xml = buildSitemapXml(urls);
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
