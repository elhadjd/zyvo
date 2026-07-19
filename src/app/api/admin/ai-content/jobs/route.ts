import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getJobsByStatus } from '@/lib/ai/jobs/queue';
import { processAllPendingJobs } from '@/lib/ai/jobs/processor';
import { seedDatabase } from '@/lib/ai/db/seed';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    seedDatabase();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') ?? undefined;
    const country = searchParams.get('country') ?? undefined;
    const jobs = getJobsByStatus(status as 'pending' | undefined, country ?? undefined);
    return NextResponse.json(jobs);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const { action, maxJobs = 10 } = body;

    if (action === 'process') {
      const processed = await processAllPendingJobs(maxJobs);
      return NextResponse.json({ processed });
    }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
