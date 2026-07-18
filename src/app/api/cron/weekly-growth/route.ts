import { NextResponse } from 'next/server';
import { runWeeklyGrowthJob } from '@/lib/ai/growth-analytics';
import type { SupportedCountry } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}` && secret !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const country = (searchParams.get('country') ?? 'gn') as SupportedCountry;

  try {
    const result = await runWeeklyGrowthJob(country);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
