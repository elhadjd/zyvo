'use client';

import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Smartphone,
  Wifi,
  Building2,
  Receipt,
  Users,
  BarChart3,
} from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';

const featureIcons = [Smartphone, Wifi, Building2, Receipt, Users, BarChart3];

export default function MarketHero() {
  const { market } = useMarket();
  const { hero } = market;

  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brand-surface dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-sm font-medium text-brand-primary dark:text-brand-accent mb-4">
              {hero.eyebrow}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {hero.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {hero.subtitle}
            </p>

            <p className="text-base text-gray-500 dark:text-gray-400 mb-8">{hero.valueProposition}</p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <LocalizedLink
                href="/getting-started"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors text-base min-h-[48px]"
              >
                {hero.primaryCta}
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </LocalizedLink>
              <LocalizedLink
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 border-2 border-brand-primary text-brand-primary dark:border-brand-accent dark:text-brand-accent font-semibold rounded-lg hover:bg-brand-primary-light dark:hover:bg-gray-800 transition-colors text-base min-h-[48px]"
              >
                <Calendar className="mr-2 w-5 h-5" aria-hidden="true" />
                {hero.secondaryCta}
              </LocalizedLink>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
              {hero.trustBadges.map((badge) => (
                <li key={badge} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent" aria-hidden="true" />
                  {badge}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {hero.highlights.map((item) => (
                <div
                  key={item}
                  className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/hero-dashboard.png"
              alt={hero.imageAlt}
              className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full"
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>

        {hero.audiences.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
              {hero.audiencesLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {hero.audiences.map((audience) => (
                <span
                  key={audience}
                  className="px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
                >
                  {audience}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function MarketStats() {
  const { market } = useMarket();
  if (market.stats.length === 0) return null;

  return (
    <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {market.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-primary dark:text-brand-accent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MarketWhySection() {
  const { market } = useMarket();
  const { whyLocal } = market;
  if (whyLocal.points.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {whyLocal.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{whyLocal.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyLocal.points.map((point, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            return (
              <div
                key={point.title}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-brand-surface/50 dark:bg-gray-800/50 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
