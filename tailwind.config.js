module.exports = {
  content: ['./src/public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
    },
  },
  variants: {
    extend: {
      // lineClamp: ['responsive', 'hover'],
      // aspectRatio: ['responsive', 'hover'],
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}
