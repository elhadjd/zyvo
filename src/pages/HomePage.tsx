import SEO from '../components/SEO';
import Hero from '../components/Hero';
import ProductSection from '../components/Products';
import Testimonials from '../components/Testimonials';
import PricingSection from '../components/PricingSection';
import CompanySection from '../components/company';
import CompanySignupFlow from '../components/CTA';
import Features from '../components/Features';
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from '../data/site';
import { getOrganizationSchema, getSoftwareApplicationSchema } from '../data/structured-data';

export default function HomePage() {
  return (
    <>
      <SEO
        title={`${SITE_NAME} — Business Management Software for US Companies`}
        description={SITE_DESCRIPTION}
        keywords={SITE_KEYWORDS}
        canonical="/"
        structuredData={[getOrganizationSchema(), getSoftwareApplicationSchema()]}
      />
      <Hero />
      <ProductSection />
      <Features />
      <Testimonials />
      <PricingSection />
      <CompanySection />
      <CompanySignupFlow />
    </>
  );
}
