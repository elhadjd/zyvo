'use client';

import { useEffect, useState } from 'react';
import {
  FileText,
  Clock,
  Search,
  BookOpen,
  Bot,
  AlertTriangle,
  Play,
  Loader2,
} from 'lucide-react';
import type { DashboardStats } from '@/lib/ai/types';

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineResult, setPipelineResult] = useState<string | null>(null);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetchStats();
  }, [country]);

  async function fetchStats() {
    setLoading(true);
    const res = await fetch(`/api/admin/ai-content/dashboard?country=${country}`);
    if (res.ok) {
      setStats(await res.json());
    }
    setLoading(false);
  }

  async function runPipeline() {
    setPipelineRunning(true);
    setPipelineResult(null);
    try {
      const res = await fetch('/api/admin/ai-content/run-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'pipeline', countryCode: country }),
      });
      const data = await res.json();
      if (res.ok) {
        const stages = Object.entries(data.stages ?? {})
          .map(([k, v]) => `${k}: ${(v as { success: boolean }).success ? '✓' : '✗'}`)
          .join(', ');
        setPipelineResult(`Pipeline concluído — ${stages}`);
        fetchStats();
      } else {
        setPipelineResult(`Erro: ${data.error}`);
      }
    } catch {
      setPipelineResult('Erro ao executar pipeline');
    }
    setPipelineRunning(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard AI Content</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Motor de conteúdo inteligente ZYVO
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="gn">Guinée (GN)</option>
            <option value="sn">Sénégal (SN)</option>
            <option value="ao">Angola (AO)</option>
            <option value="mz">Moçambique (MZ)</option>
          </select>
          <button
            onClick={runPipeline}
            disabled={pipelineRunning}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover disabled:opacity-50"
            type="button"
          >
            {pipelineRunning ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Executar Pipeline
          </button>
        </div>
      </div>

      {pipelineResult && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-800 dark:text-blue-200">
          {pipelineResult}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Artigos Publicados" value={stats?.publishedArticles ?? 0} icon={FileText} color="bg-green-500" />
        <StatCard label="Artigos Pendentes" value={stats?.pendingArticles ?? 0} icon={Clock} color="bg-yellow-500" />
        <StatCard label="Fontes Pesquisadas" value={stats?.researchSources ?? 0} icon={Search} color="bg-blue-500" />
        <StatCard label="Base de Conhecimento" value={stats?.knowledgeEntries ?? 0} icon={BookOpen} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Status dos Agentes
          </h2>
          <div className="space-y-3">
            {stats?.agentStatuses.map((agent) => (
              <div
                key={agent.code}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{agent.name}</p>
                  <p className="text-xs text-gray-500">
                    {agent.lastRunAt
                      ? `Última execução: ${new Date(agent.lastRunAt).toLocaleString('fr-FR')}`
                      : 'Nunca executado'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      agent.enabled
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {agent.enabled ? 'Ativo' : 'Inativo'}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      agent.status === 'running'
                        ? 'bg-blue-100 text-blue-700'
                        : agent.status === 'error'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Erros Recentes
          </h2>
          {stats?.recentErrors.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum erro registrado.</p>
          ) : (
            <div className="space-y-3">
              {stats?.recentErrors.map((err) => (
                <div key={err.id} className="text-sm border-b border-gray-100 dark:border-gray-800 pb-2">
                  <p className="font-medium text-red-600 dark:text-red-400">{err.agentCode}</p>
                  <p className="text-gray-600 dark:text-gray-400">{err.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(err.createdAt).toLocaleString('fr-FR')}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500">
              DeepSeek tokens utilizados:{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {stats?.deepseekTokensUsed?.toLocaleString() ?? 0}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Palavras-chave SEO:{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {stats?.seoKeywords ?? 0}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
