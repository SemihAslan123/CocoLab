/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}"
    ],
    theme: {
        extend: {
          fontFamily: {
            orbitron: ['Orbitron', 'sans-serif'],
            grotesk: ['Space Grotesk', 'sans-serif'],
          },
          colors: {
            cyan: {
              400: '#00ffff',
            },
          },
        },
      },
    plugins: [],
  }

  