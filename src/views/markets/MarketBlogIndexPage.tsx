'use client';

import { ArrowRight, Clock } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import { getMarketBlogConfig, getMarketBlogPosts } from '@/data/markets/blog';
import MarketBreadcrumbs, { useMarketPageSeo } from '@/components/markets/MarketBreadcrumbs';
import LocalizedLink from '@/components/markets/LocalizedLink';

import type { MarketBlogPost } from '@/data/markets/blog/types';

interface MarketBlogIndexPageProps {
  posts?: MarketBlogPost[];
}

export default function MarketBlogIndexPage({ posts: serverPosts }: MarketBlogIndexPageProps = {}) {
  const { marketCode } = useMarket();
  const pageSeo = useMarketPageSeo();
  const config = getMarketBlogConfig(marketCode);
  const posts = serverPosts ?? getMarketBlogPosts(marketCode);

  if (!config) return null;

  return (
    <>
      <MarketBreadcrumbs />
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {pageSeo?.h1 ?? config.indexH1}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">{config.indexSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-brand-primary/40 dark:hover:border-brand-accent/40 transition-all hover:shadow-lg"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium px-2 py-1 bg-brand-primary-light dark:bg-brand-primary/20 text-brand-primary dark:text-brand-accent rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                    <LocalizedLink href={`/blog/${post.slug}`}>{post.title}</LocalizedLink>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.author} ·{' '}
                      {new Date(post.date).toLocaleDateString(config.locale, {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <LocalizedLink
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-brand-primary dark:text-brand-accent"
                    >
                      {config.readMoreLabel}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </LocalizedLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
