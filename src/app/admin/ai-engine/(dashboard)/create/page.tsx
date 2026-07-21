'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Play, FileText, Globe, CheckSquare, Square } from 'lucide-react';
import Link from 'next/link';
import { COUNTRY_LABELS, SITE_AI_COUNTRY_OPTIONS } from '@/lib/ai/country-labels';

interface BatchJobView {
  jobId: number;
  countryCode: string;
  topic: string;
  status: string;
  success?: boolean;
  articleId?: number;
  error?: string;
}

interface BatchStatusView {
  id: number;
  status: string;
  phase: string;
  totalJobs: number;
  completedJobs: number;
  succeededJobs: number;
  failedJobs: number;
  jobs: BatchJobView[];
  error?: string | null;
  message?: string;
}

const POLL_INTERVAL_MS = 3000;

export default function CreateArticlePage() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['gn', 'sn', 'ci']);
  const [allCountries, setAllCountries] = useState(true);
  const [topic, setTopic] = useState('');
  const [articlesPerCountry, setArticlesPerCountry] = useState(1);
  const [publishNow, setPublishNow] = useState(true);
  const [running, setRunning] = useState(false);
  const [batchId, setBatchId] = useState<number | null>(null);
  const [batchStatus, setBatchStatus] = useState<BatchStatusView | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeCountries = allCountries
    ? SITE_AI_COUNTRY_OPTIONS.map((c) => c.code)
    : selectedCountries;

  const totalArticles = activeCountries.length * Math.max(1, Math.min(5, articlesPerCountry));

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const refreshBatch = useCallback(async (id: number, tick = true) => {
    if (tick) {
      const tickRes = await fetch('/api/admin/ai-content/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'tick', batchId: id }),
      });
      if (tickRes.ok) {
        const data = (await tickRes.json()) as BatchStatusView;
        setBatchStatus(data);
        return data;
      }
    }

    const res = await fetch(`/api/admin/ai-content/batch?id=${id}`);
    if (!res.ok) return null;
    const data = (await res.json()) as BatchStatusView;
    setBatchStatus(data);
    return data;
  }, []);

  const startPolling = useCallback(
    (id: number) => {
      stopPolling();
      setRunning(true);
      setBatchId(id);

      void refreshBatch(id, true);

      pollRef.current = setInterval(() => {
        void refreshBatch(id, true).then((data) => {
          if (!data) return;
          if (data.status === 'completed' || data.status === 'failed') {
            stopPolling();
            setRunning(false);
            setSummary(
              data.status === 'completed'
                ? `${data.succeededJobs}/${data.totalJobs} artigo(s) gerado(s) em segundo plano`
                : `Batch terminou com erros: ${data.succeededJobs}/${data.totalJobs} sucesso, ${data.failedJobs} falha(s)`
            );
          }
        });
      }, POLL_INTERVAL_MS);
    },
    [refreshBatch, stopPolling]
  );

  useEffect(() => {
    async function resumeActiveBatch() {
      try {
        const res = await fetch('/api/admin/ai-content/batch');
        if (!res.ok) return;
        const data = (await res.json()) as BatchStatusView;
        if (data?.id && (data.status === 'pending' || data.status === 'running')) {
          startPolling(data.id);
        }
      } catch {
        // ignore
      }
    }

    void resumeActiveBatch();
    return () => stopPolling();
  }, [startPolling, stopPolling]);

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

    if (countries.length === 0) {
      setSummary('Seleccione pelo menos um país.');
      return;
    }

    setSummary(null);
    setBatchStatus(null);

    try {
      const res = await fetch('/api/admin/ai-content/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          allCountries,
          countryCodes: countries,
          topic: topic.trim() || undefined,
          articlesPerCountry: perCountry,
          publishNow,
          recentDays: 14,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(String(data.error ?? `Erro HTTP ${res.status}`));
      }

      setSummary('Geração iniciada em segundo plano. Pode fechar esta página — o progresso continua automaticamente.');
      startPolling(Number(data.batchId));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao iniciar batch';
      setSummary(`Erro: ${message}`);
      setRunning(false);
    }
  }

  const progressLabel = batchStatus
    ? batchStatus.phase === 'prepare'
      ? `A preparar tópicos… (${batchStatus.completedJobs}/${batchStatus.totalJobs || '?'})`
      : `A gerar artigos em segundo plano… (${batchStatus.completedJobs}/${batchStatus.totalJobs})`
    : null;

  const batchJobs = batchStatus?.jobs ?? [];

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8 text-brand-primary" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Criar artigos reais</h1>
          <p className="text-gray-500">
            Geração em segundo plano — pode fechar a página enquanto corre
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
                  disabled={running}
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
              disabled={running}
              onChange={(e) => setArticlesPerCountry(Math.min(5, Math.max(1, Number(e.target.value) || 1)))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-950 dark:border-gray-700"
            />
          </div>
          <div className="flex items-end">
            <p className="text-sm text-gray-600 dark:text-gray-400 pb-2">
              Total: <strong>{totalArticles}</strong> artigo(s) em fila
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tema (opcional)</label>
          <input
            type="text"
            value={topic}
            disabled={running}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: Comment gérer le stock d'une boutique à Dakar"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-950 dark:border-gray-700"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={publishNow}
            disabled={running}
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
          ? progressLabel ?? 'A processar em segundo plano…'
          : publishNow
            ? `Gerar e publicar ${totalArticles} artigo(s)`
            : `Gerar ${totalArticles} rascunho(s)`}
      </button>

      {running && batchId && (
        <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
          Batch #{batchId} em execução — pode fechar esta página. O cron continua o processamento.
        </p>
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

      {batchJobs.length > 0 && (
        <div className="space-y-3 mb-8">
          <h2 className="font-semibold">
            Resultados ({batchStatus?.succeededJobs ?? 0}/{batchStatus?.totalJobs ?? batchJobs.length})
          </h2>
          {batchJobs.map((job) => {
            const label = COUNTRY_LABELS[job.countryCode] ?? job.countryCode.toUpperCase();
            const done = job.status === 'completed';
            const runningJob = job.status === 'processing' || job.status === 'pending';

            return (
              <div
                key={job.jobId}
                className="border rounded-xl p-4 bg-white dark:bg-gray-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-sm">
                      {label} ·{' '}
                      {runningJob && !done ? (
                        <span className="text-blue-600">em curso…</span>
                      ) : job.success ? (
                        '✓'
                      ) : done ? (
                        '✗'
                      ) : (
                        '…'
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{job.topic}</p>
                    {job.error && (
                      <p className="text-xs text-red-600 mt-1">{job.error}</p>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {job.articleId && (
                      <Link
                        href={`/admin/ai-engine/articles/${job.articleId}`}
                        className="text-xs underline"
                      >
                        #{job.articleId}
                      </Link>
                    )}
                    {publishNow && job.success && (
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
          <li>A geração corre em segundo plano — sem timeouts no browser</li>
          <li>Cada tópico só pode gerar um artigo (protecção anti-duplicado)</li>
          <li>O cron <code>/api/cron/batch-pipeline</code> continua batches mesmo com a página fechada</li>
          <li><code>DEEPSEEK_API_KEY</code> obrigatório no ambiente</li>
        </ul>
      </div>
    </div>
  );
}
