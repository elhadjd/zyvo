'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { submitContact } from '@/lib/api-client';

const businessTypes = [
  'Retail store',
  'Boutique',
  'Restaurant',
  'Salon',
  'Barbershop',
  'Clinic',
  'Pharmacy',
  'Service business',
  'Other',
];

const companySizes = ['1–5 employees', '6–15 employees', '16–50 employees', '51+ employees'];

export default function DemoPage() {
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    companySize: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    submitContact({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: `[Demo Request] Company: ${form.company} | Type: ${form.businessType} | Size: ${form.companySize}\n\n${form.message}`,
    })
      .then((res) => {
        if (res?.success) setSubmitted(true);
      })
      .catch(console.error)
      .finally(() => setProcessing(false));
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Book a Demo' }]} />

      <section className="py-12 lg:py-20 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Book a Free Demo
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                See how ZYVO can help your business run smoother. Tell us about your needs and we&apos;ll walk you through
                the platform.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                <li>• Personalized walkthrough for your industry</li>
                <li>• No obligation—just clarity</li>
                <li>• US-based team, real answers</li>
              </ul>

              <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400">
                <strong className="text-gray-700 dark:text-gray-300">Calendar integration</strong> — Online scheduling
                calendar coming soon. For now, submit the form and we&apos;ll confirm your demo time by email.
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              {submitted ? (
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request received!</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    We&apos;ll contact you within one business day to schedule your demo.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="demo-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                    <input id="demo-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[48px]" />
                  </div>
                  <div>
                    <label htmlFor="demo-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work email *</label>
                    <input id="demo-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[48px]" />
                  </div>
                  <div>
                    <label htmlFor="demo-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                    <input id="demo-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[48px]" />
                  </div>
                  <div>
                    <label htmlFor="demo-company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company name *</label>
                    <input id="demo-company" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[48px]" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="demo-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business type *</label>
                      <select id="demo-type" required value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[48px]">
                        <option value="">Select...</option>
                        {businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="demo-size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company size *</label>
                      <select id="demo-size" required value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-h-[48px]">
                        <option value="">Select...</option>
                        {companySizes.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="demo-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What would you like to see?</label>
                    <textarea id="demo-message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="e.g. POS, inventory, salon queue..." />
                  </div>
                  <button type="submit" disabled={processing} className="w-full flex items-center justify-center px-6 py-3.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors disabled:opacity-50 min-h-[48px]">
                    {processing ? 'Sending...' : 'Request Demo'}
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
