import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import { seedDatabase } from '@/lib/ai/db/seed';
import {
  getConfiguredCountries,
  getEnabledCountryCodes,
} from '@/lib/ai/countries/registry';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAdminAuth();
    seedDatabase();

    const configured = getConfiguredCountries().map((c) => ({
      countryCode: c.countryCode,
      countryName: c.countryName,
      language: c.language,
      locale: c.locale,
      enabled: c.enabled ?? true,
      categoriesCount: c.categories.length,
      topicsCount: c.topics.length,
      sourcesCount: c.sources.length,
    }));

    const enabled = getEnabledCountryCodes();

    return NextResponse.json({
      configured,
      enabled,
      total: configured.length,
      active: enabled.length,
    });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
