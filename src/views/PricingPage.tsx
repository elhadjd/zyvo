import Breadcrumbs from '../components/Breadcrumbs';
import PricingSection from '../components/PricingSection';
import { getBreadcrumbSchema, getFAQSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

const pricingFaqs = [
  {
    question: 'How much does ZYVO cost?',
    answer:
      'ZYVO offers three plans: Starter at $20/month (annual), Growth at $40/month, and Business at $80/month. All plans include a 7-day free trial.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. Every ZYVO plan includes a 7-day free trial with full access to all features in your chosen plan. No credit card required to start.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer:
      'Yes. Annual billing saves approximately 20% compared to monthly billing on all plans.',
  },
];

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Pricing' }]} />
      <PricingSection />
    </>
  );
}
