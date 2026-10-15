import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        // Override Tailwind's default `font-serif` stack to use Playfair Display
        // (loaded via globals.css). Italics and weights available: 400/500/600/700.
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;