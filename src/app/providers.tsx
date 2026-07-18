'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/theme-context';

export default function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
