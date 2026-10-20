'use client';

import { ArrowRight, Shield } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';
import ZyvoLogo from '@/components/ZyvoLogo';
import { getExternalSignupUrlForMarket } from '@/lib/external-signup';
import { getSignupFormCopy } from '@/data/markets/form-locale';

const CompanySignupFlow = () => {
  const { market, marketCode } = useMarket();
  const copy = getSignupFormCopy(marketCode);
  const signupUrl = getExternalSignupUrlForMarket(marketCode);

  return (
    <section id="getting-started" className="py-20 lg:py-16">
      <div className="mx-auto px-4 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <ZyvoLogo size={56} className="rounded-xl shadow-sm" priority />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{copy.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{copy.subtitle}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {marketCode === 'us'
                ? 'Create your company on the ZYVO app — setup takes a few minutes on app.zyvoerp.com.'
                : `Créez votre entreprise sur l’application ZYVO pour ${market.countryNameLocal} — inscription sur app.zyvoerp.com.`}
            </p>

            <a
              href={signupUrl}
              className="w-full flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
            >
              {copy.startTrial}
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              {copy.termsPrefix}{' '}
              <LocalizedLink href="/terms-of-service" className="text-brand-primary hover:underline">
                {copy.termsLink}
              </LocalizedLink>{' '}
              {copy.and}{' '}
              <LocalizedLink href="/privacy-policy" className="text-brand-primary hover:underline">
                {copy.privacyLink}
              </LocalizedLink>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              {copy.encrypted}
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 hidden sm:block" />
            <div className="flex items-center">{copy.freeTrial}</div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 hidden sm:block" />
            <div className="flex items-center">{copy.noCard}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySignupFlow;
