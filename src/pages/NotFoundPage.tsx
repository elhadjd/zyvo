import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." noindex />
      <section className="py-32 bg-white dark:bg-gray-900 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page not found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
