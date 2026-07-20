'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { baseApiURL } from '@/lib/app-url';
import { solutions } from '../data/solutions';
import { industryLandings } from '../data/industry-landings';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';
import CountrySwitcher from '@/components/markets/CountrySwitcher';

const usNavigation = [
  {
    name: 'Solutions',
    href: '/solutions',
    submenu: solutions.slice(0, 6).map((s) => ({
      name: s.shortTitle,
      href: `/solutions/${s.slug}`,
    })),
  },
  {
    name: 'Industries',
    href: '/industries',
    submenu: industryLandings.map((l) => ({
      name: l.industryName,
      href: l.path,
    })),
  },
  {
    name: 'Services',
    href: '/development-services',
    submenu: [
      { name: 'All Development Services', href: '/development-services' },
      { name: 'Custom Websites', href: '/custom-website-development' },
      { name: 'Custom Software', href: '/custom-software-development' },
      { name: 'Maintenance Plans', href: '/website-maintenance-services' },
    ],
  },
  {
    name: 'Product',
    href: '/features',
    submenu: [
      { name: 'Features', href: '/features' },
      { name: 'Security', href: '/security' },
      { name: 'Integrations', href: '/integrations' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Free Tax Calculators', href: '/tools' },
    ],
  },
  {
    name: 'Company',
    href: '/about',
    submenu: [
      { name: 'About', href: '/about' },
      { name: 'Partnerships', href: '/partnerships' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDefaultMarket, market } = useMarket();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = useMemo(() => {
    if (!isDefaultMarket && market.navigation.length > 0) {
      return market.navigation.map((item) => ({
        name: item.label,
        href: item.href,
        submenu: item.submenu?.map((sub) => ({
          name: sub.label,
          href: sub.href,
        })),
      }));
    }
    return usNavigation;
  }, [isDefaultMarket, market.navigation]);

  const demoLabel = isDefaultMarket ? 'Book a Demo' : 'Demander une démo';
  const trialLabel = isDefaultMarket ? 'Start Free Trial' : 'Essai gratuit';
  const signInLabel = isDefaultMarket ? 'Sign in' : 'Connexion';

  const NavLink = isDefaultMarket ? Link : LocalizedLink;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm' : 'bg-brand-surface/80 dark:bg-gray-900/80'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <NavLink href="/" className="flex items-center space-x-3" aria-label="ZYVO Home">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-brand-primary flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              ZYVO
              {!isDefaultMarket && (
                <span className="text-sm font-medium text-brand-primary dark:text-brand-accent ml-1.5">
                  {market.flag}
                </span>
              )}
            </span>
          </NavLink>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <NavLink
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent transition-colors font-medium text-sm"
                >
                  <span>{item.name}</span>
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </NavLink>
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                      {item.submenu.map((subItem) => (
                        <NavLink
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-primary-light dark:hover:bg-gray-700 hover:text-brand-primary dark:hover:text-brand-accent transition-colors"
                        >
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <CountrySwitcher />
            <NavLink
              href="/demo"
              className="px-4 py-2 text-brand-primary dark:text-brand-accent text-sm font-medium hover:underline transition-colors"
            >
              {demoLabel}
            </NavLink>
            <a
              href={`${baseApiURL}/auth/login`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-accent text-sm font-medium transition-colors"
            >
              {signInLabel}
            </a>
            <NavLink
              href="/getting-started"
              className="px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors min-h-[40px] flex items-center"
            >
              {trialLabel}
            </NavLink>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <CountrySwitcher />
            <button
              className="text-gray-700 dark:text-gray-300 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-4 max-h-[70vh] overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <NavLink
                    href={item.href}
                    className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-brand-primary font-medium min-h-[44px]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                  {item.submenu && (
                    <div className="pl-6 pb-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <NavLink
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-primary min-h-[44px]"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-6 pt-4 space-y-3">
                <NavLink
                  href="/demo"
                  className="block text-center py-3 border-2 border-brand-primary text-brand-primary font-semibold rounded-lg min-h-[48px] flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {demoLabel}
                </NavLink>
                <NavLink
                  href="/getting-started"
                  className="block text-center py-3 bg-brand-primary text-white font-semibold rounded-lg min-h-[48px] flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {trialLabel}
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
