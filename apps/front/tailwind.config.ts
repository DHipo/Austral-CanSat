import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orbit: {
          // Dark Navy (Fondo principal)
          bg: '#0B1633',
          'bg-deep': '#060C1E',
          
          // Navy Superficie (Cards / Panels / Sidebars)
          surface: '#17264F',
          'surface-light': '#1E3268',
          'surface-subtle': 'rgba(23, 38, 79, 0.65)',
          
          // Texto secundario / Divisores
          muted: '#5A6785',
          border: 'rgba(90, 103, 133, 0.25)',
          
          // Texto suave / Acentos
          accent: '#C9D6F2',
          
          // Blanco roto (Tipografía principal)
          text: '#EEF2FA',
          
          // Naranja aeroespacial (CTAs / Indicadores)
          orange: '#FF7A1A',
          'orange-hover': '#D9620B',
          'orange-glow': 'rgba(255, 122, 26, 0.25)',
          
          // Indicadores de estado de telemetría y subsistemas
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          cyan: '#06B6D4',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Inter',
          'sans-serif',
        ],
        heading: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'JetBrains Mono',
          'ui-monospace',
          'Menlo',
          'monospace',
        ],
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        xl: '24px',
      },
      boxShadow: {
        'orbit-glow': '0 0 25px -5px rgba(255, 122, 26, 0.3)',
        'orbit-surface': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'orbit-card': '0 4px 20px 0 rgba(11, 22, 51, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
