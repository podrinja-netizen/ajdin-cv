import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2.5rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        elevated: "hsl(var(--bg-elevated) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        line: "hsl(var(--border) / <alpha-value>)",
        ink: "hsl(var(--text) / <alpha-value>)",
        muted: "hsl(var(--text-muted) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      maxWidth: {
        prose: "68ch",
        shell: "1200px",
      },
      letterSpacing: {
        display: "-0.03em",
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "draw-x": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "draw-x": "draw-x 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee var(--marquee-duration, 44s) linear infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
