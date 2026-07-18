import NotFoundPage from '@/views/NotFoundPage';
import { staticPageMetadata } from '@/lib/page-metadata';

export const metadata = staticPageMetadata.notFound;

export default function NotFound() {
  return <NotFoundPage />;
}
