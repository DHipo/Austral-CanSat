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
          // Apple Deep Blacks & Dark Void
          black: '#000000',
          'dark-void': '#050711',
          'dark-deep': '#070B18',

          // Dark Navy (Fondo institucional)
          bg: '#0B1633',
          'bg-deep': '#060C1E',
          
          // Navy Superficie (Cards / Panels / Sidebars)
          surface: '#17264F',
          'surface-light': '#1E3268',
          'surface-subtle': 'rgba(23, 38, 79, 0.65)',
          
          // Texto secundario / Divisores Apple
          muted: '#86868B',
          border: 'rgba(255, 255, 255, 0.12)',
          
          // Texto suave / Acentos
          accent: '#C9D6F2',
          
          // Blanco y gris Apple (Tipografía principal)
          text: '#F5F5F7',
          'text-pure': '#FFFFFF',
          'light-surface': '#F5F5F7',
          
          // Naranja aeroespacial (CTAs / Indicadores)
          orange: '#FF7A1A',
          'orange-hover': '#D9620B',
          'orange-glow': 'rgba(255, 122, 26, 0.3)',
          
          // Indicadores de estado de telemetría y subsistemas
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          cyan: '#06B6D4',
        },
      },
      fontFamily: {
        sans: [
          'Poppins',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        heading: [
          'Poppins',
          '-apple-system',
          'BlinkMacSystemFont',
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
        '2xl': '40px',
      },
      boxShadow: {
        'orbit-glow': '0 0 35px -5px rgba(255, 122, 26, 0.35)',
        'orbit-surface': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'orbit-card': '0 4px 24px 0 rgba(11, 22, 51, 0.6)',
      },
    },
  },
  plugins: [],
};

export default config;
