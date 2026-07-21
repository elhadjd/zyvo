import UsTaxToolsHubPage from '@/views/UsTaxToolsHubPage';
import { staticPageMetadata } from '@/lib/page-metadata';
import JsonLd from '@/components/JsonLd';
import { getFAQSchema, getWebApplicationSchema } from '@/data/structured-data';
import { getTaxConfig } from '@/data/tax-calculators/config';
import { getCodeConfig } from '@/data/code-generators/config';
import { US_CODE_TOOLS_SEO } from '@/lib/markets/code-tools-seo';
import { SITE_URL } from '@/data/site';

const codeConfig = getCodeConfig('us');

export const metadata = {
  ...staticPageMetadata.taxTools,
  title: {
    absolute: US_CODE_TOOLS_SEO.hub.title,
  },
  description: US_CODE_TOOLS_SEO.hub.description,
  keywords: US_CODE_TOOLS_SEO.hub.keywords,
};

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebApplicationSchema({
            name: codeConfig.content.hubTitle,
            description: codeConfig.content.hubDescription,
            url: `${SITE_URL}/tools`,
            locale: 'en-US',
            offers: { price: '0', priceCurrency: 'USD' },
          }),
          getFAQSchema([...codeConfig.content.faqs, ...getTaxConfig('us').content.faqs.slice(0, 2)]),
        ]}
      />
      <UsTaxToolsHubPage />
    </>
  );
}
