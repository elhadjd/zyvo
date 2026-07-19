'use client';

import { useCallback, useEffect, useState } from 'react';
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
  Wifi,
  WifiOff,
  Trash2,
} from 'lucide-react';

interface GoogleMeta {
  ga4Configured: boolean;
  gscConfigured: boolean;
  hasGaData: boolean;
  hasGscData: boolean;
  dataSource: 'google' | 'none';
}

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
  google?: GoogleMeta;
}

interface GoogleStatus {
  credentialsConfigured: boolean;
  ready: boolean;
  ga4: {
    configured: boolean;
    propertyId: string | null;
    connected: boolean;
    check: { ok: boolean; error?: string; detail?: string };
  };
  gsc: {
    configured: boolean;
    siteUrl: string;
    connected: boolean;
    check: { ok: boolean; error?: string; detail?: string };
  };
}

export default function GrowthDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [googleStatus, setGoogleStatus] = useState<GoogleStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [country, setCountry] = useState('gn');

  const loadData = useCallback(async () => {
    setLoading(true);
    const [statsRes, googleRes] = await Promise.all([
      fetch(`/api/admin/growth/stats?country=${country}`),
      fetch('/api/admin/growth/google-status'),
    ]);

    if (statsRes.ok) setStats(await statsRes.json());
    if (googleRes.ok) setGoogleStatus(await googleRes.json());
    setLoading(false);
  }, [country]);

  useEffect(() => {
    loadData();
  }, [loadData, result]);

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
      if (action === 'sync_data') {
        setResult(
          `Sync concluído: ${data.gaRows ?? 0} linhas GA4, ${data.gscRows ?? 0} linhas GSC` +
            (data.errors?.length ? ` (avisos: ${data.errors.join('; ')})` : '')
        );
      } else if (action === 'purge_demo') {
        setResult(
          `Dados demo removidos (${data.removed?.visitorRows ?? 0} GA, ${data.removed?.gscRows ?? 0} GSC). Execute Sync para importar dados reais.`
        );
      } else if (action === 'test_google') {
        setGoogleStatus(data);
        setResult(data.ready ? 'Ligação Google OK (GA4 + GSC)' : 'Ligação Google incompleta — veja painel abaixo');
      } else {
        setResult(`Ação "${action}" concluída com sucesso`);
      }
    } else {
      setResult(`Erro: ${data.error}`);
    }
    setRunning(false);
  }

  if (loading || !stats) {
    return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;
  }

  const usingDemo = stats.google?.dataSource === 'none' && (stats.visitors > 0 || stats.organicClicks > 0);
  const googleReady = googleStatus?.ready ?? false;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Growth Analytics Engine</h1>
          <p className="text-gray-500">Análise inteligente de crescimento orgânico — dados reais Google</p>
        </div>
        <div className="flex gap-3">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="gn">Guinée</option>
            <option value="sn">Sénégal</option>
            <option value="ci">Côte d&apos;Ivoire</option>
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

      {usingDemo && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
          <strong>Dados antigos na base de dados.</strong> Os números podem ser de uma sincronização demo anterior.
          Clique <strong>Remover dados demo</strong> e depois <strong>Sync GSC/GA4</strong> para importar dados reais.
        </div>
      )}

      {result && (
        <div
          className={`mb-6 p-4 border rounded-lg text-sm ${
            result.startsWith('Erro')
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          {result}
        </div>
      )}

      <div className="mb-8 bg-white dark:bg-gray-900 rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            {googleReady ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            Ligação Google
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => runAction('test_google')}
              disabled={running}
              className="px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Testar ligação
            </button>
            <button
              type="button"
              onClick={() => runAction('purge_demo')}
              disabled={running}
              className="px-3 py-1.5 border border-red-200 text-red-700 rounded-lg text-sm hover:bg-red-50 disabled:opacity-50 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remover dados demo
            </button>
          </div>
        </div>

        {googleStatus ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className={`p-4 rounded-lg border ${googleStatus.ga4.connected ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <p className="font-medium">GA4 {googleStatus.ga4.connected ? '✓' : '✗'}</p>
              <p className="text-gray-600 mt-1">Property: {googleStatus.ga4.propertyId ?? '—'}</p>
              {!googleStatus.ga4.connected && (
                <p className="text-red-700 mt-2 text-xs">{googleStatus.ga4.check.error ?? googleStatus.ga4.check.detail}</p>
              )}
            </div>
            <div className={`p-4 rounded-lg border ${googleStatus.gsc.connected ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <p className="font-medium">Search Console {googleStatus.gsc.connected ? '✓' : '✗'}</p>
              <p className="text-gray-600 mt-1">Site: {googleStatus.gsc.siteUrl}</p>
              {!googleStatus.gsc.connected && (
                <p className="text-red-700 mt-2 text-xs">{googleStatus.gsc.check.error ?? googleStatus.gsc.check.detail}</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">A carregar estado da ligação…</p>
        )}

        <p className="text-xs text-gray-500 mt-4">
          Env: <code>GA4_PROPERTY_ID</code>, <code>GOOGLE_SERVICE_ACCOUNT_JSON</code>, <code>GSC_SITE_URL</code>.
          A service account precisa de acesso em GA4 (Viewer) e GSC (propriedade).
        </p>
      </div>

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
          <p className="text-sm text-gray-500 mt-1">{stats.sessions} sessões (últimos 30 dias)</p>
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
        <p className="text-sm text-gray-600">
          Research → Writer → SEO Engine → Publish → Google → <strong>Analytics</strong> → AI Strategist → Novo Conteúdo
        </p>
      </div>
    </div>
  );
}
