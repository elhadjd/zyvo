import { runResearchAgent } from '../agents/research';
import { runKnowledgeOrganizerAgent } from '../agents/knowledge-organizer';
import { runContentWriterAgent } from '../agents/content-writer';
import { runSeoOptimizerAgent } from '../agents/seo-optimizer';
import { runFactCheckerAgent } from '../agents/fact-checker';
import { runEditorAgent } from '../agents/editor';
import { runPublisherAgent } from '../agents/publisher';
import { completeJob, failJob, getNextPendingJob, markJobProcessing } from './queue';
import { logAiEvent } from '../logger';
import type { AgentContext, JobType, SupportedCountry } from '../types';

const JOB_HANDLERS: Record<
  JobType,
  (ctx: AgentContext) => Promise<unknown>
> = {
  research_content: (ctx) => runResearchAgent(ctx),
  organize_knowledge: (ctx) => runKnowledgeOrganizerAgent(ctx),
  generate_article: (ctx) => runContentWriterAgent(ctx),
  optimize_seo: (ctx) => runSeoOptimizerAgent(ctx),
  fact_check: (ctx) => runFactCheckerAgent(ctx),
  edit_article: (ctx) => runEditorAgent(ctx),
  publish_article: (ctx) => runPublisherAgent(ctx),
};

export async function processNextJob(): Promise<boolean> {
  const job = getNextPendingJob();
  if (!job) return false;

  markJobProcessing(job.id);
  const payload = (job.payload ?? {}) as {
    topic?: string;
    articleId?: number;
    countryCode: SupportedCountry;
    saveAsDraft?: boolean;
  };

  const ctx: AgentContext = {
    countryCode: payload.countryCode ?? (job.countryCode as SupportedCountry),
    topic: payload.topic,
    articleId: payload.articleId,
    saveAsDraft: payload.saveAsDraft,
  };

  try {
    const handler = JOB_HANDLERS[job.type as JobType];
    if (!handler) throw new Error(`Handler não encontrado para job: ${job.type}`);

    const result = await handler(ctx);
    completeJob(job.id, { result });
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failJob(job.id, message);
    logAiEvent('publisher', `Job ${job.type} falhou: ${message}`, {
      countryCode: job.countryCode,
      level: 'error',
    });
    return false;
  }
}

export async function processAllPendingJobs(maxJobs = 10): Promise<number> {
  let processed = 0;
  for (let i = 0; i < maxJobs; i++) {
    const hadJob = await processNextJob();
    if (!hadJob) break;
    processed++;
  }
  return processed;
}

import { enqueueJob } from './queue';
import type { SupportedCountry } from '../types';

export function enqueueTestPipeline(countryCode: SupportedCountry, topic: string): number[] {
  const payload = { topic, saveAsDraft: true };
  return [
    enqueueJob('research_content', countryCode, payload),
    enqueueJob('organize_knowledge', countryCode, payload),
    enqueueJob('generate_article', countryCode, payload),
    enqueueJob('optimize_seo', countryCode, { saveAsDraft: true }),
    enqueueJob('fact_check', countryCode, { saveAsDraft: true }),
    enqueueJob('edit_article', countryCode, { saveAsDraft: true }),
  ];
}
