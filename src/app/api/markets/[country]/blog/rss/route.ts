import { NextResponse } from 'next/server';
import { getPublishedDbArticles } from '@/lib/ai/blog-repository';
import { getMarketBlogConfig } from '@/data/markets/blog';
import { SITE_URL } from '@/data/site';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ country: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { country } = await params;
  const config = getMarketBlogConfig(country as 'gn');
  const posts = getPublishedDbArticles(country);

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/${country}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${country}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
    </item>`
    )
    .join('');

  const feedTitle = config?.indexTitle ?? `Blog ZYVO ${country.toUpperCase()}`;
  const feedDescription = config?.indexDescription ?? 'Articles pour entrepreneurs';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${feedTitle}]]></title>
    <link>${SITE_URL}/${country}/blog</link>
    <description><![CDATA[${feedDescription}]]></description>
    <language>${config?.locale ?? 'fr'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/api/markets/${country}/blog/rss" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
