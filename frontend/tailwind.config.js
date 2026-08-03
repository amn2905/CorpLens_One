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
        background: '#F7FAFC',
        secondary: '#EEF6FF',
        card: '#FFFFFF',
        sidebar: '#F4F9FF',
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          light: '#60A5FA',
          soft: '#EEF6FF',
        },
        border: {
          DEFAULT: '#DCE7F5',
          subtle: '#E2E8F0',
        },
        text: {
          main: '#1E293B',
          muted: '#64748B',
          light: '#94A3B8',
        },
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          critical: '#EF4444',
        },
      },
      boxShadow: {
        'clay': '0 6px 18px rgba(120, 160, 210, 0.15)',
        'clay-hover': '0 10px 24px rgba(120, 160, 210, 0.22)',
        'clay-sm': '0 4px 12px rgba(120, 160, 210, 0.10)',
        'clay-inner': 'inset 0 2px 4px rgba(120, 160, 210, 0.08)',
      },
      borderRadius: {
        'card': '20px',
        'button': '14px',
        'input': '14px',
        'table': '16px',
        'panel': '24px',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
