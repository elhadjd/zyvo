// components/CompanySection.jsx
import React, { useState, type FormEvent } from 'react';
import {
    Target,
    Users,
    Globe,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Linkedin,
    Github,
    Shield
} from 'lucide-react';
import { BsTwitter } from 'react-icons/bs';
import { apiKey, Requests } from '../api';

const CompanySection = () => {
    const [processingFormContact, setProcessingFormContact] = useState(false)
    const [contactFormData, setContactFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const { routePost } = Requests()


    const values = [
        {
            icon: <Target className="w-6 h-6" />,
            title: "Customer First",
            description: "We succeed only when our customers succeed. Every decision starts with you."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Trust & Security",
            description: "Your data's security is our top priority. Built on a foundation of trust."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Diversity & Inclusion",
            description: "Different perspectives make us stronger. 45% of our team identify as underrepresented."
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "Global Impact",
            description: "Serving companies across 15 countries, with teams in 3 continents."
        }
    ];

    const milestones = [
        { year: "2020", event: "Company founded in San Francisco" },
        { year: "2021", event: "Launched first product, 100 customers" },
        { year: "2022", event: "Series A funding, $10M raised" },
        { year: "2023", event: "2,500+ customers, 45 employees" },
        { year: "2024", event: "Expanded to Europe & Asia" }
    ];

    const SubmitContact = ((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setProcessingFormContact(true)
        routePost('site/contacts/submit', { ...contactFormData, key: apiKey })
            .then((response) => {
                if (response.data?.success) {
                    setContactFormData({ ...contactFormData, email: '', message: '', name: '', phone: '' })
                }
            }).catch((error) => {
                console.log(error.response);
            }).finally(() => setProcessingFormContact(false))
    })

    return (
        <section id="company" className="py-20 lg:py-32 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 lg:px-8">
                {/* About Section */}
                <div id="about" className="scroll-mt-20 mb-24">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            We're on a mission to help businesses grow
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            ZYVO was founded in 2020 to bring enterprise-grade tools to businesses of all sizes.
                            Today, we're trusted by 2,500+ companies across the US.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">2,500+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Companies</div>
                        </div>
                        <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">45+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Team members</div>
                        </div>
                        <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">15+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                        </div>
                        <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">$10M</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Funding</div>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                            Our values
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                                        {value.icon}
                                    </div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div id="contact" className="scroll-mt-20">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Get in touch
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Have questions? We're here to help. Reach out and we'll get back to you within 24 hours.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                                        <a href="mailto:commercial@zyvoerp.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                                            commercial@zyvoerp.com
                                        </a>
                                        <p className="text-sm text-gray-500">For sales inquiries</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
                                        <a href="tel:+19735249725" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                                            +1 9735249725
                                        </a>
                                        <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm PT</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">Office</h4>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            358 hutchinson Ave<br />
                                            Columbus, OH 43235<br />
                                            United States
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            {/* <div className="mt-8 flex space-x-4">
                                <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors">
                                    <BsTwitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                            </div> */}
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Send us a message
                            </h4>

                            <form className="space-y-4" onSubmit={SubmitContact}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder='Your Name'
                                        onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                                        value={contactFormData.name}
                                        name='name'
                                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        onChange={(e) => setContactFormData({ ...contactFormData, phone: e.target.value })}
                                        value={contactFormData.phone}
                                        name='phone'
                                        placeholder='Your Phone number'
                                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name='email'
                                        value={contactFormData.email || ''}
                                        onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                                        placeholder='Your Email'
                                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                                        value={contactFormData.message}
                                        placeholder='Message'
                                        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                    {
                                        processingFormContact ?
                                            <>
                                                Sending...
                                            </>
                                            : <>Send message
                                                < ArrowRight className="ml-2 w-4 h-4" /></>
                                    }
                                </button>
                            </form>

                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                                We typically reply within 24 hours
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanySection;