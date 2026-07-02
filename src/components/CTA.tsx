// components/CompanySignupFlow.jsx
import { useState } from 'react';
import { ArrowRight, Shield, Mail, Lock, Check, ChevronRight, Building } from 'lucide-react';
import { baseApiURL, Requests } from '../api';

const CompanySignupFlow = () => {
    const [step, setStep] = useState('email'); // email, details, success
    const [email, setEmail] = useState('');
    const { routePost } = Requests()
    const [link, setLink] = useState('');
    const [companyData, setCompanyData] = useState({
        name: '',
        nif: '' // tax ID (optional)
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateEmail = () => {
        if (!email) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email';
        return '';
    };

    const handleEmailSubmit = async (e) => {
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
            setErrors({ form: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDetailsSubmit = async (e) => {
        e?.preventDefault();

        if (!companyData.name) {
            setErrors({ name: 'Company name is required' });
            return;
        }

        setLoading(true);
        try {
            const data = {
                ...companyData,
                email: email,
                currency: {
                    code: 'USD',
                    currency: 'US Dollar',
                    digits: 2,
                    number: 840
                },
                phone: '999999999',
                type_system: 'online',
                language: 'en',
                country: {
                    id: 230,
                    name: 'United States',
                    code: 'us'
                }
            };

            const response = await routePost('/app/save-company', data);
            if (response?.data?.data?.link) {
                let link = response?.data.data.link;
                setLink(`${link}`)
                window.open(`https://${link}`, '_blank');
                setStep('success');
            }
        } catch (error) {

            let errorMessage = 'Registration failed. Please try again.';

            // Verificar se é um erro de validação do Laravel
            if (error?.response?.data) {
                const responseData = error.response.data;

                // Caso 1: Erro de validação padrão do Laravel
                if (responseData.errors) {
                    // Mapear erros de validação para o formato que você quer
                    const validationErrors = {};
                    Object.keys(responseData.errors).forEach(field => {
                        validationErrors[field] = responseData.errors[field][0];
                    });
                    setErrors(validationErrors);

                    // Pegar primeira mensagem para o erro geral
                    errorMessage = Object.values(responseData.errors)[0]?.[0] || errorMessage;
                }
                // Caso 2: Sua exceção específica com JSON na message
                else if (responseData.message) {
                    try {
                        // Tenta fazer parse da mensagem (se for JSON)
                        const parsedMessage = JSON.parse(responseData.message);

                        // Se parsedMessage for um objeto de erros
                        if (typeof parsedMessage === 'object') {
                            // Mapear para o state de erros
                            Object.keys(parsedMessage).forEach(field => {
                                if (Array.isArray(parsedMessage[field])) {
                                    setErrors(prev => ({
                                        ...prev,
                                        [field]: parsedMessage[field][0]
                                    }));
                                    errorMessage = parsedMessage[field][0];
                                } else if (typeof parsedMessage[field] === 'string') {
                                    setErrors(prev => ({
                                        ...prev,
                                        [field]: parsedMessage[field]
                                    }));
                                    errorMessage = parsedMessage[field];
                                }
                            });
                        } else {
                            errorMessage = parsedMessage;
                        }
                    } catch (e) {
                        // Não é JSON, usar a mensagem como está
                        errorMessage = responseData.message;
                    }
                }
            }
            // Caso 3: Erro de rede ou outro
            else if (error.message) {
                errorMessage = error.message;
            }

            // Definir erro geral do formulário
            setErrors(prev => ({
                ...prev,
                form: errorMessage
            }));

            // Log para debug
            console.log('Erro processado:', errorMessage);

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
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
                            <Building className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Start with ZYVO
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Join 2,500+ US companies using ZYVO
                        </p>
                    </div>

                    {/* Email Step */}
                    {step === 'email' && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
                            <form onSubmit={handleEmailSubmit}>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Work Email
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
                                            placeholder="name@company.com"
                                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            autoFocus
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Checking...
                                        </div>
                                    ) : (
                                        <>
                                            Continue with email
                                            <ChevronRight className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                                    By continuing, you agree to our{' '}
                                    <a href="#" className="text-blue-600 hover:underline">Terms</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
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
                                        Tell us about your company
                                    </h2>
                                    <span className="text-sm text-gray-500">1/2</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    We just need a few details to set up your account.
                                </p>
                            </div>

                            <form onSubmit={handleDetailsSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={companyData.name}
                                            onChange={(e) => {
                                                setCompanyData({ ...companyData, name: e.target.value });
                                                setErrors({});
                                            }}
                                            placeholder="e.g., Acme Corporation"
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            autoFocus
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tax ID (EIN) <span className="text-gray-400 font-normal">(optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={companyData.nif}
                                            onChange={(e) => setCompanyData({ ...companyData, nif: e.target.value })}
                                            placeholder="XX-XXXXXXX"
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            You can add this later. Not required to start your trial.
                                        </p>
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
                                    className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Setting up...
                                        </div>
                                    ) : (
                                        <>
                                            Start 7-day free trial
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep('email')}
                                    className="w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mt-4"
                                >
                                    ← Back
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
                                You're in!
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                We've sent a confirmation email to{' '}
                                <span className="font-medium text-gray-900 dark:text-white">{email}</span>
                            </p>

                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 text-left">
                                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                                    <Shield className="w-4 h-4 mr-2" />
                                    What's next?
                                </h3>
                                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        Check your email to verify your account
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        Complete your company profile (takes 2 minutes)
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        Start exploring ZYVO with full access
                                    </li>
                                </ul>
                            </div>

                            <a
                                target='_blank'
                                href={`https://${link}`}
                                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Go to Dashboard
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </a>

                            <p className="text-xs text-gray-500 mt-4">
                                Didn't receive the email? Check your spam or{' '}
                                <button className="text-blue-600 hover:underline">resend</button>
                            </p>
                        </div>
                    )}

                    {/* Trust Badges */}
                    <div className="mt-8 flex items-center justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                            <Shield className="w-4 h-4 mr-1" />
                            SOC2 Type II
                        </div>
                        <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="flex items-center">
                            <Lock className="w-4 h-4 mr-1" />
                            256-bit encryption
                        </div>
                        <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
                        <div>7-day free trial</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanySignupFlow;