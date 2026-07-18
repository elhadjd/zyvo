import type { MarketPageMeta } from '@/lib/markets/types';
import { getMarketBlogPostBySlug } from '@/data/markets/blog';

/** Mots-clés primaires identifiés pour le marché guinéen (recherche FR + concurrence locale) */
export const GN_PRIMARY_KEYWORDS = [
  'logiciel de gestion entreprise Guinée',
  'logiciel caisse Guinée',
  'ERP Guinée',
  'ERP PME Guinée',
  'logiciel POS Conakry',
  'caisse enregistreuse Guinée',
  'logiciel gestion stock Guinée',
  'application gestion commerciale Guinée',
  'logiciel boutique Conakry',
  'Orange Money caisse Guinée',
  'MTN Mobile Money gestion',
  'SYSCOHADA logiciel Guinée',
  'comptabilité TVA DGI Guinée',
  'digitalisation PME Guinée',
  'logiciel restaurant Guinée',
  'logiciel pharmacie Guinée',
  'gestion inventaire Conakry',
  'logiciel salon coiffure Guinée',
  'logiciel maquis Conakry',
  'gestion multi-magasins Guinée',
] as const;

/** Villes et communes ciblées pour le référencement local */
export const GN_GEO_TARGETS = [
  'Conakry',
  'Kaloum',
  'Ratoma',
  'Matam',
  'Dixinn',
  'Kindia',
  'Labé',
  'Kankan',
  'Nzérékoré',
  'Mamou',
] as const;

export interface GnSeoPageMeta extends MarketPageMeta {
  h1?: string;
  ogTitle?: string;
  breadcrumb?: string;
  schemaType?: 'home' | 'product' | 'service' | 'faq' | 'contact' | 'article';
  ogType?: 'website' | 'article';
}

const BASE_KEYWORDS = GN_PRIMARY_KEYWORDS.slice(0, 8).join(', ');

/** SEO par chemin de page (relatif au marché, ex. "solutions/point-of-sale") */
export const GN_PAGE_SEO: Record<string, GnSeoPageMeta> = {
  home: {
    title: 'Logiciel de Gestion Entreprise Guinée — Caisse POS, Stock & ERP PME | ZYVO',
    description:
      'ZYVO : logiciel de gestion tout-en-un pour PME en Guinée. Caisse POS Conakry, stock, facturation TVA DGI, Orange Money & MTN MoMo. Essai gratuit 7 jours en GNF.',
    keywords: `${BASE_KEYWORDS}, logiciel gestion PME Conakry, ERP cloud Guinée, franc guinéen GNF`,
    path: '/gn',
    h1: 'Logiciel de gestion d\'entreprise pour les PME guinéennes',
    ogTitle: 'ZYVO Guinée — ERP & Caisse POS pour commerçants à Conakry',
    breadcrumb: 'Accueil',
    schemaType: 'home',
  },
  features: {
    title: 'Fonctionnalités ERP — Caisse, Stock, Comptabilité SYSCOHADA | ZYVO Guinée',
    description:
      'Caisse POS, inventaire temps réel, employés, facturation TVA 18%, rapports et mode hors-ligne — fonctionnalités ZYVO adaptées aux PME guinéennes à Conakry et en province.',
    keywords:
      'fonctionnalités ERP Guinée, logiciel caisse POS Conakry, gestion stock Guinée, comptabilité SYSCOHADA, logiciel gestion employés Guinée',
    path: '/gn/features',
    h1: 'Fonctionnalités pour entreprises guinéennes',
    breadcrumb: 'Fonctionnalités',
    schemaType: 'product',
  },
  pricing: {
    title: 'Tarifs ERP Guinée — Plans en Francs Guinéens (GNF) dès 360 000 FG | ZYVO',
    description:
      'Tarifs transparents en GNF pour PME guinéennes. Plans Essentiel, Croissance et Entreprise. Paiement Orange Money, virement local. Essai gratuit 7 jours sans carte bancaire.',
    keywords:
      'tarifs ERP Guinée, prix logiciel gestion Conakry, coût caisse POS GNF, abonnement logiciel PME Guinée, ERP pas cher Guinée',
    path: '/gn/pricing',
    h1: 'Tarifs en francs guinéens (GNF)',
    breadcrumb: 'Tarifs',
    schemaType: 'product',
  },
  about: {
    title: 'À Propos — Digitalisation des PME Guinéennes | ZYVO Conakry',
    description:
      'ZYVO accompagne la digitalisation des commerçants et PME en Guinée — de Kaloum à Kindia, Labé et Kankan. ERP cloud en français, support local, conformité OHADA.',
    keywords:
      'ZYVO Guinée, entreprise logiciel Conakry, digitalisation PME Guinée, ERP francophone Afrique',
    path: '/gn/about',
    h1: 'ZYVO en Guinée',
    breadcrumb: 'À propos',
    schemaType: 'service',
  },
  contact: {
    title: 'Contact & Devis Gratuit — Logiciel Gestion Entreprise Guinée | ZYVO',
    description:
      'Demandez une démo ou un devis pour votre boutique, restaurant ou pharmacie en Guinée. Support WhatsApp en français, réponse sous 24h à Conakry.',
    keywords:
      'contact ZYVO Guinée, devis logiciel caisse Conakry, démo ERP Guinée, support logiciel gestion Guinée',
    path: '/gn/contact',
    h1: 'Contactez ZYVO Guinée',
    breadcrumb: 'Contact',
    schemaType: 'contact',
  },
  faq: {
    title: 'FAQ — Logiciel Caisse, Orange Money, TVA DGI & Connexion | ZYVO Guinée',
    description:
      'Questions fréquentes sur ZYVO en Guinée : paiements Orange Money et MTN MoMo, TVA 18% DGI, connexion 3G/4G, multi-boutiques Conakry et essai gratuit.',
    keywords:
      'FAQ logiciel gestion Guinée, Orange Money caisse Conakry, TVA DGI Guinée logiciel, ERP hors ligne Guinée',
    path: '/gn/faq',
    h1: 'Questions fréquentes',
    breadcrumb: 'FAQ',
    schemaType: 'faq',
  },
  demo: {
    title: 'Démo Gratuite — Logiciel ERP & Caisse POS pour PME Guinéennes | ZYVO',
    description:
      'Réservez une démonstration gratuite de ZYVO pour votre entreprise à Conakry ou en province. Présentation en français : caisse, stock, Mobile Money et facturation.',
    keywords:
      'démo logiciel gestion Guinée, présentation ERP Conakry, essai caisse POS Guinée',
    path: '/gn/demo',
    h1: 'Réserver une démonstration',
    breadcrumb: 'Démo',
    schemaType: 'service',
  },
  'getting-started': {
    title: 'Essai Gratuit 7 Jours — Créer un Compte ZYVO Guinée | ERP PME',
    description:
      'Démarrez votre essai gratuit ZYVO en Guinée. Aucune carte bancaire internationale. Logiciel de gestion en français, tarifs en GNF, support local.',
    keywords:
      'essai gratuit ERP Guinée, créer compte logiciel gestion Conakry, inscription ZYVO Guinée',
    path: '/gn/getting-started',
    h1: 'Commencer avec ZYVO',
    breadcrumb: 'Essai gratuit',
    schemaType: 'product',
  },
  solutions: {
    title: 'Solutions ERP — Caisse POS, Stock, Facturation & Employés | ZYVO Guinée',
    description:
      'Solutions de gestion pour PME guinéennes : caisse POS Conakry, inventaire, facturation TVA, employés, file d\'attente SMS et comptabilité — tout en français.',
    keywords:
      'solutions ERP Guinée, logiciel caisse POS Conakry, gestion stock Guinée, facturation TVA Guinée',
    path: '/gn/solutions',
    h1: 'Solutions de gestion pour la Guinée',
    breadcrumb: 'Solutions',
    schemaType: 'service',
  },
  industries: {
    title: 'Secteurs — Boutique, Restaurant, Salon, Pharmacie & Logistique | ZYVO Guinée',
    description:
      'Logiciels de gestion par secteur en Guinée : boutiques Conakry, maquis, salons de coiffure, pharmacies et transport. ERP adapté à chaque métier.',
    keywords:
      'logiciel boutique Guinée, logiciel restaurant maquis Conakry, logiciel pharmacie Guinée, ERP salon coiffure Guinée',
    path: '/gn/industries',
    h1: 'Secteurs que nous accompagnons',
    breadcrumb: 'Secteurs',
    schemaType: 'service',
  },
  // Solutions détaillées
  'solutions/point-of-sale': {
    title: 'Logiciel Caisse POS Guinée — Orange Money & MTN MoMo | ZYVO Conakry',
    description:
      'Caisse enregistreuse cloud pour boutiques et restaurants en Guinée. Encaissement Orange Money, MTN MoMo, espèces GNF. Mode hors-ligne, tickets et multi-caissiers à Conakry.',
    keywords:
      'logiciel caisse Guinée, caisse enregistreuse Conakry, POS Orange Money Guinée, logiciel point de vente Guinée, caisse mobile money Conakry',
    path: '/gn/solutions/point-of-sale',
    h1: 'Logiciel caisse (POS) pour entreprises guinéennes',
    breadcrumb: 'Caisse POS',
    schemaType: 'product',
  },
  'solutions/inventory-management': {
    title: 'Gestion de Stock Guinée — Inventaire Temps Réel Multi-Magasins | ZYVO',
    description:
      'Logiciel de gestion de stock pour commerçants guinéens. Alertes rupture, inventaires, transferts entre magasins Kaloum, Ratoma et province. Valorisation en GNF.',
    keywords:
      'logiciel gestion stock Guinée, inventaire Conakry, gestion stock boutique Guinée, logiciel inventaire PME Guinée',
    path: '/gn/solutions/inventory-management',
    h1: 'Gestion d\'inventaire et de stock',
    breadcrumb: 'Inventaire',
    schemaType: 'product',
  },
  'solutions/employee-management': {
    title: 'Gestion Employés Guinée — Horaires, Rôles & Commissions | ZYVO',
    description:
      'Gérez vos employés et caissiers en Guinée : horaires, permissions, commissions sur ventes et contrôle d\'accès. Idéal pour boutiques et restaurants à Conakry.',
    keywords:
      'gestion employés Guinée, logiciel RH PME Conakry, gestion caissiers Guinée, permissions employés ERP',
    path: '/gn/solutions/employee-management',
    h1: 'Gestion des employés',
    breadcrumb: 'Employés',
    schemaType: 'product',
  },
  'solutions/customer-queue-management': {
    title: 'File d\'Attente SMS Guinée — Salons & Services | ZYVO Conakry',
    description:
      'File d\'attente numérique et notifications SMS pour salons de coiffure, cliniques et services en Guinée. Réduisez l\'attente à Conakry et en province.',
    keywords:
      'file attente SMS Guinée, logiciel salon coiffure Conakry, gestion rendez-vous Guinée, notification SMS clients',
    path: '/gn/solutions/customer-queue-management',
    h1: 'File d\'attente et SMS clients',
    breadcrumb: 'File d\'attente',
    schemaType: 'product',
  },
  'solutions/invoicing': {
    title: 'Facturation & Devis Guinée — TVA 18% DGI Conforme | ZYVO',
    description:
      'Logiciel de facturation pour PME guinéennes. Devis, factures PDF, suivi TVA 18% et préparation déclarations DGI. Conformité SYSCOHADA et numérotation séquentielle.',
    keywords:
      'logiciel facturation Guinée, facture TVA DGI Conakry, devis PME Guinée, facturation SYSCOHADA Guinée',
    path: '/gn/solutions/invoicing',
    h1: 'Facturation et devis',
    breadcrumb: 'Facturation',
    schemaType: 'product',
  },
  'solutions/financial-management': {
    title: 'Comptabilité & Gestion Financière Guinée — SYSCOHADA & GNF | ZYVO',
    description:
      'Pilotage financier pour PME guinéennes : journal des ventes, dépenses, marges, rapports et export comptable SYSCOHADA. Multi-devises GNF, USD, EUR.',
    keywords:
      'logiciel comptabilité Guinée, comptabilité SYSCOHADA Conakry, gestion financière PME Guinée, rapports comptables GNF',
    path: '/gn/solutions/financial-management',
    h1: 'Gestion financière et comptabilité',
    breadcrumb: 'Comptabilité',
    schemaType: 'product',
  },
  // Secteurs
  'industries/retail': {
    title: 'Logiciel Boutique & Superette Guinée — Caisse POS Conakry | ZYVO',
    description:
      'ERP pour boutiques, superettes et quincailleries en Guinée. Caisse rapide, codes-barres, stock et crédit client. Digitalisez votre commerce à Kaloum, Ratoma ou en province.',
    keywords:
      'logiciel boutique Guinée, caisse superette Conakry, logiciel quincaillerie Guinée, gestion commerce détail Guinée',
    path: '/gn/industries/retail',
    h1: 'Boutiques & commerce de détail',
    breadcrumb: 'Boutiques',
    schemaType: 'service',
  },
  'industries/restaurants': {
    title: 'Logiciel Restaurant & Maquis Guinée — Caisse POS Conakry | ZYVO',
    description:
      'Caisse pour restaurants, maquis et traiteurs en Guinée. Gestion menus, commandes, ventes journalières et encaissement Mobile Money. Optimisé pour Conakry.',
    keywords:
      'logiciel restaurant Guinée, caisse maquis Conakry, POS restaurant Guinée, gestion menu maquis',
    path: '/gn/industries/restaurants',
    h1: 'Restaurants & maquis',
    breadcrumb: 'Restaurants',
    schemaType: 'service',
  },
  'industries/salons': {
    title: 'Logiciel Salon Coiffure Guinée — Rendez-vous & File SMS | ZYVO',
    description:
      'Gestion pour salons de coiffure et instituts de beauté en Guinée. Rendez-vous, file d\'attente SMS, commissions et suivi prestations à Conakry.',
    keywords:
      'logiciel salon coiffure Guinée, gestion institut beauté Conakry, rendez-vous coiffure Guinée, ERP salon Guinée',
    path: '/gn/industries/salons',
    h1: 'Salons & coiffure',
    breadcrumb: 'Salons',
    schemaType: 'service',
  },
  'industries/pharmacies': {
    title: 'Logiciel Pharmacie Guinée — Stock, Lots & Péremption | ZYVO Conakry',
    description:
      'Gestion pour pharmacies et parapharmacies guinéennes. Suivi lots, dates de péremption, ventes OTC et rapports. Conformité et traçabilité à Conakry.',
    keywords:
      'logiciel pharmacie Guinée, gestion stock pharmacie Conakry, logiciel officine Guinée, inventaire médicaments Guinée',
    path: '/gn/industries/pharmacies',
    h1: 'Pharmacies & parapharmacies',
    breadcrumb: 'Pharmacies',
    schemaType: 'service',
  },
  'industries/logistics': {
    title: 'Logiciel Transport & Logistique Guinée — Flotte & Facturation | ZYVO',
    description:
      'ERP pour entreprises de transport et distribution en Guinée. Suivi expéditions, clients, facturation et gestion de flotte à Conakry et en province.',
    keywords:
      'logiciel transport Guinée, gestion logistique Conakry, ERP distribution Guinée, facturation transport Guinée',
    path: '/gn/industries/logistics',
    h1: 'Transport & logistique',
    breadcrumb: 'Transport',
    schemaType: 'service',
  },
  'industries/services': {
    title: 'Logiciel Services B2B Guinée — Devis, Factures & Projets | ZYVO',
    description:
      'Gestion pour cabinets, prestataires et entreprises de services en Guinée. Devis, factures, suivi clients et projets. Comptabilité SYSCOHADA intégrée.',
    keywords:
      'logiciel services B2B Guinée, gestion devis Conakry, ERP prestataires Guinée, facturation services Guinée',
    path: '/gn/industries/services',
    h1: 'Services & B2B',
    breadcrumb: 'Services B2B',
    schemaType: 'service',
  },
  blog: {
    title: 'Blog ZYVO Guinée — Conseils gestion, caisse POS & digitalisation PME',
    description:
      'Articles pratiques pour entrepreneurs guinéens : choisir un ERP, gérer son stock, Orange Money à la caisse, SYSCOHADA et TVA DGI. Par ZYVO Conakry.',
    keywords:
      'blog ERP Guinée, conseils gestion Conakry, digitalisation PME Guinée, articles caisse POS Guinée',
    path: '/gn/blog',
    h1: 'Conseils pour entreprises guinéennes',
    breadcrumb: 'Blog',
    schemaType: 'service',
  },
};

export function getGnSeoPath(slug: string[]): string {
  if (slug.length === 0) return 'home';
  return slug.join('/');
}

export function getGnPageSeo(slug: string[]): GnSeoPageMeta {
  const path = getGnSeoPath(slug);

  if (path.startsWith('blog/')) {
    const postSlug = path.slice('blog/'.length);
    const post = getMarketBlogPostBySlug('gn', postSlug);
    if (post) {
      return {
        title: post.metaTitle,
        description: post.metaDescription,
        keywords: post.keywords,
        path: `/gn/blog/${post.slug}`,
        h1: post.title,
        breadcrumb: post.category,
        schemaType: 'article',
        ogType: 'article',
      };
    }
  }

  return GN_PAGE_SEO[path] ?? GN_PAGE_SEO.home;
}

/** Contenu sémantique long-form pour la page d'accueil (crawl + mots-clés longue traîne) */
export const GN_HOME_SEO_CONTENT = {
  title: 'Le logiciel de gestion adapté aux entreprises guinéennes',
  sections: [
    {
      heading: 'ERP et caisse POS pour PME à Conakry et en province',
      body: `En Guinée, les commerçants de Conakry (Kaloum, Ratoma, Matam, Dixinn), Kindia, Labé et Kankan cherchent un logiciel de gestion d'entreprise fiable : caisse enregistreuse (POS), gestion de stock, facturation avec TVA 18 % et suivi des paiements Orange Money et MTN Mobile Money. ZYVO réunit tout cela dans une plateforme cloud en français, facturée en francs guinéens (GNF).`,
    },
    {
      heading: 'Conformité SYSCOHADA et déclarations DGI',
      body: `Membre de l'OHADA, la Guinée applique le référentiel comptable SYSCOHADA. ZYVO génère des factures numérotées, suit la TVA à 18 % et exporte les journaux de ventes pour faciliter vos déclarations à la Direction Générale des Impôts (DGI). Idéal pour les PME qui veulent professionnaliser leur comptabilité sans recruter un expert-comptable à temps plein.`,
    },
    {
      heading: 'Mobile Money, connexion 3G/4G et mode hors-ligne',
      body: `Les paiements mobiles dominent le commerce guinéen. ZYVO permet d'enregistrer les encaissements Orange Money et MTN MoMo à la caisse. L'interface légère fonctionne sur smartphone Android, tablette ou PC — même avec une connexion 3G/4G instable. Le mode dégradé permet de continuer à vendre quand le réseau fluctue.`,
    },
    {
      heading: 'Qui utilise ZYVO en Guinée ?',
      body: `Boutiques et superettes, maquis et restaurants, salons de coiffure, pharmacies, quincailleries, commerces de gros et entreprises de services B2B. Que vous ayez un seul point de vente à Madina ou plusieurs magasins à travers Conakry, ZYVO centralise stock, ventes, employés et rapports depuis un seul tableau de bord.`,
    },
  ],
};
