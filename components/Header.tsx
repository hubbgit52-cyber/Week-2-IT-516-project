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
        <div>
          <h2>Acme Software Studio</h2>
        </div>
        <div className="header-controls">
          <button
            type="button"
            className="toggle-button"
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
          {authButton}
        </div>
      </div>
      <Nav />
    </header>
  );
}