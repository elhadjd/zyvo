import { developmentServices, portfolioProjects } from './development-services';

export type ContactServiceId =
  | 'zyvo-software'
  | 'custom-website-development'
  | 'custom-software-development'
  | 'website-maintenance-services'
  | 'not-sure';

export interface ContactServiceOption {
  id: ContactServiceId;
  label: string;
  shortLabel: string;
  description: string;
  priceHint: string;
  deliveryHint: string;
  icon: 'layers' | 'globe' | 'code' | 'wrench' | 'sparkles';
  href?: string;
}

export const contactServiceOptions: ContactServiceOption[] = [
  {
    id: 'zyvo-software',
    label: 'ZYVO Business Software',
    shortLabel: 'ZYVO ERP',
    description: 'All-in-one cloud platform: POS, inventory, appointments, employees, and more.',
    priceHint: 'From $39/mo · 7-day free trial',
    deliveryHint: 'Start in minutes',
    icon: 'layers',
    href: '/pricing',
  },
  {
    id: 'custom-website-development',
    label: 'Custom Website',
    shortLabel: 'Website',
    description: 'SEO-ready, mobile-first sites that help local customers find you on Google.',
    priceHint: 'From $1,199 · SEO included',
    deliveryHint: '2–4 weeks delivery',
    icon: 'globe',
    href: '/custom-website-development',
  },
  {
    id: 'custom-software-development',
    label: 'Custom Business System',
    shortLabel: 'Custom System',
    description: 'Web apps, admin panels, booking platforms, and industry-specific tools.',
    priceHint: 'From $7,900 · fixed scope',
    deliveryHint: '6–12 weeks delivery',
    icon: 'code',
    href: '/custom-software-development',
  },
  {
    id: 'website-maintenance-services',
    label: 'Maintenance & Support',
    shortLabel: 'Maintenance',
    description: 'Security updates, backups, monitoring, and content changes — hands off.',
    priceHint: 'From $79/mo · no contract',
    deliveryHint: 'Ongoing monthly',
    icon: 'wrench',
    href: '/website-maintenance-services',
  },
  {
    id: 'not-sure',
    label: 'Not sure yet',
    shortLabel: 'Guide me',
    description: 'Tell us your goals — we will recommend the right path in your free scoping call.',
    priceHint: 'Free consultation',
    deliveryHint: 'We respond in 24h',
    icon: 'sparkles',
  },
];

export const budgetRanges = [
  'Under $2,000',
  '$2,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000+',
  'Not sure yet',
];

export const timelineOptions = [
  'ASAP (under 2 weeks)',
  '2–4 weeks',
  '1–2 months',
  '2–3 months',
  'Flexible / exploring',
];

export const businessTypes = [
  'Retail store',
  'Restaurant / Café',
  'Salon / Barbershop',
  'Clinic / Healthcare',
  'School / Education',
  'Professional services',
  'E-commerce',
  'Other',
];

export const zyvoOfferPromise = [
  {
    title: 'Free scoping call',
    description: '15-minute conversation to understand your goals — no sales pressure, no obligation.',
  },
  {
    title: 'Fixed-price quote in 24h',
    description: 'Clear scope and pricing after our call. No hourly billing surprises.',
  },
  {
    title: 'SEO built in',
    description: 'Every website includes technical SEO, schema markup, and performance optimization.',
  },
  {
    title: 'Real portfolio, live today',
    description: 'Verify our work yourself — BB Salon Suites, SIGESC, and more are online now.',
  },
  {
    title: 'You own everything',
    description: 'Full code and domain ownership on delivery. No platform lock-in.',
  },
  {
    title: 'Post-launch support',
    description: '30–60 days of included support so you launch with confidence.',
  },
];

export const contactTrustStats = [
  { value: '24h', label: 'Quote turnaround' },
  { value: '15–25%', label: 'Below agency rates' },
  { value: '4+', label: 'Live client projects' },
  { value: '0', label: 'Long-term contracts' },
];

export function getContactServiceById(id: string): ContactServiceOption | undefined {
  return contactServiceOptions.find((s) => s.id === id);
}

export function isDevelopmentService(id: ContactServiceId): boolean {
  return developmentServices.some((s) => s.slug === id);
}

export { portfolioProjects };
