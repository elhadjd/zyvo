import { ExternalLink, Sparkles } from 'lucide-react';
import { portfolioProjects } from '../data/development-services';

interface PortfolioShowcaseProps {
  compact?: boolean;
  heading?: string;
  subheading?: string;
}

export default function PortfolioShowcase({
  compact = false,
  heading = 'Real projects. Real businesses. Live today.',
  subheading = 'We do not hide behind mockups — explore the websites and systems we have built for clients.',
}: PortfolioShowcaseProps) {
  return (
    <div id="portfolio">
      <div className={`text-center max-w-3xl mx-auto ${compact ? 'mb-8' : 'mb-12'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary-light dark:bg-brand-primary/20 border border-brand-primary/20 mb-4">
          <Sparkles className="w-4 h-4 text-brand-primary dark:text-brand-accent" aria-hidden="true" />
          <span className="text-sm font-medium text-brand-primary dark:text-brand-accent">Portfolio & Social Proof</span>
        </div>
        <h2 className={`font-bold text-gray-900 dark:text-white mb-4 ${compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'}`}>
          {heading}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">{subheading}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {portfolioProjects.map((project) => (
          <article
            key={project.url}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-brand-primary/40 dark:hover:border-brand-accent/40 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary dark:text-brand-accent mb-1">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                </div>
                {project.highlight && (
                  <span className="shrink-0 px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    {project.highlight}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-md bg-brand-surface dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-brand-primary dark:text-brand-accent hover:underline"
                aria-label={`Visit ${project.name} live site`}
              >
                Visit live site
                <ExternalLink className="w-4 h-4 ml-1.5" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
