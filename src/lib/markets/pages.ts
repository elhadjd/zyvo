import type { ComponentType } from 'react';
import type { MarketCode } from '@/lib/markets/types';
import { getMarket } from '@/lib/markets/registry';
import MarketHomePage from '@/views/markets/MarketHomePage';
import MarketFeaturesPage from '@/views/markets/MarketFeaturesPage';
import MarketPricingPage from '@/views/markets/MarketPricingPage';
import MarketAboutPage from '@/views/markets/MarketAboutPage';
import MarketContactPage from '@/views/markets/MarketContactPage';
import MarketFaqPage from '@/views/markets/MarketFaqPage';
import MarketDemoPage from '@/views/markets/MarketDemoPage';
import MarketSolutionsPage from '@/views/markets/MarketSolutionsPage';
import MarketIndustryPage from '@/views/markets/MarketIndustryPage';
import MarketSolutionDetailPage from '@/views/markets/MarketSolutionDetailPage';
import MarketGettingStartedPage from '@/views/markets/MarketGettingStartedPage';
import MarketBlogIndexPage from '@/views/markets/MarketBlogIndexPage';
import MarketBlogPostPage from '@/views/markets/MarketBlogPostPage';
import ProgrammaticPageServer from '@/views/markets/ProgrammaticPageServer';
import { getAllMergedMarketBlogSlugs } from '@/lib/markets/blog-server';
import { PROGRAMMATIC_INDUSTRIES } from '@/lib/ai/seo-engine/types';
import { MARKET_SOLUTION_SLUGS } from '@/data/markets/market-modules';

export interface MarketPageDefinition {
  slug: string[];
  pageKey: string;
  component: ComponentType;
}

const GN_PAGES: MarketPageDefinition[] = [
  { slug: [], pageKey: 'home', component: MarketHomePage },
  { slug: ['features'], pageKey: 'features', component: MarketFeaturesPage },
  { slug: ['pricing'], pageKey: 'pricing', component: MarketPricingPage },
  { slug: ['about'], pageKey: 'about', component: MarketAboutPage },
  { slug: ['contact'], pageKey: 'contact', component: MarketContactPage },
  { slug: ['faq'], pageKey: 'faq', component: MarketFaqPage },
  { slug: ['demo'], pageKey: 'demo', component: MarketDemoPage },
  { slug: ['getting-started'], pageKey: 'home', component: MarketGettingStartedPage },
  { slug: ['blog'], pageKey: 'blog', component: MarketBlogIndexPage },
  { slug: ['blog', ':post'], pageKey: 'blog', component: MarketBlogPostPage },
  { slug: ['erp', ':industry'], pageKey: 'erp', component: ProgrammaticPageServer },
  { slug: ['solutions'], pageKey: 'solutions', component: MarketSolutionsPage },
  { slug: ['industries'], pageKey: 'solutions', component: MarketSolutionsPage },
  { slug: ['industries', ':industry'], pageKey: 'solutions', component: MarketIndustryPage },
  { slug: ['solutions', ':solution'], pageKey: 'solutions', component: MarketSolutionDetailPage },
];

const MARKET_PAGE_REGISTRY: Partial<Record<MarketCode, MarketPageDefinition[]>> = {
  gn: GN_PAGES,
  sn: GN_PAGES,
  ci: GN_PAGES,
};

function slugMatches(pattern: string[], actual: string[]): boolean {
  if (pattern.length !== actual.length) return false;
  return pattern.every((part, i) => part.startsWith(':') || part === actual[i]);
}

export function resolveMarketPage(
  marketCode: MarketCode,
  slug: string[] = []
): { component: ComponentType; pageKey: string; params: Record<string, string> } | null {
  const market = getMarket(marketCode);
  if (!market.active || market.comingSoon) return null;

  const pages = MARKET_PAGE_REGISTRY[marketCode];
  if (!pages) return null;

  for (const page of pages) {
    if (slugMatches(page.slug, slug)) {
      const params: Record<string, string> = {};
      page.slug.forEach((part, i) => {
        if (part.startsWith(':')) {
          params[part.slice(1)] = slug[i];
        }
      });
      return { component: page.component, pageKey: page.pageKey, params };
    }
  }

  return null;
}

function appendDynamicMarketParams(marketCode: MarketCode, params: { slug: string[] }[]) {
  const industries = getMarket(marketCode).industries;
  industries.forEach((ind) => {
    params.push({ slug: ['industries', ind.id] });
  });

  MARKET_SOLUTION_SLUGS.forEach((s) => {
    params.push({ slug: ['solutions', s] });
  });

  getAllMergedMarketBlogSlugs(marketCode).forEach((postSlug) => {
    params.push({ slug: ['blog', postSlug] });
  });

  PROGRAMMATIC_INDUSTRIES.forEach((ind) => {
    params.push({ slug: ['erp', ind.slug] });
  });
}

export function getMarketStaticParams(marketCode: MarketCode): { slug: string[] }[] {
  const pages = MARKET_PAGE_REGISTRY[marketCode] ?? [];
  const staticPages = pages.filter((p) => !p.slug.some((s) => s.startsWith(':')));
  const params: { slug: string[] }[] = staticPages.map((p) => ({ slug: p.slug }));

  if (marketCode === 'gn' || marketCode === 'sn' || marketCode === 'ci') {
    appendDynamicMarketParams(marketCode, params);
  }

  return params;
}

export function getAllMarketStaticParams(): { country: string; slug?: string[] }[] {
  const result: { country: string; slug?: string[] }[] = [];

  for (const code of ['gn', 'sn', 'ci'] as MarketCode[]) {
    const params = getMarketStaticParams(code);
    params.forEach((p) => {
      result.push({
        country: code,
        slug: p.slug.length > 0 ? p.slug : undefined,
      });
    });
  }

  return result;
}
