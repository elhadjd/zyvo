import RefundPage from '@/views/RefundPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.refund;

export default function Page() {
  return (
    <>
      <RefundPage />
    </>
  );
}
