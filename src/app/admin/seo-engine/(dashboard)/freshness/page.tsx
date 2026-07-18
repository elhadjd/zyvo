'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Check {
  id: number;
  articleId: number;
  status: string;
  reason: string;
  severity: string;
  suggestedAction: string | null;
  checkedAt: string;
}

export default function SeoFreshnessPage() {
  const [checks, setChecks] = useState<Check[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/seo-engine/run?type=freshness')
      .then((r) => r.json())
      .then((data) => {
        setChecks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;

  return (
    <div className="p-8">
      <Link href="/admin/seo-engine" className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-brand-primary">
        <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-6">Content Freshness</h1>
      <div className="grid gap-4">
        {checks.map((check) => (
          <div key={check.id} className="bg-white dark:bg-gray-900 rounded-xl border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Artigo #{check.articleId}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                check.severity === 'high' ? 'bg-red-100 text-red-800' :
                check.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {check.severity}
              </span>
            </div>
            <p className="text-sm mb-2">{check.reason}</p>
            {check.suggestedAction && (
              <p className="text-sm text-brand-primary">Ação: {check.suggestedAction}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">{new Date(check.checkedAt).toLocaleDateString()}</p>
          </div>
        ))}
        {checks.length === 0 && (
          <p className="text-center text-gray-500 py-12">Nenhuma atualização pendente</p>
        )}
      </div>
    </div>
  );
}
