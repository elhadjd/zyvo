'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Handshake, ArrowRight } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';

export default function PartnershipSiteBar() {
  const { isDefaultMarket, marketCode } = useMarket();
  const pathname = usePathname();

  if (pathname.startsWith('/admin') || pathname.includes('/partnerships')) {
    return null;
  }

  const NavLink = isDefaultMarket ? Link : LocalizedLink;
  const label = isDefaultMarket
    ? 'Become a ZYVO partner — reseller, referral & affiliate programs'
    : marketCode === 'gn'
      ? 'Devenez partenaire ZYVO en Guinée — revendeur, parrainage & affilié'
      : marketCode === 'sn'
        ? 'Programme partenaire ZYVO au Sénégal'
        : 'Programme partenaire ZYVO en Côte d\'Ivoire';
  const cta = isDefaultMarket ? 'View programs' : 'Voir les programmes';

  return (
    <div className="bg-brand-primary/5 dark:bg-brand-primary/10 border-t border-brand-primary/10">
      <div className="container mx-auto px-4 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <Handshake className="w-4 h-4 text-brand-primary dark:text-brand-accent shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </div>
        <NavLink
          href="/partnerships"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary dark:text-brand-accent hover:underline shrink-0"
        >
          {cta}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </NavLink>
      </div>
    </div>
  );
}
