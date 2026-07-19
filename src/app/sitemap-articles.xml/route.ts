import { NextResponse } from 'next/server';
import { buildSitemapXml, getSitemapEntries, syncAllSitemaps, buildFallbackArticleSitemapEntries } from '@/lib/ai/seo-engine';
import { runMigrations } from '@/lib/ai/db/migrate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  runMigrations();
  let entries = getSitemapEntries('articles');

  if (entries.length === 0) {
    syncAllSitemaps();
    entries = getSitemapEntries('articles');
  }

  if (entries.length === 0) {
    entries = buildFallbackArticleSitemapEntries();
  }

  const xml = buildSitemapXml(entries);
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
