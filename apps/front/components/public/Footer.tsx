'use client';

import React from 'react';
import { Satellite, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOrbitClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOrbitClick }) => {
  return (
    <footer className="bg-black text-[#86868B] border-t border-white/10 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          
          {/* Column 1: Brand & Identity */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF7A1A] to-[#D9620B] flex items-center justify-center text-white shadow-md shadow-[#FF7A1A]/30">
                <Satellite className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-[#F5F5F7]">AuSat</span>
              <span className="text-[10px] uppercase font-bold text-[#FF7A1A] px-2 py-0.5 rounded-full bg-[#FF7A1A]/20">
                Orbit
              </span>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Plataforma tecnológica y centro de control para la misión CanSat 2026 desarrollada por estudiantes de la Universidad Austral.
            </p>
          </div>

          {/* Column 2: Misión CanSat */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#F5F5F7] mb-4">
              Misión CanSat
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.argentina.gob.ar/ciencia/conae"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Bases Oficiales CONAE
                  <ExternalLink className="w-3 h-3 text-[#86868B]" />
                </a>
              </li>
              <li>
                <a href="#mision" className="hover:text-white transition-colors">
                  Fases de Vuelo (CONOP)
                </a>
              </li>
              <li>
                <a href="#subsistemas" className="hover:text-white transition-colors">
                  Módulo de Suelta 2m (Huevo)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Universidad Austral */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#F5F5F7] mb-4">
              Universidad Austral
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.austral.edu.ar/ingenieria/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Facultad de Ingeniería
                  <ExternalLink className="w-3 h-3 text-[#86868B]" />
                </a>
              </li>
              <li>
                <a href="#equipo" className="hover:text-white transition-colors">
                  Laboratorio de Aviónica (Pilar)
                </a>
              </li>
              <li>
                <span className="text-[#86868B]">
                  Campus Universitario Pilar, Buenos Aires
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Orbit Private Access */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#F5F5F7] mb-4">
              Gestión Interna
            </h4>
            <p className="text-xs text-[#86868B] mb-4 leading-relaxed">
              Sistema restringido a los 3 miembros técnicos de AuSat.
            </p>
            <button
              onClick={onOrbitClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-[#F5F5F7] border border-white/15 hover:border-white/30 transition-all text-xs font-bold cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A1A]" />
              Entrar a Orbit
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868B]">
          <p>© 2026 AuSat • Equipo Universidad Austral. Certamen CanSat CONAE 2026.</p>
          <div className="flex items-center gap-4">
            <span>Enlace RF LoRa 915 MHz • ENACOM</span>
            <span>•</span>
            <span>Masa Estricta 1000g ± 10g</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
