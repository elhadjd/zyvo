import Breadcrumbs from '../components/Breadcrumbs';
import { COMPANY } from '../data/site';

export default function CookiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />
      <article className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Cookie Policy</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Last updated: January 1, 2026</p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Are Cookies</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. They help us provide a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookies We Use</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential cookies:</strong> Required for the platform to function, including authentication and security.</li>
                <li><strong>Preference cookies:</strong> Remember your settings such as theme (dark/light mode) and language.</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website to improve our services.</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements and measure campaign effectiveness.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Managing Cookies</h2>
              <p>
                You can control cookies through your browser settings. Disabling essential cookies may affect platform functionality. Most browsers allow you to block or delete cookies.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
              <p>Questions about our cookie practices: {COMPANY.email}</p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
