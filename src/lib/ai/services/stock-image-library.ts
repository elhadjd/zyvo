import { classifyTopicNiche, type ContentNiche } from '../research-engine/topic-niches';

export interface HeroImageResult {
  url: string;
  alt: string;
  credit?: string;
  source: 'pexels' | 'unsplash' | 'curated';
}

const IMAGE_PARAMS = 'w=1200&h=630&fit=crop&q=80';
const PEXELS_PARAMS = 'auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop';

/** Guaranteed-accessible fallback (verified) */
export const FALLBACK_HERO_IMAGE: HeroImageResult = {
  url: unsplash('photo-1454165804606-c3d57bc86b40'),
  alt: 'Guide pratique pour entrepreneurs et PME',
  credit: 'Unsplash',
  source: 'curated',
};

function unsplash(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?${IMAGE_PARAMS}`;
}

function pexels(photoId: number): string {
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?${PEXELS_PARAMS}`;
}

/** Topic-specific images — all URLs verified accessible */
const TOPIC_IMAGE_RULES: { patterns: RegExp[]; images: HeroImageResult[] }[] = [
  {
    patterns: [
      /\bninea\b/i,
      /\brccm\b/i,
      /registre.{0,20}commerce/i,
      /création.{0,20}entreprise/i,
      /créer.{0,15}entreprise/i,
      /criar.{0,15}empresa/i,
      /formaliser/i,
      /formaliza/i,
      /obtention/i,
      /démarche/i,
      /demarche/i,
      /immatriculation/i,
      /licence.{0,15}commerce/i,
    ],
    images: [
      {
        url: pexels(4386321),
        alt: 'Documents administratifs pour créer une entreprise',
        credit: 'Pexels',
        source: 'curated',
      },
      {
        url: unsplash('photo-1454165804606-c3d57bc86b40'),
        alt: 'Formalisation et création d\'entreprise',
        credit: 'Unsplash',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /\btva\b/i,
      /\biva\b/i,
      /fiscal/i,
      /fiscalité/i,
      /fiscalidade/i,
      /\bdgi\b/i,
      /\bagt\b/i,
      /impôt/i,
      /imposto/i,
      /déclaration fiscale/i,
      /syscohada/i,
      /comptabilité/i,
      /contabilidade/i,
    ],
    images: [
      {
        url: pexels(590022),
        alt: 'Comptabilité, factures et déclarations fiscales',
        credit: 'Pexels',
        source: 'curated',
      },
      {
        url: unsplash('photo-1554224311-beee415c201f'),
        alt: 'Comptabilité et fiscalité des PME',
        credit: 'Unsplash',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /orange money/i,
      /\bwave\b/i,
      /\bmomo\b/i,
      /mobile money/i,
      /m-pesa/i,
      /paiement mobile/i,
      /pagamento móvel/i,
    ],
    images: [
      {
        url: unsplash('photo-1563986768609-322da13575f3'),
        alt: 'Paiement mobile et transactions digitales',
        credit: 'Unsplash',
        source: 'curated',
      },
      {
        url: unsplash('photo-1556742049-0cfed4f6a45d'),
        alt: 'Paiement mobile et commerce',
        credit: 'Unsplash',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /\bpos\b/i,
      /caisse/i,
      /point de vente/i,
      /terminal/i,
      /encaissement/i,
    ],
    images: [
      {
        url: unsplash('photo-1556740758-90de374c12ad'),
        alt: 'Caisse et point de vente en boutique',
        credit: 'Unsplash',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /stock/i,
      /inventaire/i,
      /inventário/i,
      /entrepôt/i,
      /warehouse/i,
      /magasinage/i,
    ],
    images: [
      {
        url: pexels(264636),
        alt: 'Gestion de stock et inventaire en magasin',
        credit: 'Pexels',
        source: 'curated',
      },
      {
        url: pexels(265087),
        alt: 'Organisation de stock en entrepôt',
        credit: 'Pexels',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /restaurant/i,
      /maquis/i,
      /horeca/i,
      /menu/i,
    ],
    images: [
      {
        url: unsplash('photo-1573164713714-d95e436ab8d6'),
        alt: 'Gestion de restaurant et service client',
        credit: 'Unsplash',
        source: 'curated',
      },
      {
        url: unsplash('photo-1517248135467-4c7edcad34c4'),
        alt: 'Restaurant et accueil clients',
        credit: 'Unsplash',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /facebook/i,
      /instagram/i,
      /whatsapp/i,
      /réseaux sociaux/i,
      /redes sociais/i,
      /publicité/i,
      /publicidade/i,
      /marketing digital/i,
    ],
    images: [
      {
        url: unsplash('photo-1611162616305-c69b3fa7fbe0'),
        alt: 'Marketing digital et réseaux sociaux sur mobile',
        credit: 'Unsplash',
        source: 'curated',
      },
      {
        url: pexels(4483612),
        alt: 'Réseaux sociaux et communication digitale',
        credit: 'Pexels',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /e-?commerce/i,
      /vendre en ligne/i,
      /vender online/i,
      /boutique en ligne/i,
      /loja online/i,
      /marketplace/i,
      /livraison/i,
    ],
    images: [
      {
        url: unsplash('photo-1556742111-a301076d9d18'),
        alt: 'Colis et vente en ligne',
        credit: 'Unsplash',
        source: 'curated',
      },
      {
        url: pexels(4968391),
        alt: 'E-commerce et livraison de colis',
        credit: 'Pexels',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /\bia\b/i,
      /intelligence artificielle/i,
      /inteligência artificial/i,
      /chatgpt/i,
      /automatisation/i,
    ],
    images: [
      {
        url: unsplash('photo-1677442136019-21780ecad995'),
        alt: 'Intelligence artificielle appliquée aux entreprises',
        credit: 'Unsplash',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /erp/i,
      /logiciel/i,
      /software/i,
      /digitalisation/i,
      /digitalização/i,
      /application/i,
    ],
    images: [
      {
        url: unsplash('photo-1460925895917-afdab827c52f'),
        alt: 'Tableau de bord logiciel de gestion',
        credit: 'Unsplash',
        source: 'curated',
      },
      {
        url: unsplash('photo-1551434678-e076c223a692'),
        alt: 'Digitalisation et outils de gestion',
        credit: 'Unsplash',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /marché/i,
      /market/i,
      /boutique/i,
      /commerce/i,
      /comércio/i,
      /vendeur/i,
      /commerçant/i,
    ],
    images: [
      {
        url: unsplash('photo-1556742049-0cfed4f6a45d'),
        alt: 'Marché local et commerce de proximité',
        credit: 'Unsplash',
        source: 'curated',
      },
      {
        url: pexels(4482900),
        alt: 'Commerce et vente au détail',
        credit: 'Pexels',
        source: 'curated',
      },
    ],
  },
  {
    patterns: [
      /croissance/i,
      /crescimento/i,
      /expansion/i,
      /développer/i,
      /desenvolver/i,
    ],
    images: [
      {
        url: unsplash('photo-1559136555-9303baea8ebd'),
        alt: 'Croissance et expansion d\'entreprise',
        credit: 'Unsplash',
        source: 'curated',
      },
      {
        url: unsplash('photo-1507679799987-c73779587ccf'),
        alt: 'Entrepreneur et développement business',
        credit: 'Unsplash',
        source: 'curated',
      },
    ],
  },
];

const NICHE_IMAGES: Record<ContentNiche, HeroImageResult[]> = {
  fiscalite: [
    {
      url: pexels(590022),
      alt: 'Comptabilité et fiscalité des PME',
      credit: 'Pexels',
      source: 'curated',
    },
    {
      url: unsplash('photo-1554224311-beee415c201f'),
      alt: 'Fiscalité et déclarations',
      credit: 'Unsplash',
      source: 'curated',
    },
  ],
  entrepreneuriat: [
    {
      url: pexels(4386321),
      alt: 'Formalisation et création d\'entreprise',
      credit: 'Pexels',
      source: 'curated',
    },
    {
      url: unsplash('photo-1507679799987-c73779587ccf'),
      alt: 'Entrepreneuriat et création d\'entreprise',
      credit: 'Unsplash',
      source: 'curated',
    },
  ],
  gestion: [
    {
      url: pexels(264636),
      alt: 'Gestion de stock et organisation',
      credit: 'Pexels',
      source: 'curated',
    },
  ],
  marketing: [
    {
      url: unsplash('photo-1611162616305-c69b3fa7fbe0'),
      alt: 'Marketing digital sur mobile',
      credit: 'Unsplash',
      source: 'curated',
    },
  ],
  ventes: [
    {
      url: unsplash('photo-1556742111-a301076d9d18'),
      alt: 'Vente en ligne et logistique',
      credit: 'Unsplash',
      source: 'curated',
    },
  ],
  technologie: [
    {
      url: unsplash('photo-1460925895917-afdab827c52f'),
      alt: 'Logiciel de gestion et digitalisation',
      credit: 'Unsplash',
      source: 'curated',
    },
  ],
  ia: [
    {
      url: unsplash('photo-1677442136019-21780ecad995'),
      alt: 'Intelligence artificielle pour PME',
      credit: 'Unsplash',
      source: 'curated',
    },
  ],
  croissance: [
    {
      url: unsplash('photo-1559136555-9303baea8ebd'),
      alt: 'Entrepreneure africaine et croissance',
      credit: 'Unsplash',
      source: 'curated',
    },
    {
      url: unsplash('photo-1507679799987-c73779587ccf'),
      alt: 'Croissance et développement business',
      credit: 'Unsplash',
      source: 'curated',
    },
  ],
};

export function getTopicImageCandidates(title: string, category: string): HeroImageResult[] {
  const text = `${title} ${category}`;

  for (const rule of TOPIC_IMAGE_RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      return rule.images.map((image) => ({ ...image }));
    }
  }

  const niche = classifyTopicNiche(text, category);
  return NICHE_IMAGES[niche].map((image) => ({ ...image }));
}

export function buildRuleBasedSearchQueries(title: string, category: string): string[] {
  const niche = classifyTopicNiche(`${title} ${category}`, category);
  const nicheQueries: Record<ContentNiche, string> = {
    fiscalite: 'business accounting tax calculator receipts',
    entrepreneuriat: 'business registration documents signing africa',
    gestion: 'retail inventory stock shelves store',
    marketing: 'social media marketing smartphone africa',
    ventes: 'online shopping ecommerce delivery packages',
    technologie: 'business software dashboard laptop',
    ia: 'artificial intelligence technology business',
    croissance: 'african entrepreneur small business growth',
  };

  const queries = [nicheQueries[niche]];
  const topicHint = title
    .replace(/\b(guinée|sénégal|conakry|dakar|abidjan|angola|moçambique|côte d'ivoire)\b/gi, '')
    .replace(/[^\w\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .join(' ');

  if (topicHint.length > 4) {
    queries.push(`${nicheQueries[niche].split(' ').slice(0, 3).join(' ')} ${topicHint}`);
  }

  return [...new Set(queries)].slice(0, 3);
}

/** Sync resolver for SSR — uses verified candidate per topic */
export function resolvePostHeroImage(post: {
  slug: string;
  title: string;
  category: string;
  heroImage?: string;
  heroImageAlt?: string;
}): { url: string; alt: string } {
  const candidates = getTopicImageCandidates(post.title, post.category);
  const primary = candidates[0] ?? FALLBACK_HERO_IMAGE;
  return { url: primary.url, alt: primary.alt };
}

export function getHeroImageFallbackUrl(): string {
  return FALLBACK_HERO_IMAGE.url;
}
