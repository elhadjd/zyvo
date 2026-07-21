import type { BarcodeFormat, QrContentType } from './types';

export interface QrEmailFields {
  email: string;
  subject?: string;
  body?: string;
}

export interface QrSmsFields {
  phone: string;
  message?: string;
}

export interface QrWifiFields {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

export interface QrVcardFields {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  organization?: string;
  title?: string;
  website?: string;
  address?: string;
}

export interface QrWhatsappFields {
  phone: string;
  message?: string;
}

function escapeVcard(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export function buildQrPayload(
  type: QrContentType,
  fields: Record<string, string>
): string {
  switch (type) {
    case 'url': {
      const url = fields.url?.trim() ?? '';
      if (!url) return '';
      return url.startsWith('http') ? url : `https://${url}`;
    }
    case 'text':
      return fields.text?.trim() ?? '';
    case 'email': {
      const email = fields.email?.trim() ?? '';
      if (!email) return '';
      const subject = fields.subject?.trim();
      const body = fields.body?.trim();
      const params = new URLSearchParams();
      if (subject) params.set('subject', subject);
      if (body) params.set('body', body);
      const qs = params.toString();
      return qs ? `mailto:${email}?${qs}` : `mailto:${email}`;
    }
    case 'phone': {
      const phone = fields.phone?.replace(/\s/g, '') ?? '';
      return phone ? `tel:${phone}` : '';
    }
    case 'sms': {
      const phone = fields.phone?.replace(/\s/g, '') ?? '';
      if (!phone) return '';
      const message = fields.message?.trim();
      return message ? `smsto:${phone}:${message}` : `smsto:${phone}`;
    }
    case 'wifi': {
      const ssid = fields.ssid?.trim() ?? '';
      if (!ssid) return '';
      const encryption = fields.encryption || 'WPA';
      const password = fields.password ?? '';
      const hidden = fields.hidden === 'true' ? 'true' : 'false';
      return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};;`;
    }
    case 'vcard': {
      const firstName = fields.firstName?.trim() ?? '';
      const lastName = fields.lastName?.trim() ?? '';
      if (!firstName && !lastName) return '';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${escapeVcard(lastName)};${escapeVcard(firstName)};;;`,
        `FN:${escapeVcard(`${firstName} ${lastName}`.trim())}`,
      ];
      if (fields.phone?.trim()) lines.push(`TEL:${fields.phone.trim()}`);
      if (fields.email?.trim()) lines.push(`EMAIL:${fields.email.trim()}`);
      if (fields.organization?.trim()) lines.push(`ORG:${escapeVcard(fields.organization.trim())}`);
      if (fields.title?.trim()) lines.push(`TITLE:${escapeVcard(fields.title.trim())}`);
      if (fields.website?.trim()) lines.push(`URL:${fields.website.trim()}`);
      if (fields.address?.trim()) lines.push(`ADR:;;${escapeVcard(fields.address.trim())};;;;`);
      lines.push('END:VCARD');
      return lines.join('\n');
    }
    case 'whatsapp': {
      const phone = fields.phone?.replace(/\D/g, '') ?? '';
      if (!phone) return '';
      const message = fields.message?.trim();
      const base = `https://wa.me/${phone}`;
      return message ? `${base}?text=${encodeURIComponent(message)}` : base;
    }
    default:
      return '';
  }
}

export function validateBarcodeValue(format: BarcodeFormat, value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'empty';

  switch (format) {
    case 'EAN13':
      if (!/^\d{12,13}$/.test(trimmed)) return 'ean13';
      return null;
    case 'EAN8':
      if (!/^\d{7,8}$/.test(trimmed)) return 'ean8';
      return null;
    case 'UPC':
      if (!/^\d{11,12}$/.test(trimmed)) return 'upc';
      return null;
    case 'ITF14':
      if (!/^\d{13,14}$/.test(trimmed)) return 'itf14';
      return null;
    case 'MSI':
      if (!/^\d+$/.test(trimmed)) return 'msi';
      return null;
    case 'pharmacode':
      if (!/^\d{1,6}$/.test(trimmed) || parseInt(trimmed, 10) < 3 || parseInt(trimmed, 10) > 131070) {
        return 'pharmacode';
      }
      return null;
    case 'CODE39':
      if (!/^[A-Z0-9.\- $/+%]+$/.test(trimmed.toUpperCase())) return 'code39';
      return null;
    case 'CODE128':
    default:
      return null;
  }
}

export const BARCODE_FORMATS: {
  id: BarcodeFormat;
  labelFr: string;
  labelEn: string;
  hintFr: string;
  hintEn: string;
  example: string;
}[] = [
  {
    id: 'CODE128',
    labelFr: 'Code 128',
    labelEn: 'Code 128',
    hintFr: 'Alphanumérique — le plus polyvalent',
    hintEn: 'Alphanumeric — most versatile',
    example: 'ZYVO-2024-001',
  },
  {
    id: 'CODE39',
    labelFr: 'Code 39',
    labelEn: 'Code 39',
    hintFr: 'Lettres majuscules, chiffres et symboles',
    hintEn: 'Uppercase letters, digits and symbols',
    example: 'CODE39',
  },
  {
    id: 'EAN13',
    labelFr: 'EAN-13',
    labelEn: 'EAN-13',
    hintFr: 'Produits retail — 13 chiffres',
    hintEn: 'Retail products — 13 digits',
    example: '5901234123457',
  },
  {
    id: 'EAN8',
    labelFr: 'EAN-8',
    labelEn: 'EAN-8',
    hintFr: 'Petits produits — 8 chiffres',
    hintEn: 'Small products — 8 digits',
    example: '96385074',
  },
  {
    id: 'UPC',
    labelFr: 'UPC-A',
    labelEn: 'UPC-A',
    hintFr: 'Code-barres américain — 12 chiffres',
    hintEn: 'US barcode — 12 digits',
    example: '036000291452',
  },
  {
    id: 'ITF14',
    labelFr: 'ITF-14',
    labelEn: 'ITF-14',
    hintFr: 'Cartons et palettes — 14 chiffres',
    hintEn: 'Cartons and pallets — 14 digits',
    example: '12345678901231',
  },
  {
    id: 'MSI',
    labelFr: 'MSI',
    labelEn: 'MSI',
    hintFr: 'Entrepôt et inventaire — chiffres uniquement',
    hintEn: 'Warehouse and inventory — digits only',
    example: '1234567890',
  },
  {
    id: 'pharmacode',
    labelFr: 'Pharmacode',
    labelEn: 'Pharmacode',
    hintFr: 'Industrie pharmaceutique — 3 à 131070',
    hintEn: 'Pharmaceutical industry — 3 to 131070',
    example: '1234',
  },
];

export const QR_CONTENT_TYPES: {
  id: QrContentType;
  labelFr: string;
  labelEn: string;
  icon: string;
}[] = [
  { id: 'url', labelFr: 'Lien / URL', labelEn: 'Link / URL', icon: '🔗' },
  { id: 'text', labelFr: 'Texte libre', labelEn: 'Plain text', icon: '📝' },
  { id: 'email', labelFr: 'E-mail', labelEn: 'Email', icon: '✉️' },
  { id: 'phone', labelFr: 'Téléphone', labelEn: 'Phone', icon: '📞' },
  { id: 'sms', labelFr: 'SMS', labelEn: 'SMS', icon: '💬' },
  { id: 'whatsapp', labelFr: 'WhatsApp', labelEn: 'WhatsApp', icon: '📱' },
  { id: 'wifi', labelFr: 'Wi-Fi', labelEn: 'Wi-Fi', icon: '📶' },
  { id: 'vcard', labelFr: 'Contact (vCard)', labelEn: 'Contact (vCard)', icon: '👤' },
];
