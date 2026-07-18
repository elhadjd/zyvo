import type { CountryAiSettings } from './types';

export const COUNTRY_AI_CONFIGS: CountryAiSettings[] = [
  {
    countryCode: 'gn',
    language: 'fr',
    locale: 'fr-GN',
    countryName: 'Guinée',
    categories: [
      'Fiscalité',
      'Affaires',
      'Entrepreneuriat',
      'Technologie',
      'Marketing',
      'Gestion',
      'Commerce',
      'PME',
    ],
    topics: [
      'création entreprise Guinée',
      'gestion PME Conakry',
      'fiscalité DGI Guinée',
      'TVA 18% Guinée',
      'SYSCOHADA OHADA',
      'Orange Money commerce',
      'caisse POS Guinée',
      'marketing digital PME',
      'intelligence artificielle entreprises',
      'productivité commerçants',
    ],
    sources: [
      { name: 'DGI Guinée', url: 'https://www.dgi.gov.gn', type: 'government' },
      { name: 'Ministère du Commerce', url: 'https://www.commerce.gov.gn', type: 'government' },
      { name: 'OHADA', url: 'https://www.ohada.org', type: 'institution' },
      { name: 'ANSS', url: 'https://anss.gov.gn', type: 'government' },
      { name: 'CCIG', url: 'https://ccig.org.gn', type: 'business' },
      { name: 'Orange Guinée Business', url: 'https://www.orangeguinee.com', type: 'business' },
    ],
  },
  {
    countryCode: 'sn',
    language: 'fr',
    locale: 'fr-SN',
    countryName: 'Sénégal',
    categories: ['Fiscalité', 'Entrepreneuriat', 'Technologie', 'Marketing', 'Gestion'],
    topics: ['création entreprise Sénégal', 'DGI Sénégal', 'PME Dakar'],
    sources: [
      { name: 'DGI Sénégal', url: 'https://www.impots.gouv.sn', type: 'government' },
      { name: 'APIX', url: 'https://www.apix.sn', type: 'institution' },
    ],
  },
  {
    countryCode: 'ao',
    language: 'pt',
    locale: 'pt-AO',
    countryName: 'Angola',
    categories: ['Fiscalidade', 'Negócios', 'Empreendedorismo', 'Tecnologia', 'Marketing'],
    topics: ['criar empresa Angola', 'gestão PME Luanda', 'AGT impostos'],
    sources: [
      { name: 'AGT Angola', url: 'https://www.agt.minfin.gov.ao', type: 'government' },
      { name: 'MINCOM', url: 'https://www.minc.gov.ao', type: 'government' },
    ],
  },
  {
    countryCode: 'mz',
    language: 'pt',
    locale: 'pt-MZ',
    countryName: 'Moçambique',
    categories: ['Fiscalidade', 'Negócios', 'Empreendedorismo', 'Tecnologia', 'Marketing'],
    topics: ['criar empresa Moçambique', 'gestão PME Maputo', 'AT impostos'],
    sources: [
      { name: 'Autoridade Tributária', url: 'https://www.at.gov.mz', type: 'government' },
      { name: 'IPEME', url: 'https://www.ipeme.gov.mz', type: 'institution' },
    ],
  },
];

export function getCountryConfig(countryCode: string): CountryAiSettings | undefined {
  return COUNTRY_AI_CONFIGS.find((c) => c.countryCode === countryCode);
}
