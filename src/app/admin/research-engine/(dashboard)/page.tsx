'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Play, Search, BookOpen, Globe, TrendingUp } from 'lucide-react';

interface Stats {
  sources: number;
  keywords: number;
  documents: number;
  opportunities: number;
}

export default function ResearchEngineDashboard() {
  const [stats, setStats] = useState<Stats>({ sources: 0, keywords: 0, documents: 0, opportunities: 0 });
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/research-engine/sources?country=${country}`).then((r) => r.json()),
      fetch(`/api/admin/research-engine/keywords?country=${country}`).then((r) => r.json()),
      fetch(`/api/admin/research-engine/keywords?country=${country}&type=opportunities`).then((r) => r.json()),
      fetch(`/api/admin/research-engine/knowledge?country=${country}`).then((r) => r.json()),
    ]).then(([sources, keywords, opportunities, documents]) => {
      setStats({
        sources: sources.length ?? 0,
        keywords: keywords.length ?? 0,
        opportunities: opportunities.length ?? 0,
        documents: documents.length ?? 0,
      });
      setLoading(false);
    });
  }, [country, result]);

  async function runResearch() {
    setRunning(true);
    setResult(null);
    const res = await fetch('/api/admin/research-engine/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'daily_research', countryCode: country }),
    });
    const data = await res.json();
    if (res.ok) {
      setResult(
        `Pesquisa concluída: ${data.keywordsDiscovered} keywords, ${data.opportunitiesFound} oportunidades, ${data.documentsExtracted} documentos extraídos`
      );
    } else {
      setResult(`Erro: ${data.error}`);
    }
    setRunning(false);
  }

  if (loading) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Research Engine</h1>
          <p className="text-gray-500">Motor de pesquisa, validação e conhecimento</p>
        </div>
        <div className="flex gap-3">
          <select value={country} onChange={(e) => { setCountry(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg">
            <option value="gn">Guinée</option>
            <option value="sn">Sénégal</option>
            <option value="ci">Côte d&apos;Ivoire</option>
            <option value="ao">Angola</option>
            <option value="mz">Moçambique</option>
          </select>
          <button onClick={runResearch} disabled={running} className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg disabled:opacity-50" type="button">
            {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Executar Pesquisa
          </button>
        </div>
      </div>

      {result && <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">{result}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Fontes Geridas', value: stats.sources, icon: Globe, href: '/admin/research-engine/sources' },
          { label: 'Keywords', value: stats.keywords, icon: Search, href: '/admin/research-engine/keywords' },
          { label: 'Oportunidades', value: stats.opportunities, icon: TrendingUp, href: '/admin/research-engine/keywords' },
          { label: 'Documentos', value: stats.documents, icon: BookOpen, href: '/admin/research-engine/knowledge' },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="bg-white dark:bg-gray-900 rounded-xl border p-6 hover:border-brand-primary transition-colors">
            <item.icon className="w-6 h-6 text-brand-primary mb-3" />
            <p className="text-3xl font-bold">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
        <h2 className="font-semibold mb-4">Arquitetura do Research Engine</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {['Source Manager', 'Keyword Discovery', 'Trend Analyzer', 'Opportunity Finder', 'Content Extractor', 'Source Validator', 'Knowledge Storage', 'Daily Research Job'].map((m) => (
            <div key={m} className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">{m}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
