/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF642F',
        'secondary': '#FFD7C9',
        'alice-blue': '#e3f1ff',
        'text-gray': '#7f7f7f',
        'white-gray': '#e8e8e8',
        'white-cream': '#f9f9f9',
      },
      fontFamily: {
        'logo': ['Sora', 'ui-sans-serif', 'system-ui'],
        'heading': ['Fira Sans', 'ui-sans-serif', 'system-ui'],
        'content': ['Quicksand', 'ui-sans-serif', 'system-ui'],
        'quicksand': ['Quicksand', 'ui-sans-serif', 'system-ui'],
        'dancing': ['Dancing Script', 'ui-sans-serif', 'system-ui'],
      },

      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'soft': '0px 2px 8px 0px rgba(99, 99, 99, 0.2)'
      },
      backgroundImage: {
        'theme-signup': "url('./src/assets/image/top-view-meat-soup-with-greens-tomato-dark-meat-color-gray-sauce-meal-hot-food-potato-photo-dinner-dish.jpg')",
        'theme-signin': "url('./src/assets/image/bigstock-Vietnamese-Dishes-Set-191527378.jpg')",
        'theme-repeat': "url('https://static.vecteezy.com/system/resources/previews/009/344/913/original/food-seamless-pattern-cuisine-fast-food-wallpaper-with-gastronomy-icons-brown-pastelle-sepia-color-texture-decorative-textile-wrapping-paper-design-bright-background-for-menu-receipts-vector.jpg')",
        'image-banner': "url('./src/assets/image/banner.jpg')"
      }
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.page-container': {
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
        },
        '.page-content': {
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
        },
      })
    }),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/line-clamp')
  ],
})
