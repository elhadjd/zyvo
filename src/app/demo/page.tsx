import DemoPage from '@/views/DemoPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.demo;

export default function Page() {
  return (
    <>
      <DemoPage />
    </>
  );
}
