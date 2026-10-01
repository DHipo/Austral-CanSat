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
    <section className="relative pt-36 pb-28 md:pt-48 md:pb-40 overflow-hidden text-center bg-black">
      {/* Background Radial Glows & Apple Deep Atmospheric Space */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-gradient-to-b from-[#FF7A1A]/18 via-[#17264F]/35 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-[420px] h-[420px] bg-[#0B1633]/80 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#050711] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Mission Status Badge - Apple Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-2xl shadow-xl mb-10 hover:border-white/25 transition-colors"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A1A] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF7A1A]" />
          </span>
          <span className="apple-label text-[#C9D6F2]">
            AuSat • Universidad Austral | CanSat CONAE 2026
          </span>
          <span className="apple-label-small px-3 py-0.5 rounded-full bg-[#FF7A1A]/20 text-[#FF7A1A] border border-[#FF7A1A]/40">
            FASE PDR
          </span>
        </motion.div>

        {/* Apple Headline: Poppins Bold 60px - 110px */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="apple-title-hero text-[#F5F5F7] max-w-5xl mx-auto mb-8 font-bold"
        >
          Ingeniería aeroespacial con{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] via-[#FFA866] to-[#FFFFFF]">
            precisión orbital.
          </span>
        </motion.h1>

        {/* Apple Lead Text: Poppins Regular Mínimo 28px */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="apple-body-large text-[#C9D6F2] font-normal max-w-4xl mx-auto mb-14 tracking-tight"
        >
          Diseñado por estudiantes de la Universidad Austral para transportar y entregar una carga frágil intacta a 2 metros de altitud mediante paraglider guiado.
        </motion.p>

        {/* Action Buttons: Apple Clean Pill Layout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
        >
          <button
            onClick={onSpecsClick || onExploreClick}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#FF7A1A] hover:bg-[#D9620B] text-white font-bold text-base transition-all duration-200 shadow-[0_0_40px_-5px_rgba(255,122,26,0.45)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
          >
            <Rocket className="w-5 h-5" />
            Explorar Ficha CanSat
          </button>

          <button
            onClick={onOrbitAccessClick}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#F5F5F7] border border-white/20 hover:border-white/35 font-bold text-base transition-all duration-200 backdrop-blur-2xl flex items-center justify-center gap-3 group cursor-pointer hover:scale-[1.03]"
          >
            <Satellite className="w-5 h-5 text-[#FF7A1A] group-hover:rotate-12 transition-transform duration-300" />
            Acceso a Orbit
            <ChevronRight className="w-5 h-5 text-[#86868B] group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Mission Telemetry & Specs Quick Bento Grid (Apple Precision) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto text-left"
        >
          <div className="p-6 rounded-[28px] bg-gradient-to-b from-[#17264F]/50 to-[#0B1633]/70 border border-white/12 backdrop-blur-xl transition-all duration-300 hover:border-[#FF7A1A]/50 hover:-translate-y-1 shadow-lg">
            <div className="apple-label-small text-[#86868B] mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#FF7A1A]" /> Apogeo
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              1.000 <span className="text-xl font-normal text-[#C9D6F2]">m</span>
            </div>
            <p className="text-sm text-[#86868B] mt-2 font-medium">Eyección cohete CONAE</p>
          </div>

          <div className="p-6 rounded-[28px] bg-gradient-to-b from-[#17264F]/50 to-[#0B1633]/70 border border-white/12 backdrop-blur-xl transition-all duration-300 hover:border-[#FF7A1A]/50 hover:-translate-y-1 shadow-lg">
            <div className="apple-label-small text-[#86868B] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Carga Crítica
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              2,0 <span className="text-xl font-normal text-[#C9D6F2]">m</span>
            </div>
            <p className="text-sm text-[#86868B] mt-2 font-medium">Suelta sin fisuras (Huevo)</p>
          </div>

          <div className="p-6 rounded-[28px] bg-gradient-to-b from-[#17264F]/50 to-[#0B1633]/70 border border-white/12 backdrop-blur-xl transition-all duration-300 hover:border-[#FF7A1A]/50 hover:-translate-y-1 shadow-lg">
            <div className="apple-label-small text-[#86868B] mb-2 flex items-center gap-2">
              <Satellite className="w-4 h-4 text-[#06B6D4]" /> Telemetría RF
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              915 <span className="text-xl font-normal text-[#C9D6F2]">MHz</span>
            </div>
            <p className="text-sm text-[#86868B] mt-2 font-medium">Enlace LoRa 100mW</p>
          </div>

          <div className="p-6 rounded-[28px] bg-gradient-to-b from-[#17264F]/50 to-[#0B1633]/70 border border-white/12 backdrop-blur-xl transition-all duration-300 hover:border-[#FF7A1A]/50 hover:-translate-y-1 shadow-lg">
            <div className="apple-label-small text-[#86868B] mb-2 flex items-center gap-2">
              <Rocket className="w-4 h-4 text-[#FF7A1A]" /> Masa Total
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-[#F5F5F7] tracking-tight">
              1.000 <span className="text-xl font-normal text-[#C9D6F2]">g</span>
            </div>
            <p className="text-sm text-[#86868B] mt-2 font-medium">Tolerancia estricta ±10g</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
