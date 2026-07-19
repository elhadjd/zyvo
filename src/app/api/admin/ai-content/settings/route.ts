import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getDb } from '@/lib/ai/db';
import { countryAiConfig } from '@/lib/ai/db/schema';
import { seedDatabase } from '@/lib/ai/db/seed';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAdminAuth();
    seedDatabase();

    const db = getDb();
    const configs = db.select().from(countryAiConfig).all();
    return NextResponse.json(configs);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const { countryCode, ...updates } = body;
    const db = getDb();
    const timestamp = new Date().toISOString();

    const allowedFields = [
      'enabled',
      'publishFrequency',
      'autoPublish',
      'requireApproval',
      'categories',
      'sources',
    ] as const;

    const setValues: Record<string, unknown> = { updatedAt: timestamp };
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        setValues[field] = updates[field];
      }
    }

    db.update(countryAiConfig)
      .set(setValues)
      .where(eq(countryAiConfig.countryCode, countryCode))
      .run();

    const config = db
      .select()
      .from(countryAiConfig)
      .where(eq(countryAiConfig.countryCode, countryCode))
      .get();

    return NextResponse.json(config);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
