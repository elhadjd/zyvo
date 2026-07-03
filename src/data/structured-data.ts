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
