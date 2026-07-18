import { notFound } from 'next/navigation';
import { getProgrammaticPage } from '@/lib/ai/seo-engine';
import { runMigrations } from '@/lib/ai/db/migrate';
import type { SupportedCountry } from '@/lib/ai/types';
import MarketProgrammaticPage from '@/views/markets/MarketProgrammaticPage';

interface Props {
  countryCode: SupportedCountry;
  industry: string;
}

export default function ProgrammaticPageServer({ countryCode, industry }: Props) {
  runMigrations();
  const page = getProgrammaticPage(countryCode, industry);

  if (!page || page.status !== 'published') {
    notFound();
  }

  return <MarketProgrammaticPage page={page} countryCode={countryCode} />;
}
