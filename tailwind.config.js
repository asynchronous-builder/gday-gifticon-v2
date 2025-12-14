/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8b5cf6",
          foreground: "#fff",
        },
        secondary: {
          DEFAULT: "#f472b6",
          foreground: "#fff",
        },
        tertiary: {
          DEFAULT: "#fbbf24",
          foreground: "#1e293b",
        },
        quaternary: {
          DEFAULT: "#34d399",
          foreground: "#1e293b",
        },
        background: "#fffdf5",
        foreground: "#1e293b",
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        card: {
          DEFAULT: "#fff",
          foreground: "#1e293b",
        },
        border: "#e2e8f0",
      },
      fontFamily: {
        heading: ["Outfit"],
        body: ["Plus Jakarta Sans"],
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        full: "9999px",
        DEFAULT: "16px",
      },
      borderWidth: {
        chunky: "2px",
      },
      boxShadow: {
        'hard': '4px 4px 0px #1e293b', // Removed spread
        'hard-hover': '6px 6px 0px #1e293b',
        'hard-active': '2px 2px 0px #1e293b',
        'card': '4px 4px 0px #e2e8f0',
        'card-hover': '6px 6px 0px #e2e8f0',
        'card-pink': '4px 4px 0px #f472b6',
        'card-pink-hover': '6px 6px 0px #f472b6',
        'card-yellow': '4px 4px 0px #fbbf24',
        'card-yellow-hover': '6px 6px 0px #fbbf24',
        'card-mint': '4px 4px 0px #34d399',
        'card-mint-hover': '6px 6px 0px #34d399',
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
