import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { runMultiCountryPipeline } from '@/lib/ai/jobs/multi-country-pipeline';
import { syncAllSitemaps } from '@/lib/ai/seo-engine/sitemap-manager';
import { getPublishedArticleUrls } from '@/lib/ai/seo-engine/sitemap-manager';
import { submitUrlsToIndexNow } from '@/lib/seo/indexnow';
import { SITE_URL } from '@/data/site';
import type { SupportedCountry } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const CRON_SECRET = process.env.CRON_SECRET;
const TRAFFIC_COUNTRIES: SupportedCountry[] = ['gn', 'sn', 'ci'];

function authorize(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  return !CRON_SECRET || authHeader === `Bearer ${CRON_SECRET}` || secret === CRON_SECRET;
}

export async function GET(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const notifyIndexNow = searchParams.get('indexnow') !== 'false';

  try {
    const pipeline = await runMultiCountryPipeline({
      countryCodes: TRAFFIC_COUNTRIES,
      saveAsDraft: false,
    });

    const sitemap = syncAllSitemaps();

    try {
      revalidatePath('/sitemap.xml');
      revalidatePath('/sitemap-articles.xml');
      revalidatePath('/sitemap-programmatic.xml');
      for (const code of TRAFFIC_COUNTRIES) {
        revalidatePath(`/${code}/blog`);
      }
    } catch {
      // revalidatePath may fail outside request context
    }

    let indexNow = { submitted: 0, skipped: true as boolean, reason: 'disabled' };
    if (notifyIndexNow) {
      const urls = TRAFFIC_COUNTRIES.flatMap((code) =>
        getPublishedArticleUrls(code).map((path) => path)
      );
      // getPublishedArticleUrls already returns full URLs
      indexNow = await submitUrlsToIndexNow(urls);
    }

    return NextResponse.json({
      pipeline,
      sitemap,
      indexNow,
      markets: TRAFFIC_COUNTRIES,
      site: SITE_URL,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
