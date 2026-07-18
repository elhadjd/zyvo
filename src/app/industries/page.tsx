import IndustriesIndexPage from '@/views/IndustriesIndexPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.industries;

export default function Page() {
  return (
    <>
      <IndustriesIndexPage />
    </>
  );
}
