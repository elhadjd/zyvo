import Breadcrumbs from '../components/Breadcrumbs';
import CompanySignupFlow from '../components/CTA';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function GettingStartedPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Get Started' }]} />
      <CompanySignupFlow />
    </>
  );
}
