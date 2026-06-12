"use client";

import { useState, useEffect } from 'react';
import Nav from './Nav';

const THEME_KEY = 'project-theme-mode';

function prefersDark() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function Header({ authButton }: { authButton?: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const initialTheme = (stored === 'dark' || stored === 'light') ? stored : (prefersDark() ? 'dark' : 'light');
    setTheme(initialTheme);
    document.body.classList.toggle('dark-mode', initialTheme === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      console.log('toggleTheme clicked —', { prev, next });
      return next;
    });
  };

  return (
    <header className="site-header full-bleed">
      <div className="site-shell-inner">
        <div className="brand">
          <h1>Acme</h1>
        </div>

        <Nav />

        <div className="header-controls">
          <div
            role="button"
            className="toggle"
            data-on={theme === 'dark' ? 'true' : 'false'}
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <div className="knob" />
          </div>
          {authButton}
        </div>
      </div>
    </header>
  );
}