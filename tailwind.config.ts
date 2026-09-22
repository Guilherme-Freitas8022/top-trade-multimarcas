import type { Config } from "tailwindcss";

// Paleta oficial da marca — ver Branding/manual_identidade.md
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0A0A0A",
          surface: "#161616",
          surface2: "#1F1F1F",
          lime: "#C6FF00",
          "lime-dark": "#9FCC00",
          white: "#F5F5F5",
          muted: "#8C8C8C",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "diagonal-lime":
          "linear-gradient(115deg, transparent 0%, transparent 48%, #C6FF00 48%, #C6FF00 52%, transparent 52%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
