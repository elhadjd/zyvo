import CookiesPage from '@/views/CookiesPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.cookies;

export default function Page() {
  return (
    <>
      <CookiesPage />
    </>
  );
}
