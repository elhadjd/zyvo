import { runResearchAgent } from './research';
import { runKnowledgeOrganizerAgent } from './knowledge-organizer';
import { runContentWriterAgent } from './content-writer';
import { runSeoOptimizerAgent } from './seo-optimizer';
import { runFactCheckerAgent } from './fact-checker';
import { runTranslationAgent } from './translation';
import { runPublisherAgent } from './publisher';
import { logAiEvent } from '../logger';
import { seedDatabase } from '../db/seed';
import type { AgentCode, AgentContext, SupportedCountry } from '../types';

export interface PipelineResult {
  countryCode: SupportedCountry;
  stages: Record<AgentCode, { success: boolean; error?: string; data?: unknown }>;
  completedAt: string;
}

export async function runFullPipeline(
  countryCode: SupportedCountry,
  options: { dryRun?: boolean; stages?: AgentCode[] } = {}
): Promise<PipelineResult> {
  seedDatabase();

  const ctx: AgentContext = { countryCode, dryRun: options.dryRun };
  const stagesToRun = options.stages ?? [
    'research',
    'knowledge_organizer',
    'content_writer',
    'seo_optimizer',
    'fact_checker',
    'translation',
    'publisher',
  ];

  const result: PipelineResult = {
    countryCode,
    stages: {} as PipelineResult['stages'],
    completedAt: new Date().toISOString(),
  };

  logAiEvent('research', `Pipeline iniciado para ${countryCode}`, { countryCode });

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
          break;
        case 'seo_optimizer':
          data = await runSeoOptimizerAgent(ctx);
          break;
        case 'fact_checker':
          data = await runFactCheckerAgent(ctx);
          break;
        case 'translation':
          data = await runTranslationAgent(ctx);
          break;
        case 'publisher':
          data = await runPublisherAgent(ctx);
          break;
      }

      result.stages[stage] = { success: true, data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      result.stages[stage] = { success: false, error: message };
      logAiEvent(stage, `Pipeline parado em ${stage}: ${message}`, {
        countryCode,
        level: 'error',
      });
      break;
    }
  }

  logAiEvent('publisher', `Pipeline concluído para ${countryCode}`, { countryCode });
  return result;
}

export async function runSingleAgent(
  agentCode: AgentCode,
  countryCode: SupportedCountry,
  dryRun = false
): Promise<unknown> {
  seedDatabase();
  const ctx: AgentContext = { countryCode, dryRun };

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
    case 'translation':
      return runTranslationAgent(ctx);
    case 'publisher':
      return runPublisherAgent(ctx);
    default:
      throw new Error(`Agente desconhecido: ${agentCode}`);
  }
}
