import type { ContentNiche } from '@/lib/ai/research-engine/topic-niches';

export type BlogImageSource = 'pexels' | 'unsplash' | 'curated';

export interface BlogLibraryImage {
  id: string;
  url: string;
  alt: string;
  credit: string;
  source: BlogImageSource;
  niches: ContentNiche[];
  keywords: string[];
}

const IMAGE_PARAMS = 'w=1200&h=630&fit=crop&q=80';
const PEXELS_PARAMS = 'auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop';

function unsplash(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?${IMAGE_PARAMS}`;
}

function pexels(photoId: number): string {
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?${PEXELS_PARAMS}`;
}

function img(
  id: string,
  url: string,
  alt: string,
  credit: string,
  source: BlogImageSource,
  niches: ContentNiche[],
  keywords: string[]
): BlogLibraryImage {
  return { id, url, alt, credit, source, niches, keywords };
}

/** Curated stock photos for blog posts — no product screenshots or brand logos */
export const BLOG_IMAGE_LIBRARY: BlogLibraryImage[] = [
  // ── Fiscalité & comptabilité ──
  img('fiscal-01', pexels(590022), 'Comptabilité et déclarations fiscales sur bureau', 'Pexels', 'pexels', ['fiscalite'], ['tva', 'fiscal', 'impôt', 'comptabilité', 'facture', 'déclaration']),
  img('fiscal-02', unsplash('photo-1554224311-beee415c201f'), 'Calculatrice et documents fiscaux pour PME', 'Unsplash', 'unsplash', ['fiscalite'], ['fiscalité', 'taxe', 'syscohada', 'iva', 'dgi']),
  img('fiscal-03', pexels(6863332), 'Analyse de rapports financiers et bilans', 'Pexels', 'pexels', ['fiscalite'], ['bilan', 'rapport', 'finance', 'comptable']),
  img('fiscal-04', unsplash('photo-1554224155-6726b3ff858f'), 'Documents comptables et stylo sur bureau', 'Unsplash', 'unsplash', ['fiscalite'], ['comptabilité', 'documents', 'fiscal']),
  img('fiscal-05', pexels(4386320), 'Planification budgétaire et tableur financier', 'Pexels', 'pexels', ['fiscalite'], ['budget', 'planification', 'finance']),
  img('fiscal-06', unsplash('photo-1579621970563-ebec7560ff3e'), 'Pièces de monnaie et gestion financière', 'Unsplash', 'unsplash', ['fiscalite'], ['monnaie', 'finance', 'épargne', 'trésorerie']),
  img('fiscal-07', pexels(5699456), 'Réunion de conseil financier en entreprise', 'Pexels', 'pexels', ['fiscalite', 'croissance'], ['conseil', 'finance', 'stratégie']),
  img('fiscal-08', unsplash('photo-1450101499163-c8848c66ca85'), 'Signature de contrat et documents légaux', 'Unsplash', 'unsplash', ['fiscalite', 'entrepreneuriat'], ['contrat', 'légal', 'signature']),

  // ── Entrepreneuriat & formalisation ──
  img('entrep-01', pexels(4386321), 'Documents administratifs pour créer une entreprise', 'Pexels', 'pexels', ['entrepreneuriat'], ['ninea', 'rccm', 'créer', 'formaliser', 'registre', 'licence']),
  img('entrep-02', unsplash('photo-1507679799987-c73779587ccf'), 'Entrepreneur en costume prêt à développer son business', 'Unsplash', 'unsplash', ['entrepreneuriat', 'croissance'], ['entrepreneur', 'business', 'startup']),
  img('entrep-03', pexels(3184292), 'Poignée de main entre partenaires commerciaux', 'Pexels', 'pexels', ['entrepreneuriat'], ['partenariat', 'accord', 'collaboration']),
  img('entrep-04', unsplash('photo-1521737711867-e3b97375f902'), 'Équipe de startup en brainstorming', 'Unsplash', 'unsplash', ['entrepreneuriat', 'croissance'], ['équipe', 'startup', 'innovation']),
  img('entrep-05', pexels(7688336), 'Femme entrepreneure travaillant sur ordinateur portable', 'Pexels', 'pexels', ['entrepreneuriat', 'croissance'], ['femme', 'entrepreneure', 'travail']),
  img('entrep-06', unsplash('photo-1556761175-b413da4baf72'), 'Réunion de planification stratégique en entreprise', 'Unsplash', 'unsplash', ['entrepreneuriat'], ['réunion', 'stratégie', 'planification']),
  img('entrep-07', pexels(7413915), 'Entrepreneur africain consultant des documents', 'Pexels', 'pexels', ['entrepreneuriat'], ['africa', 'documents', 'formalisation']),
  img('entrep-08', unsplash('photo-1553877522-43269d4ea984'), 'Bureau moderne avec ordinateur et notes', 'Unsplash', 'unsplash', ['entrepreneuriat', 'technologie'], ['bureau', 'travail', 'organisation']),

  // ── Gestion, stock & retail ──
  img('gest-01', pexels(264636), 'Étagères de stock organisées en magasin', 'Pexels', 'pexels', ['gestion'], ['stock', 'inventaire', 'magasin', 'étagères']),
  img('gest-02', pexels(265087), 'Entrepôt et logistique de marchandises', 'Pexels', 'pexels', ['gestion'], ['entrepôt', 'logistique', 'warehouse']),
  img('gest-03', unsplash('photo-1556740758-90de374c12ad'), 'Caisse et paiement en boutique', 'Unsplash', 'unsplash', ['gestion', 'ventes'], ['caisse', 'pos', 'paiement', 'boutique']),
  img('gest-04', pexels(4482900), 'Vendeur au comptoir d\'un commerce local', 'Pexels', 'pexels', ['gestion', 'ventes'], ['commerce', 'vendeur', 'retail']),
  img('gest-05', unsplash('photo-1556742049-0cfed4f6a45d'), 'Transaction mobile et commerce de proximité', 'Unsplash', 'unsplash', ['gestion', 'ventes'], ['mobile', 'paiement', 'commerce']),
  img('gest-06', pexels(4483612), 'Inventaire et comptage de produits en rayon', 'Pexels', 'pexels', ['gestion'], ['inventaire', 'comptage', 'produits']),
  img('gest-07', unsplash('photo-1586528116311-ad8dd3c8310d'), 'Colis et organisation logistique', 'Unsplash', 'unsplash', ['gestion', 'ventes'], ['colis', 'logistique', 'livraison']),
  img('gest-08', pexels(5632402), 'Gestion d\'équipe et planning en magasin', 'Pexels', 'pexels', ['gestion'], ['équipe', 'employés', 'planning', 'rh']),

  // ── Marketing digital ──
  img('mkt-01', unsplash('photo-1611162616305-c69b3fa7fbe0'), 'Réseaux sociaux et marketing sur smartphone', 'Unsplash', 'unsplash', ['marketing'], ['facebook', 'instagram', 'réseaux', 'social', 'digital']),
  img('mkt-02', pexels(4483612), 'Stratégie marketing et communication digitale', 'Pexels', 'pexels', ['marketing'], ['marketing', 'campagne', 'publicité']),
  img('mkt-03', unsplash('photo-1432888622747-1eb6909f37b5'), 'Analytics et performance marketing sur écran', 'Unsplash', 'unsplash', ['marketing', 'technologie'], ['analytics', 'data', 'performance']),
  img('mkt-04', pexels(6476589), 'Community manager créant du contenu', 'Pexels', 'pexels', ['marketing'], ['contenu', 'community', 'création']),
  img('mkt-05', unsplash('photo-1557804506-669a67965ba0'), 'Présentation marketing devant équipe', 'Unsplash', 'unsplash', ['marketing', 'croissance'], ['présentation', 'stratégie', 'équipe']),
  img('mkt-06', pexels(7681099), 'Publicité et promotion sur mobile', 'Pexels', 'pexels', ['marketing'], ['publicité', 'mobile', 'promotion']),
  img('mkt-07', unsplash('photo-1552664730-d307ca884978'), 'Brainstorming créatif pour campagne marketing', 'Unsplash', 'unsplash', ['marketing'], ['créatif', 'brainstorm', 'campagne']),
  img('mkt-08', pexels(265087), 'Boutique avec vitrine attractive pour clients', 'Pexels', 'pexels', ['marketing', 'ventes'], ['vitrine', 'boutique', 'clients']),

  // ── Ventes & e-commerce ──
  img('vente-01', unsplash('photo-1556742111-a301076d9d18'), 'Colis prêts pour expédition e-commerce', 'Unsplash', 'unsplash', ['ventes'], ['e-commerce', 'livraison', 'colis', 'online']),
  img('vente-02', pexels(4968391), 'Shopping en ligne et logistique de commandes', 'Pexels', 'pexels', ['ventes'], ['ecommerce', 'commande', 'marketplace']),
  img('vente-03', unsplash('photo-1563986768609-322da13575f3'), 'Paiement par carte et terminal mobile', 'Unsplash', 'unsplash', ['ventes'], ['paiement', 'carte', 'mobile money', 'wave', 'orange']),
  img('vente-04', pexels(5632401), 'Client satisfait en boutique de détail', 'Pexels', 'pexels', ['ventes'], ['client', 'fidélisation', 'satisfaction']),
  img('vente-05', unsplash('photo-1472851294608-062f824d29cc'), 'Marketplace et vente multi-canal', 'Unsplash', 'unsplash', ['ventes'], ['marketplace', 'vente', 'canal']),
  img('vente-06', pexels(4482900), 'Commerçant au marché local africain', 'Pexels', 'pexels', ['ventes', 'croissance'], ['marché', 'marché local', 'commerçant']),
  img('vente-07', unsplash('photo-1607082348824-0a96f2a4b9da'), 'Shopping cart et achats en ligne', 'Unsplash', 'unsplash', ['ventes'], ['panier', 'achat', 'online']),
  img('vente-08', pexels(7688336), 'Livraison de commande à domicile', 'Pexels', 'pexels', ['ventes'], ['livraison', 'commande', 'domicile']),

  // ── Technologie & digitalisation ──
  img('tech-01', unsplash('photo-1460925895917-afdab827c52f'), 'Tableau de bord logiciel sur ordinateur portable', 'Unsplash', 'unsplash', ['technologie'], ['logiciel', 'dashboard', 'erp', 'digital']),
  img('tech-02', unsplash('photo-1551434678-e076c223a692'), 'Équipe travaillant avec outils numériques', 'Unsplash', 'unsplash', ['technologie'], ['digitalisation', 'équipe', 'collaboration']),
  img('tech-03', pexels(3861969), 'Développement et technologie en entreprise', 'Pexels', 'pexels', ['technologie'], ['technologie', 'développement', 'innovation']),
  img('tech-04', unsplash('photo-1519389950473-47ba0277781c'), 'Espace de travail tech avec plusieurs écrans', 'Unsplash', 'unsplash', ['technologie'], ['tech', 'bureau', 'écrans']),
  img('tech-05', pexels(7376), 'Ordinateur portable et café en coworking', 'Pexels', 'pexels', ['technologie', 'entrepreneuriat'], ['coworking', 'laptop', 'travail']),
  img('tech-06', unsplash('photo-1498050108023-c5249f4df085'), 'Code et développement d\'application', 'Unsplash', 'unsplash', ['technologie'], ['application', 'code', 'software']),
  img('tech-07', pexels(3184465), 'Réunion tech avec présentation sur écran', 'Pexels', 'pexels', ['technologie'], ['réunion', 'présentation', 'digital']),
  img('tech-08', unsplash('photo-1531482615713-2afd69097998'), 'Équipe diverse en session de travail collaboratif', 'Unsplash', 'unsplash', ['technologie', 'croissance'], ['collaboration', 'diversité', 'équipe']),

  // ── Intelligence artificielle ──
  img('ia-01', unsplash('photo-1677442136019-21780ecad995'), 'Intelligence artificielle et réseau neuronal', 'Unsplash', 'unsplash', ['ia'], ['ia', 'ai', 'intelligence artificielle', 'automatisation']),
  img('ia-02', pexels(8386440), 'Robot et technologie IA en entreprise', 'Pexels', 'pexels', ['ia'], ['robot', 'automation', 'futur']),
  img('ia-03', unsplash('photo-1620712943543-bcc4688e7485'), 'Interface IA et assistant virtuel', 'Unsplash', 'unsplash', ['ia'], ['chatgpt', 'assistant', 'virtuel']),
  img('ia-04', pexels(7567444), 'Analyse de données par intelligence artificielle', 'Pexels', 'pexels', ['ia', 'technologie'], ['data', 'analyse', 'machine learning']),
  img('ia-05', unsplash('photo-1633356122544-f134324a6cee'), 'Innovation IA appliquée au business', 'Unsplash', 'unsplash', ['ia'], ['innovation', 'business', 'ia']),
  img('ia-06', pexels(3861969), 'Transformation digitale par l\'IA', 'Pexels', 'pexels', ['ia', 'technologie'], ['transformation', 'digital', 'ia']),

  // ── Croissance & expansion ──
  img('growth-01', unsplash('photo-1559136555-9303baea8ebd'), 'Croissance d\'entreprise et graphique ascendant', 'Unsplash', 'unsplash', ['croissance'], ['croissance', 'expansion', 'développement']),
  img('growth-02', unsplash('photo-1454165804606-c3d57bc86b40'), 'Planification stratégique et croissance PME', 'Unsplash', 'unsplash', ['croissance', 'entrepreneuriat'], ['stratégie', 'planification', 'pme']),
  img('growth-03', pexels(3184296), 'Équipe célébrant une réussite commerciale', 'Pexels', 'pexels', ['croissance'], ['succès', 'équipe', 'célébration']),
  img('growth-04', unsplash('photo-1556761175-5973dc0f32e7'), 'Présentation de croissance devant investisseurs', 'Unsplash', 'unsplash', ['croissance'], ['investissement', 'pitch', 'levée']),
  img('growth-05', pexels(7688336), 'Entrepreneure africaine dirigeant son commerce', 'Pexels', 'pexels', ['croissance', 'entrepreneuriat'], ['africa', 'femme', 'commerce']),
  img('growth-06', unsplash('photo-1552664730-d307ca884978'), 'Expansion et ouverture de nouvelle succursale', 'Unsplash', 'unsplash', ['croissance'], ['expansion', 'franchise', 'succursale']),
  img('growth-07', pexels(3184465), 'Mentorat et accompagnement d\'entrepreneurs', 'Pexels', 'pexels', ['croissance', 'entrepreneuriat'], ['mentorat', 'coaching', 'accompagnement']),
  img('growth-08', unsplash('photo-1522071820081-009f0129c71c'), 'Équipe unie pour la croissance de l\'entreprise', 'Unsplash', 'unsplash', ['croissance'], ['équipe', 'unité', 'croissance']),

  // ── Restaurant & horeca ──
  img('resto-01', unsplash('photo-1517248135467-4c7edcad34c4'), 'Restaurant et service à table', 'Unsplash', 'unsplash', ['gestion'], ['restaurant', 'maquis', 'service', 'horeca']),
  img('resto-02', unsplash('photo-1573164713714-d95e436ab8d6'), 'Cuisine de restaurant et préparation des plats', 'Unsplash', 'unsplash', ['gestion'], ['cuisine', 'chef', 'restaurant']),
  img('resto-03', pexels(1267320), 'Service client dans un restaurant', 'Pexels', 'pexels', ['gestion', 'ventes'], ['restaurant', 'client', 'accueil']),

  // ── Mobile money & paiements ──
  img('pay-01', unsplash('photo-1563986768609-322da13575f3'), 'Paiement mobile et smartphone', 'Unsplash', 'unsplash', ['ventes', 'technologie'], ['orange money', 'wave', 'momo', 'mobile money', 'paiement']),
  img('pay-02', unsplash('photo-1556742049-0cfed4f6a45d'), 'Transaction digitale en boutique', 'Unsplash', 'unsplash', ['ventes'], ['paiement', 'digital', 'transaction']),
  img('pay-03', pexels(4968391), 'Terminal de paiement et commerce mobile', 'Pexels', 'pexels', ['ventes', 'gestion'], ['terminal', 'encaissement', 'mobile']),
];

export const BLOG_IMAGE_FALLBACK: BlogLibraryImage = img(
  'fallback',
  unsplash('photo-1454165804606-c3d57bc86b40'),
  'Guide pratique pour entrepreneurs et PME en Afrique',
  'Unsplash',
  'curated',
  ['entrepreneuriat', 'croissance'],
  ['entreprise', 'pme', 'guide', 'afrique']
);
