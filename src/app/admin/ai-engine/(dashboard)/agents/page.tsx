'use client';

import { useEffect, useState } from 'react';
import { Loader2, Play } from 'lucide-react';

interface Agent {
  id: number;
  code: string;
  name: string;
  description: string;
  enabled: boolean;
  status: string;
  schedule: string;
  lastRunAt: string | null;
}

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState<string | null>(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents() {
    const res = await fetch('/api/admin/ai-content/agents');
    if (res.ok) setAgents(await res.json());
    setLoading(false);
  }

  async function toggleAgent(code: string, enabled: boolean) {
    await fetch('/api/admin/ai-content/agents', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, enabled }),
    });
    fetchAgents();
  }

  async function runAgent(code: string) {
    setRunning(code);
    await fetch('/api/admin/ai-content/run-pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'agent', agent: code, countryCode: 'gn' }),
    });
    setRunning(null);
    fetchAgents();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Agentes de IA</h1>

      <div className="space-y-4">
        {agents.map((agent) => (
          <div key={agent.code} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded font-mono">{agent.code}</span>
                  <span className={`text-xs px-2 py-1 rounded ${agent.status === 'running' ? 'bg-blue-100 text-blue-700' : agent.status === 'error' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                    {agent.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{agent.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Schedule: {agent.schedule} ·{' '}
                  {agent.lastRunAt ? `Última execução: ${new Date(agent.lastRunAt).toLocaleString('fr-FR')}` : 'Nunca executado'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => runAgent(agent.code)}
                  disabled={running === agent.code || !agent.enabled}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  type="button"
                >
                  {running === agent.code ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                  Executar
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agent.enabled}
                    onChange={(e) => toggleAgent(agent.code, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary" />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
