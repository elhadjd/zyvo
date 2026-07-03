import { productModules } from '../data/product-showcase';

export default function ProductShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900" aria-labelledby="product-showcase-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 id="product-showcase-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            See ZYVO in Action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to run your business—organized into simple, powerful modules.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productModules.map((module) => {
            const Icon = module.icon;
            return (
              <article
                key={module.id}
                className="group flex flex-col bg-brand-surface dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-brand-primary/40 dark:hover:border-brand-accent/40 transition-colors"
              >
                <div className="aspect-video bg-gradient-to-br from-brand-primary-light to-white dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
                  {module.image ? (
                    <img
                      src={module.image}
                      alt={module.imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-14 h-14 rounded-xl bg-brand-primary/10 dark:bg-brand-accent/10 flex items-center justify-center mb-3">
                        <Icon className="w-7 h-7 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                        Screenshot placeholder
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-brand-primary dark:text-brand-accent flex-shrink-0" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{module.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{module.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
