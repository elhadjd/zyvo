'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, ExternalLink } from 'lucide-react';

export default function SeoSitemapPage() {
  const [stats, setStats] = useState<{ sitemapEntries: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/seo-engine/stats')
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;

  const sitemaps = [
    { path: '/sitemap.xml', label: 'Sitemap Index' },
    { path: '/sitemap-articles.xml', label: 'Artigos' },
    { path: '/sitemap-countries.xml', label: 'Países' },
    { path: '/sitemap-categories.xml', label: 'Categorias' },
    { path: '/sitemap-programmatic.xml', label: 'Programático' },
  ];

  return (
    <div className="p-8">
      <Link href="/admin/seo-engine" className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-brand-primary">
        <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-6">Smart Sitemap</h1>
      <p className="text-gray-500 mb-8">{stats.sitemapEntries} entradas no sitemap</p>
      <div className="grid gap-4">
        {sitemaps.map((s) => (
          <a
            key={s.path}
            href={s.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-xl border p-4 hover:border-brand-primary"
          >
            <span className="font-medium">{s.label}</span>
            <span className="flex items-center gap-2 text-sm text-brand-primary">
              {s.path} <ExternalLink className="w-4 h-4" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
