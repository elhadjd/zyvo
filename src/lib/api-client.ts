import { ApiRequestError, buildSignupErrorFromPayload, extractApiError, extractSignupLink } from '@/lib/api-errors';
import type { MarketCode } from '@/lib/markets/types';

export const baseApiURL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.zyvoerp.com';

async function parseJsonResponse(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  if (!text.trim()) return {};

  try {
    const data = JSON.parse(text);
    return data && typeof data === 'object' ? (data as Record<string, unknown>) : { message: text };
  } catch {
    return { message: text };
  }
}

function resolveMarketCode(data: Record<string, unknown>): MarketCode {
  const market = data.market;
  if (typeof market === 'string') {
    const code = market.toLowerCase();
    if (code === 'gn' || code === 'sn' || code === 'ci' || code === 'ao' || code === 'us') {
      return code;
    }
  }
  return 'us';
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  country?: string;
  source?: string;
  page?: string;
}) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const payload = await parseJsonResponse(response);
  if (!response.ok || payload.success === false) {
    throw buildSignupErrorFromPayload(payload, 'us', response.status);
  }
  return payload;
}

export async function submitSignup(data: Record<string, unknown>) {
  const marketCode = resolveMarketCode(data);

  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const payload = await parseJsonResponse(response);
  const extracted = extractApiError(payload);
  const isFailure =
    !response.ok ||
    payload.success === false ||
    payload.status === 'error' ||
    payload.status === false;

  if (isFailure) {
    throw buildSignupErrorFromPayload(payload, marketCode, response.status);
  }

  const link = extractSignupLink(payload);

  if (!link) {
    if (extracted.message || Object.keys(extracted.fieldErrors).length > 0) {
      throw buildSignupErrorFromPayload(payload, marketCode, response.status || 400);
    }
    throw buildSignupErrorFromPayload(
      { ...payload, message: extracted.rawMessages[0] },
      marketCode,
      response.status || 502
    );
  }

  return payload;
}
