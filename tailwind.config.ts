import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        'yoshida': ["Yoshida Bold", "sans-serif"],
        'yoshidaR': ["Yoshida Regular", "sans-serif"],
        'giest': ["giest", "sans-serif"],
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
} satisfies Config;
