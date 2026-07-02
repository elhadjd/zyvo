import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import CompanySection from '../components/company';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About ZYVO — Our Mission to Help US Businesses Grow"
        description="Learn about ZYVO Technologies, founded in 2020. We serve 2,500+ US companies with all-in-one business management software from our Columbus, OH headquarters."
        keywords="about ZYVO, ZYVO Technologies, business management company USA, Columbus Ohio software company"
        canonical="/about"
        structuredData={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'About', url: `${SITE_URL}/about` },
        ])}
      />
      <Breadcrumbs items={[{ label: 'About' }]} />
      <CompanySection />
    </>
  );
}
