import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2d3358',
        surface: '#f7f7fd',
        dark: '#111827',
        darkTertiary: '#1d2735',
        border: '#333d4c',
        body: '#cad0d9',
        bodySecondary: '#9ca3af'
      },
      container: {
        center: true,
        padding: '1rem'
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config

