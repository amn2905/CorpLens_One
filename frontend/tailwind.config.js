/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#3B82F6',
          dark: '#1E40AF',
        },
        canvas: '#FFFFFF',
        surface: {
          DEFAULT: '#F8FAFC',
          hover: '#F1F5F9',
          card: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E2E8F0',
          subtle: '#F1F5F9',
        },
        text: {
          main: '#0F172A',
          muted: '#64748B',
        },
        risk: {
          critical: '#DC2626',
          high: '#EA580C',
          medium: '#F59E0B',
          low: '#16A34A',
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      fontFamily: {
        sans: ['Inter', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
