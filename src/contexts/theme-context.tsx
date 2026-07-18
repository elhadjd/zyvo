'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ThemeData {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
}

interface ThemeProps {
  children: ReactNode;
}

const Theme = createContext<ThemeData | undefined>(undefined);

function getInitialDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  if (localStorage.theme === 'dark') return true;
  if (localStorage.theme === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  localStorage.theme = dark ? 'dark' : 'light';
}

export const useTheme = () => {
  const context = useContext(Theme);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: ThemeProps) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <Theme.Provider value={{ isDarkMode, setIsDarkMode, toggleDarkMode }}>
      {children}
    </Theme.Provider>
  );
};
