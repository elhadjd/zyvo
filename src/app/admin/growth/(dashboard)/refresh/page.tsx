'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface Task {
  id: number;
  articleId: number;
  reason: string;
  issues: string[];
  priority: string;
  status: string;
}

export default function GrowthRefreshPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/growth/run?type=refresh')
      .then((r) => r.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;

  return (
    <div className="p-8">
      <Link href="/admin/growth" className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-brand-primary">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      <h1 className="text-2xl font-bold mb-6">Tarefas de Atualização</h1>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white dark:bg-gray-900 rounded-xl border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Artigo #{task.articleId}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
              }`}>{task.priority}</span>
            </div>
            <p className="text-sm mb-2">{task.reason}</p>
            <ul className="text-sm text-gray-500">
              {(task.issues ?? []).map((issue, i) => (
                <li key={i}>• {issue}</li>
              ))}
            </ul>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 py-12">Nenhuma tarefa de atualização pendente</p>
        )}
      </div>
    </div>
  );
}
