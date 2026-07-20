import type { ContentArticle } from '../db/schema';
import type { SupportedCountry } from '../types';
import { deepseekService } from './deepseek-service';
import {
  buildRuleBasedSearchQueries,
  FALLBACK_HERO_IMAGE,
  getTopicImageCandidates,
  type HeroImageResult,
} from './stock-image-library';

export type { HeroImageResult } from './stock-image-library';
export {
  FALLBACK_HERO_IMAGE,
  getHeroImageFallbackUrl,
  resolvePostHeroImage,
} from './stock-image-library';

const IMAGE_PARAMS = 'w=1200&h=630&fit=crop&q=80';
const PEXELS_PARAMS = 'auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop';

const validatedUrlCache = new Map<string, boolean>();

export async function isImageUrlAccessible(url: string): Promise<boolean> {
  const cached = validatedUrlCache.get(url);
  if (cached !== undefined) return cached;

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(6000),
      headers: { 'User-Agent': 'ZyvoBlogImageValidator/1.0' },
    });

    const contentType = response.headers.get('content-type') ?? '';
    const ok = response.ok && contentType.startsWith('image/');
    validatedUrlCache.set(url, ok);
    return ok;
  } catch {
    validatedUrlCache.set(url, false);
    return false;
  }
}

async function firstAccessibleImage(
  candidates: HeroImageResult[]
): Promise<HeroImageResult | null> {
  for (const candidate of candidates) {
    if (await isImageUrlAccessible(candidate.url)) {
      return candidate;
    }
  }
  return null;
}

async function generateImageSearchQueriesWithAI(
  title: string,
  category: string,
  countryCode?: SupportedCountry
): Promise<string[]> {
  if (!process.env.DEEPSEEK_API_KEY) {
    return buildRuleBasedSearchQueries(title, category);
  }

  try {
    const response = await deepseekService.chat(
      [
        {
          role: 'system',
          content: `You generate English stock-photo search queries for African SME blog articles.
Rules:
- 2-3 short queries (3-6 words each)
- Match the article topic literally (e.g. NINEA → business registration documents, not meetings)
- Prefer objects, documents, shops, markets, mobile payments — not generic office meetings
- Never suggest brand names (Square, Stripe, etc.)
- Include "africa" or "african" only when people should appear
Return JSON: { "queries": string[] }`,
        },
        {
          role: 'user',
          content: `Title: ${title}\nCategory: ${category}\nCountry: ${countryCode ?? 'West Africa'}`,
        },
      ],
      {
        jsonMode: true,
        temperature: 0.3,
        maxTokens: 200,
        agentCode: 'image-search',
        countryCode,
      }
    );

    const parsed = deepseekService.parseJson<{ queries?: string[] }>(response.content);
    const queries = (parsed.queries ?? [])
      .map((q) => q.trim())
      .filter((q) => q.length > 3)
      .slice(0, 3);

    if (queries.length > 0) {
      return queries;
    }
  } catch {
    // fall through to rule-based queries
  }

  return buildRuleBasedSearchQueries(title, category);
}

async function fetchFromPexels(query: string): Promise<HeroImageResult[]> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`,
      { headers: { Authorization: apiKey }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return [];

    const data = (await res.json()) as {
      photos?: { src: { large: string }; alt: string; photographer: string }[];
    };

    return (data.photos ?? []).map((photo) => ({
      url: `${photo.src.large}?${PEXELS_PARAMS}`,
      alt: photo.alt || query,
      credit: `Photo by ${photo.photographer} on Pexels`,
      source: 'pexels' as const,
    }));
  } catch {
    return [];
  }
}

async function fetchFromUnsplash(query: string): Promise<HeroImageResult[]> {
  const apiKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=8&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${apiKey}` }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return [];

    const data = (await res.json()) as {
      results?: { urls: { regular: string }; alt_description: string; user: { name: string } }[];
    };

    return (data.results ?? []).map((photo) => ({
      url: `${photo.urls.regular}&${IMAGE_PARAMS}`,
      alt: photo.alt_description || query,
      credit: `Photo by ${photo.user.name} on Unsplash`,
      source: 'unsplash' as const,
    }));
  } catch {
    return [];
  }
}

async function searchStockImagesWithAI(
  title: string,
  category: string,
  countryCode: SupportedCountry
): Promise<HeroImageResult | null> {
  const queries = await generateImageSearchQueriesWithAI(title, category, countryCode);

  for (const query of queries) {
    const pexelsResults = await fetchFromPexels(query);
    const pexelsMatch = await firstAccessibleImage(pexelsResults);
    if (pexelsMatch) return pexelsMatch;

    const unsplashResults = await fetchFromUnsplash(query);
    const unsplashMatch = await firstAccessibleImage(unsplashResults);
    if (unsplashMatch) return unsplashMatch;
  }

  return null;
}

async function resolveValidatedTopicImage(
  title: string,
  category: string
): Promise<HeroImageResult> {
  const candidates = getTopicImageCandidates(title, category);
  const match = await firstAccessibleImage(candidates);
  if (match) return match;

  if (await isImageUrlAccessible(FALLBACK_HERO_IMAGE.url)) {
    return { ...FALLBACK_HERO_IMAGE };
  }

  return candidates[0] ?? { ...FALLBACK_HERO_IMAGE };
}

export async function fetchHeroImageForArticle(
  article: ContentArticle,
  countryCode: SupportedCountry,
  primaryKeyword?: string,
  _slug?: string
): Promise<HeroImageResult> {
  const title = primaryKeyword ? `${article.title} ${primaryKeyword}` : article.title;

  const fromApi = await searchStockImagesWithAI(title, article.category, countryCode);
  if (fromApi) return fromApi;

  return resolveValidatedTopicImage(title, article.category);
}
