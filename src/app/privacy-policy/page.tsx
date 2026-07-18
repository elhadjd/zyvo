import PrivacyPage from '@/views/PrivacyPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.privacy;

export default function Page() {
  return (
    <>
      <PrivacyPage />
    </>
  );
}
