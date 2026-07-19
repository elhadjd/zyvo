import { SITE_URL } from '@/data/site';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const INDEXNOW_HOST = new URL(SITE_URL).host;

export function getIndexNowKey(): string | null {
  return process.env.INDEXNOW_KEY ?? null;
}

export function getIndexNowKeyLocation(): string | null {
  const key = getIndexNowKey();
  if (!key) return null;
  return `${SITE_URL}/${key}.txt`;
}

export interface IndexNowResult {
  submitted: number;
  skipped: boolean;
  reason?: string;
  status?: number;
}

export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const key = getIndexNowKey();
  if (!key) {
    return { submitted: 0, skipped: true, reason: 'INDEXNOW_KEY not configured' };
  }

  const uniqueUrls = [...new Set(urls.filter((u) => u.startsWith('http')))];
  if (uniqueUrls.length === 0) {
    return { submitted: 0, skipped: true, reason: 'no urls' };
  }

  const payload = {
    host: INDEXNOW_HOST,
    key,
    keyLocation: getIndexNowKeyLocation(),
    urlList: uniqueUrls.slice(0, 10_000),
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    return {
      submitted: uniqueUrls.length,
      skipped: false,
      status: res.status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'IndexNow request failed';
    return { submitted: 0, skipped: true, reason: message };
  }
}
