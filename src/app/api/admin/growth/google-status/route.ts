import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import { growthAnalyticsEngine, purgeDemoGoogleMetrics } from '@/lib/ai/growth-analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAdminAuth();
    const status = await growthAnalyticsEngine.testGoogleConnection();
    return NextResponse.json(status);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminAuth();
    const body = await request.json().catch(() => ({}));
    const action = body.action as string | undefined;

    if (action === 'purge_demo') {
      const removed = purgeDemoGoogleMetrics();
      return NextResponse.json({
        ok: true,
        message: 'Dados demo removidos. Execute Sync GSC/GA4 para importar dados reais.',
        removed,
      });
    }

    const status = await growthAnalyticsEngine.testGoogleConnection();
    return NextResponse.json(status);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
