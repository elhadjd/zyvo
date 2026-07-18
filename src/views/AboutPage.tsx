import Breadcrumbs from '../components/Breadcrumbs';
import CompanySection from '../components/company';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'About' }]} />
      <CompanySection />
    </>
  );
}
