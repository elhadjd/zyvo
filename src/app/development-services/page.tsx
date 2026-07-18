import DevelopmentServicesPage from '@/views/DevelopmentServicesPage';
import { staticPageMetadata } from '@/lib/page-metadata';
import JsonLd from '@/components/JsonLd';
import { developmentFaqs, developmentServices } from '@/data/development-services';
import { getFAQSchema, getProfessionalServiceSchema, getServiceCatalogSchema } from '@/data/structured-data';
import { SITE_URL } from '@/data/site';

export const metadata = staticPageMetadata.developmentServices;

export default function Page() {
  return (
    <>
      <JsonLd data={[
        getServiceCatalogSchema(),
        getFAQSchema(developmentFaqs),
        ...developmentServices.map((s) => getProfessionalServiceSchema({ name: s.title, description: s.metaDescription, url: `${SITE_URL}${s.path}`, priceFrom: s.priceFrom })),
      ]} />
      <DevelopmentServicesPage />
    </>
  );
}
