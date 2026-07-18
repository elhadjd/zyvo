import HelpCenterPage from '@/views/HelpCenterPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.helpCenter;

export default function Page() {
  return (
    <>
      <HelpCenterPage />
    </>
  );
}
