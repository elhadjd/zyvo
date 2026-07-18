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
}

export interface MarketBlogConfig {
  indexTitle: string;
  indexDescription: string;
  indexH1: string;
  indexSubtitle: string;
  readMoreLabel: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  locale: string;
}
