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
        'amber': colors.amber,
        'slate': colors.slate,
      },
    },
  },
  plugins: [],
} satisfies Config;
