import React from 'react'
import { motion } from 'motion/react'
import { ShieldCheck, Wind, ChevronRight, Activity, ArrowDownCircle } from 'lucide-react'
import { TelemetryPacket } from '../../types/mission'

interface HeroProps {
  telemetry: TelemetryPacket
}

export const Hero: React.FC<HeroProps> = ({ telemetry }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-grid-pattern">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info Col */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wide shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>EQUIPO AuSat • UNIVERSIDAD AUSTRAL</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading"
            >
              Proyecto <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Orbit</span>:
              <br />
              Ingeniería CanSat 2026
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed"
            >
              Diseño, desarrollo aeroespacial y telemetría de precisión para la competencia internacional <strong>CanSat 2026</strong>. 
              Nuestra misión integra un sistema de descenso dual con <strong>paracaídas y paraglider guiado</strong>, 
              diseñado para proteger y desplegar una carga frágil intacta a 2 metros del suelo.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#telemetria"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
              >
                <Activity className="w-5 h-5" />
                <span>Ver Telemetría en Vivo</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#fases"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700 hover:border-cyan-500/50 transition-all active:scale-95"
              >
                <span>Fases de Vuelo</span>
              </a>
            </motion.div>

            {/* Highlights metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80"
            >
              <div>
                <p className="text-xs text-slate-400 font-mono">APOGEO OBJETIVO</p>
                <p className="text-xl sm:text-2xl font-bold font-heading text-white">1000 m</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">DESPLIEGUE CARGA</p>
                <p className="text-xl sm:text-2xl font-bold font-heading text-cyan-400">2.0 m</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">FRECUENCIA RF</p>
                <p className="text-xl sm:text-2xl font-bold font-heading text-emerald-400">915 MHz</p>
              </div>
            </motion.div>

          </div>

          {/* Satellite Interactive Flight Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-2xl glass-panel p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-950/50"
            >
              {/* Header card */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="font-mono text-xs uppercase font-semibold text-slate-200">
                    CAN-BUS FLIGHT COMPUTER
                  </span>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                  {telemetry.timestamp}
                </span>
              </div>

              {/* Graphic Orbit Mockup */}
              <div className="relative h-48 sm:h-56 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden mb-6">
                
                {/* Orbital concentric rings */}
                <div className="absolute w-44 h-44 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '24s' }} />
                <div className="absolute w-64 h-64 rounded-full border border-teal-500/15 border-dashed animate-spin" style={{ animationDuration: '40s' }} />
                
                {/* Center CanSat Icon Badge */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-28 rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/30 flex flex-col items-center justify-between p-2">
                    <div className="w-full flex justify-between items-center text-[9px] font-mono text-cyan-300">
                      <span>AuSat</span>
                      <span>v1.0</span>
                    </div>
                    {/* Paraglider line simulation */}
                    <Wind className="w-6 h-6 text-teal-300 animate-bounce" />
                    {/* Delicate payload container indicator */}
                    <div className="w-full text-center py-0.5 rounded bg-amber-500/20 text-amber-300 text-[8px] font-mono border border-amber-500/40">
                      CARGA: OK
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300 mt-2 font-semibold">
                    FASE: {telemetry.missionPhase.replace('_', ' ')}
                  </span>
                </div>

                {/* Corner indicators */}
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500">
                  IMU: 6-DOF Active
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-emerald-400">
                  GPS LOCK: 11 SAT
                </div>
              </div>

              {/* Live Metric Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <ArrowDownCircle className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Altitud Actual</span>
                  </div>
                  <p className="text-2xl font-bold font-mono text-cyan-400">
                    {telemetry.altitude.toFixed(1)} <span className="text-xs font-normal text-slate-400">m</span>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <Wind className="w-3.5 h-3.5 text-teal-400" />
                    <span>Tasa de Descenso</span>
                  </div>
                  <p className="text-2xl font-bold font-mono text-teal-300">
                    {telemetry.velocity} <span className="text-xs font-normal text-slate-400">m/s</span>
                  </p>
                </div>
              </div>

              {/* Egg Payload Protection Status */}
              <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-xs font-semibold text-slate-200">Integridad de Carga Crítica</p>
                    <p className="text-[10px] text-slate-400">Cápsula de Huevo: Amortiguación activa</p>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-emerald-400">
                  100% OK
                </span>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
