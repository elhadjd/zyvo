'use client';

import { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';

interface CountryConfig {
  countryCode: string;
  language: string;
  enabled: boolean;
  publishFrequency: string;
  autoPublish: boolean;
  requireApproval: boolean;
  categories: string[];
}

export default function AdminSettingsPage() {
  const [configs, setConfigs] = useState<CountryConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/ai-content/settings')
      .then((r) => r.json())
      .then((data) => {
        setConfigs(data);
        setLoading(false);
      });
  }, []);

  async function saveConfig(config: CountryConfig) {
    setSaving(true);
    await fetch('/api/admin/ai-content/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    setSaving(false);
  }

  function updateConfig(countryCode: string, field: string, value: unknown) {
    setConfigs((prev) =>
      prev.map((c) => (c.countryCode === countryCode ? { ...c, [field]: value } : c))
    );
  }

  const countryNames: Record<string, string> = {
    gn: 'Guinée',
    sn: 'Sénégal',
    ao: 'Angola',
    mz: 'Moçambique',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Configurações por País</h1>

      <div className="space-y-6">
        {configs.map((config) => (
          <div key={config.countryCode} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {countryNames[config.countryCode] ?? config.countryCode.toUpperCase()}
              </h2>
              <button
                onClick={() => saveConfig(config)}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm disabled:opacity-50"
                type="button"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Salvar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.enabled}
                  onChange={(e) => updateConfig(config.countryCode, 'enabled', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">País ativo</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.autoPublish}
                  onChange={(e) => updateConfig(config.countryCode, 'autoPublish', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Publicação automática</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={config.requireApproval}
                  onChange={(e) => updateConfig(config.countryCode, 'requireApproval', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Exigir aprovação manual</span>
              </label>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Frequência</label>
                <select
                  value={config.publishFrequency}
                  onChange={(e) => updateConfig(config.countryCode, 'publishFrequency', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="daily">Diária</option>
                  <option value="weekly">Semanal</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Idioma</label>
                <input
                  value={config.language}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-500 mb-1">Categorias</label>
              <div className="flex flex-wrap gap-2">
                {config.categories.map((cat) => (
                  <span key={cat} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">{cat}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="font-semibold mb-2">Automação (Cron)</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Configure um cron job para chamar <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">GET /api/cron/daily-pipeline?country=gn</code> com header <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Authorization: Bearer CRON_SECRET</code>
        </p>
        <div className="mt-3 text-xs text-gray-500 space-y-1">
          <p>06:00 — Research Agent</p>
          <p>08:00 — Knowledge Organizer</p>
          <p>10:00 — Content Writer</p>
          <p>12:00 — SEO Optimizer</p>
          <p>14:00 — Fact Checker</p>
          <p>15:00 — Translation</p>
          <p>16:00 — Publisher</p>
        </div>
      </div>
    </div>
  );
}
