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
  ListTodo,
  Activity,
} from 'lucide-react';
import type { DashboardStats } from '@/lib/ai/types';
import AdminCountrySelect from '@/components/admin/AdminCountrySelect';
import { COUNTRY_LABELS } from '@/lib/ai/country-labels';

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

export default function AiEngineDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineResult, setPipelineResult] = useState<string | null>(null);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/ai-content/dashboard?country=${country}`)
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false); });
  }, [country]);

  async function runTestPipeline() {
    setPipelineRunning(true);
    setPipelineResult(null);
    const res = await fetch('/api/admin/ai-content/run-pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'test_country', countryCode: country }),
    });
    const data = await res.json();
    if (res.ok) {
      const stages = Object.entries(data.stages ?? {})
        .map(([k, v]) => `${k}: ${(v as { success: boolean }).success ? '✓' : '✗'}`)
        .join(' → ');
      const label = COUNTRY_LABELS[country] ?? country.toUpperCase();
      setPipelineResult(`Teste ${label} concluído — ${stages}${data.articleId ? ` | Artigo #${data.articleId}` : ''}`);
    } else {
      setPipelineResult(`Erro: ${data.error}`);
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Engine Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">DeepSeek · Agentes autónomos · ZYVO</p>
        </div>
        <div className="flex items-center gap-3">
          <AdminCountrySelect
            value={country}
            onChange={(v) => { setCountry(v); setLoading(true); }}
            scope="site"
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700"
          />
          <button
            onClick={runTestPipeline}
            disabled={pipelineRunning}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover disabled:opacity-50"
            type="button"
          >
            {pipelineRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Testar pipeline
          </button>
        </div>
      </div>

      {pipelineResult && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-800 dark:text-blue-200">
          {pipelineResult}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Publicados" value={stats?.publishedArticles ?? 0} icon={FileText} color="bg-green-500" />
        <StatCard label="Aguardando Aprovação" value={stats?.pendingArticles ?? 0} icon={Clock} color="bg-yellow-500" />
        <StatCard label="Jobs Pendentes" value={stats?.pendingJobs ?? 0} icon={ListTodo} color="bg-orange-500" />
        <StatCard label="API Requests Hoje" value={stats?.apiRequestsToday ?? 0} icon={Activity} color="bg-blue-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Fontes Pesquisadas" value={stats?.researchSources ?? 0} icon={Search} color="bg-purple-500" />
        <StatCard label="Base de Conhecimento" value={stats?.knowledgeEntries ?? 0} icon={BookOpen} color="bg-indigo-500" />
        <StatCard label="Tokens DeepSeek" value={stats?.deepseekTokensUsed?.toLocaleString() ?? 0} icon={Bot} color="bg-gray-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5" /> Agentes Ativos
          </h2>
          <div className="space-y-3">
            {stats?.agentStatuses.map((agent) => (
              <div key={agent.code} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium text-sm">{agent.name}</p>
                  <p className="text-xs text-gray-500">
                    {agent.lastRunAt ? new Date(agent.lastRunAt).toLocaleString('fr-FR') : 'Nunca'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${agent.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
                    {agent.enabled ? 'Ativo' : 'Inativo'}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{agent.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Erros Recentes
          </h2>
          {stats?.recentErrors.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum erro.</p>
          ) : (
            stats?.recentErrors.map((err) => (
              <div key={err.id} className="text-sm border-b pb-2 mb-2">
                <p className="font-medium text-red-600">{err.agentCode}</p>
                <p className="text-gray-600">{err.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
