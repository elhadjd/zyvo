import type { MarketCode } from '@/lib/markets/types';
import type { ContactServiceId } from '@/data/contact-offer';
import {
  budgetRanges as usBudgetRanges,
  businessTypes as usBusinessTypes,
  contactServiceOptions as usContactServiceOptions,
  timelineOptions as usTimelineOptions,
  type ContactServiceOption,
} from '@/data/contact-offer';

export const FRANCOPHONE_MARKETS: MarketCode[] = ['gn', 'sn', 'ci'];

export function isFrancophoneMarket(code: MarketCode): boolean {
  return FRANCOPHONE_MARKETS.includes(code);
}

const africanServiceOptions: ContactServiceOption[] = [
  {
    id: 'zyvo-software',
    label: 'Logiciel ZYVO (ERP & caisse POS)',
    shortLabel: 'ZYVO ERP',
    description: 'Caisse POS, stock, facturation TVA, employés et rapports — tout en un.',
    priceHint: 'Essai gratuit 7 jours',
    deliveryHint: 'Démarrage en quelques minutes',
    icon: 'layers',
    href: '/pricing',
  },
  {
    id: 'not-sure',
    label: 'Je ne sais pas encore',
    shortLabel: 'Guidez-moi',
    description: 'Décrivez votre activité — nous vous recommandons la meilleure solution.',
    priceHint: 'Consultation gratuite',
    deliveryHint: 'Réponse sous 24h',
    icon: 'sparkles',
  },
];

const frBusinessTypes = [
  'Boutique / commerce',
  'Restaurant / maquis',
  'Salon / coiffure',
  'Pharmacie',
  'Superette / supermarché',
  'Clinique / santé',
  'Transport / logistique',
  'Services B2B',
  'Autre',
];

export interface ContactFormCopy {
  serviceLegend: string;
  serviceInterest: string;
  selected: string;
  name: string;
  namePlaceholder: string;
  company: string;
  companyPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  businessType: string;
  businessTypePlaceholder: string;
  budget: string;
  budgetPlaceholder: string;
  timeline: string;
  timelinePlaceholder: string;
  message: string;
  messageRequired: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: (serviceLabel: string) => string;
  successNote1: string;
  successNote2: string;
  disclaimer: string;
  optional: string;
  messagePlaceholder: (serviceId: ContactServiceId) => string;
}

const enContactCopy: ContactFormCopy = {
  serviceLegend: 'What can we help you with?',
  serviceInterest: 'Service interest',
  selected: 'Selected:',
  name: 'Your name',
  namePlaceholder: 'Jane Smith',
  company: 'Business name',
  companyPlaceholder: 'Your business',
  email: 'Work email',
  emailPlaceholder: 'you@business.com',
  phone: 'Phone',
  phonePlaceholder: '+1 (555) 000-0000',
  businessType: 'Business type',
  businessTypePlaceholder: 'Select your industry...',
  budget: 'Estimated budget',
  budgetPlaceholder: 'Select a range...',
  timeline: 'Desired timeline',
  timelinePlaceholder: 'When do you need this?',
  message: 'Tell us about your project',
  messageRequired: 'Tell us about your project',
  submit: 'Get my free quote',
  submitting: 'Sending your request...',
  successTitle: "You're on our list!",
  successBody: (label) =>
    `We received your request for ${label}. Expect a personal reply within one business day — often sooner.`,
  successNote1: 'Free scoping call scheduled by email',
  successNote2: 'Fixed-price quote within 24h',
  disclaimer:
    'No spam. No pressure. By submitting, you agree we may contact you about your request. Fixed-price quote delivered within one business day.',
  optional: '(optional)',
  messagePlaceholder: (id) => {
    if (id === 'zyvo-software') return 'What features matter most? POS, inventory, appointments, multi-location...';
    if (id === 'custom-website-development') return 'How many pages? Do you have a logo/brand? Any reference sites you like?';
    if (id === 'custom-software-development') return 'What problem should the system solve? Who will use it? Any integrations needed?';
    if (id === 'website-maintenance-services') return 'What platform is your site on? What do you need help with monthly?';
    return 'Describe your goals — we will recommend the best path forward.';
  },
};

const frContactCopy: ContactFormCopy = {
  serviceLegend: 'Comment pouvons-nous vous aider ?',
  serviceInterest: 'Type de demande',
  selected: 'Sélection :',
  name: 'Votre nom',
  namePlaceholder: 'Amadou Diallo',
  company: 'Nom de l\'entreprise',
  companyPlaceholder: 'Votre commerce ou société',
  email: 'Email professionnel',
  emailPlaceholder: 'vous@entreprise.com',
  phone: 'Téléphone / WhatsApp',
  phonePlaceholder: '+224 620 00 00 00',
  businessType: 'Secteur d\'activité',
  businessTypePlaceholder: 'Choisissez votre secteur...',
  budget: 'Budget estimé',
  budgetPlaceholder: 'Sélectionnez une fourchette...',
  timeline: 'Délai souhaité',
  timelinePlaceholder: 'Quand souhaitez-vous démarrer ?',
  message: 'Décrivez votre besoin',
  messageRequired: 'Décrivez votre besoin',
  submit: 'Envoyer ma demande',
  submitting: 'Envoi en cours...',
  successTitle: 'Demande envoyée !',
  successBody: (label) =>
    `Nous avons bien reçu votre demande concernant ${label}. Notre équipe vous répond sous 24h en français.`,
  successNote1: 'Accompagnement WhatsApp disponible',
  successNote2: 'Essai gratuit de 7 jours sans carte bancaire',
  disclaimer:
    'Pas de spam. En soumettant ce formulaire, vous acceptez d\'être contacté au sujet de votre demande. Réponse sous 24h ouvrées.',
  optional: '(optionnel)',
  messagePlaceholder: (id) => {
    if (id === 'zyvo-software') {
      return 'Quelles fonctionnalités vous intéressent ? Caisse POS, stock, facturation TVA, multi-magasins...';
    }
    return 'Décrivez votre activité, votre ville et ce que vous souhaitez digitaliser.';
  },
};

export interface SignupFormCopy {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailRequired: string;
  emailInvalid: string;
  continueEmail: string;
  checking: string;
  termsPrefix: string;
  termsLink: string;
  and: string;
  privacyLink: string;
  detailsTitle: string;
  detailsSubtitle: string;
  companyName: string;
  companyPlaceholder: string;
  companyRequired: string;
  taxId: string;
  taxIdPlaceholder: string;
  taxIdHint: string;
  optional: string;
  formError: string;
  startTrial: string;
  settingUp: string;
  back: string;
  successTitle: string;
  successBody: string;
  whatsNext: string;
  nextSteps: string[];
  goDashboard: string;
  resend: string;
  encrypted: string;
  freeTrial: string;
  noCard: string;
}

const enSignupCopy: SignupFormCopy = {
  title: 'Start with ZYVO',
  subtitle: '7-day free trial · No credit card required',
  emailLabel: 'Work Email',
  emailPlaceholder: 'name@company.com',
  emailRequired: 'Email is required',
  emailInvalid: 'Please enter a valid email',
  continueEmail: 'Continue with email',
  checking: 'Checking...',
  termsPrefix: 'By continuing, you agree to our',
  termsLink: 'Terms',
  and: 'and',
  privacyLink: 'Privacy Policy',
  detailsTitle: 'Tell us about your company',
  detailsSubtitle: 'We just need a few details to set up your account.',
  companyName: 'Company Name',
  companyPlaceholder: 'e.g., Acme Corporation',
  companyRequired: 'Company name is required',
  taxId: 'Tax ID (EIN)',
  taxIdPlaceholder: 'XX-XXXXXXX',
  taxIdHint: 'You can add this later. Not required to start your trial.',
  optional: '(optional)',
  formError: 'Something went wrong. Please try again.',
  startTrial: 'Start 7-day free trial',
  settingUp: 'Setting up...',
  back: '← Back',
  successTitle: "You're in!",
  successBody: "We've sent a confirmation email to",
  whatsNext: "What's next?",
  nextSteps: [
    'Check your email to verify your account',
    'Complete your company profile (takes 2 minutes)',
    'Start exploring ZYVO with full access',
  ],
  goDashboard: 'Go to Dashboard',
  resend: "Didn't receive the email? Check your spam or",
  encrypted: 'Encrypted data',
  freeTrial: '7-day free trial',
  noCard: 'No credit card',
};

const frSignupCopy: SignupFormCopy = {
  title: 'Commencer avec ZYVO',
  subtitle: 'Essai gratuit 7 jours · Sans carte bancaire internationale',
  emailLabel: 'Email professionnel',
  emailPlaceholder: 'vous@entreprise.com',
  emailRequired: 'L\'email est obligatoire',
  emailInvalid: 'Veuillez entrer un email valide',
  continueEmail: 'Continuer avec l\'email',
  checking: 'Vérification...',
  termsPrefix: 'En continuant, vous acceptez nos',
  termsLink: 'Conditions',
  and: 'et notre',
  privacyLink: 'Politique de confidentialité',
  detailsTitle: 'Parlez-nous de votre entreprise',
  detailsSubtitle: 'Quelques informations pour créer votre compte.',
  companyName: 'Nom de l\'entreprise',
  companyPlaceholder: 'ex. Boutique Madina',
  companyRequired: 'Le nom de l\'entreprise est obligatoire',
  taxId: 'N° fiscal / RCCM',
  taxIdPlaceholder: 'Optionnel',
  taxIdHint: 'Vous pourrez l\'ajouter plus tard. Non requis pour l\'essai.',
  optional: '(optionnel)',
  formError: 'Une erreur est survenue. Veuillez réessayer.',
  startTrial: 'Démarrer l\'essai gratuit 7 jours',
  settingUp: 'Création du compte...',
  back: '← Retour',
  successTitle: 'Compte créé !',
  successBody: 'Un email de confirmation a été envoyé à',
  whatsNext: 'Prochaines étapes',
  nextSteps: [
    'Vérifiez votre email pour activer le compte',
    'Complétez le profil de votre entreprise (2 minutes)',
    'Explorez ZYVO avec un accès complet pendant 7 jours',
  ],
  goDashboard: 'Accéder au tableau de bord',
  resend: 'Email non reçu ? Vérifiez les spams ou',
  encrypted: 'Données chiffrées',
  freeTrial: 'Essai 7 jours',
  noCard: 'Sans carte bancaire',
};

export function getContactFormCopy(marketCode: MarketCode): ContactFormCopy {
  return isFrancophoneMarket(marketCode) ? frContactCopy : enContactCopy;
}

export function getSignupFormCopy(marketCode: MarketCode): SignupFormCopy {
  return isFrancophoneMarket(marketCode) ? frSignupCopy : enSignupCopy;
}

export function getContactServiceOptions(marketCode: MarketCode): ContactServiceOption[] {
  return isFrancophoneMarket(marketCode) ? africanServiceOptions : usContactServiceOptions;
}

export function getContactBusinessTypes(marketCode: MarketCode): string[] {
  return isFrancophoneMarket(marketCode) ? frBusinessTypes : usBusinessTypes;
}

export function getContactBudgetRanges(marketCode: MarketCode): string[] {
  return isFrancophoneMarket(marketCode) ? [] : usBudgetRanges;
}

export function getContactTimelineOptions(marketCode: MarketCode): string[] {
  return isFrancophoneMarket(marketCode) ? [] : usTimelineOptions;
}

export function showContactBudgetFields(marketCode: MarketCode, serviceId: ContactServiceId): boolean {
  if (isFrancophoneMarket(marketCode)) return false;
  return serviceId !== 'zyvo-software';
}
