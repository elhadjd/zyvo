import FeaturesPage from '@/views/FeaturesPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.features;

export default function Page() {
  return (
    <>
      <FeaturesPage />
    </>
  );
}
