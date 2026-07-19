import { NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getDb } from '@/lib/ai/db';
import { contentArticles, seoMetadata, factChecks } from '@/lib/ai/db/schema';
import { seedDatabase } from '@/lib/ai/db/seed';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    seedDatabase();

    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const status = searchParams.get('status');

    const db = getDb();
    let articles = db.select().from(contentArticles).orderBy(desc(contentArticles.createdAt)).all();

    if (country) {
      articles = articles.filter((a) => a.countryCode === country);
    }
    if (status) {
      articles = articles.filter((a) => a.status === status);
    }

    const enriched = articles.map((article) => {
      const seo = db
        .select()
        .from(seoMetadata)
        .where(eq(seoMetadata.articleId, article.id))
        .get();
      const factCheck = db
        .select()
        .from(factChecks)
        .where(eq(factChecks.articleId, article.id))
        .orderBy(desc(factChecks.createdAt))
        .get();
      return { ...article, seo, factCheck };
    });

    return NextResponse.json(enriched);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
