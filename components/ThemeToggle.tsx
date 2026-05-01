"use client";

let themeToggleInitialized = false;
const THEME_KEY = 'project-theme-mode';

function applyTheme(mode: string) {
  if (typeof document === 'undefined') return;
  document.body.classList.toggle('dark-mode', mode === 'dark');
}

function getStoredTheme() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(THEME_KEY);
}

function prefersDark() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function setTheme(mode: string) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(THEME_KEY, mode);
  applyTheme(mode);

  const button = document.getElementById('theme-toggle-button');
  if (button) {
    button.setAttribute('aria-pressed', (mode === 'dark').toString());
    button.textContent = mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
}

function initThemeToggle() {
  if (themeToggleInitialized || typeof window === 'undefined') return;
  themeToggleInitialized = true;

  const preferred = getStoredTheme() || (prefersDark() ? 'dark' : 'light');
  setTheme(preferred);

  setTimeout(() => {
    const button = document.getElementById('theme-toggle-button');
    if (!button) return;

    button.addEventListener('click', () => {
      const nextMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      setTheme(nextMode);
    });
  }, 0);
}

export default function ThemeToggle() {
  if (typeof window !== 'undefined') {
    initThemeToggle();
  }

  return (
    <button id="theme-toggle-button" type="button" className="toggle-button" aria-pressed="false">
      Switch to Dark Mode
    </button>
  );
}
