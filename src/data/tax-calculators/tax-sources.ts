/**
 * Official sources for tax rates used in Zyvo calculators.
 * Last verified: July 2025.
 */

export const TAX_SOURCES = {
  sn: {
    country: 'Sénégal',
    vat: { rate: '18 %', source: 'CGI art. 361 — taux normal TVA' },
    corporate: { rate: '30 %', source: 'CGI — impôt sur les sociétés' },
    irpp: {
      method: 'Barème annuel progressif (7 tranches, 0 % à 43 %)',
      source: 'CGI art. 173 — PwC Worldwide Tax Summaries 2024',
    },
    ipres: {
      rate: '5,6 % salarié',
      cap: '432 000 FCFA/mois',
      source: 'IPRES — régime général',
    },
    trimf: { source: 'Taxe minimum forfaitaire (TRIMF) — barème annuel PwC' },
    abatement: { rate: '30 %', cap: '900 000 FCFA/an', source: 'CGI — abattement forfaitaire' },
  },
  gn: {
    country: 'Guinée',
    vat: { rate: '18 %', source: 'CGI guinéen — taux normal TVA' },
    corporate: { rate: '25 %', source: 'CGI — impôt sur les bénéfices industriels et commerciaux' },
    rts: {
      method: 'Barème mensuel progressif (0 %, 5 %, 10 %, 15 %, 20 %)',
      source: 'DGI Guinée — retenue à la source sur traitements et salaires',
      brackets: '0–1M, 1M–5M, 5M–10M, 10M–20M, >20M GNF/mois',
    },
    social: { rate: '5 % salarié', source: 'Cotisation sociale salariale' },
  },
  ci: {
    country: "Côte d'Ivoire",
    vat: { rate: '18 %', source: 'CGI — taux normal TVA' },
    corporate: { rate: '25 %', source: 'CGI — impôt sur les bénéfices' },
    its: {
      method: 'Barème mensuel unifié depuis 01/01/2024 (0 % à 32 %)',
      source: 'Ordonnance n° 2023-719 — réforme fiscale 2024',
      brackets: '75k, 240k, 800k, 2,4M, 8M FCFA/mois',
    },
    cnps: { rate: '6,3 % salarié', source: 'CNPS — cotisation salariale' },
    ricf: {
      credit: '5 500 FCFA par demi-part',
      cap: '33 000 FCFA/mois',
      source: 'RICF — réduction d\'impôt pour charge de famille',
    },
  },
} as const;
