'use client';

import { useEffect, useState } from 'react';
import { Loader2, Play, RefreshCw } from 'lucide-react';

interface Job {
  id: number;
  type: string;
  countryCode: string;
  status: string;
  attempts: number;
  error: string | null;
  createdAt: string;
  completedAt: string | null;
}

const JOB_LABELS: Record<string, string> = {
  research_content: 'Research',
  organize_knowledge: 'Knowledge',
  generate_article: 'Writer',
  optimize_seo: 'SEO',
  fact_check: 'Fact Check',
  edit_article: 'Editor',
  publish_article: 'Publish',
};

export default function TasksPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  async function fetchJobs() {
    setLoading(true);
    const res = await fetch('/api/admin/ai-content/jobs');
    if (res.ok) setJobs(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchJobs(); }, []);

  async function processJobs() {
    setProcessing(true);
    await fetch('/api/admin/ai-content/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'process', maxJobs: 10 }),
    });
    await fetchJobs();
    setProcessing(false);
  }

  const STATUS_COLORS: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    retrying: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Fila de Tarefas</h1>
        <div className="flex gap-3">
          <button onClick={fetchJobs} className="flex items-center gap-2 px-3 py-2 border rounded-lg" type="button">
            <RefreshCw className="w-4 h-4" /> Atualizar
          </button>
          <button
            onClick={processJobs}
            disabled={processing}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg disabled:opacity-50"
            type="button"
          >
            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Processar Jobs
          </button>
        </div>
      </div>

      {loading ? (
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-brand-primary" />
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">País</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tentativas</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 text-sm">#{job.id}</td>
                  <td className="px-6 py-4 text-sm font-medium">{JOB_LABELS[job.type] ?? job.type}</td>
                  <td className="px-6 py-4 text-sm uppercase">{job.countryCode}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[job.status] ?? ''}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{job.attempts}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(job.createdAt).toLocaleString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {jobs.length === 0 && (
            <p className="text-center text-gray-500 py-12">Nenhuma tarefa na fila.</p>
          )}
        </div>
      )}
    </div>
  );
}
