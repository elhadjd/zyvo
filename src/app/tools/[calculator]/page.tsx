import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import UsToolPage from '@/views/UsToolPage';
import JsonLd from '@/components/JsonLd';
import { getFAQSchema, getWebApplicationSchema } from '@/data/structured-data';
import { getTaxConfig, getCalculatorBySlug } from '@/data/tax-calculators/config';
import { getCodeConfig, getCodeGeneratorBySlug } from '@/data/code-generators/config';
import { getUsTaxToolsSeo } from '@/lib/markets/tax-tools-seo';
import { getUsCodeToolsSeo } from '@/lib/markets/code-tools-seo';
import { getInvoiceConfig, isInvoiceSlug } from '@/data/invoice-generator/config';
import { getTemplateLibraryConfig, isTemplateLibrarySlug } from '@/data/invoice-templates/config';
import { getUsInvoiceSeo } from '@/lib/markets/invoice-tools-seo';
import { getUsTemplateLibrarySeo } from '@/lib/markets/invoice-template-seo';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/data/site';

const TAX_SLUGS = getTaxConfig('us').content.calculators.map((c) => c.slug);
const CODE_SLUGS = getCodeConfig('us').content.generators.map((g) => g.slug);
const INVOICE_SLUG = getInvoiceConfig('us').slug;
const TEMPLATE_SLUG = getTemplateLibraryConfig('us').slug;
const VALID_SLUGS = [...TAX_SLUGS, ...CODE_SLUGS, INVOICE_SLUG, TEMPLATE_SLUG];

interface ToolsCalculatorPageProps {
  params: Promise<{ calculator: string }>;
}

export function generateStaticParams() {
  return VALID_SLUGS.map((calculator) => ({ calculator }));
}

function getToolSeo(slug: string) {
  if (isTemplateLibrarySlug('us', slug)) {
    return getUsTemplateLibrarySeo();
  }
  if (isInvoiceSlug('us', slug)) {
    return getUsInvoiceSeo();
  }
  if (CODE_SLUGS.includes(slug)) {
    return getUsCodeToolsSeo(slug);
  }
  return getUsTaxToolsSeo(slug);
}

export async function generateMetadata({ params }: ToolsCalculatorPageProps): Promise<Metadata> {
  const { calculator } = await params;
  const seo = getToolSeo(calculator);
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

  const seo = getToolSeo(calculator);
  const taxCalc = getCalculatorBySlug('us', calculator);
  const codeGen = getCodeGeneratorBySlug('us', calculator);
  const invoiceConfig = isInvoiceSlug('us', calculator) ? getInvoiceConfig('us') : null;
  const templateConfig = isTemplateLibrarySlug('us', calculator) ? getTemplateLibraryConfig('us') : null;
  const tool = taxCalc ?? codeGen ?? (invoiceConfig ? { title: invoiceConfig.title, shortDescription: invoiceConfig.shortDescription } : null) ?? (templateConfig ? { title: templateConfig.title, shortDescription: templateConfig.shortDescription } : null);

  if (!tool) notFound();

  const codeConfig = getCodeConfig('us');
  const taxConfig = getTaxConfig('us');

  const faqs = taxCalc
    ? taxConfig.content.faqs
    : invoiceConfig
      ? invoiceConfig.faqs
      : templateConfig
        ? templateConfig.faqs
        : codeConfig.content.faqs;

  return (
    <>
      <JsonLd
        data={[
          getWebApplicationSchema({
            name: tool.title,
            description: tool.shortDescription,
            url: `${SITE_URL}${seo.path}`,
            locale: 'en-US',
            offers: { price: '0', priceCurrency: 'USD' },
          }),
          getFAQSchema(faqs),
        ]}
      />
      <UsToolPage calculatorSlug={calculator} />
    </>
  );
}
