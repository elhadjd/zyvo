import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import LocalizedLink from '@/components/markets/LocalizedLink';
import type { MarketBlogPost } from '@/data/markets/blog/types';
import { formatBlogDate, getBlogCategoryStyle } from './blog-utils';

interface BlogPostCardProps {
  post: MarketBlogPost;
  locale: string;
  readMoreLabel: string;
  featured?: boolean;
}

export default function BlogPostCard({ post, locale, readMoreLabel, featured }: BlogPostCardProps) {
  const style = getBlogCategoryStyle(post.category);

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity`} />
        <div className="relative grid lg:grid-cols-2 gap-0">
          <div className={`h-48 lg:h-auto bg-gradient-to-br ${style.gradient} flex items-end p-8`}>
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 bg-white/20 backdrop-blur px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Article vedette
              </span>
              <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-white/20 text-white`}>
                {post.category}
              </span>
            </div>
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <time dateTime={post.date}>{formatBlogDate(post.date, locale)}</time>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
              <LocalizedLink href={`/blog/${post.slug}`}>{post.title}</LocalizedLink>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>
            <LocalizedLink
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-brand-primary dark:text-brand-accent font-semibold"
            >
              {readMoreLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LocalizedLink>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-brand-primary/30 dark:hover:border-brand-accent/30 hover:shadow-lg transition-all duration-300">
      <div className={`h-2 bg-gradient-to-r ${style.gradient}`} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
          <LocalizedLink href={`/blog/${post.slug}`}>{post.title}</LocalizedLink>
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 line-clamp-3 flex-1 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {post.author} · {formatBlogDate(post.date, locale)}
          </span>
          <LocalizedLink
            href={`/blog/${post.slug}`}
            className="text-sm font-medium text-brand-primary dark:text-brand-accent inline-flex items-center gap-1"
          >
            {readMoreLabel}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </LocalizedLink>
        </div>
      </div>
    </article>
  );
}
