import Breadcrumbs from '../components/Breadcrumbs';
import { COMPANY } from '../data/site';

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
      <article className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: January 1, 2026</p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using the ZYVO platform operated by {COMPANY.name}, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
              <p>
                ZYVO provides a cloud-based business management platform including point of sale, inventory management, human resources, financial management, e-commerce, and related tools for US businesses.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Account Registration</h2>
              <p>
                You must provide accurate registration information and maintain the security of your account credentials. You are responsible for all activity under your account.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Subscription and Billing</h2>
              <p>
                Paid subscriptions are billed monthly or annually in advance. Free trials last 7 days. You may cancel at any time; cancellation takes effect at the end of the current billing period. Refunds are provided on a case-by-case basis within 30 days of purchase.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Acceptable Use</h2>
              <p>You agree not to use ZYVO to violate any law, infringe intellectual property rights, transmit malware, or attempt to gain unauthorized access to our systems or other users&apos; data.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Data Ownership</h2>
              <p>
                You retain ownership of all business data you enter into ZYVO. We claim no intellectual property rights over your content. You grant us a limited license to process your data solely to provide the service.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, ZYVO&apos;s total liability shall not exceed the amount paid by you in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Contact</h2>
              <p>Questions about these terms: {COMPANY.email}</p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
