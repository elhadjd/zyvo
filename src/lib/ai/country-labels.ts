import type { SupportedCountry } from './types';

/** Mercados publicados no site com pipeline AI activo */
export const SITE_AI_COUNTRIES = ['gn', 'sn', 'ci'] as const;
export type SiteAiCountry = (typeof SITE_AI_COUNTRIES)[number];

export const ALL_AI_COUNTRIES: SupportedCountry[] = ['gn', 'sn', 'ci', 'ao', 'mz'];

export const COUNTRY_LABELS: Record<string, string> = {
  gn: 'Guinée',
  sn: 'Sénégal',
  ci: "Côte d'Ivoire",
  ao: 'Angola',
  mz: 'Moçambique',
  us: 'United States',
};

export const SITE_AI_COUNTRY_OPTIONS = SITE_AI_COUNTRIES.map((code) => ({
  code,
  label: `${COUNTRY_LABELS[code]} (${code.toUpperCase()})`,
}));

export const ALL_AI_COUNTRY_OPTIONS = ALL_AI_COUNTRIES.map((code) => ({
  code,
  label: `${COUNTRY_LABELS[code]} (${code.toUpperCase()})`,
}));

export interface CountryLocalContext {
  capital: string;
  districts: string;
  currency: string;
  payments: string;
  taxAuthority: string;
}

export const COUNTRY_LOCAL_CONTEXT: Record<SiteAiCountry, CountryLocalContext> = {
  gn: {
    capital: 'Conakry',
    districts: 'Kaloum, Ratoma, Matam, Dixinn',
    currency: 'GNF (franc guinéen)',
    payments: 'Orange Money et MTN MoMo',
    taxAuthority: 'DGI Guinée',
  },
  sn: {
    capital: 'Dakar',
    districts: 'Plateau, Almadies, Pikine, Guédiawaye',
    currency: 'FCFA (XOF)',
    payments: 'Wave, Orange Money et Free Money',
    taxAuthority: 'DGI Sénégal',
  },
  ci: {
    capital: 'Abidjan',
    districts: 'Cocody, Plateau, Yopougon, Marcory',
    currency: 'FCFA (XOF)',
    payments: 'Orange Money, MTN MoMo et Moov Money',
    taxAuthority: "DGI Côte d'Ivoire",
  },
};

export const COUNTRY_TEST_TOPICS: Record<SiteAiCountry, string> = {
  gn: 'Comment ouvrir une petite entreprise en Guinée',
  sn: 'Comment ouvrir une petite entreprise au Sénégal',
  ci: "Comment ouvrir une petite entreprise en Côte d'Ivoire",
};

export function isSiteAiCountry(code: string): code is SiteAiCountry {
  return (SITE_AI_COUNTRIES as readonly string[]).includes(code);
}
