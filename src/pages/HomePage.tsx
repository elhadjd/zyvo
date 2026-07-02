import SEO from '../components/SEO';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import QueueShowcase from '../components/QueueShowcase';
import IntegrationsSection from '../components/IntegrationsSection';
import ProductSection from '../components/Products';
import Features from '../components/Features';
import TrustSection from '../components/TrustSection';
import FAQSection from '../components/FAQSection';
import PricingSection from '../components/PricingSection';
import CompanySection from '../components/company';
import CompanySignupFlow from '../components/CTA';
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from '../data/site';
import { getOrganizationSchema, getSoftwareApplicationSchema, getFAQSchema } from '../data/structured-data';
import { faqs } from '../data/faqs';

export default function HomePage() {
  return (
    <>
      <SEO
        title={`${SITE_NAME} — Run Your Entire Business From One Platform`}
        description={SITE_DESCRIPTION}
        keywords={SITE_KEYWORDS}
        canonical="/"
        structuredData={[getOrganizationSchema(), getSoftwareApplicationSchema(), getFAQSchema(faqs)]}
      />
      <Hero />
      <ProductShowcase />
      <ProductSection />
      <QueueShowcase />
      <IntegrationsSection />
      <Features />
      <TrustSection />
      <PricingSection />
      <FAQSection className="py-16 lg:py-24 bg-brand-surface dark:bg-gray-800/50" />
      <CompanySection />
      <CompanySignupFlow />
    </>
  );
}
