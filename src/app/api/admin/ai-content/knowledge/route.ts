import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getDb } from '@/lib/ai/db';
import { knowledgeBase } from '@/lib/ai/db/schema';
import { seedDatabase } from '@/lib/ai/db/seed';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    seedDatabase();

    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');

    const db = getDb();
    let entries = db.select().from(knowledgeBase).orderBy(desc(knowledgeBase.createdAt)).limit(100).all();

    if (country) {
      entries = entries.filter((e) => e.countryCode === country);
    }

    return NextResponse.json(entries);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
