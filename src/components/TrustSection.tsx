import { Cloud, Headphones, MapPin, Smartphone, Sparkles, Zap } from 'lucide-react';
import { trustCards } from '../data/product-showcase';

const icons = [Sparkles, Zap, Cloud, MapPin, Smartphone, Headphones];

export default function TrustSection() {
  return (
    <section className="py-16 lg:py-24 bg-brand-surface dark:bg-gray-800/50" aria-labelledby="trust-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="trust-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Businesses Choose ZYVO
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Honest tools for owners who want clarity—not complexity.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {trustCards.map((card, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={card.title}
                className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* Ready for real testimonials — uncomment and populate when available
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map(...)}
        </div>
        */}
      </div>
    </section>
  );
}
