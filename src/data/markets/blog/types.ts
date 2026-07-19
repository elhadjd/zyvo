export interface MarketBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: string[];
  faq?: { question: string; answer: string }[];
  internalLinks?: { title: string; url: string; anchorText?: string }[];
  updatedAt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageCredit?: string;
}

export interface MarketBlogConfig {
  indexTitle: string;
  indexDescription: string;
  indexH1: string;
  indexSubtitle: string;
  indexKeywords?: string;
  readMoreLabel: string;
  relatedLabel: string;
  shareLabel: string;
  faqTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  locale: string;
}
