/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        bg: { DEFAULT: token('bg'), 2: token('bg-2'), 3: token('bg-3') },
        line: token('line'),
        accent: { DEFAULT: token('accent'), 2: token('accent-2') },
        warn: token('warn'),
        fg: { DEFAULT: token('fg'), muted: token('fg-muted') },
      },
      borderRadius: {
        lg: '0.375rem',
        md: '0.25rem',
      },
      boxShadow: {
        glow: '0 0 20px rgb(var(--accent) / 0.25)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
