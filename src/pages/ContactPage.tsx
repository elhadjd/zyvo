import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { apiKey, Requests } from '../api';
import { COMPANY } from '../data/site';
import { getBreadcrumbSchema } from '../data/structured-data';
import { SITE_URL } from '../data/site';

export default function ContactPage() {
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const { routePost } = Requests();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);
    routePost('site/contacts/submit', { ...formData, key: apiKey })
      .then((response) => {
        if (response.data?.success) {
          setSubmitted(true);
          setFormData({ name: '', email: '', phone: '', message: '' });
        }
      })
      .catch(console.error)
      .finally(() => setProcessing(false));
  };

  return (
    <>
      <SEO
        title="Contact ZYVO — Sales & Support for US Businesses"
        description="Contact ZYVO for sales inquiries, demos, and support. Call +1 (973) 524-9725 or email commercial@zyvoerp.com. Columbus, OH headquarters."
        keywords="contact ZYVO, ZYVO support, business software demo, ZYVO sales USA"
        canonical="/contact"
        structuredData={getBreadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Contact', url: `${SITE_URL}/contact` },
        ])}
      />
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get in touch with our team
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Whether you need a demo, have questions about pricing, or want technical support — we are here to help US businesses succeed.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h2>
                  <a href={`mailto:${COMPANY.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {COMPANY.email}
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Response within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h2>
                  <a href="tel:+19735249725" className="text-blue-600 dark:text-blue-400 hover:underline">
                    {COMPANY.phone}
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mon–Fri, 9am–6pm ET</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Headquarters</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {COMPANY.address.street}<br />
                    {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank you!</h2>
                  <p className="text-gray-600 dark:text-gray-300">We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {processing ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="ml-2 w-4 h-4" />
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
