import { Link } from 'react-router-dom';
import {
    Brain,
    Lock,
    BarChart3,
    Cloud,
    Users,
    Workflow,
    CheckCircle,
    ArrowRight,
    Shield
} from 'lucide-react';

const Features = () => {
    const features = [
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
            details: ["SOC2 Type II certified", "GDPR compliant", "Role-based access control"]
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
            description: "Scalable, reliable cloud platform with 99.9% uptime guarantee.",
            details: ["AWS infrastructure", "Auto-scaling", "Global CDN"]
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Team Collaboration",
            description: "Seamless collaboration tools built for distributed teams.",
            details: ["Real-time editing", "Comment threads", "Task assignments"]
        },
        {
            icon: <Workflow className="w-8 h-8" />,
            title: "Workflow Automation",
            description: "Automate repetitive processes with drag-and-drop workflow builder.",
            details: ["Visual builder", "API integrations", "Conditional logic"]
        }
    ];

    return (
        <section id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                            ENTERPRISE FEATURES
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Built for Modern
                        <span className="text-blue-600 dark:text-blue-400"> Business </span>
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
                            className="group bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 transition-colors">
                                <div className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors">
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
                                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-4">
                                Ready to Transform Your Business Operations?
                            </h3>
                            <p className="text-blue-100 mb-6">
                                Join thousands of US companies that trust ZYVO for their critical business operations.
                            </p>
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Schedule a Demo
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                                <Link
                                    to="/blog"
                                    className="text-white hover:text-blue-100 font-medium"
                                >
                                    View case studies →
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-blue-100">Security First</div>
                                    <div className="text-2xl font-bold">99.9% Uptime</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">45%</div>
                                    <div className="text-sm text-blue-100">Efficiency Gain</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">24/7</div>
                                    <div className="text-sm text-blue-100">Support</div>
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