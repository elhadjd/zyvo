import IndustryLandingTemplate from '@/components/IndustryLandingTemplate';
import { getIndustryLandingBySlug } from '@/data/industry-landings';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema, getFAQSchema } from '@/data/structured-data';
import { SITE_URL } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

const landing = getIndustryLandingBySlug('salon-management-software')!;

export const metadata = buildMetadata({
  title: landing.metaTitle,
  description: landing.metaDescription,
  keywords: landing.keywords,
  canonical: landing.path,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: landing.industryName, url: `${SITE_URL}${landing.path}` },
          ]),
          getFAQSchema(landing.faqs),
        ]}
      />
      <IndustryLandingTemplate landing={landing} />
    </>
  );
}
