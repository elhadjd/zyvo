import { and, eq } from 'drizzle-orm';
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

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; ZYVO-ResearchEngine/1.0)',
  Accept: 'text/html,application/xhtml+xml',
};

/** URLs substituídas no config — removidas da lista activa no seed */
const OBSOLETE_SOURCE_URLS = new Set([
  'https://anss.gov.gn',
  'https://ccig.org.gn',
  'https://www.commerce.gov.gn',
  'https://www.impots.gouv.sn',
  'https://www.apix.sn',
]);

function deactivateObsoleteSources(timestamp: string): void {
  const db = getDb();

  for (const url of OBSOLETE_SOURCE_URLS) {
    db.update(managedSources)
      .set({ status: 'inactive', updatedAt: timestamp })
      .where(eq(managedSources.url, url))
      .run();
  }

  for (const config of COUNTRY_AI_CONFIGS) {
    const configNames = new Set(config.sources.map((s) => s.name));
    const configUrls = new Set(config.sources.map((s) => s.url));

    const countrySources = db
      .select()
      .from(managedSources)
      .where(eq(managedSources.countryCode, config.countryCode))
      .all();

    for (const source of countrySources) {
      if (source.status === 'inactive') continue;
      if (source.category !== 'Geral') continue;
      if (configNames.has(source.name) || configUrls.has(source.url)) continue;

      db.update(managedSources)
        .set({ status: 'inactive', updatedAt: timestamp })
        .where(eq(managedSources.id, source.id))
        .run();
    }
  }
}

export function seedManagedSources(): void {
  const db = getDb();
  const timestamp = now();

  for (const config of COUNTRY_AI_CONFIGS) {
    for (const source of config.sources) {
      const type = (source.type === 'institution' ? 'institution' : source.type) as SourceType;

      const byName = db
        .select()
        .from(managedSources)
        .where(
          and(eq(managedSources.countryCode, config.countryCode), eq(managedSources.name, source.name))
        )
        .get();

      if (byName) {
        if (byName.url !== source.url || byName.type !== type) {
          db.update(managedSources)
            .set({
              url: source.url,
              type,
              status: 'active',
              updatedAt: timestamp,
            })
            .where(eq(managedSources.id, byName.id))
            .run();
        }
        continue;
      }

      const byUrl = db.select().from(managedSources).where(eq(managedSources.url, source.url)).get();

      if (!byUrl) {
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

  deactivateObsoleteSources(timestamp);
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
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(20_000),
      headers: FETCH_HEADERS,
    });

    const ok = response.status >= 200 && response.status < 400;

    const db = getDb();
    db.update(managedSources)
      .set({
        status: ok ? 'active' : 'error',
        lastChecked: now(),
        updatedAt: now(),
      })
      .where(eq(managedSources.id, id))
      .run();

    logResearchEvent(source.countryCode, 'source_manager', 'test_source', `Fonte testada: ${source.name} (${response.status})`, {
      sourceId: id,
      statusCode: response.status,
    });

    return { ok, statusCode: response.status };
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

export async function testAllManagedSources(countryCode: SupportedCountry): Promise<{ tested: number; active: number; failed: number }> {
  const sources = getManagedSources(countryCode);
  let active = 0;
  let failed = 0;

  for (const source of sources) {
    const result = await testManagedSource(source.id);
    if (result.ok) active++;
    else failed++;
  }

  return { tested: sources.length, active, failed };
}

export function markSourceChecked(id: number): void {
  const db = getDb();
  db.update(managedSources)
    .set({ lastChecked: now(), updatedAt: now() })
    .where(eq(managedSources.id, id))
    .run();
}
