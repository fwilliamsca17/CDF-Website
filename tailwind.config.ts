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
        // Phase 2 — elevated institutional palette ("nocturne")
        ink: {
          DEFAULT: "#0A0F1A",
          900: "#0A0F1A",
          950: "#060A12",
        },
        navy: {
          DEFAULT: "#0B2E47",
          800: "#103A59",
          900: "#0B2E47",
          950: "#08233A",
        },
        champagne: {
          DEFAULT: "#C9A86A",
          200: "#EFE3C8",
          300: "#E6D2A2",
          400: "#D9C28F",
          500: "#C9A86A",
          600: "#B8945A",
        },
        ivory: "#F5F2EA",
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
        "gradient-cdf": "linear-gradient(158deg, #0A0F1A 0%, #08233A 55%, #0B2E47 100%)",
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
        // Transform-only entrance — keeps content opaque on first paint so it
        // never gates LCP, and uses no layout properties so it can't cause CLS.
        rise: {
          "0%": { transform: "translateY(16px)" },
          "100%": { transform: "translateY(0)" },
        },
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.45" },
          "50%": { transform: "translateY(7px)", opacity: "1" },
        },
        "glow-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.85" },
          "50%": { transform: "translate(2%, -2%) scale(1.06)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        rise: "rise 0.7s ease-out both",
        "scroll-cue": "scroll-cue 2.4s ease-in-out infinite",
        "glow-drift": "glow-drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
