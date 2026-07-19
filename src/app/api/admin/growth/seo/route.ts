import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import {
  getGrowthOpportunities,
  getRecommendations,
  getGrowthReports,
  getLatestReport,
  getKeywordGrowth,
  analyzeSearchPerformance,
} from '@/lib/ai/growth-analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const country = (searchParams.get('country') ?? 'gn') as 'gn' | 'sn' | 'ci' | 'ao' | 'mz';
    const type = searchParams.get('type') ?? 'opportunities';

    switch (type) {
      case 'opportunities':
        return NextResponse.json(getGrowthOpportunities(country));
      case 'recommendations':
        return NextResponse.json(getRecommendations(country));
      case 'reports':
        return NextResponse.json(getGrowthReports(country));
      case 'latest-report':
        return NextResponse.json(getLatestReport(country));
      case 'keyword-growth':
        return NextResponse.json(getKeywordGrowth(country));
      case 'search':
        return NextResponse.json(analyzeSearchPerformance(country));
      default:
        return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
