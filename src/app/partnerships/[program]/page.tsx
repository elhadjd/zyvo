import { notFound } from 'next/navigation';
import PartnershipProgramPage from '@/views/partnerships/PartnershipProgramPage';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/data/site';
import { getPartnershipPageSeo } from '@/lib/partnerships/seo';
import { getPartnershipProgram } from '@/data/partnerships/content';
import { isPartnershipProgramSlug, PARTNERSHIP_PROGRAM_SLUGS } from '@/data/partnerships/programs';
import { getBreadcrumbSchema, getFAQSchema, getMarketServiceSchema } from '@/data/structured-data';
import { getMarket } from '@/lib/markets/registry';
import type { PartnershipProgramSlug } from '@/data/partnerships/types';

interface PageProps {
  params: Promise<{ program: string }>;
}

export function generateStaticParams() {
  return PARTNERSHIP_PROGRAM_SLUGS.map((program) => ({ program }));
}

export async function generateMetadata({ params }: PageProps) {
  const { program } = await params;
  if (!isPartnershipProgramSlug(program)) return {};
  const seo = getPartnershipPageSeo('us', ['partnerships', program]);
  if (!seo) return {};
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonical: `/partnerships/${program}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { program } = await params;
  if (!isPartnershipProgramSlug(program)) {
    notFound();
  }

  const seo = getPartnershipPageSeo('us', ['partnerships', program])!;
  const programData = getPartnershipProgram('us', program as PartnershipProgramSlug);
  const market = getMarket('us');

  const schemas: object[] = [
    getMarketServiceSchema(market, {
      name: programData.title,
      description: programData.description,
      url: `${SITE_URL}/partnerships/${program}`,
    }),
    getBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Partnerships', url: `${SITE_URL}/partnerships` },
      { name: programData.shortTitle, url: `${SITE_URL}/partnerships/${program}` },
    ]),
  ];

  if (programData.faq.length > 0) {
    schemas.push(getFAQSchema(programData.faq));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <PartnershipProgramPage programSlug={program} />
    </>
  );
}
