import assert from 'node:assert/strict';
import type { MarketBlogPost } from '../src/data/markets/blog/types';
import { resolveInternalLinkHref, sanitizeInternalLinks } from '../src/lib/markets/internal-links';

const posts: MarketBlogPost[] = [
  {
    slug: 'syscohada-tva-dgi-digitaliser-comptabilite-guinee',
    title: 'SYSCOHADA et TVA DGI : comment digitaliser sa comptabilité en Guinée',
    excerpt: 'test',
    metaTitle: 'test',
    metaDescription: 'test',
    keywords: 'test',
    author: 'test',
    date: '2026-01-01',
    readTime: '5 min',
    category: 'Comptabilité',
    content: ['test'],
  },
  {
    slug: 'choisir-logiciel-gestion-entreprise-guinee',
    title: 'Comment choisir un logiciel de gestion d\'entreprise en Guinée (guide 2026)',
    excerpt: 'test',
    metaTitle: 'test',
    metaDescription: 'test',
    keywords: 'test',
    author: 'test',
    date: '2026-01-02',
    readTime: '5 min',
    category: 'Guides',
    content: ['test'],
  },
];

const slugs = new Set(posts.map((post) => post.slug));

// Double-prefixed blog URL should resolve correctly
assert.equal(
  resolveInternalLinkHref(
    { title: 'TVA', url: '/gn/blog/syscohada-tva-dgi-digitaliser-comptabilite-guinee' },
    'gn',
    slugs,
    posts
  ),
  '/gn/blog/syscohada-tva-dgi-digitaliser-comptabilite-guinee'
);

// Market-relative blog URL
assert.equal(
  resolveInternalLinkHref(
    { title: 'TVA', url: '/blog/syscohada-tva-dgi-digitaliser-comptabilite-guinee' },
    'gn',
    slugs,
    posts
  ),
  '/gn/blog/syscohada-tva-dgi-digitaliser-comptabilite-guinee'
);

// Invalid blog slug should be removed
assert.equal(
  resolveInternalLinkHref(
    { title: 'TVA 18% en Guinée', url: '/gn/blog/tva-18-guinee-inexistant' },
    'gn',
    slugs,
    posts
  ),
  null
);

// Valid site page
assert.equal(
  resolveInternalLinkHref({ title: 'Tarifs', url: '/pricing' }, 'gn', slugs, posts),
  '/gn/pricing'
);

const sanitized = sanitizeInternalLinks(
  [
    { title: 'TVA', url: '/gn/blog/syscohada-tva-dgi-digitaliser-comptabilite-guinee', anchorText: 'TVA' },
    { title: '404', url: '/gn/blog/article-inexistant', anchorText: '404' },
    { title: 'Tarifs', url: '/pricing', anchorText: 'Tarifs' },
  ],
  'gn',
  posts
);

assert.equal(sanitized?.length, 2);
assert.equal(sanitized?.[0].url, '/gn/blog/syscohada-tva-dgi-digitaliser-comptabilite-guinee');
assert.equal(sanitized?.[1].url, '/gn/pricing');

console.log('All internal link tests passed.');
