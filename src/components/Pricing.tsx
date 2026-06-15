// components/Pricing.jsx
import React, { useState } from 'react';
import { Check, HelpCircle, CreditCard } from 'lucide-react';

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('annual');

    const plans = [
        {
            name: "Professional",
            price: { monthly: "$89", annual: "$69" },
            period: { monthly: "per month", annual: "per month, billed annually" },
            description: "For growing teams that need advanced features",
            features: [
                "Up to 10 users included",
                "Advanced analytics dashboard",
                "Priority email support",
                "50GB storage",
                "Custom workflows",
                "API access",
                "Basic automation"
            ],
            cta: "Start Free Trial",
            highlight: false
        },
        {
            name: "Business",
            price: { monthly: "$199", annual: "$159" },
            period: { monthly: "per month", annual: "per month, billed annually" },
            description: "For established businesses with complex needs",
            features: [
                "Up to 50 users included",
                "AI-powered analytics",
                "24/7 phone & email support",
                "500GB storage",
                "Advanced automation",
                "Custom integrations",
                "SLA guarantee",
                "Dedicated onboarding"
            ],
            cta: "Get Started",
            highlight: true,
            popular: true
        },
        {
            name: "Enterprise",
            price: { monthly: "Custom", annual: "Custom" },
            period: { monthly: "", annual: "" },
            description: "For large organizations requiring full customization",
            features: [
                "Unlimited users",
                "Enterprise AI features",
                "24/7 dedicated support",
                "Unlimited storage",
                "Custom security protocols",
                "On-premise deployment",
                "Custom development",
                "Training & certification"
            ],
            cta: "Contact Sales",
            highlight: false
        }
    ];

    return (
        <section id="pricing" className="py-20 lg:py-32">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                            TRANSPARENT PRICING
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Simple, Predictable
                        <span className="text-blue-600 dark:text-blue-400"> Pricing </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Choose the perfect plan for your business needs. All plans include a 30-day free trial.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${billingCycle === 'monthly'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            Monthly billing
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${billingCycle === 'annual'
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            Annual billing
                            <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative ${plan.popular ? 'lg:-translate-y-4' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <div className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className={`h-full bg-white dark:bg-gray-800 rounded-xl border-2 ${plan.popular
                                ? 'border-blue-500 shadow-xl'
                                : 'border-gray-200 dark:border-gray-700'
                                } p-8`}
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline mb-2">
                                        <span className="text-5xl font-bold text-gray-900 dark:text-white">
                                            {plan.price[billingCycle]}
                                        </span>
                                        {plan.price[billingCycle] !== "Custom" && (
                                            <span className="text-gray-600 dark:text-gray-400 ml-2">
                                                {plan.period[billingCycle]}
                                            </span>
                                        )}
                                    </div>
                                    {billingCycle === 'annual' && plan.price.annual !== "Custom" && (
                                        <div className="text-sm text-blue-600 dark:text-blue-400">
                                            Save ${(parseInt(plan.price.monthly.replace('$', '')) * 12 - parseInt(plan.price.annual.replace('$', '')) * 12)} annually
                                        </div>
                                    )}
                                </div>

                                <a
                                    href="#"
                                    className={`block w-full py-3.5 px-6 text-center font-semibold rounded-lg mb-8 transition-all ${plan.popular
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {plan.cta}
                                </a>

                                <ul className="space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <Check className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center space-x-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                All plans include
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                30-day free trial • No credit card required • Cancel anytime • 60-day money-back guarantee
                            </p>
                        </div>
                        <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                            <HelpCircle className="w-4 h-4 mr-1" />
                            Learn more
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;