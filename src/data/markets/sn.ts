import type { MarketConfig } from '@/lib/markets/types';
import { getSolutionsNavSubmenu } from '@/data/markets/market-modules';

export const snMarket: MarketConfig = {
  code: 'sn',
  countryName: 'Senegal',
  countryNameLocal: 'Sénégal',
  flag: '🇸🇳',
  locale: 'fr_SN',
  hreflang: 'fr-SN',
  language: 'fr',
  languageLabel: 'Français',
  currency: 'XOF',
  currencySymbol: 'FCFA',
  timezone: 'Africa/Dakar',
  routePrefix: '/sn',
  active: true,
  contact: {
    email: 'commercial@zyvoerp.com',
    supportEmail: 'support@zyvoerp.com',
    phone: '+221 77 123 45 67',
    whatsapp: '+221771234567',
    address: {
      street: 'Plateau',
      district: 'Plateau',
      city: 'Dakar',
      country: 'SN',
    },
  },
  tagline: 'Logiciel de gestion d\'entreprise pour les PME sénégalaises',
  description:
    'ZYVO aide les commerçants, restaurateurs, salons, pharmacies et entreprises de services au Sénégal à digitaliser leurs opérations : caisse, stock, clients, employés, facturation et rapports — optimisé pour mobile, Wave, Orange Money et connexions locales.',
  trustMessage:
    'La plateforme cloud conçue pour les réalités du marché sénégalais — mobile-first, Wave & Orange Money et support en français.',
  valueProposition:
    'Pensé pour Dakar et les régions : simple à prendre en main, même avec une connexion limitée.',
  signup: {
    language: 'fr',
    country: { id: 186, name: 'Senegal', code: 'sn' },
    currency: { code: 'XOF', currency: 'West African CFA Franc', digits: 0, number: 952 },
  },
  hero: {
    eyebrow:
      'Logiciel de gestion pour boutiques, restaurants, salons et pharmacies au Sénégal',
    title: 'Logiciel de gestion d\'entreprise pour les PME sénégalaises',
    subtitle:
      'Caisse (POS), inventaire, clients, employés, rendez-vous, facturation et tableaux de bord — un système simple, en français, adapté au marché sénégalais.',
    valueProposition:
      'Wave, Orange Money, Free Money, mode hors-ligne partiel et interface légère pour les connexions 4G de Dakar, Thiès, Saint-Louis et Kaolack.',
    primaryCta: 'Essai gratuit 7 jours',
    secondaryCta: 'Demander une démo',
    trustBadges: ['Essai gratuit', 'Sans carte bancaire', 'Support en français'],
    highlights: ['Mobile-first', 'Wave & Orange Money', 'Multi-boutiques', 'Support local'],
    audiencesLabel: 'Conçu pour',
    audiences: [
      'Boutiques & superettes',
      'Restaurants & dibiteries',
      'Salons & coiffure',
      'Pharmacies',
      'Quincailleries',
      'Transport & logistique',
      'Services B2B',
      'Commerce de gros',
    ],
    imageAlt:
      'Tableau de bord ZYVO montrant les ventes, le stock et la gestion d\'équipe pour une PME au Sénégal',
  },
  stats: [
    { value: '90%', label: 'des PME utilisent le mobile comme outil principal' },
    { value: '4G', label: 'optimisé pour les connexions locales' },
    { value: '7 jours', label: 'd\'essai gratuit sans engagement' },
    { value: '24h', label: 'support commercial en français' },
  ],
  whyLocal: {
    title: 'Pourquoi ZYVO au Sénégal ?',
    subtitle:
      'Le marché du logiciel au Sénégal évolue vite : digitalisation des caisses, traçabilité du stock, conformité fiscale DGI et paiements Wave et Orange Money. ZYVO répond aux besoins réels des entrepreneurs sénégalais.',
    points: [
      {
        title: 'Paiements mobiles intégrés',
        description:
          'Encaissez et suivez les paiements Wave, Orange Money et Free Money directement à la caisse. Réduisez les erreurs de caisse et gardez une trace claire de chaque transaction en FCFA.',
      },
      {
        title: 'Conçu pour la connexion locale',
        description:
          'Interface légère, synchronisation intelligente et mode dégradé pour continuer à vendre même quand le réseau fluctue — lors des coupures à Dakar, Thiès ou dans les régions.',
      },
      {
        title: 'Gestion multi-points de vente',
        description:
          'Gérez plusieurs boutiques au Plateau, Almadies, Pikine ou dans les régions depuis un seul tableau de bord. Stock, ventes et équipes centralisés.',
      },
      {
        title: 'Facturation & conformité DGI',
        description:
          'Générez des factures conformes avec NINEA, suivez la TVA à 18 % et préparez vos déclarations pour la DGI Sénégal (DGID). Moins de paperasse, plus de visibilité sur votre marge.',
      },
      {
        title: 'Formation & onboarding en français',
        description:
          'Équipe de mise en route, tutoriels en français et accompagnement WhatsApp pour vos caissiers et gérants — pas besoin d\'être expert en informatique.',
      },
      {
        title: 'Tarifs en FCFA',
        description:
          'Plans transparents en FCFA, facturation mensuelle ou annuelle, sans surprise. Paiement par Wave, Orange Money, virement ou espèces via nos partenaires locaux.',
      },
    ],
  },
  mobileMoney: {
    title: 'Paiements adaptés au marché sénégalais',
    subtitle:
      'Au Sénégal, Wave et Orange Money dominent les paiements quotidiens. ZYVO s\'intègre aux habitudes de vos clients.',
    methods: [
      {
        name: 'Wave',
        description:
          'Le leader des paiements mobiles au Sénégal. Enregistrez les encaissements Wave à la caisse et réconciliez automatiquement votre journal en FCFA.',
      },
      {
        name: 'Orange Money',
        description:
          'Acceptez et tracez les paiements Orange Money. Idéal pour les boutiques, salons et restaurants à fort trafic à Dakar et en région.',
      },
      {
        name: 'Free Money',
        description:
          'Suivez les paiements Free Money dans le même journal de caisse. Adaptez-vous aux préférences de paiement de tous vos clients.',
      },
      {
        name: 'Espèces & virement',
        description:
          'Gérez les paiements en espèces (FCFA) et les virements bancaires locaux (CBAO, Ecobank, BHS, Banque Atlantique) dans le même journal de caisse.',
      },
    ],
    note:
      'Les intégrations directes Wave / Orange Money sont en déploiement progressif. Contactez-nous pour activer le module paiements mobiles dans votre région.',
  },
  industries: [
    {
      id: 'retail',
      name: 'Boutiques & commerce de détail',
      description:
        'Superettes, boutiques de mode, électronique et quincailleries à Dakar et en province. Gestion stock, codes-barres et caisse rapide en FCFA.',
      href: '/industries/retail',
      icon: 'store',
    },
    {
      id: 'restaurants',
      name: 'Restaurants & dibiteries',
      description:
        'Caisse rapide, gestion des menus, commandes et suivi des ventes journalières pour restaurants, dibiteries et traiteurs.',
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
        'Suivi des lots, dates de péremption, ventes OTC et rapports pour pharmacies urbaines et de quartier au Sénégal.',
      href: '/industries/pharmacies',
      icon: 'pill',
    },
    {
      id: 'logistics',
      name: 'Transport & logistique',
      description:
        'Suivi des expéditions, clients, facturation et flotte pour entreprises de transport et distribution au Sénégal.',
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
      'Des plans adaptés aux PME sénégalaises — de la boutique de quartier au réseau multi-magasins. Essai gratuit de 7 jours.',
    annualLabel: 'Annuel',
    monthlyLabel: 'Mensuel',
    savingsNote: 'Économisez 20 % avec la facturation annuelle',
    plans: [
      {
        id: 'starter',
        name: 'Essentiel',
        description: 'Pour les petites boutiques et commerces qui démarrent',
        monthlyPrice: 29_900,
        annualPrice: 23_900,
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
        description: 'Pour les entreprises en expansion à Dakar et dans les régions',
        monthlyPrice: 59_900,
        annualPrice: 47_900,
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
          'Wave & Orange Money (bêta)',
        ],
        cta: 'Essai gratuit 7 jours',
        popular: true,
      },
      {
        id: 'business',
        name: 'Entreprise',
        description: 'Pour les groupes, chaînes et opérations multi-sites',
        monthlyPrice: 119_900,
        annualPrice: 95_900,
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
      'Tarifs indicatifs en FCFA. Paiement par Wave, Orange Money, virement ou arrangement local. TVA applicable selon la réglementation en vigueur.',
  },
  faqs: [
    {
      question: 'ZYVO est-il conforme au SYSCOHADA et à la DGI au Sénégal ?',
      answer:
        'Oui. Le Sénégal est membre de l\'OHADA et applique le référentiel comptable SYSCOHADA. ZYVO génère des factures numérotées, suit la TVA à 18 % et exporte les journaux de ventes pour vos déclarations à la Direction Générale des Impôts et des Domaines (DGID). Consultez votre expert-comptable pour la conformité spécifique à votre secteur.',
    },
    {
      question: 'Quel est le meilleur logiciel de caisse pour une boutique à Dakar ?',
      answer:
        'ZYVO offre une caisse POS cloud adaptée aux boutiques du Plateau, Almadies, Pikine, Guédiawaye et en province : encaissement rapide, Wave, Orange Money, Free Money, gestion stock et rapports en FCFA. Essai gratuit de 7 jours sans carte bancaire internationale.',
    },
    {
      question: 'ZYVO fonctionne-t-il avec une connexion internet lente ?',
      answer:
        'Oui. ZYVO est optimisé pour les connexions 4G courantes au Sénégal. La caisse peut continuer à fonctionner en mode dégradé et synchronise les données dès que le réseau revient.',
    },
    {
      question: 'Puis-je payer en FCFA ?',
      answer:
        'Absolument. Tous nos plans sont facturés en FCFA (XOF). Nous acceptons Wave, Orange Money, le virement bancaire et d\'autres moyens de paiement locaux sur demande.',
    },
    {
      question: 'Wave, Orange Money et Free Money sont-ils supportés ?',
      answer:
        'Le module paiements mobiles est en déploiement progressif au Sénégal. Vous pouvez déjà enregistrer manuellement les paiements Wave, Orange Money et Free Money à la caisse. Contactez-nous pour rejoindre la bêta d\'intégration automatique.',
    },
    {
      question: 'ZYVO est-il conforme aux exigences de la DGID ?',
      answer:
        'ZYVO génère des factures avec mentions légales (NINEA, TVA 18 %), journaux de ventes et exports pour faciliter vos déclarations fiscales. Nous recommandons de consulter un expert-comptable agréé au Sénégal pour la conformité spécifique à votre secteur.',
    },
    {
      question: 'Puis-je gérer plusieurs boutiques à Dakar ?',
      answer:
        'Oui, à partir du plan Croissance. Vous centralisez le stock, les ventes et les rapports du Plateau, Almadies, Pikine, Guédiawaye ou d\'autres communes depuis un seul compte.',
    },
    {
      question: 'Proposez-vous une formation en français ?',
      answer:
        'Oui. Nous offrons des tutoriels en français, une documentation complète et un accompagnement WhatsApp pour la mise en route de votre équipe.',
    },
    {
      question: 'Quel matériel faut-il pour utiliser ZYVO ?',
      answer:
        'Un smartphone Android, une tablette ou un ordinateur avec navigateur moderne suffit. Pour la caisse, nous recommandons une tablette ou un PC avec imprimante de tickets — disponibles chez nos partenaires locaux à Dakar.',
    },
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer:
        'Oui, 7 jours d\'essai gratuit avec accès complet. Aucune carte bancaire internationale requise pour démarrer.',
    },
  ],
  pages: {
    home: {
      title: 'ZYVO Sénégal — Logiciel de gestion pour PME à Dakar',
      description:
        'Digitalisez votre boutique, restaurant, salon ou pharmacie au Sénégal. Caisse, stock, clients et comptabilité en français — Wave, Orange Money, FCFA, essai gratuit 7 jours.',
      keywords:
        'logiciel gestion entreprise Sénégal, POS Dakar, caisse enregistreuse Sénégal, ERP PME Sénégal, Wave caisse, Orange Money caisse, logiciel boutique Dakar',
      path: '/sn',
    },
    features: {
      title: 'Fonctionnalités — Plateforme tout-en-un pour entreprises sénégalaises',
      description:
        'Découvrez les fonctionnalités ZYVO : caisse POS, inventaire, employés, rendez-vous, file d\'attente SMS, comptabilité et rapports — adaptés au marché sénégalais.',
      keywords: 'fonctionnalités ZYVO Sénégal, POS inventaire Dakar, logiciel caisse Sénégal',
      path: '/sn/features',
    },
    pricing: {
      title: 'Tarifs ZYVO Sénégal — Plans en FCFA dès 23 900 FCFA/mois',
      description:
        'Tarifs ZYVO en FCFA à partir de 23 900 FCFA/mois (annuel). Essai gratuit 7 jours pour les PME sénégalaises. Comparez Essentiel, Croissance et Entreprise.',
      keywords: 'tarifs ZYVO Sénégal, prix logiciel gestion Dakar, ERP FCFA',
      path: '/sn/pricing',
    },
    about: {
      title: 'À propos de ZYVO au Sénégal',
      description:
        'ZYVO accompagne la digitalisation des PME sénégalaises — de Dakar aux régions. Découvrez notre mission et notre approche locale.',
      keywords: 'ZYVO Sénégal, entreprise logiciel Dakar',
      path: '/sn/about',
    },
    contact: {
      title: 'Contactez ZYVO Sénégal — Devis & démonstration',
      description:
        'Demandez une démo ou un devis pour votre entreprise au Sénégal. Support en français, réponse sous 24h ouvrées.',
      keywords: 'contact ZYVO Sénégal, démo logiciel Dakar',
      path: '/sn/contact',
    },
    faq: {
      title: 'FAQ — Questions fréquentes ZYVO Sénégal',
      description:
        'Réponses aux questions sur ZYVO au Sénégal : Wave, Orange Money, TVA DGI, multi-boutiques Dakar et essai gratuit.',
      keywords: 'FAQ ZYVO Sénégal, questions logiciel gestion Dakar',
      path: '/sn/faq',
    },
    demo: {
      title: 'Réserver une démo — ZYVO Sénégal',
      description:
        'Planifiez une démonstration gratuite de ZYVO pour votre entreprise au Sénégal. Présentation en français par notre équipe.',
      keywords: 'démo ZYVO Sénégal, présentation logiciel Dakar',
      path: '/sn/demo',
    },
    solutions: {
      title: 'Solutions — Outils de gestion pour entreprises sénégalaises',
      description:
        'Solutions ZYVO pour la caisse, l\'inventaire, les employés, la logistique et plus — adaptées aux PME au Sénégal.',
      keywords: 'solutions gestion Sénégal, POS inventaire Dakar',
      path: '/sn/solutions',
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
        { label: 'Restaurants & dibiteries', href: '/industries/restaurants' },
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
    'Accompagner la digitalisation des PME sénégalaises — de Dakar à Thiès, Saint-Louis et Touba.',
};
