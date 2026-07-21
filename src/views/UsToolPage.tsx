import { notFound } from 'next/navigation';
import TaxCalculatorPageContent from '@/components/tax-calculators/TaxCalculatorPageContent';
import CodeGeneratorPageContent from '@/components/code-generators/CodeGeneratorPageContent';
import { getTaxConfig, getCalculatorBySlug } from '@/data/tax-calculators/config';
import { getCodeConfig, getCodeGeneratorBySlug } from '@/data/code-generators/config';

interface UsToolPageProps {
  calculatorSlug: string;
}

export default function UsToolPage({ calculatorSlug }: UsToolPageProps) {
  const taxConfig = getTaxConfig('us');
  const codeConfig = getCodeConfig('us');
  const calculator = getCalculatorBySlug('us', calculatorSlug);
  const generator = getCodeGeneratorBySlug('us', calculatorSlug);

  if (calculator) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <TaxCalculatorPageContent
          config={taxConfig}
          calculatorId={calculator.id}
          calculatorTitle={calculator.title}
          calculatorDescription={calculator.shortDescription}
          basePath="/tools"
          hubLabel="← Free Tools"
        />
      </div>
    );
  }

  if (generator) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <CodeGeneratorPageContent
          codeConfig={codeConfig}
          taxConfig={taxConfig}
          generatorId={generator.id}
          generatorTitle={generator.title}
          generatorDescription={generator.shortDescription}
          basePath="/tools"
          hubLabel="← Free Tools"
        />
      </div>
    );
  }

  notFound();
}
