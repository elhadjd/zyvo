import { researchEngine } from '../index';
import { createTask, completeTask, failTask, isAgentEnabled } from '../../agents/task-helpers';
import { logAiEvent } from '../../logger';
import type { AgentContext } from '../../types';
import type { ResearchEngineResult } from '../types';

export async function runTrendDiscoveryAgent(ctx: AgentContext): Promise<ResearchEngineResult> {
  if (!isAgentEnabled('research')) {
    throw new Error('Trend Discovery Agent está desativado');
  }

  const taskId = createTask('research', ctx.countryCode, 'trend_discovery');
  logAiEvent('research', `Trend Discovery: ${ctx.topic ?? ctx.countryCode}`, { countryCode: ctx.countryCode });

  try {
    const result = await researchEngine.runDailyResearch(ctx.countryCode, ctx.topic);

    completeTask(taskId, 'research', {
      keywordsDiscovered: result.keywordsDiscovered,
      opportunitiesFound: result.opportunitiesFound,
      documentsExtracted: result.documentsExtracted,
    });

    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'research', message);
    throw error;
  }
}
