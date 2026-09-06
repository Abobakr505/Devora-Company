/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050D0B",
          900: "#081411",
          850: "#0B1815",
          800: "#0F1F1B",
          700: "#152B25",
          600: "#1D3A32",
        },
        mist: {
          100: "#EEF5F2",
          300: "#C4D6CE",
          500: "#7F9C92",
          700: "#4C625B",
        },
        emerald: {
          400: "#3FE6B0",
          500: "#1FCE9B",
          600: "#12A87E",
          700: "#0C7F62",
          900: "#083F31",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        "display-ar": ["thmanyah", "sans-serif"],
        "body-ar": ["thmanyahsans", "sans-serif"],
      },
      fontSize: {
        "hero-sm": ["3rem", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "hero-lg": ["7.5rem", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "noise": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
            keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
};