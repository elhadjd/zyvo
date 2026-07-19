'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface SearchData {
  totalClicks: number;
  totalImpressions: number;
  avgCtr: number;
  avgPosition: number;
  topKeywords: { keyword: string; clicks: number; impressions: number; position: number }[];
}

export default function GrowthSeoPage() {
  const [data, setData] = useState<SearchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/growth/seo?country=${country}&type=search`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [country]);

  if (loading || !data) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;

  return (
    <div className="p-8">
      <Link href="/admin/growth" className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-brand-primary">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Performance SEO</h1>
        <select value={country} onChange={(e) => { setCountry(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg">
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
            <option value="ci">Côte d&apos;Ivoire</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Cliques', value: data.totalClicks },
          { label: 'Impressões', value: data.totalImpressions },
          { label: 'CTR', value: `${(data.avgCtr * 100).toFixed(1)}%` },
          { label: 'Posição Média', value: data.avgPosition },
        ].map((item) => (
          <div key={item.label} className="bg-white dark:bg-gray-900 rounded-xl border p-4 text-center">
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-left p-4">Keyword</th>
              <th className="text-left p-4">Cliques</th>
              <th className="text-left p-4">Impressões</th>
              <th className="text-left p-4">Posição</th>
            </tr>
          </thead>
          <tbody>
            {data.topKeywords?.map((kw) => (
              <tr key={kw.keyword} className="border-t">
                <td className="p-4 font-medium">{kw.keyword}</td>
                <td className="p-4">{kw.clicks}</td>
                <td className="p-4">{kw.impressions}</td>
                <td className="p-4">{kw.position.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
