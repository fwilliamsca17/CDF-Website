import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CDF Brand Blue
        cdf: {
          DEFAULT: "#1F699E",
          50: "#F0F7FB",
          100: "#E0EDF5",
          200: "#BDD7EA",
          300: "#92BDD9",
          400: "#6BA3C8",
          500: "#4A8DB8",
          600: "#3278A9",
          700: "#1F699E",
          800: "#165280",
          900: "#0F3B5C",
          950: "#0B2E47",
        },
        // Charcoal / Dark
        dark: {
          DEFAULT: "#100F0F",
          50: "#F7F7F6",
          100: "#EDEDEC",
          200: "#DAD9D9",
          300: "#B5B4B4",
          400: "#908F8F",
          500: "#6B6A6A",
          600: "#474646",
          700: "#2D2C2C",
          800: "#1C1B1B",
          900: "#100F0F",
          950: "#080808",
        },
        // Gold accent
        gold: {
          DEFAULT: "#D4A017",
          400: "#E8B926",
          500: "#D4A017",
          600: "#B8860B",
        },
        body: "#2D2C2C",
        light: "#F7F7F6",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        display: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-xl": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-lg": ["2rem", { lineHeight: "1.25" }],
        heading: ["1.5rem", { lineHeight: "1.3" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.4" }],
        label: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.15em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        section: "6rem",
        "section-lg": "8rem",
      },
      backgroundImage: {
        "gradient-cdf": "linear-gradient(135deg, #0B2E47 0%, #1F699E 100%)",
        "gradient-dark": "linear-gradient(180deg, rgba(11,46,71,0.92) 0%, rgba(16,15,15,0.95) 100%)",
        "gradient-gold": "linear-gradient(135deg, #D4A017 0%, #E8B926 100%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
