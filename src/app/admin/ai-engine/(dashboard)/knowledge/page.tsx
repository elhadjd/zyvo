'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface KnowledgeEntry {
  id: number;
  title: string;
  category: string;
  sourceTitle: string;
  sourceUrl: string;
  keywords: string[];
  summary: string;
  verified: boolean;
  createdAt: string;
}

export default function AdminKnowledgePage() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/ai-content/knowledge?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });
  }, [country]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Base de Conhecimento</h1>
        <select
          value={country}
          onChange={(e) => { setCountry(e.target.value); setLoading(true); }}
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700"
        >
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
            <option value="ci">Côte d&apos;Ivoire</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>

      {loading ? (
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary mx-auto" />
      ) : entries.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Base vazia. Execute o Knowledge Organizer Agent.</p>
      ) : (
        <div className="grid gap-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs px-2 py-1 bg-brand-primary-light text-brand-primary rounded">{entry.category}</span>
                {entry.verified && <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Verificado</span>}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{entry.summary}</p>
              <p className="text-xs text-gray-400 mt-3">
                Fonte: {entry.sourceTitle} · {new Date(entry.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
