import { notFound } from 'next/navigation';
import TaxCalculatorPageContent from '@/components/tax-calculators/TaxCalculatorPageContent';
import { getTaxConfig, getCalculatorBySlug } from '@/data/tax-calculators/config';

interface UsTaxCalculatorPageProps {
  calculatorSlug: string;
}

export default function UsTaxCalculatorPage({ calculatorSlug }: UsTaxCalculatorPageProps) {
  const config = getTaxConfig('us');
  const calculator = getCalculatorBySlug('us', calculatorSlug);

  if (!calculator) notFound();

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
      <TaxCalculatorPageContent
        config={config}
        calculatorId={calculator.id}
        calculatorTitle={calculator.title}
        calculatorDescription={calculator.shortDescription}
        basePath="/tools"
        hubLabel="← Free Tax Calculators"
      />
    </div>
  );
}
