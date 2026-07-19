import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getDb } from '@/lib/ai/db';
import { contentArticles, seoMetadata, factChecks } from '@/lib/ai/db/schema';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    await requireAdminAuth();
    const { id } = await params;
    const db = getDb();

    const article = db
      .select()
      .from(contentArticles)
      .where(eq(contentArticles.id, Number(id)))
      .get();

    if (!article) {
      return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 });
    }

    const seo = db
      .select()
      .from(seoMetadata)
      .where(eq(seoMetadata.articleId, article.id))
      .get();

    const factCheck = db
      .select()
      .from(factChecks)
      .where(eq(factChecks.articleId, article.id))
      .get();

    return NextResponse.json({ ...article, seo, factCheck });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    await requireAdminAuth();
    const { id } = await params;
    const body = await request.json();
    const db = getDb();
    const timestamp = new Date().toISOString();

    const article = db
      .select()
      .from(contentArticles)
      .where(eq(contentArticles.id, Number(id)))
      .get();

    if (!article) {
      return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 });
    }

    const updates: Partial<typeof contentArticles.$inferInsert> = { updatedAt: timestamp };

    if (body.title) updates.title = body.title;
    if (body.excerpt) updates.excerpt = body.excerpt;
    if (body.introduction) updates.introduction = body.introduction;
    if (body.content) updates.content = body.content;
    if (body.faq) updates.faq = body.faq;
    if (body.conclusion) updates.conclusion = body.conclusion;
    if (body.cta) updates.cta = body.cta;
    if (body.category) updates.category = body.category;
    if (body.status) {
      updates.status = body.status;
      if (body.status === 'published') {
        updates.publishedAt = timestamp;
      }
    }

    db.update(contentArticles).set(updates).where(eq(contentArticles.id, Number(id))).run();

    if (article.status === 'published' || body.status === 'published') {
      try {
        revalidatePath(`/${article.countryCode}/blog`);
        revalidatePath(`/${article.countryCode}/blog/${article.slug}`);
      } catch {
        // ignore outside request context
      }
    }

    const updated = db
      .select()
      .from(contentArticles)
      .where(eq(contentArticles.id, Number(id)))
      .get();

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    await requireAdminAuth();
    const { id } = await params;
    const db = getDb();

    db.delete(contentArticles).where(eq(contentArticles.id, Number(id))).run();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
