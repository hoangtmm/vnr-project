/** @type {import('tailwindcss').Config} */
export default {
darkMode: 'class',
content: ['./index.html', './src/**/*.{ts,tsx}'],
theme: {
extend: {
colors: {
brand: {
50: '#f5f7ff',
100: '#e8edff',
200: '#cfd9ff',
500: '#3b5bdb',
600: '#364fc7',
900: '#1c2257'
}
},
boxShadow: {
card: '0 6px 24px rgba(0,0,0,0.08)'
},
fontFamily: {
display: ['Inter','ui-sans-serif','system-ui','sans-serif'],
body: ['Noto Sans','ui-sans-serif','system-ui','sans-serif']
}
}
},
plugins: []
}