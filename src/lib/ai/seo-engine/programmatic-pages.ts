import { and, eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getDb } from '../db';
import { programmaticPages } from '../db/schema';
import type { SupportedCountry } from '../types';
import { getCountryConfig } from '../countries';
import { PROGRAMMATIC_INDUSTRIES } from './types';
import {
  generateFaqSchema,
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
} from './schema-generator';
import { generateMetaTitle, generateMetaDescription, generateSlug } from './meta-generator';

function now(): string {
  return new Date().toISOString();
}

function getIndustryLabel(industry: string, language: string): string {
  const found = PROGRAMMATIC_INDUSTRIES.find((i) => i.slug === industry);
  if (!found) return industry;
  if (language === 'pt') return found.labels.pt;
  if (language === 'en') return found.labels.en;
  return found.labels.fr;
}

export function getProgrammaticPages(country?: SupportedCountry, status?: string) {
  const db = getDb();
  let pages = country
    ? db.select().from(programmaticPages).where(eq(programmaticPages.country, country)).all()
    : db.select().from(programmaticPages).all();

  if (status) pages = pages.filter((p) => p.status === status);
  return pages;
}

export function getProgrammaticPage(country: SupportedCountry, industry: string) {
  const db = getDb();
  return db
    .select()
    .from(programmaticPages)
    .where(and(eq(programmaticPages.country, country), eq(programmaticPages.industry, industry)))
    .get();
}

export async function generateProgrammaticPage(
  countryCode: SupportedCountry,
  industry: string
): Promise<number | null> {
  const existing = getProgrammaticPage(countryCode, industry);
  if (existing) return existing.id;

  const config = getCountryConfig(countryCode);
  if (!config) return null;

  const industryLabel = getIndustryLabel(industry, config.language);
  const title =
    config.language === 'pt'
      ? `ZYVO ERP para ${industryLabel} em ${config.countryName}`
      : `ZYVO ERP pour les ${industryLabel} en ${config.countryName}`;

  const prompt = `Create unique SEO content for a programmatic landing page.
Return JSON:
{
  "headline": "compelling headline",
  "content": ["paragraph 1", "paragraph 2", "paragraph 3", "paragraph 4"],
  "faq": [{"question": "...", "answer": "..."}],
  "cta": "call to action text",
  "keywords": "comma separated keywords",
  "excerpt": "brief description for meta"
}

Page: ${title}
Industry: ${industryLabel}
Country: ${config.countryName}
Language: ${config.language}
Focus on local business needs, compliance, and ZYVO ERP benefits.`;

  try {
    const response = await deepseekService.chat(
      [
        {
          role: 'system',
          content: `You are a SaaS copywriter for ${config.countryName}. Write in ${config.language === 'pt' ? 'Portuguese' : 'French'}. Return valid JSON.`,
        },
        { role: 'user', content: prompt },
      ],
      { jsonMode: true, temperature: 0.5, agentCode: 'seo_optimizer', countryCode }
    );

    const data = deepseekService.parseJson<{
      headline: string;
      content: string[];
      faq: { question: string; answer: string }[];
      cta: string;
      keywords: string;
      excerpt: string;
    }>(response.content);

    const slug = industry;
    const metaTitle = generateMetaTitle(data.headline, countryCode);
    const metaDescription = generateMetaDescription(data.excerpt, industryLabel, countryCode);
    const timestamp = now();

    const schemaData = {
      organization: generateOrganizationSchema(countryCode),
      software: generateSoftwareApplicationSchema(countryCode),
      faq: generateFaqSchema(data.faq ?? []),
    };

    const db = getDb();
    const result = db
      .insert(programmaticPages)
      .values({
        slug,
        country: countryCode,
        industry,
        language: config.language,
        title,
        metaTitle,
        metaDescription,
        headline: data.headline,
        content: data.content ?? [],
        faq: data.faq ?? [],
        cta: data.cta ?? 'Demander une démo',
        keywords: data.keywords ?? industryLabel,
        schemaData,
        status: 'published',
        createdAt: timestamp,
        updatedAt: timestamp,
        publishedAt: timestamp,
      })
      .run();

    return Number(result.lastInsertRowid);
  } catch {
    return null;
  }
}

export async function generateAllProgrammaticPages(
  countryCode: SupportedCountry
): Promise<number> {
  let created = 0;
  for (const industry of PROGRAMMATIC_INDUSTRIES) {
    const id = await generateProgrammaticPage(countryCode, industry.slug);
    if (id) created++;
  }
  return created;
}

export function publishProgrammaticPage(id: number): void {
  const db = getDb();
  const timestamp = now();
  db.update(programmaticPages)
    .set({ status: 'published', publishedAt: timestamp, updatedAt: timestamp })
    .where(eq(programmaticPages.id, id))
    .run();
}
