import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#000000',
          secondary: '#080808',
          surface: '#111111',
        },
        border: {
          DEFAULT: '#1E1E1E',
          subtle: '#141414',
          solid: '#333333',
        },
        text: {
          primary: '#EAEAEA',
          secondary: '#888888',
          muted: '#505050',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', '-apple-system', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0em',
        wide: '0.04em',
        widest: '0.12em',
        ultra: '0.25em',
      },
    },
  },
  plugins: [],
} satisfies Config;
