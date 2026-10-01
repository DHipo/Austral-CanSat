'use client';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1633] text-[#EEF2FA] px-4 text-center">
      <h2 className="text-4xl font-extrabold text-[#FF7A1A] mb-4">Error de Telemetría</h2>
      <p className="text-sm text-[#C9D6F2] mb-8 max-w-md">
        Se produjo una anomalía inesperada en el enlace de la aplicación.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-full bg-[#17264F] border border-white/10 text-white font-medium text-sm hover:bg-[#1E3268] transition-colors"
      >
        Reintentar sincronización
      </button>
    </div>
  );
}
