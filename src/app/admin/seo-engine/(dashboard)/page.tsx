'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Loader2,
  Play,
  Search,
  Link2,
  Layers,
  Map,
  FileText,
  RefreshCw,
  TrendingUp,
  Globe,
} from 'lucide-react';

interface Stats {
  indexableArticles: number;
  keywordsCount: number;
  clustersCount: number;
  internalLinksCount: number;
  sitemapEntries: number;
  programmaticPages: number;
  freshnessPending: number;
  opportunities: number;
}

export default function SeoEngineDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/seo-engine/stats?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, [country, result]);

  async function runAction(action: string) {
    setRunning(true);
    setResult(null);
    const res = await fetch('/api/admin/seo-engine/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, countryCode: country }),
    });
    const data = await res.json();
    if (res.ok) {
      setResult(`Ação "${action}" concluída: ${JSON.stringify(data)}`);
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
          <h1 className="text-2xl font-bold">SEO Growth Engine</h1>
          <p className="text-gray-500">Motor de crescimento orgânico programático</p>
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
            <option value="ao">Angola</option>
            <option value="mz">Moçambique</option>
          </select>
          <button
            onClick={() => runAction('full_optimization')}
            disabled={running}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg disabled:opacity-50"
            type="button"
          >
            {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Otimizar SEO
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
          { label: 'Artigos Indexáveis', value: stats.indexableArticles, icon: FileText, href: '/admin/ai-engine/articles' },
          { label: 'Keywords SEO', value: stats.keywordsCount, icon: Search, href: '/admin/seo-engine/keywords' },
          { label: 'Topic Clusters', value: stats.clustersCount, icon: Layers, href: '/admin/seo-engine/clusters' },
          { label: 'Links Internos', value: stats.internalLinksCount, icon: Link2, href: '/admin/seo-engine/links' },
          { label: 'Sitemap Entries', value: stats.sitemapEntries, icon: Map, href: '/admin/seo-engine/sitemap' },
          { label: 'Páginas Programáticas', value: stats.programmaticPages, icon: Globe, href: '/admin/seo-engine/programmatic' },
          { label: 'Atualizações Pendentes', value: stats.freshnessPending, icon: RefreshCw, href: '/admin/seo-engine/freshness' },
          { label: 'Oportunidades SEO', value: stats.opportunities, icon: TrendingUp, href: '/admin/research-engine/keywords' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
          <h2 className="font-semibold mb-4">Ações Rápidas</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { action: 'sync_sitemaps', label: 'Sincronizar Sitemaps' },
              { action: 'generate_programmatic', label: 'Gerar Páginas Programáticas' },
              { action: 'freshness_check', label: 'Verificar Frescor' },
            ].map((btn) => (
              <button
                key={btn.action}
                onClick={() => runAction(btn.action)}
                disabled={running}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50"
                type="button"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
          <h2 className="font-semibold mb-4">Fluxo SEO</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Research Engine → Knowledge Base → Writer → Fact Checker</p>
            <p>→ <strong>SEO Growth Engine</strong> → Admin Approval → Publish → Google Index</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
        <h2 className="font-semibold mb-4">Módulos do SEO Engine</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[
            'Keyword Analyzer',
            'Content Optimizer',
            'Internal Link Builder',
            'Schema Generator',
            'Sitemap Manager',
            'Topic Cluster Manager',
            'SEO Monitor',
            'Programmatic SEO',
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
