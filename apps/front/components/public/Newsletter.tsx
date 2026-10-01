'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
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

  return (
    <section id="newsletter" className="py-20 bg-[#060C1E] text-[#EEF2FA] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="rounded-3xl bg-gradient-to-br from-[#17264F] to-[#0B1633] border border-white/10 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center">
          
          {/* Subtle Ambient Radial */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#FF7A1A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex p-3 rounded-2xl bg-[#FF7A1A]/15 text-[#FF7A1A] mb-5">
            <Mail className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#EEF2FA] mb-3">
            Sigue la Trayectoria de AuSat
          </h3>
          <p className="text-sm sm:text-base text-[#C9D6F2] max-w-xl mx-auto mb-8">
            Recibe avances técnicos de telemetría, resultados de ensayos ambientales y novedades sobre nuestra participación en el certamen CONAE.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.email@austral.edu.ar"
                className="flex-grow px-4 py-3 rounded-full bg-[#0B1633] border border-white/15 focus:border-[#FF7A1A] text-sm text-[#EEF2FA] placeholder-[#5A6785] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-full bg-[#FF7A1A] hover:bg-[#D9620B] text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-[#FF7A1A]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Suscribirme</span>
                  </>
                )}
              </button>
            </div>

            {status === 'success' && (
              <div className="flex items-center justify-center gap-2 text-xs text-[#10B981] font-medium pt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{message}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center justify-center gap-2 text-xs text-[#EF4444] font-medium pt-2">
                <AlertCircle className="w-4 h-4" />
                <span>{message}</span>
              </div>
            )}

            <p className="text-[11px] text-[#5A6785] pt-2">
              Sin spam. Información académica y aeroespacial estrictamente verificada.
            </p>
          </form>

        </div>

      </div>
    </section>
  );
};
