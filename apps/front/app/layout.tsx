import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AuSat Orbit | CanSat CONAE 2026 - Universidad Austral',
  description:
    'Plataforma aeroespacial institucional y centro de control técnico Orbit para el satélite CanSat de la Universidad Austral en la competencia CONAE 2026.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  keywords: [
    'CanSat',
    'CONAE',
    'Universidad Austral',
    'AuSat',
    'Orbit',
    'Aeroespacial',
    'Telemetría',
    'Satélite',
  ],
  authors: [{ name: 'Equipo AuSat - Universidad Austral' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="bg-black text-[#F5F5F7] min-h-screen selection:bg-[#FF7A1A]/30 selection:text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
