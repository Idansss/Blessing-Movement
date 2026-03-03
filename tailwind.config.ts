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
          DEFAULT: "#3B214B",
          foreground: "#F5F0E8",
          light: "#5C3473",
          dark: "#241331",
        },
        accent: {
          DEFAULT: "#D4AF37",
          foreground: "#1A1208",
          light: "#E5C65C",
          dark: "#C8860A",
        },
        muted: {
          DEFAULT: "#1C1508",
          foreground: "#A89A84",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-hero":
          "radial-gradient(circle at 15% 0%, rgba(212,175,55,0.35), transparent 55%), radial-gradient(circle at 80% 0%, rgba(232,115,42,0.3), transparent 55%), radial-gradient(circle at 50% 120%, #050302, #0D0A07)",
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #E5C65C 100%)",
        grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
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
