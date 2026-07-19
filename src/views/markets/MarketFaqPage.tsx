import MarketFAQSection from '@/components/markets/MarketFAQSection';
import MarketCTA from '@/components/markets/MarketCTA';

export default function MarketFaqPage() {
  return (
    <>
      <section className="pt-28 pb-4 lg:pt-36 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">FAQ</h1>
        </div>
      </section>
      <MarketFAQSection className="bg-white dark:bg-gray-900" />
      <MarketCTA />
    </>
  );
}
