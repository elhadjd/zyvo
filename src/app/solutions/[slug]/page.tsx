import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SolutionPage from '@/views/SolutionPage';
import JsonLd from '@/components/JsonLd';
import { getSolutionBySlug, solutions } from '@/data/solutions';
import { getBreadcrumbSchema } from '@/data/structured-data';
import { SITE_URL } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return buildMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    keywords: solution.keywords,
    canonical: `/solutions/${solution.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Solutions', url: `${SITE_URL}/solutions` },
          { name: solution.shortTitle, url: `${SITE_URL}/solutions/${solution.slug}` },
        ])}
      />
      <SolutionPage slug={slug} />
    </>
  );
}
