export interface Integration {
  name: string;
  slug: string;
  category: 'social' | 'delivery' | 'payments';
  description: string;
  status: 'available' | 'in-progress';
  logo: string;
}

export const integrations: Integration[] = [
  {
    name: 'Facebook',
    slug: 'facebook',
    category: 'social',
    description: 'Manage Facebook Business Pages, Messenger conversations, and ad-driven leads directly from ZYVO.',
    status: 'available',
    logo: '/images/integrations/facebook.svg',
  },
  {
    name: 'Instagram',
    slug: 'instagram',
    category: 'social',
    description: 'Connect Instagram Business accounts to respond to DMs, track engagement, and sync product catalogs.',
    status: 'available',
    logo: '/images/integrations/instagram.svg',
  },
  {
    name: 'WhatsApp Business',
    slug: 'whatsapp',
    category: 'social',
    description: 'Full WhatsApp Business API integration for order updates, appointment reminders, and customer support.',
    status: 'available',
    logo: '/images/integrations/whatsapp.svg',
  },
  {
    name: 'Uber Eats',
    slug: 'uber-eats',
    category: 'delivery',
    description: 'Sync menus, receive orders, and update inventory automatically from Uber Eats.',
    status: 'in-progress',
    logo: '/images/integrations/uber-eats.svg',
  },
  {
    name: 'DoorDash',
    slug: 'doordash',
    category: 'delivery',
    description: 'Import DoorDash orders into ZYVO POS and track delivery performance in one dashboard.',
    status: 'in-progress',
    logo: '/images/integrations/doordash.svg',
  },
  {
    name: 'Grubhub',
    slug: 'grubhub',
    category: 'delivery',
    description: 'Centralize Grubhub orders with in-store sales and kitchen workflow management.',
    status: 'in-progress',
    logo: '/images/integrations/grubhub.svg',
  },
];

export const metaIntegrations = integrations.filter((i) => i.category === 'social');
export const deliveryIntegrations = integrations.filter((i) => i.category === 'delivery');
