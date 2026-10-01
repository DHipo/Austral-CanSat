'use client';

import React from 'react';
import { Satellite, Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOrbitClick: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrbitClick, onNavigateSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isLight = theme === 'light';

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
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl transition-colors duration-500 ${
      isLight ? 'bg-white/80 border-b border-black/[0.08]' : 'bg-black/65 border-b border-white/[0.08]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand: Dual Logos (AuSat Official Emblem + Universidad Austral Faculty Logo) */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          {/* AuSat Emblem */}
          <img
            src="/logo.png"
            alt="AuSat CanSat"
            className="w-11 h-11 object-contain drop-shadow-[0_2px_12px_rgba(255,122,26,0.35)] group-hover:scale-105 transition-transform"
          />

          {/* Divider */}
          <div className={`h-7 w-[1px] ${isLight ? 'bg-black/15' : 'bg-white/20'}`} />

          {/* Universidad Austral Faculty Logo */}
          <div className="h-9 w-9 rounded-xl bg-white p-1 shadow-sm flex items-center justify-center border border-black/5 group-hover:scale-105 transition-transform">
            <img
              src="/logo_facultad.jpg"
              alt="Facultad de Ingeniería - Universidad Austral"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold tracking-tight ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
                AuSat
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isLight ? 'bg-[#0B1633]/10 text-[#0B1633] border-[#0B1633]/20' : 'bg-white/10 text-[#C9D6F2] border-white/10'
              }`}>
                CanSat 2026
              </span>
            </div>
            <p className={`text-[11px] font-medium -mt-0.5 ${isLight ? 'text-[#5A6785]' : 'text-[#86868B]'}`}>
              Facultad de Ingeniería • Univ. Austral
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider ${
          isLight ? 'text-[#5A6785]' : 'text-[#C9D6F2]'
        }`}>
          <button
            onClick={() => scrollToSection('mision')}
            className={`transition-colors cursor-pointer ${isLight ? 'hover:text-[#0B1633]' : 'hover:text-white'}`}
          >
            Misión CONAE
          </button>
          <button
            onClick={() => scrollToSection('subsistemas')}
            className={`transition-colors cursor-pointer ${isLight ? 'hover:text-[#0B1633]' : 'hover:text-white'}`}
          >
            Ficha Técnica
          </button>
          <button
            onClick={() => scrollToSection('equipo')}
            className={`transition-colors cursor-pointer ${isLight ? 'hover:text-[#0B1633]' : 'hover:text-white'}`}
          >
            Equipo Austral
          </button>
          <button
            onClick={() => scrollToSection('newsletter')}
            className={`transition-colors cursor-pointer ${isLight ? 'hover:text-[#0B1633]' : 'hover:text-white'}`}
          >
            Novedades
          </button>
        </nav>

        {/* Right Actions: Theme Toggle + Orbit Metallic Pill */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Apple Style Dark / Light Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
              isLight 
                ? 'bg-white border-black/10 text-[#0B1633] hover:bg-black/5 hover:border-black/20' 
                : 'bg-white/[0.08] border-white/15 text-[#C9D6F2] hover:bg-white/[0.14] hover:text-white'
            }`}
            title={isLight ? 'Cambiar a modo oscuro (espacio)' : 'Cambiar a modo claro (Apple white)'}
            aria-label="Cambiar tema de color"
          >
            {isLight ? (
              <Moon className="w-4 h-4 text-[#0B1633] transition-transform hover:-rotate-12" />
            ) : (
              <Sun className="w-4 h-4 text-[#FF7A1A] transition-transform hover:rotate-45" />
            )}
          </button>

          {/* Orbit Metallic Pill Button */}
          <button
            onClick={onOrbitClick}
            className="apple-metallic-btn px-6 py-2 text-xs font-bold shadow-lg group"
          >
            <Satellite className="w-3.5 h-3.5 text-[#FF7A1A] group-hover:rotate-12 transition-transform duration-300" />
            <span>Orbit</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C9D6F2] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/[0.08] border border-white/10 text-[#C9D6F2]"
            aria-label="Cambiar tema"
          >
            {isLight ? <Moon className="w-5 h-5 text-[#0B1633]" /> : <Sun className="w-5 h-5 text-[#FF7A1A]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl transition-colors ${
              isLight ? 'bg-black/5 text-[#0B1633]' : 'bg-white/[0.08] text-[#C9D6F2]'
            }`}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-6 py-8 space-y-4 border-b backdrop-blur-2xl ${
          isLight ? 'bg-white/95 border-black/10' : 'bg-black/95 border-white/15'
        }`}>
          <button
            onClick={() => scrollToSection('mision')}
            className={`block w-full text-left text-sm font-medium py-2 ${isLight ? 'text-[#1D1D1F]' : 'text-[#C9D6F2]'}`}
          >
            Misión CONAE
          </button>
          <button
            onClick={() => scrollToSection('subsistemas')}
            className={`block w-full text-left text-sm font-medium py-2 ${isLight ? 'text-[#1D1D1F]' : 'text-[#C9D6F2]'}`}
          >
            Ficha Técnica CanSat
          </button>
          <button
            onClick={() => scrollToSection('equipo')}
            className={`block w-full text-left text-sm font-medium py-2 ${isLight ? 'text-[#1D1D1F]' : 'text-[#C9D6F2]'}`}
          >
            Equipo Austral
          </button>
          <button
            onClick={() => scrollToSection('newsletter')}
            className={`block w-full text-left text-sm font-medium py-2 ${isLight ? 'text-[#1D1D1F]' : 'text-[#C9D6F2]'}`}
          >
            Novedades
          </button>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrbitClick();
              }}
              className="w-full apple-metallic-btn py-3 text-xs font-bold"
            >
              <Satellite className="w-4 h-4 text-[#FF7A1A]" />
              <span>Orbit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
