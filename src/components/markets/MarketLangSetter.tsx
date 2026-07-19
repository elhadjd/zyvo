'use client';

import { useEffect } from 'react';

export default function MarketLangSetter({ language }: { language: string }) {
  useEffect(() => {
    document.documentElement.lang = language;
    return () => {
      document.documentElement.lang = 'en';
    };
  }, [language]);

  return null;
}
