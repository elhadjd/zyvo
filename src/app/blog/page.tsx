import BlogIndexPage from '@/views/BlogIndexPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.blog;

export default function Page() {
  return (
    <>
      <BlogIndexPage />
    </>
  );
}
