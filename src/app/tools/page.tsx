import UsTaxToolsHubPage from '@/views/UsTaxToolsHubPage';
import { staticPageMetadata } from '@/lib/page-metadata';
import JsonLd from '@/components/JsonLd';
import { getFAQSchema, getWebApplicationSchema } from '@/data/structured-data';
import { getTaxConfig } from '@/data/tax-calculators/config';
import { SITE_URL } from '@/data/site';

const config = getTaxConfig('us');

export const metadata = {
  ...staticPageMetadata.taxTools,
  title: {
    absolute: 'Free Tax Calculators USA — Income Tax, Paycheck, Sales Tax | ZYVO',
  },
};

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebApplicationSchema({
            name: config.content.hubTitle,
            description: config.content.hubDescription,
            url: `${SITE_URL}/tools`,
            locale: 'en-US',
            offers: { price: '0', priceCurrency: 'USD' },
          }),
          getFAQSchema(config.content.faqs),
        ]}
      />
      <UsTaxToolsHubPage />
    </>
  );
}
