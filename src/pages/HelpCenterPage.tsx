import { Link } from 'react-router-dom';
import { HelpCircle, BookOpen, MessageCircle, FileText } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBreadcrumbSchema, getFAQSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

const faqs = [
  {
    question: 'How do I get started with ZYVO?',
    answer:
      'Sign up for a free 7-day trial at zyvoerp.com/getting-started. Enter your business email, company details, and you will have access to your account within minutes.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, American Express) and ACH bank transfers for annual plans.',
  },
  {
    question: 'Can I import data from my current software?',
    answer:
      'Yes. ZYVO supports CSV imports for customers, products, and inventory. Our onboarding team can assist with migrations from QuickBooks, Square, and Shopify.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. ZYVO uses AES-256 encryption, is SOC 2 Type II certified, and stores all data in US-based AWS data centers. See our Security page for details.',
  },
  {
    question: 'How do I contact support?',
    answer:
      'Email support@zyvoerp.com or call +1 (973) 524-9725. Growth and Business plan customers receive priority support with 24-hour response times.',
  },
];

const resources = [
  { icon: BookOpen, title: 'Documentation', description: 'Step-by-step guides for every ZYVO feature', href: '/blog' },
  { icon: MessageCircle, title: 'Contact Support', description: 'Reach our US-based support team', href: '/contact' },
  { icon: FileText, title: 'Blog & Guides', description: 'Best practices and how-to articles', href: '/blog' },
  { icon: HelpCircle, title: 'Security & Compliance', description: 'Learn about our security certifications', href: '/security' },
];

export default function HelpCenterPage() {
  return (
    <>
      <SEO
        title="Help Center — Support & Documentation"
        description="Get help with ZYVO. FAQs, documentation, support contact, and guides for US businesses using our business management platform."
        keywords="ZYVO help center, ZYVO support, business software documentation, ZYVO FAQ"
        canonical="/help-center"
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', url: SITE_URL },
            { name: 'Help Center', url: `${SITE_URL}/help-center` },
          ]),
          getFAQSchema(faqs),
        ]}
      />
      <Breadcrumbs items={[{ label: 'Help Center' }]} />
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How can we help?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Find answers, browse documentation, or contact our US-based support team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                to={resource.href}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <resource.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
              </Link>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
