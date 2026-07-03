import { faqs } from '../data/faqs';

interface FAQSectionProps {
  items?: typeof faqs;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function FAQSection({
  items = faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Straight answers to common questions about ZYVO.',
  className = 'py-16 lg:py-24 bg-white dark:bg-gray-900',
}: FAQSectionProps) {
  return (
    <section className={className} aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-10">
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && <p className="text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>

        <div className="space-y-3">
          {items.map((faq) => (
            <details
              key={faq.question}
              className="group bg-brand-surface dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer font-medium text-gray-900 dark:text-white text-left list-none">
                <span className="pr-4">{faq.question}</span>
                <span className="text-brand-primary dark:text-brand-accent text-xl flex-shrink-0 group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
