import type {
  CorporateTaxResult,
  IncomeTaxResult,
  PaycheckResult,
  SalesTaxResult,
  TaxBracket,
  UsStateSalesTax,
  VatResult,
} from './types';

/** Round to given decimal places using banker's-safe half-up rounding */
export function roundMoney(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function calculateVat(
  amount: number,
  rate: number,
  mode: 'ht-to-ttc' | 'ttc-to-ht',
  decimals = 2
): VatResult {
  const safeAmount = Math.max(0, amount);
  const safeRate = Math.max(0, rate) / 100;

  if (mode === 'ht-to-ttc') {
    const taxAmount = roundMoney(safeAmount * safeRate, decimals);
    const amountInclTax = roundMoney(safeAmount + taxAmount, decimals);
    return {
      amountExclTax: roundMoney(safeAmount, decimals),
      taxAmount,
      amountInclTax,
      rate,
    };
  }

  const amountExclTax = roundMoney(safeAmount / (1 + safeRate), decimals);
  const taxAmount = roundMoney(safeAmount - amountExclTax, decimals);
  return {
    amountExclTax,
    taxAmount,
    amountInclTax: roundMoney(safeAmount, decimals),
    rate,
  };
}

export function calculateProgressiveIncomeTax(
  grossIncome: number,
  brackets: TaxBracket[],
  standardDeduction = 0,
  decimals = 2,
  extraDeductions: { label: string; amount: number }[] = []
): IncomeTaxResult {
  const safeGross = Math.max(0, grossIncome);
  const deductionTotal =
    standardDeduction + extraDeductions.reduce((sum, item) => sum + Math.max(0, item.amount), 0);
  const taxableIncome = Math.max(0, safeGross - deductionTotal);

  let remaining = taxableIncome;
  let totalTax = 0;
  let marginalRate = 0;
  const breakdown: { label: string; amount: number }[] = [];

  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const bracketMin = bracket.min;
    const bracketMax = bracket.max ?? Infinity;
    const bracketWidth = Math.max(0, Math.min(remaining, bracketMax - bracketMin));
    if (bracketWidth <= 0) continue;

    const taxInBracket = roundMoney(bracketWidth * (bracket.rate / 100), decimals);
    totalTax += taxInBracket;
    marginalRate = bracket.rate;
    breakdown.push({
      label: `${bracket.rate}%`,
      amount: taxInBracket,
    });
    remaining -= bracketWidth;
  }

  totalTax = roundMoney(totalTax, decimals);
  const netIncome = roundMoney(safeGross - totalTax, decimals);
  const effectiveRate = safeGross > 0 ? roundMoney((totalTax / safeGross) * 100, 2) : 0;

  if (standardDeduction > 0) {
    breakdown.unshift({ label: 'deduction', amount: -standardDeduction });
  }

  return {
    grossIncome: roundMoney(safeGross, decimals),
    taxableIncome: roundMoney(taxableIncome, decimals),
    totalTax,
    effectiveRate,
    marginalRate,
    netIncome,
    breakdown,
  };
}

export function calculateCorporateTax(
  profit: number,
  rate: number,
  decimals = 2
): CorporateTaxResult {
  const safeProfit = Math.max(0, profit);
  const taxAmount = roundMoney(safeProfit * (rate / 100), decimals);
  return {
    taxableProfit: roundMoney(safeProfit, decimals),
    taxAmount,
    netProfit: roundMoney(safeProfit - taxAmount, decimals),
    rate,
  };
}

export function calculateUsPaycheck(
  grossAnnual: number,
  federalBrackets: TaxBracket[],
  federalStandardDeduction: number,
  stateRate: number,
  socialSecurityRate: number,
  socialSecurityCap: number,
  medicareRate: number,
  medicareAdditionalThreshold: number,
  medicareAdditionalRate: number,
  payPeriods = 12,
  decimals = 2
): PaycheckResult {
  const safeGross = Math.max(0, grossAnnual);
  const federal = calculateProgressiveIncomeTax(
    safeGross,
    federalBrackets,
    federalStandardDeduction,
    decimals
  );

  const socialSecurity = roundMoney(
    Math.min(safeGross, socialSecurityCap) * (socialSecurityRate / 100),
    decimals
  );

  let medicare = roundMoney(safeGross * (medicareRate / 100), decimals);
  if (safeGross > medicareAdditionalThreshold) {
    medicare = roundMoney(
      medicare +
        (safeGross - medicareAdditionalThreshold) * (medicareAdditionalRate / 100),
      decimals
    );
  }

  const stateTax = roundMoney(federal.taxableIncome * (stateRate / 100), decimals);
  const totalDeductions = roundMoney(
    federal.totalTax + stateTax + socialSecurity + medicare,
    decimals
  );
  const netPay = roundMoney(safeGross - totalDeductions, decimals);

  const perPeriod = (value: number) => roundMoney(value / payPeriods, decimals);

  return {
    grossPay: roundMoney(safeGross, decimals),
    federalTax: federal.totalTax,
    stateTax,
    socialSecurity,
    medicare,
    otherDeductions: 0,
    netPay,
    breakdown: [
      { label: 'gross', amount: perPeriod(safeGross) },
      { label: 'federal', amount: -perPeriod(federal.totalTax) },
      { label: 'state', amount: -perPeriod(stateTax) },
      { label: 'ss', amount: -perPeriod(socialSecurity) },
      { label: 'medicare', amount: -perPeriod(medicare) },
      { label: 'net', amount: perPeriod(netPay) },
    ],
  };
}

export function calculateSalesTax(
  amount: number,
  state: UsStateSalesTax,
  mode: 'excl-to-incl' | 'incl-to-excl',
  decimals = 2
): SalesTaxResult {
  const result = calculateVat(amount, state.rate, mode === 'excl-to-incl' ? 'ht-to-ttc' : 'ttc-to-ht', decimals);
  return {
    priceExclTax: result.amountExclTax,
    taxAmount: result.taxAmount,
    priceInclTax: result.amountInclTax,
    rate: state.rate,
    stateName: state.name,
  };
}

/** WAEMU salary estimate: IRPP + simplified social contributions */
export function calculateWaemuSalary(
  grossMonthly: number,
  annualBrackets: TaxBracket[],
  socialRate: number,
  decimals = 0
): IncomeTaxResult {
  const grossAnnual = grossMonthly * 12;
  const socialContribution = roundMoney(grossAnnual * (socialRate / 100), decimals);
  const result = calculateProgressiveIncomeTax(
    grossAnnual,
    annualBrackets,
    0,
    decimals,
    [{ label: 'social', amount: socialContribution }]
  );

  const totalDeductions = roundMoney(result.totalTax + socialContribution, decimals);
  const netAnnual = roundMoney(grossAnnual - totalDeductions, decimals);

  return {
    ...result,
    grossIncome: roundMoney(grossAnnual, decimals),
    netIncome: netAnnual,
    breakdown: [
      { label: 'gross', amount: roundMoney(grossMonthly, decimals) },
      { label: 'social', amount: -roundMoney(socialContribution / 12, decimals) },
      { label: 'irpp', amount: -roundMoney(result.totalTax / 12, decimals) },
      { label: 'net', amount: roundMoney(netAnnual / 12, decimals) },
    ],
  };
}
