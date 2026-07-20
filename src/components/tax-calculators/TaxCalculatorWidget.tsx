'use client';

import { useMemo, useState } from 'react';
import type { TaxCalculatorId, TaxCountryConfig } from '@/data/tax-calculators/types';
import {
  calculateCorporateTax,
  calculateProgressiveIncomeTax,
  calculateSalesTax,
  calculateUsPaycheck,
  calculateVat,
  calculateWaemuSalary,
} from '@/data/tax-calculators/calculations';
import { formatTaxAmount } from '@/data/tax-calculators/config';

interface TaxCalculatorWidgetProps {
  calculatorId: TaxCalculatorId;
  config: TaxCountryConfig;
}

type VatMode = 'ht-to-ttc' | 'ttc-to-ht';
type SalesMode = 'excl-to-incl' | 'incl-to-excl';

export default function TaxCalculatorWidget({ calculatorId, config }: TaxCalculatorWidgetProps) {
  const isUs = config.code === 'us';
  const labels = isUs
    ? {
        amount: 'Amount',
        grossAnnual: 'Annual gross salary',
        grossMonthly: 'Monthly gross salary',
        profit: 'Taxable profit',
        mode: 'Calculation mode',
        htToTtc: 'Add tax to price',
        ttcToHt: 'Remove tax from total',
        state: 'State',
        payPeriods: 'Pay periods per year',
        vatRate: 'Tax rate',
        result: config.content.resultLabel,
        taxAmount: 'Tax amount',
        total: 'Total',
        net: 'Net amount',
        gross: 'Gross amount',
        effectiveRate: 'Effective rate',
        marginalRate: 'Marginal rate',
        taxableIncome: 'Taxable income',
        placeholder: 'Enter amount...',
      }
    : {
        amount: 'Montant',
        grossAnnual: 'Salaire brut annuel',
        grossMonthly: 'Salaire brut mensuel',
        profit: 'Bénéfice imposable',
        mode: 'Mode de calcul',
        htToTtc: 'HT → TTC (ajouter TVA)',
        ttcToHt: 'TTC → HT (retirer TVA)',
        state: 'État',
        payPeriods: 'Périodes de paie par an',
        vatRate: 'Taux de TVA',
        result: config.content.resultLabel,
        taxAmount: 'Montant de la taxe',
        total: 'Total TTC',
        net: 'Montant net',
        gross: 'Montant brut',
        effectiveRate: 'Taux effectif',
        marginalRate: 'Taux marginal',
        taxableIncome: 'Revenu imposable',
        placeholder: 'Entrez un montant...',
      };

  const [amount, setAmount] = useState('');
  const [vatMode, setVatMode] = useState<VatMode>('ht-to-ttc');
  const [salesMode, setSalesMode] = useState<SalesMode>('excl-to-incl');
  const [selectedState, setSelectedState] = useState(config.usStates?.[4]?.code ?? 'CA');
  const [payPeriods, setPayPeriods] = useState('12');
  const [stateTaxRate, setStateTaxRate] = useState('5');

  const parsedAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  const parsedPayPeriods = Math.max(1, parseInt(payPeriods, 10) || 12);
  const parsedStateRate = Math.max(0, parseFloat(stateTaxRate) || 0);

  const state = config.usStates?.find((s) => s.code === selectedState);

  const results = useMemo(() => {
    switch (calculatorId) {
      case 'vat':
        return calculateVat(parsedAmount, config.vatRate, vatMode, config.decimalPlaces);
      case 'income':
        return calculateProgressiveIncomeTax(
          parsedAmount,
          config.incomeTaxBrackets,
          config.incomeStandardDeduction ?? 0,
          config.decimalPlaces
        );
      case 'corporate':
        return calculateCorporateTax(parsedAmount, config.corporateTaxRate, config.decimalPlaces);
      case 'paycheck':
        if (config.code === 'us') {
          return calculateUsPaycheck(
            parsedAmount,
            config.incomeTaxBrackets,
            config.incomeStandardDeduction ?? 0,
            parsedStateRate,
            config.socialSecurityRate ?? 6.2,
            config.socialSecurityCap ?? 168600,
            config.medicareRate ?? 1.45,
            config.medicareAdditionalThreshold ?? 200000,
            config.medicareAdditionalRate ?? 0.9,
            parsedPayPeriods,
            config.decimalPlaces
          );
        }
        return calculateWaemuSalary(
          parsedAmount,
          config.incomeTaxBrackets,
          config.socialSecurityRate ?? 5,
          config.decimalPlaces
        );
      case 'sales-tax':
        if (!state) return null;
        return calculateSalesTax(parsedAmount, state, salesMode, config.decimalPlaces);
      default:
        return null;
    }
  }, [
    calculatorId,
    parsedAmount,
    vatMode,
    salesMode,
    state,
    config,
    parsedPayPeriods,
    parsedStateRate,
  ]);

  const vatResult = calculatorId === 'vat' ? (results as import('@/data/tax-calculators/types').VatResult | null) : null;
  const incomeResult = calculatorId === 'income' ? (results as import('@/data/tax-calculators/types').IncomeTaxResult | null) : null;
  const corporateResult = calculatorId === 'corporate' ? (results as import('@/data/tax-calculators/types').CorporateTaxResult | null) : null;
  const paycheckResult = calculatorId === 'paycheck' && results && 'grossPay' in results
    ? (results as import('@/data/tax-calculators/types').PaycheckResult)
    : null;
  const waemuSalaryResult = calculatorId === 'paycheck' && results && 'grossIncome' in results && !('grossPay' in results)
    ? (results as import('@/data/tax-calculators/types').IncomeTaxResult)
    : null;
  const salesResult = calculatorId === 'sales-tax' ? (results as import('@/data/tax-calculators/types').SalesTaxResult | null) : null;

  const fmt = (v: number) => formatTaxAmount(v, config);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input panel */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 lg:p-8 shadow-sm">
        <div className="space-y-6">
          {calculatorId === 'vat' && (
            <>
              <Field label={labels.mode}>
                <div className="grid grid-cols-2 gap-3">
                  <ModeButton active={vatMode === 'ht-to-ttc'} onClick={() => setVatMode('ht-to-ttc')}>
                    {labels.htToTtc}
                  </ModeButton>
                  <ModeButton active={vatMode === 'ttc-to-ht'} onClick={() => setVatMode('ttc-to-ht')}>
                    {labels.ttcToHt}
                  </ModeButton>
                </div>
              </Field>
              <Field label={`${labels.amount} (${config.currencySymbol})`}>
                <BigInput value={amount} onChange={setAmount} placeholder={labels.placeholder} />
              </Field>
              <InfoPill>{labels.vatRate}: {config.vatRate}%</InfoPill>
            </>
          )}

          {calculatorId === 'sales-tax' && state && (
            <>
              <Field label={labels.state}>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-4 text-lg font-medium focus:border-brand-primary focus:outline-none"
                >
                  {config.usStates?.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name} ({s.rate}%)
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={labels.mode}>
                <div className="grid grid-cols-2 gap-3">
                  <ModeButton active={salesMode === 'excl-to-incl'} onClick={() => setSalesMode('excl-to-incl')}>
                    {labels.htToTtc}
                  </ModeButton>
                  <ModeButton active={salesMode === 'incl-to-excl'} onClick={() => setSalesMode('incl-to-excl')}>
                    {labels.ttcToHt}
                  </ModeButton>
                </div>
              </Field>
              <Field label={`${labels.amount} (${config.currencySymbol})`}>
                <BigInput value={amount} onChange={setAmount} placeholder={labels.placeholder} />
              </Field>
            </>
          )}

          {calculatorId === 'income' && (
            <Field label={`${labels.grossAnnual} (${config.currencySymbol})`}>
              <BigInput value={amount} onChange={setAmount} placeholder={labels.placeholder} />
            </Field>
          )}

          {calculatorId === 'corporate' && (
            <Field label={`${labels.profit} (${config.currencySymbol})`}>
              <BigInput value={amount} onChange={setAmount} placeholder={labels.placeholder} />
            </Field>
          )}

          {calculatorId === 'paycheck' && (
            <>
              <Field
                label={`${config.code === 'us' ? labels.grossAnnual : labels.grossMonthly} (${config.currencySymbol})`}
              >
                <BigInput value={amount} onChange={setAmount} placeholder={labels.placeholder} />
              </Field>
              {config.code === 'us' && (
                <>
                  <Field label={`${labels.state} tax rate (%)`}>
                    <BigInput value={stateTaxRate} onChange={setStateTaxRate} placeholder="5" />
                  </Field>
                  <Field label={labels.payPeriods}>
                    <select
                      value={payPeriods}
                      onChange={(e) => setPayPeriods(e.target.value)}
                      className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-4 text-lg font-medium focus:border-brand-primary focus:outline-none"
                    >
                      <option value="12">12 (monthly)</option>
                      <option value="26">26 (bi-weekly)</option>
                      <option value="24">24 (semi-monthly)</option>
                      <option value="52">52 (weekly)</option>
                    </select>
                  </Field>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Results panel */}
      <div className="rounded-3xl bg-gradient-to-br from-brand-primary to-brand-accent p-6 lg:p-8 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-2">
          {labels.result}
        </p>

        {!results || parsedAmount <= 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <div className="text-5xl mb-4">🧮</div>
            <p className="text-white/90 text-lg">
              {isUs ? 'Enter an amount to see your result' : 'Entrez un montant pour voir le résultat'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {vatResult && (
              <>
                <ResultRow label={isUs ? 'Before tax' : 'Montant HT'} value={fmt(vatResult.amountExclTax)} highlight />
                <ResultRow label={labels.taxAmount} value={fmt(vatResult.taxAmount)} />
                <ResultRow label={isUs ? 'After tax' : labels.total} value={fmt(vatResult.amountInclTax)} highlight />
              </>
            )}

            {salesResult && (
              <>
                <ResultRow label="Price before tax" value={fmt(salesResult.priceExclTax)} highlight />
                <ResultRow label={`Sales tax (${salesResult.stateName})`} value={fmt(salesResult.taxAmount)} />
                <ResultRow label="Price with tax" value={fmt(salesResult.priceInclTax)} highlight />
              </>
            )}

            {incomeResult && (
              <>
                <ResultRow label={labels.gross} value={fmt(incomeResult.grossIncome)} />
                <ResultRow label={labels.taxableIncome} value={fmt(incomeResult.taxableIncome)} />
                <ResultRow label={isUs ? 'Federal tax' : 'Impôt (IRPP)'} value={fmt(incomeResult.totalTax)} />
                <ResultRow label={labels.net} value={fmt(incomeResult.netIncome)} highlight />
                <ResultRow label={labels.effectiveRate} value={`${incomeResult.effectiveRate}%`} />
                <ResultRow label={labels.marginalRate} value={`${incomeResult.marginalRate}%`} />
              </>
            )}

            {corporateResult && (
              <>
                <ResultRow label={labels.profit} value={fmt(corporateResult.taxableProfit)} />
                <ResultRow label={`${isUs ? 'Corporate tax' : 'Impôt sociétés'} (${corporateResult.rate}%)`} value={fmt(corporateResult.taxAmount)} />
                <ResultRow label={isUs ? 'After-tax profit' : 'Bénéfice net'} value={fmt(corporateResult.netProfit)} highlight />
              </>
            )}

            {paycheckResult && (
              <>
                <ResultRow label={labels.gross} value={fmt(paycheckResult.grossPay)} />
                <ResultRow label="Federal tax" value={fmt(paycheckResult.federalTax)} />
                <ResultRow label="State tax" value={fmt(paycheckResult.stateTax)} />
                <ResultRow label="Social Security" value={fmt(paycheckResult.socialSecurity)} />
                <ResultRow label="Medicare" value={fmt(paycheckResult.medicare)} />
                <ResultRow label="Annual net pay" value={fmt(paycheckResult.netPay)} highlight />
                <ResultRow label="Per paycheck" value={fmt(paycheckResult.netPay / parsedPayPeriods)} highlight />
              </>
            )}

            {waemuSalaryResult && (
              <>
                <ResultRow label={labels.gross} value={fmt(waemuSalaryResult.grossIncome / 12)} />
                <ResultRow label="Impôt (IRPP)" value={fmt(waemuSalaryResult.totalTax / 12)} />
                <ResultRow label="Salaire net mensuel" value={fmt(waemuSalaryResult.netIncome / 12)} highlight />
                <ResultRow label="Salaire net annuel" value={fmt(waemuSalaryResult.netIncome)} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function BigInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-5 text-2xl font-bold text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
    />
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
        active
          ? 'bg-brand-primary text-white shadow-md'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  );
}

function InfoPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 text-brand-primary dark:text-brand-accent px-4 py-2 text-sm font-medium">
      {children}
    </div>
  );
}

function ResultRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl px-4 py-3 ${
        highlight ? 'bg-white/20 backdrop-blur' : 'bg-white/10'
      }`}
    >
      <span className={`text-sm ${highlight ? 'font-semibold' : 'text-white/80'}`}>{label}</span>
      <span className={`${highlight ? 'text-2xl font-bold' : 'text-lg font-semibold'}`}>{value}</span>
    </div>
  );
}
