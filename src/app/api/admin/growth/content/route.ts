import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import {
  getContentScores,
  getTopArticles,
  getWeakArticles,
} from '@/lib/ai/growth-analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const country = (searchParams.get('country') ?? 'gn') as 'gn' | 'sn' | 'ao' | 'mz';
    const type = searchParams.get('type') ?? 'all';

    if (type === 'top') return NextResponse.json(getTopArticles(country));
    if (type === 'weak') return NextResponse.json(getWeakArticles(country));
    return NextResponse.json(getContentScores(country));
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
