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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/75 backdrop-blur-2xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF7A1A] to-[#D9620B] p-0.5 flex items-center justify-center shadow-md shadow-[#FF7A1A]/30 group-hover:scale-105 transition-transform">
            <Satellite className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#F5F5F7]">AuSat</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-[#C9D6F2] border border-white/10">
                CanSat 2026
              </span>
            </div>
            <p className="text-xs text-[#86868B] font-medium">Universidad Austral</p>
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
            Novedades
          </button>
        </nav>

        {/* Orbit CTA Pill Button */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOrbitClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-[#F5F5F7] text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-sm backdrop-blur-md cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF7A1A] animate-pulse" />
            <span>Acceso a Orbit</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#86868B] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/[0.08] text-[#C9D6F2] hover:text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/15 px-6 py-8 space-y-5">
          <button
            onClick={() => scrollToSection('mision')}
            className="block w-full text-left text-base font-medium text-[#C9D6F2] hover:text-white py-2"
          >
            Misión CONAE
          </button>
          <button
            onClick={() => scrollToSection('subsistemas')}
            className="block w-full text-left text-base font-medium text-[#C9D6F2] hover:text-white py-2"
          >
            Ficha Técnica CanSat
          </button>
          <button
            onClick={() => scrollToSection('equipo')}
            className="block w-full text-left text-base font-medium text-[#C9D6F2] hover:text-white py-2"
          >
            Equipo Austral
          </button>
          <button
            onClick={() => scrollToSection('newsletter')}
            className="block w-full text-left text-base font-medium text-[#C9D6F2] hover:text-white py-2"
          >
            Novedades
          </button>
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrbitClick();
              }}
              className="w-full py-3.5 rounded-full bg-[#FF7A1A] text-white text-sm font-bold text-center flex items-center justify-center gap-2"
            >
              <span>Acceso a Orbit (3 Miembros)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
