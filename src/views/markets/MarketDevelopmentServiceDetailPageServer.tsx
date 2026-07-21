import { notFound } from 'next/navigation';
import DevelopmentServiceDetailPage from '@/views/DevelopmentServiceDetailPage';
import { isDevelopmentServiceSlug } from '@/data/development-services/programs';

interface Props {
  service?: string;
}

export default function MarketDevelopmentServiceDetailPageServer({ service }: Props) {
  if (!service || !isDevelopmentServiceSlug(service)) {
    notFound();
  }

  return <DevelopmentServiceDetailPage slug={service} />;
}
