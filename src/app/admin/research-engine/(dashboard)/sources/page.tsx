'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, ExternalLink, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import AdminCountrySelect from '@/components/admin/AdminCountrySelect';

interface Source {
  id: number;
  name: string;
  url: string;
  type: string;
  category: string;
  trustLevel: number;
  status: string;
  lastChecked: string | null;
  countryCode: string;
}

export default function ResearchSourcesPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', url: '', type: 'government', category: 'Geral' });
  const [testing, setTesting] = useState<number | null>(null);
  const [testingAll, setTestingAll] = useState(false);

  async function fetchSources() {
    setLoading(true);
    const res = await fetch(`/api/admin/research-engine/sources?country=${country}`);
    if (res.ok) setSources(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchSources(); }, [country]);

  async function addSource(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/admin/research-engine/sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, countryCode: country }),
    });
    setShowForm(false);
    setForm({ name: '', url: '', type: 'government', category: 'Geral' });
    fetchSources();
  }

  async function testSource(id: number) {
    setTesting(id);
    await fetch('/api/admin/research-engine/sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'test', id }),
    });
    fetchSources();
    setTesting(null);
  }

  async function testAllSources() {
    setTestingAll(true);
    await fetch('/api/admin/research-engine/sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'test_all', countryCode: country }),
    });
    await fetchSources();
    setTestingAll(false);
  }

  const STATUS_ICON: Record<string, React.ReactNode> = {
    active: <CheckCircle className="w-4 h-4 text-green-500" />,
    error: <XCircle className="w-4 h-4 text-red-500" />,
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Fontes de Pesquisa</h1>
        <div className="flex gap-3">
          <AdminCountrySelect value={country} onChange={setCountry} scope="all" />
          <button
            onClick={testAllSources}
            disabled={testingAll}
            type="button"
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
          >
            {testingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Testar todas
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg" type="button">
            <Plus className="w-4 h-4" /> Adicionar Fonte
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={addSource} className="bg-white border rounded-xl p-6 mb-6 grid grid-cols-2 gap-4">
          <input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 border rounded-lg" required />
          <input placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="px-3 py-2 border rounded-lg" required />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-3 py-2 border rounded-lg">
            <option value="government">Government</option>
            <option value="official">Official</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="news">News</option>
          </select>
          <input placeholder="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-3 py-2 border rounded-lg" />
          <button type="submit" className="col-span-2 py-2 bg-brand-primary text-white rounded-lg">Guardar</button>
        </form>
      )}

      {loading ? <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-primary" /> : (
        <div className="space-y-3">
          {sources.map((s) => (
            <div key={s.id} className="bg-white dark:bg-gray-900 border rounded-xl p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {STATUS_ICON[s.status]}
                  <h3 className="font-semibold">{s.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">{s.type}</span>
                  <span className="text-xs text-gray-500">Trust: {s.trustLevel}/100</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{s.url} · {s.category}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => testSource(s.id)} disabled={testing === s.id} className="px-3 py-1.5 text-sm border rounded-lg" type="button">
                  {testing === s.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Testar'}
                </button>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="p-1.5 border rounded-lg">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
