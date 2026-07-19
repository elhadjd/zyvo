'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Check, X, Eye } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  status: string;
  countryCode: string;
  createdAt: string;
  publishedAt: string | null;
  factCheck?: { status: string; issues: { severity: string }[] };
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  pending_review: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-blue-100 text-blue-700',
  published: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  fact_check_failed: 'bg-red-100 text-red-800',
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [country, setCountry] = useState('gn');

  useEffect(() => {
    fetchArticles();
  }, [filter, country]);

  async function fetchArticles() {
    setLoading(true);
    const params = new URLSearchParams({ country });
    if (filter !== 'all') params.set('status', filter);
    const res = await fetch(`/api/admin/ai-content/articles?${params}`);
    if (res.ok) setArticles(await res.json());
    setLoading(false);
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/admin/ai-content/articles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchArticles();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Artigos</h1>
        <div className="flex gap-3">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <option value="gn">Guinée</option>
            <option value="sn">Sénégal</option>
            <option value="ci">Côte d'Ivoire</option>
            <option value="ao">Angola</option>
            <option value="mz">Moçambique</option>
          </select>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <option value="all">Todos</option>
            <option value="draft">Rascunho</option>
            <option value="pending_review">Pendente</option>
            <option value="approved">Aprovado</option>
            <option value="published">Publicado</option>
            <option value="fact_check_failed">Fact-check falhou</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary mx-auto" />
      ) : articles.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhum artigo encontrado.</p>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Título</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Categoria</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/ai-content/articles/${article.id}`}
                      className="font-medium text-gray-900 dark:text-white hover:text-brand-primary"
                    >
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{article.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[article.status] ?? ''}`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {article.status === 'pending_review' && (
                        <>
                          <button
                            onClick={() => updateStatus(article.id, 'approved')}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                            title="Aprovar"
                            type="button"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(article.id, 'rejected')}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Rejeitar"
                            type="button"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {article.status === 'approved' && (
                        <button
                          onClick={() => updateStatus(article.id, 'published')}
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                          type="button"
                        >
                          Publicar
                        </button>
                      )}
                      {article.status === 'published' && (
                        <a
                          href={`/${article.countryCode}/blog/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
