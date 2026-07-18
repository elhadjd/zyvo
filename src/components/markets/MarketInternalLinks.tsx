import LocalizedLink from '@/components/markets/LocalizedLink';
import { getGnPageSeo } from '@/data/markets/gn-seo';

const LINK_GROUPS = [
  {
    title: 'Solutions populaires',
    paths: [
      'solutions/point-of-sale',
      'solutions/inventory-management',
      'solutions/invoicing',
      'solutions/financial-management',
    ],
  },
  {
    title: 'Secteurs en Guinée',
    paths: [
      'industries/retail',
      'industries/restaurants',
      'industries/salons',
      'industries/pharmacies',
    ],
  },
  {
    title: 'Blog & ressources',
    paths: [
      'blog',
      'blog/choisir-logiciel-gestion-entreprise-guinee',
      'blog/orange-money-caisse-pos-conakry',
      'blog/syscohada-tva-dgi-digitaliser-comptabilite-guinee',
    ],
  },
  {
    title: 'Découvrir ZYVO',
    paths: ['features', 'pricing', 'faq', 'demo', 'contact'],
  },
] as const;

function getLinkLabel(path: string): string {
  const slug = path.split('/');
  const seo = getGnPageSeo(slug);
  return seo.breadcrumb ?? seo.h1 ?? seo.title.split('—')[0].trim();
}

export default function MarketInternalLinks() {
  return (
    <section
      className="py-12 bg-brand-surface/50 dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-800"
      aria-label="Liens utiles"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.paths.map((path) => (
                  <li key={path}>
                    <LocalizedLink
                      href={`/${path}`}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
                    >
                      {getLinkLabel(path)}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
