import { createHash } from 'crypto';
import type { ContentArticle } from '../db/schema';
import type { SupportedCountry } from '../types';
import { classifyTopicNiche } from '../research-engine/topic-niches';

export interface HeroImageResult {
  url: string;
  alt: string;
  credit?: string;
  source: 'pexels' | 'unsplash' | 'curated';
}

/** Curated Unsplash business images — stable, no API key required */
const CURATED_POOL: { url: string; alt: string; tags: string[] }[] = [
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80',
    alt: 'Analyse de données business sur ordinateur',
    tags: ['marketing', 'digital', 'analytics', 'technologie'],
  },
  {
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop&q=80',
    alt: 'Réunion d\'équipe en entreprise',
    tags: ['gestion', 'gestão', 'affaires', 'negócios', 'entrepreneuriat'],
  },
  {
    url: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=630&fit=crop&q=80',
    alt: 'Comptabilité et documents fiscaux',
    tags: ['fiscalité', 'fiscalidade', 'comptabilité', 'impôt', 'tva'],
  },
  {
    url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&q=80',
    alt: 'Paiement mobile et commerce',
    tags: ['commerce', 'vente', 'vendas', 'orange', 'money', 'pos'],
  },
  {
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=630&fit=crop&q=80',
    alt: 'Équipe travaillant sur ordinateurs',
    tags: ['technologie', 'tecnologia', 'digital', 'erp', 'software'],
  },
  {
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80',
    alt: 'Intelligence artificielle et innovation',
    tags: ['ia', 'ai', 'intelligence', 'artificielle', 'automation'],
  },
  {
    url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=630&fit=crop&q=80',
    alt: 'Boutique et point de vente',
    tags: ['boutique', 'retail', 'stock', 'caisse', 'loja'],
  },
  {
    url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fef?w=1200&h=630&fit=crop&q=80',
    alt: 'Marketing sur réseaux sociaux',
    tags: ['marketing', 'facebook', 'instagram', 'whatsapp', 'publicité'],
  },
  {
    url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=630&fit=crop&q=80',
    alt: 'E-commerce et vente en ligne',
    tags: ['e-commerce', 'ecommerce', 'vendre', 'vender', 'online'],
  },
  {
    url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop&q=80',
    alt: 'Croissance et expansion d\'entreprise',
    tags: ['croissance', 'crescimento', 'expansion', 'growth', 'développer'],
  },
  {
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=630&fit=crop&q=80',
    alt: 'Entrepreneur au bureau',
    tags: ['entrepreneuriat', 'empreendedorismo', 'créer', 'criar', 'startup'],
  },
  {
    url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=630&fit=crop&q=80',
    alt: 'Restaurant et gestion HORECA',
    tags: ['restaurant', 'maquis', 'horeca', 'guides'],
  },
];

const CATEGORY_DEFAULTS: Record<string, HeroImageResult> = {
  Fiscalité: {
    url: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=630&fit=crop&q=80',
    alt: 'Fiscalité et comptabilité entreprise',
    credit: 'Unsplash',
    source: 'curated',
  },
  Fiscalidade: {
    url: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=630&fit=crop&q=80',
    alt: 'Fiscalidade e contabilidade empresarial',
    credit: 'Unsplash',
    source: 'curated',
  },
  Marketing: {
    url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fef?w=1200&h=630&fit=crop&q=80',
    alt: 'Marketing digital pour PME',
    credit: 'Unsplash',
    source: 'curated',
  },
  IA: {
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80',
    alt: 'Intelligence artificielle pour entreprises',
    credit: 'Unsplash',
    source: 'curated',
  },
  Croissance: {
    url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop&q=80',
    alt: 'Croissance et développement business',
    credit: 'Unsplash',
    source: 'curated',
  },
  Crescimento: {
    url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop&q=80',
    alt: 'Crescimento e expansão de negócios',
    credit: 'Unsplash',
    source: 'curated',
  },
  Ventes: {
    url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=630&fit=crop&q=80',
    alt: 'Vente en ligne et e-commerce',
    credit: 'Unsplash',
    source: 'curated',
  },
  Vendas: {
    url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=630&fit=crop&q=80',
    alt: 'Vendas online e e-commerce',
    credit: 'Unsplash',
    source: 'curated',
  },
  'E-commerce': {
    url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&h=630&fit=crop&q=80',
    alt: 'Commerce en ligne',
    credit: 'Unsplash',
    source: 'curated',
  },
  Gestion: {
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop&q=80',
    alt: 'Gestion d\'équipe et organisation',
    credit: 'Unsplash',
    source: 'curated',
  },
  Gestão: {
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop&q=80',
    alt: 'Gestão de equipa e organização',
    credit: 'Unsplash',
    source: 'curated',
  },
  Guides: {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=80',
    alt: 'Guide pratique pour entrepreneurs',
    credit: 'Unsplash',
    source: 'curated',
  },
};

function hashSeed(value: string): number {
  const hash = createHash('md5').update(value).digest('hex');
  return parseInt(hash.slice(0, 8), 16);
}

function buildSearchQuery(article: ContentArticle, primaryKeyword?: string): string {
  const niche = classifyTopicNiche(`${article.title} ${article.category}`, article.category);
  const nicheQueries: Record<string, string> = {
    fiscalite: 'business accounting tax office',
    entrepreneuriat: 'african entrepreneur startup business',
    gestion: 'small business team management office',
    marketing: 'social media marketing digital business',
    ventes: 'online shopping ecommerce store africa',
    technologie: 'business technology software laptop',
    ia: 'artificial intelligence business technology',
    croissance: 'business growth success african entrepreneur',
  };
  const base = nicheQueries[niche] ?? 'african small business entrepreneur';
  if (primaryKeyword) {
    const englishHint = primaryKeyword
      .replace(/guinée|sénégal|conakry|dakar|abidjan|angola|moçambique/gi, '')
      .trim();
    if (englishHint.length > 4) return `${base} ${englishHint}`.slice(0, 80);
  }
  return base;
}

function pickCuratedImage(article: ContentArticle, slug: string): HeroImageResult {
  if (CATEGORY_DEFAULTS[article.category]) {
    return { ...CATEGORY_DEFAULTS[article.category] };
  }

  const niche = classifyTopicNiche(`${article.title} ${article.category}`, article.category);
  const searchText = `${niche} ${article.category} ${article.title}`.toLowerCase();

  const scored = CURATED_POOL.map((img) => {
    let score = 0;
    for (const tag of img.tags) {
      if (searchText.includes(tag)) score += 2;
    }
    return { img, score };
  }).sort((a, b) => b.score - a.score);

  const best = scored[0]?.score > 0 ? scored[0].img : null;
  const pool = best ?? CURATED_POOL[hashSeed(slug) % CURATED_POOL.length];

  return {
    url: pool.url,
    alt: pool.alt,
    credit: 'Unsplash',
    source: 'curated',
  };
}

async function fetchFromPexels(query: string): Promise<HeroImageResult | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`,
      { headers: { Authorization: apiKey }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;

    const data = (await res.json()) as {
      photos?: { src: { large: string }; alt: string; photographer: string }[];
    };
    const photo = data.photos?.[0];
    if (!photo) return null;

    return {
      url: `${photo.src.large}?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop`,
      alt: photo.alt || query,
      credit: `Photo by ${photo.photographer} on Pexels`,
      source: 'pexels',
    };
  } catch {
    return null;
  }
}

async function fetchFromUnsplash(query: string): Promise<HeroImageResult | null> {
  const apiKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${apiKey}` }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;

    const data = (await res.json()) as {
      results?: { urls: { regular: string }; alt_description: string; user: { name: string } }[];
    };
    const photo = data.results?.[0];
    if (!photo) return null;

    return {
      url: `${photo.urls.regular}&w=1200&h=630&fit=crop&q=80`,
      alt: photo.alt_description || query,
      credit: `Photo by ${photo.user.name} on Unsplash`,
      source: 'unsplash',
    };
  } catch {
    return null;
  }
}

export async function fetchHeroImageForArticle(
  article: ContentArticle,
  countryCode: SupportedCountry,
  primaryKeyword?: string,
  slug?: string
): Promise<HeroImageResult> {
  const query = buildSearchQuery(article, primaryKeyword);
  const resolvedSlug = slug ?? article.slug;

  const fromPexels = await fetchFromPexels(query);
  if (fromPexels) return fromPexels;

  const fromUnsplash = await fetchFromUnsplash(query);
  if (fromUnsplash) return fromUnsplash;

  return pickCuratedImage(article, `${countryCode}-${resolvedSlug}`);
}

/** Resolve hero image for any blog post (static or DB) */
export function resolvePostHeroImage(post: {
  slug: string;
  title: string;
  category: string;
  heroImage?: string;
  heroImageAlt?: string;
}): { url: string; alt: string } {
  if (post.heroImage) {
    return { url: post.heroImage, alt: post.heroImageAlt ?? post.title };
  }

  const curated = CATEGORY_DEFAULTS[post.category];
  if (curated) {
    return { url: curated.url, alt: curated.alt };
  }

  const fakeArticle = {
    slug: post.slug,
    title: post.title,
    category: post.category,
  } as ContentArticle;

  const picked = pickCuratedImage(fakeArticle, post.slug);
  return { url: picked.url, alt: picked.alt };
}
