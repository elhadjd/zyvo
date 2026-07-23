import { ApiRequestError, buildSignupErrorFromPayload, extractApiError, extractSignupLink } from '@/lib/api-errors';
import type { MarketCode } from '@/lib/markets/types';

export const baseApiURL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.zyvoerp.com';

async function parseJsonResponse(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  if (!text.trim()) return {};

  const trimmed = text.trim();

  try {
    const data = JSON.parse(trimmed);
    if (typeof data === 'string') {
      const link = extractSignupLink(data);
      return link ? { success: true, link, message: data } : { message: data };
    }
    if (data && typeof data === 'object') {
      const record = data as Record<string, unknown>;
      const link = extractSignupLink(record);
      return link ? { ...record, success: true, link } : record;
    }
    return { message: text };
  } catch {
    const link = extractSignupLink(trimmed);
    return link ? { success: true, link, message: trimmed } : { message: trimmed };
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
  const signupLink = extractSignupLink(payload);

  if (signupLink) {
    return payload;
  }

  const extracted = extractApiError(payload);
  const isFailure =
    !response.ok ||
    payload.success === false ||
    payload.status === 'error' ||
    payload.status === false;

  if (isFailure) {
    throw buildSignupErrorFromPayload(payload, marketCode, response.status);
  }

  if (!signupLink) {
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
