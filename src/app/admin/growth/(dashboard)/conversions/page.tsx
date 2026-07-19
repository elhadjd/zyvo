'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface ConversionSummary {
  total: number;
  byAction: Record<string, number>;
}

export default function GrowthConversionsPage() {
  const [data, setData] = useState<ConversionSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetch(`/api/admin/growth/run?country=${country}&type=conversions`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [country]);

  if (loading || !data) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-20 text-brand-primary" />;

  const actionLabels: Record<string, string> = {
    signup: 'Cadastro',
    demo_request: 'Pedido de Demo',
    free_trial_click: 'Teste Grátis',
    whatsapp_contact: 'WhatsApp',
    contact_form: 'Formulário',
    pricing_view: 'Ver Preços',
  };

  return (
    <div className="p-8">
      <Link href="/admin/growth" className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-brand-primary">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Conversões</h1>
        <select value={country} onChange={(e) => { setCountry(e.target.value); setLoading(true); }} className="px-3 py-2 border rounded-lg">
          <option value="gn">Guinée</option>
          <option value="sn">Sénégal</option>
            <option value="ci">Côte d&apos;Ivoire</option>
          <option value="ao">Angola</option>
          <option value="mz">Moçambique</option>
        </select>
      </div>
      <p className="text-3xl font-bold mb-8">{data.total} conversões totais</p>
      <div className="grid gap-4">
        {Object.entries(data.byAction).map(([action, count]) => (
          <div key={action} className="flex justify-between bg-white dark:bg-gray-900 rounded-xl border p-4">
            <span>{actionLabels[action] ?? action}</span>
            <span className="font-bold">{count}</span>
          </div>
        ))}
        {Object.keys(data.byAction).length === 0 && (
          <p className="text-gray-500">Nenhuma conversão registrada. Use POST /api/analytics/conversion para rastrear.</p>
        )}
      </div>
    </div>
  );
}
