import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/ai/auth';
import {
  getManagedSources,
  createManagedSource,
  updateManagedSource,
  deleteManagedSource,
  testManagedSource,
  testAllManagedSources,
  seedManagedSources,
} from '@/lib/ai/research-engine/source-manager';
import type { SupportedCountry } from '@/lib/ai/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    seedManagedSources();
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') as SupportedCountry | null;
    const includeInactive = searchParams.get('includeInactive') === '1';
    const sources = getManagedSources(country ?? undefined, includeInactive ? undefined : 'active');
    return NextResponse.json(sources);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminAuth();
    const body = await request.json();

    if (body.action === 'test' && body.id) {
      const result = await testManagedSource(body.id);
      return NextResponse.json(result);
    }

    if (body.action === 'test_all' && body.countryCode) {
      const result = await testAllManagedSources(body.countryCode as SupportedCountry);
      return NextResponse.json(result);
    }

    const id = createManagedSource(body);
    return NextResponse.json({ id });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminAuth();
    const { id, ...updates } = await request.json();
    updateManagedSource(id, updates);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    deleteManagedSource(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
