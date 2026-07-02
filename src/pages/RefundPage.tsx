import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { COMPANY } from '../data/site';

export default function RefundPage() {
  return (
    <>
      <SEO
        title="Refund Policy"
        description="ZYVO refund policy. Learn about our 7-day trial, cancellation terms, and refund eligibility."
        canonical="/refund-policy"
      />
      <Breadcrumbs items={[{ label: 'Refund Policy' }]} />
      <article className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Refund Policy</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: January 1, 2026</p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Free trial</h2>
              <p>
                ZYVO offers a 7-day free trial on all plans. No credit card is required to start. If you cancel before
                the trial ends, you will not be charged.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Subscriptions</h2>
              <p>
                Paid subscriptions are billed monthly or annually in advance. You may cancel at any time from your
                account settings. Cancellation takes effect at the end of your current billing period—you retain
                access until that date.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Refund eligibility</h2>
              <p>
                If you are not satisfied with ZYVO, contact us within 30 days of your first paid charge at{' '}
                {COMPANY.email}. We review refund requests on a case-by-case basis and will work with you to find a
                fair resolution.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Annual plans</h2>
              <p>
                For annual subscriptions, partial refunds may be available within the first 30 days if you have not
                extensively used the platform. Contact support for details.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
              <p>
                Questions about refunds: <a href={`mailto:${COMPANY.email}`} className="text-brand-primary dark:text-brand-accent hover:underline">{COMPANY.email}</a>
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
