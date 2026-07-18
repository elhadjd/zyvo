import type { MarketConfig } from '@/lib/markets/types';

export const gnMarket: MarketConfig = {
  code: 'gn',
  countryName: 'Guinea',
  countryNameLocal: 'Guinée',
  flag: '🇬🇳',
  locale: 'fr_GN',
  hreflang: 'fr-GN',
  language: 'fr',
  languageLabel: 'Français',
  currency: 'GNF',
  currencySymbol: 'FG',
  timezone: 'Africa/Conakry',
  routePrefix: '/gn',
  active: true,
  contact: {
    email: 'commercial@zyvoerp.com',
    supportEmail: 'support@zyvoerp.com',
    phone: '+224 620 00 00 00',
    whatsapp: '+224620000000',
    address: {
      street: 'Kaloum',
      district: 'Commune de Kaloum',
      city: 'Conakry',
      country: 'GN',
    },
  },
  tagline: 'Logiciel de gestion d\'entreprise pour les PME guinéennes',
  description:
    'ZYVO aide les commerçants, restaurateurs, salons, pharmacies et entreprises de services en Guinée à digitaliser leurs opérations : caisse, stock, clients, employés, facturation et rapports — optimisé pour mobile, Orange Money et connexions locales.',
  trustMessage:
    'La plateforme cloud conçue pour les réalités du marché guinéen — mobile-first, paiements locaux et support en français.',
  valueProposition:
    'Pensé pour Conakry et l\'intérieur du pays : simple à prendre en main, même avec une connexion limitée.',
  signup: {
    language: 'fr',
    country: { id: 92, name: 'Guinea', code: 'gn' },
    currency: { code: 'GNF', currency: 'Guinean Franc', digits: 0, number: 324 },
  },
  hero: {
    eyebrow:
      'Logiciel de gestion pour boutiques, restaurants, salons et pharmacies en Guinée',
    title: 'Gérez toute votre entreprise depuis une seule plateforme',
    subtitle:
      'Caisse (POS), inventaire, clients, employés, rendez-vous, facturation et tableaux de bord — un système simple, en français, adapté au marché guinéen.',
    valueProposition:
      'Orange Money, MTN MoMo, mode hors-ligne partiel et interface légère pour les connexions 3G/4G de Conakry, Kindia, Labé et Kankan.',
    primaryCta: 'Essai gratuit 7 jours',
    secondaryCta: 'Demander une démo',
    trustBadges: ['Essai gratuit', 'Sans carte bancaire', 'Support en français'],
    highlights: ['Mobile-first', 'Orange Money', 'Multi-boutiques', 'Support local'],
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
      'Tableau de bord ZYVO montrant les ventes, le stock et la gestion d\'équipe pour une PME en Guinée',
  },
  stats: [
    { value: '85%', label: 'des PME utilisent le mobile comme outil principal' },
    { value: '3G/4G', label: 'optimisé pour les connexions locales' },
    { value: '7 jours', label: 'd\'essai gratuit sans engagement' },
    { value: '24h', label: 'support commercial en français' },
  ],
  whyLocal: {
    title: 'Pourquoi ZYVO en Guinée ?',
    subtitle:
      'Le marché du logiciel en Guinée évolue vite : digitalisation des caisses, traçabilité du stock, conformité fiscale et paiements mobiles. ZYVO répond aux besoins réels des entrepreneurs guinéens.',
    points: [
      {
        title: 'Paiements mobiles intégrés',
        description:
          'Encaissez et suivez les paiements Orange Money et MTN MoMo directement à la caisse. Réduisez les erreurs de caisse et gardez une trace claire de chaque transaction.',
      },
      {
        title: 'Conçu pour la connexion locale',
        description:
          'Interface légère, synchronisation intelligente et mode dégradé pour continuer à vendre même quand le réseau fluctue — fréquent à Conakry et dans les préfectures.',
      },
      {
        title: 'Gestion multi-points de vente',
        description:
          'Gérez plusieurs boutiques à Kaloum, Ratoma, Matam ou dans l\'intérieur depuis un seul tableau de bord. Stock, ventes et équipes centralisés.',
      },
      {
        title: 'Facturation & suivi TVA',
        description:
          'Générez des factures conformes, suivez la TVA et préparez vos déclarations pour la DGI. Moins de paperasse, plus de visibilité sur votre marge.',
      },
      {
        title: 'Formation & onboarding en français',
        description:
          'Équipe de mise en route, tutoriels en français et accompagnement WhatsApp pour vos caissiers et gérants — pas besoin d\'être expert en informatique.',
      },
      {
        title: 'Tarifs en francs guinéens',
        description:
          'Plans transparents en GNF, facturation mensuelle ou annuelle, sans surprise. Paiement par virement, mobile money ou espèces via nos partenaires locaux.',
      },
    ],
  },
  mobileMoney: {
    title: 'Paiements adaptés au marché guinéen',
    subtitle:
      'En Guinée, le mobile money domine les paiements quotidiens. ZYVO s\'intègre aux habitudes de vos clients.',
    methods: [
      {
        name: 'Orange Money',
        description:
          'Le leader des paiements mobiles en Guinée. Enregistrez les encaissements Orange Money à la caisse et réconciliez automatiquement.',
      },
      {
        name: 'MTN MoMo',
        description:
          'Acceptez et tracez les paiements MTN Mobile Money. Idéal pour les boutiques, salons et restaurants à fort trafic.',
      },
      {
        name: 'Espèces & virement',
        description:
          'Suivez les paiements en espèces (GNF) et les virements bancaires locaux (BICIGUI, Ecobank, UBA) dans le même journal de caisse.',
      },
      {
        name: 'Paiement différé',
        description:
          'Gérez les crédits clients et les paiements échelonnés — courants dans le commerce de gros et la distribution.',
      },
    ],
    note:
      'Les intégrations directes Orange Money / MTN sont en déploiement progressif. Contactez-nous pour activer le module paiements mobiles dans votre région.',
  },
  industries: [
    {
      id: 'retail',
      name: 'Boutiques & commerce de détail',
      description:
        'Superettes, boutiques de mode, électronique et quincailleries à Conakry et en province. Gestion stock, codes-barres et caisse rapide.',
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
        'Suivi des lots, dates de péremption, ventes OTC et rapports pour pharmacies urbaines et de quartier.',
      href: '/industries/pharmacies',
      icon: 'pill',
    },
    {
      id: 'logistics',
      name: 'Transport & logistique',
      description:
        'Suivi des expéditions, clients, facturation et flotte pour entreprises de transport et distribution.',
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
        'Alertes de rupture, inventaires, transferts entre magasins et valorisation du stock en temps réel.',
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
        'Journal des ventes, dépenses, marges, export Excel et tableaux de bord pour piloter votre activité.',
    },
  ],
  pricing: {
    title: 'Tarifs transparents en francs guinéens',
    subtitle:
      'Des plans adaptés aux PME guinéennes — de la boutique de quartier au réseau multi-magasins. Essai gratuit de 7 jours.',
    annualLabel: 'Annuel',
    monthlyLabel: 'Mensuel',
    savingsNote: 'Économisez 20 % avec la facturation annuelle',
    plans: [
      {
        id: 'starter',
        name: 'Essentiel',
        description: 'Pour les petites boutiques et commerces qui démarrent',
        monthlyPrice: 450_000,
        annualPrice: 360_000,
        currency: 'GNF',
        currencySymbol: 'FG',
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
        description: 'Pour les entreprises en expansion à Conakry et en province',
        monthlyPrice: 900_000,
        annualPrice: 720_000,
        currency: 'GNF',
        currencySymbol: 'FG',
        users: 'Jusqu\'à 10 utilisateurs',
        features: [
          'Tout Essentiel',
          'Gestion des employés',
          'Comptabilité complète',
          'Rendez-vous & planning',
          'Boutique en ligne',
          'Support prioritaire (24h)',
          'Orange Money (bêta)',
        ],
        cta: 'Essai gratuit 7 jours',
        popular: true,
      },
      {
        id: 'business',
        name: 'Entreprise',
        description: 'Pour les groupes, chaînes et opérations multi-sites',
        monthlyPrice: 1_800_000,
        annualPrice: 1_440_000,
        currency: 'GNF',
        currencySymbol: 'FG',
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
      'Tarifs indicatifs en GNF. Paiement par virement, Orange Money ou arrangement local. TVA applicable selon la réglementation en vigueur.',
  },
  faqs: [
    {
      question: 'ZYVO fonctionne-t-il avec une connexion internet lente ?',
      answer:
        'Oui. ZYVO est optimisé pour les connexions 3G/4G courantes en Guinée. La caisse peut continuer à fonctionner en mode dégradé et synchronise les données dès que le réseau revient.',
    },
    {
      question: 'Puis-je payer en francs guinéens (GNF) ?',
      answer:
        'Absolument. Tous nos plans sont facturés en GNF. Nous acceptons le virement bancaire, Orange Money et d\'autres moyens de paiement locaux sur demande.',
    },
    {
      question: 'Orange Money et MTN MoMo sont-ils supportés ?',
      answer:
        'Le module paiements mobiles est en déploiement progressif en Guinée. Vous pouvez déjà enregistrer manuellement les paiements mobile money à la caisse. Contactez-nous pour rejoindre la bêta d\'intégration automatique.',
    },
    {
      question: 'ZYVO est-il conforme aux exigences de la DGI ?',
      answer:
        'ZYVO génère des factures détaillées avec TVA, journaux de ventes et exports pour faciliter vos déclarations fiscales. Nous recommandons de consulter votre comptable pour la conformité spécifique à votre secteur.',
    },
    {
      question: 'Puis-je gérer plusieurs boutiques à Conakry ?',
      answer:
        'Oui, à partir du plan Croissance. Vous centralisez le stock, les ventes et les rapports de Kaloum, Ratoma, Matam ou d\'autres communes depuis un seul compte.',
    },
    {
      question: 'Proposez-vous une formation en français ?',
      answer:
        'Oui. Nous offrons des tutoriels en français, une documentation complète et un accompagnement WhatsApp pour la mise en route de votre équipe.',
    },
    {
      question: 'Quel matériel faut-il pour utiliser ZYVO ?',
      answer:
        'Un smartphone Android, une tablette ou un ordinateur avec navigateur moderne suffit. Pour la caisse, nous recommandons une tablette ou un PC avec imprimante de tickets — disponibles chez nos partenaires locaux à Conakry.',
    },
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer:
        'Oui, 7 jours d\'essai gratuit avec accès complet. Aucune carte bancaire internationale requise pour démarrer.',
    },
  ],
  pages: {
    home: {
      title: 'ZYVO Guinée — Logiciel de gestion pour PME à Conakry',
      description:
        'Digitalisez votre boutique, restaurant, salon ou pharmacie en Guinée. Caisse, stock, clients et comptabilité en français — Orange Money, mobile-first, essai gratuit 7 jours.',
      keywords:
        'logiciel gestion entreprise Guinée, POS Conakry, caisse enregistreuse Guinée, ERP PME Guinée, Orange Money caisse, logiciel boutique Conakry',
      path: '/gn',
    },
    features: {
      title: 'Fonctionnalités — Plateforme tout-en-un pour entreprises guinéennes',
      description:
        'Découvrez les fonctionnalités ZYVO : caisse POS, inventaire, employés, rendez-vous, file d\'attente SMS, comptabilité et rapports — adaptés au marché guinéen.',
      keywords: 'fonctionnalités ZYVO Guinée, POS inventaire Conakry, logiciel caisse Guinée',
      path: '/gn/features',
    },
    pricing: {
      title: 'Tarifs ZYVO Guinée — Plans en francs guinéens (GNF)',
      description:
        'Tarifs ZYVO en GNF à partir de 360 000 FG/mois (annuel). Essai gratuit 7 jours pour les PME guinéennes. Comparez Essentiel, Croissance et Entreprise.',
      keywords: 'tarifs ZYVO Guinée, prix logiciel gestion Conakry, ERP GNF',
      path: '/gn/pricing',
    },
    about: {
      title: 'À propos de ZYVO en Guinée',
      description:
        'ZYVO accompagne la digitalisation des PME guinéennes — de Conakry à l\'intérieur du pays. Découvrez notre mission et notre approche locale.',
      keywords: 'ZYVO Guinée, entreprise logiciel Conakry',
      path: '/gn/about',
    },
    contact: {
      title: 'Contactez ZYVO Guinée — Devis & démonstration',
      description:
        'Demandez une démo ou un devis pour votre entreprise en Guinée. Support en français, réponse sous 24h ouvrées.',
      keywords: 'contact ZYVO Guinée, démo logiciel Conakry',
      path: '/gn/contact',
    },
    faq: {
      title: 'FAQ — Questions fréquentes ZYVO Guinée',
      description:
        'Réponses aux questions sur ZYVO en Guinée : paiements mobiles, connexion, TVA, multi-boutiques et essai gratuit.',
      keywords: 'FAQ ZYVO Guinée, questions logiciel gestion Conakry',
      path: '/gn/faq',
    },
    demo: {
      title: 'Réserver une démo — ZYVO Guinée',
      description:
        'Planifiez une démonstration gratuite de ZYVO pour votre entreprise en Guinée. Présentation en français par notre équipe.',
      keywords: 'démo ZYVO Guinée, présentation logiciel Conakry',
      path: '/gn/demo',
    },
    solutions: {
      title: 'Solutions — Outils de gestion pour entreprises guinéennes',
      description:
        'Solutions ZYVO pour la caisse, l\'inventaire, les employés, la logistique et plus — adaptées aux PME en Guinée.',
      keywords: 'solutions gestion Guinée, POS inventaire Conakry',
      path: '/gn/solutions',
    },
  },
  navigation: [
    {
      label: 'Solutions',
      href: '/solutions',
      submenu: [
        { label: 'Caisse (POS)', href: '/solutions/point-of-sale' },
        { label: 'File d\'attente & SMS', href: '/solutions/customer-queue-management' },
        { label: 'Inventaire', href: '/solutions/inventory-management' },
        { label: 'Employés', href: '/solutions/employee-management' },
        { label: 'Facturation', href: '/solutions/invoicing' },
        { label: 'Toutes les solutions', href: '/solutions' },
      ],
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
      ],
    },
    {
      label: 'Entreprise',
      href: '/about',
      submenu: [
        { label: 'À propos', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '/blog' },
      ],
    },
  ],
  footerTagline:
    'Accompagner la digitalisation des PME guinéennes — de Kaloum à l\'intérieur du pays.',
};
