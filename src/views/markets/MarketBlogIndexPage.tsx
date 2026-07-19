'use client';

import { BookOpen, Tag } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useMarket } from '@/contexts/market-context';
import { getMarketBlogConfig } from '@/data/markets/blog';
import MarketBreadcrumbs, { useMarketPageSeo } from '@/components/markets/MarketBreadcrumbs';
import LocalizedLink from '@/components/markets/LocalizedLink';
import BlogPostCard from '@/components/markets/blog/BlogPostCard';
import type { MarketBlogPost } from '@/data/markets/blog/types';

interface MarketBlogIndexPageProps {
  posts?: MarketBlogPost[];
}

export default function MarketBlogIndexPage({ posts: serverPosts }: MarketBlogIndexPageProps = {}) {
  const { marketCode, market } = useMarket();
  const pageSeo = useMarketPageSeo();
  const config = getMarketBlogConfig(marketCode);
  const posts = serverPosts ?? [];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(posts.map((p) => p.category))].sort(),
    [posts]
  );

  const filtered = useMemo(
    () => (activeCategory ? posts.filter((p) => p.category === activeCategory) : posts),
    [posts, activeCategory]
  );

  const [featured, ...rest] = filtered;

  if (!config) return null;

  return (
    <>
      <MarketBreadcrumbs />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-brand-primary to-brand-primary-hover text-white">
        <div className="absolute inset-0 bg-[url('/og-image.png')] opacity-5 bg-cover bg-center" />
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Blog ZYVO {market.countryNameLocal}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {pageSeo?.h1 ?? config.indexH1}
            </h1>
            <p className="text-lg lg:text-xl text-white/85 leading-relaxed max-w-2xl">
              {config.indexSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category filters */}
          {categories.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 mb-10">
              <Tag className="w-4 h-4 text-gray-400 mr-1" />
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !activeCategory
                    ? 'bg-brand-primary text-white'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-brand-primary/40'
                }`}
              >
                Tous
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-brand-primary text-white'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-brand-primary/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Aucun article pour le moment.</p>
              <LocalizedLink href="/contact" className="inline-block mt-4 text-brand-primary font-medium">
                Contactez-nous
              </LocalizedLink>
            </div>
          ) : (
            <div className="space-y-10">
              {featured && (
                <BlogPostCard
                  post={featured}
                  locale={config.locale}
                  readMoreLabel={config.readMoreLabel}
                  featured
                />
              )}

              {rest.length > 0 && (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <BlogPostCard
                      key={post.slug}
                      post={post}
                      locale={config.locale}
                      readMoreLabel={config.readMoreLabel}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CTA strip */}
          <div className="mt-16 p-8 lg:p-12 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{config.ctaTitle}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">{config.ctaDescription}</p>
            <LocalizedLink
              href="/getting-started"
              className="inline-flex items-center px-8 py-3.5 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary-hover transition-colors shadow-lg shadow-brand-primary/20"
            >
              {config.ctaButton}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </>
  );
}
