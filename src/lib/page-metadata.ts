import { buildMetadata } from './seo';
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME } from '@/data/site';

export const staticPageMetadata = {
  home: buildMetadata({
    title: `${SITE_NAME} — Run Your Entire Business From One Platform`,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    canonical: '/',
  }),
  features: buildMetadata({
    title: 'Features — All-in-One Business Management Platform',
    description:
      'Explore ZYVO features: POS, inventory, employee management, scheduling, customer queue SMS, financial tools, and analytics for US businesses.',
    keywords: 'ZYVO features, business management features, POS inventory scheduling',
    canonical: '/features',
  }),
  pricing: buildMetadata({
    title: 'Pricing — Transparent Plans for Every Business',
    description:
      'ZYVO pricing starts at $39/month with a 7-day free trial. Compare Starter, Growth, and Business plans for US small businesses.',
    keywords: 'ZYVO pricing, business software cost, POS pricing USA',
    canonical: '/pricing',
  }),
  about: buildMetadata({
    title: 'About ZYVO — Helping US Businesses Grow',
    description:
      'Learn about ZYVO Technologies, Inc. — cloud business management software built for growing US small and medium businesses.',
    keywords: 'about ZYVO, ZYVO company, business software USA',
    canonical: '/about',
  }),
  contact: buildMetadata({
    title: 'Get a Free Quote — Websites, Custom Software & ZYVO ERP',
    description:
      'Request a free project quote from ZYVO. Custom websites from $1,199, business systems from $7,900, maintenance from $79/mo, and ZYVO ERP from $39/mo.',
    keywords: 'ZYVO contact, free website quote, custom software quote',
    canonical: '/contact',
  }),
  security: buildMetadata({
    title: 'Security — How ZYVO Protects Your Business Data',
    description:
      'Learn about ZYVO security practices: encryption, role-based access, backups, and practical data protection for US businesses.',
    keywords: 'ZYVO security, business software security, data protection',
    canonical: '/security',
  }),
  demo: buildMetadata({
    title: 'Book a Free Demo — See ZYVO in Action',
    description:
      'Schedule a free demo of ZYVO business management software. See how POS, inventory, appointments, and more work for your business.',
    keywords: 'ZYVO demo, business software demo, book demo POS inventory',
    canonical: '/demo',
  }),
  faq: buildMetadata({
    title: 'FAQ — Frequently Asked Questions About ZYVO',
    description:
      'Answers to common questions about ZYVO pricing, features, trials, support, and business management software for US companies.',
    keywords: 'ZYVO FAQ, business software questions, ZYVO support',
    canonical: '/faq',
  }),
  solutions: buildMetadata({
    title: 'Business Solutions — POS, Inventory, HR, Finance & More',
    description:
      'Explore 10+ integrated business solutions: POS, inventory management, HR, logistics, e-commerce, invoicing, and financial management for US companies.',
    keywords: 'business solutions software, integrated business platform',
    canonical: '/solutions',
  }),
  industries: buildMetadata({
    title: 'Industries — Business Software for Every Sector',
    description:
      'ZYVO serves retail, manufacturing, beauty salons, professional services, and e-commerce businesses across the United States.',
    keywords: 'industry business software, retail salon restaurant software',
    canonical: '/industries',
  }),
  developmentServices: buildMetadata({
    title: 'Web Design, Custom Software & Maintenance Services for US Businesses',
    description:
      'ZYVO builds custom websites, business software, and admin systems for US small businesses — with SEO optimization and competitive pricing.',
    keywords: 'web development services USA, custom website development, custom software development',
    canonical: '/development-services',
  }),
  blog: buildMetadata({
    title: 'Blog — Business Management Tips & Guides',
    description:
      'Expert guides on business management software, inventory, ERP selection, and growing your US small business with ZYVO.',
    keywords: 'business management blog, ERP guide, small business tips',
    canonical: '/blog',
  }),
  integrations: buildMetadata({
    title: 'Integrations — Facebook, Instagram, WhatsApp & Delivery',
    description:
      'Connect ZYVO with Meta platforms and delivery services. Manage social messaging and food delivery integrations from one platform.',
    keywords: 'ZYVO integrations, WhatsApp business, restaurant delivery integration',
    canonical: '/integrations',
  }),
  gettingStarted: buildMetadata({
    title: 'Start Your Free 7-Day Trial',
    description:
      'Get started with ZYVO in minutes. 7-day free trial, no credit card required. Full access to POS, inventory, and business tools.',
    keywords: 'ZYVO free trial, start business software, sign up ZYVO',
    canonical: '/getting-started',
  }),
  helpCenter: buildMetadata({
    title: 'Help Center — Support & Documentation',
    description:
      'Get help with ZYVO. FAQs, documentation, support contact, and guides for US businesses using our business management platform.',
    keywords: 'ZYVO help, support documentation, business software help',
    canonical: '/help-center',
  }),
  privacy: buildMetadata({
    title: 'Privacy Policy',
    description: 'ZYVO Technologies, Inc. privacy policy. How we collect, use, and protect your personal data.',
    canonical: '/privacy-policy',
  }),
  terms: buildMetadata({
    title: 'Terms of Service',
    description: 'Terms of service for ZYVO business management software and related services.',
    canonical: '/terms-of-service',
  }),
  refund: buildMetadata({
    title: 'Refund Policy',
    description: 'ZYVO refund policy and 7-day money-back guarantee for subscription plans.',
    canonical: '/refund-policy',
  }),
  cookies: buildMetadata({
    title: 'Cookie Policy',
    description: 'How ZYVO uses cookies and similar technologies on our website.',
    canonical: '/cookie-policy',
  }),
  notFound: buildMetadata({
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
    noindex: true,
  }),
} as const;
