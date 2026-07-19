import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { managedSources } from '../db/schema';
import { COUNTRY_AI_CONFIGS } from '../countries/config';
import { logResearchEvent } from './research-logger';
import type { ManagedSource, SourceStatus, SourceType } from './types';
import type { SupportedCountry } from '../types';
import { TRUST_LEVELS } from './types';

function now(): string {
  return new Date().toISOString();
}

export function seedManagedSources(): void {
  const db = getDb();
  const timestamp = now();

  for (const config of COUNTRY_AI_CONFIGS) {
    for (const source of config.sources) {
      const existing = db
        .select()
        .from(managedSources)
        .where(eq(managedSources.url, source.url))
        .get();

      if (!existing) {
        const type = (source.type === 'institution' ? 'institution' : source.type) as SourceType;
        db.insert(managedSources)
          .values({
            countryCode: config.countryCode,
            name: source.name,
            url: source.url,
            type,
            category: 'Geral',
            trustLevel: TRUST_LEVELS[type] ?? 70,
            status: 'active',
            lastChecked: null,
            createdAt: timestamp,
            updatedAt: timestamp,
          })
          .run();
      }
    }
  }
}

export function getManagedSources(countryCode?: SupportedCountry, status?: SourceStatus): ManagedSource[] {
  const db = getDb();
  let sources = db.select().from(managedSources).all();
  if (countryCode) sources = sources.filter((s) => s.countryCode === countryCode);
  if (status) sources = sources.filter((s) => s.status === status);
  return sources as ManagedSource[];
}

export function getManagedSourceById(id: number): ManagedSource | undefined {
  const db = getDb();
  return db.select().from(managedSources).where(eq(managedSources.id, id)).get() as ManagedSource | undefined;
}

export function createManagedSource(data: {
  countryCode: SupportedCountry;
  name: string;
  url: string;
  type: SourceType;
  category: string;
  trustLevel?: number;
}): number {
  const db = getDb();
  const timestamp = now();
  const result = db
    .insert(managedSources)
    .values({
      countryCode: data.countryCode,
      name: data.name,
      url: data.url,
      type: data.type,
      category: data.category,
      trustLevel: data.trustLevel ?? TRUST_LEVELS[data.type] ?? 70,
      status: 'active',
      lastChecked: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
    .run();
  return Number(result.lastInsertRowid);
}

export function updateManagedSource(
  id: number,
  updates: Partial<Pick<ManagedSource, 'name' | 'url' | 'type' | 'category' | 'trustLevel' | 'status'>>
): void {
  const db = getDb();
  db.update(managedSources)
    .set({ ...updates, updatedAt: now() })
    .where(eq(managedSources.id, id))
    .run();
}

export function deleteManagedSource(id: number): void {
  const db = getDb();
  db.delete(managedSources).where(eq(managedSources.id, id)).run();
}

export async function testManagedSource(id: number): Promise<{ ok: boolean; statusCode?: number; error?: string }> {
  const source = getManagedSourceById(id);
  if (!source) return { ok: false, error: 'Fonte não encontrada' };

  try {
    const response = await fetch(source.url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(10_000),
      headers: { 'User-Agent': 'ZYVO-ResearchEngine/1.0' },
    });

    const db = getDb();
    db.update(managedSources)
      .set({
        status: response.ok ? 'active' : 'error',
        lastChecked: now(),
        updatedAt: now(),
      })
      .where(eq(managedSources.id, id))
      .run();

    logResearchEvent(source.countryCode, 'source_manager', 'test_source', `Fonte testada: ${source.name} (${response.status})`, {
      sourceId: id,
      statusCode: response.status,
    });

    return { ok: response.ok, statusCode: response.status };
  } catch (error) {
    const db = getDb();
    db.update(managedSources)
      .set({ status: 'error', lastChecked: now(), updatedAt: now() })
      .where(eq(managedSources.id, id))
      .run();

    const message = error instanceof Error ? error.message : 'Erro de conexão';
    return { ok: false, error: message };
  }
}

export function markSourceChecked(id: number): void {
  const db = getDb();
  db.update(managedSources)
    .set({ lastChecked: now(), updatedAt: now() })
    .where(eq(managedSources.id, id))
    .run();
}
