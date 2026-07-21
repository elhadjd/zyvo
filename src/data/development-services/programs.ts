import type { DevelopmentServiceSlug } from './types';

export const DEVELOPMENT_SERVICE_SLUGS: DevelopmentServiceSlug[] = [
  'custom-website-development',
  'custom-software-development',
  'website-maintenance-services',
];

export function isDevelopmentServiceSlug(slug: string): slug is DevelopmentServiceSlug {
  return DEVELOPMENT_SERVICE_SLUGS.includes(slug as DevelopmentServiceSlug);
}
