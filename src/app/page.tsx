import HomePage from '@/views/HomePage';
import { staticPageMetadata } from '@/lib/page-metadata';
import JsonLd from '@/components/JsonLd';
import { getOrganizationSchema, getSoftwareApplicationSchema, getFAQSchema } from '@/data/structured-data';
import { faqs } from '@/data/faqs';

export const metadata = staticPageMetadata.home;

export default function Page() {
  return (
    <>
      <JsonLd data={[getOrganizationSchema(), getSoftwareApplicationSchema(), getFAQSchema(faqs)]} />
      <HomePage />
    </>
  );
}
