'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Satellite, ShieldCheck, ChevronRight, Activity } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
  onSpecsClick?: () => void;
  onOrbitAccessClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onSpecsClick,
  onOrbitAccessClick,
}) => {
  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden text-center bg-[#0B1633]">
      {/* Background Radial Glows (Apple Atmospheric Space Aesthetic) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-gradient-to-b from-[#FF7A1A]/15 via-[#17264F]/40 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 w-[360px] h-[360px] bg-[#1E3268]/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Mission Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#17264F]/80 border border-white/10 backdrop-blur-md shadow-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A1A] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A1A]" />
          </span>
          <span className="text-[12px] font-medium tracking-wide uppercase text-[#C9D6F2]">
            AuSat • Universidad Austral | CanSat CONAE 2026
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FF7A1A]/20 text-[#FF7A1A] font-semibold">
            FASE PDR
          </span>
        </motion.div>

        {/* Apple Refined Typography: Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#EEF2FA] tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6"
        >
          Ingeniería aeroespacial con{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] via-[#FFA866] to-[#EEF2FA]">
            precisión orbital.
          </span>
        </motion.h1>

        {/* Refined Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-[#C9D6F2] font-normal max-w-2xl mx-auto leading-relaxed mb-10 tracking-tight"
        >
          Diseñado por estudiantes de la Universidad Austral para transportar y entregar una carga frágil intacta a 2 metros de altitud mediante paraglider guiado.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onSpecsClick || onExploreClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FF7A1A] hover:bg-[#D9620B] text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-[#FF7A1A]/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            Explorar Ficha CanSat
          </button>

          <button
            onClick={onOrbitAccessClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#17264F] hover:bg-[#1E3268] text-[#EEF2FA] border border-white/10 hover:border-white/20 font-medium text-sm transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 group"
          >
            <Satellite className="w-4 h-4 text-[#FF7A1A] group-hover:rotate-12 transition-transform duration-300" />
            Acceso a Orbit
            <ChevronRight className="w-4 h-4 text-[#5A6785] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Mission Telemetry & Specs Quick Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-[#17264F]/60 border border-white/10 backdrop-blur-md text-left transition-all duration-200 hover:border-[#FF7A1A]/40">
            <div className="text-[11px] uppercase tracking-wider text-[#5A6785] font-semibold mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#FF7A1A]" /> Apogeo
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#EEF2FA] tracking-tight">
              1.000 <span className="text-sm font-normal text-[#C9D6F2]">m</span>
            </div>
            <p className="text-[11px] text-[#5A6785] mt-1">Eyección cohete CONAE</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#17264F]/60 border border-white/10 backdrop-blur-md text-left transition-all duration-200 hover:border-[#FF7A1A]/40">
            <div className="text-[11px] uppercase tracking-wider text-[#5A6785] font-semibold mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Carga Crítica
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#EEF2FA] tracking-tight">
              2,0 <span className="text-sm font-normal text-[#C9D6F2]">m</span>
            </div>
            <p className="text-[11px] text-[#5A6785] mt-1">Suelta sin fisuras (Huevo)</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#17264F]/60 border border-white/10 backdrop-blur-md text-left transition-all duration-200 hover:border-[#FF7A1A]/40">
            <div className="text-[11px] uppercase tracking-wider text-[#5A6785] font-semibold mb-1 flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5 text-[#06B6D4]" /> Telemetría RF
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#EEF2FA] tracking-tight">
              915 <span className="text-sm font-normal text-[#C9D6F2]">MHz</span>
            </div>
            <p className="text-[11px] text-[#5A6785] mt-1">Enlace LoRa 100mW</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#17264F]/60 border border-white/10 backdrop-blur-md text-left transition-all duration-200 hover:border-[#FF7A1A]/40">
            <div className="text-[11px] uppercase tracking-wider text-[#5A6785] font-semibold mb-1 flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-[#FF7A1A]" /> Masa Total
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#EEF2FA] tracking-tight">
              1.000 <span className="text-sm font-normal text-[#C9D6F2]">g</span>
            </div>
            <p className="text-[11px] text-[#5A6785] mt-1">Tolerancia estricta ±10g</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
