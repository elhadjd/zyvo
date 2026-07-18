export type MarketCode = 'us' | 'gn' | 'sn' | 'ao';

export interface MarketContact {
  email: string;
  supportEmail: string;
  phone: string;
  whatsapp?: string;
  address: {
    street: string;
    city: string;
    district?: string;
    state?: string;
    zip?: string;
    country: string;
  };
}

export interface MarketPricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  currency: string;
  currencySymbol: string;
  users: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface MarketHeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  valueProposition: string;
  primaryCta: string;
  secondaryCta: string;
  trustBadges: string[];
  highlights: string[];
  audiencesLabel: string;
  audiences: string[];
  imageAlt: string;
}

export interface MarketStat {
  value: string;
  label: string;
}

export interface MarketPaymentMethod {
  name: string;
  description: string;
}

export interface MarketIndustry {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: 'store' | 'utensils' | 'scissors' | 'pill' | 'truck' | 'building';
}

export interface MarketFeature {
  title: string;
  description: string;
}

export interface MarketFaq {
  question: string;
  answer: string;
}

export interface MarketNavItem {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}

export interface MarketPageMeta {
  title: string;
  description: string;
  keywords?: string;
  path: string;
}

export interface MarketConfig {
  code: MarketCode;
  countryName: string;
  countryNameLocal: string;
  flag: string;
  locale: string;
  hreflang: string;
  language: string;
  languageLabel: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
  routePrefix: string | null;
  active: boolean;
  comingSoon?: boolean;
  contact: MarketContact;
  tagline: string;
  description: string;
  trustMessage: string;
  valueProposition: string;
  signup: {
    language: string;
    country: { id: number; name: string; code: string };
    currency: { code: string; currency: string; digits: number; number: number };
  };
  hero: MarketHeroContent;
  stats: MarketStat[];
  whyLocal: {
    title: string;
    subtitle: string;
    points: { title: string; description: string }[];
  };
  mobileMoney: {
    title: string;
    subtitle: string;
    methods: MarketPaymentMethod[];
    note: string;
  };
  industries: MarketIndustry[];
  features: MarketFeature[];
  pricing: {
    title: string;
    subtitle: string;
    annualLabel: string;
    monthlyLabel: string;
    savingsNote: string;
    plans: MarketPricingPlan[];
    footnote: string;
  };
  faqs: MarketFaq[];
  pages: Record<string, MarketPageMeta>;
  navigation: MarketNavItem[];
  footerTagline: string;
}
