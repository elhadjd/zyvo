import { runTrendDiscoveryAgent } from '../research-engine/agents/trend-discovery-agent';
import { logAiEvent } from '../logger';
import type { AgentContext, ResearchResult } from '../types';

export async function runResearchAgent(ctx: AgentContext): Promise<ResearchResult> {
  logAiEvent('research', `Research Engine: ${ctx.topic ?? ctx.countryCode}`, {
    countryCode: ctx.countryCode,
    metadata: { topic: ctx.topic },
  });

  const engineResult = await runTrendDiscoveryAgent(ctx);

  return {
    sources: [],
    trends: engineResult.topOpportunities.map((o) => o.topic),
    faqQuestions: [],
    seoKeywords: engineResult.topOpportunities.map((o) => o.topic),
  };
}
