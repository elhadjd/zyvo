// components/Hero.jsx
import { ArrowRight, Play, BarChart3, Shield, Zap } from 'lucide-react';

const Hero = () => {
    return (
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900 dark:to-gray-900"></div>

            {/* Geometric Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-8">
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                            Trusted by 2,500+ US Companies
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Enterprise Business
                        <span className="text-blue-600 dark:text-blue-400"> Management </span>
                        Platform
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        ZYVO empowers US businesses with comprehensive operational control,
                        AI-driven insights, and enterprise-grade security in one unified platform.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <a
                            href="#getting-started"
                            className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Start 7-Day Free Trial
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        {/* <a
                            href="#"
                            className="group inline-flex items-center justify-center px-8 py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                        >
                            <Play className="mr-2 w-5 h-5" />
                            Watch Demo (3 min)
                        </a> */}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Real-Time Analytics</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                Monitor performance with live dashboards
                            </p>
                        </div>

                        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Enterprise Security</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                SOC2 Type II & GDPR compliant
                            </p>
                        </div>

                        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Automation</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                Automate workflows with AI assistance
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;