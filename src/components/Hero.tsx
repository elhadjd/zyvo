import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-900" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-8">
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                Trusted by 2,500+ US Companies
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Enterprise Business
              <span className="text-blue-600 dark:text-blue-400"> Management </span>
              Platform
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              ZYVO empowers US businesses with POS, inventory, customer queues with SMS, Meta integrations, and
              AI-driven insights in one unified platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/getting-started"
                className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start 7-Day Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center lg:items-start p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Real-Time Analytics</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center lg:text-left">Live dashboards</p>
              </div>
              <div className="flex flex-col items-center lg:items-start p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Enterprise Security</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center lg:text-left">SOC2 Type II</p>
              </div>
              <div className="flex flex-col items-center lg:items-start p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Meta & SMS Ready</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center lg:text-left">WhatsApp, queues</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/hero-dashboard.png"
              alt="ZYVO business management dashboard showing sales, inventory, and analytics"
              className="rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full"
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
