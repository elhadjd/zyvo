'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Opportunity {
  id: number;
  title: string;
  description: string;
  priority: string;
  suggestedAction: string;
  keyword: string | null;
  currentPosition: number | null;
}

export default function GrowthOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/growth/seo?country=${country}&type=opportunities`)
      .then((r) => r.json())
      .then((data) => {
        setOpportunities(data);
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
        <h1 className="text-2xl font-bold">Oportunidades SEO</h1>
        <select value={country} onChange={(e) => { setCountry(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg">
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
            <option value="ci">Côte d'Ivoire</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>
      <div className="grid gap-4">
        {opportunities.map((opp) => (
          <div key={opp.id} className="bg-white dark:bg-gray-900 rounded-xl border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{opp.title}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                opp.priority === 'high' ? 'bg-red-100 text-red-800' :
                opp.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>{opp.priority}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{opp.description}</p>
            <p className="text-sm text-brand-primary">→ {opp.suggestedAction}</p>
          </div>
        ))}
        {opportunities.length === 0 && (
          <p className="text-center text-gray-500 py-12">Execute análise para detectar oportunidades</p>
        )}
      </div>
    </div>
  );
}
