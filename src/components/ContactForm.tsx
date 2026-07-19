'use client';

import { Suspense, useEffect, useState, type FormEvent } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Globe,
  Layers,
  Loader2,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { submitContact } from '@/lib/api-client';
import { useMarket } from '@/contexts/market-context';
import {
  getContactBudgetRanges,
  getContactBusinessTypes,
  getContactFormCopy,
  getContactServiceOptions,
  getContactTimelineOptions,
  showContactBudgetFields,
} from '@/data/markets/form-locale';
import type { ContactServiceId } from '@/data/contact-offer';

const iconMap = {
  layers: Layers,
  globe: Globe,
  code: Code2,
  wrench: Wrench,
  sparkles: Sparkles,
};

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary dark:focus:border-brand-accent transition-colors min-h-[48px]';

interface ContactFormProps {
  defaultService?: ContactServiceId;
  variant?: 'full' | 'compact';
  className?: string;
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 rounded-xl bg-brand-surface dark:bg-gray-800" />}>
      <ContactFormInner {...props} />
    </Suspense>
  );
}

function ContactFormInner({
  defaultService,
  variant = 'full',
  className = '',
}: ContactFormProps) {
  const { market, marketCode } = useMarket();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const copy = getContactFormCopy(marketCode);
  const contactServiceOptions = getContactServiceOptions(marketCode);
  const businessTypes = getContactBusinessTypes(marketCode);
  const budgetRanges = getContactBudgetRanges(marketCode);
  const timelineOptions = getContactTimelineOptions(marketCode);

  const serviceParam = searchParams.get('service') as ContactServiceId | null;

  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<ContactServiceId>(
    defaultService ?? serviceParam ?? (marketCode !== 'us' ? 'zyvo-software' : 'not-sure')
  );
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const selectedOption = contactServiceOptions.find((s) => s.id === selectedService);

  useEffect(() => {
    if (serviceParam && contactServiceOptions.some((s) => s.id === serviceParam)) {
      setSelectedService(serviceParam);
    }
  }, [serviceParam, contactServiceOptions]);

  const buildMessage = () => {
    const serviceLabel = selectedOption?.label ?? selectedService;
    const lines = [
      `[Contact Request]`,
      `Market: ${market.countryNameLocal} (${marketCode.toUpperCase()})`,
      `Service: ${serviceLabel}`,
      `Company: ${form.company || '—'}`,
      `Business type: ${form.businessType || '—'}`,
    ];
    if (showContactBudgetFields(marketCode, selectedService)) {
      lines.push(`Budget: ${form.budget || '—'}`, `Timeline: ${form.timeline || '—'}`);
    }
    lines.push('', 'Details:', form.message || '—');
    return lines.join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    submitContact({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: buildMessage(),
      country: marketCode,
      source: 'contact_form',
      page: pathname,
    })
      .then((res) => {
        if (res?.success) {
          setSubmitted(true);
          setForm({
            name: '',
            email: '',
            phone: '',
            company: '',
            businessType: '',
            budget: '',
            timeline: '',
            message: '',
          });
        }
      })
      .catch(console.error)
      .finally(() => setProcessing(false));
  };

  if (submitted) {
    return (
      <div className={`rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-8 sm:p-10 text-center ${className}`}>
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{copy.successTitle}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          {copy.successBody(selectedOption?.label ?? selectedService)}
        </p>
        <div className="inline-flex flex-col sm:flex-row gap-3 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
            {copy.successNote1}
          </span>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
          <span className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
            {copy.successNote2}
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {variant === 'full' && (
        <fieldset>
          <legend className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            {copy.serviceLegend} <span className="text-red-500">*</span>
          </legend>
          <div className="grid sm:grid-cols-2 gap-3">
            {contactServiceOptions.map((option) => {
              const Icon = iconMap[option.icon];
              const isSelected = selectedService === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedService(option.id)}
                  className={`relative text-left p-4 rounded-xl border-2 transition-all ${isSelected
                      ? 'border-brand-primary bg-brand-primary-light/50 dark:bg-brand-primary/10 shadow-sm'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-brand-primary/40'
                    }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-brand-primary text-white' : 'bg-brand-surface dark:bg-gray-700 text-brand-primary dark:text-brand-accent'
                        }`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{option.shortLabel}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{option.description}</p>
                      <p className="text-xs font-medium text-brand-primary dark:text-brand-accent mt-1.5">{option.priceHint}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle2
                      className="absolute top-3 right-3 w-5 h-5 text-brand-primary dark:text-brand-accent"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {variant === 'compact' && (
        <div>
          <label htmlFor="contact-service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {copy.serviceInterest}
          </label>
          <select
            id="contact-service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value as ContactServiceId)}
            className={inputClass}
          >
            {contactServiceOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedOption && variant === 'full' && (
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl bg-brand-surface dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm">
          <span className="text-gray-500 dark:text-gray-400">{copy.selected}</span>
          <span className="font-semibold text-gray-900 dark:text-white">{selectedOption.label}</span>
          <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">·</span>
          <span className="text-brand-primary dark:text-brand-accent font-medium">{selectedOption.priceHint}</span>
          <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">·</span>
          <span className="text-gray-600 dark:text-gray-400">{selectedOption.deliveryHint}</span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {copy.name} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder={copy.namePlaceholder}
          />
        </div>
        <div>
          <label htmlFor="contact-company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {copy.company}
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={inputClass}
            placeholder={copy.companyPlaceholder}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {copy.email} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
            placeholder={copy.emailPlaceholder}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {copy.phone}
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
            placeholder={copy.phonePlaceholder}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-business-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {copy.businessType}
        </label>
        <select
          id="contact-business-type"
          value={form.businessType}
          onChange={(e) => setForm({ ...form, businessType: e.target.value })}
          className={inputClass}
        >
          <option value="">{copy.businessTypePlaceholder}</option>
          {businessTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {showContactBudgetFields(marketCode, selectedService) && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {copy.budget}
            </label>
            <select
              id="contact-budget"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className={inputClass}
            >
              <option value="">{copy.budgetPlaceholder}</option>
              {budgetRanges.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="contact-timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {copy.timeline}
            </label>
            <select
              id="contact-timeline"
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className={inputClass}
            >
              <option value="">{copy.timelinePlaceholder}</option>
              {timelineOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {copy.messageRequired} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={variant === 'full' ? 4 : 3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder={copy.messagePlaceholder(selectedService)}
        />
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary-hover transition-all disabled:opacity-60 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 min-h-[52px]"
      >
        {processing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            {copy.submitting}
          </>
        ) : (
          <>
            {copy.submit}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">{copy.disclaimer}</p>
    </form>
  );
}
