import type { MarketPageMeta } from '@/lib/markets/types';
import { getMarketBlogPostBySlug } from '@/data/markets/blog';

/** Mots-clés primaires identifiés pour le marché ivoirien (recherche FR + concurrence locale) */
export const CI_PRIMARY_KEYWORDS = [
  'logiciel de gestion entreprise Côte d\'Ivoire',
  'logiciel caisse Côte d\'Ivoire',
  'ERP Côte d\'Ivoire',
  'ERP PME Côte d\'Ivoire',
  'logiciel POS Abidjan',
  'caisse enregistreuse Côte d\'Ivoire',
  'logiciel gestion stock Côte d\'Ivoire',
  'application gestion commerciale Côte d\'Ivoire',
  'logiciel boutique Abidjan',
  'Orange Money caisse Côte d\'Ivoire',
  'Orange Money gestion Côte d\'Ivoire',
  'SYSCOHADA logiciel Côte d\'Ivoire',
  'comptabilité TVA DGI Côte d\'Ivoire',
  'digitalisation PME Côte d\'Ivoire',
  'logiciel restaurant Côte d\'Ivoire',
  'logiciel pharmacie Côte d\'Ivoire',
  'gestion inventaire Abidjan',
  'logiciel salon coiffure Côte d\'Ivoire',
  'logiciel maquis Abidjan',
  'gestion multi-magasins Côte d\'Ivoire',
] as const;

/** Villes et communes ciblées pour le référencement local */
export const CI_GEO_TARGETS = [
  'Abidjan',
  'Cocody',
  'Plateau',
  'Yopougon',
  'Marcory',
  'Bouaké',
  'Yamoussoukro',
  'San-Pédro',
  'Korhogo',
  'Man',
] as const;

export interface CiSeoPageMeta extends MarketPageMeta {
  h1?: string;
  ogTitle?: string;
  breadcrumb?: string;
  schemaType?: 'home' | 'product' | 'service' | 'faq' | 'contact' | 'article';
  ogType?: 'website' | 'article';
}

const BASE_KEYWORDS = CI_PRIMARY_KEYWORDS.slice(0, 8).join(', ');

/** SEO par chemin de page (relatif au marché, ex. "solutions/point-of-sale") */
export const CI_PAGE_SEO: Record<string, CiSeoPageMeta> = {
  home: {
    title: 'Logiciel de Gestion Entreprise Côte d\'Ivoire — Caisse POS, Stock & ERP PME | ZYVO',
    description:
      'ZYVO : logiciel de gestion tout-en-un pour PME en Côte d\'Ivoire. Caisse POS Abidjan, stock, facturation TVA DGI, Orange Money & Orange Money. Essai gratuit 7 jours en FCFA.',
    keywords: `${BASE_KEYWORDS}, logiciel gestion PME Abidjan, ERP cloud Côte d\'Ivoire, franc CFA FCFA`,
    path: '/ci',
    h1: 'Logiciel de gestion d\'entreprise pour les PME ivoiriennes',
    ogTitle: 'ZYVO Côte d\'Ivoire — ERP & Caisse POS pour commerçants à Abidjan',
    breadcrumb: 'Accueil',
    schemaType: 'home',
  },
  features: {
    title: 'Fonctionnalités ERP — Caisse, Stock, Comptabilité SYSCOHADA | ZYVO Côte d\'Ivoire',
    description:
      'Caisse POS, inventaire temps réel, employés, facturation TVA 18%, rapports et mode hors-ligne — fonctionnalités ZYVO adaptées aux PME ivoiriennes à Abidjan et en région.',
    keywords:
      'fonctionnalités ERP Côte d\'Ivoire, logiciel caisse POS Abidjan, gestion stock Côte d\'Ivoire, comptabilité SYSCOHADA, logiciel gestion employés Côte d\'Ivoire',
    path: '/ci/features',
    h1: 'Fonctionnalités pour entreprises ivoiriennes',
    breadcrumb: 'Fonctionnalités',
    schemaType: 'product',
  },
  pricing: {
    title: 'Tarifs ERP Côte d\'Ivoire — Plans en FCFA dès 23 900 FCFA/mois | ZYVO',
    description:
      'Tarifs transparents en FCFA pour PME ivoiriennes. Plans Essentiel, Croissance et Entreprise. Paiement Orange Money, MTN MoMo, virement local. Essai gratuit 7 jours sans carte bancaire.',
    keywords:
      'tarifs ERP Côte d\'Ivoire, prix logiciel gestion Abidjan, coût caisse POS FCFA, abonnement logiciel PME Côte d\'Ivoire, ERP pas cher Côte d\'Ivoire',
    path: '/ci/pricing',
    h1: 'Tarifs en francs CFA (FCFA)',
    breadcrumb: 'Tarifs',
    schemaType: 'product',
  },
  about: {
    title: 'À Propos — Digitalisation des PME Côte d\'Ivoireaises | ZYVO Abidjan',
    description:
      'ZYVO accompagne la digitalisation des commerçants et PME en Côte d\'Ivoire — d\'Abidjan à Bouaké, Yamoussoukro et Korhogo. ERP cloud en français, support local, conformité OHADA.',
    keywords:
      'ZYVO Côte d\'Ivoire, entreprise logiciel Abidjan, digitalisation PME Côte d\'Ivoire, ERP francophone Afrique',
    path: '/ci/about',
    h1: 'ZYVO en Côte d\'Ivoire',
    breadcrumb: 'À propos',
    schemaType: 'service',
  },
  contact: {
    title: 'Contact & Devis Gratuit — Logiciel Gestion Entreprise Côte d\'Ivoire | ZYVO',
    description:
      'Demandez une démo ou un devis pour votre boutique, restaurant ou pharmacie en Côte d\'Ivoire. Support WhatsApp en français, réponse sous 24h à Abidjan.',
    keywords:
      'contact ZYVO Côte d\'Ivoire, devis logiciel caisse Abidjan, démo ERP Côte d\'Ivoire, support logiciel gestion Côte d\'Ivoire',
    path: '/ci/contact',
    h1: 'Contactez ZYVO Côte d\'Ivoire',
    breadcrumb: 'Contact',
    schemaType: 'contact',
  },
  faq: {
    title: 'FAQ — Logiciel Caisse, Orange Money, MTN MoMo, TVA DGI & Connexion | ZYVO Côte d\'Ivoire',
    description:
      'Questions fréquentes sur ZYVO en Côte d\'Ivoire : paiements Orange Money et MTN MoMo, TVA 18% DGI, connexion 4G, multi-boutiques Abidjan et essai gratuit.',
    keywords:
      'FAQ logiciel gestion Côte d\'Ivoire, Orange Money caisse Abidjan, TVA DGI Côte d\'Ivoire logiciel, ERP hors ligne Côte d\'Ivoire',
    path: '/ci/faq',
    h1: 'Questions fréquentes',
    breadcrumb: 'FAQ',
    schemaType: 'faq',
  },
  demo: {
    title: 'Démo Gratuite — Logiciel ERP & Caisse POS pour PME Côte d\'Ivoireaises | ZYVO',
    description:
      'Réservez une démonstration gratuite de ZYVO pour votre entreprise à Abidjan ou en région. Présentation en français : caisse, stock, Orange Money, MTN MoMo et facturation.',
    keywords:
      'démo logiciel gestion Côte d\'Ivoire, présentation ERP Abidjan, essai caisse POS Côte d\'Ivoire',
    path: '/ci/demo',
    h1: 'Réserver une démonstration',
    breadcrumb: 'Démo',
    schemaType: 'service',
  },
  'getting-started': {
    title: 'Essai Gratuit 7 Jours — Créer un Compte ZYVO Côte d\'Ivoire | ERP PME',
    description:
      'Démarrez votre essai gratuit ZYVO en Côte d\'Ivoire. Aucune carte bancaire internationale. Logiciel de gestion en français, tarifs en FCFA, support local.',
    keywords:
      'essai gratuit ERP Côte d\'Ivoire, créer compte logiciel gestion Abidjan, inscription ZYVO Côte d\'Ivoire',
    path: '/ci/getting-started',
    h1: 'Commencer avec ZYVO',
    breadcrumb: 'Essai gratuit',
    schemaType: 'product',
  },
  solutions: {
    title: 'Solutions ERP — Caisse POS, Stock, Facturation & Employés | ZYVO Côte d\'Ivoire',
    description:
      'Solutions de gestion pour PME ivoiriennes : caisse POS Abidjan, inventaire, facturation TVA, employés, file d\'attente SMS et comptabilité — tout en français.',
    keywords:
      'solutions ERP Côte d\'Ivoire, logiciel caisse POS Abidjan, gestion stock Côte d\'Ivoire, facturation TVA Côte d\'Ivoire',
    path: '/ci/solutions',
    h1: 'Solutions de gestion pour le Côte d\'Ivoire',
    breadcrumb: 'Solutions',
    schemaType: 'service',
  },
  industries: {
    title: 'Secteurs — Boutique, Restaurant, Salon, Pharmacie & Logistique | ZYVO Côte d\'Ivoire',
    description:
      'Logiciels de gestion par secteur en Côte d\'Ivoire : boutiques Abidjan, restaurants et maquis, salons de coiffure, pharmacies et transport. ERP adapté à chaque métier.',
    keywords:
      'logiciel boutique Côte d\'Ivoire, logiciel restaurant maquis Abidjan, logiciel pharmacie Côte d\'Ivoire, ERP salon coiffure Côte d\'Ivoire',
    path: '/ci/industries',
    h1: 'Secteurs que nous accompagnons',
    breadcrumb: 'Secteurs',
    schemaType: 'service',
  },
  // Solutions détaillées
  'solutions/point-of-sale': {
    title: 'Logiciel Caisse POS Côte d\'Ivoire — Orange Money & Orange Money | ZYVO Abidjan',
    description:
      'Caisse enregistreuse cloud pour boutiques et restaurants en Côte d\'Ivoire. Encaissement Orange Money, MTN MoMo, Moov Money, espèces FCFA. Mode hors-ligne, tickets et multi-caissiers à Abidjan.',
    keywords:
      'logiciel caisse Côte d\'Ivoire, caisse enregistreuse Abidjan, POS Orange Money Côte d\'Ivoire, logiciel point de vente Côte d\'Ivoire, caisse mobile money Abidjan',
    path: '/ci/solutions/point-of-sale',
    h1: 'Logiciel caisse (POS) pour entreprises ivoiriennes',
    breadcrumb: 'Caisse POS',
    schemaType: 'product',
  },
  'solutions/inventory-management': {
    title: 'Gestion de Stock Côte d\'Ivoire — Inventaire Temps Réel Multi-Magasins | ZYVO',
    description:
      'Logiciel de gestion de stock pour commerçants ivoiriens. Alertes rupture, inventaires, transferts entre magasins Cocody, Yopougon et régions. Valorisation en FCFA.',
    keywords:
      'logiciel gestion stock Côte d\'Ivoire, inventaire Abidjan, gestion stock boutique Côte d\'Ivoire, logiciel inventaire PME Côte d\'Ivoire',
    path: '/ci/solutions/inventory-management',
    h1: 'Gestion d\'inventaire et de stock',
    breadcrumb: 'Inventaire',
    schemaType: 'product',
  },
  'solutions/employee-management': {
    title: 'Gestion Employés Côte d\'Ivoire — Horaires, Rôles & Commissions | ZYVO',
    description:
      'Gérez vos employés et caissiers en Côte d\'Ivoire : horaires, permissions, commissions sur ventes et contrôle d\'accès. Idéal pour boutiques et restaurants à Abidjan.',
    keywords:
      'gestion employés Côte d\'Ivoire, logiciel RH PME Abidjan, gestion caissiers Côte d\'Ivoire, permissions employés ERP',
    path: '/ci/solutions/employee-management',
    h1: 'Gestion des employés',
    breadcrumb: 'Employés',
    schemaType: 'product',
  },
  'solutions/customer-queue-management': {
    title: 'File d\'Attente SMS Côte d\'Ivoire — Salons & Services | ZYVO Abidjan',
    description:
      'File d\'attente numérique et notifications SMS pour salons de coiffure, cliniques et services en Côte d\'Ivoire. Réduisez l\'attente à Abidjan et en région.',
    keywords:
      'file attente SMS Côte d\'Ivoire, logiciel salon coiffure Abidjan, gestion rendez-vous Côte d\'Ivoire, notification SMS clients',
    path: '/ci/solutions/customer-queue-management',
    h1: 'File d\'attente et SMS clients',
    breadcrumb: 'File d\'attente',
    schemaType: 'product',
  },
  'solutions/invoicing': {
    title: 'Facturation & Devis Côte d\'Ivoire — TVA 18% DGI Conforme | ZYVO',
    description:
      'Logiciel de facturation pour PME ivoiriennes. Devis, factures PDF avec NCC, suivi TVA 18% et préparation déclarations DGI. Conformité SYSCOHADA et numérotation séquentielle.',
    keywords:
      'logiciel facturation Côte d\'Ivoire, facture TVA DGI Abidjan, devis PME Côte d\'Ivoire, facturation SYSCOHADA Côte d\'Ivoire',
    path: '/ci/solutions/invoicing',
    h1: 'Facturation et devis',
    breadcrumb: 'Facturation',
    schemaType: 'product',
  },
  'solutions/financial-management': {
    title: 'Comptabilité & Gestion Financière Côte d\'Ivoire — SYSCOHADA & FCFA | ZYVO',
    description:
      'Pilotage financier pour PME ivoiriennes : journal des ventes, dépenses, marges, rapports et export comptable SYSCOHADA. Gestion en FCFA.',
    keywords:
      'logiciel comptabilité Côte d\'Ivoire, comptabilité SYSCOHADA Abidjan, gestion financière PME Côte d\'Ivoire, rapports comptables FCFA',
    path: '/ci/solutions/financial-management',
    h1: 'Gestion financière et comptabilité',
    breadcrumb: 'Comptabilité',
    schemaType: 'product',
  },
  'solutions/logistics': {
    title: 'Logiciel Logistique Côte d\'Ivoire — Livraisons & Transport | ZYVO Abidjan',
    description:
      'Gérez livraisons, tournées et expéditions en Côte d\'Ivoire. Suivi GPS, preuve de livraison et facturation transport pour PME à Abidjan et en région.',
    keywords:
      'logiciel logistique Côte d\'Ivoire, gestion livraisons Abidjan, transport PME Côte d\'Ivoire, suivi expéditions Côte d\'Ivoire',
    path: '/ci/solutions/logistics',
    h1: 'Logistique et livraisons',
    breadcrumb: 'Logistique',
    schemaType: 'product',
  },
  'solutions/purchasing': {
    title: 'Achats & Approvisionnement Côte d\'Ivoire — Bons de Commande | ZYVO',
    description:
      'Logiciel d\'achats pour PME ivoiriennes : bons de commande, fournisseurs, approbations et liaison stock. Contrôlez vos dépenses en FCFA.',
    keywords:
      'logiciel achats Côte d\'Ivoire, approvisionnement PME Abidjan, bon de commande Côte d\'Ivoire, gestion fournisseurs Côte d\'Ivoire',
    path: '/ci/solutions/purchasing',
    h1: 'Achats et approvisionnement',
    breadcrumb: 'Achats',
    schemaType: 'product',
  },
  'solutions/scheduling': {
    title: 'Rendez-vous & Planning Côte d\'Ivoire — Agenda Salons & Services | ZYVO',
    description:
      'Logiciel de rendez-vous pour salons, cliniques et services en Côte d\'Ivoire. Agenda en ligne, rappels SMS et planning employés à Abidjan.',
    keywords:
      'logiciel rendez-vous Côte d\'Ivoire, planning salon Abidjan, agenda PME Côte d\'Ivoire, réservation en ligne Abidjan',
    path: '/ci/solutions/scheduling',
    h1: 'Rendez-vous et planning',
    breadcrumb: 'Planning',
    schemaType: 'product',
  },
  'solutions/online-store': {
    title: 'Boutique en Ligne Côte d\'Ivoire — E-commerce & POS Sync | ZYVO Abidjan',
    description:
      'Créez votre boutique en ligne en Côte d\'Ivoire. Catalogue produits, paiement Orange Money/Orange Money, stock synchronisé avec caisse POS.',
    keywords:
      'boutique en ligne Côte d\'Ivoire, e-commerce Abidjan, vendre en ligne Côte d\'Ivoire, site e-commerce PME Côte d\'Ivoire',
    path: '/ci/solutions/online-store',
    h1: 'Boutique en ligne',
    breadcrumb: 'E-commerce',
    schemaType: 'product',
  },
  'solutions/marketing-analytics': {
    title: 'Marketing & Analyses Ventes Côte d\'Ivoire — SMS & Fidélité | ZYVO',
    description:
      'Analysez vos ventes, lancez des campagnes SMS et fidélisez vos clients en Côte d\'Ivoire. Tableaux de bord pour PME à Abidjan.',
    keywords:
      'marketing PME Côte d\'Ivoire, campagne SMS Abidjan, fidélité clients Côte d\'Ivoire, analytics ventes Abidjan',
    path: '/ci/solutions/marketing-analytics',
    h1: 'Marketing et analyses',
    breadcrumb: 'Marketing',
    schemaType: 'product',
  },
  // Secteurs
  'industries/retail': {
    title: 'Logiciel Boutique & Superette Côte d\'Ivoire — Caisse POS Abidjan | ZYVO',
    description:
      'ERP pour boutiques, superettes et quincailleries en Côte d\'Ivoire. Caisse rapide, codes-barres, stock et crédit client. Digitalisez votre commerce au Cocody, Yopougon ou en région.',
    keywords:
      'logiciel boutique Côte d\'Ivoire, caisse superette Abidjan, logiciel quincaillerie Côte d\'Ivoire, gestion commerce détail Côte d\'Ivoire',
    path: '/ci/industries/retail',
    h1: 'Boutiques & commerce de détail',
    breadcrumb: 'Boutiques',
    schemaType: 'service',
  },
  'industries/restaurants': {
    title: 'Logiciel Restaurant & Dibiterie Côte d\'Ivoire — Caisse POS Abidjan | ZYVO',
    description:
      'Caisse pour restaurants, maquis et traiteurs en Côte d\'Ivoire. Gestion menus, commandes, ventes journalières et encaissement Orange Money & Orange Money. Optimisé pour Abidjan.',
    keywords:
      'logiciel restaurant Côte d\'Ivoire, caisse maquis Abidjan, POS restaurant Côte d\'Ivoire, gestion menu maquis',
    path: '/ci/industries/restaurants',
    h1: 'Restaurants & maquis',
    breadcrumb: 'Restaurants',
    schemaType: 'service',
  },
  'industries/salons': {
    title: 'Logiciel Salon Coiffure Côte d\'Ivoire — Rendez-vous & File SMS | ZYVO',
    description:
      'Gestion pour salons de coiffure et instituts de beauté en Côte d\'Ivoire. Rendez-vous, file d\'attente SMS, commissions et suivi prestations à Abidjan.',
    keywords:
      'logiciel salon coiffure Côte d\'Ivoire, gestion institut beauté Abidjan, rendez-vous coiffure Côte d\'Ivoire, ERP salon Côte d\'Ivoire',
    path: '/ci/industries/salons',
    h1: 'Salons & coiffure',
    breadcrumb: 'Salons',
    schemaType: 'service',
  },
  'industries/pharmacies': {
    title: 'Logiciel Pharmacie Côte d\'Ivoire — Stock, Lots & Péremption | ZYVO Abidjan',
    description:
      'Gestion pour pharmacies et parapharmacies ivoiriennes. Suivi lots, dates de péremption, ventes OTC et rapports. Conformité et traçabilité à Abidjan.',
    keywords:
      'logiciel pharmacie Côte d\'Ivoire, gestion stock pharmacie Abidjan, logiciel officine Côte d\'Ivoire, inventaire médicaments Côte d\'Ivoire',
    path: '/ci/industries/pharmacies',
    h1: 'Pharmacies & parapharmacies',
    breadcrumb: 'Pharmacies',
    schemaType: 'service',
  },
  'industries/logistics': {
    title: 'Logiciel Transport & Logistique Côte d\'Ivoire — Flotte & Facturation | ZYVO',
    description:
      'ERP pour entreprises de transport et distribution en Côte d\'Ivoire. Suivi expéditions, clients, facturation et gestion de flotte à Abidjan et en région.',
    keywords:
      'logiciel transport Côte d\'Ivoire, gestion logistique Abidjan, ERP distribution Côte d\'Ivoire, facturation transport Côte d\'Ivoire',
    path: '/ci/industries/logistics',
    h1: 'Transport & logistique',
    breadcrumb: 'Transport',
    schemaType: 'service',
  },
  'industries/services': {
    title: 'Logiciel Services B2B Côte d\'Ivoire — Devis, Factures & Projets | ZYVO',
    description:
      'Gestion pour cabinets, prestataires et entreprises de services en Côte d\'Ivoire. Devis, factures, suivi clients et projets. Comptabilité SYSCOHADA intégrée.',
    keywords:
      'logiciel services B2B Côte d\'Ivoire, gestion devis Abidjan, ERP prestataires Côte d\'Ivoire, facturation services Côte d\'Ivoire',
    path: '/ci/industries/services',
    h1: 'Services & B2B',
    breadcrumb: 'Services B2B',
    schemaType: 'service',
  },
  blog: {
    title: 'Blog ZYVO Côte d\'Ivoire — Conseils gestion, caisse POS & digitalisation PME',
    description:
      'Articles pratiques pour entrepreneurs ivoiriens : choisir un ERP, gérer son stock, Orange Money et MTN MoMo à la caisse, SYSCOHADA et TVA DGI. Par ZYVO Abidjan.',
    keywords:
      'blog ERP Côte d\'Ivoire, conseils gestion Abidjan, digitalisation PME Côte d\'Ivoire, articles caisse POS Côte d\'Ivoire',
    path: '/ci/blog',
    h1: 'Conseils pour entreprises ivoiriennes',
    breadcrumb: 'Blog',
    schemaType: 'service',
  },
};

export function getCiSeoPath(slug: string[]): string {
  if (slug.length === 0) return 'home';
  return slug.join('/');
}

export function getCiPageSeo(slug: string[]): CiSeoPageMeta {
  const path = getCiSeoPath(slug);

  if (path.startsWith('blog/')) {
    const postSlug = path.slice('blog/'.length);
    const post = getMarketBlogPostBySlug('ci', postSlug);
    if (post) {
      return {
        title: post.metaTitle,
        description: post.metaDescription,
        keywords: post.keywords,
        path: `/ci/blog/${post.slug}`,
        h1: post.title,
        breadcrumb: post.category,
        schemaType: 'article',
        ogType: 'article',
      };
    }
  }

  return CI_PAGE_SEO[path] ?? CI_PAGE_SEO.home;
}

/** Contenu sémantique long-form pour la page d'accueil (crawl + mots-clés longue traîne) */
export const CI_HOME_SEO_CONTENT = {
  title: 'Le logiciel de gestion adapté aux entreprises ivoiriennes',
  sections: [
    {
      heading: 'ERP et caisse POS pour PME à Abidjan et dans les régions',
      body: `Au Côte d\'Ivoire, les commerçants d\'Abidjan (Cocody, Plateau, Yopougon, Marcory), Bouaké, Yamoussoukro, San-Pédro, Korhogo et Man cherchent un logiciel de gestion d'entreprise fiable : caisse enregistreuse (POS), gestion de stock, facturation avec TVA 18 % et suivi des paiements Orange Money, MTN MoMo et Moov Money. ZYVO réunit tout cela dans une plateforme cloud en français, facturée en francs CFA (FCFA).`,
    },
    {
      heading: 'Conformité SYSCOHADA, NCC et déclarations DGI',
      body: `Le Côte d\'Ivoire est membre de l\'OHADA et applique le référentiel comptable SYSCOHADA révisé. Toute entreprise formelle doit tenir une comptabilité conforme, produire des états financiers et respecter les obligations fiscales de la Direction Générale des Impôts et des Domaines (DGI). ZYVO génère des factures numérotées avec NCC, suit la TVA à 18 % et exporte les journaux de ventes pour faciliter vos déclarations. Idéal pour les PME qui veulent professionnaliser leur comptabilité sans recruter un expert-comptable à temps plein.`,
    },
    {
      heading: 'Orange Money, MTN MoMo, Moov Money et connexion 4G',
      body: `Les paiements mobiles dominent le commerce ivoiriens — Orange Money est le leader incontesté, suivi d'Orange Money et Moov Money. ZYVO permet d'enregistrer les encaissements Orange Money, MTN MoMo et Moov Money à la caisse avec un journal détaillé pour le rapprochement mensuel. L'interface légère fonctionne sur smartphone Android, tablette ou PC — même avec une connexion 4G instable. Le mode dégradé permet de continuer à vendre lors des coupures réseau.`,
    },
    {
      heading: 'Qui utilise ZYVO en Côte d\'Ivoire ?',
      body: `Boutiques et superettes, restaurants et maquis, salons de coiffure, pharmacies, quincailleries, commerces de gros et entreprises de services B2B. Que vous ayez un seul point de vente au marché Adjamé ou plusieurs magasins à travers Abidjan, ZYVO centralise stock, ventes, employés et rapports depuis un seul tableau de bord. Les entreprises de Bouaké, Yamoussoukro, San-Pédro et Korhogo bénéficient du même logiciel, adapté aux réalités du marché ivoirien et aux exigences de l\'APIX et de la CCIS pour les entreprises formalisées.`,
    },
  ],
};
