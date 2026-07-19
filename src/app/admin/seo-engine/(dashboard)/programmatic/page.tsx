'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Page {
  id: number;
  slug: string;
  country: string;
  industry: string;
  title: string;
  status: string;
  metaTitle: string;
}

export default function SeoProgrammaticPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/seo-engine/run?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setPages(data);
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
        <h1 className="text-2xl font-bold">Páginas Programáticas</h1>
        <select value={country} onChange={(e) => { setCountry(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg">
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
            <option value="ci">Côte d&apos;Ivoire</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>
      <div className="grid gap-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white dark:bg-gray-900 rounded-xl border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{page.title}</h3>
              <span className={`text-xs px-2 py-1 rounded ${page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {page.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">/{page.country}/erp/{page.slug}</p>
            <p className="text-sm text-gray-400 mt-1">{page.metaTitle}</p>
          </div>
        ))}
        {pages.length === 0 && (
          <p className="text-center text-gray-500 py-12">Nenhuma página programática. Execute &quot;Gerar Páginas Programáticas&quot; no dashboard.</p>
        )}
      </div>
    </div>
  );
}
