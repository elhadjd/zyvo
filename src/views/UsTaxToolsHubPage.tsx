import TaxToolsHub from '@/components/tax-calculators/TaxToolsHub';
import { getTaxConfig } from '@/data/tax-calculators/config';

export default function UsTaxToolsHubPage() {
  const config = getTaxConfig('us');

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
      <TaxToolsHub config={config} basePath="/tools" />
    </div>
  );
}
