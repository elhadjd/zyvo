import { logAiEvent } from '../../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from '../../agents/task-helpers';
import type { AgentContext } from '../../types';
import { detectOpportunities, saveOpportunities } from '../opportunity-detector';

export async function runSeoOpportunityAgent(ctx: AgentContext): Promise<number> {
  if (!isAgentEnabled('research')) {
    throw new Error('Research Agent está desativado');
  }

  const taskId = createTask('research', ctx.countryCode, 'seo_opportunity');
  logAiEvent('research', `SEO Opportunity detection para ${ctx.countryCode}`, {
    countryCode: ctx.countryCode,
  });

  try {
    const opportunities = detectOpportunities(ctx.countryCode);
    let saved = 0;

    if (!ctx.dryRun) {
      saved = saveOpportunities(ctx.countryCode, opportunities);
    }

    completeTask(taskId, 'research', {
      detected: opportunities.length,
      saved,
      highPriority: opportunities.filter((o) => o.priority === 'high').length,
    });

    return saved;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'research', message);
    throw error;
  }
}
