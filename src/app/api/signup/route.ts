import { NextResponse } from 'next/server';
import { extractSignupLink, sanitizeApiPayloadForClient } from '@/lib/api-errors';
import type { MarketCode } from '@/lib/markets/types';

const API_BASE = process.env.ZYVO_API_BASE_URL ?? 'https://app.zyvoerp.com/api';
const API_KEY = process.env.ZYVO_API_KEY;

function resolveMarketCode(body: Record<string, unknown>): MarketCode {
  const market = body.market ?? body.country;
  if (typeof market === 'string') {
    const code = market.toLowerCase();
    if (code === 'gn' || code === 'sn' || code === 'ci' || code === 'ao' || code === 'us') {
      return code;
    }
  }
  const country = body.country;
  if (country && typeof country === 'object' && !Array.isArray(country)) {
    const code = (country as Record<string, unknown>).code;
    if (typeof code === 'string') {
      const normalized = code.toLowerCase();
      if (normalized === 'gn' || normalized === 'sn' || normalized === 'ci' || normalized === 'ao') {
        return normalized;
      }
    }
  }
  return 'us';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const marketCode = resolveMarketCode(body);

    if (!API_KEY) {
      console.error('ZYVO_API_KEY is not configured');
      return NextResponse.json(
        sanitizeApiPayloadForClient({ success: false, message: 'Server configuration error' }, marketCode),
        { status: 500 }
      );
    }

    const response = await fetch(`${API_BASE}/app/save-company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    const trimmed = responseText.trim();
    let data: unknown = { success: response.ok };

    if (trimmed) {
      try {
        const parsed = JSON.parse(trimmed);
        if (typeof parsed === 'string') {
          const link = extractSignupLink(parsed);
          data = link ? { success: true, link, message: parsed } : { message: parsed };
        } else {
          data = parsed;
        }
      } catch {
        const link = extractSignupLink(trimmed);
        data = link ? { success: true, link, message: trimmed } : { success: false, message: responseText };
      }
    }

    const signupLink = extractSignupLink(data);
    if (signupLink) {
      const record = data && typeof data === 'object' && !Array.isArray(data)
        ? (data as Record<string, unknown>)
        : { link: signupLink };
      return NextResponse.json({ ...record, success: true, link: signupLink }, { status: 200 });
    }

    const sanitized = sanitizeApiPayloadForClient(data, marketCode);
    return NextResponse.json(sanitized, { status: response.status });
  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      sanitizeApiPayloadForClient({ success: false, message: 'Failed to create company' }, 'us'),
      { status: 500 }
    );
  }
}
