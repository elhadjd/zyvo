import FreeToolsHub from '@/components/code-generators/FreeToolsHub';
import { getCodeConfig } from '@/data/code-generators/config';
import { getTaxConfig } from '@/data/tax-calculators/config';

export default function UsTaxToolsHubPage() {
  const codeConfig = getCodeConfig('us');
  const taxConfig = getTaxConfig('us');

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
      <FreeToolsHub codeConfig={codeConfig} taxConfig={taxConfig} basePath="/tools" />
    </div>
  );
}
