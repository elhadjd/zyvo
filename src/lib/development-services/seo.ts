import type { MarketCode } from '@/lib/markets/types';
import { getMarket } from '@/lib/markets/registry';
import type { GnSeoPageMeta } from '@/data/markets/gn-seo';
import {
  getDevelopmentHubContent,
  getDevelopmentService,
  getServiceDetailPath,
  getServiceHubPath,
} from '@/data/development-services/content';
import { DEVELOPMENT_SERVICE_SLUGS, isDevelopmentServiceSlug } from '@/data/development-services/programs';
import type { DevelopmentServiceSlug } from '@/data/development-services/types';

export function isDevelopmentServicesSlug(slug: string[]): boolean {
  return slug[0] === 'services';
}

export function getDevelopmentServicesStaticSlugs(): { slug: string[] }[] {
  const slugs: { slug: string[] }[] = [{ slug: ['services'] }];
  for (const service of DEVELOPMENT_SERVICE_SLUGS) {
    slugs.push({ slug: ['services', service] });
  }
  return slugs;
}

export function getDevelopmentServicesPageSeo(marketCode: MarketCode, slug: string[]): GnSeoPageMeta | null {
  if (marketCode === 'us') return null;

  const market = getMarket(marketCode);
  const prefix = market.routePrefix ?? '';

  if (slug.length === 1) {
    const hub = getDevelopmentHubContent(marketCode);
    return {
      title: hub.metaTitle,
      description: hub.metaDescription,
      keywords: hub.keywords,
      path: `${prefix}${hub.path}`,
      h1: hub.headline,
      breadcrumb: 'Services',
      schemaType: 'service',
    };
  }

  if (slug.length === 2 && isDevelopmentServiceSlug(slug[1])) {
    const service = getDevelopmentService(marketCode, slug[1] as DevelopmentServiceSlug);
    if (!service) return null;
    return {
      title: service.metaTitle,
      description: service.metaDescription,
      keywords: service.keywords,
      path: `${prefix}${service.path}`,
      h1: service.headline,
      breadcrumb: service.shortTitle,
      schemaType: 'service',
    };
  }

  return null;
}

export function getUsDevelopmentServiceMetadata(slug?: string) {
  const marketCode: MarketCode = 'us';
  if (!slug) {
    const hub = getDevelopmentHubContent(marketCode);
    return {
      title: hub.metaTitle,
      description: hub.metaDescription,
      keywords: hub.keywords,
      path: hub.path,
      h1: hub.headline,
      breadcrumb: 'Development Services',
      schemaType: 'service' as const,
    };
  }
  if (!isDevelopmentServiceSlug(slug)) return null;
  const service = getDevelopmentService(marketCode, slug);
  if (!service) return null;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    path: service.path,
    h1: service.headline,
    breadcrumb: service.shortTitle,
    schemaType: 'service' as const,
  };
}

export { getServiceHubPath, getServiceDetailPath };
