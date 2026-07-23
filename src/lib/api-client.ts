import { ApiRequestError } from '@/lib/api-errors';

export const baseApiURL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.zyvoerp.com';

async function parseJsonResponse(response: Response): Promise<Record<string, unknown>> {
  try {
    const data = await response.json();
    return data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function extractFieldErrors(payload: Record<string, unknown>): Record<string, string> {
  const errors = payload.errors;
  if (!errors || typeof errors !== 'object' || Array.isArray(errors)) return {};

  const mapped: Record<string, string> = {};
  for (const [field, value] of Object.entries(errors as Record<string, unknown>)) {
    const message = Array.isArray(value) ? value[0] : value;
    if (typeof message === 'string' && message.trim()) {
      mapped[field] = message.trim();
    }
  }
  return mapped;
}

function getErrorMessage(payload: Record<string, unknown>): string {
  if (typeof payload.message === 'string' && payload.message.trim()) {
    return payload.message.trim();
  }
  if (typeof payload.error === 'string' && payload.error.trim()) {
    return payload.error.trim();
  }
  const data = payload.data;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const nested = data as Record<string, unknown>;
    if (typeof nested.message === 'string' && nested.message.trim()) {
      return nested.message.trim();
    }
  }
  return 'Request failed';
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
    throw new ApiRequestError(getErrorMessage(payload), response.status, payload);
  }
  return payload;
}

export async function submitSignup(data: Record<string, unknown>) {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const payload = await parseJsonResponse(response);
  const fieldErrors = extractFieldErrors(payload);

  if (!response.ok || payload.success === false) {
    throw new ApiRequestError(
      getErrorMessage(payload),
      response.status,
      payload,
      fieldErrors
    );
  }

  const nested = payload.data;
  const link =
    (nested && typeof nested === 'object' && !Array.isArray(nested)
      ? (nested as Record<string, unknown>).link
      : undefined) ?? payload.link;

  if (typeof link !== 'string' || !link.trim()) {
    throw new ApiRequestError(
      typeof payload.message === 'string' ? payload.message : 'Missing signup link',
      response.status || 502,
      payload,
      fieldErrors
    );
  }

  return payload;
}
