import GettingStartedPage from '@/views/GettingStartedPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.gettingStarted;

export default function Page() {
  return (
    <>
      <GettingStartedPage />
    </>
  );
}
