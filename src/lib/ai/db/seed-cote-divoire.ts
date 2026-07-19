import { seedProgrammaticPages } from './seed-programmatic';

const CI_PROGRAMMATIC_SEEDS = [
  {
    industry: 'restaurants',
    title: 'ZYVO ERP pour les restaurants en Côte d\'Ivoire',
    headline: 'Logiciel de gestion pour restaurants et maquis à Abidjan',
    metaTitle: 'ERP Restaurant Côte d\'Ivoire — Caisse POS & Stock | ZYVO Abidjan',
    metaDescription:
      'Gérez votre restaurant ou maquis en Côte d\'Ivoire : caisse POS, stock, Orange Money, MTN MoMo, TVA DGI. Essai gratuit en FCFA.',
    keywords: 'ERP restaurant Côte d\'Ivoire, POS maquis Abidjan, gestion restaurant Côte d\'Ivoire',
    content: [
      'Les restaurants et maquis d\'Abidjan gèrent commandes, stocks et paiements Orange Money/MTN MoMo au quotidien.',
      'ZYVO centralise caisse POS, stock et facturation pour les PME ivoiriennes.',
      'Rapports TVA 18 % et ventes en FCFA pour la DGI.',
    ],
    faq: [
      { question: 'Orange Money et MTN MoMo sont-ils supportés ?', answer: 'Oui, Orange Money, MTN MoMo et Moov Money à la caisse.' },
      { question: 'Mode hors ligne ?', answer: 'Oui, synchronisation automatique au retour du réseau.' },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'retail-stores',
    title: 'ZYVO ERP pour les boutiques en Côte d\'Ivoire',
    headline: 'Logiciel de gestion commerciale pour boutiques à Abidjan',
    metaTitle: 'Logiciel Boutique Côte d\'Ivoire — Caisse POS & Stock | ZYVO',
    metaDescription:
      'ERP pour boutiques ivoiriennes : caisse POS, stock temps réel, Orange Money et MTN MoMo à Abidjan.',
    keywords: 'logiciel boutique Côte d\'Ivoire, caisse superette Abidjan, gestion commerciale Côte d\'Ivoire',
    content: [
      'De Cocody à Yopougon, les commerçants ivoiriens digitalisent leur gestion avec ZYVO.',
      'Caisse POS rapide, inventaire temps réel et paiements mobiles intégrés.',
      'Contrôlez vos marges en FCFA et réduisez les ruptures.',
    ],
    faq: [
      { question: 'Petites boutiques ?', answer: 'Oui, plan Essentiel dès 11 950 FCFA/mois (annuel).' },
      { question: 'Multi-magasins ?', answer: 'Oui, plan Croissance et plus.' },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'pharmacies',
    title: 'ZYVO ERP pour les pharmacies en Côte d\'Ivoire',
    headline: 'Gestion de pharmacie moderne à Abidjan',
    metaTitle: 'Logiciel Pharmacie Côte d\'Ivoire — Stock & Caisse POS | ZYVO',
    metaDescription:
      'ERP pharmacies ivoiriennes : stock médicaments, péremption, caisse POS et SYSCOHADA.',
    keywords: 'logiciel pharmacie Côte d\'Ivoire, gestion stock médicaments Abidjan',
    content: [
      'Les pharmacies ivoiriennes gèrent stocks sensibles, péremption et conformité réglementaire.',
      'ZYVO : inventaire temps réel, alertes péremption et caisse POS en FCFA.',
      'Factures SYSCOHADA et déclarations DGI simplifiées.',
    ],
    faq: [
      { question: 'Alertes péremption ?', answer: 'Oui, notifications automatiques.' },
      { question: 'SYSCOHADA ?', answer: 'Oui, exports comptables conformes OHADA.' },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'salons',
    title: 'ZYVO ERP pour les salons en Côte d\'Ivoire',
    headline: 'Gestion salon de coiffure à Abidjan',
    metaTitle: 'Logiciel Salon Coiffure Côte d\'Ivoire — RDV & File SMS | ZYVO',
    metaDescription:
      'ERP salons de coiffure en Côte d\'Ivoire : rendez-vous, file SMS, commissions et caisse POS à Abidjan.',
    keywords: 'logiciel salon coiffure Côte d\'Ivoire, gestion institut beauté Abidjan',
    content: [
      'Salons et instituts de beauté abidjanais : rendez-vous, files d\'attente et commissions.',
      'ZYVO combine planning, SMS clients et caisse POS.',
      'Fidélisez vos clients avec des rappels automatiques.',
    ],
    faq: [
      { question: 'File d\'attente SMS ?', answer: 'Oui, module file d\'attente intégré.' },
      { question: 'Commissions ?', answer: 'Oui, suivi par styliste.' },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'clinics',
    title: 'ZYVO ERP pour les cliniques en Côte d\'Ivoire',
    headline: 'Gestion clinique et cabinet médical à Abidjan',
    metaTitle: 'Logiciel Clinique Côte d\'Ivoire — RDV & Facturation | ZYVO',
    metaDescription:
      'ERP cliniques ivoiriennes : rendez-vous, facturation RCCM, stock consommables et dossiers.',
    keywords: 'logiciel clinique Côte d\'Ivoire, gestion cabinet médical Abidjan',
    content: [
      'Cliniques et cabinets médicaux : rendez-vous, facturation et gestion des consommables.',
      'ZYVO : planning, facturation TVA et encaissements Orange Money/MTN MoMo.',
      'Interface adaptée au personnel administratif ivoirien.',
    ],
    faq: [
      { question: 'Rendez-vous en ligne ?', answer: 'Oui, agenda avec rappels SMS.' },
      { question: 'Factures conformes ?', answer: 'Oui, mentions légales et TVA 18 %.' },
    ],
    cta: 'Demander une démo',
  },
  {
    industry: 'supermarkets',
    title: 'ZYVO ERP pour les supermarchés en Côte d\'Ivoire',
    headline: 'Gestion superette et supermarché à Abidjan',
    metaTitle: 'Logiciel Supermarché Côte d\'Ivoire — POS Multi-Caissiers | ZYVO',
    metaDescription:
      'ERP supermarchés ivoiriens : caisse multi-caissiers, codes-barres, inventaire et rapports FCFA.',
    keywords: 'logiciel supermarché Côte d\'Ivoire, POS superette Abidjan',
    content: [
      'Superettes et supermarchés abidjanais gèrent des milliers de références.',
      'ZYVO : multi-caissiers, codes-barres, inventaires et rapports de marge en FCFA.',
      'Centralisez plusieurs magasins depuis un tableau de bord.',
    ],
    faq: [
      { question: 'Codes-barres ?', answer: 'Oui, scan rapide à la caisse.' },
      { question: 'Multi-caissiers ?', answer: 'Oui, suivi par poste et employé.' },
    ],
    cta: 'Contacter les ventes',
  },
];

export function seedCoteDIvoireProgrammaticPages(): number {
  return seedProgrammaticPages('ci', CI_PROGRAMMATIC_SEEDS);
}
