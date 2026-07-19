import type { MarketBlogConfig, MarketBlogPost } from './types';

export const gnBlogConfig: MarketBlogConfig = {
  indexTitle: 'Blog ZYVO Guinée — Conseils gestion, caisse POS & digitalisation PME',
  indexDescription:
    'Articles pratiques pour entrepreneurs guinéens : choisir un ERP, gérer son stock, Orange Money à la caisse, SYSCOHADA et TVA DGI. Par ZYVO Conakry.',
  indexKeywords:
    'blog ERP Guinée, conseils gestion Conakry, digitalisation PME Guinée, articles caisse POS Guinée, fiscalité DGI Guinée',
  indexH1: 'Conseils pour entreprises guinéennes',
  indexSubtitle:
    'Guides pratiques, bonnes pratiques et actualités sur la digitalisation des PME à Conakry et en province.',
  readMoreLabel: 'Lire l\'article',
  relatedLabel: 'Articles liés',
  shareLabel: 'Partager',
  faqTitle: 'Questions fréquentes',
  ctaTitle: 'Prêt à digitaliser votre entreprise ?',
  ctaDescription: 'Essayez ZYVO gratuitement pendant 7 jours — caisse POS, stock et comptabilité en GNF.',
  ctaButton: 'Essai gratuit 7 jours',
  locale: 'fr-GN',
};

export const gnBlogPosts: MarketBlogPost[] = [
  {
    slug: 'choisir-logiciel-gestion-entreprise-guinee',
    title: 'Comment choisir un logiciel de gestion d\'entreprise en Guinée (guide 2026)',
    excerpt:
      'Critères essentiels pour sélectionner un ERP ou une caisse POS adaptée aux PME guinéennes : GNF, Orange Money, SYSCOHADA et connexion locale.',
    metaTitle:
      'Comment choisir un logiciel de gestion en Guinée (2026) | Blog ZYVO',
    metaDescription:
      'Guide complet pour choisir un ERP ou logiciel de caisse en Guinée. Comparez POS, stock, TVA DGI, Orange Money et tarifs en GNF pour votre PME à Conakry.',
    keywords:
      'choisir logiciel gestion Guinée, ERP PME Conakry, logiciel caisse Guinée, comparatif ERP Guinée',
    author: 'Équipe ZYVO Guinée',
    date: '2026-06-10',
    readTime: '8 min',
    category: 'Guides',
    content: [
      'Choisir un logiciel de gestion d\'entreprise est l\'une des décisions les plus importantes pour un commerçant ou dirigeant de PME en Guinée. Entre les boutiques de Kaloum, les maquis de Ratoma et les commerces de Kindia ou Labé, les besoins varient — mais les critères de sélection restent les mêmes.',
      'Commencez par identifier vos problèmes prioritaires. Perdez-vous de l\'argent à cause d\'erreurs de caisse ? Votre stock est-il géré dans un cahier ou Excel ? Avez-vous du mal à suivre les paiements Orange Money et MTN MoMo ? Un bon logiciel résout d\'abord vos douleurs principales.',
      'Vérifiez que le logiciel supporte le franc guinéen (GNF) nativement, sans conversion manuelle. La Guinée n\'est pas dans la zone CFA — votre ERP doit gérer le GNF de bout en bout, y compris les tarifs, factures et rapports.',
      'Le paiement mobile est incontournable en Guinée. Assurez-vous que la caisse POS permet d\'enregistrer les encaissements Orange Money et MTN Mobile Money, avec un journal de caisse clair pour le rapprochement mensuel.',
      'La conformité comptable SYSCOHADA est obligatoire pour les entreprises guinéennes (membre OHADA). Privilégiez un logiciel qui génère des factures numérotées, suit la TVA à 18 % et exporte les journaux pour vos déclarations à la DGI.',
      'Testez la solution avec votre connexion réelle — 3G/4G à Conakry peut fluctuer. Un bon logiciel doit fonctionner en mode dégradé et synchroniser les données dès que le réseau revient.',
      'Enfin, profitez des essais gratuits. Impliquez vos caissiers et gérants dans le test. Le meilleur logiciel est celui que votre équipe utilisera chaque jour — pas celui avec le plus de fonctionnalités inutilisées.',
    ],
  },
  {
    slug: 'gestion-stock-bonnes-pratiques-guinee',
    title: '10 bonnes pratiques de gestion de stock pour commerçants en Guinée',
    excerpt:
      'Réduisez les ruptures, évitez le surstock et améliorez la rentabilité de votre boutique ou superette à Conakry.',
    metaTitle:
      'Gestion de stock Guinée : 10 bonnes pratiques | Blog ZYVO',
    metaDescription:
      '10 pratiques éprouvées pour mieux gérer votre inventaire en Guinée. Évitez les ruptures de stock, réduisez les pertes et contrôlez votre marge en GNF.',
    keywords:
      'gestion stock Guinée, inventaire boutique Conakry, bonnes pratiques stock PME Guinée, logiciel inventaire GNF',
    author: 'Équipe ZYVO Guinée',
    date: '2026-05-20',
    readTime: '6 min',
    category: 'Opérations',
    content: [
      'Une mauvaise gestion de stock coûte cher aux commerçants guinéens : ventes perdues par rupture, marchandises périmées, vols non détectés et trésorerie immobilisée. Voici dix pratiques qui font la différence.',
      'Première règle : suivez votre stock en temps réel. Les cahiers et tableurs créent des écarts entre le stock théorique et le stock réel. Un logiciel de gestion met à jour les quantités à chaque vente, retour et réception.',
      'Définissez des seuils de réapprovisionnement basés sur vos délais fournisseurs locaux. À Conakry, le délai peut être de 2 à 7 jours selon le produit et le fournisseur — intégrez cette réalité dans vos calculs.',
      'Effectuez des inventaires tournants chaque semaine plutôt qu\'un inventaire annuel complet. Comptez une partie de votre stock régulièrement sans fermer la boutique.',
      'Classez vos produits par importance (analyse ABC). Les articles à forte rotation (riz, huile, produits de première nécessité) méritent un suivi quotidien. Les articles à faible rotation peuvent être vérifiés mensuellement.',
      'Centralisez si vous avez plusieurs points de vente à Ratoma, Matam ou en province. Un tableau de bord unique évite les transferts manuels et les erreurs entre magasins.',
      'Formez vos employés à enregistrer chaque sortie de stock. La discipline d\'enregistrement est souvent plus importante que le logiciel lui-même.',
    ],
  },
  {
    slug: 'orange-money-caisse-pos-conakry',
    title: 'Orange Money et caisse POS : guide pour boutiques à Conakry',
    excerpt:
      'Comment enregistrer, suivre et réconcilier les paiements Orange Money et MTN MoMo à votre caisse en Guinée.',
    metaTitle:
      'Orange Money & Caisse POS Conakry — Guide complet | Blog ZYVO',
    metaDescription:
      'Apprenez à intégrer Orange Money et MTN MoMo à votre caisse POS en Guinée. Traçabilité, réconciliation et bonnes pratiques pour commerçants à Conakry.',
    keywords:
      'Orange Money caisse Guinée, MTN MoMo POS Conakry, paiement mobile boutique Guinée, caisse enregistreuse mobile money',
    author: 'Équipe ZYVO Guinée',
    date: '2026-04-28',
    readTime: '7 min',
    category: 'Paiements',
    content: [
      'En Guinée, Orange Money et MTN Mobile Money représentent une part croissante des paiements quotidiens — souvent plus importante que les cartes bancaires. Pour un commerçant à Conakry, ignorer ces flux, c\'est perdre la visibilité sur une partie significative de son chiffre d\'affaires.',
      'Le défi principal n\'est pas d\'accepter le mobile money — la plupart des commerçants le font déjà sur leur téléphone — mais de le tracer correctement dans leur comptabilité et leur journal de caisse.',
      'À chaque vente payée par Orange Money, enregistrez le montant en GNF dans votre caisse POS avec le mode de paiement « Orange Money ». Faites de même pour MTN MoMo. Cela permet de distinguer espèces, mobile money et virement dans vos rapports de fin de journée.',
      'En fin de journée, comparez le total Orange Money enregistré dans votre logiciel avec le solde de votre compte Orange Money. Les écarts indiquent des ventes non enregistrées ou des erreurs de saisie.',
      'Pour les boutiques à fort trafic (marchés, axes commerciaux de Kaloum ou Madina), formez chaque caissier à confirmer le paiement mobile sur son téléphone AVANT de valider la vente dans le POS. Cela réduit les fraudes et les litiges.',
      'ZYVO permet d\'enregistrer manuellement les paiements mobile money à la caisse, avec un module d\'intégration automatique en déploiement progressif en Guinée. Contactez notre équipe pour rejoindre la bêta.',
      'À terme, la traçabilité mobile money facilite aussi vos déclarations fiscales et votre relation avec la DGI — chaque franc encaissé est documenté.',
    ],
  },
  {
    slug: 'syscohada-tva-dgi-digitaliser-comptabilite-guinee',
    title: 'SYSCOHADA et TVA DGI : comment digitaliser sa comptabilité en Guinée',
    excerpt:
      'Comprenez vos obligations comptables OHADA et fiscales, et comment un ERP vous aide à rester conforme.',
    metaTitle:
      'SYSCOHADA & TVA DGI Guinée — Digitaliser sa comptabilité | Blog ZYVO',
    metaDescription:
      'Guide SYSCOHADA et TVA 18% pour PME guinéennes. Facturation conforme, déclarations DGI et digitalisation comptable avec un ERP adapté à la Guinée.',
    keywords:
      'SYSCOHADA Guinée, TVA DGI Conakry, comptabilité PME Guinée, facturation conforme Guinée, ERP OHADA Guinée',
    author: 'Équipe ZYVO Guinée',
    date: '2026-03-15',
    readTime: '9 min',
    category: 'Comptabilité',
    content: [
      'La Guinée est membre de l\'OHADA et applique le référentiel comptable SYSCOHADA révisé. Toute entreprise formelle doit tenir une comptabilité conforme, produire des états financiers annuels et respecter les obligations fiscales de la Direction Générale des Impôts (DGI).',
      'La TVA en Guinée est généralement fixée à 18 % sur les biens et services. Votre logiciel de gestion doit calculer automatiquement la TVA sur chaque facture, la distinguer du montant HT et produire un journal des ventes exportable pour vos déclarations mensuelles.',
      'La numérotation séquentielle des factures est obligatoire. Chaque facture doit comporter les mentions légales : nom de l\'entreprise, adresse, numéro d\'identification fiscale (NIF), date, description des biens/services, montant HT, TVA et TTC en GNF.',
      'À ce jour, la Guinée n\'a pas encore déployé de plateforme nationale de facturation électronique normalisée (type FNE). Cependant, les bonnes pratiques de conservation des pièces, numérotation et cohérence SYSCOHADA sont déjà exigées — et un ERP vous y prépare dès maintenant.',
      'Digitaliser sa comptabilité ne signifie pas remplacer votre comptable — cela signifie lui fournir des données propres et structurées. Un journal des ventes et des dépenses exportable en Excel ou PDF fait gagner des heures à la clôture mensuelle.',
      'ZYVO génère des factures conformes, suit la TVA, exporte les journaux et s\'aligne sur les pratiques SYSCOHADA. Pour les sous-traitants miniers, commerces de gros et PME formelles, c\'est un premier pas vers une gestion professionnelle.',
      'Consultez toujours un expert-comptable agréé en Guinée pour valider votre conformité sectorielle spécifique.',
    ],
  },
  {
    slug: 'digitaliser-boutique-conakry-guide-pratique',
    title: 'Digitaliser sa boutique à Conakry : guide pratique en 5 étapes',
    excerpt:
      'De la caisse manuelle au logiciel cloud — comment moderniser votre commerce de quartier ou superette à Conakry.',
    metaTitle:
      'Digitaliser sa boutique à Conakry — Guide en 5 étapes | Blog ZYVO',
    metaDescription:
      'Guide pratique pour digitaliser votre boutique à Conakry : caisse POS, stock, clients et rapports. Passez du cahier au logiciel en 5 étapes simples.',
    keywords:
      'digitaliser boutique Conakry, moderniser commerce Guinée, caisse POS Conakry, logiciel superette Guinée',
    author: 'Équipe ZYVO Guinée',
    date: '2026-02-05',
    readTime: '5 min',
    category: 'Guides',
    content: [
      'De plus en plus de commerçants à Conakry — à Kaloum, Ratoma, Matam, Dixinn et dans les marchés de Madina — passent du cahier de caisse au logiciel de gestion. Voici un plan en cinq étapes pour réussir cette transition sans perturber votre activité.',
      'Étape 1 : Inventairez vos produits principaux. Commencez par les 50 à 100 articles les plus vendus. Pas besoin de tout saisir le premier jour — concentrez-vous sur ce qui génère 80 % de votre chiffre d\'affaires.',
      'Étape 2 : Choisissez un logiciel adapté à la Guinée. Critères minimums : GNF, français, Orange Money, mode hors-ligne partiel, tarif abordable et support local.',
      'Étape 3 : Formez 1 à 2 personnes de confiance. Le gérant et un caissier principal suffisent pour démarrer. ZYVO propose des tutoriels en français et un accompagnement WhatsApp.',
      'Étape 4 : Faites coexister cahier et logiciel pendant une semaine. Enregistrez chaque vente dans les deux systèmes pour vérifier la cohérence avant de abandonner le cahier.',
      'Étape 5 : Analysez vos rapports après 30 jours. Vous découvrirez probablement vos produits les plus rentables, vos heures de pointe et les fuites de trésorerie que le cahier ne révélait pas.',
      'La digitalisation n\'est pas réservée aux grandes entreprises. Une boutique de quartier à Conakry peut être opérationnelle sur ZYVO en moins d\'une journée, avec un essai gratuit de 7 jours.',
    ],
  },
];
