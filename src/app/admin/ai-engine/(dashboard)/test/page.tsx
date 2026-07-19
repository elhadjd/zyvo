'use client';

import { useState } from 'react';
import { Loader2, Play, FlaskConical } from 'lucide-react';

const TEST_TOPIC = 'Comment ouvrir une petite entreprise en Guinée';

const PIPELINE_STEPS = [
  { agent: 'research', label: 'Research Agent', desc: 'Busca temas, FAQs e keywords SEO' },
  { agent: 'knowledge_organizer', label: 'Knowledge Agent', desc: 'Organiza na base de conhecimento' },
  { agent: 'content_writer', label: 'Writer Agent', desc: 'Cria artigo via DeepSeek' },
  { agent: 'seo_optimizer', label: 'SEO Agent', desc: 'Gera meta tags e schema.org' },
  { agent: 'fact_checker', label: 'Fact Checker', desc: 'Valida afirmações' },
  { agent: 'editor', label: 'Editor Agent', desc: 'Melhora clareza e gramática' },
];

export default function TestPage() {
  const [running, setRunning] = useState(false);
  const [runningAgent, setRunningAgent] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [stageResults, setStageResults] = useState<Record<string, { success: boolean; error?: string }>>({});

  async function runFullTest() {
    setRunning(true);
    setResult(null);
    setStageResults({});

    const res = await fetch('/api/admin/ai-content/run-pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'pipeline',
        countryCode: 'gn',
        topic: TEST_TOPIC,
        saveAsDraft: true,
        stages: PIPELINE_STEPS.map((s) => s.agent),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setStageResults(data.stages ?? {});
      setResult(
        data.articleId
          ? `Artigo #${data.articleId} criado como rascunho. Aprove em Artigos.`
          : 'Pipeline concluído. Verifique Artigos.'
      );
    } else {
      setResult(`Erro: ${data.error}`);
    }
    setRunning(false);
  }

  async function runSingleAgent(agent: string) {
    setRunningAgent(agent);
    const res = await fetch('/api/admin/ai-content/run-pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'agent',
        agent,
        countryCode: 'gn',
        topic: TEST_TOPIC,
        saveAsDraft: true,
      }),
    });
    const data = await res.json();
    setStageResults((prev) => ({
      ...prev,
      [agent]: { success: res.ok, error: data.error },
    }));
    setRunningAgent(null);
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <FlaskConical className="w-8 h-8 text-brand-primary" />
        <div>
          <h1 className="text-2xl font-bold">Teste Real — Guiné</h1>
          <p className="text-gray-500">Tema: {TEST_TOPIC}</p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold mb-2">Fluxo de teste</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Research → Knowledge → Writer (DeepSeek) → SEO → Fact Check → Editor → Rascunho (sem publicação automática)
        </p>
      </div>

      <button
        onClick={runFullTest}
        disabled={running}
        className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover disabled:opacity-50 mb-8"
        type="button"
      >
        {running ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
        Executar Pipeline Completo
      </button>

      {result && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
          {result}
        </div>
      )}

      <h2 className="text-lg font-semibold mb-4">Testar agente individualmente</h2>
      <div className="space-y-3">
        {PIPELINE_STEPS.map((step) => {
          const stageResult = stageResults[step.agent];
          return (
            <div key={step.agent} className="flex items-center justify-between bg-white dark:bg-gray-900 border rounded-lg p-4">
              <div>
                <p className="font-medium">{step.label}</p>
                <p className="text-sm text-gray-500">{step.desc}</p>
                {stageResult && (
                  <p className={`text-xs mt-1 ${stageResult.success ? 'text-green-600' : 'text-red-600'}`}>
                    {stageResult.success ? '✓ Sucesso' : `✗ ${stageResult.error}`}
                  </p>
                )}
              </div>
              <button
                onClick={() => runSingleAgent(step.agent)}
                disabled={runningAgent === step.agent}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
                type="button"
              >
                {runningAgent === step.agent ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Executar'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600">
        <p className="font-medium mb-2">Requisitos:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><code>DEEPSEEK_API_KEY</code> configurada no .env</li>
          <li><code>npm run db:migrate && npm run db:seed</code></li>
          <li>Artigo salvo como <strong>pending_review</strong> — aprovar em Artigos</li>
        </ul>
      </div>
    </div>
  );
}
