import DevelopmentServicesPage from '@/views/DevelopmentServicesPage';
import { staticPageMetadata } from '@/lib/page-metadata';
import JsonLd from '@/components/JsonLd';
import { buildDevelopmentPageSchemas } from '@/lib/development-services/schema';
import { getMarket } from '@/lib/markets/registry';

export const metadata = staticPageMetadata.developmentServices;

export default function Page() {
  const market = getMarket('us');
  return (
    <>
      <JsonLd data={buildDevelopmentPageSchemas('us', market, [])} />
      <DevelopmentServicesPage />
    </>
  );
}
