import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import IndustryPage from '@/views/IndustryPage';
import JsonLd from '@/components/JsonLd';
import { getIndustryBySlug, industries } from '@/data/industries';
import { getBreadcrumbSchema } from '@/data/structured-data';
import { SITE_URL } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    keywords: industry.keywords,
    canonical: `/industries/${industry.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Industries', url: `${SITE_URL}/industries` },
          { name: industry.title, url: `${SITE_URL}/industries/${industry.slug}` },
        ])}
      />
      <IndustryPage slug={slug} />
    </>
  );
}
