'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Satellite, ShieldCheck, ChevronRight, Activity, Radio, Box } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Dual Institutional Branding: Enlarged AuSat Medal + Minimalist Universidad Austral Faculty Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-6 sm:gap-10 mb-12"
        >
          {/* AuSat Metallic Emblem - Enlarged */}
          <div 
            className="relative group cursor-pointer" 
            onClick={() => (onSpecsClick ?? onExploreClick)?.()}
          >
            <div className={`absolute inset-0 rounded-full blur-3xl transition-opacity ${
              isLight ? 'bg-[#FF7A1A]/20 opacity-50' : 'bg-gradient-to-r from-[#FF7A1A]/30 to-[#17264F]/50 opacity-70'
            }`} />
            <img
              src="/logo.png"
              alt="AuSat Emblema Oficial"
              className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-all duration-300"
            />
          </div>

          {/* Minimalist Divider */}
          <div className={`h-20 sm:h-28 w-[1px] ${isLight ? 'bg-black/10' : 'bg-white/15'}`} />

          {/* Universidad Austral Faculty Logo */}
          <div className="p-3.5 sm:p-5 rounded-3xl bg-white shadow-xl border border-black/5 hover:scale-105 transition-transform flex items-center justify-center">
            <img
              src="/logo_facultad.jpg"
              alt="Universidad Austral"
              className="h-16 sm:h-22 w-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Apple Headline: Poppins Bold */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`apple-title-hero max-w-4xl mx-auto mb-6 font-bold transition-colors duration-500 ${
            isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'
          }`}
        >
          Ingeniería aeroespacial con{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] via-[#FFA866] to-[#0B1633] dark:to-[#FFFFFF]">
            precisión orbital.
          </span>
        </motion.h1>

        {/* Apple Lead Text: Poppins Regular */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`apple-body-large font-normal max-w-2xl mx-auto mb-12 tracking-tight transition-colors duration-500 ${
            isLight ? 'text-[#4B5563]' : 'text-[#C9D6F2]'
          }`}
        >
          Diseñado por estudiantes de la Universidad Austral para transportar y entregar una carga frágil intacta a 2 metros de altitud mediante paraglider guiado.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          {/* Explorar Ficha CanSat without Rocket Icon */}
          <button
            onClick={onSpecsClick || onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF7A1A] hover:bg-[#D9620B] text-white font-bold text-sm transition-all duration-200 shadow-[0_0_35px_-5px_rgba(255,122,26,0.45)] hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explorar Ficha CanSat</span>
            <ChevronRight className="w-4 h-4 opacity-80" />
          </button>

          {/* Orbit Metallic Button */}
          <button
            onClick={onOrbitAccessClick}
            className="w-full sm:w-auto apple-metallic-btn px-8 py-3.5 text-sm shadow-xl group"
          >
            <Satellite className="w-4 h-4 text-[#FF7A1A] group-hover:rotate-12 transition-transform duration-300" />
            <span>Orbit</span>
            <ChevronRight className="w-4 h-4 opacity-75 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Mission Telemetry & Specs Quick Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
        >
          <div className={`p-6 rounded-[24px] border backdrop-blur-xl transition-all duration-300 hover:border-[#FF7A1A]/40 hover:-translate-y-1 shadow-lg group ${
            isLight 
              ? 'bg-white/85 border-black/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.05)]' 
              : 'bg-gradient-to-b from-[#17264F]/40 to-[#0B1633]/60 border-white/10'
          }`}>
            <div className="apple-label-small text-[#FF7A1A] mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#FF7A1A]" /> Apogeo
            </div>
            <div className={`text-3xl font-bold tracking-tight ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
              1.000 <span className={`text-sm font-normal ${isLight ? 'text-[#5A6785]' : 'text-[#C9D6F2]'}`}>m</span>
            </div>
            <p className={`text-xs mt-1 font-medium ${isLight ? 'text-[#5A6785]' : 'text-[#86868B]'}`}>
              Eyección cohete CONAE
            </p>
          </div>

          <div className={`p-6 rounded-[24px] border backdrop-blur-xl transition-all duration-300 hover:border-[#FF7A1A]/40 hover:-translate-y-1 shadow-lg group ${
            isLight 
              ? 'bg-white/85 border-black/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.05)]' 
              : 'bg-gradient-to-b from-[#17264F]/40 to-[#0B1633]/60 border-white/10'
          }`}>
            <div className="apple-label-small text-[#10B981] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Carga Crítica
            </div>
            <div className={`text-3xl font-bold tracking-tight ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
              2,0 <span className={`text-sm font-normal ${isLight ? 'text-[#5A6785]' : 'text-[#C9D6F2]'}`}>m</span>
            </div>
            <p className={`text-xs mt-1 font-medium ${isLight ? 'text-[#5A6785]' : 'text-[#86868B]'}`}>
              Suelta sin fisuras (Huevo)
            </p>
          </div>

          <div className={`p-6 rounded-[24px] border backdrop-blur-xl transition-all duration-300 hover:border-[#FF7A1A]/40 hover:-translate-y-1 shadow-lg group ${
            isLight 
              ? 'bg-white/85 border-black/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.05)]' 
              : 'bg-gradient-to-b from-[#17264F]/40 to-[#0B1633]/60 border-white/10'
          }`}>
            <div className="apple-label-small text-[#06B6D4] mb-2 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#06B6D4]" /> Telemetría RF
            </div>
            <div className={`text-3xl font-bold tracking-tight ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
              915 <span className={`text-sm font-normal ${isLight ? 'text-[#5A6785]' : 'text-[#C9D6F2]'}`}>MHz</span>
            </div>
            <p className={`text-xs mt-1 font-medium ${isLight ? 'text-[#5A6785]' : 'text-[#86868B]'}`}>
              Enlace LoRa 100mW
            </p>
          </div>

          <div className={`p-6 rounded-[24px] border backdrop-blur-xl transition-all duration-300 hover:border-[#FF7A1A]/40 hover:-translate-y-1 shadow-lg group ${
            isLight 
              ? 'bg-white/85 border-black/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.05)]' 
              : 'bg-gradient-to-b from-[#17264F]/40 to-[#0B1633]/60 border-white/10'
          }`}>
            <div className="apple-label-small text-[#FF7A1A] mb-2 flex items-center gap-2">
              <Box className="w-3.5 h-3.5 text-[#FF7A1A]" /> Masa Total
            </div>
            <div className={`text-3xl font-bold tracking-tight ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
              1.000 <span className={`text-sm font-normal ${isLight ? 'text-[#5A6785]' : 'text-[#C9D6F2]'}`}>g</span>
            </div>
            <p className={`text-xs mt-1 font-medium ${isLight ? 'text-[#5A6785]' : 'text-[#86868B]'}`}>
              Tolerancia estricta ±10g
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
