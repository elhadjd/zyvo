import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Users } from 'lucide-react';

export default function QueueShowcase() {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/images/salon-queue.png"
              alt="Salon customer queue with SMS notifications on mobile phone"
              className="rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full"
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
              <Users className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">QUEUE MANAGEMENT</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Smart queues with SMS updates for salons & barbershops
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Control walk-in customer queues and keep clients informed automatically. ZYVO sends SMS notifications
              about wait time, service progress, product availability, and promotional actions — so your team can
              focus on delivering great service.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Digital walk-in queue with live wait time estimates',
                'SMS alert when the customer is next in line',
                'Progress updates during the service',
                'Product and promotion notifications via SMS',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/solutions/customer-queue-management"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Queue Management
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
