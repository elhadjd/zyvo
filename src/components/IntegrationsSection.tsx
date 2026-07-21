'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import ProductScreenshot from './modules/ProductScreenshot';
import { INTEGRATIONS_HERO_ALT, INTEGRATIONS_HERO_IMAGE } from '../data/module-images';
import { metaIntegrations, deliveryIntegrations } from '../data/integrations';

export default function IntegrationsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary-light dark:bg-brand-primary/20 border border-brand-primary/20 dark:border-brand-primary/30 mb-6">
              <span className="text-sm font-semibold text-brand-primary dark:text-brand-accent">INTEGRATIONS</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Connect with the platforms your customers already use
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              ZYVO offers full integration with Meta — Facebook, Instagram, and WhatsApp Business — plus delivery
              platform connections with Uber Eats, DoorDash, and Grubhub currently in development.
            </p>
            <Link
              href="/integrations"
              className="inline-flex items-center text-brand-primary dark:text-brand-accent font-semibold hover:underline"
            >
              View all integrations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          <div className="relative">
            <ProductScreenshot
              src={INTEGRATIONS_HERO_IMAGE}
              alt={INTEGRATIONS_HERO_ALT}
              variant="hero"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Meta — Available Now</h3>
            </div>
            <div className="space-y-4">
              {metaIntegrations.map((integration) => (
                <div key={integration.slug} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <img src={integration.logo} alt={integration.name} className="w-10 h-10 rounded-lg flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{integration.name}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{integration.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Delivery — In Progress</h3>
            </div>
            <div className="space-y-4">
              {deliveryIntegrations.map((integration) => (
                <div key={integration.slug} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <img src={integration.logo} alt={integration.name} className="w-10 h-10 rounded-lg flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{integration.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                        Coming soon
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{integration.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
