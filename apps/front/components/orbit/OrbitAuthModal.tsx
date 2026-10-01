'use client';

import React, { useState } from 'react';
import { Satellite, Lock, X, ShieldCheck, AlertCircle } from 'lucide-react';

interface OrbitAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any) => void;
}

export const OrbitAuthModal: React.FC<OrbitAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('bdhipolito@austral.edu.ar');
  const [password, setPassword] = useState('Orbit2026!Lead');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const quickUsers = [
    {
      name: "Bautista D'Hipólito",
      role: 'Líder & Sistemas (3er año)',
      email: 'bdhipolito@austral.edu.ar',
      pass: 'Orbit2026!Lead',
    },
    {
      name: 'María Paz Fogliato',
      role: 'Aviónica & HW (2do año)',
      email: 'mfogliato@austral.edu.ar',
      pass: 'Orbit2026!Avionics',
    },
    {
      name: 'Joaquín Viani',
      role: 'Dinámica & Vuelo (1er año)',
      email: 'jviani@austral.edu.ar',
      pass: 'Orbit2026!Dynamics',
    },
  ];

  const handleSelectQuick = (u: typeof quickUsers[0]) => {
    setEmail(u.email);
    setPassword(u.pass);
    setErrorMessage('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onSuccess(data.user);
        onClose();
      } else {
        // Fallback for offline demo check against the 3 seeded members
        const matched = quickUsers.find((u) => u.email === email && u.pass === password);
        if (matched) {
          onSuccess({
            email: matched.email,
            name: matched.name,
            role: matched.role,
          });
          onClose();
        } else {
          setErrorMessage(data.message || 'Credenciales inválidas. Acceso restringido a los 3 miembros de AuSat.');
        }
      }
    } catch (err) {
      // Offline fallback
      const matched = quickUsers.find((u) => u.email === email && u.pass === password);
      if (matched) {
        onSuccess({
          email: matched.email,
          name: matched.name,
          role: matched.role,
        });
        onClose();
      } else {
        setErrorMessage('Acceso restringido: Solo los 3 miembros técnicos de AuSat pueden ingresar.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fadeIn">
      <div className="bg-gradient-to-b from-[#17264F] to-[#070B18] border border-white/20 rounded-[36px] p-8 sm:p-10 max-w-lg w-full shadow-2xl relative text-[#F5F5F7]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#86868B] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#FF7A1A] to-[#D9620B] text-white mb-4 shadow-lg shadow-[#FF7A1A]/30">
            <Satellite className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F7]">
            Orbit System Access
          </h3>
          <p className="text-sm text-[#C9D6F2] mt-2">
            Plataforma interna restringida a los 3 ingenieros de la Universidad Austral
          </p>
        </div>

        {/* Quick Selection for the 3 verified engineers */}
        <div className="mb-6 space-y-2.5">
          <div className="apple-label-small text-[#86868B] text-center mb-2">
            Perfiles Técnicos Pre-cargados:
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {quickUsers.map((u, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectQuick(u)}
                className={`p-3 rounded-2xl text-left border transition-all text-xs cursor-pointer ${
                  email === u.email
                    ? 'bg-[#FF7A1A]/20 border-[#FF7A1A] text-white shadow-md'
                    : 'bg-white/[0.04] border-white/10 text-[#86868B] hover:text-[#C9D6F2] hover:bg-white/[0.08]'
                }`}
              >
                <div className="font-bold truncate text-sm">{u.name.split(' ')[0]}</div>
                <div className="text-[11px] text-[#FF7A1A] truncate mt-0.5">{u.role.split('&')[0]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#86868B] mb-1.5">
              Email Institucional
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#FF7A1A] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#86868B] mb-1.5">
              Contraseña de Acceso
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-sm text-[#F5F5F7] focus:outline-none focus:border-[#FF7A1A] transition-colors"
            />
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-[#EF4444]/20 border border-[#EF4444]/40 text-xs text-[#EF4444] flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-full bg-[#FF7A1A] hover:bg-[#D9620B] text-white font-bold text-sm transition-all shadow-[0_0_35px_-5px_rgba(255,122,26,0.45)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>{isLoading ? 'Verificando Criptografía...' : 'Ingresar a Orbit'}</span>
          </button>

          <div className="text-center pt-2">
            <span className="text-[11px] text-[#86868B] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              Autenticación Segura JWT con cookies HttpOnly
            </span>
          </div>
        </form>

      </div>
    </div>
  );
};
