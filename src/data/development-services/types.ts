export type DevelopmentServiceSlug =
  | 'custom-website-development'
  | 'custom-software-development'
  | 'website-maintenance-services';

export interface PortfolioProject {
  name: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
  highlight?: string;
}

export interface DevelopmentService {
  slug: DevelopmentServiceSlug;
  path: string;
  shortTitle: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  headline: string;
  subheadline: string;
  icon: 'globe' | 'code' | 'wrench';
  priceFrom: number;
  priceLabel: string;
  marketCompare: string;
  deliveryTime: string;
  features: { title: string; description: string }[];
  includes: string[];
  faqs: { question: string; answer: string }[];
}

export interface DevelopmentHubContent {
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  headline: string;
  subheadline: string;
  badge: string;
  servicesHeading: string;
  pricingHeading: string;
  pricingSubtitle: string;
  seoHeading: string;
  seoBody: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  faqTitle: string;
  quoteButton: string;
  learnMoreLabel: string;
  contactButton: string;
}

export interface ServicePricingTier {
  name: string;
  service: DevelopmentServiceSlug;
  price: number;
  priceNote: string;
  description: string;
  features: string[];
  popular: boolean;
}

export interface DevelopmentFaq {
  question: string;
  answer: string;
}
