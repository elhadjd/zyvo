'use client';

import { useMarket } from '@/contexts/market-context';
import { MarketStats, MarketWhySection } from '@/components/markets/MarketHero';
import MarketCTA from '@/components/markets/MarketCTA';

export default function MarketAboutPage() {
  const { market } = useMarket();

  return (
    <>
      <section className="pt-28 pb-12 lg:pt-36 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            ZYVO en {market.countryNameLocal}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {market.description}
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            Nous accompagnons la transformation numérique des PME en Guinée — des boutiques de Kaloum
            aux commerces de Kindia, Labé et Kankan. Notre mission : rendre la gestion d&apos;entreprise
            accessible, abordable et adaptée aux réalités locales.
          </p>
        </div>
      </section>
      <MarketStats />
      <MarketWhySection />
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Le marché du logiciel en Guinée
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-4">
            <p>
              La Guinée connaît une accélération de la digitalisation des entreprises. Les PME adoptent
              progressivement les caisses électroniques, la gestion de stock numérique et les paiements
              mobiles. Pourtant, beaucoup d&apos;entrepreneurs utilisent encore Excel, des cahiers ou des
              solutions importées mal adaptées au contexte local.
            </p>
            <p>
              ZYVO comble ce fossé en proposant une plateforme cloud en français, avec des tarifs en
              francs guinéens, un support local et des fonctionnalités pensées pour Orange Money, les
              connexions mobiles et le commerce de proximité.
            </p>
            <p>
              Que vous dirigiez une superette à Ratoma, un maquis à Madina, un salon à Dixinn ou une
              pharmacie en province, ZYVO vous donne les outils pour professionnaliser votre gestion sans
              complexité inutile.
            </p>
          </div>
        </div>
      </section>
      <MarketCTA />
    </>
  );
}
