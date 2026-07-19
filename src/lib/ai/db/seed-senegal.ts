import { seedProgrammaticPages } from './seed-programmatic';

const SN_PROGRAMMATIC_SEEDS = [
  {
    industry: 'restaurants',
    title: 'ZYVO ERP pour les restaurants au Sénégal',
    headline: 'Logiciel de gestion pour restaurants et dibiteries à Dakar',
    metaTitle: 'ERP Restaurant Sénégal — Caisse POS & Stock | ZYVO Dakar',
    metaDescription:
      'Gérez votre restaurant ou dibiterie au Sénégal : caisse POS, stock, Wave, Orange Money, TVA DGI. Essai gratuit en FCFA.',
    keywords: 'ERP restaurant Sénégal, POS dibiterie Dakar, gestion restaurant Sénégal',
    content: [
      'Les restaurants et dibiteries de Dakar gèrent commandes, stocks et paiements Wave/Orange Money au quotidien.',
      'ZYVO centralise caisse POS, stock et facturation pour les PME sénégalaises.',
      'Rapports TVA 18 % et ventes en FCFA pour la DGI.',
    ],
    faq: [
      { question: 'Wave est-il supporté ?', answer: 'Oui, Wave, Orange Money et Free Money à la caisse.' },
      { question: 'Mode hors ligne ?', answer: 'Oui, synchronisation automatique au retour du réseau.' },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'retail-stores',
    title: 'ZYVO ERP pour les boutiques au Sénégal',
    headline: 'Logiciel de gestion commerciale pour boutiques à Dakar',
    metaTitle: 'Logiciel Boutique Sénégal — Caisse POS & Stock | ZYVO',
    metaDescription:
      'ERP pour boutiques sénégalaises : caisse POS, stock temps réel, Wave et Orange Money à Dakar.',
    keywords: 'logiciel boutique Sénégal, caisse superette Dakar, gestion commerciale Sénégal',
    content: [
      'Du Plateau à Pikine, les commerçants sénégalais digitalisent leur gestion avec ZYVO.',
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
    title: 'ZYVO ERP pour les pharmacies au Sénégal',
    headline: 'Gestion de pharmacie moderne à Dakar',
    metaTitle: 'Logiciel Pharmacie Sénégal — Stock & Caisse POS | ZYVO',
    metaDescription:
      'ERP pharmacies sénégalaises : stock médicaments, péremption, caisse POS et SYSCOHADA.',
    keywords: 'logiciel pharmacie Sénégal, gestion stock médicaments Dakar',
    content: [
      'Les pharmacies sénégalaises gèrent stocks sensibles, péremption et conformité réglementaire.',
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
    title: 'ZYVO ERP pour les salons au Sénégal',
    headline: 'Gestion salon de coiffure à Dakar',
    metaTitle: 'Logiciel Salon Coiffure Sénégal — RDV & File SMS | ZYVO',
    metaDescription:
      'ERP salons de coiffure au Sénégal : rendez-vous, file SMS, commissions et caisse POS à Dakar.',
    keywords: 'logiciel salon coiffure Sénégal, gestion institut beauté Dakar',
    content: [
      'Salons et instituts de beauté dakarois : rendez-vous, files d\'attente et commissions.',
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
    title: 'ZYVO ERP pour les cliniques au Sénégal',
    headline: 'Gestion clinique et cabinet médical à Dakar',
    metaTitle: 'Logiciel Clinique Sénégal — RDV & Facturation | ZYVO',
    metaDescription:
      'ERP cliniques sénégalaises : rendez-vous, facturation NINEA, stock consommables et dossiers.',
    keywords: 'logiciel clinique Sénégal, gestion cabinet médical Dakar',
    content: [
      'Cliniques et cabinets médicaux : rendez-vous, facturation et gestion des consommables.',
      'ZYVO : planning, facturation TVA et encaissements Wave/Orange Money.',
      'Interface adaptée au personnel administratif sénégalais.',
    ],
    faq: [
      { question: 'Rendez-vous en ligne ?', answer: 'Oui, agenda avec rappels SMS.' },
      { question: 'Factures NINEA ?', answer: 'Oui, mentions légales et TVA 18 %.' },
    ],
    cta: 'Demander une démo',
  },
  {
    industry: 'supermarkets',
    title: 'ZYVO ERP pour les supermarchés au Sénégal',
    headline: 'Gestion superette et supermarché à Dakar',
    metaTitle: 'Logiciel Supermarché Sénégal — POS Multi-Caissiers | ZYVO',
    metaDescription:
      'ERP supermarchés sénégalais : caisse multi-caissiers, codes-barres, inventaire et rapports FCFA.',
    keywords: 'logiciel supermarché Sénégal, POS superette Dakar',
    content: [
      'Superettes et supermarchés dakarois gèrent des milliers de références.',
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

export function seedSenegalProgrammaticPages(): number {
  return seedProgrammaticPages('sn', SN_PROGRAMMATIC_SEEDS);
}
