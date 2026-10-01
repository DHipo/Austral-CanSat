'use client';

import React from 'react';
import { ExternalLink, Satellite } from 'lucide-react';

interface FooterProps {
  onOrbitClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOrbitClick }) => {
  return (
    <footer className="bg-black/60 backdrop-blur-xl border-t border-white/[0.08] py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          
          {/* Column 1: Brand & Identity with Official Logo */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="AuSat CanSat Universidad Austral"
                className="w-11 h-11 object-contain drop-shadow-md"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-[#F5F5F7]">AuSat</span>
                  <span className="text-[10px] uppercase font-bold text-[#FF7A1A] px-2 py-0.5 rounded-full bg-[#FF7A1A]/20">
                    Orbit
                  </span>
                </div>
                <p className="text-[10px] text-[#86868B]">Universidad Austral</p>
              </div>
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
              className="apple-metallic-btn px-6 py-2 text-xs font-bold cursor-pointer"
            >
              <Satellite className="w-3.5 h-3.5 text-[#FF7A1A]" />
              <span>Orbit</span>
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
