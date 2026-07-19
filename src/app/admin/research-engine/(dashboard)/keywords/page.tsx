'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function ResearchKeywordsPage() {
  const [keywords, setKeywords] = useState<{ id: number; keyword: string; category: string; seoScore: number; priority: string; searchIntent: string }[]>([]);
  const [opportunities, setOpportunities] = useState<{ id: number; topic: string; totalScore: number; category: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');
  const [tab, setTab] = useState<'keywords' | 'opportunities'>('keywords');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/admin/research-engine/keywords?country=${country}`).then((r) => r.json()),
      fetch(`/api/admin/research-engine/keywords?country=${country}&type=opportunities`).then((r) => r.json()),
    ]).then(([kw, opps]) => {
      setKeywords(kw);
      setOpportunities(opps);
      setLoading(false);
    });
  }, [country]);

  const PRIORITY_COLORS: Record<string, string> = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Keywords & Oportunidades</h1>
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="px-3 py-2 border rounded-lg">
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
            <option value="ci">Côte d'Ivoire</option>
        </select>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('keywords')} className={`px-4 py-2 rounded-lg text-sm ${tab === 'keywords' ? 'bg-brand-primary text-white' : 'border'}`} type="button">
          Keywords ({keywords.length})
        </button>
        <button onClick={() => setTab('opportunities')} className={`px-4 py-2 rounded-lg text-sm ${tab === 'opportunities' ? 'bg-brand-primary text-white' : 'border'}`} type="button">
          Oportunidades ({opportunities.length})
        </button>
      </div>

      {loading ? <Loader2 className="w-8 h-8 animate-spin mx-auto" /> : tab === 'keywords' ? (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50"><tr>
              <th className="text-left px-6 py-3 text-xs uppercase text-gray-500">Keyword</th>
              <th className="text-left px-6 py-3 text-xs uppercase text-gray-500">Categoria</th>
              <th className="text-left px-6 py-3 text-xs uppercase text-gray-500">Intent</th>
              <th className="text-left px-6 py-3 text-xs uppercase text-gray-500">SEO Score</th>
              <th className="text-left px-6 py-3 text-xs uppercase text-gray-500">Prioridade</th>
            </tr></thead>
            <tbody className="divide-y">
              {keywords.map((kw) => (
                <tr key={kw.id}>
                  <td className="px-6 py-4 font-medium">{kw.keyword}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{kw.category}</td>
                  <td className="px-6 py-4 text-sm">{kw.searchIntent}</td>
                  <td className="px-6 py-4"><span className="font-bold text-brand-primary">{kw.seoScore}</span></td>
                  <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded-full ${PRIORITY_COLORS[kw.priority]}`}>{kw.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-3">
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-white border rounded-xl p-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{opp.topic}</h3>
                <p className="text-sm text-gray-500">{opp.category} · {opp.status}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-brand-primary">{opp.totalScore}</p>
                <p className="text-xs text-gray-500">Content Score</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
