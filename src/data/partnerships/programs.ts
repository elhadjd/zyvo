import type { PartnershipProgramSlug } from './types';

export const PARTNERSHIP_PROGRAM_SLUGS: PartnershipProgramSlug[] = [
  'reseller',
  'referral',
  'implementation',
  'affiliate',
];

export function isPartnershipProgramSlug(slug: string): slug is PartnershipProgramSlug {
  return PARTNERSHIP_PROGRAM_SLUGS.includes(slug as PartnershipProgramSlug);
}
