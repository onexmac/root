import { create } from 'zustand';

interface ThemeStore {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

function applyThemeClass(theme: 'dark' | 'light') {
  if (typeof document !== 'undefined') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

function getInitialTheme(): 'dark' | 'light' {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('skll-theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  }
  // Detect system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
}

const initialTheme = getInitialTheme();
applyThemeClass(initialTheme);

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: initialTheme,
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      applyThemeClass(next);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('skll-theme', next);
      }
      return { theme: next };
    }),
}));
