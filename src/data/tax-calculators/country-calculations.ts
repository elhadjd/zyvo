import type { IncomeTaxResult, PaycheckResult } from './types';
import { calculateProgressiveIncomeTax, roundMoney } from './calculations';
import {
  CI_CNPS_EMPLOYEE_RATE,
  CI_DEFAULT_TAX_PARTS,
  CI_ITS_BRACKETS_MONTHLY,
  CI_RICF_PER_HALF_PART,
  GN_RTS_BRACKETS_MONTHLY,
  GN_SOCIAL_EMPLOYEE_RATE,
  SN_IPRES_EMPLOYEE_RATE,
  SN_IPRES_MONTHLY_CAP,
  SN_IRPP_BRACKETS_ANNUAL,
  SN_PROFESSIONAL_ABATEMENT_ANNUAL_CAP,
  SN_PROFESSIONAL_ABATEMENT_RATE,
  SN_TRIMF_ANNUAL,
} from './rates';

function getSenegalTrimfAnnual(grossAnnual: number): number {
  for (const band of SN_TRIMF_ANNUAL) {
    if (grossAnnual <= band.maxIncome) return band.amount;
  }
  return SN_TRIMF_ANNUAL[SN_TRIMF_ANNUAL.length - 1].amount;
}

/** Sénégal — IRPP annuel avec abattement 30% (plafond 900k) et cotisation IPRES */
export function calculateSenegalAnnualIncomeTax(
  grossAnnual: number,
  decimals = 0
): IncomeTaxResult {
  const gross = Math.max(0, grossAnnual);
  const monthlyGross = gross / 12;

  const ipresMonthly = roundMoney(
    Math.min(monthlyGross, SN_IPRES_MONTHLY_CAP) * (SN_IPRES_EMPLOYEE_RATE / 100),
    decimals
  );
  const ipresAnnual = roundMoney(ipresMonthly * 12, decimals);

  const abatement = roundMoney(
    Math.min(gross * (SN_PROFESSIONAL_ABATEMENT_RATE / 100), SN_PROFESSIONAL_ABATEMENT_ANNUAL_CAP),
    decimals
  );

  const trimf = getSenegalTrimfAnnual(gross);

  const irpp = calculateProgressiveIncomeTax(
    gross,
    SN_IRPP_BRACKETS_ANNUAL,
    0,
    decimals,
    [
      { label: 'abatement', amount: abatement },
      { label: 'ipres', amount: ipresAnnual },
    ]
  );

  const totalTax = roundMoney(irpp.totalTax + trimf, decimals);
  const netAnnual = roundMoney(gross - ipresAnnual - totalTax, decimals);

  return {
    grossIncome: roundMoney(gross, decimals),
    taxableIncome: irpp.taxableIncome,
    totalTax,
    effectiveRate: gross > 0 ? roundMoney((totalTax / gross) * 100, 2) : 0,
    marginalRate: irpp.marginalRate,
    netIncome: netAnnual,
    breakdown: [
      { label: 'Abattement 30%', amount: -abatement },
      { label: 'IPRES (5,6%)', amount: -ipresAnnual },
      { label: 'IRPP', amount: -irpp.totalTax },
      { label: 'TRIMF', amount: -trimf },
      { label: 'Net annuel', amount: netAnnual },
    ],
  };
}

/** Sénégal — salaire net mensuel (brut → net) */
export function calculateSenegalSalary(grossMonthly: number, decimals = 0): IncomeTaxResult {
  const annual = calculateSenegalAnnualIncomeTax(grossMonthly * 12, decimals);
  const monthlyGross = roundMoney(grossMonthly, decimals);

  return {
    ...annual,
    grossIncome: roundMoney(grossMonthly * 12, decimals),
    netIncome: roundMoney(annual.netIncome / 12, decimals),
    breakdown: [
      { label: 'Brut mensuel', amount: monthlyGross },
      { label: 'IPRES', amount: -roundMoney((annual.breakdown.find((b) => b.label.includes('IPRES'))?.amount ?? 0) / 12, decimals) },
      { label: 'IRPP', amount: -roundMoney((annual.breakdown.find((b) => b.label.includes('IRPP'))?.amount ?? 0) / 12, decimals) },
      { label: 'TRIMF', amount: -roundMoney((annual.breakdown.find((b) => b.label.includes('TRIMF'))?.amount ?? 0) / 12, decimals) },
      { label: 'Net mensuel', amount: roundMoney(annual.netIncome / 12, decimals) },
    ],
  };
}

/** Guinée — RTS mensuel sur revenu imposable après cotisation sociale 5% */
export function calculateGuineaMonthlyRts(
  grossMonthly: number,
  decimals = 0
): IncomeTaxResult {
  const gross = Math.max(0, grossMonthly);
  const social = roundMoney(gross * (GN_SOCIAL_EMPLOYEE_RATE / 100), decimals);
  const taxableMonthly = Math.max(0, gross - social);

  const rts = calculateProgressiveIncomeTax(taxableMonthly, GN_RTS_BRACKETS_MONTHLY, 0, decimals);
  const netMonthly = roundMoney(gross - social - rts.totalTax, decimals);

  return {
    grossIncome: roundMoney(gross, decimals),
    taxableIncome: taxableMonthly,
    totalTax: rts.totalTax,
    effectiveRate: gross > 0 ? roundMoney((rts.totalTax / gross) * 100, 2) : 0,
    marginalRate: rts.marginalRate,
    netIncome: netMonthly,
    breakdown: [
      { label: 'Brut mensuel', amount: gross },
      { label: 'Cotisation sociale (5%)', amount: -social },
      { label: 'RTS', amount: -rts.totalTax },
      { label: 'Net mensuel', amount: netMonthly },
    ],
  };
}

/** Guinée — IR annuel estimé (RTS mensuel × 12) */
export function calculateGuineaAnnualIncomeTax(grossAnnual: number, decimals = 0): IncomeTaxResult {
  const monthly = calculateGuineaMonthlyRts(grossAnnual / 12, decimals);
  return {
    ...monthly,
    grossIncome: roundMoney(grossAnnual, decimals),
    totalTax: roundMoney(monthly.totalTax * 12, decimals),
    netIncome: roundMoney(monthly.netIncome * 12, decimals),
    effectiveRate:
      grossAnnual > 0 ? roundMoney(((monthly.totalTax * 12) / grossAnnual) * 100, 2) : 0,
  };
}

/** Côte d'Ivoire — ITS mensuel unifié (depuis 2024) + CNPS 6,3% */
export function calculateIvoryCoastMonthlyIts(
  grossMonthly: number,
  taxParts = CI_DEFAULT_TAX_PARTS,
  decimals = 0
): IncomeTaxResult {
  const gross = Math.max(0, grossMonthly);
  const cnps = roundMoney(gross * (CI_CNPS_EMPLOYEE_RATE / 100), decimals);

  const its = calculateProgressiveIncomeTax(gross, CI_ITS_BRACKETS_MONTHLY, 0, decimals);
  const ricfCredit = roundMoney(CI_RICF_PER_HALF_PART * taxParts * 2, decimals);
  const itsAfterRicf = roundMoney(Math.max(0, its.totalTax - ricfCredit), decimals);

  const netMonthly = roundMoney(gross - cnps - itsAfterRicf, decimals);

  return {
    grossIncome: roundMoney(gross, decimals),
    taxableIncome: gross,
    totalTax: itsAfterRicf,
    effectiveRate: gross > 0 ? roundMoney((itsAfterRicf / gross) * 100, 2) : 0,
    marginalRate: its.marginalRate,
    netIncome: netMonthly,
    breakdown: [
      { label: 'Brut mensuel', amount: gross },
      { label: 'CNPS (6,3%)', amount: -cnps },
      { label: 'ITS', amount: -its.totalTax },
      { label: 'RICF', amount: ricfCredit },
      { label: 'Net mensuel', amount: netMonthly },
    ],
  };
}

/** Côte d'Ivoire — impôt annuel estimé (ITS mensuel × 12) */
export function calculateIvoryCoastAnnualIncomeTax(
  grossAnnual: number,
  taxParts = CI_DEFAULT_TAX_PARTS,
  decimals = 0
): IncomeTaxResult {
  const monthly = calculateIvoryCoastMonthlyIts(grossAnnual / 12, taxParts, decimals);
  const cnpsAnnual = roundMoney(
    (monthly.breakdown.find((b) => b.label.includes('CNPS'))?.amount ?? 0) * 12,
    decimals
  );

  return {
    ...monthly,
    grossIncome: roundMoney(grossAnnual, decimals),
    totalTax: roundMoney(monthly.totalTax * 12, decimals),
    netIncome: roundMoney(monthly.netIncome * 12, decimals),
    breakdown: [
      { label: 'Brut annuel', amount: roundMoney(grossAnnual, decimals) },
      { label: 'CNPS annuel', amount: cnpsAnnual },
      { label: 'ITS annuel', amount: -roundMoney(monthly.totalTax * 12, decimals) },
      { label: 'Net annuel', amount: roundMoney(monthly.netIncome * 12, decimals) },
    ],
  };
}

/** Route salary calculation by country */
export function calculateCountrySalary(
  countryCode: 'sn' | 'gn' | 'ci',
  grossMonthly: number,
  decimals = 0
): IncomeTaxResult | PaycheckResult {
  switch (countryCode) {
    case 'sn':
      return calculateSenegalSalary(grossMonthly, decimals);
    case 'gn':
      return calculateGuineaMonthlyRts(grossMonthly, decimals);
    case 'ci':
      return calculateIvoryCoastMonthlyIts(grossMonthly, CI_DEFAULT_TAX_PARTS, decimals);
  }
}

/** Route annual income tax by country */
export function calculateCountryAnnualIncomeTax(
  countryCode: 'sn' | 'gn' | 'ci',
  grossAnnual: number,
  decimals = 0
): IncomeTaxResult {
  switch (countryCode) {
    case 'sn':
      return calculateSenegalAnnualIncomeTax(grossAnnual, decimals);
    case 'gn':
      return calculateGuineaAnnualIncomeTax(grossAnnual, decimals);
    case 'ci':
      return calculateIvoryCoastAnnualIncomeTax(grossAnnual, decimals);
  }
}
