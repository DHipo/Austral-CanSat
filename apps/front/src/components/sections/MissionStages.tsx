import React from 'react'
import { Rocket, Disc, Wind, Egg, Navigation, CheckCircle2 } from 'lucide-react'

export const MissionStages: React.FC = () => {
  const stages = [
    {
      step: '01',
      title: 'Lanzamiento & Apogeo',
      altitude: '1000 m',
      desc: 'Ascenso a bordo del cohete lanzador hasta el apogeo. Despliegue y eyección del CanSat en la cúspide de la trayectoria.',
      icon: Rocket,
      highlight: 'Eyección segura a máxima altitud',
      color: 'cyan'
    },
    {
      step: '02',
      title: 'Estabilización y Paracaídas',
      altitude: '1000 m - 600 m',
      desc: 'Despliegue del paracaídas primario para desacelerar la caída libre, estabilizar la actitud del satélite y abrir la bahía aerodinámica.',
      icon: Disc,
      highlight: 'Reducción de velocidad terminal',
      color: 'blue'
    },
    {
      step: '03',
      title: 'Vuelo Guiado por Paraglider',
      altitude: '600 m - 10 m',
      desc: 'Transición hacia el paraglider dirigible. Servomotores controlados por la computadora de a bordo corrigen rumbos según coordenadas GPS.',
      icon: Wind,
      highlight: 'Navegación autónoma hacia la diana',
      color: 'teal'
    },
    {
      step: '04',
      title: 'Despliegue Crítico de Carga (Huevo)',
      altitude: '2.0 m',
      desc: 'El reto central: A exactamente 2 metros de altitud, el mecanismo de liberación deposita suavemente el huevo de gallina intacto sin quebrarse.',
      icon: Egg,
      highlight: 'Requisito crítico de competencia 2026',
      color: 'amber'
    },
    {
      step: '05',
      title: 'Aterrizaje & Recuperación',
      altitude: '0 m (Suelo)',
      desc: 'Toque a tierra del cuerpo principal, emisión de señal acústica de baliza y transmisión continua de coordenadas GPS finales para el equipo.',
      icon: Navigation,
      highlight: 'Baliza y rescate en campo',
      color: 'emerald'
    }
  ]

  return (
    <section id="fases" className="py-20 bg-slate-950/70 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-mono font-semibold tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40">
            PERFIL DE VUELO
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Fases de la Misión CanSat
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Cada segundo del vuelo requiere precisión milimétrica entre sensores barométricos, servocontroladores y actuadores mecánicos.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stages.map((stage) => {
            const Icon = stage.icon
            return (
              <div
                key={stage.step}
                className="relative rounded-2xl glass-panel p-5 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/40"
              >
                <div>
                  {/* Top Bar with Number & Altitude */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-cyan-400 transition-colors">
                      {stage.step}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700/60 text-slate-300 font-semibold">
                      {stage.altitude}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/50 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Stage Title */}
                  <h3 className="text-lg font-bold text-white mb-2 font-heading leading-snug">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {stage.desc}
                  </p>
                </div>

                {/* Highlight Tag */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{stage.highlight}</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
