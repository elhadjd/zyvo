import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getResearchLogs } from '@/lib/ai/research-engine/research-logger';
import { researchEngine } from '@/lib/ai/research-engine';
import { runDailyResearchJob } from '@/lib/ai/research-engine/jobs/daily-research-job';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') ?? undefined;
    const limit = Number(searchParams.get('limit') ?? 100);
    return NextResponse.json(getResearchLogs(country ?? undefined, limit));
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const countryCode = body.countryCode ?? 'gn';
    const topic = body.topic;

    if (body.action === 'daily_research') {
      const result = await runDailyResearchJob(countryCode);
      return NextResponse.json(result);
    }

    if (body.action === 'search') {
      const result = await researchEngine.queryKnowledge(countryCode, body.query);
      return NextResponse.json(result);
    }

    const result = await researchEngine.runDailyResearch(countryCode, topic);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
