'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Score {
  articleId: number;
  totalScore: number;
  seoScore: number;
  engagementScore: number;
  conversionScore: number;
  traffic: number;
}

export default function GrowthContentPage() {
  const [top, setTop] = useState<Score[]>([]);
  const [weak, setWeak] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/growth/content?country=${country}&type=top`).then((r) => r.json()),
      fetch(`/api/admin/growth/content?country=${country}&type=weak`).then((r) => r.json()),
    ]).then(([topData, weakData]) => {
      setTop(topData);
      setWeak(weakData);
      setLoading(false);
    });
  }, [country]);

  if (loading) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;

  return (
    <div className="p-8">
      <Link href="/admin/growth" className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-brand-primary">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Performance de Conteúdo</h1>
        <select value={country} onChange={(e) => { setCountry(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg">
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
            <option value="ci">Côte d&apos;Ivoire</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
          <h2 className="font-semibold mb-4 text-green-700">Top Artigos</h2>
          {top.map((a) => (
            <div key={a.articleId} className="flex justify-between py-3 border-b last:border-0">
              <span>Artigo #{a.articleId}</span>
              <span className="font-bold text-green-600">{a.totalScore}</span>
            </div>
          ))}
          {top.length === 0 && <p className="text-gray-500">Execute análise primeiro</p>}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
          <h2 className="font-semibold mb-4 text-red-700">Artigos Fracos</h2>
          {weak.map((a) => (
            <div key={a.articleId} className="py-3 border-b last:border-0">
              <div className="flex justify-between">
                <span>Artigo #{a.articleId}</span>
                <span className="font-bold text-red-600">{a.totalScore}</span>
              </div>
              <p className="text-xs text-gray-500">SEO: {a.seoScore} · Engagement: {a.engagementScore} · Conversion: {a.conversionScore}</p>
            </div>
          ))}
          {weak.length === 0 && <p className="text-gray-500">Nenhum artigo analisado</p>}
        </div>
      </div>
    </div>
  );
}
