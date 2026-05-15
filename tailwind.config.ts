import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ── Brand colors (mirror globals.css tokens) ──────────────────
      colors: {
        primary: {
          DEFAULT: "#1a4f7a",
          dark: "#0e3357",
          light: "#2a6fa8",
        },
        accent: {
          DEFAULT: "#82b440",
          dark: "#6a9434",
          light: "#a0d055",
        },
        surface: {
          light: "#f4f8fc",
          muted: "#eaf0f8",
          dark: "#0e1e30",
        },
      },

      // ── Font families ─────────────────────────────────────────────
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },

      // ── Type scale matching globals.css fluid sizes ───────────────
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.25rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.6rem, 3vw, 2.5rem)", { lineHeight: "1.25" }],
        "heading-xl": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.3" }],
        "heading-lg": ["clamp(1.25rem, 2.5vw, 1.875rem)", { lineHeight: "1.35", fontWeight: "600" }],
        "heading-md": ["clamp(1.1rem, 2vw, 1.375rem)", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["clamp(1rem, 1.5vw, 1.125rem)", { lineHeight: "1.75" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "body-xs": ["0.75rem", { lineHeight: "1.5" }],
        label: ["0.75rem", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "600" }],
      },

      // ── Box shadows ───────────────────────────────────────────────
      boxShadow: {
        sm: "0 1px 3px rgba(26,79,122,0.08)",
        md: "0 4px 16px rgba(26,79,122,0.12)",
        lg: "0 16px 48px rgba(26,79,122,0.16)",
        accent: "0 4px 20px rgba(130,180,64,0.35)",
        card: "0 2px 20px rgba(26,79,122,0.08)",
      },

      // ── Border radius ─────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
      },

      // ── Spacing extensions ────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "128": "32rem",
      },

      // ── Animations ────────────────────────────────────────────────
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },

      // ── Max width ─────────────────────────────────────────────────
      maxWidth: {
        "content": "1280px",
        "readable": "70ch",
      },
    },
  },
  plugins: [],
};

export default config;
