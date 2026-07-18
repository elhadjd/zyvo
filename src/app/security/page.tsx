import SecurityPage from '@/views/SecurityPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.security;

export default function Page() {
  return (
    <>
      <SecurityPage />
    </>
  );
}
