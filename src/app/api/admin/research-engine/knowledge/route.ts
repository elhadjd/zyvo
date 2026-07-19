import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import {
  getKnowledgeDocuments,
  approveKnowledgeDocument,
  rejectKnowledgeDocument,
  searchKnowledge,
} from '@/lib/ai/research-engine/knowledge-storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') ?? undefined;
    const query = searchParams.get('q');
    const status = searchParams.get('status') ?? undefined;

    if (query && country) {
      return NextResponse.json(searchKnowledge(country as 'gn', query));
    }

    return NextResponse.json(
      getKnowledgeDocuments(country as 'gn' | undefined, status as 'validated' | undefined)
    );
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminAuth();
    const { id, action } = await request.json();

    if (action === 'approve') approveKnowledgeDocument(id);
    else if (action === 'reject') rejectKnowledgeDocument(id);
    else return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
