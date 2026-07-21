import { NextResponse } from 'next/server';
import { processActiveBatches } from '@/lib/ai/jobs/batch-runner';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const CRON_SECRET = process.env.CRON_SECRET;

function authorize(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  return !CRON_SECRET || authHeader === `Bearer ${CRON_SECRET}` || secret === CRON_SECRET;
}

export async function GET(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const processed = await processActiveBatches(1);
    return NextResponse.json({ processed, message: processed > 0 ? 'Batch avançado' : 'Nenhum batch activo' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
