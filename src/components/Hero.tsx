'use client';

import Link from 'next/link'
import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';
import { AUDIENCES, TRUST_MESSAGE, VALUE_PROPOSITION } from '../data/site';

export default function Hero() {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-brand-surface dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-sm font-medium text-brand-primary dark:text-brand-accent mb-4">
              {TRUST_MESSAGE}
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Run Your Entire Business From One Platform
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Inventory, POS, employees, appointments, customers, accounting, and analytics—all in one
              easy-to-use system.
            </p>

            <p className="text-base text-gray-500 dark:text-gray-400 mb-8">{VALUE_PROPOSITION}</p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <Link
                href="/getting-started"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors text-base min-h-[48px]"
              >
                Start 7-Day Free Trial
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 border-2 border-brand-primary text-brand-primary dark:border-brand-accent dark:text-brand-accent font-semibold rounded-lg hover:bg-brand-primary-light dark:hover:bg-gray-800 transition-colors text-base min-h-[48px]"
              >
                <Calendar className="mr-2 w-5 h-5" aria-hidden="true" />
                Book a Free Demo
              </Link>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" aria-hidden="true" />
                Free trial
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" aria-hidden="true" />
                No credit card required
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-accent" aria-hidden="true" />
                Cancel anytime
              </li>
            </ul>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Cloud-based', 'Mobile ready', 'Multi-location', 'US support'].map((item) => (
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
              alt="ZYVO business management dashboard showing sales, inventory, and team overview"
              className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full"
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">Built for</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {AUDIENCES.map((audience) => (
              <span
                key={audience}
                className="px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700"
              >
                {audience}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
