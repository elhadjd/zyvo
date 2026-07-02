import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { integrations } from '../data/integrations';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function IntegrationsPage() {
  const available = integrations.filter((i) => i.status === 'available');
  const inProgress = integrations.filter((i) => i.status === 'in-progress');

  return (
    <>
      <SEO
        title="Integrations — Meta, WhatsApp, Instagram & Delivery Platforms"
        description="ZYVO integrates with Facebook, Instagram, WhatsApp Business, Uber Eats, DoorDash, and Grubhub. Connect your business channels in one platform."
        keywords="ZYVO integrations, Meta business integration, WhatsApp Business API, Instagram shop, Uber Eats integration, DoorDash POS"
        canonical="/integrations"
        structuredData={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Integrations', url: `${SITE_URL}/integrations` },
        ])}
      />
      <Breadcrumbs items={[{ label: 'Integrations' }]} />
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Integrations that connect your entire business
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Manage conversations, orders, and customer engagement across Meta platforms and leading US delivery
                services — all from one ZYVO dashboard.
              </p>
            </div>
            <img
              src="/images/integrations-hub.png"
              alt="ZYVO platform integrations hub"
              className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            />
          </div>

          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available integrations</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {available.map((integration) => (
                <div
                  key={integration.slug}
                  className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <img src={integration.logo} alt={integration.name} className="w-12 h-12 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{integration.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{integration.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Clock className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">In development</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {inProgress.map((integration) => (
                <div
                  key={integration.slug}
                  className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-amber-300 dark:border-amber-700"
                >
                  <img src={integration.logo} alt={integration.name} className="w-12 h-12 mb-4 opacity-80" />
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                      In progress
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{integration.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/getting-started"
              className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
