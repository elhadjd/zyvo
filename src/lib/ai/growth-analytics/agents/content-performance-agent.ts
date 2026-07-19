import { eq } from 'drizzle-orm';
import { getDb } from '../../db';
import { contentArticles } from '../../db/schema';
import { logAiEvent } from '../../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from '../../agents/task-helpers';
import type { AgentContext } from '../../types';
import { analyzeAllContent, saveContentScores } from '../content-performance-analyzer';

export async function runContentPerformanceAgent(ctx: AgentContext): Promise<number> {
  if (!isAgentEnabled('research')) {
    throw new Error('Research Agent está desativado');
  }

  const taskId = createTask('research', ctx.countryCode, 'content_performance');
  logAiEvent('research', `Content Performance scoring para ${ctx.countryCode}`, {
    countryCode: ctx.countryCode,
  });

  try {
    const scores = analyzeAllContent(ctx.countryCode);
    let saved = 0;

    if (!ctx.dryRun && scores.length > 0) {
      saved = saveContentScores(scores);
    }

    completeTask(taskId, 'research', {
      analyzed: scores.length,
      saved,
      topScore: scores.sort((a, b) => b.totalScore - a.totalScore)[0]?.totalScore ?? 0,
    });

    return saved;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'research', message);
    throw error;
  }
}
