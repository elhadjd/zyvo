import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { COMPANY } from '../data/site';

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="ZYVO Technologies privacy policy. Learn how we collect, use, and protect your business data in compliance with US privacy regulations."
        canonical="/privacy-policy"
      />
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <article className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: January 1, 2026</p>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
              <p>
                {COMPANY.name} ("ZYVO," "we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our business management platform and website at zyvoerp.com.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
              <p>We collect information you provide directly, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Account registration information (name, email, company name, phone number)</li>
                <li>Business data you enter into the platform (customers, products, transactions, employees)</li>
                <li>Payment and billing information</li>
                <li>Communications with our support team</li>
                <li>Website usage data through cookies and analytics</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide, maintain, and improve the ZYVO platform</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze usage trends to improve our services</li>
                <li>Detect and prevent fraudulent or unauthorized activity</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
              <p>
                We implement AES-256 encryption, SOC 2 Type II certified controls, and store all data in US-based AWS data centers. See our Security page for complete details on our security practices.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Your Rights</h2>
              <p>
                US residents may request access to, correction of, or deletion of their personal data by contacting {COMPANY.email}. California residents have additional rights under the CCPA.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Contact Us</h2>
              <p>
                For privacy-related questions, contact us at {COMPANY.email} or {COMPANY.address.street}, {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
