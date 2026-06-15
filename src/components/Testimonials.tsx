// components/Testimonials.jsx
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            position: "CEO, TechFlow Inc",
            company: "Fortune 500 Company",
            content: "ZYVO transformed our operational efficiency by 45% in the first quarter. The AI insights alone paid for the platform within months.",
            rating: 5,
            results: ["45% efficiency gain", "$2.3M saved annually"]
        },
        {
            name: "Michael Rodriguez",
            position: "Operations Director",
            company: "RetailPro",
            content: "Implementation was seamless and our team adopted it immediately. The real-time dashboards have revolutionized how we make decisions.",
            rating: 5,
            results: ["30% faster decisions", "99.9% uptime"]
        },
        {
            name: "Jessica Williams",
            position: "CFO",
            company: "GrowthCorp",
            content: "The security features gave our board confidence to move forward. Being SOC2 certified was a game-changer for our enterprise contracts.",
            rating: 5,
            results: ["SOC2 compliant", "Zero breaches"]
        }
    ];

    const logos = [
        "TechCorp",
        "InnovateCo",
        "GrowthLabs",
        "FutureSoft",
        "DataStream",
        "CloudNet"
    ];

    return (
        <section id="testimonials" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                            TRUSTED BY LEADERS
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Trusted by Industry
                        <span className="text-blue-600 dark:text-blue-400"> Leaders </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        See how top US companies are transforming their operations with ZYVO.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
                        >
                            {/* Quote Icon */}
                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-700 dark:text-gray-300 mb-8 italic">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold mr-4">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {testimonial.position}
                                    </div>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                                <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                    Key Results:
                                </div>
                                <div className="space-y-2">
                                    {testimonial.results.map((result, idx) => (
                                        <div key={idx} className="flex items-center text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                                            <span className="text-gray-600 dark:text-gray-400">{result}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logos */}
                <div className="mb-20">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Trusted by Industry Leaders
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Join 2,500+ companies that trust ZYVO
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {logos.map((logo, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                            >
                                <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
                                    {logo}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white text-center">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-4xl font-bold mb-2">2,500+</div>
                            <div className="text-blue-100">US Companies</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">99.8%</div>
                            <div className="text-blue-100">Uptime</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">98%</div>
                            <div className="text-blue-100">Satisfaction Rate</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">4.9/5</div>
                            <div className="text-blue-100">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;