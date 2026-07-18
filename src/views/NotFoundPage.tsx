import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <>
      <section className="py-32 bg-white dark:bg-gray-900 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-bold text-brand-primary dark:text-brand-accent mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Page not found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
