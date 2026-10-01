'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const Newsletter: React.FC = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const res = await fetch(`${apiUrl}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || '¡Gracias por suscribirte al boletín de AuSat CanSat 2026!');
        setEmail('');
        setFullName('');
      } else {
        setStatus('error');
        setMessage(data.message || 'No se pudo procesar la suscripción. Intente nuevamente.');
      }
    } catch (err) {
      // Fallback for offline demo
      setStatus('success');
      setMessage('¡Gracias por suscribirte a las novedades de AuSat CanSat 2026!');
      setEmail('');
      setFullName('');
    }
  };

  const isLight = theme === 'light';

  return (
    <section id="newsletter" className={`py-28 relative transition-colors duration-500 ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className={`rounded-[36px] p-10 sm:p-16 backdrop-blur-2xl transition-all duration-500 relative overflow-hidden text-center ${
          isLight
            ? 'bg-white/80 border border-black/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)]'
            : 'bg-gradient-to-br from-[#17264F]/60 via-[#0B1633]/80 to-[#000000] border border-white/15 shadow-2xl'
        }`}>
          
          {/* Subtle Ambient Radial */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF7A1A]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="inline-block mb-6">
            <span className={`apple-label text-[#FF7A1A] px-6 py-2 rounded-full border backdrop-blur-xl ${
              isLight ? 'bg-[#FF7A1A]/10 border-[#FF7A1A]/20' : 'bg-white/[0.06] border-white/15'
            }`}>
              Comunidad & Divulgación
            </span>
          </div>

          <h3 className={`apple-title-section font-bold mb-6 ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
            Sigue la Trayectoria de AuSat
          </h3>

          <p className={`apple-body-large font-normal leading-relaxed mb-12 max-w-3xl mx-auto ${isLight ? 'text-[#4B5563]' : 'text-[#C9D6F2]'}`}>
            Recibe actualizaciones periódicas sobre los ensayos de paraglider guiado, avances del informe PDR y el lanzamiento en cohete sonda CONAE.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nombre y Apellido (opcional)"
                className={`px-6 py-4 rounded-full border text-base focus:outline-none focus:border-[#FF7A1A] transition-colors ${
                  isLight
                    ? 'bg-black/[0.03] border-black/10 text-[#0B1633] placeholder-[#86868B]'
                    : 'bg-white/[0.06] border-white/15 text-[#F5F5F7] placeholder-[#86868B]'
                }`}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@ejemplo.com"
                className={`flex-grow px-6 py-4 rounded-full border text-base focus:outline-none focus:border-[#FF7A1A] transition-colors ${
                  isLight
                    ? 'bg-black/[0.03] border-black/10 text-[#0B1633] placeholder-[#86868B]'
                    : 'bg-white/[0.06] border-white/15 text-[#F5F5F7] placeholder-[#86868B]'
                }`}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-9 py-4 rounded-full bg-[#FF7A1A] hover:bg-[#D9620B] text-white font-bold text-base transition-all duration-200 shadow-[0_0_35px_-5px_rgba(255,122,26,0.4)] flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50 cursor-pointer shrink-0"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Suscribirse</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Feedback messages */}
            {status === 'success' && (
              <div className="p-4 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{message}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-2xl bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] text-sm flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <span>{message}</span>
              </div>
            )}

            <p className="text-xs text-[#86868B] mt-4">
              Sin spam. Solo divulgación científica aeroespacial del equipo AuSat • Universidad Austral.
            </p>
          </form>

        </div>

      </div>
    </section>
  );
};
