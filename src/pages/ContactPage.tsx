import { Link } from 'react-router-dom';
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactForm from '../components/ContactForm';
import { COMPANY } from '../data/site';
import { SITE_URL } from '../data/site';
import {
  contactServiceOptions,
  contactTrustStats,
  portfolioProjects,
  zyvoOfferPromise,
} from '../data/contact-offer';
import { getBreadcrumbSchema } from '../data/structured-data';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Get a Free Quote — Websites, Custom Software & ZYVO ERP"
        description="Request a free project quote from ZYVO. Custom websites from $1,199, business systems from $7,900, maintenance from $79/mo, and ZYVO ERP from $39/mo. Fixed pricing, SEO included, reply within 24 hours."
        keywords="ZYVO contact, free website quote, custom software quote, business website development USA, ZYVO demo, project estimate"
        canonical="/contact"
        structuredData={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Contact', url: `${SITE_URL}/contact` },
        ])}
      />
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      {/* Hero */}
      <section className="relative py-12 lg:py-16 bg-brand-surface dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Free scoping call · Fixed quote in 24h · No contracts
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
              Let&apos;s build something your customers will love
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether you need a website that ranks on Google, a custom system for your workflow, ongoing maintenance,
              or ZYVO business software — tell us what you need and we will send a clear, fixed-price proposal.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
            {contactTrustStats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <p className="text-2xl font-bold text-brand-primary dark:text-brand-accent">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main form + sidebar */}
      <section className="py-12 lg:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 max-w-6xl mx-auto">
            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              <div className="p-6 rounded-2xl bg-brand-surface dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">The ZYVO Promise</h2>
                <ul className="space-y-4">
                  {zyvoOfferPromise.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Shield className="w-3.5 h-3.5 text-green-600 dark:text-green-400" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                  Talk to us directly
                </h2>
                <div className="space-y-4">
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary/10">
                      <Mail className="w-4 h-4 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{COMPANY.email}</p>
                      <p className="text-xs text-gray-500">Reply within 24 hours</p>
                    </div>
                  </a>
                  <a
                    href="tel:+19735249725"
                    className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{COMPANY.phone}</p>
                      <p className="text-xs text-gray-500">Mon–Fri, 9am–6pm ET</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {COMPANY.address.city}, {COMPANY.address.state}
                      </p>
                      <p className="text-xs text-gray-500">{COMPANY.address.street}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Prefer a demo?</p>
                      <Link to="/demo" className="text-xs text-brand-primary dark:text-brand-accent hover:underline">
                        Book a free ZYVO software demo →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gray-900 dark:bg-gray-800 text-white">
                <h2 className="text-sm font-semibold mb-3">Live work you can verify</h2>
                <ul className="space-y-2">
                  {portfolioProjects.slice(0, 3).map((p) => (
                    <li key={p.url}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm text-gray-300 hover:text-white transition-colors group"
                      >
                        <span>{p.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/development-services#portfolio"
                  className="inline-block mt-4 text-xs text-brand-accent hover:underline"
                >
                  View full portfolio →
                </Link>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="p-6 sm:p-8 lg:p-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/30 shadow-xl shadow-gray-200/50 dark:shadow-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Start your project</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Select a service, share a few details, and we will craft a fixed-price proposal — no hourly surprises.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service quick reference */}
      <section className="py-16 lg:py-20 bg-brand-surface dark:bg-gray-800/50" aria-labelledby="services-overview-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 id="services-overview-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Everything we offer — transparent pricing
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Inspired by the best agencies, priced for growing businesses. SEO included on every website.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {contactServiceOptions
              .filter((s) => s.id !== 'not-sure')
              .map((service) => (
                <div
                  key={service.id}
                  className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-brand-primary/30 transition-colors"
                >
                  <p className="font-bold text-gray-900 dark:text-white mb-1">{service.shortLabel}</p>
                  <p className="text-lg font-bold text-brand-primary dark:text-brand-accent mb-2">{service.priceHint.split('·')[0].trim()}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                  {service.href && (
                    <Link
                      to={service.href}
                      className="text-xs font-semibold text-brand-primary dark:text-brand-accent hover:underline"
                    >
                      Learn more →
                    </Link>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
