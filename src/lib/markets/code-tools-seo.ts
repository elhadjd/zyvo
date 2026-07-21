import type { MarketCode } from '@/lib/markets/types';
import type { GnSeoPageMeta } from '@/data/markets/gn-seo';
import { getCodeConfig, getCodeGeneratorBySlug } from '@/data/code-generators/config';

const COUNTRY_CODE_SEO: Record<
  'sn' | 'gn' | 'ci',
  {
    hub: { title: string; description: string; keywords: string };
    generators: Record<string, { title: string; description: string; keywords: string; h1: string }>;
  }
> = {
  sn: {
    hub: {
      title: 'Outils gratuits Sénégal — QR code, code-barres & calculateurs fiscaux | ZYVO',
      description:
        'Générateur QR code gratuit, générateur code-barres EAN-13 et calculateurs fiscaux au Sénégal. 100 % gratuit, sans inscription — téléchargement PNG/SVG instantané à Dakar.',
      keywords:
        'outils gratuits Sénégal, générateur QR code gratuit Dakar, créer QR code Sénégal, générateur code-barres gratuit, EAN-13 Sénégal, calculateur TVA Sénégal, outils en ligne gratuits FCFA',
    },
    generators: {
      'generateur-qr-code': {
        title: 'Générateur QR code gratuit Sénégal — lien, Wi-Fi, contact, WhatsApp | ZYVO',
        description:
          'Créez des QR codes gratuits au Sénégal : liens web, e-mail, téléphone, SMS, WhatsApp, Wi-Fi et carte contact vCard. Téléchargement PNG/SVG sans inscription — idéal pour commerces à Dakar.',
        keywords:
          'générateur QR code gratuit Sénégal, créer QR code Dakar, QR code WiFi gratuit, QR code WhatsApp Sénégal, QR code contact vCard, générateur QR code lien, QR code restaurant Dakar, télécharger QR code PNG',
        h1: 'Générateur QR code gratuit — Sénégal',
      },
      'generateur-code-barres': {
        title: 'Générateur code-barres gratuit Sénégal — EAN-13, Code 128, UPC | ZYVO',
        description:
          'Générez des codes-barres gratuits au Sénégal : EAN-13, Code 128, Code 39, UPC-A pour produits et inventaire. Téléchargement PNG/SVG — idéal pour boutiques et PME à Dakar.',
        keywords:
          'générateur code-barres gratuit Sénégal, créer code-barres EAN13 Dakar, Code 128 générateur, étiquette code-barres Sénégal, barcode generator Sénégal, code-barres produit FCFA, imprimer code-barres gratuit',
        h1: 'Générateur code-barres gratuit — Sénégal',
      },
    },
  },
  gn: {
    hub: {
      title: 'Outils gratuits Guinée — QR code, code-barres & calculateurs fiscaux | ZYVO',
      description:
        'Générateur QR code gratuit, générateur code-barres EAN-13 et calculateurs fiscaux en Guinée. 100 % gratuit, sans inscription — téléchargement PNG/SVG instantané à Conakry.',
      keywords:
        'outils gratuits Guinée, générateur QR code gratuit Conakry, créer QR code Guinée, générateur code-barres gratuit GNF, EAN-13 Guinée, calculateur TVA Guinée, outils en ligne gratuits',
    },
    generators: {
      'generateur-qr-code': {
        title: 'Générateur QR code gratuit Guinée — lien, Wi-Fi, contact, WhatsApp | ZYVO',
        description:
          'Créez des QR codes gratuits en Guinée : liens web, e-mail, téléphone, SMS, WhatsApp, Wi-Fi et carte contact vCard. Téléchargement PNG/SVG sans inscription — idéal pour commerces à Conakry.',
        keywords:
          'générateur QR code gratuit Guinée, créer QR code Conakry, QR code WiFi gratuit Guinée, QR code WhatsApp Guinée, QR code contact vCard, générateur QR code lien GNF, télécharger QR code PNG',
        h1: 'Générateur QR code gratuit — Guinée',
      },
      'generateur-code-barres': {
        title: 'Générateur code-barres gratuit Guinée — EAN-13, Code 128, UPC | ZYVO',
        description:
          'Générez des codes-barres gratuits en Guinée : EAN-13, Code 128, Code 39, UPC-A pour produits et inventaire. Téléchargement PNG/SVG — idéal pour boutiques à Conakry.',
        keywords:
          'générateur code-barres gratuit Guinée, créer code-barres EAN13 Conakry, Code 128 générateur Guinée, étiquette code-barres GNF, barcode generator Guinée, code-barres produit gratuit',
        h1: 'Générateur code-barres gratuit — Guinée',
      },
    },
  },
  ci: {
    hub: {
      title: "Outils gratuits Côte d'Ivoire — QR code, code-barres & calculateurs fiscaux | ZYVO",
      description:
        "Générateur QR code gratuit, générateur code-barres EAN-13 et calculateurs fiscaux en Côte d'Ivoire. 100 % gratuit, sans inscription — téléchargement PNG/SVG instantané à Abidjan.",
      keywords:
        "outils gratuits Côte d'Ivoire, générateur QR code gratuit Abidjan, créer QR code CI, générateur code-barres gratuit FCFA, EAN-13 Côte d'Ivoire, calculateur TVA CI, outils en ligne gratuits",
    },
    generators: {
      'generateur-qr-code': {
        title: "Générateur QR code gratuit Côte d'Ivoire — lien, Wi-Fi, contact, WhatsApp | ZYVO",
        description:
          "Créez des QR codes gratuits en Côte d'Ivoire : liens web, e-mail, téléphone, SMS, WhatsApp, Wi-Fi et carte contact vCard. Téléchargement PNG/SVG — idéal pour commerces à Abidjan.",
        keywords:
          "générateur QR code gratuit Côte d'Ivoire, créer QR code Abidjan, QR code WiFi gratuit CI, QR code WhatsApp Côte d'Ivoire, QR code contact vCard, générateur QR code lien FCFA",
        h1: "Générateur QR code gratuit — Côte d'Ivoire",
      },
      'generateur-code-barres': {
        title: "Générateur code-barres gratuit Côte d'Ivoire — EAN-13, Code 128, UPC | ZYVO",
        description:
          "Générez des codes-barres gratuits en Côte d'Ivoire : EAN-13, Code 128, Code 39, UPC-A pour produits et inventaire. Téléchargement PNG/SVG — idéal pour boutiques à Abidjan.",
        keywords:
          "générateur code-barres gratuit Côte d'Ivoire, créer code-barres EAN13 Abidjan, Code 128 générateur CI, étiquette code-barres FCFA, barcode generator Côte d'Ivoire",
        h1: "Générateur code-barres gratuit — Côte d'Ivoire",
      },
    },
  },
};

export const US_CODE_TOOLS_SEO: Record<string, GnSeoPageMeta> = {
  hub: {
    title: 'Free Tools USA — QR Code, Barcode & Tax Calculators | ZYVO',
    description:
      'Free QR code generator, barcode generator (EAN-13, Code 128, UPC) and tax calculators for Americans. 100% free, no signup — instant PNG/SVG download.',
    keywords:
      'free online tools USA, free QR code generator, barcode generator free, EAN-13 maker, tax calculator USA, free business tools',
    path: '/tools',
    h1: 'Free Tools — United States',
    breadcrumb: 'Free Tools',
    schemaType: 'service',
  },
  'qr-code-generator': {
    title: 'Free QR Code Generator — Links, Wi-Fi, Contacts, WhatsApp | ZYVO',
    description:
      'Create free QR codes: website links, email, phone, SMS, WhatsApp, Wi-Fi and vCard contacts. PNG/SVG download with no signup — perfect for US businesses.',
    keywords:
      'free QR code generator, create QR code online, QR code maker USA, WiFi QR code generator, vCard QR code, WhatsApp QR code, download QR code PNG free',
    path: '/tools/qr-code-generator',
    h1: 'Free QR Code Generator',
    breadcrumb: 'QR Code Generator',
    schemaType: 'service',
  },
  'barcode-generator': {
    title: 'Free Barcode Generator — EAN-13, Code 128, UPC-A | ZYVO',
    description:
      'Generate free barcodes: EAN-13, Code 128, Code 39, UPC-A for products and inventory. PNG/SVG download — ideal for US retail and warehouses.',
    keywords:
      'free barcode generator, EAN-13 barcode maker, Code 128 generator USA, UPC barcode generator, create barcode online free, product barcode maker',
    path: '/tools/barcode-generator',
    h1: 'Free Barcode Generator',
    breadcrumb: 'Barcode Generator',
    schemaType: 'service',
  },
};

export function isCodeGeneratorSlug(marketCode: string, slug: string): boolean {
  return getCodeGeneratorBySlug(marketCode, slug) !== null;
}

export function getCodeToolsPageSeo(marketCode: MarketCode, slug: string[]): GnSeoPageMeta | null {
  if (slug[0] !== 'outils') return null;

  const prefix = `/${marketCode}/outils`;

  if (slug.length === 1) {
    const countrySeo = COUNTRY_CODE_SEO[marketCode as 'sn' | 'gn' | 'ci'];
    if (!countrySeo) return null;
    return {
      title: countrySeo.hub.title,
      description: countrySeo.hub.description,
      keywords: countrySeo.hub.keywords,
      path: prefix,
      h1: getCodeConfig(marketCode).content.hubTitle,
      breadcrumb: 'Outils gratuits',
      schemaType: 'service',
    };
  }

  if (slug.length === 2) {
    const genSlug = slug[1];
    const generator = getCodeGeneratorBySlug(marketCode, genSlug);
    if (!generator) return null;

    const countrySeo = COUNTRY_CODE_SEO[marketCode as 'sn' | 'gn' | 'ci'];
    const seo = countrySeo?.generators[genSlug];
    if (!seo) return null;

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      path: `${prefix}/${genSlug}`,
      h1: seo.h1,
      breadcrumb: generator.title,
      schemaType: 'service',
    };
  }

  return null;
}

export function getUsCodeToolsSeo(slug: string): GnSeoPageMeta {
  return US_CODE_TOOLS_SEO[slug] ?? US_CODE_TOOLS_SEO.hub;
}

export function getFreeToolsHubSeo(marketCode: MarketCode, slug: string[]): GnSeoPageMeta | null {
  if (slug[0] !== 'outils' && slug[0] !== 'tools') return null;
  if (slug.length === 1) {
    return getCodeToolsPageSeo(marketCode, slug);
  }
  return getCodeToolsPageSeo(marketCode, slug);
}
