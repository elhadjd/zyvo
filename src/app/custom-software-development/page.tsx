import { notFound } from 'next/navigation';
import DevelopmentServiceDetailPage from '@/views/DevelopmentServiceDetailPage';
import JsonLd from '@/components/JsonLd';
import { getServiceBySlug } from '@/data/development-services';
import { getBreadcrumbSchema } from '@/data/structured-data';
import { SITE_URL } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { buildDevelopmentPageSchemas } from '@/lib/development-services/schema';
import { getMarket } from '@/lib/markets/registry';

const SLUG = 'custom-software-development' as const;
const service = getServiceBySlug(SLUG)!;

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: service.keywords,
  canonical: service.path,
});

export default function Page() {
  if (!service) notFound();
  const market = getMarket('us');
  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Development Services', url: `${SITE_URL}/development-services` },
            { name: service.title, url: `${SITE_URL}${service.path}` },
          ]),
          ...buildDevelopmentPageSchemas('us', market, [], SLUG),
        ]}
      />
      <DevelopmentServiceDetailPage slug={SLUG} />
    </>
  );
}
