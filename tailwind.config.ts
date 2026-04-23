import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest:       'var(--forest)',
        'forest-mid': 'var(--forest-mid)',
        sage:         'var(--sage)',
        bronze:       'var(--bronze)',
        gold:         'var(--gold)',
        'gold-light': 'var(--gold-light)',
        sand:         'var(--sand)',
        cream:        'var(--cream)',
        'warm-white': 'var(--warm-white)',
        ocean:        'var(--ocean)',
        'text-base':  'var(--text)',
        'text-mid':   'var(--text-mid)',
        'text-light': 'var(--text-light)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 8vw, 7.5rem)', { lineHeight: '0.9', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2.2rem, 4.5vw, 4rem)',  { lineHeight: '1.1' }],
        'display-md': ['clamp(1.8rem, 3vw, 2.8rem)',  { lineHeight: '1.2' }],
        'display-sm': ['clamp(1.4rem, 2.5vw, 2rem)',  { lineHeight: '1.25' }],
        'label':      ['0.625rem',                    { letterSpacing: '0.2em' }],
      },
      spacing: {
        'section': 'clamp(80px, 10vw, 140px)',
        'nav':     'var(--nav-h)',
      },
      animation: {
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
        'fade-up':      'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':      'fadeIn 0.8s ease forwards',
      },
      keyframes: {
        scrollPulse: {
          '0%, 100%': { opacity: '0.7', transform: 'scaleY(1)' },
          '50%':      { opacity: '0.3', transform: 'scaleY(0.5)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'expo':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
