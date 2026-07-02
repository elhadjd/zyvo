import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { TRUST_MESSAGE } from '../data/site';
import { industryLandings } from '../data/industry-landings';

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Security', href: '/security' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'FAQ', href: '/faq' },
  ],
  Solutions: [
    { label: 'Point of Sale', href: '/solutions/point-of-sale' },
    { label: 'Queue & SMS', href: '/solutions/customer-queue-management' },
    { label: 'Inventory', href: '/solutions/inventory-management' },
    { label: 'Employees', href: '/solutions/employee-management' },
    { label: 'All Solutions', href: '/solutions' },
  ],
  Industries: industryLandings.map((l) => ({ label: l.industryName, href: l.path })),
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Book a Demo', href: '/demo' },
    { label: 'Blog', href: '/blog' },
  ],
};

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

const contactInfo = [
  { icon: <Mail className="w-4 h-4" />, text: 'commercial@zyvoerp.com', href: 'mailto:commercial@zyvoerp.com' },
  { icon: <Phone className="w-4 h-4" />, text: '+1 (973) 524-9725', href: 'tel:+19735249725' },
  {
    icon: <MapPin className="w-4 h-4" />,
    text: '358 Hutchinson Ave, Columbus, OH',
    href: 'https://www.google.com/maps/place/358+Hutchinson+Ave,+Columbus,+OH+43235',
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold">ZYVO</span>
            </Link>

            <p className="text-gray-400 mb-8 max-w-md">{TRUST_MESSAGE}</p>

            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {info.icon}
                  <span>{info.text}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-base mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ZYVO Technologies, Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {legalLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg hover:bg-brand-primary-hover transition-all z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
