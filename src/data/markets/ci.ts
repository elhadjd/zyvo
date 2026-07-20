import type { MarketConfig } from '@/lib/markets/types';
import { getSolutionsNavSubmenu } from '@/data/markets/market-modules';

export const ciMarket: MarketConfig = {
  code: 'ci',
  countryName: 'Côte d\'Ivoire',
  countryNameLocal: 'Côte d\'Ivoire',
  flag: '🇨🇮',
  locale: 'fr_CI',
  hreflang: 'fr-CI',
  language: 'fr',
  languageLabel: 'Français',
  currency: 'XOF',
  currencySymbol: 'FCFA',
  timezone: 'Africa/Abidjan',
  routePrefix: '/ci',
  active: true,
  contact: {
    email: 'commercial@zyvoerp.com',
    supportEmail: 'support@zyvoerp.com',
    phone: '+1 9735249725',
    whatsapp: '+19735249725',
    address: {
      street: 'Cocody',
      district: 'Cocody',
      city: 'Abidjan',
      country: 'CI',
    },
  },
  tagline: 'Logiciel de gestion d\'entreprise pour les PME ivoiriennes',
  description:
    'ZYVO aide les commerçants, restaurateurs, salons, pharmacies et entreprises de services en Côte d\'Ivoire à digitaliser leurs opérations : caisse, stock, clients, employés, facturation et rapports — optimisé pour mobile, Orange Money, MTN MoMo et connexions locales.',
  trustMessage:
    'La plateforme cloud conçue pour les réalités du marché ivoirien — mobile-first, Orange Money & MTN MoMo et support en français.',
  valueProposition:
    'Pensé pour Abidjan et les régions : simple à prendre en main, même avec une connexion limitée.',
  signup: {
    language: 'fr',
    country: { id: 54, name: 'Côte d\'Ivoire', code: 'ci' },
    currency: { code: 'XOF', currency: 'West African CFA Franc', digits: 0, number: 952 },
  },
  hero: {
    eyebrow:
      'Logiciel de gestion pour boutiques, restaurants, salons et pharmacies en Côte d\'Ivoire',
    title: 'Logiciel de gestion d\'entreprise pour les PME ivoiriennes',
    subtitle:
      'Caisse (POS), inventaire, clients, employés, rendez-vous, facturation et tableaux de bord — un système simple, en français, adapté au marché ivoirien.',
    valueProposition:
      'Orange Money, MTN MoMo, Moov Money, mode hors-ligne partiel et interface légère pour les connexions 4G d\'Abidjan, Bouaké, Yamoussoukro et Korhogo.',
    primaryCta: 'Essai gratuit 7 jours',
    secondaryCta: 'Demander une démo',
    trustBadges: ['Essai gratuit', 'Sans carte bancaire', 'Support en français'],
    highlights: ['Mobile-first', 'Orange Money & MTN MoMo', 'Multi-boutiques', 'Support local'],
    audiencesLabel: 'Conçu pour',
    audiences: [
      'Boutiques & superettes',
      'Restaurants & maquis',
      'Salons & coiffure',
      'Pharmacies',
      'Quincailleries',
      'Transport & logistique',
      'Services B2B',
      'Commerce de gros',
    ],
    imageAlt:
      'Tableau de bord ZYVO montrant les ventes, le stock et la gestion d\'équipe pour une PME en Côte d\'Ivoire',
  },
  stats: [
    { value: '90%', label: 'des PME utilisent le mobile comme outil principal' },
    { value: '4G', label: 'optimisé pour les connexions locales' },
    { value: '7 jours', label: 'd\'essai gratuit sans engagement' },
    { value: '24h', label: 'support commercial en français' },
  ],
  whyLocal: {
    title: 'Pourquoi ZYVO en Côte d\'Ivoire ?',
    subtitle:
      'Le marché du logiciel en Côte d\'Ivoire évolue vite : digitalisation des caisses, traçabilité du stock, conformité fiscale DGI et paiements Orange Money et MTN MoMo. ZYVO répond aux besoins réels des entrepreneurs ivoiriens.',
    points: [
      {
        title: 'Paiements mobiles intégrés',
        description:
          'Encaissez et suivez les paiements Orange Money, MTN MoMo et Moov Money directement à la caisse. Réduisez les erreurs de caisse et gardez une trace claire de chaque transaction en FCFA.',
      },
      {
        title: 'Conçu pour la connexion locale',
        description:
          'Interface légère, synchronisation intelligente et mode dégradé pour continuer à vendre même quand le réseau fluctue — lors des coupures à Abidjan, Bouaké ou dans les régions.',
      },
      {
        title: 'Gestion multi-points de vente',
        description:
          'Gérez plusieurs boutiques au Cocody, Plateau, Yopougon ou dans les régions depuis un seul tableau de bord. Stock, ventes et équipes centralisés.',
      },
      {
        title: 'Facturation & conformité DGI',
        description:
          'Générez des factures conformes avec NCC, suivez la TVA à 18 % et préparez vos déclarations pour la DGI Côte d\'Ivoire (DGI). Moins de paperasse, plus de visibilité sur votre marge.',
      },
      {
        title: 'Formation & onboarding en français',
        description:
          'Équipe de mise en route, tutoriels en français et accompagnement WhatsApp pour vos caissiers et gérants — pas besoin d\'être expert en informatique.',
      },
      {
        title: 'Tarifs en FCFA',
        description:
          'Plans transparents en FCFA, facturation mensuelle ou annuelle, sans surprise. Paiement par Orange Money, MTN MoMo, virement ou espèces via nos partenaires locaux.',
      },
    ],
  },
  mobileMoney: {
    title: 'Paiements adaptés au marché ivoirien',
    subtitle:
      'Au Côte d\'Ivoire, Orange Money et MTN MoMo dominent les paiements quotidiens. ZYVO s\'intègre aux habitudes de vos clients.',
    methods: [
      {
        name: 'Orange Money',
        description:
          'Le leader des paiements mobiles en Côte d\'Ivoire. Enregistrez les encaissements Orange Money à la caisse et réconciliez automatiquement votre journal en FCFA.',
      },
      {
        name: 'Orange Money',
        description:
          'Acceptez et tracez les paiements Orange Money. Idéal pour les boutiques, salons et restaurants à fort trafic à Abidjan et en région.',
      },
      {
        name: 'Moov Money',
        description:
          'Suivez les paiements Moov Money dans le même journal de caisse. Adaptez-vous aux préférences de paiement de tous vos clients.',
      },
      {
        name: 'Espèces & virement',
        description:
          'Gérez les paiements en espèces (FCFA) et les virements bancaires locaux (CBAO, Ecobank, BHS, Banque Atlantique) dans le même journal de caisse.',
      },
    ],
    note:
      'Les intégrations directes Orange Money / Orange Money sont en déploiement progressif. Contactez-nous pour activer le module paiements mobiles dans votre région.',
  },
  industries: [
    {
      id: 'retail',
      name: 'Boutiques & commerce de détail',
      description:
        'Superettes, boutiques de mode, électronique et quincailleries à Abidjan et en province. Gestion stock, codes-barres et caisse rapide en FCFA.',
      href: '/industries/retail',
      icon: 'store',
    },
    {
      id: 'restaurants',
      name: 'Restaurants & maquis',
      description:
        'Caisse rapide, gestion des menus, commandes et suivi des ventes journalières pour restaurants, maquis et traiteurs.',
      href: '/industries/restaurants',
      icon: 'utensils',
    },
    {
      id: 'salons',
      name: 'Salons & coiffure',
      description:
        'Rendez-vous, file d\'attente SMS, gestion des prestations et commissions pour salons de coiffure et instituts de beauté.',
      href: '/industries/salons',
      icon: 'scissors',
    },
    {
      id: 'pharmacies',
      name: 'Pharmacies & parapharmacies',
      description:
        'Suivi des lots, dates de péremption, ventes OTC et rapports pour pharmacies urbaines et de quartier en Côte d\'Ivoire.',
      href: '/industries/pharmacies',
      icon: 'pill',
    },
    {
      id: 'logistics',
      name: 'Transport & logistique',
      description:
        'Suivi des expéditions, clients, facturation et flotte pour entreprises de transport et distribution en Côte d\'Ivoire.',
      href: '/industries/logistics',
      icon: 'truck',
    },
    {
      id: 'services',
      name: 'Services & B2B',
      description:
        'Devis, factures, suivi clients et projets pour cabinets, prestataires et entreprises de services.',
      href: '/industries/services',
      icon: 'building',
    },
  ],
  features: [
    {
      title: 'Caisse (POS) rapide',
      description:
        'Encaissement en quelques secondes, tickets personnalisés, remises et gestion multi-caissiers — même sur tablette Android.',
    },
    {
      title: 'Inventaire & stock',
      description:
        'Alertes de rupture, inventaires, transferts entre magasins et valorisation du stock en temps réel en FCFA.',
    },
    {
      title: 'Clients & fidélité',
      description:
        'Historique d\'achats, crédit client, programmes de fidélité et campagnes SMS ciblées.',
    },
    {
      title: 'Employés & permissions',
      description:
        'Horaires, rôles, commissions et contrôle d\'accès pour protéger vos données sensibles.',
    },
    {
      title: 'Rendez-vous & file d\'attente',
      description:
        'Prise de rendez-vous en ligne, notifications SMS et gestion de la salle d\'attente pour salons et cliniques.',
    },
    {
      title: 'Comptabilité & rapports',
      description:
        'Journal des ventes, dépenses, marges, export Excel et tableaux de bord pour piloter votre activité en FCFA.',
    },
  ],
  pricing: {
    title: 'Tarifs transparents en FCFA',
    subtitle:
      'Des plans adaptés aux PME ivoiriennes — de la boutique de quartier au réseau multi-magasins. Essai gratuit de 7 jours.',
    annualLabel: 'Annuel',
    monthlyLabel: 'Mensuel',
    savingsNote: 'Économisez 20 % avec la facturation annuelle',
    plans: [
      {
        id: 'starter',
        name: 'Essentiel',
        description: 'Pour les petites boutiques et commerces qui démarrent',
        monthlyPrice: 14_950,
        annualPrice: 11_950,
        currency: 'XOF',
        currencySymbol: 'FCFA',
        users: 'Jusqu\'à 3 utilisateurs',
        features: [
          'Caisse (POS)',
          'Inventaire de base',
          'Facturation',
          'Rapports essentiels',
          'Support par email',
        ],
        cta: 'Essai gratuit 7 jours',
        popular: false,
      },
      {
        id: 'growth',
        name: 'Croissance',
        description: 'Pour les entreprises en expansion à Abidjan et dans les régions',
        monthlyPrice: 29_950,
        annualPrice: 23_950,
        currency: 'XOF',
        currencySymbol: 'FCFA',
        users: 'Jusqu\'à 10 utilisateurs',
        features: [
          'Tout Essentiel',
          'Gestion des employés',
          'Comptabilité complète',
          'Rendez-vous & planning',
          'Boutique en ligne',
          'Support prioritaire (24h)',
          'Orange Money & MTN MoMo (bêta)',
        ],
        cta: 'Essai gratuit 7 jours',
        popular: true,
      },
      {
        id: 'business',
        name: 'Entreprise',
        description: 'Pour les groupes, chaînes et opérations multi-sites',
        monthlyPrice: 59_950,
        annualPrice: 47_950,
        currency: 'XOF',
        currencySymbol: 'FCFA',
        users: 'Utilisateurs illimités',
        features: [
          'Tout Croissance',
          'Multi-magasins',
          'Logistique & achats',
          'API & intégrations',
          'Formation sur site',
          'Gestionnaire de compte dédié',
        ],
        cta: 'Contacter les ventes',
        popular: false,
      },
    ],
    footnote:
      'Tarifs indicatifs en FCFA. Paiement par Orange Money, MTN MoMo, virement ou arrangement local. TVA applicable selon la réglementation en vigueur.',
  },
  faqs: [
    {
      question: 'ZYVO est-il conforme au SYSCOHADA et à la DGI en Côte d\'Ivoire ?',
      answer:
        'Oui. Le Côte d\'Ivoire est membre de l\'OHADA et applique le référentiel comptable SYSCOHADA. ZYVO génère des factures numérotées, suit la TVA à 18 % et exporte les journaux de ventes pour vos déclarations à la Direction Générale des Impôts et des Domaines (DGI). Consultez votre expert-comptable pour la conformité spécifique à votre secteur.',
    },
    {
      question: 'Quel est le meilleur logiciel de caisse pour une boutique à Abidjan ?',
      answer:
        'ZYVO offre une caisse POS cloud adaptée aux boutiques du Cocody, Plateau, Yopougon, Marcory et en province : encaissement rapide, Orange Money, MTN MoMo, Moov Money, gestion stock et rapports en FCFA. Essai gratuit de 7 jours sans carte bancaire internationale.',
    },
    {
      question: 'ZYVO fonctionne-t-il avec une connexion internet lente ?',
      answer:
        'Oui. ZYVO est optimisé pour les connexions 4G courantes en Côte d\'Ivoire. La caisse peut continuer à fonctionner en mode dégradé et synchronise les données dès que le réseau revient.',
    },
    {
      question: 'Puis-je payer en FCFA ?',
      answer:
        'Absolument. Tous nos plans sont facturés en FCFA (XOF). Nous acceptons Orange Money, MTN MoMo, le virement bancaire et d\'autres moyens de paiement locaux sur demande.',
    },
    {
      question: 'Orange Money, MTN MoMo et Moov Money sont-ils supportés ?',
      answer:
        'Le module paiements mobiles est en déploiement progressif en Côte d\'Ivoire. Vous pouvez déjà enregistrer manuellement les paiements Orange Money, MTN MoMo et Moov Money à la caisse. Contactez-nous pour rejoindre la bêta d\'intégration automatique.',
    },
    {
      question: 'ZYVO est-il conforme aux exigences de la DGI ?',
      answer:
        'ZYVO génère des factures avec mentions légales (NCC, TVA 18 %), journaux de ventes et exports pour faciliter vos déclarations fiscales. Nous recommandons de consulter un expert-comptable agréé en Côte d\'Ivoire pour la conformité spécifique à votre secteur.',
    },
    {
      question: 'Puis-je gérer plusieurs boutiques à Abidjan ?',
      answer:
        'Oui, à partir du plan Croissance. Vous centralisez le stock, les ventes et les rapports du Cocody, Plateau, Yopougon, Marcory ou d\'autres communes depuis un seul compte.',
    },
    {
      question: 'Proposez-vous une formation en français ?',
      answer:
        'Oui. Nous offrons des tutoriels en français, une documentation complète et un accompagnement WhatsApp pour la mise en route de votre équipe.',
    },
    {
      question: 'Quel matériel faut-il pour utiliser ZYVO ?',
      answer:
        'Un smartphone Android, une tablette ou un ordinateur avec navigateur moderne suffit. Pour la caisse, nous recommandons une tablette ou un PC avec imprimante de tickets — disponibles chez nos partenaires locaux à Abidjan.',
    },
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer:
        'Oui, 7 jours d\'essai gratuit avec accès complet. Aucune carte bancaire internationale requise pour démarrer.',
    },
  ],
  pages: {
    home: {
      title: 'ZYVO Côte d\'Ivoire — Logiciel de gestion pour PME à Abidjan',
      description:
        'Digitalisez votre boutique, restaurant, salon ou pharmacie en Côte d\'Ivoire. Caisse, stock, clients et comptabilité en français — Orange Money, MTN MoMo, FCFA, essai gratuit 7 jours.',
      keywords:
        'logiciel gestion entreprise Côte d\'Ivoire, POS Abidjan, caisse enregistreuse Côte d\'Ivoire, ERP PME Côte d\'Ivoire, Orange Money caisse, Orange Money caisse, logiciel boutique Abidjan',
      path: '/ci',
    },
    features: {
      title: 'Fonctionnalités — Plateforme tout-en-un pour entreprises ivoiriennes',
      description:
        'Découvrez les fonctionnalités ZYVO : caisse POS, inventaire, employés, rendez-vous, file d\'attente SMS, comptabilité et rapports — adaptés au marché ivoirien.',
      keywords: 'fonctionnalités ZYVO Côte d\'Ivoire, POS inventaire Abidjan, logiciel caisse Côte d\'Ivoire',
      path: '/ci/features',
    },
    pricing: {
      title: 'Tarifs ZYVO Côte d\'Ivoire — Plans en FCFA dès 11 950 FCFA/mois',
      description:
        'Tarifs ZYVO en FCFA à partir de 11 950 FCFA/mois (annuel). Essai gratuit 7 jours pour les PME ivoiriennes. Comparez Essentiel, Croissance et Entreprise.',
      keywords: 'tarifs ZYVO Côte d\'Ivoire, prix logiciel gestion Abidjan, ERP FCFA',
      path: '/ci/pricing',
    },
    about: {
      title: 'À propos de ZYVO en Côte d\'Ivoire',
      description:
        'ZYVO accompagne la digitalisation des PME ivoiriennes — d\'Abidjan aux régions. Découvrez notre mission et notre approche locale.',
      keywords: 'ZYVO Côte d\'Ivoire, entreprise logiciel Abidjan',
      path: '/ci/about',
    },
    contact: {
      title: 'Contactez ZYVO Côte d\'Ivoire — Devis & démonstration',
      description:
        'Demandez une démo ou un devis pour votre entreprise en Côte d\'Ivoire. Support en français, réponse sous 24h ouvrées.',
      keywords: 'contact ZYVO Côte d\'Ivoire, démo logiciel Abidjan',
      path: '/ci/contact',
    },
    faq: {
      title: 'FAQ — Questions fréquentes ZYVO Côte d\'Ivoire',
      description:
        'Réponses aux questions sur ZYVO en Côte d\'Ivoire : Orange Money, MTN MoMo, TVA DGI, multi-boutiques Abidjan et essai gratuit.',
      keywords: 'FAQ ZYVO Côte d\'Ivoire, questions logiciel gestion Abidjan',
      path: '/ci/faq',
    },
    demo: {
      title: 'Réserver une démo — ZYVO Côte d\'Ivoire',
      description:
        'Planifiez une démonstration gratuite de ZYVO pour votre entreprise en Côte d\'Ivoire. Présentation en français par notre équipe.',
      keywords: 'démo ZYVO Côte d\'Ivoire, présentation logiciel Abidjan',
      path: '/ci/demo',
    },
    solutions: {
      title: 'Solutions — Outils de gestion pour entreprises ivoiriennes',
      description:
        'Solutions ZYVO pour la caisse, l\'inventaire, les employés, la logistique et plus — adaptées aux PME en Côte d\'Ivoire.',
      keywords: 'solutions gestion Côte d\'Ivoire, POS inventaire Abidjan',
      path: '/ci/solutions',
    },
  },
  navigation: [
    {
      label: 'Solutions',
      href: '/solutions',
      submenu: getSolutionsNavSubmenu(),
    },
    {
      label: 'Secteurs',
      href: '/industries',
      submenu: [
        { label: 'Boutiques & retail', href: '/industries/retail' },
        { label: 'Restaurants & maquis', href: '/industries/restaurants' },
        { label: 'Salons & coiffure', href: '/industries/salons' },
        { label: 'Pharmacies', href: '/industries/pharmacies' },
        { label: 'Transport & logistique', href: '/industries/logistics' },
      ],
    },
    {
      label: 'Produit',
      href: '/features',
      submenu: [
        { label: 'Fonctionnalités', href: '/features' },
        { label: 'Tarifs', href: '/pricing' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Calculateurs fiscaux gratuits', href: '/outils' },
      ],
    },
    {
      label: 'Entreprise',
      href: '/about',
      submenu: [
        { label: 'À propos', href: '/about' },
        { label: 'Partenariats', href: '/partnerships' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '/blog' },
      ],
    },
  ],
  footerTagline:
    'Accompagner la digitalisation des PME ivoiriennes — d\'Abidjan à Bouaké, Yamoussoukro et Man.',
};
