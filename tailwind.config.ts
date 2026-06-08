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
        /* ── Starlight-Camp-inspired palette ── */
        "stem-green":  "#5AC87A",
        "stem-blue":   "#4A90D9",
        "stem-orange": "#FF7A3D",
        "stem-yellow": "#FFE566",
        "stem-purple": "#8B6FE8",
        "stem-coral":  "#FF6B6B",
        /* Legacy aliases kept for admin pages */
        stem: {
          green:       "#5AC87A",
          "blue-mid":  "#4A90D9",
          "blue-deep": "#2D4E8A",
          purple:      "#8B6FE8",
        },
        dark:      "#1A1A2E",
        "bg-base": "#FFF9F0",
        "bg-alt":  "#F5F0E8",
        background: "var(--bg-cream)",
        foreground: "var(--text-dark)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Gabarito", "sans-serif"],
        body:    ["var(--font-body)",    "Nunito",   "sans-serif"],
        accent:  ["var(--font-accent)",  "Luckiest Guy", "cursive"],
        mono:    ["monospace"],
      },
      fontSize: {
        "2.5xl": ["1.625rem", { lineHeight: "2.1rem" }],
        "3.5xl": ["2rem", { lineHeight: "2.5rem" }],
        "4.5xl": ["2.5rem", { lineHeight: "3rem" }],
        "5.5xl": ["3.5rem", { lineHeight: "1" }],
        "6.5xl": ["4.25rem", { lineHeight: "1" }],
      },
      borderRadius: {
        "xl":  "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float:   "float 7s ease-in-out infinite",
        wiggle:  "wiggle 3s ease-in-out infinite",
        "bounce-in": "bounceIn 0.6s cubic-bezier(.36,.07,.19,.97) both",
        "slide-up":  "slideUp 0.7s ease both",
        spin:    "spin 18s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%":      { transform: "translateY(-12px) rotate(3deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%":      { transform: "rotate(3deg)" },
        },
        bounceIn: {
          "0%":   { opacity: "0", transform: "scale(0.7)" },
          "60%":  { transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
