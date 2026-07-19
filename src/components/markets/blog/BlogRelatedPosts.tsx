import LocalizedLink from '@/components/markets/LocalizedLink';
import type { MarketBlogPost } from '@/data/markets/blog/types';
import { ArrowRight } from 'lucide-react';

interface BlogRelatedPostsProps {
  posts: MarketBlogPost[];
  currentSlug: string;
  title: string;
}

export default function BlogRelatedPosts({ posts, currentSlug, title }: BlogRelatedPostsProps) {
  const current = posts.find((p) => p.slug === currentSlug);
  const related = posts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aSameCategory = current && a.category === current.category ? 1 : 0;
      const bSameCategory = current && b.category === current.category ? 1 : 0;
      if (aSameCategory !== bSameCategory) return bSameCategory - aSameCategory;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);
  if (related.length === 0) return null;

  return (
    <aside className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((post) => (
          <LocalizedLink
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand-primary/40 dark:hover:border-brand-accent/40 hover:shadow-md transition-all"
          >
            <p className="text-xs font-medium text-brand-primary dark:text-brand-accent mb-2">{post.category}</p>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
              {post.title}
            </h3>
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 group-hover:text-brand-primary transition-colors">
              Lire
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </LocalizedLink>
        ))}
      </div>
    </aside>
  );
}
