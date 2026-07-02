import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import { getFAQSchema } from '../data/structured-data';
import { faqs } from '../data/faqs';
import { SITE_URL } from '../data/site';

export default function FAQPage() {
  return (
    <>
      <SEO
        title="FAQ — Frequently Asked Questions"
        description="Answers about ZYVO free trial, pricing, multi-location support, data migration, mobile access, and customer support."
        keywords="ZYVO FAQ, business software questions, free trial FAQ"
        canonical="/faq"
        structuredData={getFAQSchema(faqs)}
      />
      <Breadcrumbs items={[{ label: 'FAQ' }]} />
      <FAQSection />
    </>
  );
}
