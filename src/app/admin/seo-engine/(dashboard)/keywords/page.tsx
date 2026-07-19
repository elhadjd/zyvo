'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Keyword {
  id: number;
  keyword: string;
  country: string;
  language: string;
  intent: string;
  difficulty: number;
  priorityScore: number;
  opportunity: string | null;
  isPrimary: boolean;
}

export default function SeoKeywordsPage() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/seo-engine/keywords?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setKeywords(data);
        setLoading(false);
      });
  }, [country]);

  if (loading) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;

  return (
    <div className="p-8">
      <Link href="/admin/seo-engine" className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-brand-primary">
        <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Keywords SEO</h1>
        <select value={country} onChange={(e) => { setCountry(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg">
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-left p-4">Keyword</th>
              <th className="text-left p-4">Intent</th>
              <th className="text-left p-4">Dificuldade</th>
              <th className="text-left p-4">Prioridade</th>
              <th className="text-left p-4">Principal</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((kw) => (
              <tr key={kw.id} className="border-t">
                <td className="p-4 font-medium">{kw.keyword}</td>
                <td className="p-4">{kw.intent}</td>
                <td className="p-4">{kw.difficulty}</td>
                <td className="p-4">{kw.priorityScore}</td>
                <td className="p-4">{kw.isPrimary ? '✓' : ''}</td>
              </tr>
            ))}
            {keywords.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Nenhuma keyword encontrada</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
