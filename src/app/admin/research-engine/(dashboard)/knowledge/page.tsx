'use client';

import { useEffect, useState } from 'react';
import { Loader2, Check, X, Search } from 'lucide-react';

interface Document {
  id: number;
  title: string;
  sourceName: string;
  sourceUrl: string;
  category: string;
  validationStatus: string;
  createdAt: string;
}

export default function ResearchKnowledgePage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ totalResults: number; knowledgeEntries: { title: string; summary: string }[] } | null>(null);

  async function fetchDocs() {
    setLoading(true);
    const res = await fetch(`/api/admin/research-engine/knowledge?country=${country}`);
    if (res.ok) setDocuments(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchDocs(); }, [country]);

  async function handleAction(id: number, action: 'approve' | 'reject') {
    await fetch('/api/admin/research-engine/knowledge', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action }),
    });
    fetchDocs();
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/admin/research-engine/knowledge?country=${country}&q=${encodeURIComponent(searchQuery)}`);
    if (res.ok) setSearchResults(await res.json());
  }

  const STATUS_COLORS: Record<string, string> = {
    validated: 'bg-green-100 text-green-700',
    requires_review: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
    pending: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        <select value={country} onChange={(e) => setCountry(e.target.value)} className="px-3 py-2 border rounded-lg">
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
        </select>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Pesquisar ex: "IVA na Guiné"'
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg">
          <Search className="w-4 h-4" /> Pesquisar
        </button>
      </form>

      {searchResults && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-medium mb-2">{searchResults.totalResults} resultados para &quot;{searchQuery}&quot;</p>
          {searchResults.knowledgeEntries.map((e, i) => (
            <p key={i} className="text-sm text-gray-700">{e.title}: {e.summary.slice(0, 150)}...</p>
          ))}
        </div>
      )}

      {loading ? <Loader2 className="w-8 h-8 animate-spin mx-auto" /> : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white border rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{doc.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{doc.sourceName} · {doc.category}</p>
                  <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${STATUS_COLORS[doc.validationStatus]}`}>
                    {doc.validationStatus}
                  </span>
                </div>
                {doc.validationStatus === 'requires_review' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleAction(doc.id, 'approve')} className="p-2 text-green-600 hover:bg-green-50 rounded" type="button"><Check className="w-4 h-4" /></button>
                    <button onClick={() => handleAction(doc.id, 'reject')} className="p-2 text-red-600 hover:bg-red-50 rounded" type="button"><X className="w-4 h-4" /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {documents.length === 0 && <p className="text-center text-gray-500 py-12">Nenhum documento. Execute a pesquisa diária.</p>}
        </div>
      )}
    </div>
  );
}
