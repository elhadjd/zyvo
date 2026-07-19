import type { MarketCode } from '@/lib/markets/types';
import { getMarket } from '@/lib/markets/registry';
import type { GnSeoPageMeta } from '@/data/markets/gn-seo';
import { getPartnershipHubContent, getPartnershipProgram } from '@/data/partnerships/content';
import { isPartnershipProgramSlug, PARTNERSHIP_PROGRAM_SLUGS } from '@/data/partnerships/programs';
import type { PartnershipProgramSlug } from '@/data/partnerships/types';

export function isPartnershipSlug(slug: string[]): boolean {
  return slug[0] === 'partnerships';
}

export function getPartnershipStaticSlugs(): { slug: string[] }[] {
  const slugs: { slug: string[] }[] = [{ slug: ['partnerships'] }];
  for (const program of PARTNERSHIP_PROGRAM_SLUGS) {
    slugs.push({ slug: ['partnerships', program] });
  }
  return slugs;
}

export function getPartnershipPageSeo(marketCode: MarketCode, slug: string[]): GnSeoPageMeta | null {
  const market = getMarket(marketCode);
  const prefix = market.routePrefix ?? '';
  const isFr = marketCode !== 'us';

  if (slug.length === 1) {
    const hub = getPartnershipHubContent(marketCode);
    const country = market.countryNameLocal;
    return {
      title: isFr
        ? `Programme Partenariat ZYVO ${country} — Revendeur, Parrainage & Affilié`
        : 'ZYVO Partnership Programs — Reseller, Referral, Implementation & Affiliate',
      description: isFr
        ? `Devenez partenaire ZYVO en ${country} : revendeur ERP, parrainage PME, intégrateur certifié ou affilié. Commissions récurrentes, formation et support dédié.`
        : 'Join ZYVO partner programs: reseller, referral, implementation, and affiliate tracks. Recurring commissions, sales enablement, and dedicated partner support.',
      keywords: isFr
        ? `partenariat ZYVO ${country}, revendeur ERP ${country}, programme parrainage logiciel, intégrateur ERP Afrique, affilié SaaS`
        : 'ZYVO partner program, ERP reseller USA, referral partner software, implementation partner, affiliate program SaaS',
      path: `${prefix}/partnerships`,
      h1: hub.headline,
      breadcrumb: isFr ? 'Partenariats' : 'Partnerships',
      schemaType: 'service',
    };
  }

  if (slug.length === 2 && isPartnershipProgramSlug(slug[1])) {
    const program = getPartnershipProgram(marketCode, slug[1] as PartnershipProgramSlug);
    return {
      title: isFr
        ? `${program.title} — Programme Partenaire ZYVO ${market.countryNameLocal}`
        : `${program.title} | ZYVO Partner Program`,
      description: program.description.slice(0, 160),
      keywords: isFr
        ? `${program.shortTitle} ZYVO, partenaire ${program.slug} ${market.countryNameLocal}, commission ERP`
        : `ZYVO ${program.slug} partner, ${program.shortTitle} program, ERP partner USA`,
      path: `${prefix}/partnerships/${program.slug}`,
      h1: program.title,
      breadcrumb: program.shortTitle,
      schemaType: 'service',
    };
  }

  return null;
}

export function getUsPartnershipMetadata(slug?: string) {
  const seo = getPartnershipPageSeo('us', slug ? ['partnerships', slug] : ['partnerships']);
  return seo;
}
