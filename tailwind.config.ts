import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#12081D",
          deep: "#0F071A",
          mid: "#1B0F30",
          high: "#2B124F",
        },
        purple: {
          main: "#6E41C8",
          light: "#A675FF",
        },
        gold: {
          DEFAULT: "#FFD76B",
        },
        paper: {
          DEFAULT: "#FFF8EA",
          ink: "#47381D",
        },
        pure: "#FDFCF9",
      },
      fontFamily: {
        display: ["var(--font-great-vibes)", "cursive"],
        serif: ["var(--font-cormorant)", "serif"],
        accent: ["var(--font-cinzel)", "serif"],
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", filter: "brightness(1)" },
          "50%": { transform: "scale(1.015)", filter: "brightness(1.06)" },
        },
        drift: {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(6px, -8px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      animation: {
        breathe: "breathe 4.5s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
