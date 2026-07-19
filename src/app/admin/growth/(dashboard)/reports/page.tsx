'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Report {
  id: number;
  summary: string;
  insights: string[];
  recommendations: string[];
  periodStart: string;
  periodEnd: string;
  metrics: Record<string, number>;
}

export default function GrowthReportsPage() {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/growth/seo?country=${country}&type=latest-report`)
      .then((r) => r.json())
      .then((data) => {
        setReport(data?.id ? data : null);
        setLoading(false);
      });
  }, [country]);

  if (loading) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;

  return (
    <div className="p-8">
      <Link href="/admin/growth" className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-brand-primary">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      <h1 className="text-2xl font-bold mb-6">Relatório Semanal IA</h1>

      <div className="mb-6">
        <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
          País
        </label>
        <select
          id="country-select"
          value={country}
          onChange={(e) => {
            setLoading(true);
            setCountry(e.target.value);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
          <option value="ci">Côte d'Ivoire</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>

      {!report ? (
        <p className="text-gray-500">Nenhum relatório gerado. Execute &quot;Relatório Semanal&quot; no dashboard.</p>
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
            <p className="text-sm text-gray-500 mb-2">{report.periodStart} → {report.periodEnd}</p>
            <p className="text-lg">{report.summary}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
            <h2 className="font-semibold mb-4">Insights</h2>
            <ul className="space-y-2">
              {report.insights?.map((insight, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-brand-primary">•</span> {insight}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border p-6">
            <h2 className="font-semibold mb-4">Recomendações</h2>
            <ul className="space-y-2">
              {report.recommendations?.map((rec, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-green-600">→</span> {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
