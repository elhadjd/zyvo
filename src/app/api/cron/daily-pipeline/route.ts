import { NextResponse } from 'next/server';
import { runFullPipeline } from '@/lib/ai/agents/orchestrator';
import type { AgentCode, SupportedCountry } from '@/lib/ai/types';

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
  const stage = searchParams.get('stage');

  try {
    if (stage) {
      const result = await runFullPipeline(country, {
        stages: [stage as AgentCode],
      });
      return NextResponse.json(result);
    }

    const result = await runFullPipeline(country);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
