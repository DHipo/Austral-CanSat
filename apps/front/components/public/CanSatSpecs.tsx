'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Wind, 
  Egg, 
  Radio, 
  Box, 
  ArrowRight,
  Shield,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const CanSatSpecs: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeSubsystem, setActiveSubsystem] = useState(0);

  const subsystems = [
    {
      id: 'avionics',
      name: 'Aviónica & Computadora de Vuelo',
      icon: Cpu,
      chip: 'ESP32-S3 Dual-Core @ 240MHz',
      badge: 'Redundante',
      summary: 'Adquisición de sensores a 100Hz con filtro de Kalman integrado para estimación de actitud y altitud barométrica.',
      specs: [
        { label: 'Procesador', value: 'Xtensa® 32-bit LX7 Dual Core' },
        { label: 'IMU Principal', value: 'MPU-6050 (Acel. ±16g, Giro ±2000°/s)' },
        { label: 'Altímetro', value: 'BMP280 (Resolución 0.16m)' },
        { label: 'Alimentación', value: 'Batería LiPo 2S 7.4V 850mAh con BMS' },
      ],
    },
    {
      id: 'recovery',
      name: 'Paracaídas & Paraglider Guiado',
      icon: Wind,
      chip: 'Control Autónomo de Planeo',
      badge: 'Clave Competitiva',
      summary: 'Sistema de descenso en dos fases: paracaídas semiesférico para frenado inicial y despliegue servoasistido de ala flexible orientable.',
      specs: [
        { label: 'Velocidad Descenso Paracaídas', value: '≤ 14.5 m/s' },
        { label: 'Velocidad Planeo Paraglider', value: '5.2 m/s guiado' },
        { label: 'Actuadores de Giro', value: '2x Microservos MG90S piñonería metálica' },
        { label: 'Área Vélica', value: '0.42 m² tela ripstop siliconada' },
      ],
    },
    {
      id: 'egg-mechanism',
      name: 'Mecanismo de Liberación de Huevo (2m)',
      icon: Egg,
      chip: 'Sensor ToF VL53L0X Láser',
      badge: 'Reto Crítico CONAE',
      summary: 'A 2 metros exactos de altitud sobre el suelo, un cerrojo electromecánico libera suavemente un huevo de gallina (54-64g) con amortiguación.',
      specs: [
        { label: 'Precisión de Altitud', value: '± 3 cm (Sensor Láser ToF)' },
        { label: 'Masa de Carga Crítica', value: '60 gramos (Huevo Grado A)' },
        { label: 'Tiempo de Desbloqueo', value: '< 45 milisegundos' },
        { label: 'Tasa de Supervivencia', value: '100% en ensayos Drop Test' },
      ],
    },
    {
      id: 'telemetry',
      name: 'Transmisión & Estación Terrena',
      icon: Radio,
      chip: 'LoRa SX1262 @ 915 MHz',
      badge: 'Largo Alcance',
      summary: 'Transmisión de paquetes ASCII con checksum a 1Hz hacia la estación terrena con antena Yagi directiva de 9 dBi.',
      specs: [
        { label: 'Frecuencia Operativa', value: '915 MHz (Banda ISM ENACOM)' },
        { label: 'Potencia de Emisión', value: '20 dBm (100 mW)' },
        { label: 'Sensibilidad Receptor', value: '-148 dBm' },
        { label: 'Tasa de Paquetes', value: '1 Hz continuo + Logging local SPI' },
      ],
    },
    {
      id: 'structure',
      name: 'Estructura & Masa (1000g)',
      icon: Box,
      chip: 'Chasis Híbrido PETG-CF & Aluminio',
      badge: 'Factor de Forma CanSat',
      summary: 'Chasis cilíndrico de 115mm de diámetro y 210mm de altura, reforzado con costillas de fibra de carbono para soportar hasta 20G de aceleración inicial.',
      specs: [
        { label: 'Dimensiones', value: 'Ø 115 mm × 210 mm altura' },
        { label: 'Masa Total Calibrada', value: '1000 g (Tolerancia CONAE ±10g)' },
        { label: 'Material Chasis', value: 'PETG con 15% fibra de carbono' },
        { label: 'Resistencia Térmica', value: '-10°C a +65°C operacional' },
      ],
    },
  ];

  const conaeStages = [
    {
      phase: 'FASE 1',
      title: 'Inscripción & Propuesta Técnica',
      date: 'Marzo 2026',
      status: 'completed',
      desc: 'Validación del concepto de misión, presentación del equipo de 3 estudiantes y plan de trabajo de 6hs semanales.',
    },
    {
      phase: 'FASE 2',
      title: 'Diseño Preliminar (PDR)',
      date: 'Mayo 2026',
      status: 'current',
      desc: 'Revisión crítica de diagramas de circuitos, cálculos de masa (1000g), dimensionamiento de paraglider y enlace LoRa.',
    },
    {
      phase: 'FASE 3',
      title: 'Diseño Crítico (CDR) & Telemetría',
      date: 'Julio 2026',
      status: 'upcoming',
      desc: 'Construcción del prototipo funcional, ensayos de caída libre (Drop Test huevo a 2m) y pruebas de alcance de radio.',
    },
    {
      phase: 'FASE 4',
      title: 'Campaña de Lanzamiento CONAE',
      date: 'Septiembre 2026',
      status: 'upcoming',
      desc: 'Lanzamiento a 1000 metros de apogeo en cohete sonda oficial de CONAE en Córdoba y recuperación de la carga intacta.',
    },
  ];

  const current = subsystems[activeSubsystem];

  return (
    <section id="subsistemas" className="py-28 text-[#F5F5F7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Apple Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block mb-6">
            <span className="apple-label text-[#FF7A1A] px-6 py-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-xl">
              Ingeniería de Vuelo
            </span>
          </div>
          
          <h2 className={`apple-title-section font-bold mb-4 transition-colors duration-500 ${
            isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'
          }`}>
            Ficha Técnica del CanSat AuSat
          </h2>

          <p className={`apple-body-large font-normal leading-relaxed transition-colors duration-500 ${
            isLight ? 'text-[#4B5563]' : 'text-[#C9D6F2]'
          }`}>
            Arquitectura mecatrónica de 1000g diseñada para cumplir los rigurosos estándares de la competencia aeroespacial organizada por CONAE.
          </p>
        </div>

        {/* Subsystems Interactive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-28">
          
          {/* Subsystems Tabs Menu (Left Column) */}
          <div className="lg:col-span-5 space-y-3.5">
            {subsystems.map((sub, idx) => {
              const Icon = sub.icon;
              const isSelected = idx === activeSubsystem;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubsystem(idx)}
                  className={`w-full text-left p-5 rounded-[24px] border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#17264F] to-[#1E3268] border-[#FF7A1A] shadow-[0_10px_35px_-10px_rgba(255,122,26,0.3)] text-white scale-[1.02]'
                      : isLight
                      ? 'bg-white/80 border-black/[0.08] hover:bg-white text-[#1D1D1F] hover:shadow-md'
                      : 'bg-white/[0.04] border-white/8 hover:bg-white/[0.08] hover:border-white/20 text-[#F5F5F7]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-2xl transition-all ${
                        isSelected
                          ? 'bg-[#FF7A1A] text-white shadow-md shadow-[#FF7A1A]/30'
                          : isLight
                          ? 'bg-black/5 text-[#0B1633] group-hover:bg-[#0B1633] group-hover:text-white'
                          : 'bg-white/[0.08] text-[#C9D6F2] group-hover:text-white group-hover:bg-white/[0.12]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-base font-bold transition-colors ${
                        isSelected ? 'text-white' : isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'
                      }`}>
                        {sub.name}
                      </h4>
                      <p className={`text-xs mt-0.5 ${isLight ? 'text-[#5A6785]' : 'text-[#86868B]'}`}>
                        {sub.chip}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? 'text-[#FF7A1A] translate-x-1'
                        : isLight ? 'text-[#5A6785] opacity-50 group-hover:opacity-100' : 'text-[#86868B] opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Subsystem Details Card (Right Column) */}
          <div className={`lg:col-span-7 rounded-[32px] p-8 sm:p-10 backdrop-blur-2xl transition-all duration-500 shadow-2xl relative overflow-hidden ${
            isLight
              ? 'bg-white/90 border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.06)]'
              : 'bg-gradient-to-br from-[#17264F]/70 via-[#0B1633]/90 to-[#050711] border border-white/15'
          }`}>
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <span className="apple-label-small px-3.5 py-1.5 rounded-full bg-[#FF7A1A]/20 text-[#FF7A1A] border border-[#FF7A1A]/40 font-bold">
                {current.badge}
              </span>
              <span className={`text-xs font-mono ${isLight ? 'text-[#5A6785]' : 'text-[#86868B]'}`}>
                REF: AUSAT-SPEC-2026-REV-B
              </span>
            </div>

            <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
              {current.name}
            </h3>

            <p className={`apple-body-large font-normal leading-relaxed mb-8 ${isLight ? 'text-[#4B5563]' : 'text-[#C9D6F2]'}`}>
              {current.summary}
            </p>

            {/* Technical Parameters Apple Bento Rows */}
            <div className="space-y-3">
              <div className={`apple-label-small mb-2 ${isLight ? 'text-[#5A6785]' : 'text-[#86868B]'}`}>
                Parámetros Técnicos Validados
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {current.specs.map((item, i) => (
                  <div 
                    key={i} 
                    className={`p-4 rounded-2xl border transition-colors ${
                      isLight 
                        ? 'bg-black/[0.03] border-black/[0.06]' 
                        : 'bg-white/[0.05] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${isLight ? 'text-[#5A6785]' : 'text-[#86868B]'}`}>
                      {item.label}
                    </div>
                    <div className={`text-sm sm:text-base font-bold ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* CONAE Mission Stages Timeline */}
        <div id="mision" className="mt-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="apple-label text-[#FF7A1A] px-6 py-2 rounded-full bg-white/[0.06] border border-white/15 inline-block mb-3">
              Cronograma Oficial
            </span>
            <h3 className={`apple-title-section font-bold ${isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'}`}>
              Etapas del Certamen CONAE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {conaeStages.map((stage, i) => {
              const isCurrent = stage.status === 'current';
              const isCompleted = stage.status === 'completed';
              return (
                <div
                  key={i}
                  className={`rounded-[26px] p-6 border transition-all duration-300 flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-gradient-to-b from-[#17264F] to-[#0B1633] text-white border-[#FF7A1A] shadow-[0_10px_30px_-5px_rgba(255,122,26,0.3)] ring-1 ring-[#FF7A1A]/50'
                      : isLight
                      ? 'bg-white/85 border-black/[0.08] shadow-sm text-[#1D1D1F]'
                      : isCompleted
                      ? 'bg-white/[0.05] border-white/12 text-[#F5F5F7]'
                      : 'bg-white/[0.02] border-white/5 opacity-80 text-[#F5F5F7]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="apple-label-small text-[#FF7A1A]">
                        {stage.phase}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      )}
                      {isCurrent && (
                        <span className="apple-label-small px-2 py-0.5 rounded-full bg-[#FF7A1A]/20 text-[#FF7A1A] border border-[#FF7A1A]/40 text-[10px]">
                          EN CURSO
                        </span>
                      )}
                      {!isCompleted && !isCurrent && (
                        <Clock className={`w-4 h-4 ${isLight ? 'text-[#86868B]' : 'text-[#86868B]'}`} />
                      )}
                    </div>

                    <h4 className={`text-base font-bold mb-1.5 leading-snug ${
                      isCurrent ? 'text-white' : isLight ? 'text-[#0B1633]' : 'text-[#F5F5F7]'
                    }`}>
                      {stage.title}
                    </h4>
                    
                    <p className="text-xs text-[#FF7A1A] font-semibold mb-2">
                      {stage.date}
                    </p>

                    <p className={`text-xs font-normal leading-relaxed ${
                      isCurrent ? 'text-[#C9D6F2]' : isLight ? 'text-[#5A6785]' : 'text-[#C9D6F2]'
                    }`}>
                      {stage.desc}
                    </p>
                  </div>

                  <div className={`pt-4 mt-4 border-t flex items-center justify-between text-[11px] ${
                    isCurrent ? 'border-white/15 text-[#C9D6F2]' : isLight ? 'border-black/[0.08] text-[#86868B]' : 'border-white/10 text-[#86868B]'
                  }`}>
                    <span>CONAE 2026</span>
                    <span className="font-mono">F{i + 1}-OK</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
