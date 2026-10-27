import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Theme-aware semantic colors (use in components) */
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "accent-gold": "var(--accent-gold)",
        "accent-orange": "var(--accent-orange)",
        "accent-purple": "var(--accent-purple)",
        border: "var(--border)",
        primary: {
          DEFAULT: "#6845D8",
          foreground: "#F5F0E8",
          light: "#7C5BE8",
          dark: "#5131B8",
        },
        accent: {
          DEFAULT: "#C4B5FD",
          foreground: "#171329",
          light: "#DDD4FF",
          dark: "#6D4BD8",
        },
        muted: {
          DEFAULT: "var(--surface-muted)",
          foreground: "var(--text-secondary)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, var(--background-secondary), var(--background))",
        "gradient-gold": "linear-gradient(135deg, #C4B5FD, #9D83EE)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
