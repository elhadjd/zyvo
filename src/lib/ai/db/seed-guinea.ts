import { seedProgrammaticPages } from './seed-programmatic';

const GN_PROGRAMMATIC_SEEDS = [
  {
    industry: 'restaurants',
    title: 'ZYVO ERP pour les restaurants en Guinée',
    headline: 'Logiciel de gestion pour restaurants et maquis à Conakry',
    metaTitle: 'ERP Restaurant Guinée — Caisse POS & Stock | ZYVO',
    metaDescription:
      'Gérez votre restaurant ou maquis en Guinée avec ZYVO : caisse POS, stock, Orange Money, facturation TVA DGI. Essai gratuit 7 jours.',
    keywords: 'ERP restaurant Guinée, POS maquis Conakry, gestion restaurant Guinée',
    content: [
      'Les restaurants et maquis de Conakry font face à des défis quotidiens : gestion des commandes, suivi des stocks alimentaires, encaissements Orange Money et conformité fiscale DGI.',
      'ZYVO ERP centralise la caisse POS, la gestion des stocks et la facturation dans une seule plateforme adaptée aux PME guinéennes.',
      'Enregistrez chaque vente en GNF, suivez vos ingrédients en temps réel et générez des rapports pour vos déclarations TVA à 18 %.',
    ],
    faq: [
      { question: 'ZYVO fonctionne-t-il sans connexion internet ?', answer: 'Oui, mode hors ligne avec synchronisation automatique.' },
      { question: 'Orange Money est-il supporté ?', answer: 'Oui, encaissements Orange Money et MTN MoMo à la caisse.' },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'pharmacies',
    title: 'ZYVO ERP pour les pharmacies en Guinée',
    headline: 'Gestion de pharmacie moderne à Conakry',
    metaTitle: 'Logiciel Pharmacie Guinée — Stock & Caisse POS | ZYVO',
    metaDescription:
      'Solution ERP pour pharmacies guinéennes : stock médicaments, péremption, caisse POS et SYSCOHADA.',
    keywords: 'logiciel pharmacie Guinée, gestion stock médicaments Conakry',
    content: [
      'Les pharmacies guinéennes gèrent des stocks sensibles avec dates de péremption et traçabilité des médicaments.',
      'ZYVO offre inventaire temps réel, alertes de péremption et caisse POS en GNF.',
      'Factures conformes SYSCOHADA et exports pour la DGI.',
    ],
    faq: [
      { question: 'Gestion des dates de péremption ?', answer: 'Oui, alertes automatiques sur produits proches de la péremption.' },
      { question: 'Conforme SYSCOHADA ?', answer: 'Oui, documents comptables conformes OHADA.' },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'retail-stores',
    title: 'ZYVO ERP pour les boutiques en Guinée',
    headline: 'Logiciel de gestion commerciale pour boutiques à Conakry',
    metaTitle: 'Logiciel Boutique Guinée — Caisse POS & Stock | ZYVO',
    metaDescription:
      'ERP pour boutiques et superettes guinéennes : caisse POS, stock temps réel, Orange Money. Digitalisez votre commerce à Conakry.',
    keywords: 'logiciel boutique Guinée, caisse superette Conakry, gestion commerciale Guinée',
    content: [
      'Les boutiques de Kaloum, Ratoma et en province ont besoin d\'un logiciel de gestion commerciale fiable.',
      'ZYVO combine caisse POS, inventaire temps réel et suivi des paiements mobiles.',
      'Contrôlez vos marges en GNF et réduisez les ruptures de stock.',
    ],
    faq: [
      { question: 'Adapté aux petites boutiques ?', answer: 'Oui, plan Essentiel dès 360 000 GNF/mois (annuel).' },
      { question: 'Multi-magasins ?', answer: 'Oui, à partir du plan Croissance.' },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'salons',
    title: 'ZYVO ERP pour les salons en Guinée',
    headline: 'Gestion salon de coiffure et institut de beauté à Conakry',
    metaTitle: 'Logiciel Salon Coiffure Guinée — RDV & File SMS | ZYVO',
    metaDescription:
      'ERP pour salons de coiffure en Guinée : rendez-vous, file d\'attente SMS, commissions et caisse POS.',
    keywords: 'logiciel salon coiffure Guinée, gestion institut beauté Conakry',
    content: [
      'Les salons de coiffure et instituts de beauté à Conakry gèrent rendez-vous, files d\'attente et commissions.',
      'ZYVO combine planning, file SMS, caisse POS et suivi des prestations.',
      'Réduisez l\'attente et fidélisez vos clients avec des notifications SMS.',
    ],
    faq: [
      { question: 'File d\'attente SMS ?', answer: 'Oui, notifications automatiques quand le client est appelé.' },
      { question: 'Commissions employés ?', answer: 'Oui, suivi des commissions par coiffeur.' },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'clinics',
    title: 'ZYVO ERP pour les cliniques en Guinée',
    headline: 'Gestion de clinique et cabinet médical à Conakry',
    metaTitle: 'Logiciel Clinique Guinée — RDV & Facturation | ZYVO',
    metaDescription:
      'ERP pour cliniques et cabinets médicaux en Guinée : rendez-vous, facturation, stock consommables et dossiers patients.',
    keywords: 'logiciel clinique Guinée, gestion cabinet médical Conakry',
    content: [
      'Les cliniques et cabinets médicaux ont besoin de gérer rendez-vous, facturation et stock de consommables.',
      'ZYVO offre planning, facturation TVA et suivi des encaissements en GNF.',
      'Interface simple pour le personnel administratif et les praticiens.',
    ],
    faq: [
      { question: 'Gestion des rendez-vous ?', answer: 'Oui, agenda partagé avec rappels SMS.' },
      { question: 'Facturation conforme ?', answer: 'Oui, factures numérotées avec TVA 18 %.' },
    ],
    cta: 'Demander une démo',
  },
  {
    industry: 'supermarkets',
    title: 'ZYVO ERP pour les supermarchés en Guinée',
    headline: 'Gestion superette et supermarché à Conakry',
    metaTitle: 'Logiciel Supermarché Guinée — POS & Inventaire | ZYVO',
    metaDescription:
      'ERP pour superettes et supermarchés en Guinée : caisse multi-caissiers, codes-barres, stock et rapports en GNF.',
    keywords: 'logiciel supermarché Guinée, POS superette Conakry, gestion grande surface Guinée',
    content: [
      'Les superettes et supermarchés gèrent des milliers de références avec rotation rapide.',
      'ZYVO supporte multi-caissiers, codes-barres, inventaires tournants et rapports de marge.',
      'Centralisez plusieurs points de vente à Conakry depuis un tableau de bord unique.',
    ],
    faq: [
      { question: 'Codes-barres ?', answer: 'Oui, scan et recherche produit rapide à la caisse.' },
      { question: 'Multi-caissiers ?', answer: 'Oui, suivi des ventes par caissier et par poste.' },
    ],
    cta: 'Contacter les ventes',
  },
];

export function seedGuineaProgrammaticPages(): number {
  return seedProgrammaticPages('gn', GN_PROGRAMMATIC_SEEDS);
}

export function seedGuineaSitemaps(): void {
  seedGuineaProgrammaticPages();
}
