import Breadcrumbs from '../components/Breadcrumbs';
import FAQSection from '../components/FAQSection';
import { getFAQSchema } from '../data/structured-data';
import { faqs } from '../data/faqs';
import { SITE_URL } from '../data/site';

export default function FAQPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'FAQ' }]} />
      <FAQSection />
    </>
  );
}
