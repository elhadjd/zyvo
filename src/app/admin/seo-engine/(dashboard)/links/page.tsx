'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface InternalLink {
  id: number;
  sourceArticleId: number;
  targetUrl: string;
  anchorText: string;
  country: string;
  relevanceScore: number;
}

export default function SeoLinksPage() {
  const [links, setLinks] = useState<InternalLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/seo-engine/links?country=${country}`)
      .then((r) => r.json())
      .then((data) => {
        setLinks(data);
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
        <h1 className="text-2xl font-bold">Links Internos</h1>
        <select value={country} onChange={(e) => { setCountry(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg">
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
            <option value="ci">Côte d&apos;Ivoire</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="text-left p-4">Artigo Origem</th>
              <th className="text-left p-4">Anchor Text</th>
              <th className="text-left p-4">URL Destino</th>
              <th className="text-left p-4">Relevância</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} className="border-t">
                <td className="p-4">#{link.sourceArticleId}</td>
                <td className="p-4 font-medium">{link.anchorText}</td>
                <td className="p-4 text-brand-primary">{link.targetUrl}</td>
                <td className="p-4">{(link.relevanceScore * 100).toFixed(0)}%</td>
              </tr>
            ))}
            {links.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-gray-500">Nenhum link interno encontrado</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
