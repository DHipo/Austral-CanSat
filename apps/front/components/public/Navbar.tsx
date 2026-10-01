'use client';

import React from 'react';
import { Satellite, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOrbitClick: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrbitClick, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1633]/80 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF7A1A] to-[#D9620B] p-0.5 flex items-center justify-center shadow-md shadow-[#FF7A1A]/20 group-hover:scale-105 transition-transform">
            <Satellite className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-[#EEF2FA]">AuSat</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-[#C9D6F2]">
                CanSat 2026
              </span>
            </div>
            <p className="text-[10px] text-[#5A6785] -mt-0.5 font-medium">Universidad Austral</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#C9D6F2]">
          <button
            onClick={() => scrollToSection('mision')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Misión CONAE
          </button>
          <button
            onClick={() => scrollToSection('subsistemas')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Ficha Técnica CanSat
          </button>
          <button
            onClick={() => scrollToSection('equipo')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Equipo Austral
          </button>
          <button
            onClick={() => scrollToSection('newsletter')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Divulgación
          </button>
        </nav>

        {/* Actions: Orbit Access Button (Discreet & Minimalist) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOrbitClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#17264F] hover:bg-[#1E3268] text-[#EEF2FA] border border-white/15 hover:border-[#FF7A1A]/50 transition-all duration-200 shadow-sm group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>Orbit Access</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#5A6785] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#C9D6F2] hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1633]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          <button
            onClick={() => scrollToSection('mision')}
            className="block w-full text-left py-2 text-sm font-medium text-[#C9D6F2] hover:text-white"
          >
            Misión CONAE
          </button>
          <button
            onClick={() => scrollToSection('subsistemas')}
            className="block w-full text-left py-2 text-sm font-medium text-[#C9D6F2] hover:text-white"
          >
            Ficha Técnica CanSat
          </button>
          <button
            onClick={() => scrollToSection('equipo')}
            className="block w-full text-left py-2 text-sm font-medium text-[#C9D6F2] hover:text-white"
          >
            Equipo Austral
          </button>
          <button
            onClick={() => scrollToSection('newsletter')}
            className="block w-full text-left py-2 text-sm font-medium text-[#C9D6F2] hover:text-white"
          >
            Divulgación
          </button>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrbitClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-[#FF7A1A] hover:bg-[#D9620B] text-white shadow-md shadow-[#FF7A1A]/20"
            >
              <Satellite className="w-4 h-4" />
              Ingresar al Sistema Orbit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
