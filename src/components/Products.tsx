// components/SolutionsSection.jsx
import React, { useState } from 'react';
import {
    ShoppingCart, // Point of Sale
    Package, // Inventory Management
    Users, // Employee Management
    Truck, // Logistics
    Calendar, // Scheduling
    BarChart3, // Marketing Analytics
    Globe, // Online Store
    CreditCard, // Financial Management
    FileText, // Invoicing
    ShoppingBag, // Purchasing
    ArrowRight,
    CheckCircle,
    TrendingUp,
    Clock
} from 'lucide-react';

const SolutionsSection = () => {
    const solutions = [
        {
            icon: <ShoppingCart className="w-6 h-6" />,
            title: "Point of Sale",
            description: "Streamline sales, customer management, and product tracking in one intuitive system.",
            category: "Retail"
        },
        {
            icon: <Package className="w-6 h-6" />,
            title: "Inventory Management",
            description: "Real-time inventory tracking with automated reorder alerts and stock optimization.",
            category: "Operations"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Employee Management",
            description: "Simplify scheduling, time tracking, and team communication in one place.",
            category: "HR"
        },
        {
            icon: <Truck className="w-6 h-6" />,
            title: "Logistics",
            description: "Optimize delivery routes, track shipments, and manage your supply chain.",
            category: "Operations"
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            title: "Scheduling",
            description: "Smart calendar management for appointments, tasks, and team resources.",
            category: "Productivity"
        },
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: "Marketing Analytics",
            description: "Track campaign performance, customer insights, and ROI in real-time.",
            category: "Marketing"
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Online Store",
            description: "Launch and manage your e-commerce store with seamless inventory sync.",
            category: "E-commerce"
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            title: "Financial Management",
            description: "Complete financial oversight with automated bookkeeping and reporting.",
            category: "Finance"
        },
        {
            icon: <FileText className="w-6 h-6" />,
            title: "Invoicing",
            description: "Create, send, and track invoices with automatic payment reminders.",
            category: "Finance"
        },
        {
            icon: <ShoppingBag className="w-6 h-6" />,
            title: "Purchasing",
            description: "Streamline procurement with vendor management and purchase orders.",
            category: "Operations"
        }
    ];

    const categories = [...new Set(solutions.map(s => s.category))];
    const [activeCategory, setActiveCategory] = useState('All');

    const stats = [
        { value: "10+", label: "Integrated Solutions", icon: <CheckCircle className="w-4 h-4" /> },
        { value: "500+", label: "SMBs Trust Us", icon: <TrendingUp className="w-4 h-4" /> },
        { value: "99.9%", label: "Uptime SLA", icon: <Clock className="w-4 h-4" /> },
        { value: "24/7", label: "US-Based Support", icon: <Users className="w-4 h-4" /> }
    ];

    const filteredSolutions = activeCategory === 'All'
        ? solutions
        : solutions.filter(s => s.category === activeCategory);

    return (
        <section id="product" className="py-16 lg:py-32 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                            ALL-IN-ONE PLATFORM
                        </span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Everything you need to run your business
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        10+ integrated solutions that work together seamlessly. No more juggling multiple tools.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="flex items-center justify-center mb-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'All'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                    >
                        All Solutions
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Solutions Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSolutions.map((solution, index) => (
                        <div
                            key={index}
                            className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                    <div className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors">
                                        {solution.icon}
                                    </div>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                                    {solution.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {solution.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                {solution.description}
                            </p>
                            <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700">
                                Learn more
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <span className="text-sm text-gray-700 dark:text-gray-300 mr-4">
                            All solutions work together seamlessly. No integrations needed.
                        </span>
                        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                            See how it works →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionsSection;