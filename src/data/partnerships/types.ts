export type PartnershipProgramSlug = 'reseller' | 'referral' | 'implementation' | 'affiliate';

export interface PartnershipBenefit {
  title: string;
  description: string;
}

export interface PartnershipProgram {
  slug: PartnershipProgramSlug;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  audience: string;
  benefits: PartnershipBenefit[];
  requirements: string[];
  faq: { question: string; answer: string }[];
  cta: string;
}

export interface PartnershipHubContent {
  title: string;
  headline: string;
  subtitle: string;
  intro: string;
  whyPartnerTitle: string;
  whyPartnerPoints: PartnershipBenefit[];
  howItWorksTitle: string;
  howItWorksSteps: { step: string; title: string; description: string }[];
  programsTitle: string;
  programsSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  contactButton: string;
}
