#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = join(__dirname, '..', 'src', 'app');

const staticRoutes = [
  { segment: '', page: 'HomePage', meta: 'home', jsonLd: true },
  { segment: 'features', page: 'FeaturesPage', meta: 'features' },
  { segment: 'pricing', page: 'PricingPage', meta: 'pricing', jsonLdFaq: true },
  { segment: 'about', page: 'AboutPage', meta: 'about' },
  { segment: 'contact', page: 'ContactPage', meta: 'contact' },
  { segment: 'security', page: 'SecurityPage', meta: 'security' },
  { segment: 'demo', page: 'DemoPage', meta: 'demo' },
  { segment: 'faq', page: 'FAQPage', meta: 'faq', jsonLdFaq: true },
  { segment: 'solutions', page: 'SolutionsIndexPage', meta: 'solutions' },
  { segment: 'industries', page: 'IndustriesIndexPage', meta: 'industries' },
  { segment: 'development-services', page: 'DevelopmentServicesPage', meta: 'developmentServices', devServices: true },
  { segment: 'blog', page: 'BlogIndexPage', meta: 'blog' },
  { segment: 'integrations', page: 'IntegrationsPage', meta: 'integrations' },
  { segment: 'getting-started', page: 'GettingStartedPage', meta: 'gettingStarted' },
  { segment: 'help-center', page: 'HelpCenterPage', meta: 'helpCenter' },
  { segment: 'privacy-policy', page: 'PrivacyPage', meta: 'privacy' },
  { segment: 'terms-of-service', page: 'TermsPage', meta: 'terms' },
  { segment: 'refund-policy', page: 'RefundPage', meta: 'refund' },
  { segment: 'cookie-policy', page: 'CookiesPage', meta: 'cookies' },
];

const industryLandingSlugs = [
  'salon-management-software',
  'barbershop-management-software',
  'restaurant-pos-system',
  'retail-management-software',
  'clinic-management-software',
  'pharmacy-management-software',
];

const devServiceSlugs = [
  'custom-website-development',
  'custom-software-development',
  'website-maintenance-services',
];

function writePage(dir, content) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'page.tsx'), content);
}

for (const route of staticRoutes) {
  const dir = join(APP, route.segment);
  let extraImports = '';
  let extraJsx = '';

  if (route.jsonLd) {
    extraImports = `import JsonLd from '@/components/JsonLd';\nimport { getOrganizationSchema, getSoftwareApplicationSchema, getFAQSchema } from '@/data/structured-data';\nimport { faqs } from '@/data/faqs';\n`;
    extraJsx = `\n      <JsonLd data={[getOrganizationSchema(), getSoftwareApplicationSchema(), getFAQSchema(faqs)]} />`;
  }
  if (route.jsonLdFaq) {
    extraImports += `import JsonLd from '@/components/JsonLd';\nimport { getFAQSchema } from '@/data/structured-data';\nimport { faqs } from '@/data/faqs';\n`;
    extraJsx += `\n      <JsonLd data={getFAQSchema(faqs)} />`;
  }
  if (route.devServices) {
    extraImports = `import JsonLd from '@/components/JsonLd';\nimport { developmentFaqs, developmentServices } from '@/data/development-services';\nimport { getFAQSchema, getProfessionalServiceSchema, getServiceCatalogSchema } from '@/data/structured-data';\nimport { SITE_URL } from '@/data/site';\n`;
    extraJsx = `\n      <JsonLd data={[\n        getServiceCatalogSchema(),\n        getFAQSchema(developmentFaqs),\n        ...developmentServices.map((s) => getProfessionalServiceSchema({ name: s.title, description: s.metaDescription, url: \`\${SITE_URL}\${s.path}\`, priceFrom: s.priceFrom })),\n      ]} />`;
  }

  const content = `import ${route.page} from '@/views/${route.page}';\nimport { staticPageMetadata } from '@/lib/page-metadata';\n${extraImports}\nexport const metadata = staticPageMetadata.${route.meta};\n\nexport default function Page() {\n  return (\n    <>${extraJsx}\n      <${route.page} />\n    </>\n  );\n}\n`;
  writePage(dir, content);
}

// Dynamic routes
writePage(join(APP, 'solutions', '[slug]'), `import { notFound } from 'next/navigation';
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
    canonical: \`/solutions/\${solution.slug}\`,
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
          { name: 'Solutions', url: \`\${SITE_URL}/solutions\` },
          { name: solution.shortTitle, url: \`\${SITE_URL}/solutions/\${solution.slug}\` },
        ])}
      />
      <SolutionPage slug={slug} />
    </>
  );
}
`);

writePage(join(APP, 'industries', '[slug]'), `import { notFound } from 'next/navigation';
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
    canonical: \`/industries/\${industry.slug}\`,
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
          { name: 'Industries', url: \`\${SITE_URL}/industries\` },
          { name: industry.name, url: \`\${SITE_URL}/industries/\${industry.slug}\` },
        ])}
      />
      <IndustryPage slug={slug} />
    </>
  );
}
`);

writePage(join(APP, 'blog', '[slug]'), `import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostPage from '@/views/BlogPostPage';
import JsonLd from '@/components/JsonLd';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { getArticleSchema, getBreadcrumbSchema } from '@/data/structured-data';
import { SITE_URL } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    canonical: \`/blog/\${post.slug}\`,
    ogType: 'article',
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Blog', url: \`\${SITE_URL}/blog\` },
            { name: post.title, url: \`\${SITE_URL}/blog/\${post.slug}\` },
          ]),
          getArticleSchema(post),
        ]}
      />
      <BlogPostPage slug={slug} />
    </>
  );
}
`);

for (const slug of devServiceSlugs) {
  writePage(join(APP, slug), `import { notFound } from 'next/navigation';
import DevelopmentServiceDetailPage from '@/views/DevelopmentServiceDetailPage';
import JsonLd from '@/components/JsonLd';
import { getServiceBySlug } from '@/data/development-services';
import { getBreadcrumbSchema, getFAQSchema, getProfessionalServiceSchema } from '@/data/structured-data';
import { SITE_URL } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

const service = getServiceBySlug('${slug}')!;

export const metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: service.keywords,
  canonical: service.path,
});

export default function Page() {
  if (!service) notFound();
  return (
    <>
      <JsonLd
        data={[
          getBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Development Services', url: \`\${SITE_URL}/development-services\` },
            { name: service.title, url: \`\${SITE_URL}\${service.path}\` },
          ]),
          getProfessionalServiceSchema({
            name: service.title,
            description: service.metaDescription,
            url: \`\${SITE_URL}\${service.path}\`,
            priceFrom: service.priceFrom,
          }),
          getFAQSchema(service.faqs),
        ]}
      />
      <DevelopmentServiceDetailPage slug="${slug}" />
    </>
  );
}
`);
}

for (const slug of industryLandingSlugs) {
  const dir = join(APP, slug);
  const landing = slug;
  writePage(dir, `import IndustryLandingTemplate from '@/components/IndustryLandingTemplate';
import { getIndustryLandingBySlug } from '@/data/industry-landings';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema, getFAQSchema } from '@/data/structured-data';
import { SITE_URL } from '@/data/site';
import { buildMetadata } from '@/lib/seo';

const landing = getIndustryLandingBySlug('${slug}')!;

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
            { name: landing.industryName, url: \`\${SITE_URL}\${landing.path}\` },
          ]),
          getFAQSchema(landing.faqs),
        ]}
      />
      <IndustryLandingTemplate landing={landing} />
    </>
  );
}
`);
}

// not-found
writeFileSync(
  join(APP, 'not-found.tsx'),
  `import NotFoundPage from '@/views/NotFoundPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.notFound;

export default function NotFound() {
  return <NotFoundPage />;
}
`
);

console.log('App routes created');
