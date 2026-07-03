import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Clock, Users } from 'lucide-react';
import { solutions } from '../data/solutions';

const SolutionsSection = () => {
  const categories = [...new Set(solutions.map((s) => s.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const stats = [
    { value: '11+', label: 'Integrated Modules', icon: <CheckCircle className="w-4 h-4" /> },
    { value: '7-day', label: 'Free Trial', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'Cloud', label: 'Based Platform', icon: <Clock className="w-4 h-4" /> },
    { value: 'US', label: 'Based Support', icon: <Users className="w-4 h-4" /> },
  ];

  const filteredSolutions =
    activeCategory === 'All' ? solutions : solutions.filter((s) => s.category === activeCategory);

  return (
    <section id="product" className="py-16 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary-light dark:bg-brand-primary/20 border border-brand-primary/20 dark:border-brand-primary/30 mb-4">
            <span className="text-sm font-medium text-brand-primary dark:text-brand-accent">ALL-IN-ONE PLATFORM</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to run your business
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            11+ integrated solutions that work together seamlessly. No more juggling multiple tools.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'All'
                ? 'bg-brand-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All Solutions
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSolutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.slug}
                className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-brand-primary/40 dark:hover:border-brand-accent/40 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                    <Icon className="w-6 h-6 text-brand-primary dark:text-brand-accent group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                    {solution.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{solution.shortTitle}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{solution.description}</p>
                <Link
                  to={`/solutions/${solution.slug}`}
                  className="inline-flex items-center text-sm font-medium text-brand-primary dark:text-brand-accent hover:text-brand-primary"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center p-4 bg-brand-surface dark:bg-brand-primary/10 rounded-xl border border-brand-primary/20 dark:border-brand-primary/30 gap-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              All solutions work together seamlessly. No integrations needed.
            </span>
            <Link to="/solutions" className="text-brand-primary dark:text-brand-accent text-sm font-medium hover:underline">
              View all solutions →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
