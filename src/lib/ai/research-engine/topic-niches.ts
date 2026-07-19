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
    fiscalite: ['TVA 18% Guinée entreprise', 'déclaration fiscale DGI Guinée'],
    entrepreneuriat: ['créer entreprise Guinée RCCM', 'formaliser PME Conakry'],
    gestion: ['gestion stock boutique Conakry', 'logiciel caisse POS Guinée'],
    marketing: ['publicité Facebook PME Guinée', 'marketing WhatsApp commerce Conakry'],
    ventes: ['vendre en ligne Guinée', 'e-commerce PME Conakry Orange Money'],
    technologie: ['digitalisation commerce Guinée', 'ERP PME Guinée'],
    ia: ['intelligence artificielle PME Afrique', 'IA gestion entreprise Guinée'],
    croissance: ['développer son entreprise Guinée', 'expansion PME Conakry'],
  },
  sn: {
    fiscalite: ['TVA Sénégal entreprise', 'déclaration fiscale DGI Sénégal'],
    entrepreneuriat: ['créer entreprise Sénégal NINEA', 'formaliser PME Dakar'],
    gestion: ['gestion stock restaurant Dakar', 'logiciel gestion boutique Sénégal'],
    marketing: ['publicité Instagram PME Dakar', 'marketing WhatsApp commerce Sénégal'],
    ventes: ['vendre en ligne Sénégal Wave', 'e-commerce PME Dakar'],
    technologie: ['digitalisation commerce Sénégal', 'ERP PME Dakar'],
    ia: ['IA entreprises Sénégal', 'automatisation PME Dakar'],
    croissance: ['développer PME Sénégal', 'expansion business Dakar'],
  },
  ci: {
    fiscalite: ['TVA Côte d\'Ivoire entreprise', 'déclaration fiscale DGI Abidjan'],
    entrepreneuriat: ['créer entreprise Côte d\'Ivoire RCCM', 'formaliser PME Abidjan'],
    gestion: ['gestion stock maquis Abidjan', 'logiciel caisse POS Côte d\'Ivoire'],
    marketing: ['publicité Facebook PME Abidjan', 'marketing Instagram commerce CI'],
    ventes: ['vendre en ligne Côte d\'Ivoire MoMo', 'e-commerce boutique Abidjan'],
    technologie: ['digitalisation commerce Abidjan', 'ERP PME Côte d\'Ivoire'],
    ia: ['intelligence artificielle entreprises CI', 'IA gestion PME Abidjan'],
    croissance: ['développer entreprise Côte d\'Ivoire', 'expansion PME Abidjan'],
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
