import TermsPage from '@/views/TermsPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.terms;

export default function Page() {
  return (
    <>
      <TermsPage />
    </>
  );
}
