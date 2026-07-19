import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import {
  getProgrammaticPages,
  runSeoOptimizationJob,
  syncAllSitemaps,
  generateAllProgrammaticPages,
} from '@/lib/ai/seo-engine';
import {
  getPendingFreshnessChecks,
  runContentUpdateAgent,
} from '@/lib/ai/seo-engine/agents/content-update-agent';
import type { SupportedCountry } from '@/lib/ai/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') ?? 'programmatic';
    const country = searchParams.get('country') as SupportedCountry | null;

    if (type === 'freshness') {
      return NextResponse.json(getPendingFreshnessChecks());
    }

    return NextResponse.json(getProgrammaticPages(country ?? undefined));
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const action = body.action as string;
    const countryCode = (body.countryCode ?? 'gn') as SupportedCountry;

    switch (action) {
      case 'full_optimization':
        return NextResponse.json(await runSeoOptimizationJob(countryCode));
      case 'sync_sitemaps':
        return NextResponse.json(syncAllSitemaps());
      case 'generate_programmatic':
        return NextResponse.json({ created: await generateAllProgrammaticPages(countryCode) });
      case 'freshness_check':
        return NextResponse.json({ flagged: await runContentUpdateAgent({ countryCode }) });
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
