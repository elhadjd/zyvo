import type { MarketCode } from '@/lib/markets/types';
import { formatDevPrice, formatDevPriceFrom } from '@/lib/development-services/format-price';
import type {
  DevelopmentFaq,
  DevelopmentHubContent,
  DevelopmentService,
  DevelopmentServiceSlug,
  PortfolioProject,
  ServicePricingTier,
} from './types';
import { DEVELOPMENT_SERVICE_SLUGS } from './programs';

export type { PortfolioProject, DevelopmentService, DevelopmentHubContent, ServicePricingTier, DevelopmentFaq };

function countryLabel(code: MarketCode): string {
  if (code === 'gn') return 'Guinée';
  if (code === 'sn') return 'Sénégal';
  if (code === 'ci') return "Côte d'Ivoire";
  return 'United States';
}

function capitalCity(code: MarketCode): string {
  if (code === 'gn') return 'Conakry';
  if (code === 'sn') return 'Dakar';
  if (code === 'ci') return 'Abidjan';
  return 'the US';
}

export function getServiceHubPath(marketCode: MarketCode): string {
  return marketCode === 'us' ? '/development-services' : '/services';
}

export function getServiceDetailPath(marketCode: MarketCode, slug: DevelopmentServiceSlug): string {
  return marketCode === 'us' ? `/${slug}` : `/services/${slug}`;
}

interface MarketPricing {
  websiteStarter: number;
  websiteBusiness: number;
  softwareFrom: number;
  maintenanceWebsite: number;
  maintenanceSystem: number;
}

type DevServiceMarket = Exclude<MarketCode, 'ao'>;

function resolveDevMarket(code: MarketCode): DevServiceMarket {
  return code === 'ao' ? 'gn' : code;
}

/** 30% promotional discount applied to all development service base rates */
const SERVICE_DISCOUNT_RATE = 0.7;

function discountPrice(amount: number): number {
  return Math.round(amount * SERVICE_DISCOUNT_RATE);
}

const BASE_MARKET_PRICING: Record<DevServiceMarket, MarketPricing> = {
  us: { websiteStarter: 1199, websiteBusiness: 2499, softwareFrom: 7900, maintenanceWebsite: 79, maintenanceSystem: 399 },
  gn: { websiteStarter: 8_500_000, websiteBusiness: 18_500_000, softwareFrom: 55_000_000, maintenanceWebsite: 450_000, maintenanceSystem: 2_800_000 },
  sn: { websiteStarter: 750_000, websiteBusiness: 1_650_000, softwareFrom: 4_900_000, maintenanceWebsite: 39_000, maintenanceSystem: 249_000 },
  ci: { websiteStarter: 750_000, websiteBusiness: 1_650_000, softwareFrom: 4_900_000, maintenanceWebsite: 39_000, maintenanceSystem: 249_000 },
};

const MARKET_PRICING: Record<DevServiceMarket, MarketPricing> = Object.fromEntries(
  (Object.entries(BASE_MARKET_PRICING) as [DevServiceMarket, MarketPricing][]).map(([code, pricing]) => [
    code,
    {
      websiteStarter: discountPrice(pricing.websiteStarter),
      websiteBusiness: discountPrice(pricing.websiteBusiness),
      softwareFrom: discountPrice(pricing.softwareFrom),
      maintenanceWebsite: discountPrice(pricing.maintenanceWebsite),
      maintenanceSystem: discountPrice(pricing.maintenanceSystem),
    },
  ])
) as Record<DevServiceMarket, MarketPricing>;

export const portfolioProjects: PortfolioProject[] = [
  {
    name: 'BB Salon Suites',
    url: 'https://bbsalonsuites.com',
    category: 'Hair & Massage Services Website',
    description:
      'A polished website for BB Salon Suites — featuring Salam, The Blazer, E Angoon, and Sweetest Provision. Showcases hair styling and massage services with a modern, welcoming brand experience.',
    tags: ['Custom Website', 'Hair & Massage', 'Beauty & Wellness', 'Multi-Brand'],
    highlight: 'Live client site',
  },
  {
    name: 'SIGESC',
    url: 'https://sisgesc.net',
    category: 'All-in-One Business Management Software',
    description:
      'A complete business management platform — sales, inventory, customers, finances, and daily operations in one system. Built for owners who want full control without juggling multiple tools.',
    tags: ['Custom Software', 'Business Management', 'Web Application', 'All-in-One'],
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
    name: 'SIGESC Admin Panel',
    url: 'https://admin.sisgesc.net',
    category: 'Business Operations Dashboard',
    description:
      'The secure administrative backend for SIGESC — dashboards, user management, reporting, and day-to-day business operations in one organized control center.',
    tags: ['Admin Panel', 'Dashboard', 'Role-Based Access', 'Custom Backend'],
    highlight: 'Operations hub',
  },
];

function buildServicesEn(): DevelopmentService[] {
  const p = MARKET_PRICING.us;
  return [
    {
      slug: 'custom-website-development',
      path: '/custom-website-development',
      shortTitle: 'Websites',
      title: 'Custom Website Development',
      metaTitle: `Custom Website Development USA — ${formatDevPriceFrom('us', p.websiteStarter)} | SEO Included`,
      metaDescription:
        `Professional custom website design for US salons, restaurants, clinics & local businesses. Mobile-first, Google-ready sites from ${formatDevPrice('us', p.websiteStarter)}. 30% below typical agency rates.`,
      keywords:
        'custom website development USA, small business website design, affordable web design, SEO website development, salon website design, restaurant website Columbus, local business website near me, professional web developer USA',
      headline: 'Websites that feel human — and help customers find you on Google',
      subheadline:
        'We design and build fast, mobile-first websites for US small businesses. Every page is structured for search engines so local customers discover you when they need what you offer.',
      icon: 'globe',
      priceFrom: p.websiteStarter,
      priceLabel: formatDevPriceFrom('us', p.websiteStarter),
      marketCompare: 'Typical US agencies charge $1,500–$8,000 for comparable sites',
      deliveryTime: '2–4 weeks',
      features: [
        { title: 'SEO-first architecture', description: 'Semantic HTML, optimized meta tags, structured data, fast load times, and clean URL structure so Google and Bing can index your business correctly.' },
        { title: 'Mobile-first design', description: 'Most local searches happen on phones. Your site will look sharp and load quickly on every device.' },
        { title: 'Conversion-focused layouts', description: 'Clear calls to action, trust signals, and contact paths designed to turn visitors into calls, bookings, and walk-ins.' },
        { title: 'Brand storytelling', description: 'We translate what makes your business special into copy and visuals that feel authentic — not like a generic template.' },
      ],
      includes: ['Up to 10 custom pages', 'Contact forms & Google Maps integration', 'On-page SEO setup (titles, descriptions, schema)', 'SSL certificate & performance optimization', '30 days post-launch support'],
      faqs: [
        { question: 'How much does a custom small business website cost in the US?', answer: `Most US agencies charge between $3,000 and $8,000 for a 5–10 page business website. ZYVO offers comparable custom website development starting at ${formatDevPrice('us', p.websiteStarter)} for focused landing sites and from ${formatDevPrice('us', p.websiteBusiness)} for full multi-page business websites — with SEO optimization included.` },
        { question: 'Will my website rank on Google?', answer: 'We build every site with technical SEO foundations: fast hosting-ready code, semantic structure, meta tags, Open Graph data, and JSON-LD schema. Ranking also depends on your content, location, and competition — we set you up to compete from day one.' },
        { question: 'Do you redesign existing websites?', answer: 'Yes. We can migrate your content, improve design and performance, and preserve or improve your search rankings during the transition.' },
      ],
    },
    {
      slug: 'custom-software-development',
      path: '/custom-software-development',
      shortTitle: 'Custom Systems',
      title: 'Custom Business Software Development',
      metaTitle: `Custom Business Software Development — ${formatDevPriceFrom('us', p.softwareFrom)} | Web Apps & ERP`,
      metaDescription:
        `Custom web applications, admin panels & business management systems for US companies. Booking systems, dashboards, ERP modules from ${formatDevPrice('us', p.softwareFrom)}. Fixed-scope pricing.`,
      keywords:
        'custom software development USA, business web application, custom admin panel, SMB software development, booking system development, custom ERP development, web app developer Ohio, all-in-one business software',
      headline: 'Custom systems built around how your business actually works',
      subheadline:
        'Off-the-shelf software forces compromises. We build web applications, admin dashboards, and all-in-one management systems tailored to your workflows — like SIGESC at sisgesc.net and the admin panels we have shipped for real clients.',
      icon: 'code',
      priceFrom: p.softwareFrom,
      priceLabel: formatDevPriceFrom('us', p.softwareFrom),
      marketCompare: 'Comparable US custom software projects often run $10,000–$30,000+',
      deliveryTime: '6–12 weeks',
      features: [
        { title: 'Workflow-driven design', description: 'We map your real processes first — then build software that matches how your team works, not the other way around.' },
        { title: 'Secure admin dashboards', description: 'Role-based access, audit trails, and organized data views so owners and managers stay in control.' },
        { title: 'Scalable cloud architecture', description: 'Modern stacks that grow with your business — APIs, integrations, and multi-user support built in from the start.' },
        { title: 'Proven delivery', description: 'See our live work: SIGESC all-in-one business management at sisgesc.net and its admin panel at admin.sisgesc.net.' },
      ],
      includes: ['Discovery & requirements workshop', 'UI/UX design for web & admin views', 'Custom database & API development', 'User roles & permissions', 'Deployment & documentation', '60 days post-launch support'],
      faqs: [
        { question: 'How much does custom business software cost in the US?', answer: `Custom web applications in the US typically range from $10,000 to $30,000 depending on complexity. ZYVO starts custom software projects from ${formatDevPrice('us', p.softwareFrom)} for focused applications, with transparent scoping before development begins.` },
        { question: 'What types of systems do you build?', answer: 'We build all-in-one business management platforms, booking systems, customer portals, inventory dashboards, multi-location admin panels, and industry-specific tools for salons, restaurants, retail, and service businesses.' },
        { question: 'Can you integrate with ZYVO ERP?', answer: 'Yes. If you use or plan to use ZYVO for operations, we can build custom modules or integrations that connect with your existing ZYVO setup.' },
      ],
    },
    {
      slug: 'website-maintenance-services',
      path: '/website-maintenance-services',
      shortTitle: 'Maintenance',
      title: 'Website & System Maintenance',
      metaTitle: `Website & Software Maintenance Plans — ${formatDevPriceFrom('us', p.maintenanceWebsite)}/mo`,
      metaDescription:
        `Affordable website and custom software maintenance for US businesses. Security updates, backups, monitoring & content changes from ${formatDevPrice('us', p.maintenanceWebsite)}/mo.`,
      keywords:
        'website maintenance services USA, website maintenance cost, software maintenance plan, managed website support, small business IT maintenance, WordPress maintenance, monthly website updates',
      headline: 'Peace of mind — your site and systems stay secure, fast, and up to date',
      subheadline:
        'Running a business is enough work without worrying about broken plugins, expired certificates, or outdated software. Our maintenance plans keep everything running smoothly so you can focus on customers.',
      icon: 'wrench',
      priceFrom: p.maintenanceWebsite,
      priceLabel: `${formatDevPriceFrom('us', p.maintenanceWebsite)}/mo`,
      marketCompare: 'Managed website maintenance typically costs $99–$249/mo in the US',
      deliveryTime: 'Ongoing monthly',
      features: [
        { title: 'Security & updates', description: 'Regular patches, dependency updates, and vulnerability monitoring to protect your business and customer data.' },
        { title: 'Backups & recovery', description: 'Automated backups with tested restore procedures — because disasters should not mean downtime.' },
        { title: 'Performance monitoring', description: 'Uptime checks and speed optimization so visitors never hit a slow or broken experience.' },
        { title: 'Content & small changes', description: 'Need hours, photos, or text updated? Maintenance plans include monthly change requests so your site stays current.' },
      ],
      includes: ['Monthly security & software updates', 'Automated backups', 'Uptime monitoring', 'SSL renewal management', 'Up to 2 hours of content updates/mo', 'Priority email support'],
      faqs: [
        { question: 'How much does website maintenance cost per month?', answer: `US website maintenance plans typically range from $99 to $249 per month for small business sites. ZYVO maintenance starts at ${formatDevPrice('us', p.maintenanceWebsite)}/month for websites and from ${formatDevPrice('us', p.maintenanceSystem)}/month for custom software systems with active development support.` },
        { question: 'What is included in a maintenance plan?', answer: 'Plans include security updates, backups, uptime monitoring, SSL management, and a set number of content change hours each month. Software maintenance plans add bug fixes, dependency updates, and priority support.' },
        { question: 'Do you maintain sites you did not build?', answer: 'Yes. We can audit your existing website or application and onboard it to a maintenance plan after a technical review.' },
      ],
    },
  ];
}

function buildServicesFr(code: MarketCode): DevelopmentService[] {
  const resolved = resolveDevMarket(code);
  const country = countryLabel(resolved);
  const city = capitalCity(resolved);
  const p = MARKET_PRICING[resolved];
  const agencyCompare = resolved === 'gn'
    ? 'Les agences locales facturent souvent 15 à 40 millions FG pour un site comparable'
    : 'Les agences locales facturent souvent 2 à 6 millions FCFA pour un site comparable';

  return [
    {
      slug: 'custom-website-development',
      path: getServiceDetailPath(resolved, 'custom-website-development'),
      shortTitle: 'Sites web',
      title: 'Création de sites web sur mesure',
      metaTitle: `Création site web PME ${country} — À partir de ${formatDevPrice(resolved, p.websiteStarter)}`,
      metaDescription: `Sites web professionnels pour boutiques, restaurants, salons et cliniques à ${city}. Design mobile, SEO local Google, formulaires de contact — ${formatDevPriceFrom(resolved, p.websiteStarter)} avec −30 % sur les tarifs agence.`,
      keywords: `création site web ${country}, site internet PME ${city}, développement web ${country}, site vitrine professionnel, référencement Google ${city}, agence web ${city}, site web pas cher ${country}, webdesign ${city}`,
      headline: `Un site web qui attire des clients à ${city} — et se positionne sur Google`,
      subheadline: `Nous concevons des sites rapides, adaptés au mobile et optimisés pour le référencement local. Vos clients vous trouvent quand ils cherchent vos services à ${city} et dans tout le pays.`,
      icon: 'globe',
      priceFrom: p.websiteStarter,
      priceLabel: formatDevPriceFrom(resolved, p.websiteStarter),
      marketCompare: agencyCompare,
      deliveryTime: '2 à 4 semaines',
      features: [
        { title: 'Architecture SEO', description: 'Balises meta, données structurées, URLs propres et temps de chargement optimisé pour Google et Bing.' },
        { title: 'Design mobile-first', description: 'La majorité des recherches locales se font sur smartphone — votre site sera impeccable sur tous les écrans.' },
        { title: 'Parcours de conversion', description: 'Appels à l\'action clairs, preuves de confiance et formulaires pour transformer les visiteurs en clients.' },
        { title: 'Identité de marque', description: 'Un site qui reflète votre activité — pas un modèle générique copié-collé.' },
      ],
      includes: ['Jusqu\'à 10 pages personnalisées', 'Formulaires de contact & Google Maps', 'SEO on-page (titres, descriptions, schema)', 'Certificat SSL & optimisation performance', '30 jours de support post-lancement'],
      faqs: [
        { question: `Combien coûte un site web pour une PME en ${country} ?`, answer: `Les agences locales facturent souvent entre 15 et 40 millions FG (ou 2 à 6 millions FCFA) pour un site vitrine. ZYVO propose des sites sur mesure à partir de ${formatDevPrice(resolved, p.websiteStarter)} avec le SEO technique inclus.` },
        { question: 'Mon site sera-t-il visible sur Google ?', answer: 'Chaque site inclut les fondations SEO : structure sémantique, meta tags, Open Graph, JSON-LD et performance. Le classement dépend aussi de votre contenu et de la concurrence locale.' },
        { question: 'Pouvez-vous refondre un site existant ?', answer: 'Oui. Nous migrons votre contenu, améliorons le design et préservons vos positions Google pendant la transition.' },
      ],
    },
    {
      slug: 'custom-software-development',
      path: getServiceDetailPath(resolved, 'custom-software-development'),
      shortTitle: 'Logiciels',
      title: 'Développement de logiciels métier',
      metaTitle: `Logiciel sur mesure PME ${country} — À partir de ${formatDevPrice(resolved, p.softwareFrom)}`,
      metaDescription: `Applications web, tableaux de bord admin et ERP pour PME en ${country}. Réservations, gestion stock, facturation — à partir de ${formatDevPrice(resolved, p.softwareFrom)}. Livraison professionnelle à ${city}.`,
      keywords: `développement logiciel ${country}, application web PME ${city}, logiciel gestion ${city}, ERP sur mesure ${country}, tableau de bord entreprise, logiciel boutique ${city}, système gestion stock ${country}`,
      headline: 'Des outils numériques adaptés à vos processus réels',
      subheadline: `Fini les compromis avec des logiciels génériques. Nous développons des applications web, des panneaux d'administration et des systèmes de gestion — comme SIGESC (sisgesc.net), déjà en production pour des clients réels.`,
      icon: 'code',
      priceFrom: p.softwareFrom,
      priceLabel: formatDevPriceFrom(resolved, p.softwareFrom),
      marketCompare: resolved === 'gn'
        ? 'Les projets logiciels sur mesure dépassent souvent 80 millions FG en Guinée'
        : 'Les projets logiciels sur mesure dépassent souvent 8 millions FCFA en Afrique de l\'Ouest',
      deliveryTime: '6 à 12 semaines',
      features: [
        { title: 'Conception par les workflows', description: 'Nous cartographions vos processus avant de coder — le logiciel s\'adapte à votre équipe.' },
        { title: 'Tableaux de bord sécurisés', description: 'Accès par rôles, traçabilité et vues organisées pour les dirigeants et managers.' },
        { title: 'Architecture cloud évolutive', description: 'APIs, intégrations et support multi-utilisateurs dès le départ.' },
        { title: 'Livraisons prouvées', description: 'Portfolio en ligne : SIGESC (sisgesc.net) et son panneau admin (admin.sisgesc.net).' },
      ],
      includes: ['Atelier découverte & cahier des charges', 'Design UI/UX web & admin', 'Base de données & API sur mesure', 'Rôles & permissions utilisateurs', 'Déploiement & documentation', '60 jours de support post-lancement'],
      faqs: [
        { question: `Quel budget pour un logiciel sur mesure en ${country} ?`, answer: `Les projets dépassent souvent 80 millions FG ou 8 millions FCFA selon la complexité. ZYVO démarre à partir de ${formatDevPrice(resolved, p.softwareFrom)} avec un cadrage transparent avant développement.` },
        { question: 'Quels types de systèmes développez-vous ?', answer: 'Plateformes de gestion tout-en-un, réservations en ligne, portails clients, tableaux de bord stock, panneaux multi-sites pour retail, restaurants, salons et services.' },
        { question: 'Peut-on intégrer avec ZYVO ERP ?', answer: 'Oui. Nous pouvons connecter vos modules personnalisés à ZYVO si vous utilisez ou prévoyez d\'utiliser notre plateforme de gestion.' },
      ],
    },
    {
      slug: 'website-maintenance-services',
      path: getServiceDetailPath(resolved, 'website-maintenance-services'),
      shortTitle: 'Maintenance',
      title: 'Maintenance sites & logiciels',
      metaTitle: `Maintenance site web ${country} — À partir de ${formatDevPrice(resolved, p.maintenanceWebsite)}/mois`,
      metaDescription: `Plans de maintenance pour sites web et logiciels en ${country}. Mises à jour sécurité, sauvegardes, monitoring et modifications de contenu — à partir de ${formatDevPrice(resolved, p.maintenanceWebsite)}/mois.`,
      keywords: `maintenance site web ${country}, support technique ${city}, mise à jour site internet, maintenance logiciel PME, hébergement site web ${city}, sécurité site internet ${country}`,
      headline: 'Votre site et vos systèmes restent sécurisés, rapides et à jour',
      subheadline: 'Concentrez-vous sur vos clients — nous gérons les mises à jour, sauvegardes, certificats SSL et corrections pour que votre présence en ligne ne tombe jamais en panne.',
      icon: 'wrench',
      priceFrom: p.maintenanceWebsite,
      priceLabel: `${formatDevPriceFrom(resolved, p.maintenanceWebsite)}/mois`,
      marketCompare: resolved === 'gn'
        ? 'La maintenance externalisée coûte souvent 800 000 à 2 millions FG/mois en Guinée'
        : 'La maintenance externalisée coûte souvent 75 000 à 200 000 FCFA/mois',
      deliveryTime: 'Mensuel, sans engagement long',
      features: [
        { title: 'Sécurité & mises à jour', description: 'Correctifs réguliers et surveillance des vulnérabilités pour protéger vos données.' },
        { title: 'Sauvegardes & restauration', description: 'Backups automatiques avec procédures de restauration testées.' },
        { title: 'Monitoring performance', description: 'Surveillance de disponibilité et optimisation de vitesse.' },
        { title: 'Modifications de contenu', description: 'Heures mensuelles incluses pour mettre à jour textes, photos et horaires.' },
      ],
      includes: ['Mises à jour sécurité mensuelles', 'Sauvegardes automatiques', 'Monitoring uptime', 'Gestion renouvellement SSL', 'Jusqu\'à 2 h de modifications/mois', 'Support email prioritaire'],
      faqs: [
        { question: 'Combien coûte la maintenance d\'un site web ?', answer: `En ${country}, la maintenance démarre à ${formatDevPrice(resolved, p.maintenanceWebsite)}/mois pour les sites web et à partir de ${formatDevPrice(resolved, p.maintenanceSystem)}/mois pour les logiciels sur mesure.` },
        { question: 'Que comprend un plan de maintenance ?', answer: 'Mises à jour, sauvegardes, monitoring, SSL et heures de modification de contenu. Les plans logiciel ajoutent corrections de bugs et support prioritaire.' },
        { question: 'Maintenez-vous des sites que vous n\'avez pas créés ?', answer: 'Oui, après un audit technique nous pouvons reprendre la maintenance de votre site ou application existante.' },
      ],
    },
  ];
}

function buildHubEn(): DevelopmentHubContent {
  const p = MARKET_PRICING.us;
  return {
    path: '/development-services',
    metaTitle: `Web Design & Custom Software USA — Sites from ${formatDevPrice('us', p.websiteStarter)} | ZYVO`,
    metaDescription:
      `ZYVO builds SEO-optimized websites, custom business software & maintenance for US small businesses. Websites from ${formatDevPrice('us', p.websiteStarter)}, systems from ${formatDevPrice('us', p.softwareFrom)}. Live portfolio: BB Salon Suites, SIGESC.`,
    keywords:
      'web development services USA, custom website development, custom software development, website maintenance, small business web design, SEO website development, affordable web developer USA, Columbus web design, Ohio software development',
    headline: 'We build the digital tools your business deserves',
    subheadline:
      'Beyond our ZYVO platform, we design and develop custom websites, business systems, and ongoing maintenance for owners who want technology that works as hard as they do — with SEO built in so customers can find you.',
    badge: 'Web Design · Custom Software · Maintenance',
    promoBadge: 'Limited-time · 30% off all development services',
    servicesHeading: 'What we build for US small businesses',
    pricingHeading: 'Development pricing — 30% below typical agency rates',
    pricingSubtitle: `Promotional pricing on every project. Websites from ${formatDevPrice('us', p.websiteStarter)}, business systems from ${formatDevPrice('us', p.softwareFrom)} — with SEO optimization included in every website.`,
    seoHeading: 'Why SEO matters in every project we deliver',
    seoBody: [
      'When someone in your city searches for "salon website design," "all-in-one business management software," or "website maintenance for small business," you want to appear at the top — not on page three. That is why we treat search engine optimization as a foundation, not an afterthought.',
      'Every website we build includes semantic HTML structure, optimized page titles and meta descriptions, Open Graph tags for social sharing, JSON-LD structured data for rich search results, fast-loading assets, and mobile-first responsive design.',
    ],
    seoSections: [
      {
        heading: 'Custom websites that rank on Google',
        body: 'We build small business websites for salons, restaurants, clinics, retail shops, and service companies across the United States. Each project includes keyword research, local SEO setup, Google Business Profile integration, and Core Web Vitals optimization so your site competes in local search from day one.',
      },
      {
        heading: 'Custom software for real business workflows',
        body: 'Need more than a website? We develop booking systems, inventory dashboards, customer portals, and all-in-one management platforms like SIGESC (sisgesc.net). Our team maps your processes first, then builds software your staff will actually use — with role-based admin panels and secure cloud hosting.',
      },
      {
        heading: 'Ongoing maintenance so you stay secure',
        body: `Website and software maintenance plans start at ${formatDevPrice('us', p.maintenanceWebsite)}/month. We handle security patches, SSL renewals, automated backups, uptime monitoring, and monthly content updates — so you focus on customers, not broken plugins.`,
      },
    ],
    internalLinksHeading: 'Explore ZYVO',
    ctaTitle: 'Ready to start your project?',
    ctaSubtitle: 'Tell us about your business and goals. We will respond with a clear scope, timeline, and quote — no pressure.',
    ctaButton: 'Contact our team',
    faqTitle: 'Development Services FAQ',
    quoteButton: 'Get a free project quote',
    learnMoreLabel: 'Learn more',
    contactButton: 'Get a free quote',
  };
}

function buildHubFr(code: MarketCode): DevelopmentHubContent {
  const resolved = resolveDevMarket(code);
  const country = countryLabel(resolved);
  const city = capitalCity(resolved);
  const p = MARKET_PRICING[resolved];
  const localKeywords = resolved === 'gn'
    ? `création site web Conakry, agence web Guinée, logiciel gestion Conakry, développeur web Kaloum, site vitrine Ratoma`
    : resolved === 'sn'
      ? `création site web Dakar, agence web Sénégal, logiciel gestion Dakar, développeur web Plateau, site vitrine Almadies`
      : `création site web Abidjan, agence web Côte d'Ivoire, logiciel gestion Abidjan, développeur web Cocody, site vitrine Plateau`;

  return {
    path: getServiceHubPath(code),
    metaTitle: `Agence Web ${country} — Sites dès ${formatDevPrice(resolved, p.websiteStarter)} | ZYVO ${city}`,
    metaDescription: `Création site web, logiciel sur mesure & maintenance pour PME à ${city} et en ${country}. SEO Google inclus, tarifs −30 %. Sites dès ${formatDevPrice(resolved, p.websiteStarter)}, logiciels dès ${formatDevPrice(resolved, p.softwareFrom)}. Devis gratuit.`,
    keywords: `développement web ${country}, création site internet ${city}, logiciel sur mesure ${country}, maintenance site web ${city}, agence web ${country}, ${localKeywords}`,
    headline: `Sites web & logiciels sur mesure pour les PME en ${country}`,
    subheadline: `Au-delà de la plateforme ZYVO, nous concevons des sites vitrines, des applications de gestion et des contrats de maintenance pour les entrepreneurs de ${city} et de tout le pays — avec le SEO intégré dès le départ.`,
    badge: 'Sites web · Logiciels · Maintenance',
    promoBadge: 'Offre limitée · −30 % sur tous les services',
    servicesHeading: `Ce que nous créons pour les entreprises en ${country}`,
    pricingHeading: 'Tarifs transparents — 30 % sous les agences locales',
    pricingSubtitle: `Promotion en cours : sites dès ${formatDevPrice(resolved, p.websiteStarter)}, logiciels dès ${formatDevPrice(resolved, p.softwareFrom)}. SEO technique inclus dans chaque projet web.`,
    seoHeading: 'Le référencement Google intégré à chaque livraison',
    seoBody: [
      `Quand un client cherche « site web boutique ${city} » ou « logiciel gestion stock ${country} », votre entreprise doit apparaître en première page. C'est pourquoi le SEO technique fait partie de chaque projet — pas une option en supplément.`,
      'Chaque site inclut structure HTML sémantique, balises meta optimisées, Open Graph, données structurées JSON-LD, assets rapides et design responsive mobile-first.',
    ],
    seoSections: [
      {
        heading: `Sites web professionnels à ${city} et en ${country}`,
        body: `Nous créons des sites vitrines pour boutiques, restaurants, salons de coiffure, pharmacies, cabinets et PME de services. Chaque projet inclut le référencement local Google, l'intégration Google Maps, des formulaires de contact optimisés et une version mobile parfaite — essentielle quand 80 % des recherches locales se font sur smartphone en Afrique de l'Ouest.`,
      },
      {
        heading: `Logiciels de gestion sur mesure pour PME en ${country}`,
        body: `Au-delà des sites web, nous développons des applications de gestion : caisse POS, suivi de stock, réservations en ligne, tableaux de bord admin et intégrations Orange Money / Wave. Comme SIGESC (sisgesc.net), nos logiciels sont conçus autour de vos processus réels — pas l'inverse.`,
      },
      {
        heading: 'Maintenance et support technique continu',
        body: `Nos plans de maintenance démarrent à ${formatDevPrice(resolved, p.maintenanceWebsite)}/mois pour les sites web. Nous gérons les mises à jour de sécurité, sauvegardes, certificats SSL et modifications de contenu — pour que votre présence en ligne reste fiable même avec une connexion mobile limitée.`,
      },
    ],
    internalLinksHeading: 'Découvrir ZYVO',
    ctaTitle: 'Prêt à lancer votre projet ?',
    ctaSubtitle: 'Décrivez votre activité et vos objectifs. Nous vous répondons avec un devis clair, un planning et zéro pression commerciale.',
    ctaButton: 'Contacter notre équipe',
    faqTitle: 'FAQ — Services de développement',
    quoteButton: 'Demander un devis gratuit',
    learnMoreLabel: 'En savoir plus',
    contactButton: 'Demander un devis',
  };
}

function buildTiers(code: MarketCode): ServicePricingTier[] {
  const resolved = resolveDevMarket(code);
  const p = MARKET_PRICING[resolved];
  const mo = resolved === 'us' ? '/month' : '/mois';
  const once = resolved === 'us' ? 'one-time' : 'forfait';
  const starting = resolved === 'us' ? 'starting at' : 'à partir de';

  return [
    {
      name: resolved === 'us' ? 'Starter Website' : 'Site vitrine',
      service: 'custom-website-development',
      price: p.websiteStarter,
      priceNote: once,
      description: resolved === 'us' ? 'Focused landing or brochure site for new businesses' : 'Site vitrine pour nouvelles entreprises',
      features: resolved === 'us'
        ? ['Up to 5 pages', 'Mobile-responsive design', 'Contact form', 'Basic on-page SEO', '30-day support']
        : ['Jusqu\'à 5 pages', 'Design responsive', 'Formulaire contact', 'SEO de base', '30 jours support'],
      popular: false,
    },
    {
      name: resolved === 'us' ? 'Business Website' : 'Site business',
      service: 'custom-website-development',
      price: p.websiteBusiness,
      priceNote: once,
      description: resolved === 'us' ? 'Full multi-page site with SEO structure for local search' : 'Site complet multi-pages avec SEO local',
      features: resolved === 'us'
        ? ['Up to 10 custom pages', 'Advanced SEO & schema markup', 'Google Business integration', 'Performance optimization', '60-day support']
        : ['Jusqu\'à 10 pages', 'SEO avancé & schema', 'Intégration Google Business', 'Optimisation performance', '60 jours support'],
      popular: true,
    },
    {
      name: resolved === 'us' ? 'Custom System' : 'Logiciel sur mesure',
      service: 'custom-software-development',
      price: p.softwareFrom,
      priceNote: starting,
      description: resolved === 'us' ? 'Web app, dashboard, or industry-specific management tool' : 'Application web, tableau de bord ou outil métier',
      features: resolved === 'us'
        ? ['Requirements & UX workshop', 'Custom database & APIs', 'Admin panel & user roles', 'Deployment & training', '60-day support']
        : ['Atelier cadrage & UX', 'Base de données & APIs', 'Panneau admin & rôles', 'Déploiement & formation', '60 jours support'],
      popular: false,
    },
    {
      name: resolved === 'us' ? 'Website Care' : 'Maintenance site',
      service: 'website-maintenance-services',
      price: p.maintenanceWebsite,
      priceNote: mo,
      description: resolved === 'us' ? 'Keep your website secure, backed up, and current' : 'Site sécurisé, sauvegardé et à jour',
      features: resolved === 'us'
        ? ['Security updates', 'Monthly backups', 'Uptime monitoring', '2 hrs content changes', 'Email support']
        : ['Mises à jour sécurité', 'Sauvegardes mensuelles', 'Monitoring uptime', '2 h modifications', 'Support email'],
      popular: false,
    },
    {
      name: resolved === 'us' ? 'System Care' : 'Maintenance logiciel',
      service: 'website-maintenance-services',
      price: p.maintenanceSystem,
      priceNote: mo,
      description: resolved === 'us' ? 'Ongoing support for custom software and admin panels' : 'Support continu pour logiciels sur mesure',
      features: resolved === 'us'
        ? ['Bug fixes & patches', 'Dependency updates', 'Performance monitoring', '4 hrs dev support/mo', 'Priority response']
        : ['Corrections & patches', 'Mises à jour dépendances', 'Monitoring performance', '4 h dev/mois', 'Réponse prioritaire'],
      popular: false,
    },
  ];
}

function buildFaqsEn(): DevelopmentFaq[] {
  return [
    { question: 'Does ZYVO only sell software, or do you also build custom projects?', answer: 'Both. ZYVO is our cloud business management platform, and we also offer custom website development, custom business software, and maintenance services for clients who need tailored digital solutions.' },
    { question: 'Why are your development prices lower than many US agencies?', answer: 'We combine efficient processes, modern tooling, and a focused team to deliver quality work without the overhead of large agencies. Our pricing is intentionally competitive — typically 15–25% below comparable US market rates — while including SEO optimization that many agencies charge extra for.' },
    { question: 'Can I see examples of websites and systems you have built?', answer: 'Yes. Explore our live portfolio: BB Salon Suites (bbsalonsuites.com), SIGESC (sisgesc.net), Espaço Estético Malaca (espaco-estetico-malaca.com), and the SIGESC admin panel (admin.sisgesc.net).' },
    { question: 'Is SEO included in website development?', answer: 'Yes. Every website we build includes technical SEO: semantic HTML, meta titles and descriptions, Open Graph tags, JSON-LD structured data, sitemap-ready structure, and performance optimization.' },
    { question: 'How do I get a quote for my project?', answer: 'Contact us at commercial@zyvoerp.com or call +1 (973) 524-9725. Share your goals, timeline, and any reference sites — we will respond with a clear scope and fixed or phased pricing.' },
  ];
}

function buildFaqsFr(code: MarketCode): DevelopmentFaq[] {
  const country = countryLabel(resolveDevMarket(code));
  return [
    { question: 'ZYVO vend-il uniquement son logiciel ou réalise-t-il aussi des projets sur mesure ?', answer: 'Les deux. ZYVO est notre plateforme ERP cloud, et nous proposons aussi la création de sites web, le développement de logiciels métier et la maintenance pour les entreprises qui ont besoin de solutions personnalisées.' },
    { question: `Pourquoi vos tarifs sont-ils compétitifs en ${country} ?`, answer: 'Nous combinons des processus efficaces, des outils modernes et une équipe focalisée pour livrer de la qualité sans la surcouche des grandes agences. Le SEO technique est inclus dans chaque site web.' },
    { question: 'Puis-je voir des exemples de vos réalisations ?', answer: 'Oui. Portfolio en ligne : BB Salon Suites (bbsalonsuites.com), SIGESC (sisgesc.net), Espaço Estético Malaca (espaco-estetico-malaca.com) et le panneau admin SIGESC (admin.sisgesc.net).' },
    { question: 'Le référencement Google est-il inclus ?', answer: 'Oui. Chaque site inclut le SEO technique : HTML sémantique, meta tags, Open Graph, JSON-LD, structure sitemap et optimisation des performances.' },
    { question: 'Comment obtenir un devis ?', answer: `Contactez-nous via le formulaire sur /contact ou par email à commercial@zyvoerp.com. Décrivez votre projet — nous répondons avec un devis clair et un planning.` },
  ];
}

export function getDevelopmentHubContent(marketCode: MarketCode): DevelopmentHubContent {
  return marketCode === 'us' ? buildHubEn() : buildHubFr(marketCode);
}

export function getDevelopmentServices(marketCode: MarketCode): DevelopmentService[] {
  return marketCode === 'us' ? buildServicesEn() : buildServicesFr(marketCode);
}

export function getDevelopmentService(marketCode: MarketCode, slug: DevelopmentServiceSlug): DevelopmentService | undefined {
  return getDevelopmentServices(marketCode).find((s) => s.slug === slug);
}

export function getServicePricingTiers(marketCode: MarketCode): ServicePricingTier[] {
  return buildTiers(marketCode);
}

export function getDevelopmentFaqs(marketCode: MarketCode): DevelopmentFaq[] {
  return marketCode === 'us' ? buildFaqsEn() : buildFaqsFr(marketCode);
}

// Backward-compatible US exports
export const developmentServices = buildServicesEn();
export const hubMeta = buildHubEn();
export const servicePricingTiers = buildTiers('us');
export const developmentFaqs = buildFaqsEn();

export function getServiceBySlug(slug: string): DevelopmentService | undefined {
  return developmentServices.find((s) => s.slug === slug);
}

export { DEVELOPMENT_SERVICE_SLUGS };
