import { logAiEvent } from '../../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from '../../agents/task-helpers';
import type { AgentContext } from '../../types';
import { generateAiRecommendations, saveRecommendations } from '../ai-recommendations';

export async function runContentStrategistAgent(ctx: AgentContext): Promise<number> {
  if (!isAgentEnabled('research')) {
    throw new Error('Research Agent está desativado');
  }

  const taskId = createTask('research', ctx.countryCode, 'content_strategist');
  logAiEvent('research', `AI Content Strategist para ${ctx.countryCode}`, {
    countryCode: ctx.countryCode,
  });

  try {
    const { recommendations, weekPlan } = await generateAiRecommendations(ctx.countryCode);
    let saved = 0;

    if (!ctx.dryRun) {
      saved = saveRecommendations(ctx.countryCode, recommendations, weekPlan);
    }

    completeTask(taskId, 'research', {
      recommendations: recommendations.length,
      saved,
      weekPlanItems: weekPlan.items.length,
    });

    return saved;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'research', message);
    throw error;
  }
}
