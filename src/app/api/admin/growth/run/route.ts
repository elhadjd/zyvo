import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import {
  growthAnalyticsEngine,
  runWeeklyGrowthJob,
  getConversionSummary,
  getRefreshTasks,
  analyzeTraffic,
  purgeDemoGoogleMetrics,
} from '@/lib/ai/growth-analytics';
import type { SupportedCountry } from '@/lib/ai/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') as SupportedCountry | null;
    const type = searchParams.get('type') ?? 'conversions';

    if (type === 'conversions') return NextResponse.json(getConversionSummary(country ?? undefined));
    if (type === 'refresh') return NextResponse.json(getRefreshTasks(country ?? undefined));
    if (type === 'traffic') return NextResponse.json(analyzeTraffic(country ?? undefined));
    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
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
      case 'full_analysis':
        return NextResponse.json(await growthAnalyticsEngine.runFullAnalysis(countryCode));
      case 'sync_data':
        return NextResponse.json(await growthAnalyticsEngine.syncExternalData(countryCode));
      case 'test_google':
        return NextResponse.json(await growthAnalyticsEngine.testGoogleConnection());
      case 'purge_demo':
        return NextResponse.json({ ok: true, removed: purgeDemoGoogleMetrics() });
      case 'weekly_report':
        return NextResponse.json(await growthAnalyticsEngine.generateReport(countryCode));
      case 'weekly_job':
        return NextResponse.json(await runWeeklyGrowthJob(countryCode));
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
