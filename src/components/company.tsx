import { Link } from 'react-router-dom';
import { Target, Users, Shield, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import ContactForm from './ContactForm';
import { COMPANY, TRUST_MESSAGE, VALUE_PROPOSITION } from '../data/site';

const CompanySection = () => {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Customer first',
      description: 'We build features that solve real problems for business owners—not vanity metrics.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Trust & security',
      description: 'Practical security measures including encryption, backups, and role-based permissions.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Built for teams',
      description: 'Whether you have 2 employees or 50, ZYVO scales with clear roles and simple workflows.',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Real support',
      description: 'Talk to real people when you need help—not endless automated loops.',
    },
  ];

  return (
    <section id="company" className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div id="about" className="scroll-mt-20 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              We're on a mission to help businesses grow
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{TRUST_MESSAGE}</p>
            <p className="text-base text-gray-500 dark:text-gray-400">{VALUE_PROPOSITION}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {values.map((value) => (
              <div key={value.title} className="p-6 bg-brand-surface dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent mb-4">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Founded in {COMPANY.founded} · Based in {COMPANY.address.city}, {COMPANY.address.state}
          </p>
        </div>

        <div id="contact" className="scroll-mt-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Get in touch</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Have questions? We're here to help. Reach out and we'll get back to you within one business day.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                    <a href={`mailto:${COMPANY.email}`} className="text-gray-600 dark:text-gray-400 hover:text-brand-primary">
                      {COMPANY.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
                    <a href="tel:+19735249725" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary">
                      {COMPANY.phone}
                    </a>
                    <p className="text-sm text-gray-500">Mon–Fri, 9am–6pm ET</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary-light dark:bg-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Office</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {COMPANY.address.street}<br />
                      {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/demo" className="inline-flex items-center mt-8 text-brand-primary dark:text-brand-accent font-medium hover:underline">
                Or book a free demo <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-brand-surface dark:bg-gray-800 rounded-xl p-6 sm:p-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Start your project</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Websites, custom systems, maintenance, or ZYVO software — get a fixed quote in 24h.
              </p>
              <ContactForm variant="compact" />
              <Link
                to="/contact"
                className="inline-flex items-center mt-4 text-sm text-brand-primary dark:text-brand-accent font-medium hover:underline"
              >
                Open full contact page <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
