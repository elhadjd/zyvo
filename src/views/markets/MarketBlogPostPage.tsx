'use client';

import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import { getMarketBlogConfig, getMarketBlogPostBySlug } from '@/data/markets/blog';
import MarketBreadcrumbs, { useMarketPageSeo } from '@/components/markets/MarketBreadcrumbs';
import LocalizedLink from '@/components/markets/LocalizedLink';
import BlogShareButtons from '@/components/markets/blog/BlogShareButtons';
import BlogFaqSection from '@/components/markets/blog/BlogFaqSection';
import BlogRelatedPosts from '@/components/markets/blog/BlogRelatedPosts';
import { formatBlogDate, getBlogCategoryStyle } from '@/components/markets/blog/blog-utils';
import { SITE_URL } from '@/data/site';
import type { MarketBlogPost } from '@/data/markets/blog/types';

interface MarketBlogPostPageProps {
  postSlug?: string;
  post?: MarketBlogPost;
  allPosts?: MarketBlogPost[];
}

export default function MarketBlogPostPage({
  postSlug,
  post: serverPost,
  allPosts = [],
}: MarketBlogPostPageProps) {
  const { marketCode, market } = useMarket();
  const pageSeo = useMarketPageSeo();
  const config = getMarketBlogConfig(marketCode);
  const post = serverPost ?? (postSlug ? getMarketBlogPostBySlug(marketCode, postSlug) : undefined);

  if (!post || !config) {
    notFound();
  }

  const style = getBlogCategoryStyle(post.category);
  const canonicalUrl = `${SITE_URL}${market.routePrefix}/blog/${post.slug}`;
  const displayTitle = pageSeo?.h1 ?? post.title;

  return (
    <>
      <MarketBreadcrumbs lastLabel={post.title} />

      {/* Article header */}
      <header className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.gradient}`} />
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-6 ${style.bg} ${style.text}`}>
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-[1.15] tracking-tight">
              {displayTitle}
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{formatBlogDate(post.date, config.locale)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} de lecture
              </span>
            </div>

            <BlogShareButtons url={canonicalUrl} title={post.title} shareLabel={config.shareLabel} />

            {post.keywords && (
              <ul className="flex flex-wrap gap-2 mt-6" aria-label="Mots-clés">
                {post.keywords
                  .split(',')
                  .map((k) => k.trim())
                  .filter(Boolean)
                  .map((keyword) => (
                    <li key={keyword}>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {keyword}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* Article body */}
      <article className="py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-[1.8] prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline">
              {post.content.map((paragraph, index) => (
                <p key={index} className="mb-6 text-[1.0625rem] leading-[1.85]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Internal links from SEO */}
            {post.internalLinks && post.internalLinks.length > 0 && (
              <aside className="mt-10 p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                  Pour aller plus loin
                </h2>
                <ul className="space-y-2">
                  {post.internalLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url.startsWith('/') ? `${market.routePrefix}${link.url}` : link.url}
                        className="text-brand-primary dark:text-brand-accent font-medium hover:underline inline-flex items-center gap-1"
                      >
                        {link.anchorText || link.title}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <BlogFaqSection faq={post.faq ?? []} title={config.faqTitle} />

            {/* Author + CTA */}
            <div className="mt-12 grid gap-6">
              <div className="flex items-start gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-hover flex items-center justify-center text-white font-bold text-lg shrink-0">
                  Z
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{post.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Experts en digitalisation des PME en {market.countryNameLocal}. Conseils pratiques sur la gestion,
                    la caisse POS et la conformité fiscale.
                  </p>
                </div>
              </div>

              <div className="p-8 lg:p-10 bg-gradient-to-br from-brand-primary to-brand-primary-hover rounded-2xl text-white text-center">
                <h2 className="text-2xl lg:text-3xl font-bold mb-3">{config.ctaTitle}</h2>
                <p className="text-white/85 mb-6 max-w-lg mx-auto">{config.ctaDescription}</p>
                <LocalizedLink
                  href="/getting-started"
                  className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {config.ctaButton}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </LocalizedLink>
              </div>
            </div>

            <BlogRelatedPosts
              posts={allPosts}
              currentSlug={post.slug}
              title={config.relatedLabel}
            />
          </div>
        </div>
      </article>
    </>
  );
}
