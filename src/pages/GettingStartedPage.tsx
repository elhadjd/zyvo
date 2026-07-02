import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import CompanySignupFlow from '../components/CTA';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function GettingStartedPage() {
  return (
    <>
      <SEO
        title="Start Your Free 7-Day Trial — No Credit Card Required"
        description="Sign up for ZYVO and start your 7-day free trial. Set up your US business in minutes with POS, inventory, HR, and finance tools."
        keywords="ZYVO free trial, business software trial, start business management software USA"
        canonical="/getting-started"
        structuredData={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Get Started', url: `${SITE_URL}/getting-started` },
        ])}
      />
      <Breadcrumbs items={[{ label: 'Get Started' }]} />
      <CompanySignupFlow />
    </>
  );
}
