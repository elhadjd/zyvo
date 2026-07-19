import { NextResponse } from 'next/server';
import { SITE_URL } from '@/data/site';
import { getAllLocalErpParams } from '@/data/markets/local-erp-pages';
import { getPublishedArticleUrls } from '@/lib/ai/seo-engine/sitemap-manager';
import { submitUrlsToIndexNow } from '@/lib/seo/indexnow';
import type { MarketCode } from '@/lib/markets/types';
import type { SupportedCountry } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';

const CRON_SECRET = process.env.CRON_SECRET;
const TRAFFIC_MARKETS: MarketCode[] = ['gn', 'sn', 'ci'];

function authorize(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  return !CRON_SECRET || authHeader === `Bearer ${CRON_SECRET}` || secret === CRON_SECRET;
}

function buildLocalErpUrls(marketCode: MarketCode): string[] {
  return getAllLocalErpParams(marketCode).map(
    ({ industry, city }) => `${SITE_URL}/${marketCode}/erp/${industry}/${city}`
  );
}

export async function POST(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let bodyUrls: string[] = [];
  try {
    const body = await request.json();
    if (Array.isArray(body.urls)) {
      bodyUrls = body.urls.filter((u): u is string => typeof u === 'string');
    }
  } catch {
    // optional body
  }

  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') ?? 'custom';

  let urls = bodyUrls;

  if (mode === 'local-erp') {
    urls = TRAFFIC_MARKETS.flatMap(buildLocalErpUrls);
  } else if (mode === 'articles') {
    urls = TRAFFIC_MARKETS.flatMap((code) => getPublishedArticleUrls(code as SupportedCountry));
  } else if (mode === 'all') {
    urls = [
      ...TRAFFIC_MARKETS.flatMap(buildLocalErpUrls),
      ...TRAFFIC_MARKETS.flatMap((code) => getPublishedArticleUrls(code as SupportedCountry)),
    ];
  }

  const result = await submitUrlsToIndexNow(urls);
  return NextResponse.json({ mode, ...result });
}

export async function GET(request: Request) {
  return POST(request);
}
