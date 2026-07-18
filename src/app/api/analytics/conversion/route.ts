import { NextResponse } from 'next/server';
import { trackConversion } from '@/lib/ai/growth-analytics';
import type { ConversionAction } from '@/lib/ai/growth-analytics/types';
import type { SupportedCountry } from '@/lib/ai/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_ACTIONS: ConversionAction[] = [
  'signup',
  'demo_request',
  'free_trial_click',
  'whatsapp_contact',
  'contact_form',
  'pricing_view',
];

const VALID_COUNTRIES: SupportedCountry[] = ['gn', 'sn', 'ao', 'mz'];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userAction = body.userAction as ConversionAction;
    const page = body.page as string;
    const country = (body.country ?? 'gn') as SupportedCountry;
    const source = body.source as string | undefined;

    if (!userAction || !VALID_ACTIONS.includes(userAction)) {
      return NextResponse.json({ error: 'Invalid userAction' }, { status: 400 });
    }
    if (!page) {
      return NextResponse.json({ error: 'page is required' }, { status: 400 });
    }
    if (!VALID_COUNTRIES.includes(country)) {
      return NextResponse.json({ error: 'Invalid country' }, { status: 400 });
    }

    const id = trackConversion({
      userAction,
      page,
      country,
      source,
      metadata: body.metadata,
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
