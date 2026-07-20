import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import UsTaxCalculatorPage from '@/views/UsTaxCalculatorPage';
import JsonLd from '@/components/JsonLd';
import { getFAQSchema, getWebApplicationSchema } from '@/data/structured-data';
import { getTaxConfig, getCalculatorBySlug } from '@/data/tax-calculators/config';
import { getUsTaxToolsSeo } from '@/lib/markets/tax-tools-seo';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/data/site';

const VALID_SLUGS = getTaxConfig('us').content.calculators.map((c) => c.slug);

interface ToolsCalculatorPageProps {
  params: Promise<{ calculator: string }>;
}

export function generateStaticParams() {
  return VALID_SLUGS.map((calculator) => ({ calculator }));
}

export async function generateMetadata({ params }: ToolsCalculatorPageProps): Promise<Metadata> {
  const { calculator } = await params;
  const seo = getUsTaxToolsSeo(calculator);
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: seo.path,
    locale: 'en_US',
  });
}

export default async function ToolsCalculatorPage({ params }: ToolsCalculatorPageProps) {
  const { calculator } = await params;

  if (!VALID_SLUGS.includes(calculator)) {
    notFound();
  }

  const calc = getCalculatorBySlug('us', calculator);
  const seo = getUsTaxToolsSeo(calculator);
  const config = getTaxConfig('us');

  if (!calc) notFound();

  return (
    <>
      <JsonLd
        data={[
          getWebApplicationSchema({
            name: calc.title,
            description: calc.shortDescription,
            url: `${SITE_URL}${seo.path}`,
            locale: 'en-US',
            offers: { price: '0', priceCurrency: 'USD' },
          }),
          getFAQSchema(config.content.faqs),
        ]}
      />
      <UsTaxCalculatorPage calculatorSlug={calculator} />
    </>
  );
}
