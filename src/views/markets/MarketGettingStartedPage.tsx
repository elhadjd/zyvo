import CompanySignupFlow from '@/components/CTA';
import MarketCTA from '@/components/markets/MarketCTA';

export default function MarketGettingStartedPage() {
  return (
    <>
      <section className="pt-28 pb-4 lg:pt-36 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Commencer avec ZYVO
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Créez votre compte en quelques minutes. Essai gratuit de 7 jours, sans carte bancaire
            internationale.
          </p>
        </div>
      </section>
      <CompanySignupFlow />
      <MarketCTA />
    </>
  );
}
