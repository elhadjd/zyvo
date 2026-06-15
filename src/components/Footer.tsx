// components/Footer.jsx
import React from 'react';
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    Phone,
    MapPin,
    ArrowUp
} from 'lucide-react';

const Footer = () => {
    const footerLinks = {
        Product: ['Features', 'Pricing', 'API', 'Documentation', 'Release Notes'],
        Solutions: ['Small Business', 'Enterprise', 'Startups', 'Non-Profit', 'Education'],
        Resources: ['Blog', 'Webinars', 'Help Center', 'Community', 'Partners'],
        Company: ['About', 'Careers', 'Press', 'Contact', 'Legal']
    };

    // const socialLinks = [
    //     { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#' },
    //     { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#' },
    //     { icon: <Facebook className="w-5 h-5" />, label: 'Facebook', href: '#' },
    //     { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: '#' }
    // ];

    const contactInfo = [
        { icon: <Mail className="w-4 h-4" />, text: 'commercial@zyvoerp.com', href: 'mailto:commercial@zyvoerp.com' },
        { icon: <Phone className="w-4 h-4" />, text: '+1 (973) 524-9725', href: 'tel:+9735249725' },
        { icon: <MapPin className="w-4 h-4" />, text: '358 Hutchinson Ave', href: 'https://www.google.com/maps/place/358+Hutchinson+Ave,+Columbus,+OH+43235/@40.1148661,-83.0093547,503m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8838f343a6da252f:0xabd5e13defcd2a09!8m2!3d40.114862!4d-83.0067798!16s%2Fg%2F11c5n9j5pg?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D' }
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 lg:px-8 py-12">
                {/* Main Footer */}
                <div className="grid lg:grid-cols-2 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold">ZYVO</span>
                        </div>

                        <p className="text-gray-400 mb-8 max-w-md">
                            The leading enterprise business management platform for US companies.
                            Streamline operations, enhance productivity, and drive growth.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-4 mb-8">
                            {/* {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))} */}
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            {contactInfo.map((info, index) => (
                                <a
                                    key={index}
                                    href={info.href}
                                    target='_blank'
                                    className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
                                >
                                    {info.icon}
                                    <span>{info.text}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="font-semibold text-lg mb-4">{category}</h4>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} ZYVO Technologies, Inc. All rights reserved.
                    </div>

                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Cookie Policy
                        </a>
                    </div>
                </div>

                {/* Certifications */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                        <span>ISO 27001 Certified</span>
                        <div className="w-px h-4 bg-gray-700"></div>
                        <span>SOC2 Type II</span>
                        <div className="w-px h-4 bg-gray-700"></div>
                        <span>GDPR Compliant</span>
                        <div className="w-px h-4 bg-gray-700"></div>
                        <span>HIPAA Ready</span>
                    </div>
                </div>
            </div>

            {/* Back to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 z-40"
                aria-label="Back to top"
            >
                <ArrowUp className="w-5 h-5" />
            </button>
        </footer>
    );
};

export default Footer;