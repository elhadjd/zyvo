import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { requireAdminAuth } from '@/lib/ai/auth';
import { getDb } from '@/lib/ai/db';
import { aiLogs } from '@/lib/ai/db/schema';
import { runFullPipeline, runSingleAgent, runCountryTestPipeline } from '@/lib/ai/agents/orchestrator';
import { runBatchPipeline } from '@/lib/ai/jobs/batch-pipeline';
import { parseArticlesPerCountry } from '@/lib/ai/jobs/article-count';
import { resolveBatchTopics } from '@/lib/ai/research-engine/topic-resolver';
import { runMultiCountryPipeline } from '@/lib/ai/jobs/multi-country-pipeline';
import { enqueueTestPipeline } from '@/lib/ai/jobs/processor';
import { processAllPendingJobs } from '@/lib/ai/jobs/processor';
import { SITE_AI_COUNTRIES } from '@/lib/ai/country-labels';
import type { AgentCode, SupportedCountry } from '@/lib/ai/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    await requireAdminAuth();
    const body = await request.json();
    const { action, countryCode = 'gn', agent, dryRun = false, publishNow = false } = body;

    if (action === 'resolve_topics') {
      const topics = await resolveBatchTopics(countryCode as SupportedCountry, parseArticlesPerCountry(body.articlesPerCountry), {
        recentDays: Number(body.recentDays ?? 14),
        fixedTopic: body.topic?.trim() || undefined,
      });
      return NextResponse.json({ topics });
    }

    if (action === 'pipeline') {
      const result = await runFullPipeline(countryCode as SupportedCountry, {
        dryRun,
        topic: body.topic,
        saveAsDraft: publishNow ? false : (body.saveAsDraft ?? true),
        publishNow,
        stages: body.stages,
        skipTopicDiscovery: body.skipTopicDiscovery === true,
        targetCategory: body.targetCategory,
      });
      return NextResponse.json(result);
    }

    if (action === 'pipeline_batch' || action === 'pipeline_all') {
      const countryCodes = (body.countryCodes as SupportedCountry[] | undefined)?.filter(Boolean);
      const allCountries = body.allCountries === true || action === 'pipeline_all';

      const result = await runBatchPipeline({
        countryCodes: allCountries ? [...SITE_AI_COUNTRIES] : countryCodes,
        articlesPerCountry: parseArticlesPerCountry(body.articlesPerCountry),
        topic: body.topic,
        publishNow,
        dryRun,
        stages: body.stages,
        recentDays: Number(body.recentDays ?? 14),
        concurrency: Number(body.concurrency ?? 3),
        siteCountriesOnly: allCountries,
      });

      return NextResponse.json(result);
    }

    if (action === 'multi_country') {
      const result = await runMultiCountryPipeline({
        countryCodes: body.countryCodes,
        articlesPerCountry: parseArticlesPerCountry(body.articlesPerCountry),
        publishNow,
        dryRun,
        saveAsDraft: publishNow ? false : (body.saveAsDraft ?? true),
        stages: body.stages,
        recentDays: Number(body.recentDays ?? 14),
        concurrency: Number(body.concurrency ?? 3),
      });
      return NextResponse.json(result);
    }

    if (action === 'test_guinea' || action === 'test_country') {
      const code = (body.countryCode ?? 'gn') as SupportedCountry;
      const result = await runCountryTestPipeline(code);
      return NextResponse.json(result);
    }

    if (action === 'enqueue_test') {
      const topic = body.topic ?? 'Comment ouvrir une petite entreprise en Guinée';
      const jobIds = enqueueTestPipeline(countryCode as SupportedCountry, topic);
      return NextResponse.json({ jobIds, message: 'Jobs enfileirados. Execute process para rodar.' });
    }

    if (action === 'process_jobs') {
      const processed = await processAllPendingJobs(body.maxJobs ?? 10);
      return NextResponse.json({ processed });
    }

    if (action === 'agent' && agent) {
      const result = await runSingleAgent(agent as AgentCode, countryCode as SupportedCountry, {
        dryRun,
        topic: body.topic,
        articleId: body.articleId,
        saveAsDraft: body.saveAsDraft,
      });
      return NextResponse.json({ success: true, result });
    }

    return NextResponse.json({ error: 'Ação inválida' }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    if (message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await requireAdminAuth();
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit') ?? 50);

    const db = getDb();
    const logs = db
      .select()
      .from(aiLogs)
      .orderBy(desc(aiLogs.createdAt))
      .limit(limit)
      .all();

    return NextResponse.json(logs);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
