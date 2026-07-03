export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: 'How does the free trial work?',
    answer:
      'Start with a 7-day free trial and explore the features in your chosen plan. You get full access during the trial period so you can run real workflows before committing.',
  },
  {
    question: 'Do I need a credit card to start?',
    answer:
      'No. You can start your free trial without entering a credit card. We only ask for billing details when you decide to continue after the trial.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. You can cancel your subscription at any time from your account settings. Your access continues until the end of your current billing period.',
  },
  {
    question: 'Can multiple employees use the system?',
    answer:
      'Yes. ZYVO supports multiple users with role-based permissions. Each team member gets their own login with access tailored to their responsibilities.',
  },
  {
    question: 'Does ZYVO support multiple locations?',
    answer:
      'Yes. Manage inventory, staff, and sales across multiple store locations from a single dashboard with location-level reporting.',
  },
  {
    question: 'Is there customer support?',
    answer:
      'Yes. Our US-based support team is available by email and phone during business hours. Paid plans include priority support with faster response times.',
  },
  {
    question: 'Can I migrate data from another system?',
    answer:
      'Yes. ZYVO supports CSV imports for customers, products, and inventory. Our team can help you plan a migration from common tools like spreadsheets, QuickBooks, or Square.',
  },
  {
    question: 'Does it work on mobile devices?',
    answer:
      'Yes. ZYVO is fully responsive in the browser and works on phones and tablets—ideal for floor staff, stylists, and managers on the go.',
  },
];
