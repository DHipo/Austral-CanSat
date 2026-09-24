import React from 'react'
import { Satellite, ArrowUp } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <Satellite className="w-4 h-4" />
          </div>
          <div>
            <p className="font-heading font-bold text-white text-sm">ORBIT by AuSat</p>
            <p className="text-[11px] text-slate-500">Universidad Austral • Competencia CanSat 2026</p>
          </div>
        </div>

        {/* Center info */}
        <p className="text-center text-slate-500">
          Diseñado con tecnología web de última generación: React 19, Tailwind CSS v4 y Motion.
        </p>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs font-mono"
        >
          <span>Inicio</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  )
}
