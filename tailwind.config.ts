import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapeados para CSS vars em globals.css — respondem ao tema dark/light.
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        "bg-elev2": "var(--bg-elev2)",
        fg: "var(--fg)",
        fg2: "var(--fg2)",
        fg3: "var(--fg3)",
        line: "var(--line)",
        line2: "var(--line2)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
