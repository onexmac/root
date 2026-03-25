/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        corp: {
          bg: 'var(--corp-bg)',
          surface: 'var(--corp-surface)',
          elevated: 'var(--corp-elevated)',
          border: 'var(--corp-border)',
          text: 'var(--corp-text)',
          muted: 'var(--corp-muted)',
          accent: 'var(--corp-accent)',
          success: 'var(--corp-success)',
          warning: 'var(--corp-warning)',
          danger: 'var(--corp-danger)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 0.3s ease-in-out',
        'scan': 'scan 4s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
