import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostPage from '@/views/BlogPostPage';
import JsonLd from '@/components/JsonLd';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { getArticleSchema, getBreadcrumbSchema } from '@/data/structured-data';
import { SITE_URL } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    canonical: `/blog/${post.slug}`,
    ogType: 'article',
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd
        data={[
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
      <BlogPostPage slug={slug} />
    </>
  );
}
