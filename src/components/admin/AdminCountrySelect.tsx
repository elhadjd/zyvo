'use client';

import {
  ALL_AI_COUNTRY_OPTIONS,
  SITE_AI_COUNTRY_OPTIONS,
} from '@/lib/ai/country-labels';

interface Props {
  value: string;
  onChange: (value: string) => void;
  scope?: 'site' | 'all';
  className?: string;
  id?: string;
}

export default function AdminCountrySelect({
  value,
  onChange,
  scope = 'site',
  className = 'px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700',
  id,
}: Props) {
  const options = scope === 'all' ? ALL_AI_COUNTRY_OPTIONS : SITE_AI_COUNTRY_OPTIONS;

  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={className}>
      {options.map((opt) => (
        <option key={opt.code} value={opt.code}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
