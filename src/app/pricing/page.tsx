import PricingPage from '@/views/PricingPage';
import { staticPageMetadata } from '@/lib/page-metadata';
import JsonLd from '@/components/JsonLd';
import { getFAQSchema } from '@/data/structured-data';
import { faqs } from '@/data/faqs';

export const metadata = staticPageMetadata.pricing;

export default function Page() {
  return (
    <>
      <JsonLd data={getFAQSchema(faqs)} />
      <PricingPage />
    </>
  );
}
