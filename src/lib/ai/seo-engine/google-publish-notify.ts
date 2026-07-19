import { SITE_URL } from '@/data/site';
import { submitUrlsToIndexNow, type IndexNowResult } from '@/lib/seo/indexnow';
import {
  GSC_WRITE_SCOPE,
  INDEXING_SCOPE,
  getGoogleAccessToken,
  parseGoogleCredentials,
} from '../growth-analytics/integrations/google-auth';
import { SupportedCountry } from '../types';
import { logAiEvent } from '../logger';

const GSC_SITE_URL = process.env.GSC_SITE_URL ?? SITE_URL;
const ARTICLES_SITEMAP_URL = `${SITE_URL}/sitemap-articles.xml`;

export interface GooglePublishNotifyResult {
  url: string;
  configured: boolean;
  indexing: { ok: boolean; error?: string; statusCode?: number };
  gscSitemap: { ok: boolean; error?: string; statusCode?: number };
  sitemapPing: { ok: boolean; error?: string };
  indexNow: IndexNowResult;
}

export function isGoogleIndexingConfigured(): boolean {
  try {
    return Boolean(parseGoogleCredentials());
  } catch {
    return false;
  }
}

export function buildArticlePublicUrl(countryCode: SupportedCountry, slug: string): string {
  return `${SITE_URL}/${countryCode}/blog/${slug}`;
}

async function submitUrlToGoogleIndexingApi(url: string): Promise<{
  ok: boolean;
  error?: string;
  statusCode?: number;
}> {
  if (!isGoogleIndexingConfigured()) {
    return { ok: false, error: 'GOOGLE_SERVICE_ACCOUNT_JSON não configurado' };
  }

  try {
    const token = await getGoogleAccessToken([INDEXING_SCOPE]);
    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url,
        type: 'URL_UPDATED',
      }),
      signal: AbortSignal.timeout(20_000),
    });

    const body = await response.text();
    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: `Indexing API ${response.status}: ${body.slice(0, 300)}`,
      };
    }

    return { ok: true, statusCode: response.status };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Erro Indexing API',
    };
  }
}

async function submitSitemapToSearchConsole(sitemapUrl: string): Promise<{
  ok: boolean;
  error?: string;
  statusCode?: number;
}> {
  if (!isGoogleIndexingConfigured()) {
    return { ok: false, error: 'GOOGLE_SERVICE_ACCOUNT_JSON não configurado' };
  }

  try {
    const token = await getGoogleAccessToken([GSC_WRITE_SCOPE]);
    const site = encodeURIComponent(GSC_SITE_URL);
    const feed = encodeURIComponent(sitemapUrl);

    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${site}/sitemaps/${feed}`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(20_000),
      }
    );

    const body = await response.text();
    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: `GSC sitemap ${response.status}: ${body.slice(0, 300)}`,
      };
    }

    return { ok: true, statusCode: response.status };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Erro GSC sitemap',
    };
  }
}

async function pingGoogleSitemap(sitemapUrl: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      { method: 'GET', signal: AbortSignal.timeout(15_000) }
    );

    if (response.ok || response.status === 204) {
      return { ok: true };
    }

    return { ok: false, error: `Google ping HTTP ${response.status}` };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Erro ping sitemap',
    };
  }
}

/** Notifica Google Search Console / Indexing API quando um artigo é publicado */
export async function notifySearchConsoleOfArticle(
  countryCode: SupportedCountry,
  slug: string
): Promise<GooglePublishNotifyResult> {
  const url = buildArticlePublicUrl(countryCode, slug);
  const configured = isGoogleIndexingConfigured();

  const [indexing, gscSitemap, sitemapPing, indexNow] = await Promise.all([
    submitUrlToGoogleIndexingApi(url),
    submitSitemapToSearchConsole(ARTICLES_SITEMAP_URL),
    pingGoogleSitemap(ARTICLES_SITEMAP_URL),
    submitUrlsToIndexNow([url]),
  ]);

  const result: GooglePublishNotifyResult = {
    url,
    configured,
    indexing,
    gscSitemap,
    sitemapPing,
    indexNow,
  };

  const level = indexing.ok || gscSitemap.ok ? 'info' : 'warn';
  logAiEvent(
    'publisher',
    indexing.ok
      ? `URL enviada ao Google Indexing: ${url}`
      : `Falha ao enviar URL ao Google: ${indexing.error ?? 'desconhecido'}`,
    {
      countryCode,
      level,
      metadata: result,
    }
  );

  return result;
}
