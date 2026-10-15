import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        forum: ["var(--font-forum)", "Forum", "serif"],
        cormorant: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "#faf9f6",
          dark: "#1e1e1e",
          charcoal: "#2a2a2a",
          cream: "#f4f1ea",
          sand: "#e8e4dc",
          accent: "#b39062",
          muted: "#6b6964",
        },
      },
      letterSpacing: {
        widest: ".25em",
        ultra: ".35em",
      },
    },
  },
  plugins: [],
};
export default config;
