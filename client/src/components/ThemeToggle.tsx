import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const toggle = () => setDark(!dark);
  const nextThemeLabel = dark ? 'Switch to light mode' : 'Switch to dark mode';
  const currentThemeLabel = dark ? 'Dark mode is enabled' : 'Light mode is enabled';

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={nextThemeLabel}
      aria-pressed={dark}
      title={nextThemeLabel}
    >
      <span className="sr-only">{currentThemeLabel}</span>
      {dark ? (
        // The visible icon is decorative; the button label above carries the
        // accessible action and pressed-state context for assistive tech.
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Keep the moon icon hidden from screen readers so it is not announced
        // as a second, unlabeled graphic inside the toggle button.
        <svg aria-hidden="true" className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
