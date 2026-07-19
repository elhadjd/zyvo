import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getDb } from '@/lib/ai/db';
import { aiAgents } from '@/lib/ai/db/schema';
import { seedDatabase } from '@/lib/ai/db/seed';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAdminAuth();
    seedDatabase();

    const db = getDb();
    const agents = db.select().from(aiAgents).all();
    return NextResponse.json(agents);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminAuth();
    const { code, enabled } = await request.json();
    const db = getDb();
    const timestamp = new Date().toISOString();

    db.update(aiAgents)
      .set({ enabled, updatedAt: timestamp })
      .where(eq(aiAgents.code, code))
      .run();

    const agent = db.select().from(aiAgents).where(eq(aiAgents.code, code)).get();
    return NextResponse.json(agent);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
