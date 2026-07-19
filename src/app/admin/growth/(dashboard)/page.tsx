'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Loader2,
  Play,
  Users,
  FileText,
  Search,
  Globe,
  Target,
  TrendingUp,
  BarChart3,
  Lightbulb,
  RefreshCw,
} from 'lucide-react';

interface Stats {
  visitors: number;
  sessions: number;
  publishedArticles: number;
  rankedKeywords: number;
  topCountry: string;
  conversions: number;
  openOpportunities: number;
  pendingRefresh: number;
  avgContentScore: number;
  weeklyGrowth: number;
  organicClicks: number;
}

export default function GrowthDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/growth/stats?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, [country, result]);

  async function runAction(action: string) {
    setRunning(true);
    setResult(null);
    const res = await fetch('/api/admin/growth/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, countryCode: country }),
    });
    const data = await res.json();
    if (res.ok) {
      setResult(`Ação "${action}" concluída com sucesso`);
    } else {
      setResult(`Erro: ${data.error}`);
    }
    setRunning(false);
  }

  if (loading || !stats) {
    return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Growth Analytics Engine</h1>
          <p className="text-gray-500">Análise inteligente de crescimento orgânico</p>
        </div>
        <div className="flex gap-3">
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setLoading(true);
            }}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="gn">Guinée</option>
            <option value="sn">Sénégal</option>
            <option value="ci">Côte d'Ivoire</option>
            <option value="ao">Angola</option>
            <option value="mz">Moçambique</option>
          </select>
          <button
            onClick={() => runAction('full_analysis')}
            disabled={running}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg disabled:opacity-50"
            type="button"
          >
            {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Analisar
          </button>
        </div>
      </div>

      {result && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          {result}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Visitantes', value: stats.visitors, icon: Users, href: '/admin/growth/traffic' },
          { label: 'Artigos Publicados', value: stats.publishedArticles, icon: FileText, href: '/admin/growth/content' },
          { label: 'Keywords Posicionadas', value: stats.rankedKeywords, icon: Search, href: '/admin/growth/seo' },
          { label: 'País Top', value: stats.topCountry.toUpperCase(), icon: Globe, href: '/admin/growth/traffic' },
          { label: 'Conversões', value: stats.conversions, icon: Target, href: '/admin/growth/conversions' },
          { label: 'Cliques Orgânicos', value: stats.organicClicks, icon: TrendingUp, href: '/admin/growth/seo' },
          { label: 'Score Médio', value: stats.avgContentScore, icon: BarChart3, href: '/admin/growth/content' },
          { label: 'Oportunidades', value: stats.openOpportunities, icon: Lightbulb, href: '/admin/growth/opportunities' },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-white dark:bg-gray-900 rounded-xl border p-6 hover:border-brand-primary transition-colors"
          >
            <item.icon className="w-6 h-6 text-brand-primary mb-3" />
            <p className="text-3xl font-bold">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
          <h2 className="font-semibold mb-2">Crescimento Semanal</h2>
          <p className={`text-3xl font-bold ${stats.weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.weeklyGrowth >= 0 ? '+' : ''}{stats.weeklyGrowth}%
          </p>
          <p className="text-sm text-gray-500 mt-1">{stats.sessions} sessões esta semana</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
          <h2 className="font-semibold mb-4">Ações Rápidas</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { action: 'sync_data', label: 'Sync GSC/GA4' },
              { action: 'weekly_report', label: 'Relatório Semanal' },
            ].map((btn) => (
              <button
                key={btn.action}
                onClick={() => runAction(btn.action)}
                disabled={running}
                className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
                type="button"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
          <h2 className="font-semibold mb-2">Atualizações Pendentes</h2>
          <p className="text-3xl font-bold text-orange-600">{stats.pendingRefresh}</p>
          <Link href="/admin/growth/refresh" className="text-sm text-brand-primary mt-1 inline-block">
            Ver tarefas de refresh →
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
        <h2 className="font-semibold mb-4">Fluxo de Crescimento</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Research → Writer → SEO Engine → Publish → Google → <strong>Analytics</strong> → AI Strategist → Novo Conteúdo</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mt-4">
          {[
            'Traffic Analyzer',
            'Search Performance',
            'Content Performance',
            'Opportunity Detector',
            'AI Recommendations',
            'Growth Reports',
          ].map((m) => (
            <div key={m} className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              {m}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
