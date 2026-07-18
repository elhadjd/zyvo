import LocalizedLink from '@/components/markets/LocalizedLink';
import { Calendar, ArrowRight } from 'lucide-react';

export default function MarketDemoPage() {
  return (
    <>
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Réserver une démo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Découvrez ZYVO en 30 minutes avec notre équipe. Présentation personnalisée en français,
            adaptée à votre secteur et à votre ville.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-left space-y-4 mb-8">
            <h2 className="font-semibold text-gray-900 dark:text-white">Ce que vous verrez :</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li>• Caisse (POS) et encaissement mobile money</li>
              <li>• Gestion de stock et inventaire</li>
              <li>• Rapports et tableaux de bord</li>
              <li>• Tarifs en GNF et options de paiement local</li>
            </ul>
          </div>

          <LocalizedLink
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
          >
            <Calendar className="mr-2 w-5 h-5" aria-hidden="true" />
            Demander une démo gratuite
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </LocalizedLink>
        </div>
      </section>
    </>
  );
}
