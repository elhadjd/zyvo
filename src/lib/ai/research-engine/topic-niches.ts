import type { SupportedCountry } from '../types';

/** Canonical content niches for diverse article generation */
export const CONTENT_NICHES = [
  'fiscalite',
  'entrepreneuriat',
  'gestion',
  'marketing',
  'ventes',
  'technologie',
  'ia',
  'croissance',
] as const;

export type ContentNiche = (typeof CONTENT_NICHES)[number];

export const NICHE_LABELS: Record<ContentNiche, { fr: string; pt: string }> = {
  fiscalite: { fr: 'Fiscalité', pt: 'Fiscalidade' },
  entrepreneuriat: { fr: 'Entrepreneuriat', pt: 'Empreendedorismo' },
  gestion: { fr: 'Gestion', pt: 'Gestão' },
  marketing: { fr: 'Marketing', pt: 'Marketing' },
  ventes: { fr: 'Ventes', pt: 'Vendas' },
  technologie: { fr: 'Technologie', pt: 'Tecnologia' },
  ia: { fr: 'Intelligence artificielle', pt: 'Inteligência artificial' },
  croissance: { fr: 'Croissance', pt: 'Crescimento' },
};

const NICHE_KEYWORDS: Record<ContentNiche, string[]> = {
  fiscalite: [
    'fiscal', 'fiscalité', 'fiscalidade', 'impôt', 'imposto', 'tva', 'iva', 'dgi', 'agt', 'déclaration',
    'taxe', 'syscohada', 'ohada', 'comptabilité', 'contabilidade',
  ],
  entrepreneuriat: [
    'créer', 'criar', 'entreprise', 'empreendedor', 'entrepreneur', 'rccm', 'ninea', 'registre',
    'formaliser', 'formalização', 'startup', 'pme', 'licence',
  ],
  gestion: [
    'gestion', 'gestão', 'organisation', 'organização', 'stock', 'inventaire', 'inventário',
    'caisse', 'pos', 'employé', 'rh', 'processus', 'productivité',
  ],
  marketing: [
    'marketing', 'publicité', 'publicidade', 'facebook', 'instagram', 'whatsapp', 'réseaux sociaux',
    'redes sociais', 'community manager', 'contenu', 'digital', 'campagne', 'meta ads',
  ],
  ventes: [
    'vendre', 'vender', 'vente', 'vendas', 'e-commerce', 'ecommerce', 'boutique en ligne',
    'loja online', 'marketplace', 'client', 'conversion', 'commande',
  ],
  technologie: [
    'technologie', 'tecnologia', 'digitalisation', 'digitalização', 'logiciel', 'software',
    'erp', 'application', 'app', 'cloud', 'automatisation',
  ],
  ia: [
    'intelligence artificielle', 'inteligência artificial', 'ia', 'ai', 'chatgpt', 'automation',
    'machine learning', 'assistant', 'robot',
  ],
  croissance: [
    'croissance', 'crescimento', 'expansion', 'expansão', 'développer', 'desenvolver',
    'scale', 'franchise', 'export', 'nouveau marché', 'investissement',
  ],
};

const NICHE_SEED_TOPICS: Partial<Record<SupportedCountry, Partial<Record<ContentNiche, string[]>>>> = {
  gn: {
    fiscalite: [
      'TVA 18% Guinée entreprise déclaration',
      'déclaration fiscale DGI Guinée en ligne',
      'calcul salaire net Guinée GNF',
      'impôt sur les sociétés Guinée PME',
      'retenue à la source Guinée guide',
    ],
    entrepreneuriat: [
      'créer entreprise Guinée RCCM étapes',
      'formaliser PME Conakry NIF',
      'licence commerce Guinée procédure',
      'statut juridique entreprise Guinée',
      'coût création entreprise Conakry',
    ],
    gestion: [
      'gestion stock boutique Conakry',
      'logiciel caisse POS Guinée',
      'inventaire superette Guinée',
      'gestion employés PME Guinée',
      'tableau de bord gestion commerce Guinée',
    ],
    marketing: [
      'publicité Facebook PME Guinée',
      'marketing WhatsApp commerce Conakry',
      'community manager PME Guinée',
      'stratégie réseaux sociaux Conakry',
      'Meta Ads boutique Guinée',
    ],
    ventes: [
      'vendre en ligne Guinée Orange Money',
      'e-commerce PME Conakry',
      'fidélisation clients boutique Guinée',
      'augmenter ventes maquis Conakry',
      'marketplace vendeur Guinée',
    ],
    technologie: [
      'digitalisation commerce Guinée',
      'ERP PME Guinée comparatif',
      'application gestion stock Guinée',
      'cloud PME Afrique de l\'Ouest',
      'automatisation facturation Guinée',
    ],
    ia: [
      'intelligence artificielle PME Afrique',
      'IA gestion entreprise Guinée',
      'ChatGPT pour commerçants Guinée',
      'automatisation service client IA Guinée',
      'IA comptabilité PME Conakry',
    ],
    croissance: [
      'développer son entreprise Guinée',
      'expansion PME Conakry multi-boutiques',
      'franchise commerce Guinée',
      'exporter produits Guinée',
      'levée fonds startup Guinée',
    ],
  },
  sn: {
    fiscalite: [
      'TVA Sénégal entreprise déclaration',
      'déclaration fiscale DGI Sénégal en ligne',
      'calcul salaire net Sénégal FCFA',
      'impôt sociétés Sénégal PME',
      'retenue source Sénégal guide',
    ],
    entrepreneuriat: [
      'créer entreprise Sénégal NINEA',
      'formaliser PME Dakar RCCM',
      'licence commerce Sénégal',
      'statut juridique SARL Sénégal',
      'coût création entreprise Dakar',
    ],
    gestion: [
      'gestion stock restaurant Dakar',
      'logiciel gestion boutique Sénégal',
      'inventaire superette Dakar',
      'gestion employés PME Sénégal',
      'POS multi-caisses Dakar',
    ],
    marketing: [
      'publicité Instagram PME Dakar',
      'marketing WhatsApp commerce Sénégal',
      'Meta Ads restaurant Dakar',
      'stratégie digitale PME Sénégal',
      'influenceur marketing Dakar PME',
    ],
    ventes: [
      'vendre en ligne Sénégal Wave',
      'e-commerce PME Dakar',
      'fidélisation clients boutique Dakar',
      'augmenter ventes Sandaga',
      'livraison e-commerce Sénégal',
    ],
    technologie: [
      'digitalisation commerce Sénégal',
      'ERP PME Dakar comparatif',
      'application gestion stock Sénégal',
      'cloud PME Sénégal',
      'automatisation facturation Dakar',
    ],
    ia: [
      'IA entreprises Sénégal',
      'automatisation PME Dakar',
      'ChatGPT commerçants Sénégal',
      'IA service client PME Dakar',
      'IA comptabilité Sénégal',
    ],
    croissance: [
      'développer PME Sénégal',
      'expansion business Dakar',
      'ouvrir deuxième boutique Sénégal',
      'franchise restaurant Dakar',
      'export PME Sénégal',
    ],
  },
  ci: {
    fiscalite: [
      'TVA Côte d\'Ivoire entreprise déclaration',
      'déclaration fiscale DGI Abidjan',
      'calcul salaire net Côte d\'Ivoire FCFA',
      'impôt sociétés CI PME',
      'FNE facture électronique Côte d\'Ivoire',
    ],
    entrepreneuriat: [
      'créer entreprise Côte d\'Ivoire RCCM',
      'formaliser PME Abidjan NCC',
      'licence commerce Abidjan',
      'statut juridique SARL Côte d\'Ivoire',
      'coût création entreprise Abidjan',
    ],
    gestion: [
      'gestion stock maquis Abidjan',
      'logiciel caisse POS Côte d\'Ivoire',
      'inventaire boutique Abidjan',
      'gestion employés PME CI',
      'POS restaurant Abidjan',
    ],
    marketing: [
      'publicité Facebook PME Abidjan',
      'marketing Instagram commerce CI',
      'Meta Ads maquis Abidjan',
      'WhatsApp Business vente Abidjan',
      'stratégie digitale PME Côte d\'Ivoire',
    ],
    ventes: [
      'vendre en ligne Côte d\'Ivoire MoMo',
      'e-commerce boutique Abidjan',
      'fidélisation clients CI',
      'augmenter ventes Treichville',
      'livraison e-commerce Abidjan',
    ],
    technologie: [
      'digitalisation commerce Abidjan',
      'ERP PME Côte d\'Ivoire comparatif',
      'application gestion stock CI',
      'cloud PME Abidjan',
      'automatisation facturation CI',
    ],
    ia: [
      'intelligence artificielle entreprises CI',
      'IA gestion PME Abidjan',
      'ChatGPT commerçants Côte d\'Ivoire',
      'IA service client PME Abidjan',
      'IA comptabilité CI',
    ],
    croissance: [
      'développer entreprise Côte d\'Ivoire',
      'expansion PME Abidjan',
      'ouvrir deuxième boutique CI',
      'franchise maquis Abidjan',
      'export PME Côte d\'Ivoire',
    ],
  },
  ao: {
    fiscalite: ['IVA Angola empresas', 'AGT impostos PME Luanda'],
    entrepreneuriat: ['criar empresa Angola', 'formalizar PME Luanda'],
    gestion: ['gestão stock loja Angola', 'software POS Angola'],
    marketing: ['publicidade Facebook PME Angola', 'marketing digital Luanda'],
    ventes: ['vender online Angola', 'e-commerce PME Luanda'],
    technologie: ['digitalização negócios Angola', 'ERP PME Angola'],
    ia: ['inteligência artificial empresas Angola', 'IA gestão PME'],
    croissance: ['crescer negócio Angola', 'expansão PME Luanda'],
  },
  mz: {
    fiscalite: ['IVA Moçambique empresas', 'AT impostos PME Maputo'],
    entrepreneuriat: ['criar empresa Moçambique', 'formalizar PME Maputo'],
    gestion: ['gestão stock loja Maputo', 'software POS Moçambique'],
    marketing: ['publicidade Facebook PME Moçambique', 'marketing WhatsApp Maputo'],
    ventes: ['vender online Moçambique M-Pesa', 'e-commerce PME Maputo'],
    technologie: ['digitalização negócios Moçambique', 'ERP PME'],
    ia: ['inteligência artificial empresas Moçambique', 'IA gestão PME'],
    croissance: ['crescer negócio Moçambique', 'expansão PME Maputo'],
  },
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

export function classifyTopicNiche(topic: string, categoryHint?: string): ContentNiche {
  const text = normalize(`${topic} ${categoryHint ?? ''}`);
  let best: ContentNiche = 'gestion';
  let bestScore = 0;

  for (const niche of CONTENT_NICHES) {
    let score = 0;
    for (const kw of NICHE_KEYWORDS[niche]) {
      if (text.includes(normalize(kw))) score += kw.length > 4 ? 2 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = niche;
    }
  }

  return best;
}

export function nicheToCategoryLabel(niche: ContentNiche, language: 'fr' | 'pt'): string {
  return NICHE_LABELS[niche][language === 'pt' ? 'pt' : 'fr'];
}

export function getNicheSeedTopics(countryCode: SupportedCountry, niche: ContentNiche): string[] {
  return NICHE_SEED_TOPICS[countryCode]?.[niche] ?? [];
}

export function getAllNicheSeedTopics(countryCode: SupportedCountry): string[] {
  const topics: string[] = [];
  for (const niche of CONTENT_NICHES) {
    topics.push(...getNicheSeedTopics(countryCode, niche));
  }
  return topics;
}

export interface DiverseTopicResult {
  topic: string;
  niche: ContentNiche;
  category: string;
}
