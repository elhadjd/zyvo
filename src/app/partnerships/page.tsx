import PartnershipHubPage from '@/views/partnerships/PartnershipHubPage';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/data/site';
import { getPartnershipPageSeo } from '@/lib/partnerships/seo';
import { getAllPartnershipPrograms } from '@/data/partnerships/content';
import { getMarket } from '@/lib/markets/registry';
import { getBreadcrumbSchema, getFAQSchema, getMarketServiceSchema } from '@/data/structured-data';

const seo = getPartnershipPageSeo('us', ['partnerships'])!;

export const metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  canonical: '/partnerships',
});

export default function Page() {
  const market = getMarket('us');
  const programs = getAllPartnershipPrograms('us');
  const allFaq = programs.flatMap((p) => p.faq);

  const schemas: object[] = [
    getMarketServiceSchema(market, {
      name: seo.h1 ?? 'ZYVO Partnership Programs',
      description: seo.description,
      url: `${SITE_URL}/partnerships`,
    }),
    getBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Partnerships', url: `${SITE_URL}/partnerships` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'ZYVO Partnership Programs',
      itemListElement: programs.map((program, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: program.title,
        url: `${SITE_URL}/partnerships/${program.slug}`,
      })),
    },
  ];

  if (allFaq.length > 0) {
    schemas.push(getFAQSchema(allFaq.slice(0, 8)));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <PartnershipHubPage />
    </>
  );
}
