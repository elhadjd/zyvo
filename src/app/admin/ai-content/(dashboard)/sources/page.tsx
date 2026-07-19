'use client';

import { useEffect, useState } from 'react';
import { Loader2, ExternalLink } from 'lucide-react';

interface Source {
  id: number;
  title: string;
  url: string;
  domain: string;
  category: string;
  keywords: string[];
  snippet: string;
  relevanceScore: number;
  fetchedAt: string;
}

export default function AdminSourcesPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/ai-content/sources?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setSources(data);
        setLoading(false);
      });
  }, [country]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fontes de Pesquisa</h1>
        <select
          value={country}
          onChange={(e) => { setCountry(e.target.value); setLoading(true); }}
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700"
        >
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
            <option value="ci">Côte d'Ivoire</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>

      {loading ? (
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary mx-auto" />
      ) : sources.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhuma fonte encontrada. Execute o Research Agent.</p>
      ) : (
        <div className="space-y-4">
          {sources.map((source) => (
            <div key={source.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{source.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{source.domain} · {source.category}</p>
                </div>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-brand-primary">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              {source.snippet && <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">{source.snippet}</p>}
              <div className="flex items-center gap-2 mt-3">
                {source.keywords?.map((kw) => (
                  <span key={kw} className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">{kw}</span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Score: {source.relevanceScore} · {new Date(source.fetchedAt).toLocaleString('fr-FR')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
