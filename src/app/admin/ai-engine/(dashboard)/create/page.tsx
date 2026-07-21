'use client';

import { useState } from 'react';
import { Loader2, Play, FileText, Globe, CheckSquare, Square } from 'lucide-react';
import Link from 'next/link';
import { COUNTRY_LABELS, SITE_AI_COUNTRY_OPTIONS } from '@/lib/ai/country-labels';

const PIPELINE_STEPS = [
  'research',
  'knowledge_organizer',
  'content_writer',
  'seo_optimizer',
  'fact_checker',
  'editor',
  'publisher',
] as const;

interface TopicItem {
  topic: string;
  category?: string;
  niche?: string;
}

interface BatchJobResult {
  countryCode: string;
  topic: string;
  success: boolean;
  result: {
    articleId?: number;
    stages?: Record<string, { success: boolean; error?: string }>;
  };
}

async function postPipeline(body: Record<string, unknown>) {
  const res = await fetch('/api/admin/ai-content/run-pipeline', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  let data: Record<string, unknown> = {};
  try {
    data = await res.json();
  } catch {
    throw new Error(res.ok ? 'Resposta inválida do servidor' : `Erro HTTP ${res.status}`);
  }

  if (!res.ok) {
    throw new Error(String(data.error ?? `Erro HTTP ${res.status}`));
  }

  return data;
}

function pipelineSucceeded(result: BatchJobResult['result']): boolean {
  const stages = result.stages ?? {};
  return Object.values(stages).every((stage) => !stage || stage.success);
}

export default function CreateArticlePage() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['gn', 'sn', 'ci']);
  const [allCountries, setAllCountries] = useState(true);
  const [topic, setTopic] = useState('');
  const [articlesPerCountry, setArticlesPerCountry] = useState(1);
  const [publishNow, setPublishNow] = useState(true);
  const [running, setRunning] = useState(false);
  const [progressLabel, setProgressLabel] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [batchResults, setBatchResults] = useState<BatchJobResult[]>([]);

  function toggleCountry(code: string) {
    if (allCountries) {
      setAllCountries(false);
      setSelectedCountries(SITE_AI_COUNTRY_OPTIONS.map((c) => c.code).filter((c) => c !== code));
      return;
    }
    setSelectedCountries((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }

  function selectAllCountries() {
    setAllCountries(true);
    setSelectedCountries(SITE_AI_COUNTRY_OPTIONS.map((c) => c.code));
  }

  async function runPipeline() {
    const countries = allCountries ? SITE_AI_COUNTRY_OPTIONS.map((c) => c.code) : selectedCountries;
    const perCountry = Math.max(1, Math.min(5, articlesPerCountry));
    const totalArticles = countries.length * perCountry;

    if (countries.length === 0) {
      setSummary('Seleccione pelo menos um país.');
      return;
    }

    setRunning(true);
    setSummary(null);
    setBatchResults([]);
    setProgressLabel('A preparar geração…');

    const results: BatchJobResult[] = [];
    let completed = 0;

    try {
      for (const countryCode of countries) {
        const label = COUNTRY_LABELS[countryCode] ?? countryCode.toUpperCase();
        setProgressLabel(`A pesquisar tópicos para ${label}…`);

        const topicData = await postPipeline({
          action: 'resolve_topics',
          countryCode,
          articlesPerCountry: perCountry,
          topic: topic.trim() || undefined,
          recentDays: 14,
        });

        const topics = (topicData.topics ?? []) as TopicItem[];
        if (topics.length === 0) {
          throw new Error(`Nenhum tópico encontrado para ${label}. Tente um tema manual.`);
        }

        for (const item of topics) {
          completed += 1;
          setProgressLabel(
            `A gerar artigo ${completed}/${totalArticles} (${label}): ${item.topic.slice(0, 60)}${item.topic.length > 60 ? '…' : ''}`
          );

          const pipelineResult = (await postPipeline({
            action: 'pipeline',
            countryCode,
            topic: item.topic,
            targetCategory: item.category,
            skipTopicDiscovery: true,
            publishNow,
            saveAsDraft: !publishNow,
            stages: [...PIPELINE_STEPS],
          })) as BatchJobResult['result'];

          const job: BatchJobResult = {
            countryCode,
            topic: item.topic,
            result: pipelineResult,
            success: pipelineSucceeded(pipelineResult),
          };

          results.push(job);
          setBatchResults([...results]);
        }
      }

      const published = results.filter((job) => job.success).length;
      setSummary(
        `${published}/${results.length} artigo(s) gerado(s) (pedido: ${totalArticles}) — ${countries.map((c) => COUNTRY_LABELS[c] ?? c).join(', ')}`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha no pipeline';
      const partial = results.filter((job) => job.success).length;
      setSummary(
        results.length > 0
          ? `Erro após ${partial}/${results.length} artigo(s): ${message}`
          : `Erro: ${message}`
      );
      if (results.length > 0) {
        setBatchResults([...results]);
      }
    } finally {
      setRunning(false);
      setProgressLabel(null);
    }
  }

  const activeCountries = allCountries
    ? SITE_AI_COUNTRY_OPTIONS.map((c) => c.code)
    : selectedCountries;

  const totalArticles = activeCountries.length * Math.max(1, Math.min(5, articlesPerCountry));

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8 text-brand-primary" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Criar artigos reais</h1>
          <p className="text-gray-500">
            Um ou vários países — tópicos do Google quando o campo está vazio
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border rounded-xl p-6 space-y-5 mb-8">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium">Países / mercados</label>
            <button
              type="button"
              onClick={selectAllCountries}
              className="text-xs text-brand-primary hover:underline"
            >
              Seleccionar todos (GN, SN, CI)
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {SITE_AI_COUNTRY_OPTIONS.map((opt) => {
              const checked = allCountries || selectedCountries.includes(opt.code);
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => toggleCountry(opt.code)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${
                    checked
                      ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600'
                  }`}
                >
                  {checked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Artigos por país</label>
            <input
              type="number"
              min={1}
              max={5}
              value={articlesPerCountry}
              onChange={(e) => setArticlesPerCountry(Math.min(5, Math.max(1, Number(e.target.value) || 1)))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-950 dark:border-gray-700"
            />
            <p className="text-xs text-gray-500 mt-1">
              Cada artigo usa um nicho diferente: fiscalité, marketing, IA, ventes, gestion… (máx. 5 por país)
            </p>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-gray-600 dark:text-gray-400 pb-2">
              Total: <strong>{totalArticles}</strong> artigo(s), um de cada vez
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tema (opcional)</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: Comment gérer le stock d'une boutique à Dakar"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-950 dark:border-gray-700"
          />
          <p className="text-xs text-gray-500 mt-1">
            Vazio = Google Suggest + tendências por nicho (fiscalité, marketing, IA, e-commerce…), excluindo duplicados recentes
          </p>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={publishNow}
            onChange={(e) => setPublishNow(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm">
            <strong>Publicar imediatamente</strong> no site após fact-check e edição
          </span>
        </label>
      </div>

      <button
        onClick={runPipeline}
        disabled={running || activeCountries.length === 0}
        type="button"
        className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover disabled:opacity-50 mb-4"
      >
        {running ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
        {running
          ? progressLabel ?? `A gerar ${totalArticles} artigo(s)…`
          : publishNow
            ? `Gerar e publicar ${totalArticles} artigo(s)`
            : `Gerar ${totalArticles} rascunho(s)`}
      </button>

      {running && progressLabel && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">{progressLabel}</p>
      )}

      {summary && (
        <div
          className={`mb-8 p-4 border rounded-lg text-sm ${
            summary.startsWith('Erro')
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 text-red-800 dark:text-red-200'
              : 'bg-green-50 dark:bg-green-900/20 border-green-200 text-green-800 dark:text-green-200'
          }`}
        >
          {summary}
        </div>
      )}

      {batchResults.length > 0 && (
        <div className="space-y-3 mb-8">
          <h2 className="font-semibold">Resultados ({batchResults.length})</h2>
          {batchResults.map((job, index) => {
            const label = COUNTRY_LABELS[job.countryCode] ?? job.countryCode.toUpperCase();
            const articleId = job.result.articleId;
            const published = job.result.stages?.publisher?.success;

            return (
              <div
                key={`${job.countryCode}-${job.topic}-${index}`}
                className="border rounded-xl p-4 bg-white dark:bg-gray-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-sm">
                      {label} · {job.success ? '✓' : '✗'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{job.topic}</p>
                    {!job.success && job.result.stages && (
                      <p className="text-xs text-red-600 mt-1">
                        {Object.entries(job.result.stages)
                          .filter(([, stage]) => stage && !stage.success)
                          .map(([name, stage]) => `${name}: ${stage?.error ?? 'falhou'}`)
                          .join(' · ')}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {articleId && (
                      <Link
                        href={`/admin/ai-engine/articles/${articleId}`}
                        className="text-xs underline"
                      >
                        #{articleId}
                      </Link>
                    )}
                    {publishNow && published && (
                      <a
                        href={`/${job.countryCode}/blog`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs underline"
                      >
                        <Globe className="w-3 h-3" /> Blog
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
        <p className="font-medium mb-2">Como funciona:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Sem tema: consulta Google Suggest por país e ignora tópicos já publicados (14 dias)</li>
          <li>Cada artigo é gerado num pedido separado — evita timeouts e mostra progresso em tempo real</li>
          <li><code>DEEPSEEK_API_KEY</code> obrigatório no ambiente</li>
        </ul>
      </div>
    </div>
  );
}
