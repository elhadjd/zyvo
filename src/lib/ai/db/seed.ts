import { eq } from 'drizzle-orm';
import { getDb } from './index';
import { aiAgents, countryAiConfig } from './schema';
import { runMigrations } from './migrate';
import { COUNTRY_AI_CONFIGS } from '../countries';
import { AGENT_DEFINITIONS } from '../types';
import { AGENT_PROMPTS } from '../agents/prompts';
import type { SupportedCountry } from '../types';

function now(): string {
  return new Date().toISOString();
}

export function seedDatabase(): void {
  runMigrations();
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

  for (const config of COUNTRY_AI_CONFIGS) {
    const existing = db
      .select()
      .from(countryAiConfig)
      .where(eq(countryAiConfig.countryCode, config.countryCode))
      .get();

    if (!existing) {
      db.insert(countryAiConfig).values({
        countryCode: config.countryCode,
        language: config.language,
        enabled: config.countryCode === 'gn',
        publishFrequency: 'daily',
        articlesPerDay: 1,
        autoPublish: false,
        requireApproval: true,
        categories: config.categories,
        sources: config.sources,
        scheduleConfig: {},
        deepseekTokensUsed: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
      }).run();
    }
  }
}
