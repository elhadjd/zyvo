import { NextResponse } from 'next/server';
import { buildSitemapXml, getSitemapEntries } from '@/lib/ai/seo-engine';
import { runMigrations } from '@/lib/ai/db/migrate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  runMigrations();
  const entries = getSitemapEntries('articles');
  const xml = buildSitemapXml(entries);
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
