'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Shield, Mail, Check, ChevronRight, Building } from 'lucide-react';
import { submitSignup } from '@/lib/api-client';
import { extractSignupLink, normalizeSignupLink, parseSignupApiError } from '@/lib/api-errors';
import { useMarket } from '@/contexts/market-context';
import LocalizedLink from '@/components/markets/LocalizedLink';
import { getSignupFormCopy } from '@/data/markets/form-locale';

const CompanySignupFlow = () => {
    const { market, marketCode } = useMarket();
    const copy = getSignupFormCopy(marketCode);
    const { signup } = market;
    const [step, setStep] = useState('email'); // email, details, success
    const [email, setEmail] = useState('');
    const [link, setLink] = useState('');
    const [companyData, setCompanyData] = useState({
        name: '',
        nif: '' // tax ID (optional)
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateEmail = () => {
        if (!email) return copy.emailRequired;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return copy.emailInvalid;
        return '';
    };

    const handleEmailSubmit = async (e?: FormEvent) => {
        e?.preventDefault();
        const emailError = validateEmail();
        if (emailError) {
            setErrors({ email: emailError });
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            const userExists = false;

            if (userExists) {
                setStep('login');
            } else {
                setStep('details');
            }
        } catch (error) {
            setErrors({ form: copy.formError });
        } finally {
            setLoading(false);
        }
    };

    const handleDetailsSubmit = async (e?: FormEvent) => {
        e?.preventDefault();

        if (!companyData.name) {
            setErrors({ name: copy.companyRequired });
            return;
        }

        setLoading(true);
        setErrors({});
        try {
            const data = {
                ...companyData,
                email: email,
                currency: signup.currency,
                phone: '999999999',
                type_system: 'online',
                language: signup.language,
                country: signup.country,
                market: marketCode,
            };

            const response = await submitSignup(data);
            const signupLink = extractSignupLink(response);

            if (signupLink) {
                const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.zyvoerp.com';
                const normalizedLink = normalizeSignupLink(signupLink, appBaseUrl);
                setLink(normalizedLink);
                window.open(normalizedLink, '_blank');
                setStep('success');
            } else {
                setErrors({ form: copy.noSignupLink });
            }
        } catch (error: unknown) {
            const parsed = parseSignupApiError(error, marketCode);
            setErrors({
                ...parsed.fieldErrors,
                form: parsed.formMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="getting-started" className="py-20 lg:py-16">
            <div className=" mx-auto px-4 lg:px-8">
                <div className="max-w-md mx-auto">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-primary rounded-xl mb-4">
                            <Building className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {copy.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {copy.subtitle}
                        </p>
                    </div>

                    {/* Email Step */}
                    {step === 'email' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
                            <form onSubmit={handleEmailSubmit}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {copy.emailLabel}
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setErrors({});
                                            }}
                                            placeholder={copy.emailPlaceholder}
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                                            autoFocus
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                                    )}
                                </div>

                                {errors.form && (
                                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                        <p className="text-red-600 dark:text-red-400 text-sm">{errors.form}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            {copy.checking}
                                        </div>
                                    ) : (
                                        <>
                                            {copy.continueEmail}
                                            <ChevronRight className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                                    {copy.termsPrefix}{' '}
                                    <LocalizedLink href="/terms-of-service" className="text-brand-primary hover:underline">{copy.termsLink}</LocalizedLink>
                                    {' '}{copy.and}{' '}
                                    <LocalizedLink href="/privacy-policy" className="text-brand-primary hover:underline">{copy.privacyLink}</LocalizedLink>
                                </p>
                            </form>
                        </div>
                    )}

                    {/* Company Details Step */}
                    {step === 'details' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {copy.detailsTitle}
                                    </h2>
                                    <span className="text-sm text-gray-500">1/2</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {copy.detailsSubtitle}
                                </p>
                            </div>

                            <form onSubmit={handleDetailsSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {copy.companyName}
                                        </label>
                                        <input
                                            type="text"
                                            value={companyData.name}
                                            onChange={(e) => {
                                                setCompanyData({ ...companyData, name: e.target.value });
                                                setErrors({});
                                            }}
                                            placeholder={copy.companyPlaceholder}
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                                            autoFocus
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            {copy.taxId} <span className="text-gray-400 font-normal">{copy.optional}</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={companyData.nif}
                                            onChange={(e) => setCompanyData({ ...companyData, nif: e.target.value })}
                                            placeholder={copy.taxIdPlaceholder}
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {copy.taxIdHint}
                                        </p>
                                        {errors.nif && (
                                            <p className="text-red-500 text-sm mt-2">{errors.nif}</p>
                                        )}
                                    </div>
                                </div>

                                {errors.form && (
                                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                        <p className="text-red-600 dark:text-red-400 text-sm">{errors.form}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            {copy.settingUp}
                                        </div>
                                    ) : (
                                        <>
                                            {copy.startTrial}
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep('email')}
                                    className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mt-4"
                                >
                                    {copy.back}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Success Step */}
                    {step === 'success' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {copy.successTitle}
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {copy.successBody}{' '}
                                <span className="font-medium text-gray-900 dark:text-white">{email}</span>
                            </p>

                            <div className="bg-brand-surface dark:bg-brand-primary/10 rounded-lg p-4 mb-6 text-left">
                                <h3 className="font-medium text-brand-primary dark:text-brand-accent mb-2 flex items-center">
                                    <Shield className="w-4 h-4 mr-2" />
                                    {copy.whatsNext}
                                </h3>
                                <ul className="space-y-2 text-sm text-brand-primary dark:text-brand-accent">
                                    {copy.nextSteps.map((step) => (
                                        <li key={step} className="flex items-start">
                                            <span className="mr-2">•</span>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                target='_blank'
                                href={link}
                                className="w-full flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary-hover transition-colors"
                            >
                                {copy.goDashboard}
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </a>

                            <p className="text-xs text-gray-500 mt-4">
                                {copy.resend}{' '}
                                <button type="button" className="text-brand-primary hover:underline">resend</button>
                            </p>
                        </div>
                    )}

                    {/* Trust Badges */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                            <Shield className="w-4 h-4 mr-1" />
                            {copy.encrypted}
                        </div>
                        <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 hidden sm:block" />
                        <div className="flex items-center">
                            {copy.freeTrial}
                        </div>
                        <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 hidden sm:block" />
                        <div className="flex items-center">
                            {copy.noCard}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanySignupFlow;