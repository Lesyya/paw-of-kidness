import tailwindAnimatePlugin from 'tailwindcss-animate';

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        garamond: ['EB Garamond'],
      },
      colors: {
        'dark-orange': '#431407',
      },
      backgroundImage: {
        main: `
        linear-gradient(90deg, rgba(38,19,2,0.7) 0%, rgba(91,44,0,0) 100%),
        url('/background.png')
        `,
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindAnimatePlugin],
};

export default config;
