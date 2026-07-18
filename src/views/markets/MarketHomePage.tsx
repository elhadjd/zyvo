import MarketHero, { MarketStats, MarketWhySection } from '@/components/markets/MarketHero';
import MarketMobileMoneySection from '@/components/markets/MarketMobileMoneySection';
import MarketPricingSection, {
  MarketIndustriesSection,
  MarketFeaturesGrid,
} from '@/components/markets/MarketPricingSection';
import MarketFAQSection from '@/components/markets/MarketFAQSection';
import MarketCTA from '@/components/markets/MarketCTA';

export default function MarketHomePage() {
  return (
    <>
      <MarketHero />
      <MarketStats />
      <MarketWhySection />
      <MarketMobileMoneySection />
      <MarketFeaturesGrid />
      <MarketIndustriesSection />
      <MarketPricingSection />
      <MarketFAQSection className="bg-brand-surface dark:bg-gray-800/50" />
      <MarketCTA />
    </>
  );
}
