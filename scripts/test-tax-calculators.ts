/**
 * Validates country-specific tax calculations against known scenarios.
 * Run: npx tsx scripts/test-tax-calculators.ts
 */
import {
  calculateSenegalAnnualIncomeTax,
  calculateSenegalSalary,
  calculateGuineaMonthlyRts,
  calculateGuineaAnnualIncomeTax,
  calculateIvoryCoastMonthlyIts,
  calculateIvoryCoastAnnualIncomeTax,
} from '../src/data/tax-calculators/country-calculations';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ ${message}`);
  }
}

function approx(a: number, b: number, tolerance = 1) {
  return Math.abs(a - b) <= tolerance;
}

console.log('\n=== Sénégal ===');
{
  // 500k/month = 6M/year — below first IRPP bracket after abatement
  const salary = calculateSenegalSalary(500000, 0);
  assert(salary.netIncome > 0, 'SN salary net > 0 for 500k brut');
  assert(salary.netIncome < 500000, 'SN salary net < brut');

  const annual = calculateSenegalAnnualIncomeTax(6000000, 0);
  assert(annual.totalTax >= 0, 'SN annual tax >= 0');
  // IPRES: min(500000, 432000) * 5.6% * 12 = 432000 * 0.056 * 12 = 290304
  assert(approx(annual.breakdown.find((b) => b.label.includes('IPRES'))?.amount ?? 0, -290304), 'SN IPRES annual ~290304');

  // TRIMF for 6M gross should be 12000
  const trimf = annual.breakdown.find((b) => b.label.includes('TRIMF'))?.amount ?? 0;
  assert(trimf === -12000, 'SN TRIMF 12000 for 6M annual gross');
}

console.log('\n=== Guinée ===');
{
  // 2M GNF/month — RTS 5% bracket on portion above 1M
  const monthly = calculateGuineaMonthlyRts(2000000, 0);
  const social = 2000000 * 0.05; // 100000
  const taxable = 2000000 - social; // 1900000
  // RTS: 0 on first 1M, 5% on 900k = 45000
  const expectedRts = (taxable - 1000000) * 0.05;
  assert(approx(monthly.totalTax, expectedRts), `GN RTS ~${expectedRts} for 2M brut`);
  assert(approx(monthly.netIncome, 2000000 - social - expectedRts), 'GN net = brut - social - RTS');

  const annual = calculateGuineaAnnualIncomeTax(24000000, 0);
  assert(approx(annual.totalTax, monthly.totalTax * 12), 'GN annual = monthly RTS × 12');
}

console.log('\n=== Côte d\'Ivoire ===');
{
  // 300k FCFA/month — ITS 16% bracket (75k-240k at 0%, 240k-300k at 16%)
  const monthly = calculateIvoryCoastMonthlyIts(300000, 1, 0);
  const cnps = 300000 * 0.063; // 18900
  // ITS on 300k: 0% on 75k + 16% on (240k-75k) + 21% on (300k-240k)
  const expectedIts = 165000 * 0.16 + 60000 * 0.21; // 26400 + 12600 = 39000
  const ricf = 5500 * 2; // 11000 for 1 part
  const itsAfterRicf = expectedIts - ricf; // 28000
  assert(approx(monthly.totalTax, itsAfterRicf), `CI ITS after RICF ~${itsAfterRicf}`);
  assert(approx(monthly.netIncome, 300000 - cnps - itsAfterRicf), 'CI net = brut - CNPS - ITS');

  const annual = calculateIvoryCoastAnnualIncomeTax(3600000, 1, 0);
  assert(approx(annual.totalTax, monthly.totalTax * 12), 'CI annual = monthly ITS × 12');
}

console.log('\n=== Cross-country differences ===');
{
  const snNet = calculateSenegalSalary(1000000, 0).netIncome;
  const gnNet = calculateGuineaMonthlyRts(1000000, 0).netIncome;
  const ciNet = calculateIvoryCoastMonthlyIts(1000000, 1, 0).netIncome;
  assert(snNet !== gnNet || gnNet !== ciNet, 'SN/GN/CI produce different net for same nominal amount');
}

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
