import type { MarketConfig } from '@/lib/markets/types';
import { SITE_URL } from '@/data/site';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ZYVO Technologies, Inc.',
    url: 'https://www.zyvoerp.com',
    logo: 'https://www.zyvoerp.com/favicon.svg',
    description:
      'Cloud business management software for US small and medium businesses.',
    email: 'commercial@zyvoerp.com',
    telephone: '+1-973-524-9725',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '358 Hutchinson Ave',
      addressLocality: 'Columbus',
      addressRegion: 'OH',
      postalCode: '43235',
      addressCountry: 'US',
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ZYVO',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description:
      'All-in-one business management: inventory, POS, employees, appointments, customers, accounting, and analytics.',
    offers: {
      '@type': 'Offer',
      price: '39',
      priceCurrency: 'USD',
      description: 'Plans start with a 7-day free trial. No credit card required.',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getProfessionalServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  priceFrom: number;
  priceCurrency?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Organization',
      name: 'ZYVO Technologies, Inc.',
      url: 'https://www.zyvoerp.com',
      telephone: '+1-973-524-9725',
      email: 'commercial@zyvoerp.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    offers: {
      '@type': 'Offer',
      price: String(service.priceFrom),
      priceCurrency: service.priceCurrency ?? 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function getServiceCatalogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ZYVO Development Services',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: 'Custom Website Development',
          url: 'https://www.zyvoerp.com/custom-website-development',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: 'Custom Business Software Development',
          url: 'https://www.zyvoerp.com/custom-software-development',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: 'Website & System Maintenance',
          url: 'https://www.zyvoerp.com/website-maintenance-services',
        },
      },
    ],
  };
}

export function getArticleSchema(post: {
  title: string;
  description: string;
  author: string;
  date: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'ZYVO Technologies, Inc.',
      logo: { '@type': 'ImageObject', url: 'https://www.zyvoerp.com/favicon.svg' },
    },
    mainEntityOfPage: `https://www.zyvoerp.com/blog/${post.slug}`,
  };
}

export function getMarketOrganizationSchema(market: MarketConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ZYVO',
    url: `${SITE_URL}${market.routePrefix ?? ''}`,
    logo: `${SITE_URL}/favicon.svg`,
    description: market.description,
    email: market.contact.email,
    telephone: market.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: market.contact.address.street,
      addressLocality: market.contact.address.city,
      addressCountry: market.contact.address.country,
    },
    areaServed: {
      '@type': 'Country',
      name: market.countryName,
    },
  };
}

export function getMarketSoftwareSchema(market: MarketConfig) {
  const starterPlan = market.pricing.plans[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `ZYVO ${market.countryNameLocal}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Android',
    description: market.description,
    inLanguage: market.language,
    offers: starterPlan
      ? {
          '@type': 'Offer',
          price: String(starterPlan.annualPrice),
          priceCurrency: market.currency,
          description: 'Essai gratuit de 7 jours.',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}${market.routePrefix ?? ''}/pricing`,
        }
      : undefined,
    areaServed: {
      '@type': 'Country',
      name: market.countryName,
    },
    featureList: [
      'Caisse POS',
      'Gestion de stock',
      'Orange Money',
      'MTN Mobile Money',
      'Facturation TVA',
      'Comptabilité SYSCOHADA',
      'Multi-magasins',
    ],
  };
}

export function getMarketWebSiteSchema(market: MarketConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `ZYVO ${market.countryNameLocal}`,
    url: `${SITE_URL}${market.routePrefix ?? ''}`,
    description: market.description,
    inLanguage: market.language,
    publisher: {
      '@type': 'Organization',
      name: 'ZYVO',
      logo: `${SITE_URL}/favicon.svg`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}${market.routePrefix}/solutions?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getMarketLocalBusinessSchema(market: MarketConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}${market.routePrefix}#localbusiness`,
    name: `ZYVO ${market.countryNameLocal}`,
    description: market.description,
    url: `${SITE_URL}${market.routePrefix ?? ''}`,
    email: market.contact.email,
    telephone: market.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: market.contact.address.street,
      addressLocality: market.contact.address.city,
      addressCountry: market.contact.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.6412,
      longitude: -13.5784,
    },
    areaServed: {
      '@type': 'Country',
      name: market.countryName,
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  };
}

export function getMarketServiceSchema(
  market: MarketConfig,
  service: { name: string; description: string; url: string }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Organization',
      name: 'ZYVO',
      url: `${SITE_URL}${market.routePrefix ?? ''}`,
    },
    areaServed: {
      '@type': 'Country',
      name: market.countryName,
    },
    serviceType: 'Business Management Software',
    inLanguage: market.language,
  };
}

export function getMarketOfferCatalogSchema(market: MarketConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `ZYVO ${market.countryNameLocal} — Plans tarifaires`,
    url: `${SITE_URL}${market.routePrefix}/pricing`,
    itemListElement: market.pricing.plans.map((plan, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: plan.name,
      description: plan.description,
      price: String(plan.annualPrice),
      priceCurrency: market.currency,
      url: `${SITE_URL}${market.routePrefix}/pricing`,
      availability: 'https://schema.org/InStock',
    })),
  };
}
