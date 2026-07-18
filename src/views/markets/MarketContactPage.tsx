'use client';

import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import ContactForm from '@/components/ContactForm';

export default function MarketContactPage() {
  const { market } = useMarket();
  const { contact } = market;

  return (
    <>
      <section className="pt-28 pb-12 lg:pt-36 bg-brand-surface dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Contactez-nous
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Demandez une démo, un devis ou posez vos questions. Notre équipe répond en français
                sous 24h ouvrées.
              </p>

              <div className="space-y-5">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
                >
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {contact.phone}
                </a>
                {contact.whatsapp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    WhatsApp Business
                  </a>
                )}
                <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    {contact.address.street}, {contact.address.city}
                    <br />
                    {market.countryNameLocal}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                  Lun–Ven, 8h–18h (GMT)
                </div>
              </div>
            </div>

            <ContactForm variant="compact" />
          </div>
        </div>
      </section>
    </>
  );
}
