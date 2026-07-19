import { NextResponse } from 'next/server';

const API_BASE = process.env.ZYVO_API_BASE_URL ?? 'https://app.zyvoerp.com/api';
const API_KEY = process.env.ZYVO_API_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!API_KEY) {
      console.error('ZYVO_API_KEY is not configured');
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(`${API_BASE}/site/contacts/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        ...body,
        key: API_KEY,
        country: body.country ?? body.market ?? undefined,
        source: body.source ?? 'website',
        page: body.page ?? undefined,
      }),
    });

    const data = await response.json().catch(() => ({ success: response.ok }));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit contact form' }, { status: 500 });
  }
}
