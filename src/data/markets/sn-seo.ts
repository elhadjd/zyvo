import type { MarketPageMeta } from '@/lib/markets/types';
import { getMarketBlogPostBySlug } from '@/data/markets/blog';

/** Mots-clés primaires identifiés pour le marché sénégalais (recherche FR + concurrence locale) */
export const SN_PRIMARY_KEYWORDS = [
  'logiciel de gestion entreprise Sénégal',
  'logiciel caisse Sénégal',
  'ERP Sénégal',
  'ERP PME Sénégal',
  'logiciel POS Dakar',
  'caisse enregistreuse Sénégal',
  'logiciel gestion stock Sénégal',
  'application gestion commerciale Sénégal',
  'logiciel boutique Dakar',
  'Wave caisse Sénégal',
  'Orange Money gestion Sénégal',
  'SYSCOHADA logiciel Sénégal',
  'comptabilité TVA DGI Sénégal',
  'digitalisation PME Sénégal',
  'logiciel restaurant Sénégal',
  'logiciel pharmacie Sénégal',
  'gestion inventaire Dakar',
  'logiciel salon coiffure Sénégal',
  'logiciel dibiterie Dakar',
  'gestion multi-magasins Sénégal',
] as const;

/** Villes et communes ciblées pour le référencement local */
export const SN_GEO_TARGETS = [
  'Dakar',
  'Plateau',
  'Almadies',
  'Pikine',
  'Guédiawaye',
  'Thiès',
  'Saint-Louis',
  'Mbour',
  'Kaolack',
  'Touba',
] as const;

export interface SnSeoPageMeta extends MarketPageMeta {
  h1?: string;
  ogTitle?: string;
  breadcrumb?: string;
  schemaType?: 'home' | 'product' | 'service' | 'faq' | 'contact' | 'article';
  ogType?: 'website' | 'article';
}

const BASE_KEYWORDS = SN_PRIMARY_KEYWORDS.slice(0, 8).join(', ');

/** SEO par chemin de page (relatif au marché, ex. "solutions/point-of-sale") */
export const SN_PAGE_SEO: Record<string, SnSeoPageMeta> = {
  home: {
    title: 'Logiciel de Gestion Entreprise Sénégal — Caisse POS, Stock & ERP PME | ZYVO',
    description:
      'ZYVO : logiciel de gestion tout-en-un pour PME au Sénégal. Caisse POS Dakar, stock, facturation TVA DGI, Wave & Orange Money. Essai gratuit 7 jours en FCFA.',
    keywords: `${BASE_KEYWORDS}, logiciel gestion PME Dakar, ERP cloud Sénégal, franc CFA FCFA`,
    path: '/sn',
    h1: 'Logiciel de gestion d\'entreprise pour les PME sénégalaises',
    ogTitle: 'ZYVO Sénégal — ERP & Caisse POS pour commerçants à Dakar',
    breadcrumb: 'Accueil',
    schemaType: 'home',
  },
  features: {
    title: 'Fonctionnalités ERP — Caisse, Stock, Comptabilité SYSCOHADA | ZYVO Sénégal',
    description:
      'Caisse POS, inventaire temps réel, employés, facturation TVA 18%, rapports et mode hors-ligne — fonctionnalités ZYVO adaptées aux PME sénégalaises à Dakar et en région.',
    keywords:
      'fonctionnalités ERP Sénégal, logiciel caisse POS Dakar, gestion stock Sénégal, comptabilité SYSCOHADA, logiciel gestion employés Sénégal',
    path: '/sn/features',
    h1: 'Fonctionnalités pour entreprises sénégalaises',
    breadcrumb: 'Fonctionnalités',
    schemaType: 'product',
  },
  pricing: {
    title: 'Tarifs ERP Sénégal — Plans en FCFA dès 23 900 FCFA/mois | ZYVO',
    description:
      'Tarifs transparents en FCFA pour PME sénégalaises. Plans Essentiel, Croissance et Entreprise. Paiement Wave, Orange Money, virement local. Essai gratuit 7 jours sans carte bancaire.',
    keywords:
      'tarifs ERP Sénégal, prix logiciel gestion Dakar, coût caisse POS FCFA, abonnement logiciel PME Sénégal, ERP pas cher Sénégal',
    path: '/sn/pricing',
    h1: 'Tarifs en francs CFA (FCFA)',
    breadcrumb: 'Tarifs',
    schemaType: 'product',
  },
  about: {
    title: 'À Propos — Digitalisation des PME Sénégalaises | ZYVO Dakar',
    description:
      'ZYVO accompagne la digitalisation des commerçants et PME au Sénégal — de Dakar à Thiès, Saint-Louis et Kaolack. ERP cloud en français, support local, conformité OHADA.',
    keywords:
      'ZYVO Sénégal, entreprise logiciel Dakar, digitalisation PME Sénégal, ERP francophone Afrique',
    path: '/sn/about',
    h1: 'ZYVO au Sénégal',
    breadcrumb: 'À propos',
    schemaType: 'service',
  },
  contact: {
    title: 'Contact & Devis Gratuit — Logiciel Gestion Entreprise Sénégal | ZYVO',
    description:
      'Demandez une démo ou un devis pour votre boutique, restaurant ou pharmacie au Sénégal. Support WhatsApp en français, réponse sous 24h à Dakar.',
    keywords:
      'contact ZYVO Sénégal, devis logiciel caisse Dakar, démo ERP Sénégal, support logiciel gestion Sénégal',
    path: '/sn/contact',
    h1: 'Contactez ZYVO Sénégal',
    breadcrumb: 'Contact',
    schemaType: 'contact',
  },
  faq: {
    title: 'FAQ — Logiciel Caisse, Wave, Orange Money, TVA DGI & Connexion | ZYVO Sénégal',
    description:
      'Questions fréquentes sur ZYVO au Sénégal : paiements Wave et Orange Money, TVA 18% DGI, connexion 4G, multi-boutiques Dakar et essai gratuit.',
    keywords:
      'FAQ logiciel gestion Sénégal, Wave caisse Dakar, TVA DGI Sénégal logiciel, ERP hors ligne Sénégal',
    path: '/sn/faq',
    h1: 'Questions fréquentes',
    breadcrumb: 'FAQ',
    schemaType: 'faq',
  },
  demo: {
    title: 'Démo Gratuite — Logiciel ERP & Caisse POS pour PME Sénégalaises | ZYVO',
    description:
      'Réservez une démonstration gratuite de ZYVO pour votre entreprise à Dakar ou en région. Présentation en français : caisse, stock, Wave, Orange Money et facturation.',
    keywords:
      'démo logiciel gestion Sénégal, présentation ERP Dakar, essai caisse POS Sénégal',
    path: '/sn/demo',
    h1: 'Réserver une démonstration',
    breadcrumb: 'Démo',
    schemaType: 'service',
  },
  'getting-started': {
    title: 'Essai Gratuit 7 Jours — Créer un Compte ZYVO Sénégal | ERP PME',
    description:
      'Démarrez votre essai gratuit ZYVO au Sénégal. Aucune carte bancaire internationale. Logiciel de gestion en français, tarifs en FCFA, support local.',
    keywords:
      'essai gratuit ERP Sénégal, créer compte logiciel gestion Dakar, inscription ZYVO Sénégal',
    path: '/sn/getting-started',
    h1: 'Commencer avec ZYVO',
    breadcrumb: 'Essai gratuit',
    schemaType: 'product',
  },
  solutions: {
    title: 'Solutions ERP — Caisse POS, Stock, Facturation & Employés | ZYVO Sénégal',
    description:
      'Solutions de gestion pour PME sénégalaises : caisse POS Dakar, inventaire, facturation TVA, employés, file d\'attente SMS et comptabilité — tout en français.',
    keywords:
      'solutions ERP Sénégal, logiciel caisse POS Dakar, gestion stock Sénégal, facturation TVA Sénégal',
    path: '/sn/solutions',
    h1: 'Solutions de gestion pour le Sénégal',
    breadcrumb: 'Solutions',
    schemaType: 'service',
  },
  industries: {
    title: 'Secteurs — Boutique, Restaurant, Salon, Pharmacie & Logistique | ZYVO Sénégal',
    description:
      'Logiciels de gestion par secteur au Sénégal : boutiques Dakar, restaurants et dibiteries, salons de coiffure, pharmacies et transport. ERP adapté à chaque métier.',
    keywords:
      'logiciel boutique Sénégal, logiciel restaurant dibiterie Dakar, logiciel pharmacie Sénégal, ERP salon coiffure Sénégal',
    path: '/sn/industries',
    h1: 'Secteurs que nous accompagnons',
    breadcrumb: 'Secteurs',
    schemaType: 'service',
  },
  // Solutions détaillées
  'solutions/point-of-sale': {
    title: 'Logiciel Caisse POS Sénégal — Wave & Orange Money | ZYVO Dakar',
    description:
      'Caisse enregistreuse cloud pour boutiques et restaurants au Sénégal. Encaissement Wave, Orange Money, Free Money, espèces FCFA. Mode hors-ligne, tickets et multi-caissiers à Dakar.',
    keywords:
      'logiciel caisse Sénégal, caisse enregistreuse Dakar, POS Wave Sénégal, logiciel point de vente Sénégal, caisse mobile money Dakar',
    path: '/sn/solutions/point-of-sale',
    h1: 'Logiciel caisse (POS) pour entreprises sénégalaises',
    breadcrumb: 'Caisse POS',
    schemaType: 'product',
  },
  'solutions/inventory-management': {
    title: 'Gestion de Stock Sénégal — Inventaire Temps Réel Multi-Magasins | ZYVO',
    description:
      'Logiciel de gestion de stock pour commerçants sénégalais. Alertes rupture, inventaires, transferts entre magasins Plateau, Pikine et régions. Valorisation en FCFA.',
    keywords:
      'logiciel gestion stock Sénégal, inventaire Dakar, gestion stock boutique Sénégal, logiciel inventaire PME Sénégal',
    path: '/sn/solutions/inventory-management',
    h1: 'Gestion d\'inventaire et de stock',
    breadcrumb: 'Inventaire',
    schemaType: 'product',
  },
  'solutions/employee-management': {
    title: 'Gestion Employés Sénégal — Horaires, Rôles & Commissions | ZYVO',
    description:
      'Gérez vos employés et caissiers au Sénégal : horaires, permissions, commissions sur ventes et contrôle d\'accès. Idéal pour boutiques et restaurants à Dakar.',
    keywords:
      'gestion employés Sénégal, logiciel RH PME Dakar, gestion caissiers Sénégal, permissions employés ERP',
    path: '/sn/solutions/employee-management',
    h1: 'Gestion des employés',
    breadcrumb: 'Employés',
    schemaType: 'product',
  },
  'solutions/customer-queue-management': {
    title: 'File d\'Attente SMS Sénégal — Salons & Services | ZYVO Dakar',
    description:
      'File d\'attente numérique et notifications SMS pour salons de coiffure, cliniques et services au Sénégal. Réduisez l\'attente à Dakar et en région.',
    keywords:
      'file attente SMS Sénégal, logiciel salon coiffure Dakar, gestion rendez-vous Sénégal, notification SMS clients',
    path: '/sn/solutions/customer-queue-management',
    h1: 'File d\'attente et SMS clients',
    breadcrumb: 'File d\'attente',
    schemaType: 'product',
  },
  'solutions/invoicing': {
    title: 'Facturation & Devis Sénégal — TVA 18% DGI Conforme | ZYVO',
    description:
      'Logiciel de facturation pour PME sénégalaises. Devis, factures PDF avec NINEA, suivi TVA 18% et préparation déclarations DGID. Conformité SYSCOHADA et numérotation séquentielle.',
    keywords:
      'logiciel facturation Sénégal, facture TVA DGI Dakar, devis PME Sénégal, facturation SYSCOHADA Sénégal',
    path: '/sn/solutions/invoicing',
    h1: 'Facturation et devis',
    breadcrumb: 'Facturation',
    schemaType: 'product',
  },
  'solutions/financial-management': {
    title: 'Comptabilité & Gestion Financière Sénégal — SYSCOHADA & FCFA | ZYVO',
    description:
      'Pilotage financier pour PME sénégalaises : journal des ventes, dépenses, marges, rapports et export comptable SYSCOHADA. Gestion en FCFA.',
    keywords:
      'logiciel comptabilité Sénégal, comptabilité SYSCOHADA Dakar, gestion financière PME Sénégal, rapports comptables FCFA',
    path: '/sn/solutions/financial-management',
    h1: 'Gestion financière et comptabilité',
    breadcrumb: 'Comptabilité',
    schemaType: 'product',
  },
  'solutions/logistics': {
    title: 'Logiciel Logistique Sénégal — Livraisons & Transport | ZYVO Dakar',
    description:
      'Gérez livraisons, tournées et expéditions au Sénégal. Suivi GPS, preuve de livraison et facturation transport pour PME à Dakar et en région.',
    keywords:
      'logiciel logistique Sénégal, gestion livraisons Dakar, transport PME Sénégal, suivi expéditions Sénégal',
    path: '/sn/solutions/logistics',
    h1: 'Logistique et livraisons',
    breadcrumb: 'Logistique',
    schemaType: 'product',
  },
  'solutions/purchasing': {
    title: 'Achats & Approvisionnement Sénégal — Bons de Commande | ZYVO',
    description:
      'Logiciel d\'achats pour PME sénégalaises : bons de commande, fournisseurs, approbations et liaison stock. Contrôlez vos dépenses en FCFA.',
    keywords:
      'logiciel achats Sénégal, approvisionnement PME Dakar, bon de commande Sénégal, gestion fournisseurs Sénégal',
    path: '/sn/solutions/purchasing',
    h1: 'Achats et approvisionnement',
    breadcrumb: 'Achats',
    schemaType: 'product',
  },
  'solutions/scheduling': {
    title: 'Rendez-vous & Planning Sénégal — Agenda Salons & Services | ZYVO',
    description:
      'Logiciel de rendez-vous pour salons, cliniques et services au Sénégal. Agenda en ligne, rappels SMS et planning employés à Dakar.',
    keywords:
      'logiciel rendez-vous Sénégal, planning salon Dakar, agenda PME Sénégal, réservation en ligne Dakar',
    path: '/sn/solutions/scheduling',
    h1: 'Rendez-vous et planning',
    breadcrumb: 'Planning',
    schemaType: 'product',
  },
  'solutions/online-store': {
    title: 'Boutique en Ligne Sénégal — E-commerce & POS Sync | ZYVO Dakar',
    description:
      'Créez votre boutique en ligne au Sénégal. Catalogue produits, paiement Wave/Orange Money, stock synchronisé avec caisse POS.',
    keywords:
      'boutique en ligne Sénégal, e-commerce Dakar, vendre en ligne Sénégal, site e-commerce PME Sénégal',
    path: '/sn/solutions/online-store',
    h1: 'Boutique en ligne',
    breadcrumb: 'E-commerce',
    schemaType: 'product',
  },
  'solutions/marketing-analytics': {
    title: 'Marketing & Analyses Ventes Sénégal — SMS & Fidélité | ZYVO',
    description:
      'Analysez vos ventes, lancez des campagnes SMS et fidélisez vos clients au Sénégal. Tableaux de bord pour PME à Dakar.',
    keywords:
      'marketing PME Sénégal, campagne SMS Dakar, fidélité clients Sénégal, analytics ventes Dakar',
    path: '/sn/solutions/marketing-analytics',
    h1: 'Marketing et analyses',
    breadcrumb: 'Marketing',
    schemaType: 'product',
  },
  // Secteurs
  'industries/retail': {
    title: 'Logiciel Boutique & Superette Sénégal — Caisse POS Dakar | ZYVO',
    description:
      'ERP pour boutiques, superettes et quincailleries au Sénégal. Caisse rapide, codes-barres, stock et crédit client. Digitalisez votre commerce au Plateau, Pikine ou en région.',
    keywords:
      'logiciel boutique Sénégal, caisse superette Dakar, logiciel quincaillerie Sénégal, gestion commerce détail Sénégal',
    path: '/sn/industries/retail',
    h1: 'Boutiques & commerce de détail',
    breadcrumb: 'Boutiques',
    schemaType: 'service',
  },
  'industries/restaurants': {
    title: 'Logiciel Restaurant & Dibiterie Sénégal — Caisse POS Dakar | ZYVO',
    description:
      'Caisse pour restaurants, dibiteries et traiteurs au Sénégal. Gestion menus, commandes, ventes journalières et encaissement Wave & Orange Money. Optimisé pour Dakar.',
    keywords:
      'logiciel restaurant Sénégal, caisse dibiterie Dakar, POS restaurant Sénégal, gestion menu dibiterie',
    path: '/sn/industries/restaurants',
    h1: 'Restaurants & dibiteries',
    breadcrumb: 'Restaurants',
    schemaType: 'service',
  },
  'industries/salons': {
    title: 'Logiciel Salon Coiffure Sénégal — Rendez-vous & File SMS | ZYVO',
    description:
      'Gestion pour salons de coiffure et instituts de beauté au Sénégal. Rendez-vous, file d\'attente SMS, commissions et suivi prestations à Dakar.',
    keywords:
      'logiciel salon coiffure Sénégal, gestion institut beauté Dakar, rendez-vous coiffure Sénégal, ERP salon Sénégal',
    path: '/sn/industries/salons',
    h1: 'Salons & coiffure',
    breadcrumb: 'Salons',
    schemaType: 'service',
  },
  'industries/pharmacies': {
    title: 'Logiciel Pharmacie Sénégal — Stock, Lots & Péremption | ZYVO Dakar',
    description:
      'Gestion pour pharmacies et parapharmacies sénégalaises. Suivi lots, dates de péremption, ventes OTC et rapports. Conformité et traçabilité à Dakar.',
    keywords:
      'logiciel pharmacie Sénégal, gestion stock pharmacie Dakar, logiciel officine Sénégal, inventaire médicaments Sénégal',
    path: '/sn/industries/pharmacies',
    h1: 'Pharmacies & parapharmacies',
    breadcrumb: 'Pharmacies',
    schemaType: 'service',
  },
  'industries/logistics': {
    title: 'Logiciel Transport & Logistique Sénégal — Flotte & Facturation | ZYVO',
    description:
      'ERP pour entreprises de transport et distribution au Sénégal. Suivi expéditions, clients, facturation et gestion de flotte à Dakar et en région.',
    keywords:
      'logiciel transport Sénégal, gestion logistique Dakar, ERP distribution Sénégal, facturation transport Sénégal',
    path: '/sn/industries/logistics',
    h1: 'Transport & logistique',
    breadcrumb: 'Transport',
    schemaType: 'service',
  },
  'industries/services': {
    title: 'Logiciel Services B2B Sénégal — Devis, Factures & Projets | ZYVO',
    description:
      'Gestion pour cabinets, prestataires et entreprises de services au Sénégal. Devis, factures, suivi clients et projets. Comptabilité SYSCOHADA intégrée.',
    keywords:
      'logiciel services B2B Sénégal, gestion devis Dakar, ERP prestataires Sénégal, facturation services Sénégal',
    path: '/sn/industries/services',
    h1: 'Services & B2B',
    breadcrumb: 'Services B2B',
    schemaType: 'service',
  },
  blog: {
    title: 'Blog ZYVO Sénégal — Conseils gestion, caisse POS & digitalisation PME',
    description:
      'Articles pratiques pour entrepreneurs sénégalais : choisir un ERP, gérer son stock, Wave et Orange Money à la caisse, SYSCOHADA et TVA DGI. Par ZYVO Dakar.',
    keywords:
      'blog ERP Sénégal, conseils gestion Dakar, digitalisation PME Sénégal, articles caisse POS Sénégal',
    path: '/sn/blog',
    h1: 'Conseils pour entreprises sénégalaises',
    breadcrumb: 'Blog',
    schemaType: 'service',
  },
};

export function getSnSeoPath(slug: string[]): string {
  if (slug.length === 0) return 'home';
  return slug.join('/');
}

export function getSnPageSeo(slug: string[]): SnSeoPageMeta {
  const path = getSnSeoPath(slug);

  if (path.startsWith('blog/')) {
    const postSlug = path.slice('blog/'.length);
    const post = getMarketBlogPostBySlug('sn', postSlug);
    if (post) {
      return {
        title: post.metaTitle,
        description: post.metaDescription,
        keywords: post.keywords,
        path: `/sn/blog/${post.slug}`,
        h1: post.title,
        breadcrumb: post.category,
        schemaType: 'article',
        ogType: 'article',
      };
    }
  }

  return SN_PAGE_SEO[path] ?? SN_PAGE_SEO.home;
}

/** Contenu sémantique long-form pour la page d'accueil (crawl + mots-clés longue traîne) */
export const SN_HOME_SEO_CONTENT = {
  title: 'Le logiciel de gestion adapté aux entreprises sénégalaises',
  sections: [
    {
      heading: 'ERP et caisse POS pour PME à Dakar et dans les régions',
      body: `Au Sénégal, les commerçants de Dakar (Plateau, Almadies, Pikine, Guédiawaye), Thiès, Saint-Louis, Mbour, Kaolack et Touba cherchent un logiciel de gestion d'entreprise fiable : caisse enregistreuse (POS), gestion de stock, facturation avec TVA 18 % et suivi des paiements Wave, Orange Money et Free Money. ZYVO réunit tout cela dans une plateforme cloud en français, facturée en francs CFA (FCFA).`,
    },
    {
      heading: 'Conformité SYSCOHADA, NINEA et déclarations DGID',
      body: `Le Sénégal est membre de l'OHADA et applique le référentiel comptable SYSCOHADA révisé. Toute entreprise formelle doit tenir une comptabilité conforme, produire des états financiers et respecter les obligations fiscales de la Direction Générale des Impôts et des Domaines (DGID). ZYVO génère des factures numérotées avec NINEA, suit la TVA à 18 % et exporte les journaux de ventes pour faciliter vos déclarations. Idéal pour les PME qui veulent professionnaliser leur comptabilité sans recruter un expert-comptable à temps plein.`,
    },
    {
      heading: 'Wave, Orange Money, Free Money et connexion 4G',
      body: `Les paiements mobiles dominent le commerce sénégalais — Wave est le leader incontesté, suivi d'Orange Money et Free Money. ZYVO permet d'enregistrer les encaissements Wave, Orange Money et Free Money à la caisse avec un journal détaillé pour le rapprochement mensuel. L'interface légère fonctionne sur smartphone Android, tablette ou PC — même avec une connexion 4G instable. Le mode dégradé permet de continuer à vendre lors des coupures réseau.`,
    },
    {
      heading: 'Qui utilise ZYVO au Sénégal ?',
      body: `Boutiques et superettes, restaurants et dibiteries, salons de coiffure, pharmacies, quincailleries, commerces de gros et entreprises de services B2B. Que vous ayez un seul point de vente au marché Sandaga ou plusieurs magasins à travers Dakar, ZYVO centralise stock, ventes, employés et rapports depuis un seul tableau de bord. Les entreprises de Thiès, Saint-Louis, Mbour et Kaolack bénéficient du même logiciel, adapté aux réalités du marché sénégalais et aux exigences de l'APIX et de la CCIS pour les entreprises formalisées.`,
    },
  ],
};
