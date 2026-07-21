import type { FAQItem } from './faqs';
import { getModuleHeroImage } from './module-images';

export interface IndustryLanding {
  slug: string;
  path: string;
  industryName: string;
  headline: string;
  subheadline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroImage: string;
  heroImageAlt: string;
  features: { title: string; description: string }[];
  benefits: string[];
  faqs: FAQItem[];
}

export const industryLandings: IndustryLanding[] = [
  {
    slug: 'salon-management-software',
    path: '/salon-management-software',
    industryName: 'Salons',
    headline: 'Salon Management Software Built for Busy Teams',
    subheadline:
      'Appointments, walk-in queues, SMS updates, inventory, and payments—so your stylists can focus on clients, not paperwork.',
    metaTitle: 'Salon Management Software for US Salons | ZYVO',
    metaDescription:
      'Manage appointments, customer queues, SMS notifications, inventory, and POS for your salon. ZYVO helps US salons run smoother every day.',
    keywords: 'salon management software, salon POS, salon appointment software, salon queue SMS USA',
    heroImage: '/images/modules/appointment/zyvo-appointment-customer-queue-sms-salon.png',
    heroImageAlt: 'ZYVO salon management software — customer queue with SMS notifications',
    features: [
      { title: 'Appointment scheduling', description: 'Online booking, reminders, and calendar views for every stylist.' },
      { title: 'Walk-in queue & SMS', description: 'Digital queue with automatic text updates on wait time and service progress.' },
      { title: 'Client profiles', description: 'Visit history, preferences, and notes so every appointment feels personal.' },
      { title: 'Retail & inventory', description: 'Track product stock and sell retail at checkout alongside services.' },
      { title: 'Staff scheduling', description: 'Manage shifts, commissions, and stylist availability in one place.' },
      { title: 'Payments & POS', description: 'Fast checkout with tips, split payments, and receipts.' },
    ],
    benefits: [
      'Reduce walk-aways with transparent queue updates',
      'Fewer no-shows with automated reminders',
      'Sell more retail with inventory tied to services',
      'See daily revenue and stylist performance at a glance',
    ],
    faqs: [
      { question: 'Can clients join the queue without an appointment?', answer: 'Yes. Walk-in customers can check in digitally and receive SMS updates as they move through the queue.' },
      { question: 'Does ZYVO work for multi-chair salons?', answer: 'Yes. Assign services to stylists, manage multiple chairs, and view team calendars side by side.' },
      { question: 'Can I send promotions via SMS?', answer: 'Yes. Notify clients about product availability, offers, and follow-up appointments through SMS.' },
    ],
  },
  {
    slug: 'barbershop-management-software',
    path: '/barbershop-management-software',
    industryName: 'Barbershops',
    headline: 'Barbershop Software That Keeps the Chair Full',
    subheadline:
      'Queues, appointments, SMS alerts, and simple POS—built for high-volume barbershops that move fast.',
    metaTitle: 'Barbershop Management Software | ZYVO',
    metaDescription:
      'Walk-in queues, SMS wait-time alerts, appointments, and POS for US barbershops. Keep clients informed and your team organized.',
    keywords: 'barbershop software, barbershop POS, barbershop queue management, barbershop appointment app USA',
    heroImage: '/images/modules/appointment/zyvo-appointment-customer-queue-sms-salon.png',
    heroImageAlt: 'ZYVO barbershop software — walk-in queue and appointment management',
    features: [
      { title: 'Walk-in queue display', description: 'Show live wait times on screen and send SMS when a client is up next.' },
      { title: 'Quick POS checkout', description: 'Process cuts, add-ons, and product sales in seconds.' },
      { title: 'Barber schedules', description: 'Shift planning and chair assignments for your team.' },
      { title: 'Client history', description: 'Track preferred styles, visit frequency, and product purchases.' },
      { title: 'Product sales', description: 'Manage pomades, tools, and retail inventory at the counter.' },
      { title: 'Daily reports', description: 'See revenue per barber and busiest hours to staff smarter.' },
    ],
    benefits: [
      'Keep the shop organized during rush hours',
      'Let clients wait comfortably with SMS updates',
      'Track performance without manual spreadsheets',
      'Grow retail sales alongside services',
    ],
    faqs: [
      { question: 'Is ZYVO good for walk-in-only shops?', answer: 'Yes. The queue system is built for walk-in heavy barbershops with optional appointments.' },
      { question: 'Can multiple barbers use it at once?', answer: 'Yes. Each barber can have their own login, schedule, and performance reports.' },
      { question: 'Does it work on a tablet at the chair?', answer: 'Yes. ZYVO is mobile-friendly and works on tablets and phones.' },
    ],
  },
  {
    slug: 'restaurant-pos-system',
    path: '/restaurant-pos-system',
    industryName: 'Restaurants',
    headline: 'Restaurant POS & Operations in One System',
    subheadline:
      'Table management, orders, inventory, staff, and reporting—so your restaurant runs smoothly from open to close.',
    metaTitle: 'Restaurant POS System for US Restaurants | ZYVO',
    metaDescription:
      'Restaurant POS with table management, order flow, inventory, and staff scheduling. Built for US restaurants and cafés.',
    keywords: 'restaurant POS system, restaurant management software, table management POS USA',
    heroImage: getModuleHeroImage('point-of-sale'),
    heroImageAlt: 'ZYVO restaurant POS system — table management and order flow',
    features: [
      { title: 'Table management', description: 'Floor plans, table status, and turn-time tracking for dine-in.' },
      { title: 'Order & kitchen flow', description: 'Send orders to the kitchen and track preparation status.' },
      { title: 'Menu & modifiers', description: 'Flexible menus with sizes, add-ons, and combo options.' },
      { title: 'Inventory tracking', description: 'Monitor ingredients and get alerts before you run out.' },
      { title: 'Staff & shifts', description: 'Schedule servers and kitchen staff with role-based access.' },
      { title: 'Delivery integrations', description: 'Uber Eats, DoorDash, and Grubhub integrations in development.' },
    ],
    benefits: [
      'Faster table turns with clear order status',
      'Reduce waste with better inventory visibility',
      'One system for front-of-house and back-of-house',
      'Understand your best-selling items and peak hours',
    ],
    faqs: [
      { question: 'Does ZYVO support dine-in and takeout?', answer: 'Yes. Handle dine-in tables, takeout orders, and counter service from the same POS.' },
      { question: 'Can I manage multiple restaurant locations?', answer: 'Yes. Multi-location support lets you compare performance across sites.' },
      { question: 'When will delivery integrations be available?', answer: 'Integrations with Uber Eats, DoorDash, and Grubhub are actively in development. Contact us for the latest timeline.' },
    ],
  },
  {
    slug: 'retail-management-software',
    path: '/retail-management-software',
    industryName: 'Retail',
    headline: 'Retail Management Software for Modern Stores',
    subheadline:
      'POS, inventory, customers, and analytics—everything boutique and retail owners need without juggling five apps.',
    metaTitle: 'Retail Management Software for US Stores | ZYVO',
    metaDescription:
      'Retail POS, inventory management, customer CRM, and reporting for US boutiques and retail stores. Simple, cloud-based, mobile-ready.',
    keywords: 'retail management software, retail POS, boutique software, inventory retail USA',
    heroImage: getModuleHeroImage('point-of-sale'),
    heroImageAlt: 'ZYVO retail management software — POS and inventory dashboard',
    features: [
      { title: 'Retail POS', description: 'Fast checkout with barcode scanning, discounts, and returns.' },
      { title: 'Inventory control', description: 'Real-time stock levels, variants, and low-stock alerts.' },
      { title: 'Customer CRM', description: 'Purchase history and contact info to drive repeat visits.' },
      { title: 'Online store sync', description: 'Connect in-store and online inventory when you sell online.' },
      { title: 'Employee permissions', description: 'Control who can discount, refund, or view reports.' },
      { title: 'Sales analytics', description: 'Daily, weekly, and product-level performance reports.' },
    ],
    benefits: [
      'Stop overselling with live inventory',
      'Know your top products and slow movers',
      'Train new staff quickly with an intuitive POS',
      'Grow from one store to many without switching systems',
    ],
    faqs: [
      { question: 'Does ZYVO work for boutiques with variants?', answer: 'Yes. Manage sizes, colors, and SKUs with variant-level inventory tracking.' },
      { question: 'Can I use a barcode scanner?', answer: 'Yes. ZYVO supports barcode scanning for fast product lookup at checkout.' },
      { question: 'Is there an online store option?', answer: 'Yes. ZYVO includes e-commerce tools with inventory sync to your physical store.' },
    ],
  },
  {
    slug: 'clinic-management-software',
    path: '/clinic-management-software',
    industryName: 'Clinics',
    headline: 'Clinic Management Software That Simplifies Your Day',
    subheadline:
      'Appointments, patient records, billing, and staff scheduling—for small clinics that need organization without complexity.',
    metaTitle: 'Clinic Management Software for US Clinics | ZYVO',
    metaDescription:
      'Appointment scheduling, patient management, invoicing, and staff tools for US clinics and medical offices. Cloud-based and easy to use.',
    keywords: 'clinic management software, medical office software, clinic scheduling USA, small clinic software',
    heroImage: '/images/modules/appointment/zyvo-appointment-scheduling-calendar.png',
    heroImageAlt: 'ZYVO clinic management software — appointment scheduling calendar',
    features: [
      { title: 'Appointment scheduling', description: 'Book visits, manage provider calendars, and reduce no-shows with reminders.' },
      { title: 'Patient records', description: 'Store contact info, visit notes, and history in organized profiles.' },
      { title: 'Billing & invoicing', description: 'Create invoices and track payments for services rendered.' },
      { title: 'Staff management', description: 'Schedules and roles for front desk and clinical staff.' },
      { title: 'Secure access', description: 'Role-based permissions and encrypted communications.' },
      { title: 'Reporting', description: 'Appointment volume, revenue, and operational summaries.' },
    ],
    benefits: [
      'Less front-desk chaos with online booking',
      'Keep patient information organized and accessible',
      'Improve cash flow with faster invoicing',
      'Give your team tools they can learn quickly',
    ],
    faqs: [
      { question: 'Is ZYVO designed for small clinics?', answer: 'Yes. ZYVO is built for growing practices that need practical tools without enterprise complexity.' },
      { question: 'Can patients book appointments online?', answer: 'Yes. Share a booking link so patients can schedule available time slots.' },
      { question: 'How is patient data protected?', answer: 'We use encrypted communications, secure cloud hosting, daily backups, and role-based access controls. See our Security page for details.' },
    ],
  },
  {
    slug: 'pharmacy-management-software',
    path: '/pharmacy-management-software',
    industryName: 'Pharmacies',
    headline: 'Pharmacy Management Tools for Independent Pharmacies',
    subheadline:
      'Inventory, POS, customer profiles, and reporting—helping independent pharmacies run efficiently and serve their communities.',
    metaTitle: 'Pharmacy Management Software for US Pharmacies | ZYVO',
    metaDescription:
      'Inventory, POS, customer management, and reporting for US independent pharmacies. Cloud-based pharmacy management software.',
    keywords: 'pharmacy management software, independent pharmacy POS, pharmacy inventory USA',
    heroImage: getModuleHeroImage('inventory-management'),
    heroImageAlt: 'ZYVO pharmacy management software — inventory and POS tracking',
    features: [
      { title: 'Inventory management', description: 'Track products, expiry awareness, and reorder points.' },
      { title: 'Pharmacy POS', description: 'Fast checkout for OTC products and front-store sales.' },
      { title: 'Customer profiles', description: 'Purchase history and contact details for repeat customers.' },
      { title: 'Supplier & purchasing', description: 'Manage vendors and purchase orders in one workflow.' },
      { title: 'Staff access', description: 'Separate permissions for pharmacists, technicians, and cashiers.' },
      { title: 'Sales reporting', description: 'Understand product performance and daily revenue trends.' },
    ],
    benefits: [
      'Reduce stockouts with automated low-stock alerts',
      'Streamline front-store sales alongside core operations',
      'Train staff faster with an intuitive interface',
      'Get visibility into what sells and what sits on shelves',
    ],
    faqs: [
      { question: 'Is ZYVO for independent pharmacies?', answer: 'Yes. ZYVO is designed for independent and small-chain pharmacies that need practical operations tools.' },
      { question: 'Can I track OTC inventory separately?', answer: 'Yes. Organize products by category and location with detailed stock tracking.' },
      { question: 'Does ZYVO replace specialized dispensing systems?', answer: 'ZYVO focuses on inventory, POS, customers, and business operations. Evaluate your dispensing workflow needs when choosing tools.' },
    ],
  },
];

export function getIndustryLandingByPath(path: string): IndustryLanding | undefined {
  return industryLandings.find((l) => l.path === path || l.slug === path.replace(/^\//, ''));
}

export function getIndustryLandingBySlug(slug: string): IndustryLanding | undefined {
  return industryLandings.find((l) => l.slug === slug);
}
