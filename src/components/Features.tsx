import { Link } from 'react-router-dom';
import {
    Brain,
    Lock,
    BarChart3,
    Cloud,
    MessageSquare,
    Share2,
    CheckCircle,
    ArrowRight,
} from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Queue Management & SMS",
            description: "Digital walk-in queues with automatic SMS updates on wait time, service progress, and promotions.",
            details: ["Walk-in queue display", "SMS progress alerts", "Product & promo notifications"]
        },
        {
            icon: <Share2 className="w-8 h-8" />,
            title: "Meta Integrations",
            description: "Full integration with Facebook, Instagram, and WhatsApp Business for messaging and engagement.",
            details: ["Facebook & Instagram DMs", "WhatsApp Business API", "Unified inbox"]
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI-Powered Analytics",
            description: "Advanced machine learning algorithms provide predictive insights and actionable recommendations.",
            details: ["Predictive forecasting", "Anomaly detection", "Automated reporting"]
        },
        {
            icon: <Lock className="w-8 h-8" />,
            title: "Enterprise Security",
            description: "Bank-level encryption and comprehensive compliance with US regulations.",
            details: ['Encrypted communications', 'Role-based access control', 'Daily backups']
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Real-Time Dashboards",
            description: "Monitor all business metrics in real-time with customizable KPI dashboards.",
            details: ["Live data visualization", "Custom widgets", "Export capabilities"]
        },
        {
            icon: <Cloud className="w-8 h-8" />,
            title: "Cloud Infrastructure",
            description: 'Reliable cloud platform designed for everyday business operations.',
            details: ['AWS infrastructure', 'Mobile access', 'No local servers to maintain']
        },
    ];

    return (
        <section id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary-light dark:bg-brand-primary/20 border border-brand-primary/20 dark:border-brand-primary/30 mb-6">
                        <span className="text-sm font-semibold text-brand-primary dark:text-brand-accent">
                            ENTERPRISE FEATURES
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Built for Modern
                        <span className="text-brand-primary dark:text-brand-accent"> Business </span>
                        Operations
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Comprehensive tools designed to streamline operations, enhance productivity,
                        and drive growth for US businesses.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-brand-primary/40 dark:hover:border-brand-accent/40 transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="w-14 h-14 rounded-xl bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center mb-6 group-hover:bg-brand-primary dark:group-hover:bg-brand-primary transition-colors">
                                <div className="text-brand-primary dark:text-brand-accent group-hover:text-white transition-colors">
                                    {feature.icon}
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {feature.description}
                            </p>

                            <ul className="space-y-2">
                                {feature.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <CheckCircle className="w-4 h-4 text-brand-accent mr-2" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-brand-primary to-brand-primary-hover rounded-2xl p-8 lg:p-12 text-white">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-4">
                                Ready to Transform Your Business Operations?
                            </h3>
                            <p className="text-white/80 mb-6">
                                See how ZYVO can simplify your daily operations with a free trial or personalized demo.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    to="/demo"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors min-h-[48px]"
                                >
                                    Book a Demo
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                                <Link
                                    to="/getting-started"
                                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors min-h-[48px]"
                                >
                                    Start Free Trial
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold">Cloud</div>
                                    <div className="text-sm text-white/80">Access anywhere</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">Mobile</div>
                                    <div className="text-sm text-white/80">Works on phones</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">Simple</div>
                                    <div className="text-sm text-white/80">Easy onboarding</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">US</div>
                                    <div className="text-sm text-white/80">Based support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;