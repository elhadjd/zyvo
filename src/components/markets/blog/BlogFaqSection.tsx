interface BlogFaqSectionProps {
  faq: { question: string; answer: string }[];
  title: string;
}

export default function BlogFaqSection({ faq, title }: BlogFaqSectionProps) {
  if (!faq.length) return null;

  return (
    <section className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-800" aria-labelledby="blog-faq-title">
      <h2 id="blog-faq-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="space-y-3">
        {faq.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 open:bg-white dark:open:bg-gray-900 transition-colors"
          >
            <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-gray-900 dark:text-white flex items-center justify-between gap-4">
              {item.question}
              <span className="text-brand-primary text-lg group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
