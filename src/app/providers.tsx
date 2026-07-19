'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/theme-context';
import { MarketProvider } from '@/contexts/market-context';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MarketProvider>{children}</MarketProvider>
    </ThemeProvider>
  );
}
