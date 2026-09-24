import React from 'react'
import { Award, Shield, Compass, BookOpen } from 'lucide-react'

export const TeamSection: React.FC = () => {
  const pillars = [
    {
      title: 'Compromiso Técnico',
      desc: 'Dedicación intensiva semanal y reuniones técnicas para asegurar que cada subsistema cumpla los estándares de competencia aeroespacial.',
      icon: Award
    },
    {
      title: 'Innovación en Paraglider',
      desc: 'Diseño aerodinámico y guiado autónomo para transformar una caída descontrolada en una trayectoria de planeo de alta precisión.',
      icon: Compass
    },
    {
      title: 'Protección de Carga Crítica',
      desc: 'Mecanismo de entrega suave a 2 metros del suelo para garantizar el aterrizaje de un huevo sin fisuras ni daños estructurales.',
      icon: Shield
    },
    {
      title: 'Rigor Académico Austral',
      desc: 'Respaldo científico y de ingeniería por parte de la Universidad Austral, aplicando metodologías ágiles y control de calidad riguroso.',
      icon: BookOpen
    }
  ]

  return (
    <section id="equipo" className="py-20 bg-[#030712] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-mono font-semibold tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40">
            EQUIPO AuSat
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Universidad Austral CanSat 2026
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Un equipo multidisciplinario de ingeniería enfocado en superar los mayores retos técnicos: el control del paraglider y la entrega del huevo a 2 metros.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div 
                key={i} 
                className="rounded-2xl glass-panel p-6 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-heading mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Banner Call to Action */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/70 via-slate-900/90 to-blue-950/70 border border-cyan-500/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-3">
            Despegando hacia CanSat 2026
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
            Proyecto Orbit combina excelencia en hardware, algoritmos de control de vuelo y visualización de telemetría moderna.
          </p>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Desarrollo en curso • Sede Universidad Austral</span>
          </div>
        </div>

      </div>
    </section>
  )
}
