import SolutionsIndexPage from '@/views/SolutionsIndexPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.solutions;

export default function Page() {
  return (
    <>
      <SolutionsIndexPage />
    </>
  );
}
