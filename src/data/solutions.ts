import type { LucideIcon } from 'lucide-react';
import {
  ShoppingCart,
  Package,
  Users,
  Truck,
  Calendar,
  BarChart3,
  Globe,
  CreditCard,
  FileText,
  ShoppingBag,
  ListOrdered,
} from 'lucide-react';

export interface Solution {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  benefits: string[];
  features: string[];
  useCases: string[];
  image?: string;
  imageAlt?: string;
}

export const solutions: Solution[] = [
  {
    slug: 'point-of-sale',
    title: 'Point of Sale (POS) System',
    shortTitle: 'Point of Sale',
    description:
      'Streamline in-store and mobile sales with a fast, intuitive POS system built for US retail and service businesses.',
    category: 'Retail',
    icon: ShoppingCart,
    metaTitle: 'Point of Sale Software for US Businesses | ZYVO POS',
    metaDescription:
      'ZYVO POS helps US retailers process sales faster, manage customers, and sync inventory in real time. Start your 7-day free trial today.',
    keywords: 'point of sale software, POS system USA, retail POS, mobile POS, small business POS',
    benefits: [
      'Process transactions 3x faster than legacy systems',
      'Accept credit cards, contactless, and mobile wallets',
      'Real-time inventory sync across all locations',
      'Built-in customer loyalty and rewards programs',
    ],
    features: [
      'Touch-screen checkout optimized for speed',
      'Barcode scanning and product lookup',
      'Split payments and partial refunds',
      'Offline mode with automatic sync',
      'Sales reports by employee, location, and product',
      'Integration with QuickBooks and Stripe',
    ],
    useCases: [
      'Retail stores and boutiques',
      'Restaurants and cafés',
      'Salons and service providers',
      'Pop-up shops and farmers markets',
    ],
  },
  {
    slug: 'inventory-management',
    title: 'Inventory Management Software',
    shortTitle: 'Inventory Management',
    description:
      'Track stock levels in real time, automate reorder alerts, and optimize inventory across warehouses and stores.',
    category: 'Operations',
    icon: Package,
    metaTitle: 'Inventory Management Software for Small Business | ZYVO',
    metaDescription:
      'Real-time inventory tracking, automated reorder points, and multi-location stock management for US businesses. Try ZYVO free for 7 days.',
    keywords:
      'inventory management software, stock tracking, warehouse management, inventory control USA',
    benefits: [
      'Reduce stockouts by up to 40% with smart alerts',
      'Eliminate manual spreadsheet tracking',
      'Track inventory across multiple warehouses',
      'Lower carrying costs with demand forecasting',
    ],
    features: [
      'Real-time stock level monitoring',
      'Automated low-stock and reorder alerts',
      'Barcode and SKU management',
      'Batch and serial number tracking',
      'Supplier and purchase order integration',
      'Inventory valuation reports (FIFO, LIFO, weighted average)',
    ],
    useCases: [
      'Wholesale distributors',
      'E-commerce fulfillment',
      'Manufacturing with raw materials',
      'Multi-store retail chains',
    ],
  },
  {
    slug: 'employee-management',
    title: 'Employee Management & HR Software',
    shortTitle: 'Employee Management',
    description:
      'Manage scheduling, time tracking, payroll integration, and team communication from one HR platform.',
    category: 'HR',
    icon: Users,
    metaTitle: 'Employee Management Software for US SMBs | ZYVO HR',
    metaDescription:
      'Simplify HR with scheduling, time tracking, and employee records for US small businesses. ZYVO HR starts at $20/month.',
    keywords:
      'employee management software, HR software small business, scheduling software, time tracking USA',
    benefits: [
      'Cut scheduling conflicts by 60%',
      'Automate time-off requests and approvals',
      'Stay compliant with US labor regulations',
      'Reduce payroll processing errors',
    ],
    features: [
      'Drag-and-drop shift scheduling',
      'Clock-in/clock-out with geofencing',
      'PTO and leave management',
      'Employee self-service portal',
      'Performance review tracking',
      'ADP and Gusto payroll integration',
    ],
    useCases: [
      'Restaurants with shift workers',
      'Retail with part-time staff',
      'Healthcare clinics',
      'Field service teams',
    ],
  },
  {
    slug: 'logistics',
    title: 'Logistics & Supply Chain Management',
    shortTitle: 'Logistics',
    description:
      'Optimize delivery routes, track shipments in real time, and manage your entire supply chain from one dashboard.',
    category: 'Operations',
    icon: Truck,
    metaTitle: 'Logistics Management Software for US Businesses | ZYVO',
    metaDescription:
      'Route optimization, shipment tracking, and supply chain visibility for US companies. Manage logistics efficiently with ZYVO.',
    keywords:
      'logistics software, supply chain management, delivery tracking, route optimization USA',
    benefits: [
      'Reduce delivery costs by up to 25%',
      'Real-time shipment visibility for customers',
      'Optimize routes to save fuel and time',
      'Improve on-time delivery rates',
    ],
    features: [
      'Route planning and optimization',
      'Real-time GPS shipment tracking',
      'Carrier and freight management',
      'Delivery proof with photo capture',
      'Returns and reverse logistics',
      'Integration with FedEx, UPS, and USPS',
    ],
    useCases: [
      'Last-mile delivery companies',
      'Wholesale distributors',
      'E-commerce fulfillment',
      'Manufacturing supply chains',
    ],
  },
  {
    slug: 'scheduling',
    title: 'Business Scheduling Software',
    shortTitle: 'Scheduling',
    description:
      'Smart calendar management for appointments, tasks, resources, and team availability across your organization.',
    category: 'Productivity',
    icon: Calendar,
    metaTitle: 'Business Scheduling Software | ZYVO Calendar',
    metaDescription:
      'Appointment scheduling, resource booking, and team calendars for US service businesses. Book smarter with ZYVO.',
    keywords:
      'scheduling software, appointment booking, calendar management, resource scheduling USA',
    benefits: [
      'Reduce no-shows with automated reminders',
      'Eliminate double-booking conflicts',
      'Let customers book online 24/7',
      'Sync with Google Calendar and Outlook',
    ],
    features: [
      'Online booking portal for customers',
      'Automated SMS and email reminders',
      'Resource and room scheduling',
      'Recurring appointment support',
      'Waitlist management',
      'Team availability views',
    ],
    useCases: [
      'Salons and barbershops',
      'Spas and nail studios',
      'Consulting firms',
      'Fitness studios and gyms',
    ],
  },
  {
    slug: 'customer-queue-management',
    title: 'Customer Queue Management with SMS',
    shortTitle: 'Queue & SMS',
    description:
      'Manage walk-in customer queues and automatically notify clients via SMS about wait times, service progress, product availability, and promotional actions.',
    category: 'Service',
    icon: ListOrdered,
    image: '/images/modules/appointment/zyvo-appointment-customer-queue-sms-salon.png',
    imageAlt: 'ZYVO customer queue management — salon walk-in queue with SMS notifications',
    metaTitle: 'Customer Queue Management with SMS for Salons | ZYVO',
    metaDescription:
      'Digital walk-in queue with SMS notifications for salons, barbershops, and service businesses. Update customers on wait time, service progress, and offers.',
    keywords:
      'customer queue management, SMS queue notifications, salon queue software, barbershop waitlist, walk-in queue USA',
    benefits: [
      'Reduce walk-aways by up to 60% with transparent wait times',
      'Send automatic SMS updates on queue position and service progress',
      'Notify customers about product availability and promotions',
      'Free staff from manually calling out customer names',
    ],
    features: [
      'Digital walk-in queue with estimated wait times',
      'Automatic SMS when customer is next in line',
      'Service progress updates sent to customer phone',
      'Product and promotion alerts via SMS',
      'QR code check-in for contactless queue joining',
      'Display board for in-store queue status',
      'Integration with scheduling and POS modules',
    ],
    useCases: [
      'Hair salons and barbershops',
      'Nail salons and spas',
      'Auto service centers',
      'Busy retail service counters',
    ],
  },
  {
    slug: 'marketing-analytics',
    title: 'Marketing Analytics & Campaign Tracking',
    shortTitle: 'Marketing Analytics',
    description:
      'Track campaign performance, customer acquisition costs, and ROI with real-time marketing dashboards.',
    category: 'Marketing',
    icon: BarChart3,
    metaTitle: 'Marketing Analytics Software for US Businesses | ZYVO',
    metaDescription:
      'Measure marketing ROI, track campaigns, and understand customer behavior with ZYVO marketing analytics. Free 7-day trial.',
    keywords:
      'marketing analytics software, campaign tracking, marketing ROI, customer analytics USA',
    benefits: [
      'Identify your highest-ROI marketing channels',
      'Track customer journey from first touch to purchase',
      'Reduce customer acquisition costs',
      'Make data-driven marketing decisions',
    ],
    features: [
      'Multi-channel campaign tracking',
      'Customer segmentation and cohort analysis',
      'Email marketing performance metrics',
      'Social media ROI dashboards',
      'Attribution modeling',
      'Integration with Google Ads and Meta Ads',
    ],
    useCases: [
      'E-commerce brands',
      'SaaS companies',
      'Local service businesses',
      'Multi-location franchises',
    ],
  },
  {
    slug: 'online-store',
    title: 'E-Commerce & Online Store Builder',
    shortTitle: 'Online Store',
    description:
      'Launch and manage your online store with seamless inventory sync, payment processing, and order fulfillment.',
    category: 'E-commerce',
    icon: Globe,
    metaTitle: 'E-Commerce Platform for US Small Business | ZYVO Store',
    metaDescription:
      'Build your online store with ZYVO. Inventory sync, secure checkout, and order management for US e-commerce businesses.',
    keywords:
      'e-commerce platform, online store builder, small business e-commerce, Shopify alternative USA',
    benefits: [
      'Launch your store in under 24 hours',
      'Automatic inventory sync with POS',
      'Mobile-optimized checkout experience',
      'No transaction fees on Growth plan and above',
    ],
    features: [
      'Drag-and-drop store builder',
      'Product catalog with variants',
      'Secure checkout with Stripe',
      'Order and fulfillment management',
      'SEO-friendly product pages',
      'Abandoned cart recovery emails',
    ],
    useCases: [
      'Retail brands going online',
      'Handmade and artisan products',
      'B2B wholesale portals',
      'Subscription box businesses',
    ],
  },
  {
    slug: 'financial-management',
    title: 'Financial Management & Accounting Software',
    shortTitle: 'Financial Management',
    description:
      'Complete financial oversight with automated bookkeeping, expense tracking, and real-time financial reporting.',
    category: 'Finance',
    icon: CreditCard,
    metaTitle: 'Financial Management Software for US SMBs | ZYVO Finance',
    metaDescription:
      'Automated bookkeeping, expense tracking, and financial reports for US small businesses. ZYVO Finance integrates with your bank.',
    keywords:
      'financial management software, small business accounting, bookkeeping software USA, expense tracking',
    benefits: [
      'Save 10+ hours per month on bookkeeping',
      'Real-time cash flow visibility',
      'Automated bank reconciliation',
      'Tax-ready financial reports',
    ],
    features: [
      'Automated bank feed import',
      'Expense categorization with AI',
      'Profit & loss and balance sheet reports',
      'Budget vs. actual tracking',
      'Multi-currency support',
      'QuickBooks and Xero export',
    ],
    useCases: [
      'Small business owners',
      'Franchise operators',
      'Non-profit organizations',
      'Growing startups',
    ],
  },
  {
    slug: 'invoicing',
    title: 'Invoicing & Billing Software',
    shortTitle: 'Invoicing',
    description:
      'Create professional invoices, send automatic payment reminders, and get paid faster with online payment links.',
    category: 'Finance',
    icon: FileText,
    metaTitle: 'Invoicing Software for US Small Business | ZYVO Invoicing',
    metaDescription:
      'Professional invoicing with automatic reminders and online payments. Get paid 2x faster with ZYVO invoicing software.',
    keywords:
      'invoicing software, billing software, online invoicing USA, invoice generator small business',
    benefits: [
      'Get paid 2x faster with online payment links',
      'Reduce late payments with auto-reminders',
      'Professional branded invoice templates',
      'Track invoice status in real time',
    ],
    features: [
      'Customizable invoice templates',
      'Recurring invoice automation',
      'Online payment via credit card and ACH',
      'Automatic payment reminders',
      'Late fee calculation',
      'Client portal for invoice history',
    ],
    useCases: [
      'Freelancers and consultants',
      'Contractors and tradespeople',
      'Professional services firms',
      'B2B suppliers',
    ],
  },
  {
    slug: 'purchasing',
    title: 'Purchasing & Procurement Software',
    shortTitle: 'Purchasing',
    description:
      'Streamline procurement with vendor management, purchase orders, approval workflows, and spend analytics.',
    category: 'Operations',
    icon: ShoppingBag,
    metaTitle: 'Purchasing & Procurement Software | ZYVO Purchasing',
    metaDescription:
      'Manage vendors, purchase orders, and procurement workflows for US businesses. Control spending with ZYVO purchasing software.',
    keywords:
      'purchasing software, procurement software, purchase order management, vendor management USA',
    benefits: [
      'Reduce procurement costs by up to 15%',
      'Eliminate unauthorized purchases',
      'Centralize vendor relationships',
      'Track spending by department and project',
    ],
    features: [
      'Purchase order creation and approval',
      'Vendor database and performance tracking',
      'Three-way matching (PO, receipt, invoice)',
      'Spend analytics and reporting',
      'Budget controls and approval workflows',
      'Integration with inventory management',
    ],
    useCases: [
      'Manufacturing companies',
      'Restaurant groups',
      'Healthcare facilities',
      'Government contractors',
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
