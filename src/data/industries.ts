import type { LucideIcon } from 'lucide-react';
import { Store, Factory, Scissors, Briefcase, ShoppingBag } from 'lucide-react';

export interface Industry {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  challenges: string[];
  solutions: string[];
  stats: { value: string; label: string }[];
}

export const industries: Industry[] = [
  {
    slug: 'retail',
    title: 'Retail Business Management',
    description:
      'From single boutiques to multi-location chains, ZYVO gives US retailers the tools to sell smarter, manage inventory, and grow revenue.',
    icon: Store,
    image: '/images/hero-dashboard.png',
    imageAlt: 'ZYVO retail management dashboard on laptop',
    metaTitle: 'Retail Management Software for US Stores | ZYVO',
    metaDescription:
      'All-in-one retail management: POS, inventory, e-commerce, and analytics for US retail businesses. Trusted by 800+ retailers.',
    keywords: 'retail management software, retail POS, store management USA, multi-location retail',
    challenges: [
      'Managing inventory across multiple locations',
      'Integrating in-store and online sales channels',
      'Tracking employee performance and scheduling',
      'Understanding which products drive profit',
    ],
    solutions: ['point-of-sale', 'inventory-management', 'online-store', 'employee-management'],
    stats: [
      { value: 'POS', label: 'Built-in' },
      { value: 'Multi', label: 'Location' },
      { value: 'Cloud', label: 'Based' },
    ],
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing ERP Software',
    description:
      'Streamline production, manage raw materials, and optimize your supply chain with ZYVO manufacturing management tools.',
    icon: Factory,
    image: '/images/hero-dashboard.png',
    imageAlt: 'Manufacturing operations dashboard in ZYVO',
    metaTitle: 'Manufacturing ERP Software for US Companies | ZYVO',
    metaDescription:
      'Production planning, inventory control, and supply chain management for US manufacturers. ZYVO manufacturing ERP.',
    keywords: 'manufacturing ERP, production management software, manufacturing software USA',
    challenges: [
      'Tracking raw materials and work-in-progress',
      'Managing complex supply chains',
      'Production scheduling and capacity planning',
      'Quality control and compliance documentation',
    ],
    solutions: ['inventory-management', 'purchasing', 'logistics', 'financial-management'],
    stats: [
      { value: 'ERP', label: 'Modules' },
      { value: 'Cloud', label: 'Based' },
      { value: 'US', label: 'Focused' },
    ],
  },
  {
    slug: 'beauty-salons',
    title: 'Salons & Barbershops',
    description:
      'Manage walk-in queues, appointment scheduling, and SMS customer updates for salons, barbershops, spas, and beauty studios across the US.',
    icon: Scissors,
    image: '/images/salon-queue.png',
    imageAlt: 'Salon with digital customer queue and SMS notifications',
    metaTitle: 'Salon & Barbershop Management Software | ZYVO',
    metaDescription:
      'Customer queue management with SMS notifications, scheduling, and POS for US salons and barbershops. Keep clients informed in real time.',
    keywords:
      'salon management software, barbershop software, customer queue SMS, beauty salon POS USA, walk-in queue management',
    challenges: [
      'Managing walk-in queues during peak hours',
      'Keeping customers informed about wait times',
      'Reducing no-shows for appointments',
      'Tracking stylist performance and commissions',
    ],
    solutions: ['customer-queue-management', 'scheduling', 'point-of-sale', 'employee-management'],
    stats: [
      { value: 'SMS', label: 'Queue Alerts' },
      { value: 'Walk-in', label: 'Queues' },
      { value: 'POS', label: 'Integrated' },
    ],
  },
  {
    slug: 'professional-services',
    title: 'Professional Services Management',
    description:
      'Project tracking, time billing, invoicing, and client management for consultants, agencies, and professional firms.',
    icon: Briefcase,
    image: '/images/hero-dashboard.png',
    imageAlt: 'Professional services business dashboard',
    metaTitle: 'Professional Services Software for US Firms | ZYVO',
    metaDescription:
      'Time tracking, project management, and invoicing for US consulting firms and professional services. ZYVO Pro Services.',
    keywords:
      'professional services software, consulting firm software, time billing, project management USA',
    challenges: [
      'Tracking billable hours across projects',
      'Managing client relationships and contracts',
      'Accurate project profitability analysis',
      'Timely invoicing and cash flow management',
    ],
    solutions: ['invoicing', 'scheduling', 'financial-management', 'employee-management'],
    stats: [
      { value: 'Billing', label: 'Tools' },
      { value: 'Projects', label: 'Tracking' },
      { value: 'Cloud', label: 'Based' },
    ],
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce Business Management',
    description:
      'Run your online business with integrated inventory, order fulfillment, marketing analytics, and financial reporting.',
    icon: ShoppingBag,
    image: '/images/integrations-hub.png',
    imageAlt: 'E-commerce integrations and order management',
    metaTitle: 'E-Commerce Management Platform for US Brands | ZYVO',
    metaDescription:
      'Online store, inventory sync, order management, and marketing analytics for US e-commerce brands. Scale with ZYVO.',
    keywords:
      'e-commerce management software, online business platform, Shopify alternative, e-commerce ERP USA',
    challenges: [
      'Syncing inventory across sales channels',
      'Managing order fulfillment and returns',
      'Understanding marketing ROI by channel',
      'Scaling operations without adding headcount',
    ],
    solutions: ['online-store', 'inventory-management', 'marketing-analytics', 'logistics'],
    stats: [
      { value: 'Online', label: 'Store' },
      { value: 'Inventory', label: 'Sync' },
      { value: 'Analytics', label: 'Built-in' },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
