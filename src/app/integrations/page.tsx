import IntegrationsPage from '@/views/IntegrationsPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.integrations;

export default function Page() {
  return (
    <>
      <IntegrationsPage />
    </>
  );
}
