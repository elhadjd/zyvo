import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { knowledgeBase, knowledgeDocuments } from '../db/schema';
import { extractContentFromUrl, extractKeyFacts } from './content-extractor';
import { validateSource } from './source-validator';
import { getManagedSources } from './source-manager';
import { logResearchEvent } from './research-logger';
import type { KnowledgeDocument, KnowledgeSearchResult, ValidationStatus } from './types';
import type { SupportedCountry } from '../types';

function now(): string {
  return new Date().toISOString();
}

export async function extractAndStoreDocument(
  countryCode: SupportedCountry,
  sourceId: number,
  category: string
): Promise<KnowledgeDocument | null> {
  const sources = getManagedSources(countryCode);
  const source = sources.find((s) => s.id === sourceId);
  if (!source) return null;

  logResearchEvent(countryCode, 'knowledge_storage', 'extract', `Extraindo: ${source.name}`);

  try {
    const extracted = await extractContentFromUrl(source.url);
    const keyFacts = extractKeyFacts(extracted.content);
    const enrichedContent = keyFacts.length
      ? `${extracted.content.slice(0, 4000)}\n\n--- Faits clés ---\n${keyFacts.join('\n')}`
      : extracted.content.slice(0, 5000);

    const validation = await validateSource(countryCode, sourceId, enrichedContent, extracted.title);
    const timestamp = now();
    const db = getDb();

    const result = db
      .insert(knowledgeDocuments)
      .values({
        countryCode,
        title: extracted.title,
        content: enrichedContent,
        sourceId,
        sourceUrl: source.url,
        sourceName: source.name,
        category,
        validationStatus: validation.status,
        extractedAt: extracted.extractedAt,
        createdAt: timestamp,
      })
      .run();

    const docId = Number(result.lastInsertRowid);

    if (validation.status === 'validated') {
      syncToKnowledgeBase(countryCode, docId, extracted.title, enrichedContent, source, category);
    }

    logResearchEvent(countryCode, 'knowledge_storage', 'stored', `Documento #${docId}: ${validation.status}`, {
      docId,
      validation: validation.status,
    });

    return {
      id: docId,
      countryCode,
      title: extracted.title,
      content: enrichedContent,
      sourceId,
      sourceUrl: source.url,
      sourceName: source.name,
      category,
      validationStatus: validation.status,
      extractedAt: extracted.extractedAt,
      createdAt: timestamp,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro de extração';
    logResearchEvent(countryCode, 'knowledge_storage', 'error', message, { level: 'error', sourceId });
    return null;
  }
}

function syncToKnowledgeBase(
  countryCode: SupportedCountry,
  docId: number,
  title: string,
  content: string,
  source: { name: string; url: string },
  category: string
): void {
  const db = getDb();
  const timestamp = now();

  db.insert(knowledgeBase)
    .values({
      countryCode,
      title,
      sourceId: null,
      sourceUrl: source.url,
      sourceTitle: source.name,
      category,
      keywords: [],
      summary: content.slice(0, 500),
      content: content.slice(0, 3000),
      referenceDate: timestamp.split('T')[0],
      verified: true,
      taskId: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
    .run();
}

export function searchKnowledge(
  countryCode: SupportedCountry,
  query: string,
  limit = 10
): KnowledgeSearchResult {
  const db = getDb();
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter((t) => t.length > 2);

  const documents = db
    .select()
    .from(knowledgeDocuments)
    .all()
    .filter((d) => d.countryCode === countryCode && d.validationStatus === 'validated')
    .map((d) => ({
      ...d,
      relevance: scoreRelevance(`${d.title} ${d.content}`, queryTerms),
    }))
    .filter((d) => d.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit) as (KnowledgeDocument & { relevance: number })[];

  const knowledgeEntries = db
    .select()
    .from(knowledgeBase)
    .all()
    .filter((k) => k.countryCode === countryCode)
    .map((k) => ({
      ...k,
      relevance: scoreRelevance(`${k.title} ${k.summary} ${k.content}`, queryTerms),
    }))
    .filter((k) => k.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map((k) => ({
      id: k.id,
      title: k.title,
      summary: k.summary,
      sourceUrl: k.sourceUrl,
      category: k.category,
    }));

  return {
    documents: documents.map(({ relevance: _, ...d }) => d),
    knowledgeEntries,
    query,
    totalResults: documents.length + knowledgeEntries.length,
  };
}

function scoreRelevance(text: string, terms: string[]): number {
  const lower = text.toLowerCase();
  return terms.reduce((score, term) => score + (lower.includes(term) ? 1 : 0), 0);
}

export function getKnowledgeDocuments(
  countryCode?: SupportedCountry,
  status?: ValidationStatus
): KnowledgeDocument[] {
  const db = getDb();
  let docs = db.select().from(knowledgeDocuments).all();
  if (countryCode) docs = docs.filter((d) => d.countryCode === countryCode);
  if (status) docs = docs.filter((d) => d.validationStatus === status);
  return docs as KnowledgeDocument[];
}

export function approveKnowledgeDocument(id: number): void {
  const db = getDb();
  const doc = db.select().from(knowledgeDocuments).where(eq(knowledgeDocuments.id, id)).get();
  if (!doc) return;

  db.update(knowledgeDocuments)
    .set({ validationStatus: 'validated' })
    .where(eq(knowledgeDocuments.id, id))
    .run();

  syncToKnowledgeBase(
    doc.countryCode as SupportedCountry,
    id,
    doc.title,
    doc.content,
    { name: doc.sourceName, url: doc.sourceUrl },
    doc.category
  );
}

export function rejectKnowledgeDocument(id: number): void {
  const db = getDb();
  db.update(knowledgeDocuments)
    .set({ validationStatus: 'rejected' })
    .where(eq(knowledgeDocuments.id, id))
    .run();
}
