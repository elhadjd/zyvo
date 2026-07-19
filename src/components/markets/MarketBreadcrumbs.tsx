'use client';

import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import { stripMarketPrefix } from '@/lib/markets/routing';
import { getMarketPageSeo } from '@/lib/markets/seo';
import LocalizedLink from '@/components/markets/LocalizedLink';

export function useMarketPageSeo() {
  const pathname = usePathname();
  const { marketCode } = useMarket();
  const { path } = stripMarketPrefix(pathname);
  const slug = path === '/' ? [] : path.split('/').filter(Boolean);
  return getMarketPageSeo(marketCode, slug);
}

interface MarketBreadcrumbsProps {
  lastLabel?: string;
}

export default function MarketBreadcrumbs({ lastLabel }: MarketBreadcrumbsProps = {}) {
  const pathname = usePathname();
  const { marketCode, isDefaultMarket } = useMarket();

  if (isDefaultMarket) return null;

  const { path } = stripMarketPrefix(pathname);
  const slug = path === '/' ? [] : path.split('/').filter(Boolean);
  if (slug.length === 0) return null;

  const pageSeo = getMarketPageSeo(marketCode, slug);
  const NavLink = LocalizedLink;

  const segments: { label: string; href: string }[] = [];

  if (slug[0] === 'solutions') {
    segments.push({ label: 'Solutions', href: '/solutions' });
    if (slug.length > 1) {
      segments.push({ label: pageSeo?.breadcrumb ?? slug[1], href: `/solutions/${slug[1]}` });
    }
  } else if (slug[0] === 'industries') {
    segments.push({ label: 'Secteurs', href: '/industries' });
    if (slug.length > 1) {
      segments.push({ label: pageSeo?.breadcrumb ?? slug[1], href: `/industries/${slug[1]}` });
    }
  } else if (slug[0] === 'blog') {
    segments.push({ label: 'Blog', href: '/blog' });
    if (slug.length > 1) {
      segments.push({ label: lastLabel ?? pageSeo?.h1 ?? slug[1], href: `/blog/${slug[1]}` });
    }
  } else if (pageSeo?.breadcrumb) {
    segments.push({ label: pageSeo.breadcrumb, href: path });
  }

  if (segments.length === 0) return null;

  return (
    <nav
      aria-label="Fil d'Ariane"
      className="container mx-auto px-4 lg:px-8 pt-24 pb-2"
    >
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <li>
          <NavLink href="/" className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors">
            Accueil
          </NavLink>
        </li>
        {segments.map((seg, i) => (
          <li key={seg.href} className="flex items-center gap-1">
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            {i === segments.length - 1 ? (
              <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
                {seg.label}
              </span>
            ) : (
              <NavLink href={seg.href} className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors">
                {seg.label}
              </NavLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
