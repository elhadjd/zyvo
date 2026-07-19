'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Traffic {
  users: number;
  sessions: number;
  conversions: number;
  organicClicks: number;
  weeklyGrowth: number;
  topPages: { pageUrl: string; clicks: number; impressions: number }[];
}

export default function GrowthTrafficPage() {
  const [data, setData] = useState<Traffic | null>(null);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/growth/run?country=${country}&type=traffic`)
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
        <h1 className="text-2xl font-bold">Tráfego</h1>
        <select value={country} onChange={(e) => { setCountry(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg">
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Usuários', value: data.users },
          { label: 'Sessões', value: data.sessions },
          { label: 'Cliques Orgânicos', value: data.organicClicks },
          { label: 'Crescimento', value: `${data.weeklyGrowth >= 0 ? '+' : ''}${data.weeklyGrowth}%` },
        ].map((item) => (
          <div key={item.label} className="bg-white dark:bg-gray-900 rounded-xl border p-4 text-center">
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
        <h2 className="font-semibold mb-4">Top Páginas</h2>
        {data.topPages?.map((page) => (
          <div key={page.pageUrl} className="flex justify-between py-2 border-b last:border-0">
            <span className="text-sm">{page.pageUrl}</span>
            <span className="text-sm text-gray-500">{page.clicks} cliques</span>
          </div>
        ))}
      </div>
    </div>
  );
}
