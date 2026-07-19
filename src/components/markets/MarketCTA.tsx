'use client';

import { ArrowRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';

export default function MarketCTA() {
  const { market } = useMarket();
  const { contact } = market;

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-primary to-brand-primary-hover text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Prêt à digitaliser votre entreprise en {market.countryNameLocal} ?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Rejoignez les PME qui modernisent leur gestion avec ZYVO. Essai gratuit de 7 jours,
              accompagnement en français et tarifs en {market.currency}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LocalizedLink
                href="/getting-started"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Commencer l&apos;essai gratuit
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </LocalizedLink>
              <LocalizedLink
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Parler à un conseiller
              </LocalizedLink>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="font-semibold text-lg mb-4">Contact {market.countryNameLocal}</h3>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {contact.phone}
            </a>
            {contact.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                WhatsApp
              </a>
            )}
            <div className="flex items-start gap-3 text-white/90">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {contact.address.street}
                {contact.address.district ? `, ${contact.address.district}` : ''}
                <br />
                {contact.address.city}, {contact.address.country}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
