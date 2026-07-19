import { SignJWT, importPKCS8 } from 'jose';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';

export const GA4_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
export const GSC_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

export interface GoogleServiceAccountCredentials {
  client_email: string;
  private_key: string;
  project_id?: string;
}

interface TokenCacheEntry {
  token: string;
  expiresAt: number;
  scopeKey: string;
}

let tokenCache: TokenCacheEntry | null = null;

export function parseGoogleCredentials(): GoogleServiceAccountCredentials | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw?.trim()) return null;

  try {
    const credentials = JSON.parse(raw) as GoogleServiceAccountCredentials;
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('JSON inválido: falta client_email ou private_key');
    }
    return credentials;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'JSON inválido';
    throw new Error(`GOOGLE_SERVICE_ACCOUNT_JSON: ${message}`);
  }
}

function normalizePrivateKey(privateKey: string): string {
  return privateKey.includes('\\n') ? privateKey.replace(/\\n/g, '\n') : privateKey;
}

export async function getGoogleAccessToken(scopes: string[]): Promise<string> {
  const credentials = parseGoogleCredentials();
  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON não definido no ambiente');
  }

  const scopeKey = [...scopes].sort().join(' ');
  if (tokenCache && tokenCache.scopeKey === scopeKey && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token;
  }

  const privateKey = await importPKCS8(normalizePrivateKey(credentials.private_key), 'RS256');
  const now = Math.floor(Date.now() / 1000);

  const assertion = await new SignJWT({ scope: scopeKey })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuer(credentials.client_email)
    .setSubject(credentials.client_email)
    .setAudience(TOKEN_URL)
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(privateKey);

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    signal: AbortSignal.timeout(20_000),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Google OAuth falhou (${response.status}): ${body.slice(0, 300)}`);
  }

  const data = JSON.parse(body) as { access_token: string; expires_in: number };
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
    scopeKey,
  };

  return data.access_token;
}

export interface GoogleServiceCheck {
  ok: boolean;
  statusCode?: number;
  error?: string;
  detail?: string;
}

export interface GoogleConnectionStatus {
  credentialsConfigured: boolean;
  ga4: {
    configured: boolean;
    propertyId: string | null;
    connected: boolean;
    check: GoogleServiceCheck;
  };
  gsc: {
    configured: boolean;
    siteUrl: string;
    connected: boolean;
    check: GoogleServiceCheck;
  };
  ready: boolean;
}

export async function testGoogleConnection(): Promise<GoogleConnectionStatus> {
  const propertyId = process.env.GA4_PROPERTY_ID ?? null;
  const siteUrl = process.env.GSC_SITE_URL ?? 'https://www.zyvoerp.com';
  let credentialsConfigured = false;

  try {
    credentialsConfigured = Boolean(parseGoogleCredentials());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Credenciais inválidas';
    return {
      credentialsConfigured: false,
      ga4: {
        configured: Boolean(propertyId),
        propertyId,
        connected: false,
        check: { ok: false, error: message },
      },
      gsc: {
        configured: true,
        siteUrl,
        connected: false,
        check: { ok: false, error: message },
      },
      ready: false,
    };
  }

  const ga4Check = await testGa4Connection(propertyId);
  const gscCheck = await testGscConnection(siteUrl);

  return {
    credentialsConfigured,
    ga4: {
      configured: Boolean(propertyId && credentialsConfigured),
      propertyId,
      connected: ga4Check.ok,
      check: ga4Check,
    },
    gsc: {
      configured: credentialsConfigured,
      siteUrl,
      connected: gscCheck.ok,
      check: gscCheck,
    },
    ready: ga4Check.ok && gscCheck.ok,
  };
}

async function testGa4Connection(propertyId: string | null): Promise<GoogleServiceCheck> {
  if (!propertyId) {
    return { ok: false, error: 'GA4_PROPERTY_ID não definido' };
  }

  try {
    const token = await getGoogleAccessToken([GA4_SCOPE]);
    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
          metrics: [{ name: 'activeUsers' }],
          limit: 1,
        }),
        signal: AbortSignal.timeout(20_000),
      }
    );

    const body = await response.text();
    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: `GA4 API erro ${response.status}`,
        detail: body.slice(0, 400),
      };
    }

    return { ok: true, statusCode: response.status, detail: 'Ligação GA4 OK' };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Erro GA4',
    };
  }
}

async function testGscConnection(siteUrl: string): Promise<GoogleServiceCheck> {
  try {
    const token = await getGoogleAccessToken([GSC_SCOPE]);
    const encodedSite = encodeURIComponent(siteUrl);

    const response = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          startDate: getDateDaysAgo(7),
          endDate: today(),
          dimensions: ['query'],
          rowLimit: 1,
        }),
        signal: AbortSignal.timeout(20_000),
      }
    );

    const body = await response.text();
    if (!response.ok) {
      return {
        ok: false,
        statusCode: response.status,
        error: `GSC API erro ${response.status}`,
        detail: body.slice(0, 400),
      };
    }

    return { ok: true, statusCode: response.status, detail: 'Ligação GSC OK' };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Erro GSC',
    };
  }
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function getDateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}
