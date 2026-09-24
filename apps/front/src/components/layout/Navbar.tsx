import React from 'react'
import { Radio, Satellite, Terminal } from 'lucide-react'

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-[#030712]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40">
            <Satellite className="w-5 h-5 animate-pulse text-cyan-100" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                ORBIT
              </span>
              <span className="text-[10px] uppercase font-mono font-semibold tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                AuSat
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-0.5">
              Universidad Austral • CanSat 2026
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#mision" className="hover:text-cyan-400 transition-colors">
            Misión
          </a>
          <a href="#fases" className="hover:text-cyan-400 transition-colors">
            Fases de Vuelo
          </a>
          <a href="#telemetria" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            Telemetría
          </a>
          <a href="#subsistemas" className="hover:text-cyan-400 transition-colors">
            Subsistemas
          </a>
          <a href="#equipo" className="hover:text-cyan-400 transition-colors">
            Equipo
          </a>
        </nav>

        {/* Status & CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>RF LORA: <span className="text-emerald-400 font-semibold">ONLINE 915MHz</span></span>
          </div>

          <a 
            href="#telemetria" 
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
          >
            <Terminal className="w-4 h-4" />
            <span className="hidden xs:inline">Centro de Control</span>
            <span className="xs:hidden">Control</span>
          </a>
        </div>

      </div>
    </header>
  )
}
