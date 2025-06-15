
import type { Config } from "tailwindcss";

export default {
  darkMode: false,
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        border: "#ebd8b7", // premium gold border
        input: "#f9f9f6",
        ring: "#f7c873", // gold ring
        background: "#fffdf5",
        foreground: "#4a3c12",
        primary: {
          DEFAULT: "#f7c873", // premium gold
          foreground: "#fffbe8",
        },
        secondary: {
          DEFAULT: "#e8e1d0",
          foreground: "#7c6145",
        },
        destructive: {
          DEFAULT: "#d64545",
          foreground: "#fff",
        },
        muted: {
          DEFAULT: "#efe2c0",
          foreground: "#8d775f",
        },
        accent: {
          DEFAULT: "#e9cb95",
          foreground: "#684d17",
        },
        popover: {
          DEFAULT: "#fffbef",
          foreground: "#68571a",
        },
        card: {
          DEFAULT: "#f8ede2",
          foreground: "#4a3c12",
        },
        mclaren: {
          papaya: "#ffb347", // "lux" papaya gold
          carbon: "#191308", // deep carbon
          silver: "#f3f0e8", // rich silver
          "papaya-light": "#ffd280",
          "papaya-dark": "#b68631",
          "carbon-light": "#42370e",
          "carbon-dark": "#110c05",
        }
      },
      borderRadius: {
        lg: "1.25rem",
        md: "1rem",
        sm: "0.75rem",
      },
      keyframes: {
        "million-shimmer": {
          "0%": {
            backgroundPosition: "200% center",
          },
          "100%": {
            backgroundPosition: "-200% center",
          },
        },
        "animated-border": {
          "100%": { backgroundPosition: "200% center" }
        }
      },
      animation: {
        "million-shimmer": "million-shimmer 2s linear infinite",
        "animated-border": "animated-border 4s linear infinite"
      },
      backgroundImage: {
        "million-gradient":
          "linear-gradient(120deg, #f7c873 0%, #ffe09c 40%, #fcf6e7 65%, #f7c873 100%)",
        "card-border": 
          "linear-gradient(120deg, #ffe09c, #f7c873, #ffe09c)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
