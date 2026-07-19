import { NextResponse } from 'next/server';
import { runFullPipeline } from '@/lib/ai/agents/orchestrator';
import { runDailyResearchJob } from '@/lib/ai/research-engine/jobs/daily-research-job';
import {
  runMultiCountryPipeline,
  runMultiCountryResearch,
} from '@/lib/ai/jobs/multi-country-pipeline';
import { getEnabledCountryCodes, isConfiguredCountry } from '@/lib/ai/countries/registry';
import type { AgentCode, SupportedCountry } from '@/lib/ai/types';

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

  const { searchParams } = new URL(request.url);
  const countryParam = searchParams.get('country');
  const stage = searchParams.get('stage');
  const mode = searchParams.get('mode') ?? (countryParam ? 'single' : 'all');

  try {
    // Multi-country: research for all enabled countries
    if (mode === 'research-all') {
      const results = await runMultiCountryResearch();
      return NextResponse.json({ mode: 'research-all', countries: getEnabledCountryCodes(), results });
    }

    // Multi-country: full pipeline for all enabled countries
    if (mode === 'all') {
      const result = await runMultiCountryPipeline({
        saveAsDraft: searchParams.get('publish') !== 'true',
        publishNow: searchParams.get('publish') === 'true',
        articlesPerCountry: Number(searchParams.get('perCountry') ?? 1),
        recentDays: Number(searchParams.get('recentDays') ?? 14),
      });
      return NextResponse.json(result);
    }

    const country = (countryParam ?? 'gn') as SupportedCountry;

    if (!isConfiguredCountry(country)) {
      return NextResponse.json({ error: `País não configurado: ${country}` }, { status: 400 });
    }

    if (mode === 'research') {
      const result = await runDailyResearchJob(country);
      return NextResponse.json(result);
    }

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
