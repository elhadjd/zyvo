import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getGrowthDashboardStats } from '@/lib/ai/growth-analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') as 'gn' | 'sn' | 'ci' | 'ao' | 'mz' | null;
    return NextResponse.json(getGrowthDashboardStats(country ?? undefined));
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
