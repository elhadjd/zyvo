import type { ContentArticle } from '../db/schema';
import type { SupportedCountry } from '../types';
import { classifyTopicNiche, type ContentNiche } from '../research-engine/topic-niches';

export interface HeroImageResult {
  url: string;
  alt: string;
  credit?: string;
  source: 'curated';
}

const IMAGE_PARAMS = 'w=1200&h=630&fit=crop&q=80';

function unsplash(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?${IMAGE_PARAMS}`;
}

/** Topic-specific images — objects & African business context, no corporate meetings */
const TOPIC_IMAGE_RULES: { patterns: RegExp[]; image: HeroImageResult }[] = [
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
    image: {
      url: unsplash('photo-1554224154-2606cec3a9ce'),
      alt: 'Documents administratifs pour créer une entreprise',
      credit: 'Unsplash',
      source: 'curated',
    },
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
    image: {
      url: unsplash('photo-1554224311-beee415c201f'),
      alt: 'Comptabilité, factures et déclarations fiscales',
      credit: 'Unsplash',
      source: 'curated',
    },
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
    image: {
      url: unsplash('photo-1563986768609-322da13575f3'),
      alt: 'Paiement mobile et transactions digitales',
      credit: 'Unsplash',
      source: 'curated',
    },
  },
  {
    patterns: [
      /\bpos\b/i,
      /caisse/i,
      /point de vente/i,
      /terminal/i,
      /encaissement/i,
    ],
    image: {
      url: unsplash('photo-1556740758-90de374c12ad'),
      alt: 'Caisse et point de vente en boutique',
      credit: 'Unsplash',
      source: 'curated',
    },
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
    image: {
      url: unsplash('photo-1586525191012-0a779536d027'),
      alt: 'Gestion de stock et inventaire en magasin',
      credit: 'Unsplash',
      source: 'curated',
    },
  },
  {
    patterns: [
      /restaurant/i,
      /maquis/i,
      /horeca/i,
      /menu/i,
    ],
    image: {
      url: unsplash('photo-1517248135467-4c7edcad34c4'),
      alt: 'Gestion de restaurant et service client',
      credit: 'Unsplash',
      source: 'curated',
    },
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
    image: {
      url: unsplash('photo-1611162616305-c69b3fa7fbe0'),
      alt: 'Marketing digital et réseaux sociaux sur mobile',
      credit: 'Unsplash',
      source: 'curated',
    },
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
    image: {
      url: unsplash('photo-1472851294608-062f824d0963'),
      alt: 'Colis et vente en ligne',
      credit: 'Unsplash',
      source: 'curated',
    },
  },
  {
    patterns: [
      /\bia\b/i,
      /intelligence artificielle/i,
      /inteligência artificial/i,
      /chatgpt/i,
      /automatisation/i,
    ],
    image: {
      url: unsplash('photo-1677442136019-21780ecad995'),
      alt: 'Intelligence artificielle appliquée aux entreprises',
      credit: 'Unsplash',
      source: 'curated',
    },
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
    image: {
      url: unsplash('photo-1460925895917-afdab827c52f'),
      alt: 'Tableau de bord logiciel de gestion',
      credit: 'Unsplash',
      source: 'curated',
    },
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
    image: {
      url: unsplash('photo-1545178146-98f4b6cbf8bf'),
      alt: 'Marché local et commerce de proximité',
      credit: 'Unsplash',
      source: 'curated',
    },
  },
  {
    patterns: [
      /croissance/i,
      /crescimento/i,
      /expansion/i,
      /développer/i,
      /desenvolver/i,
    ],
    image: {
      url: unsplash('photo-1573497019230-3a0594dd76a9'),
      alt: 'Entrepreneure africaine au travail',
      credit: 'Unsplash',
      source: 'curated',
    },
  },
];

const NICHE_IMAGES: Record<ContentNiche, HeroImageResult> = {
  fiscalite: {
    url: unsplash('photo-1554224311-beee415c201f'),
    alt: 'Comptabilité et fiscalité des PME',
    credit: 'Unsplash',
    source: 'curated',
  },
  entrepreneuriat: {
    url: unsplash('photo-1554224154-2606cec3a9ce'),
    alt: 'Formalisation et création d\'entreprise',
    credit: 'Unsplash',
    source: 'curated',
  },
  gestion: {
    url: unsplash('photo-1586525191012-0a779536d027'),
    alt: 'Gestion de stock et organisation',
    credit: 'Unsplash',
    source: 'curated',
  },
  marketing: {
    url: unsplash('photo-1611162616305-c69b3fa7fbe0'),
    alt: 'Marketing digital sur mobile',
    credit: 'Unsplash',
    source: 'curated',
  },
  ventes: {
    url: unsplash('photo-1472851294608-062f824d0963'),
    alt: 'Vente en ligne et logistique',
    credit: 'Unsplash',
    source: 'curated',
  },
  technologie: {
    url: unsplash('photo-1460925895917-afdab827c52f'),
    alt: 'Logiciel de gestion et digitalisation',
    credit: 'Unsplash',
    source: 'curated',
  },
  ia: {
    url: unsplash('photo-1677442136019-21780ecad995'),
    alt: 'Intelligence artificielle pour PME',
    credit: 'Unsplash',
    source: 'curated',
  },
  croissance: {
    url: unsplash('photo-1593113598132-cbb8119963e8'),
    alt: 'Entrepreneure africaine et croissance',
    credit: 'Unsplash',
    source: 'curated',
  },
};

function matchTopicImage(title: string, category: string): HeroImageResult {
  const text = `${title} ${category}`;

  for (const rule of TOPIC_IMAGE_RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      return { ...rule.image };
    }
  }

  const niche = classifyTopicNiche(text, category);
  return { ...NICHE_IMAGES[niche] };
}

export async function fetchHeroImageForArticle(
  article: ContentArticle,
  _countryCode: SupportedCountry,
  primaryKeyword?: string,
  _slug?: string
): Promise<HeroImageResult> {
  const title = primaryKeyword ? `${article.title} ${primaryKeyword}` : article.title;
  return matchTopicImage(title, article.category);
}

/** Resolve hero image from title/category — always contextual */
export function resolvePostHeroImage(post: {
  slug: string;
  title: string;
  category: string;
  heroImage?: string;
  heroImageAlt?: string;
}): { url: string; alt: string } {
  const matched = matchTopicImage(post.title, post.category);
  return { url: matched.url, alt: matched.alt };
}
