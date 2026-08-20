import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#eaf6fa",
          100: "#cfeaf2",
          200: "#9dd4e3",
          300: "#66b9cf",
          400: "#3a9cb9",
          500: "#0b6e8f",
          600: "#095b78",
          700: "#0a4a61",
          800: "#0c3c4e",
          900: "#0e3140",
        },
        teal: {
          400: "#3fc4bd",
          500: "#17a6a1",
          600: "#128681",
        },
        sunset: {
          300: "#ffc199",
          400: "#ffae7a",
          500: "#ff7a45",
          600: "#f2602a",
          700: "#d24d1c",
        },
        forest: {
          400: "#5c9c7c",
          500: "#2f6e51",
          600: "#255943",
        },
        sand: {
          50: "#fffaf2",
          100: "#fef3e2",
          200: "#f8e6cb",
        },
        ink: {
          400: "#3d5468",
          500: "#243c50",
          600: "#182e40",
          700: "#122b3d",
          800: "#0c1e2b",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(18,43,61,0.06) 1px, transparent 0)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.9" },
          "70%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        shimmer: "shimmer 2.5s infinite linear",
        marquee: "marquee 28s linear infinite",
      },
      boxShadow: {
        card: "0 8px 30px -8px rgba(18,43,61,0.18)",
        lift: "0 20px 45px -12px rgba(18,43,61,0.28)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
