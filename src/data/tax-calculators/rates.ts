/** US state sales tax rates (combined state average, 2024 — for estimation only) */
export const US_STATE_SALES_TAX: { code: string; name: string; rate: number }[] = [
  { code: 'AL', name: 'Alabama', rate: 9.22 },
  { code: 'AK', name: 'Alaska', rate: 1.76 },
  { code: 'AZ', name: 'Arizona', rate: 8.37 },
  { code: 'AR', name: 'Arkansas', rate: 9.45 },
  { code: 'CA', name: 'California', rate: 8.85 },
  { code: 'CO', name: 'Colorado', rate: 7.77 },
  { code: 'CT', name: 'Connecticut', rate: 6.35 },
  { code: 'DE', name: 'Delaware', rate: 0 },
  { code: 'FL', name: 'Florida', rate: 7.02 },
  { code: 'GA', name: 'Georgia', rate: 7.38 },
  { code: 'HI', name: 'Hawaii', rate: 4.5 },
  { code: 'ID', name: 'Idaho', rate: 6.03 },
  { code: 'IL', name: 'Illinois', rate: 8.81 },
  { code: 'IN', name: 'Indiana', rate: 7 },
  { code: 'IA', name: 'Iowa', rate: 6.94 },
  { code: 'KS', name: 'Kansas', rate: 8.7 },
  { code: 'KY', name: 'Kentucky', rate: 6 },
  { code: 'LA', name: 'Louisiana', rate: 9.55 },
  { code: 'ME', name: 'Maine', rate: 5.5 },
  { code: 'MD', name: 'Maryland', rate: 6 },
  { code: 'MA', name: 'Massachusetts', rate: 6.25 },
  { code: 'MI', name: 'Michigan', rate: 6 },
  { code: 'MN', name: 'Minnesota', rate: 7.49 },
  { code: 'MS', name: 'Mississippi', rate: 7.07 },
  { code: 'MO', name: 'Missouri', rate: 8.35 },
  { code: 'MT', name: 'Montana', rate: 0 },
  { code: 'NE', name: 'Nebraska', rate: 6.94 },
  { code: 'NV', name: 'Nevada', rate: 8.23 },
  { code: 'NH', name: 'New Hampshire', rate: 0 },
  { code: 'NJ', name: 'New Jersey', rate: 6.6 },
  { code: 'NM', name: 'New Mexico', rate: 7.6 },
  { code: 'NY', name: 'New York', rate: 8.52 },
  { code: 'NC', name: 'North Carolina', rate: 6.98 },
  { code: 'ND', name: 'North Dakota', rate: 6.96 },
  { code: 'OH', name: 'Ohio', rate: 7.24 },
  { code: 'OK', name: 'Oklahoma', rate: 8.98 },
  { code: 'OR', name: 'Oregon', rate: 0 },
  { code: 'PA', name: 'Pennsylvania', rate: 6.34 },
  { code: 'RI', name: 'Rhode Island', rate: 7 },
  { code: 'SC', name: 'South Carolina', rate: 7.44 },
  { code: 'SD', name: 'South Dakota', rate: 6.4 },
  { code: 'TN', name: 'Tennessee', rate: 9.55 },
  { code: 'TX', name: 'Texas', rate: 8.2 },
  { code: 'UT', name: 'Utah', rate: 7.25 },
  { code: 'VT', name: 'Vermont', rate: 6.24 },
  { code: 'VA', name: 'Virginia', rate: 5.75 },
  { code: 'WA', name: 'Washington', rate: 9.38 },
  { code: 'WV', name: 'West Virginia', rate: 6.5 },
  { code: 'WI', name: 'Wisconsin', rate: 5.43 },
  { code: 'WY', name: 'Wyoming', rate: 5.36 },
  { code: 'DC', name: 'Washington D.C.', rate: 6 },
];

/** US federal income tax brackets 2024 — Single filer */
export const US_FEDERAL_BRACKETS_2024 = [
  { min: 0, max: 11600, rate: 10 },
  { min: 11600, max: 47150, rate: 12 },
  { min: 47150, max: 100525, rate: 22 },
  { min: 100525, max: 191950, rate: 24 },
  { min: 191950, max: 243725, rate: 32 },
  { min: 243725, max: 609350, rate: 35 },
  { min: 609350, max: null, rate: 37 },
];

export const US_STANDARD_DEDUCTION_2024 = 14600;

/** Senegal IRPP annual brackets (FCFA) — simplified official scale */
export const SN_IRPP_BRACKETS = [
  { min: 0, max: 630000, rate: 0 },
  { min: 630000, max: 1500000, rate: 20 },
  { min: 1500000, max: 4000000, rate: 30 },
  { min: 4000000, max: 8000000, rate: 35 },
  { min: 8000000, max: 13500000, rate: 37 },
  { min: 13500000, max: 20000000, rate: 40 },
  { min: 20000000, max: null, rate: 43 },
];

/** Guinea IRPP annual brackets (GNF) — simplified */
export const GN_IRPP_BRACKETS = [
  { min: 0, max: 1200000, rate: 0 },
  { min: 1200000, max: 3000000, rate: 10 },
  { min: 3000000, max: 6000000, rate: 20 },
  { min: 6000000, max: 12000000, rate: 30 },
  { min: 12000000, max: null, rate: 40 },
];

/** Côte d'Ivoire IRPP annual brackets (FCFA) — simplified */
export const CI_IRPP_BRACKETS = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 547000, rate: 10 },
  { min: 547000, max: 979000, rate: 15 },
  { min: 979000, max: 1519000, rate: 20 },
  { min: 1519000, max: 2644000, rate: 25 },
  { min: 2644000, max: 4669000, rate: 30 },
  { min: 4669000, max: 10106000, rate: 35 },
  { min: 10106000, max: null, rate: 40 },
];
