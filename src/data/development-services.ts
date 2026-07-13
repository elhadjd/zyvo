export interface PortfolioProject {
  name: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
  highlight?: string;
}

export interface DevelopmentService {
  slug: string;
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

export const portfolioProjects: PortfolioProject[] = [
  {
    name: 'BB Salon Suites',
    url: 'https://bbsalonsuites.com',
    category: 'Salon & Suite Booking Website',
    description:
      'A modern, conversion-focused website for a multi-suite salon business — built to help prospective tenants discover suites, explore amenities, and request tours online.',
    tags: ['Custom Website', 'Salon Industry', 'Lead Generation', 'Mobile-First'],
    highlight: 'Live client site',
  },
  {
    name: 'SISGESC',
    url: 'https://sisgesc.net',
    category: 'School Management System',
    description:
      'A full school management platform covering enrollment, classes, grades, and parent communication — designed for administrators who need clarity without spreadsheet chaos.',
    tags: ['Custom Software', 'Education', 'Web Application', 'Multi-Role Access'],
    highlight: 'End-to-end system',
  },
  {
    name: 'Espaço Estético Malaca',
    url: 'https://espaco-estetico-malaca.com/',
    category: 'Aesthetic Spa Website',
    description:
      'An elegant, human-centered website for an aesthetic and wellness studio — showcasing services, building trust, and making it easy for clients to book appointments.',
    tags: ['Custom Website', 'Beauty & Wellness', 'SEO-Ready', 'Brand Storytelling'],
    highlight: 'Brand-forward design',
  },
  {
    name: 'SISGESC Admin Panel',
    url: 'https://admin.sisgesc.net',
    category: 'Business Admin Dashboard',
    description:
      'The secure administrative backend for SISGESC — dashboards, user management, reporting, and day-to-day operations in one organized control center.',
    tags: ['Admin Panel', 'Dashboard', 'Role-Based Access', 'Custom Backend'],
    highlight: 'Operations hub',
  },
];

export const developmentServices: DevelopmentService[] = [
  {
    slug: 'custom-website-development',
    path: '/custom-website-development',
    shortTitle: 'Websites',
    title: 'Custom Website Development',
    metaTitle: 'Custom Website Development for US Small Businesses — From $1,199',
    metaDescription:
      'Professional custom website design and development for US salons, restaurants, clinics, and local businesses. SEO-optimized, mobile-first sites from $1,199 — below typical agency rates.',
    keywords:
      'custom website development, small business website design, professional web design USA, SEO website development, salon website design, local business website, affordable web development',
    headline: 'Websites that feel human — and help customers find you on Google',
    subheadline:
      'We design and build fast, mobile-first websites for US small businesses. Every page is structured for search engines so local customers discover you when they need what you offer.',
    icon: 'globe',
    priceFrom: 1199,
    priceLabel: 'From $1,199',
    marketCompare: 'Typical US agencies charge $1,500–$8,000 for comparable sites',
    deliveryTime: '2–4 weeks',
    features: [
      {
        title: 'SEO-first architecture',
        description:
          'Semantic HTML, optimized meta tags, structured data, fast load times, and clean URL structure so Google and Bing can index your business correctly.',
      },
      {
        title: 'Mobile-first design',
        description:
          'Most local searches happen on phones. Your site will look sharp and load quickly on every device.',
      },
      {
        title: 'Conversion-focused layouts',
        description:
          'Clear calls to action, trust signals, and contact paths designed to turn visitors into calls, bookings, and walk-ins.',
      },
      {
        title: 'Brand storytelling',
        description:
          'We translate what makes your business special into copy and visuals that feel authentic — not like a generic template.',
      },
    ],
    includes: [
      'Up to 10 custom pages',
      'Contact forms & Google Maps integration',
      'On-page SEO setup (titles, descriptions, schema)',
      'SSL certificate & performance optimization',
      '30 days post-launch support',
    ],
    faqs: [
      {
        question: 'How much does a custom small business website cost in the US?',
        answer:
          'Most US agencies charge between $3,000 and $8,000 for a 5–10 page business website. ZYVO offers comparable custom website development starting at $1,199 for focused landing sites and from $2,499 for full multi-page business websites — with SEO optimization included.',
      },
      {
        question: 'Will my website rank on Google?',
        answer:
          'We build every site with technical SEO foundations: fast hosting-ready code, semantic structure, meta tags, Open Graph data, and JSON-LD schema. Ranking also depends on your content, location, and competition — we set you up to compete from day one.',
      },
      {
        question: 'Do you redesign existing websites?',
        answer:
          'Yes. We can migrate your content, improve design and performance, and preserve or improve your search rankings during the transition.',
      },
    ],
  },
  {
    slug: 'custom-software-development',
    path: '/custom-software-development',
    shortTitle: 'Custom Systems',
    title: 'Custom Business Software Development',
    metaTitle: 'Custom Business Software & Web App Development — From $7,900',
    metaDescription:
      'Custom web applications, admin panels, and business management systems for US companies. School systems, booking platforms, dashboards — from $7,900, below typical dev shop rates.',
    keywords:
      'custom software development, business web application, custom admin panel, school management system, booking system development, SMB software development USA, custom ERP development',
    headline: 'Custom systems built around how your business actually works',
    subheadline:
      'Off-the-shelf software forces compromises. We build web applications, admin dashboards, and management systems tailored to your workflows — like the school platform and admin panels we have shipped for real clients.',
    icon: 'code',
    priceFrom: 7900,
    priceLabel: 'From $7,900',
    marketCompare: 'Comparable US custom software projects often run $10,000–$30,000+',
    deliveryTime: '6–12 weeks',
    features: [
      {
        title: 'Workflow-driven design',
        description:
          'We map your real processes first — then build software that matches how your team works, not the other way around.',
      },
      {
        title: 'Secure admin dashboards',
        description:
          'Role-based access, audit trails, and organized data views so owners and managers stay in control.',
      },
      {
        title: 'Scalable cloud architecture',
        description:
          'Modern stacks that grow with your business — APIs, integrations, and multi-user support built in from the start.',
      },
      {
        title: 'Proven delivery',
        description:
          'See our live work: SISGESC school management at sisgesc.net and its admin panel at admin.sisgesc.net.',
      },
    ],
    includes: [
      'Discovery & requirements workshop',
      'UI/UX design for web & admin views',
      'Custom database & API development',
      'User roles & permissions',
      'Deployment & documentation',
      '60 days post-launch support',
    ],
    faqs: [
      {
        question: 'How much does custom business software cost in the US?',
        answer:
          'Custom web applications in the US typically range from $10,000 to $30,000 depending on complexity. ZYVO starts custom software projects from $7,900 for focused applications, with transparent scoping before development begins.',
      },
      {
        question: 'What types of systems do you build?',
        answer:
          'We build school management platforms, booking systems, customer portals, inventory dashboards, multi-location admin panels, and industry-specific tools for salons, restaurants, retail, and service businesses.',
      },
      {
        question: 'Can you integrate with ZYVO ERP?',
        answer:
          'Yes. If you use or plan to use ZYVO for operations, we can build custom modules or integrations that connect with your existing ZYVO setup.',
      },
    ],
  },
  {
    slug: 'website-maintenance-services',
    path: '/website-maintenance-services',
    shortTitle: 'Maintenance',
    title: 'Website & System Maintenance',
    metaTitle: 'Website & Software Maintenance Plans — From $79/month',
    metaDescription:
      'Affordable website and custom software maintenance for US businesses. Security updates, backups, content changes, and monitoring from $79/mo — below typical managed hosting and agency retainers.',
    keywords:
      'website maintenance services, website maintenance cost, software maintenance plan, managed website support, small business IT maintenance, website updates monthly, system maintenance retainer',
    headline: 'Peace of mind — your site and systems stay secure, fast, and up to date',
    subheadline:
      'Running a business is enough work without worrying about broken plugins, expired certificates, or outdated software. Our maintenance plans keep everything running smoothly so you can focus on customers.',
    icon: 'wrench',
    priceFrom: 79,
    priceLabel: 'From $79/mo',
    marketCompare: 'Managed website maintenance typically costs $99–$249/mo in the US',
    deliveryTime: 'Ongoing monthly',
    features: [
      {
        title: 'Security & updates',
        description:
          'Regular patches, dependency updates, and vulnerability monitoring to protect your business and customer data.',
      },
      {
        title: 'Backups & recovery',
        description:
          'Automated backups with tested restore procedures — because disasters should not mean downtime.',
      },
      {
        title: 'Performance monitoring',
        description:
          'Uptime checks and speed optimization so visitors never hit a slow or broken experience.',
      },
      {
        title: 'Content & small changes',
        description:
          'Need hours, photos, or text updated? Maintenance plans include monthly change requests so your site stays current.',
      },
    ],
    includes: [
      'Monthly security & software updates',
      'Automated backups',
      'Uptime monitoring',
      'SSL renewal management',
      'Up to 2 hours of content updates/mo',
      'Priority email support',
    ],
    faqs: [
      {
        question: 'How much does website maintenance cost per month?',
        answer:
          'US website maintenance plans typically range from $99 to $249 per month for small business sites. ZYVO maintenance starts at $79/month for websites and from $399/month for custom software systems with active development support.',
      },
      {
        question: 'What is included in a maintenance plan?',
        answer:
          'Plans include security updates, backups, uptime monitoring, SSL management, and a set number of content change hours each month. Software maintenance plans add bug fixes, dependency updates, and priority support.',
      },
      {
        question: 'Do you maintain sites you did not build?',
        answer:
          'Yes. We can audit your existing website or application and onboard it to a maintenance plan after a technical review.',
      },
    ],
  },
];

export const hubMeta = {
  path: '/development-services',
  metaTitle: 'Web Design, Custom Software & Maintenance Services for US Businesses',
  metaDescription:
    'ZYVO builds custom websites, business software, and admin systems for US small businesses — with SEO optimization and pricing below typical agency rates. See live portfolio: Salon Suites, SISGESC, and more.',
  keywords:
    'web development services USA, custom website development, custom software development, website maintenance, small business web design, SEO website development, ZYVO development services',
  headline: 'We build the digital tools your business deserves',
  subheadline:
    'Beyond our ZYVO platform, we design and develop custom websites, business systems, and ongoing maintenance for owners who want technology that works as hard as they do — with SEO built in so customers can find you.',
};

export const servicePricingTiers = [
  {
    name: 'Starter Website',
    service: 'custom-website-development',
    price: 1199,
    priceNote: 'one-time',
    description: 'Focused landing or brochure site for new businesses',
    features: ['Up to 5 pages', 'Mobile-responsive design', 'Contact form', 'Basic on-page SEO', '30-day support'],
    popular: false,
  },
  {
    name: 'Business Website',
    service: 'custom-website-development',
    price: 2499,
    priceNote: 'one-time',
    description: 'Full multi-page site with SEO structure for local search',
    features: [
      'Up to 10 custom pages',
      'Advanced SEO & schema markup',
      'Google Business integration',
      'Performance optimization',
      '60-day support',
    ],
    popular: true,
  },
  {
    name: 'Custom System',
    service: 'custom-software-development',
    price: 7900,
    priceNote: 'starting at',
    description: 'Web app, dashboard, or industry-specific management tool',
    features: [
      'Requirements & UX workshop',
      'Custom database & APIs',
      'Admin panel & user roles',
      'Deployment & training',
      '60-day support',
    ],
    popular: false,
  },
  {
    name: 'Website Care',
    service: 'website-maintenance-services',
    price: 79,
    priceNote: '/month',
    description: 'Keep your website secure, backed up, and current',
    features: ['Security updates', 'Monthly backups', 'Uptime monitoring', '2 hrs content changes', 'Email support'],
    popular: false,
  },
  {
    name: 'System Care',
    service: 'website-maintenance-services',
    price: 399,
    priceNote: '/month',
    description: 'Ongoing support for custom software and admin panels',
    features: [
      'Bug fixes & patches',
      'Dependency updates',
      'Performance monitoring',
      '4 hrs dev support/mo',
      'Priority response',
    ],
    popular: false,
  },
];

export const developmentFaqs = [
  {
    question: 'Does ZYVO only sell software, or do you also build custom projects?',
    answer:
      'Both. ZYVO is our cloud business management platform, and we also offer custom website development, custom business software, and maintenance services for clients who need tailored digital solutions.',
  },
  {
    question: 'Why are your development prices lower than many US agencies?',
    answer:
      'We combine efficient processes, modern tooling, and a focused team to deliver quality work without the overhead of large agencies. Our pricing is intentionally competitive — typically 15–25% below comparable US market rates — while including SEO optimization that many agencies charge extra for.',
  },
  {
    question: 'Can I see examples of websites and systems you have built?',
    answer:
      'Yes. Explore our live portfolio: BB Salon Suites (bbsalonsuites.com), SISGESC school management (sisgesc.net), Espaço Estético Malaca (espaco-estetico-malaca.com), and the SISGESC admin panel (admin.sisgesc.net).',
  },
  {
    question: 'Is SEO included in website development?',
    answer:
      'Yes. Every website we build includes technical SEO: semantic HTML, meta titles and descriptions, Open Graph tags, JSON-LD structured data, sitemap-ready structure, and performance optimization. We design content sections to target the keywords your customers actually search.',
  },
  {
    question: 'How do I get a quote for my project?',
    answer:
      'Contact us at commercial@zyvoerp.com or call +1 (973) 524-9725. Share your goals, timeline, and any reference sites — we will respond with a clear scope and fixed or phased pricing.',
  },
];

export function getServiceBySlug(slug: string): DevelopmentService | undefined {
  return developmentServices.find((s) => s.slug === slug);
}
