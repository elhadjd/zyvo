import type { LucideIcon } from 'lucide-react';
import { Store, Factory, Heart, Utensils, Briefcase, ShoppingBag } from 'lucide-react';

export interface Industry {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
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
      { value: '800+', label: 'US Retailers' },
      { value: '35%', label: 'Avg. Revenue Growth' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
  },
  {
    slug: 'manufacturing',
    title: 'Manufacturing ERP Software',
    description:
      'Streamline production, manage raw materials, and optimize your supply chain with ZYVO manufacturing management tools.',
    icon: Factory,
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
      { value: '200+', label: 'Manufacturers' },
      { value: '25%', label: 'Cost Reduction' },
      { value: '40%', label: 'Less Stockouts' },
    ],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare Practice Management',
    description:
      'HIPAA-ready practice management for clinics, dental offices, and healthcare providers across the United States.',
    icon: Heart,
    metaTitle: 'Healthcare Practice Management Software | ZYVO',
    metaDescription:
      'HIPAA-compliant scheduling, billing, and patient management for US healthcare practices. Secure and easy to use.',
    keywords:
      'healthcare practice management, HIPAA software, medical office software, clinic management USA',
    challenges: [
      'HIPAA compliance and data security',
      'Patient scheduling and no-show reduction',
      'Medical billing and insurance claims',
      'Staff scheduling across multiple providers',
    ],
    solutions: ['scheduling', 'invoicing', 'employee-management', 'financial-management'],
    stats: [
      { value: '150+', label: 'Healthcare Practices' },
      { value: 'HIPAA', label: 'Ready Platform' },
      { value: '50%', label: 'Fewer No-Shows' },
    ],
  },
  {
    slug: 'hospitality',
    title: 'Hospitality & Restaurant Management',
    description:
      'Manage reservations, staff, inventory, and finances for restaurants, hotels, and hospitality businesses.',
    icon: Utensils,
    metaTitle: 'Restaurant & Hospitality Management Software | ZYVO',
    metaDescription:
      'POS, scheduling, inventory, and financial management for US restaurants and hospitality businesses. Try ZYVO free.',
    keywords:
      'restaurant management software, hospitality software, restaurant POS USA, hotel management',
    challenges: [
      'High staff turnover and scheduling complexity',
      'Food cost control and waste reduction',
      'Managing reservations and table turnover',
      'Multi-location menu and pricing consistency',
    ],
    solutions: ['point-of-sale', 'employee-management', 'inventory-management', 'scheduling'],
    stats: [
      { value: '400+', label: 'Restaurants' },
      { value: '20%', label: 'Food Cost Savings' },
      { value: '3x', label: 'Faster Checkout' },
    ],
  },
  {
    slug: 'professional-services',
    title: 'Professional Services Management',
    description:
      'Project tracking, time billing, invoicing, and client management for consultants, agencies, and professional firms.',
    icon: Briefcase,
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
      { value: '350+', label: 'Service Firms' },
      { value: '2x', label: 'Faster Invoicing' },
      { value: '30%', label: 'More Billable Hours' },
    ],
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce Business Management',
    description:
      'Run your online business with integrated inventory, order fulfillment, marketing analytics, and financial reporting.',
    icon: ShoppingBag,
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
      { value: '600+', label: 'E-Commerce Brands' },
      { value: '45%', label: 'Revenue Growth' },
      { value: '0%', label: 'Transaction Fees' },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
