import { and, eq } from 'drizzle-orm';
import { getDb } from './index';
import { programmaticPages } from './schema';
import type { SupportedCountry } from '../types';

function now(): string {
  return new Date().toISOString();
}

export interface ProgrammaticSeed {
  industry: string;
  title: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  content: string[];
  faq: { question: string; answer: string }[];
  cta: string;
}

export function seedProgrammaticPages(country: SupportedCountry, seeds: ProgrammaticSeed[]): number {
  const db = getDb();
  const timestamp = now();
  let seeded = 0;

  for (const seed of seeds) {
    const existing = db
      .select()
      .from(programmaticPages)
      .where(and(eq(programmaticPages.country, country), eq(programmaticPages.industry, seed.industry)))
      .get();

    if (existing) continue;

    db.insert(programmaticPages)
      .values({
        slug: seed.industry,
        country,
        industry: seed.industry,
        language: country === 'ao' || country === 'mz' ? 'pt' : 'fr',
        title: seed.title,
        metaTitle: seed.metaTitle,
        metaDescription: seed.metaDescription,
        headline: seed.headline,
        content: [...seed.content],
        faq: [...seed.faq],
        cta: seed.cta,
        keywords: seed.keywords,
        schemaData: {},
        status: 'published',
        createdAt: timestamp,
        updatedAt: timestamp,
        publishedAt: timestamp,
      })
      .run();
    seeded++;
  }

  return seeded;
}
