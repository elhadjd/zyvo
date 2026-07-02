import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Server, FileCheck, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

const securityFeatures = [
  {
    icon: Lock,
    title: 'AES-256 Encryption',
    description: 'All data encrypted at rest and in transit using industry-standard AES-256 encryption and TLS 1.3.',
  },
  {
    icon: Shield,
    title: 'SOC 2 Type II Certified',
    description: 'Independently audited security controls covering availability, confidentiality, and processing integrity.',
  },
  {
    icon: Eye,
    title: 'Role-Based Access Control',
    description: 'Granular permissions ensure employees only access data relevant to their role. Full audit logs included.',
  },
  {
    icon: Server,
    title: 'US-Based Data Centers',
    description: 'Your data is stored in SOC 2 certified AWS data centers located in the United States.',
  },
  {
    icon: FileCheck,
    title: 'GDPR Compliant',
    description: 'Built-in compliance tools for GDPR data requests and privacy regulations for US and international customers.',
  },
];

export default function SecurityPage() {
  return (
    <>
      <SEO
        title="Security & Compliance — Enterprise-Grade Protection"
        description="ZYVO is SOC 2 Type II certified with AES-256 encryption, US-based data centers, and GDPR compliance for US businesses."
        keywords="business software security, SOC 2 certified ERP, GDPR compliant business platform USA"
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
              <Shield className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">ENTERPRISE SECURITY</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Your data security is our top priority
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              ZYVO protects your business data with bank-level encryption, independent security audits, and compliance with US and international regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              99.9% uptime SLA with 24/7 monitoring
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our infrastructure team monitors systems around the clock. Automated failover and daily backups ensure your business never stops.
            </p>
            <Link
              to="/getting-started"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Secure Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
