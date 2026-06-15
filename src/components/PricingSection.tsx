// components/PricingSection.jsx
import { useState } from 'react';
import { Check, HelpCircle, Users, Shield } from 'lucide-react';

const PricingSection = () => {
    const [annual, setAnnual] = useState(true);

    const plans = [
        {
            name: "Starter",
            description: "Perfect for small businesses just getting started",
            monthlyPrice: 49,
            annualPrice: 39,
            users: "Up to 3 users",
            features: [
                "Point of Sale",
                "Basic Inventory",
                "Invoicing",
                "Basic Reports",
                "Email Support"
            ],
            cta: "Start 7-day trial",
            popular: false
        },
        {
            name: "Growth",
            description: "For growing businesses ready to scale",
            monthlyPrice: 99,
            annualPrice: 79,
            users: "Up to 10 users",
            features: [
                "Everything in Starter",
                "Employee Management",
                "Full Financial Management",
                "Scheduling",
                "Online Store",
                "Priority Support (24h)"
            ],
            cta: "Start 7-day trial",
            popular: true
        },
        {
            name: "Business",
            description: "For established businesses with complex needs",
            monthlyPrice: 199,
            annualPrice: 159,
            users: "Unlimited users",
            features: [
                "Everything in Growth",
                "Logistics & Purchasing",
                "Advanced Marketing",
                "Multi-store support",
                "API Access",
                "Dedicated Account Manager"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                            SIMPLE PRICING
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Transparent plans for every business
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        7-day free trial on all plans. No credit card required.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full p-1 border border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setAnnual(false)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!annual
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setAnnual(true)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center ${annual
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            Annual
                            <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => {
                        const price = annual ? plan.annualPrice : plan.monthlyPrice;
                        const savings = annual ? (plan.monthlyPrice * 12) - (plan.annualPrice * 12) : 0;

                        return (
                            <div
                                key={index}
                                className={`relative bg-white dark:bg-gray-800 rounded-2xl border ${plan.popular
                                    ? 'border-blue-500 shadow-xl scale-105 lg:scale-110'
                                    : 'border-gray-200 dark:border-gray-700 shadow-sm'
                                    } p-8`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                        <div className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                            ${price}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                                            /month
                                        </span>
                                    </div>
                                    {annual && savings > 0 && (
                                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                            Save ${savings} per year
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {plan.users}
                                    </p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.popular
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}>
                                    {plan.cta}
                                </button>

                                {plan.name === 'Business' && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                                        Custom contracts available for larger teams
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Trust Badges */}
                <div className="mt-16">
                    <div className="flex flex-wrap items-center justify-center gap-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <Shield className="w-5 h-5 text-blue-600 mr-2" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">7-day money-back guarantee</span>
                        </div>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="flex items-center">
                            <Check className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">No credit card required</span>
                        </div>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="flex items-center">
                            <Users className="w-5 h-5 text-blue-600 mr-2" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Used by 500+ SMBs</span>
                        </div>
                    </div>
                </div>

                {/* FAQ Link */}
                <div className="mt-8 text-center">
                    <a href="#" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600">
                        <HelpCircle className="w-4 h-4 mr-1" />
                        Have questions? Check our FAQ
                    </a>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;