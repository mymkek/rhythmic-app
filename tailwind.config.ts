import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./src//**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'rose': colors.rose,
        'accent': colors.indigo,
        'amber': colors.amber,
        'slate': colors.slate,
      },
      rotate: {
        '-15': '-15deg',
      }
    },
  },
  plugins: [],
} satisfies Config;
