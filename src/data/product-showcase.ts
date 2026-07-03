import type { LucideIcon } from 'lucide-react';
import {
  ShoppingCart,
  Package,
  Users,
  ListOrdered,
  UtensilsCrossed,
  Contact,
  CreditCard,
  BarChart3,
  Smartphone,
} from 'lucide-react';

export interface ProductModule {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  imageAlt: string;
}

export const productModules: ProductModule[] = [
  {
    id: 'pos',
    title: 'Point of Sale (POS)',
    description: 'Fast checkout, payments, receipts, and customer lookup at the counter or on mobile.',
    icon: ShoppingCart,
    imageAlt: 'ZYVO point of sale checkout screen',
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    description: 'Track stock levels, set reorder alerts, and manage products across locations.',
    icon: Package,
    imageAlt: 'ZYVO inventory management dashboard',
  },
  {
    id: 'employees',
    title: 'Employee Management',
    description: 'Schedules, time tracking, roles, and team communication in one place.',
    icon: Users,
    imageAlt: 'ZYVO employee scheduling interface',
  },
  {
    id: 'queues',
    title: 'Appointments & Queues',
    description: 'Walk-in queues, appointments, and SMS updates so customers always know their status.',
    icon: ListOrdered,
    imageAlt: 'ZYVO appointment and queue management',
  },
  {
    id: 'restaurant',
    title: 'Restaurant Table Management',
    description: 'Table layout, order flow, and kitchen coordination for dine-in service.',
    icon: UtensilsCrossed,
    imageAlt: 'ZYVO restaurant table management view',
  },
  {
    id: 'crm',
    title: 'Customer CRM',
    description: 'Customer profiles, purchase history, notes, and follow-up in a simple CRM.',
    icon: Contact,
    imageAlt: 'ZYVO customer relationship management',
  },
  {
    id: 'finance',
    title: 'Financial Dashboard',
    description: 'Revenue, expenses, invoices, and cash flow visibility without spreadsheet chaos.',
    icon: CreditCard,
    imageAlt: 'ZYVO financial dashboard overview',
  },
  {
    id: 'reports',
    title: 'Reports & Analytics',
    description: 'Sales, inventory, and team performance reports you can act on quickly.',
    icon: BarChart3,
    imageAlt: 'ZYVO reports and analytics charts',
  },
  {
    id: 'mobile',
    title: 'Mobile Access',
    description: 'Run key workflows from any phone or tablet—perfect for floor and field teams.',
    icon: Smartphone,
    imageAlt: 'ZYVO mobile app on smartphone',
  },
];

export const trustCards = [
  {
    title: 'Easy to use',
    description: 'Designed for busy owners and staff—not IT departments. Get productive from day one.',
  },
  {
    title: 'Fast onboarding',
    description: 'Set up your business in minutes with guided setup and import tools for your existing data.',
  },
  {
    title: 'Cloud-based',
    description: 'Access your business from anywhere. No servers to maintain or software to install.',
  },
  {
    title: 'Multi-location support',
    description: 'Manage one store or many locations with centralized reporting and local control.',
  },
  {
    title: 'Mobile friendly',
    description: 'Full functionality on phones and tablets for teams that work on the floor.',
  },
  {
    title: 'Dedicated support',
    description: 'Real people ready to help when you have questions—not endless ticket queues.',
  },
];
