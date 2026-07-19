import { notFound } from 'next/navigation';
import PartnershipProgramPage from '@/views/partnerships/PartnershipProgramPage';
import { isPartnershipProgramSlug } from '@/data/partnerships/programs';

interface Props {
  program?: string;
}

export default function MarketPartnershipProgramPageServer({ program }: Props) {
  if (!program || !isPartnershipProgramSlug(program)) {
    notFound();
  }

  return <PartnershipProgramPage programSlug={program} />;
}
