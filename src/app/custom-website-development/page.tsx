import { notFound } from 'next/navigation';
import DevelopmentServiceDetailPage from '@/views/DevelopmentServiceDetailPage';
import JsonLd from '@/components/JsonLd';
import { getServiceBySlug } from '@/data/development-services';
import { getBreadcrumbSchema, getFAQSchema, getProfessionalServiceSchema } from '@/data/structured-data';
import { SITE_URL } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

const service = getServiceBySlug('custom-website-development')!;

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: service.keywords,
  canonical: service.path,
});

export default function Page() {
  if (!service) notFound();
  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Development Services', url: `${SITE_URL}/development-services` },
            { name: service.title, url: `${SITE_URL}${service.path}` },
          ]),
          getProfessionalServiceSchema({
            name: service.title,
            description: service.metaDescription,
            url: `${SITE_URL}${service.path}`,
            priceFrom: service.priceFrom,
          }),
          getFAQSchema(service.faqs),
        ]}
      />
      <DevelopmentServiceDetailPage slug="custom-website-development" />
    </>
  );
}
