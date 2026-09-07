/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7EF",
        ink: "#20242B",
        "ink-soft": "#4B5160",
        teal: {
          DEFAULT: "#0F6B5C",
          dark: "#0B4F44",
          light: "#E4F1EE",
        },
        ochre: {
          DEFAULT: "#C98A2C",
          light: "#F7E9D2",
        },
        line: "#E4DFD2",
      },
      fontFamily: {
        serif: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(32,36,43,0.04), 0 8px 24px -12px rgba(32,36,43,0.18)",
      },
    },
  },
  plugins: [],
};
