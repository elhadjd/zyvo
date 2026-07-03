import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBlogPostBySlug } from '../data/blog';
import { getBreadcrumbSchema, getArticleSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Blog', url: `${SITE_URL}/blog` },
            { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
          ]),
          getArticleSchema({
            title: post.title,
            description: post.metaDescription,
            author: post.author,
            date: post.date,
            slug: post.slug,
          }),
        ]}
      />
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
                to="/getting-started"
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
