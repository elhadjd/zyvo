import ContactPage from '@/views/ContactPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.contact;

export default function Page() {
  return (
    <>
      <ContactPage />
    </>
  );
}
