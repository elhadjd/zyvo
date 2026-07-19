'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

interface ArticleDetail {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  introduction: string;
  content: string[];
  faq: { question: string; answer: string }[];
  conclusion: string;
  cta: string;
  category: string;
  status: string;
  countryCode: string;
  seo?: { metaTitle: string; metaDescription: string; keywords: string };
  factCheck?: { status: string; issues: { type: string; detail: string; severity: string }[]; checkerNotes: string };
}

export default function AdminArticleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/ai-content/articles/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      });
  }, [id]);

  async function handleSave() {
    if (!article) return;
    setSaving(true);
    await fetch(`/api/admin/ai-content/articles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: article.title,
        excerpt: article.excerpt,
        introduction: article.introduction,
        content: article.content,
        faq: article.faq,
        conclusion: article.conclusion,
        cta: article.cta,
        category: article.category,
      }),
    });
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (!article) return <p className="p-8">Artigo não encontrado.</p>;

  return (
    <div className="p-8 max-w-4xl">
      <Link
        href="/admin/ai-content/articles"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar aos artigos
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Artigo</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover disabled:opacity-50"
          type="button"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Salvar
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
          <input
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resumo</label>
          <textarea
            value={article.excerpt}
            onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Introdução</label>
          <textarea
            value={article.introduction}
            onChange={(e) => setArticle({ ...article, introduction: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conteúdo</label>
          {article.content.map((para, i) => (
            <textarea
              key={i}
              value={para}
              onChange={(e) => {
                const newContent = [...article.content];
                newContent[i] = e.target.value;
                setArticle({ ...article, content: newContent });
              }}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 mb-2"
            />
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Conclusão</label>
          <textarea
            value={article.conclusion}
            onChange={(e) => setArticle({ ...article, conclusion: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
          />
        </div>

        {article.seo && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">SEO Metadata</h3>
            <p className="text-sm"><strong>Meta Title:</strong> {article.seo.metaTitle}</p>
            <p className="text-sm mt-1"><strong>Meta Description:</strong> {article.seo.metaDescription}</p>
            <p className="text-sm mt-1"><strong>Keywords:</strong> {article.seo.keywords}</p>
          </div>
        )}

        {article.factCheck && (
          <div className={`rounded-lg p-4 ${article.factCheck.status === 'passed' ? 'bg-green-50' : 'bg-red-50'}`}>
            <h3 className="font-semibold mb-2">Fact Check: {article.factCheck.status}</h3>
            {article.factCheck.issues.map((issue, i) => (
              <p key={i} className="text-sm text-red-700">
                [{issue.severity}] {issue.type}: {issue.detail}
              </p>
            ))}
            {article.factCheck.checkerNotes && (
              <p className="text-sm mt-2 text-gray-600">{article.factCheck.checkerNotes}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
