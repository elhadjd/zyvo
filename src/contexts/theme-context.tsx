'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ThemeData {
  isDarkMode: boolean;
  mounted: boolean;
  setIsDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
}

interface ThemeProps {
  children: ReactNode;
}

const Theme = createContext<ThemeData | undefined>(undefined);

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains('dark');
    setIsDarkMode(dark);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(isDarkMode);
  }, [isDarkMode, mounted]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <Theme.Provider value={{ isDarkMode, mounted, setIsDarkMode, toggleDarkMode }}>
      {children}
    </Theme.Provider>
  );
};
