import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getDiscoveredKeywords } from '@/lib/ai/research-engine/keyword-discovery';
import { getContentOpportunities } from '@/lib/ai/research-engine/opportunity-finder';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') ?? undefined;
    const type = searchParams.get('type') ?? 'keywords';

    if (type === 'opportunities') {
      return NextResponse.json(getContentOpportunities(country as 'gn' | undefined));
    }

    return NextResponse.json(getDiscoveredKeywords(country as 'gn' | undefined));
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
