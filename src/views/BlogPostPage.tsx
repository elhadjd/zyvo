'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBlogPostBySlug } from '../data/blog';

interface Props {
  slug: string;
}

export default function BlogPostPage({ slug }: Props) {
  const post = getBlogPostBySlug(slug);
  if (!post) return null;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />
      <article className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium px-3 py-1 bg-brand-primary-light dark:bg-brand-primary/20 text-brand-primary dark:text-brand-accent rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">By {post.author}</span>
              <span className="text-gray-400">·</span>
              <time dateTime={post.date} className="text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-brand-primary to-brand-primary-hover rounded-2xl text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to put these insights into action?</h2>
              <p className="text-white/80 mb-6">Start your 7-day free trial of ZYVO today.</p>
              <Link
                href="/getting-started"
                className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
