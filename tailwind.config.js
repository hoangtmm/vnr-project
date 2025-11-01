export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6f8ff',
          100: '#e9edff',
          200: '#cfd9ff',
          500: '#3b5bdb',
          600: '#364fc7',
          700: '#2d3ea5',
          900: '#171a3a',
        },
      },
      boxShadow: {
        card: '0 10px 35px rgba(0,0,0,0.10)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Noto Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
