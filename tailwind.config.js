module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      "body": ["Inter", "Inter var"],
      "display": ["etbook"],
      "etbook-display": ["etbook-display"]
    },
    extend: {
      colors: {
        "offwhite": "#fffff8"
      },
    }
  },
  plugins: [],
}
