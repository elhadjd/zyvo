import { runResearchAgent } from './research';
import { runKnowledgeOrganizerAgent } from './knowledge-organizer';
import { runContentWriterAgent } from './content-writer';
import { runSeoOptimizerAgent } from './seo-optimizer';
import { runFactCheckerAgent } from './fact-checker';
import { runEditorAgent } from './editor';
import { runTranslationAgent } from './translation';
import { runPublisherAgent } from './publisher';
import { logAiEvent } from '../logger';
import { seedDatabase } from '../db/seed';
import { researchEngine } from '../research-engine';
import {
  getCountryConfig,
  isCountryEnabled,
  getNextTopicForCountry,
  isConfiguredCountry,
} from '../countries/registry';
import type { AgentCode, AgentContext, SupportedCountry } from '../types';

export interface PipelineResult {
  countryCode: SupportedCountry;
  topic?: string;
  stages: Partial<Record<AgentCode, { success: boolean; error?: string; data?: unknown }>>;
  completedAt: string;
  articleId?: number;
}

const STAGE_ORDER: AgentCode[] = [
  'research',
  'knowledge_organizer',
  'content_writer',
  'seo_optimizer',
  'fact_checker',
  'editor',
];

export async function runFullPipeline(
  countryCode: SupportedCountry,
  options: { dryRun?: boolean; stages?: AgentCode[]; topic?: string; saveAsDraft?: boolean } = {}
): Promise<PipelineResult> {
  seedDatabase();

  if (!isConfiguredCountry(countryCode)) {
    throw new Error(`País não configurado: ${countryCode}. Adicione em src/lib/ai/countries/config.ts`);
  }

  if (!isCountryEnabled(countryCode)) {
    throw new Error(`País desativado: ${countryCode}. Ative em /admin/ai-engine/settings`);
  }

  const config = getCountryConfig(countryCode);
  const topic =
    options.topic ??
    researchEngine.getNextTopicForContent(countryCode) ??
    getNextTopicForCountry(countryCode) ??
    config?.topics[0];

  const ctx: AgentContext = {
    countryCode,
    dryRun: options.dryRun,
    topic,
    saveAsDraft: options.saveAsDraft ?? true,
  };

  const stagesToRun = options.stages ?? [...STAGE_ORDER, 'publisher'];
  const result: PipelineResult = {
    countryCode,
    topic,
    stages: {},
    completedAt: new Date().toISOString(),
  };

  logAiEvent('research', `Pipeline iniciado para ${countryCode}`, { countryCode, metadata: { topic } });

  for (const stage of stagesToRun) {
    try {
      let data: unknown;

      switch (stage) {
        case 'research':
          data = await runResearchAgent(ctx);
          break;
        case 'knowledge_organizer':
          data = await runKnowledgeOrganizerAgent(ctx);
          break;
        case 'content_writer':
          data = await runContentWriterAgent(ctx);
          if (typeof data === 'number') result.articleId = data;
          break;
        case 'seo_optimizer':
          data = await runSeoOptimizerAgent(ctx);
          break;
        case 'fact_checker':
          data = await runFactCheckerAgent(ctx);
          break;
        case 'editor':
          data = await runEditorAgent(ctx);
          if (typeof data === 'number') result.articleId = data;
          break;
        case 'translation':
          data = await runTranslationAgent(ctx);
          break;
        case 'publisher':
          if (options.saveAsDraft) {
            data = { skipped: true, reason: 'saveAsDraft enabled' };
          } else {
            data = await runPublisherAgent(ctx);
          }
          break;
      }

      result.stages[stage] = { success: true, data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      result.stages[stage] = { success: false, error: message };
      logAiEvent(stage, `Pipeline parado em ${stage}: ${message}`, { countryCode, level: 'error' });
      break;
    }
  }

  return result;
}

/** Teste real: Guiné — "Como abrir uma pequena empresa na Guiné" → rascunho */
export async function runGuineaTestPipeline(): Promise<PipelineResult> {
  return runFullPipeline('gn', {
    topic: 'Comment ouvrir une petite entreprise en Guinée',
    saveAsDraft: true,
    stages: STAGE_ORDER,
  });
}

export async function runSingleAgent(
  agentCode: AgentCode,
  countryCode: SupportedCountry,
  options: { dryRun?: boolean; topic?: string; articleId?: number; saveAsDraft?: boolean } = {}
): Promise<unknown> {
  seedDatabase();
  const ctx: AgentContext = {
    countryCode,
    dryRun: options.dryRun,
    topic: options.topic,
    articleId: options.articleId,
    saveAsDraft: options.saveAsDraft,
  };

  switch (agentCode) {
    case 'research':
      return runResearchAgent(ctx);
    case 'knowledge_organizer':
      return runKnowledgeOrganizerAgent(ctx);
    case 'content_writer':
      return runContentWriterAgent(ctx);
    case 'seo_optimizer':
      return runSeoOptimizerAgent(ctx);
    case 'fact_checker':
      return runFactCheckerAgent(ctx);
    case 'editor':
      return runEditorAgent(ctx);
    case 'translation':
      return runTranslationAgent(ctx);
    case 'publisher':
      return runPublisherAgent(ctx);
    default:
      throw new Error(`Agente desconhecido: ${agentCode}`);
  }
}
