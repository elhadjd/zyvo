import type { MarketCode } from '@/lib/markets/types';
import type { MarketConfig } from '@/lib/markets/types';
import { SITE_URL } from '@/data/site';
import {
  getDevelopmentFaqs,
  getDevelopmentHubContent,
  getDevelopmentService,
  getDevelopmentServices,
  getServiceHubPath,
  getServicePricingTiers,
} from '@/data/development-services/content';
import type { DevelopmentServiceSlug } from '@/data/development-services/types';
import { getFAQSchema, getProfessionalServiceSchema } from '@/data/structured-data';

export function getDevelopmentCurrency(marketCode: MarketCode): string {
  if (marketCode === 'us') return 'USD';
  if (marketCode === 'gn') return 'GNF';
  return 'XOF';
}

export function getDevelopmentServiceCatalogSchema(marketCode: MarketCode, market: MarketConfig) {
  const prefix = market.routePrefix ?? '';
  const services = getDevelopmentServices(marketCode);
  const currency = getDevelopmentCurrency(marketCode);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: marketCode === 'us' ? 'ZYVO Development Services' : `Services développement ZYVO ${market.countryNameLocal}`,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.metaDescription,
        url: `${SITE_URL}${marketCode === 'us' ? service.path : `${prefix}${service.path}`}`,
        offers: {
          '@type': 'Offer',
          price: String(service.priceFrom),
          priceCurrency: currency,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
}

export function getDevelopmentPricingOfferSchema(marketCode: MarketCode, market: MarketConfig) {
  const tiers = getServicePricingTiers(marketCode);
  const currency = getDevelopmentCurrency(marketCode);
  const prefix = market.routePrefix ?? '';
  const hubPath = getServiceHubPath(marketCode);

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: marketCode === 'us' ? 'ZYVO Development Pricing' : `Tarifs développement ZYVO ${market.countryNameLocal}`,
    url: `${SITE_URL}${marketCode === 'us' ? hubPath : `${prefix}${hubPath}`}`,
    itemListElement: tiers.map((tier, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: tier.name,
      price: String(tier.price),
      priceCurrency: currency,
      description: tier.description,
      availability: 'https://schema.org/InStock',
    })),
  };
}

export function buildDevelopmentPageSchemas(
  marketCode: MarketCode,
  market: MarketConfig,
  slug: string[],
  serviceSlug?: DevelopmentServiceSlug
): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [];
  const prefix = market.routePrefix ?? '';
  const currency = getDevelopmentCurrency(marketCode);

  if (slug.length === 0 || (slug.length === 1 && slug[0] === 'services')) {
    const hub = getDevelopmentHubContent(marketCode);
    const faqs = getDevelopmentFaqs(marketCode);
    schemas.push(
      getDevelopmentServiceCatalogSchema(marketCode, market),
      getDevelopmentPricingOfferSchema(marketCode, market),
      getFAQSchema(faqs),
      getProfessionalServiceSchema({
        name: hub.headline,
        description: hub.metaDescription,
        url: `${SITE_URL}${marketCode === 'us' ? hub.path : `${prefix}${hub.path}`}`,
        priceFrom: getDevelopmentServices(marketCode)[0]?.priceFrom ?? 0,
        priceCurrency: currency,
      })
    );
    return schemas;
  }

  if (serviceSlug) {
    const service = getDevelopmentService(marketCode, serviceSlug);
    if (!service) return schemas;
    const url = `${SITE_URL}${marketCode === 'us' ? service.path : `${prefix}${service.path}`}`;
    schemas.push(
      getProfessionalServiceSchema({
        name: service.title,
        description: service.metaDescription,
        url,
        priceFrom: service.priceFrom,
        priceCurrency: currency,
      }),
      getFAQSchema(service.faqs)
    );
  }

  return schemas;
}
