import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getDashboardStats } from '@/lib/ai/dashboard';
import { seedDatabase } from '@/lib/ai/db/seed';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    seedDatabase();

    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') ?? undefined;

    const stats = getDashboardStats(country);
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
