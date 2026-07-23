import { NextResponse } from 'next/server';
import { sanitizeApiPayloadForClient } from '@/lib/api-errors';
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
    let data: unknown = { success: response.ok };
    if (responseText.trim()) {
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { success: false, message: responseText };
      }
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
