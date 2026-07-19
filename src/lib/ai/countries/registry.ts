import { eq } from 'drizzle-orm';
import { getDb } from '../db';
import { countryAiConfig } from '../db/schema';
import type { CountryAiSettings, SupportedCountry } from '../types';
import { COUNTRY_AI_CONFIGS } from './config';

export function getCountryConfig(countryCode: string): CountryAiSettings | undefined {
  return COUNTRY_AI_CONFIGS.find((c) => c.countryCode === countryCode);
}

export function getConfiguredCountries(): CountryAiSettings[] {
  return COUNTRY_AI_CONFIGS;
}

export function getConfiguredCountryCodes(): SupportedCountry[] {
  return COUNTRY_AI_CONFIGS.map((c) => c.countryCode);
}

export function isConfiguredCountry(code: string): code is SupportedCountry {
  return COUNTRY_AI_CONFIGS.some((c) => c.countryCode === code);
}

export function getCountryDbConfig(countryCode: SupportedCountry) {
  const db = getDb();
  return db
    .select()
    .from(countryAiConfig)
    .where(eq(countryAiConfig.countryCode, countryCode))
    .get();
}

export function isCountryEnabled(countryCode: SupportedCountry): boolean {
  const fileConfig = COUNTRY_AI_CONFIGS.find((c) => c.countryCode === countryCode);
  if (!fileConfig) return false;

  const dbConfig = getCountryDbConfig(countryCode);
  if (dbConfig) return dbConfig.enabled;

  return fileConfig.enabled ?? true;
}

export function getEnabledCountryCodes(): SupportedCountry[] {
  return getConfiguredCountryCodes().filter((code) => isCountryEnabled(code));
}

export function getNextTopicForCountry(countryCode: SupportedCountry): string | undefined {
  const config = COUNTRY_AI_CONFIGS.find((c) => c.countryCode === countryCode);
  if (!config || config.topics.length === 0) return undefined;

  const dayIndex = new Date().getDate() % config.topics.length;
  return config.topics[dayIndex];
}

export function syncCountryConfigsToDatabase(): void {
  const db = getDb();
  const timestamp = new Date().toISOString();

  for (const config of COUNTRY_AI_CONFIGS) {
    const existing = db
      .select()
      .from(countryAiConfig)
      .where(eq(countryAiConfig.countryCode, config.countryCode))
      .get();

    const enabled = config.enabled ?? true;

    if (!existing) {
      db.insert(countryAiConfig)
        .values({
          countryCode: config.countryCode,
          language: config.language,
          enabled,
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
        })
        .run();
    } else {
      db.update(countryAiConfig)
        .set({
          language: config.language,
          categories: config.categories,
          sources: config.sources,
          updatedAt: timestamp,
        })
        .where(eq(countryAiConfig.countryCode, config.countryCode))
        .run();
    }
  }
}
