'use client';

import { useState } from 'react';
import { Loader2, Play, FileText, Globe } from 'lucide-react';
import Link from 'next/link';
import AdminCountrySelect from '@/components/admin/AdminCountrySelect';
import { COUNTRY_LABELS } from '@/lib/ai/country-labels';

const PIPELINE_STEPS = [
  'research',
  'knowledge_organizer',
  'content_writer',
  'seo_optimizer',
  'fact_checker',
  'editor',
  'publisher',
] as const;

export default function CreateArticlePage() {
  const [country, setCountry] = useState('gn');
  const [topic, setTopic] = useState('');
  const [publishNow, setPublishNow] = useState(true);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [articleId, setArticleId] = useState<number | null>(null);
  const [stageResults, setStageResults] = useState<Record<string, { success: boolean; error?: string }>>({});

  async function runPipeline() {
    setRunning(true);
    setResult(null);
    setArticleId(null);
    setStageResults({});

    const res = await fetch('/api/admin/ai-content/run-pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'pipeline',
        countryCode: country,
        topic: topic.trim() || undefined,
        publishNow,
        saveAsDraft: !publishNow,
        stages: [...PIPELINE_STEPS],
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setStageResults(data.stages ?? {});
      const id = data.articleId as number | undefined;
      setArticleId(id ?? null);
      const label = COUNTRY_LABELS[country] ?? country.toUpperCase();
      if (publishNow && id) {
        const published = data.stages?.publisher?.success;
        setResult(
          published
            ? `Artigo #${id} publicado em /${country}/blog — ${label}`
            : `Artigo #${id} criado. Verifique o estágio Publisher ou aprove em Artigos.`
        );
      } else if (id) {
        setResult(`Rascunho #${id} criado — aprove em Artigos para publicar.`);
      } else {
        setResult('Pipeline concluído. Verifique Artigos.');
      }
    } else {
      setResult(`Erro: ${data.error ?? 'Falha no pipeline'}`);
    }
    setRunning(false);
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-8 h-8 text-brand-primary" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Criar artigo real</h1>
          <p className="text-gray-500">Pipeline completo com DeepSeek — publicação no site</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border rounded-xl p-6 space-y-5 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">País / mercado</label>
          <AdminCountrySelect value={country} onChange={setCountry} scope="site" className="w-full px-3 py-2 border rounded-lg" />
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
          <p className="text-xs text-gray-500 mt-1">Vazio = tópico automático do calendário editorial do país</p>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={publishNow}
            onChange={(e) => setPublishNow(e.target.checked)}
            className="rounded border-gray-300"
          />
          <span className="text-sm">
            <strong>Publicar imediatamente</strong> no site (/{country}/blog/…) após fact-check e edição
          </span>
        </label>

        {!publishNow && (
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
            Sem publicação imediata: o artigo fica em <em>pending_review</em>. Aprove em Artigos e execute o agente Publisher.
          </p>
        )}
      </div>

      <button
        onClick={runPipeline}
        disabled={running}
        type="button"
        className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover disabled:opacity-50 mb-8"
      >
        {running ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
        {publishNow ? 'Gerar e publicar artigo' : 'Gerar rascunho'}
      </button>

      {result && (
        <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg text-green-800 dark:text-green-200 text-sm space-y-2">
          <p>{result}</p>
          {articleId && (
            <div className="flex gap-3 pt-2">
              <Link href={`/admin/ai-engine/articles/${articleId}`} className="underline font-medium">
                Editar artigo #{articleId}
              </Link>
              {publishNow && (
                <a
                  href={`/${country}/blog`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline font-medium"
                >
                  <Globe className="w-4 h-4" /> Ver blog
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {Object.keys(stageResults).length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold mb-2">Etapas</h2>
          {PIPELINE_STEPS.map((step) => {
            const s = stageResults[step];
            if (!s) return null;
            return (
              <div key={step} className="flex items-center justify-between text-sm border rounded-lg px-4 py-2">
                <span className="font-mono">{step}</span>
                <span className={s.success ? 'text-green-600' : 'text-red-600'}>
                  {s.success ? '✓ OK' : `✗ ${s.error ?? 'falhou'}`}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
        <p className="font-medium mb-2">Requisitos:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><code>DEEPSEEK_API_KEY</code> no ambiente</li>
          <li>Fontes activas em Research Engine → Fontes (botão Testar todas)</li>
          <li><code>npm run db:seed</code> para base de conhecimento inicial</li>
        </ul>
      </div>
    </div>
  );
}
