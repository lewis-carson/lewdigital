module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      "body": ["Inter", "Inter var"],
      "display": ["Parabole"],
    },
    extend: {
      colors: {
        "offwhite": "#fffff8"
      },
    }
  },
  plugins: [],
}
