/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-panel": "rgb(var(--bg-panel) / <alpha-value>)",
        "bg-panel-alt": "rgb(var(--bg-panel-alt) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-dim": "rgb(var(--ink-dim) / <alpha-value>)",
        "accent-gold": "rgb(var(--accent-gold) / <alpha-value>)",
        "accent-rose": "rgb(var(--accent-rose) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        border: "rgb(var(--border) / var(--border-alpha))",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: [
          "IBM Plex Sans",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        display: ["48px", { lineHeight: "56px", fontWeight: "600" }],
        h1: ["36px", { lineHeight: "44px", fontWeight: "600" }],
        h2: ["28px", { lineHeight: "36px", fontWeight: "500" }],
        h3: ["22px", { lineHeight: "30px", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        body: ["16px", { lineHeight: "26px", fontWeight: "400" }],
        label: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        caption: ["12px", { lineHeight: "16px", fontWeight: "500" }],
      },
      borderColor: {
        DEFAULT: "rgb(var(--border) / var(--border-alpha))",
      },
    },
  },
  plugins: [],
};
