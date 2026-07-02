import { Link } from 'react-router-dom';
import { Lock, Eye, Server, FileCheck, Database, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

const securityFeatures = [
  {
    icon: Lock,
    title: 'Encrypted communications',
    description: 'Data in transit is protected using industry-standard TLS encryption between your browser and our servers.',
  },
  {
    icon: Server,
    title: 'Secure cloud hosting',
    description: 'ZYVO runs on secure cloud infrastructure in the United States with monitoring and access controls.',
  },
  {
    icon: Database,
    title: 'Daily backups',
    description: 'Automated daily backups help protect your business data and support recovery when needed.',
  },
  {
    icon: Eye,
    title: 'User permissions',
    description: 'Role-based access control lets you decide who can view, edit, or manage sensitive business information.',
  },
  {
    icon: FileCheck,
    title: 'Security best practices',
    description: 'We follow established security practices for authentication, logging, and infrastructure management.',
  },
];

export default function SecurityPage() {
  return (
    <>
      <SEO
        title="Security — How We Protect Your Business Data"
        description="Learn how ZYVO protects your data with encrypted communications, secure cloud hosting, daily backups, and role-based user permissions."
        keywords="business software security, cloud security, data encryption, secure POS software USA"
        canonical="/security"
        structuredData={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Security', url: `${SITE_URL}/security` },
        ])}
      />
      <Breadcrumbs items={[{ label: 'Security' }]} />
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Security you can understand
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your business data matters. We use practical, transparent security measures—not marketing buzzwords.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-brand-surface dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand-surface dark:bg-gray-800 rounded-2xl p-8 lg:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Questions about security?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Contact our team if you need more detail about how we handle your business data.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors min-h-[48px]"
              >
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                to="/privacy-policy"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-brand-primary text-brand-primary dark:border-brand-accent dark:text-brand-accent font-semibold rounded-lg min-h-[48px]"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
