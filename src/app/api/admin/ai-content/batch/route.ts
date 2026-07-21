import { NextResponse } from 'next/server';
import { after } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import { parseArticlesPerCountry } from '@/lib/ai/jobs/article-count';
import {
  createBatchRun,
  getBatchStatus,
  getLatestActiveBatch,
  processBatchTick,
} from '@/lib/ai/jobs/batch-runner';
import { SITE_AI_COUNTRIES } from '@/lib/ai/country-labels';
import type { SupportedCountry } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const batchId = Number(searchParams.get('id') ?? 0);

    if (batchId > 0) {
      const status = getBatchStatus(batchId);
      if (!status) return NextResponse.json({ error: 'Batch não encontrado' }, { status: 404 });
      return NextResponse.json(status);
    }

    const active = getLatestActiveBatch();
    return NextResponse.json(active ?? { status: 'idle' });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const { action } = body;

    if (action === 'start') {
      const countryCodes = (body.countryCodes as SupportedCountry[] | undefined)?.filter(Boolean);
      const allCountries = body.allCountries === true;

      const batchId = createBatchRun({
        countryCodes: allCountries ? [...SITE_AI_COUNTRIES] : countryCodes,
        articlesPerCountry: parseArticlesPerCountry(body.articlesPerCountry),
        topic: body.topic,
        publishNow: body.publishNow ?? true,
        recentDays: Number(body.recentDays ?? 14),
        siteCountriesOnly: allCountries,
      });

      after(async () => {
        try {
          await processBatchTick(batchId);
        } catch {
          // cron / client poll will continue the batch
        }
      });

      return NextResponse.json(
        {
          batchId,
          status: 'pending',
          message: 'Geração iniciada em segundo plano. Pode fechar esta página.',
        },
        { status: 202 }
      );
    }

    if (action === 'tick') {
      const batchId = Number(body.batchId);
      if (!batchId) {
        return NextResponse.json({ error: 'batchId obrigatório' }, { status: 400 });
      }

      const status = await processBatchTick(batchId);
      if (!status) {
        return NextResponse.json({ error: 'Batch não encontrado' }, { status: 404 });
      }

      return NextResponse.json(status);
    }

    if (action === 'status') {
      const batchId = Number(body.batchId);
      const status = batchId ? getBatchStatus(batchId) : getLatestActiveBatch();
      if (!status) {
        return NextResponse.json({ error: 'Batch não encontrado' }, { status: 404 });
      }
      return NextResponse.json(status);
    }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    if (message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
