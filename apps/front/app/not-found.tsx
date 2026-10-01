export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1633] text-[#EEF2FA] px-4 text-center">
      <h2 className="text-6xl font-extrabold text-[#FF7A1A] mb-4">404</h2>
      <p className="text-xl text-[#C9D6F2] mb-8">Página orbital no encontrada</p>
      <a
        href="/"
        className="px-6 py-3 rounded-full bg-[#FF7A1A] text-white font-medium text-sm hover:bg-[#D9620B] transition-colors"
      >
        Volver a AuSat
      </a>
    </div>
  );
}
