import type { TaxBracket } from './types';

/**
 * Official tax rates and brackets — verified against DGI / PwC / CGI sources.
 * See tax-sources.ts for legal references.
 */

/** US state sales tax — combined state + avg local (2024 estimates) */
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

/** US federal income tax 2024 — single filer (IRS) */
export const US_FEDERAL_BRACKETS_2024: TaxBracket[] = [
  { min: 0, max: 11600, rate: 10 },
  { min: 11600, max: 47150, rate: 12 },
  { min: 47150, max: 100525, rate: 22 },
  { min: 100525, max: 191950, rate: 24 },
  { min: 191950, max: 243725, rate: 32 },
  { min: 243725, max: 609350, rate: 35 },
  { min: 609350, max: null, rate: 37 },
];

export const US_STANDARD_DEDUCTION_2024 = 14600;

/** Sénégal — IRPP barème annuel (Art. 173 CGI, PwC Tax Summaries 2024) */
export const SN_IRPP_BRACKETS_ANNUAL: TaxBracket[] = [
  { min: 0, max: 630000, rate: 0 },
  { min: 630000, max: 1500000, rate: 20 },
  { min: 1500000, max: 4000000, rate: 30 },
  { min: 4000000, max: 8000000, rate: 35 },
  { min: 8000000, max: 13500000, rate: 37 },
  { min: 13500000, max: 50000000, rate: 40 },
  { min: 50000000, max: null, rate: 43 },
];

/** Sénégal — cotisations salariales IPRES RG */
export const SN_IPRES_EMPLOYEE_RATE = 5.6;
export const SN_IPRES_MONTHLY_CAP = 432000;
export const SN_PROFESSIONAL_ABATEMENT_RATE = 30;
export const SN_PROFESSIONAL_ABATEMENT_ANNUAL_CAP = 900000;

/** Sénégal — TRIMF annuel (impôt minimum forfaitaire, PwC) */
export const SN_TRIMF_ANNUAL: { maxIncome: number; amount: number }[] = [
  { maxIncome: 599999, amount: 900 },
  { maxIncome: 999999, amount: 3600 },
  { maxIncome: 1999999, amount: 4800 },
  { maxIncome: 6999999, amount: 12000 },
  { maxIncome: 11999999, amount: 18000 },
  { maxIncome: Infinity, amount: 36000 },
];

/** Guinée — RTS barème MENSUEL (DGI Système Fiscal Guinéen, Art. retenue traitements salaires) */
export const GN_RTS_BRACKETS_MONTHLY: TaxBracket[] = [
  { min: 0, max: 1000000, rate: 0 },
  { min: 1000000, max: 5000000, rate: 5 },
  { min: 5000000, max: 10000000, rate: 10 },
  { min: 10000000, max: 20000000, rate: 15 },
  { min: 20000000, max: null, rate: 20 },
];

/** Guinée — cotisation sociale salariale */
export const GN_SOCIAL_EMPLOYEE_RATE = 5;

/** Côte d'Ivoire — ITS barème MENSUEL unifié (Ordonnance 2023-719, effet 01/01/2024) */
export const CI_ITS_BRACKETS_MONTHLY: TaxBracket[] = [
  { min: 0, max: 75000, rate: 0 },
  { min: 75000, max: 240000, rate: 16 },
  { min: 240000, max: 800000, rate: 21 },
  { min: 800000, max: 2400000, rate: 24 },
  { min: 2400000, max: 8000000, rate: 28 },
  { min: 8000000, max: null, rate: 32 },
];

/** Côte d'Ivoire — CNPS salariale + RICF */
export const CI_CNPS_EMPLOYEE_RATE = 6.3;
export const CI_RICF_PER_HALF_PART = 5500;
export const CI_DEFAULT_TAX_PARTS = 1; // 1 part = 2 demi-parts

/** Standard VAT and corporate rates */
export const SN_VAT_RATE = 18;
export const GN_VAT_RATE = 18;
export const CI_VAT_RATE = 18;
export const SN_CORPORATE_TAX_RATE = 30;
export const GN_CORPORATE_TAX_RATE = 25;
export const CI_CORPORATE_TAX_RATE = 25;

/** @deprecated Use SN_IRPP_BRACKETS_ANNUAL — kept for config compatibility */
export const SN_IRPP_BRACKETS = SN_IRPP_BRACKETS_ANNUAL;
