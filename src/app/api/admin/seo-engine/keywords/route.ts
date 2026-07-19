import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getSeoKeywords } from '@/lib/ai/seo-engine';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') as 'gn' | 'sn' | 'ao' | 'mz' | null;
    return NextResponse.json(getSeoKeywords(country ?? undefined));
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
