'use client';

import React from 'react';
import { Satellite, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOrbitClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOrbitClick }) => {
  return (
    <footer className="bg-[#0B1633] text-[#5A6785] border-t border-white/10 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Identity */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF7A1A] flex items-center justify-center text-white">
                <Satellite className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-[#EEF2FA]">AuSat</span>
              <span className="text-[10px] uppercase font-semibold text-[#FF7A1A]">Orbit</span>
            </div>
            <p className="text-xs text-[#C9D6F2] leading-relaxed">
              Plataforma tecnológica y centro de control para la misión CanSat 2026 desarrollada en la Universidad Austral.
            </p>
          </div>

          {/* Column 2: Misión CanSat */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#EEF2FA] mb-3">
              Misión CanSat
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.argentina.gob.ar/ciencia/conae"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Bases Oficiales CONAE
                  <ExternalLink className="w-3 h-3 text-[#5A6785]" />
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
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#EEF2FA] mb-3">
              Universidad Austral
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.austral.edu.ar/ingenieria/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Facultad de Ingeniería
                  <ExternalLink className="w-3 h-3 text-[#5A6785]" />
                </a>
              </li>
              <li>
                <a href="#equipo" className="hover:text-white transition-colors">
                  Laboratorio de Aviónica (Pilar)
                </a>
              </li>
              <li>
                <span className="text-[#C9D6F2]">
                  Campus Universitario Pilar, Buenos Aires
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Orbit Private Access */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#EEF2FA] mb-3">
              Gestión Interna
            </h4>
            <p className="text-[11px] text-[#C9D6F2] mb-3">
              Sistema restringido a los 3 miembros técnicos de AuSat.
            </p>
            <button
              onClick={onOrbitClick}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#17264F] hover:bg-[#1E3268] text-[#EEF2FA] border border-white/10 hover:border-[#FF7A1A]/40 transition-colors text-xs font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A1A]" />
              Entrar a Orbit
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5A6785]">
          <p>© 2026 AuSat • Equipo Universidad Austral. Todos los derechos reservados.</p>
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
