import { NextResponse } from 'next/server';
import { runWeeklyGrowthJob } from '@/lib/ai/growth-analytics';
import { getEnabledCountryCodes } from '@/lib/ai/countries/registry';
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

  const countryParam = searchParams.get('country');
  const mode = searchParams.get('mode') ?? (countryParam ? 'single' : 'all');

  try {
    if (mode === 'all') {
      const countries = getEnabledCountryCodes();
      const results = [];
      for (const country of countries) {
        const result = await runWeeklyGrowthJob(country);
        results.push({ country, ...result });
      }
      return NextResponse.json({ mode: 'all', countries, results });
    }

    const country = (countryParam ?? 'gn') as SupportedCountry;
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
