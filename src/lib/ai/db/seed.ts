import { eq } from 'drizzle-orm';
import { getDb } from './index';
import { aiAgents, countryAiConfig } from './schema';
import { runMigrations } from './migrate';
import { syncCountryConfigsToDatabase } from '../countries/registry';
import { AGENT_DEFINITIONS } from '../types';
import { AGENT_PROMPTS } from '../agents/prompts';
import { seedManagedSources } from '../research-engine/source-manager';
import { seedGuineaProgrammaticPages } from './seed-guinea';
import { seedSenegalProgrammaticPages } from './seed-senegal';
import { seedCoteDIvoireProgrammaticPages } from './seed-cote-divoire';
import { syncAllSitemaps } from '../seo-engine/sitemap-manager';
import type { SupportedCountry } from '../types';

function now(): string {
  return new Date().toISOString();
}

export function seedDatabase(): void {
  runMigrations();
  syncCountryConfigsToDatabase();
  seedManagedSources();
  const db = getDb();
  const timestamp = now();

  for (const agent of AGENT_DEFINITIONS) {
    const promptFn = AGENT_PROMPTS[agent.code];
    const promptConfig = promptFn ? promptFn('gn' as SupportedCountry) : null;

    const existing = db.select().from(aiAgents).where(eq(aiAgents.code, agent.code)).get();
    if (!existing) {
      db.insert(aiAgents).values({
        code: agent.code,
        name: agent.name,
        description: agent.description,
        objective: agent.objective,
        systemPrompt: promptConfig?.systemPrompt ?? null,
        countryCode: null,
        enabled: true,
        schedule: agent.schedule,
        status: 'idle',
        createdAt: timestamp,
        updatedAt: timestamp,
      }).run();
    } else {
      db.update(aiAgents)
        .set({
          objective: agent.objective,
          systemPrompt: promptConfig?.systemPrompt ?? existing.systemPrompt,
          updatedAt: timestamp,
        })
        .where(eq(aiAgents.code, agent.code))
        .run();
    }
  }

  seedGuineaProgrammaticPages();
  seedSenegalProgrammaticPages();
  seedCoteDIvoireProgrammaticPages();
  syncAllSitemaps();
}
