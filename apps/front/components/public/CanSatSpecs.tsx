'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Wind, 
  Egg, 
  Radio, 
  Box, 
  ArrowRight
} from 'lucide-react';

export const CanSatSpecs: React.FC = () => {
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
      name: 'Chasis Estructural & Morro',
      icon: Box,
      chip: 'PETG / Fibra de Carbono',
      badge: 'Calificación 30G',
      summary: 'Cuerpo cilíndrico de 66mm de diámetro que aloja todos los módulos cumpliendo con la masa de 1000g ± 10g.',
      specs: [
        { label: 'Diámetro CanSat', value: '66 mm (Estándar CONAE)' },
        { label: 'Altura Total', value: '185 mm' },
        { label: 'Masa Total Calificada', value: '998 gramos' },
        { label: 'Resistencia Estructural', value: 'Impacto axial 30G continuo' },
      ],
    },
  ];

  const missionStages = [
    {
      num: '01',
      title: 'Preejecución & Rampa',
      alt: '0 m',
      desc: 'Comprobación de enlace LoRa 915MHz, calibración de presión barométrica y sellado de seguridad.',
    },
    {
      num: '02',
      title: 'Lanzamiento Cohete',
      alt: '0 - 1000 m',
      desc: 'Ascenso propulsado sufriendo hasta 15G. CanSat en estado inercial registrando aceleración.',
    },
    {
      num: '03',
      title: 'Apogeo & Eyección',
      alt: '1000 m',
      desc: 'Separación del morro contenedor y apertura del paracaídas principal de frenado aerodinámico.',
    },
    {
      num: '04',
      title: 'Descenso & Planeo',
      alt: '800 - 10 m',
      desc: 'Despliegue del paraglider guiado. Actuación de servomotores para orientación hacia la zona de recuperación.',
    },
    {
      num: '05',
      title: 'Entrega de Huevo a 2m',
      alt: '2.0 m',
      desc: 'Detección ToF de cota 2m, retracción de pestillo y entrega suave de la carga intacta.',
    },
    {
      num: '06',
      title: 'Aterrizaje & Baliza',
      alt: '0 m',
      desc: 'Toque de tierra, activación de buzzer de 95dB y baliza GPS para recuperación rápida por el equipo.',
    },
  ];

  const current = subsystems[activeSubsystem];

  return (
    <section id="subsistemas" className="py-24 bg-[#0B1633] text-[#EEF2FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#17264F] text-[#FF7A1A] border border-white/10">
            Ingeniería de Vuelo
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4 text-[#EEF2FA]">
            Ficha Técnica del CanSat AuSat
          </h2>
          <p className="text-base sm:text-lg text-[#C9D6F2] font-normal leading-relaxed">
            Arquitectura mecatrónica de 1000g diseñada para cumplir los rigurosos estándares de la competencia aeroespacial organizada por CONAE.
          </p>
        </div>

        {/* Subsystems Interactive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          
          {/* Subsystems Tabs Menu (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            {subsystems.map((sub, idx) => {
              const Icon = sub.icon;
              const isSelected = idx === activeSubsystem;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubsystem(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#17264F] border-[#FF7A1A] shadow-lg shadow-[#FF7A1A]/10'
                      : 'bg-[#17264F]/40 border-white/5 hover:bg-[#17264F]/80 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-[#FF7A1A] text-white'
                          : 'bg-[#0B1633] text-[#C9D6F2] group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#EEF2FA] group-hover:text-white">
                        {sub.name}
                      </h4>
                      <p className="text-xs text-[#5A6785]">{sub.chip}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? 'text-[#FF7A1A] translate-x-1'
                        : 'text-[#5A6785] opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Subsystem Details Card (Right Column) */}
          <div className="lg:col-span-7 bg-[#17264F] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FF7A1A]/20 text-[#FF7A1A]">
                {current.badge}
              </span>
              <span className="text-xs text-[#5A6785] font-mono">
                SUBSYSTEM-ID: 0{activeSubsystem + 1}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#EEF2FA] mb-3">
              {current.name}
            </h3>

            <p className="text-sm sm:text-base text-[#C9D6F2] leading-relaxed mb-8">
              {current.summary}
            </p>

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A6785] mb-4">
                Especificaciones Verificadas
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {current.specs.map((item, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#0B1633]/60 border border-white/5">
                    <div className="text-[11px] text-[#5A6785] uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-[#EEF2FA] mt-0.5">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CONAE Mission Stages Timeline */}
        <div id="mision" className="pt-8 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#17264F] text-[#C9D6F2]">
              CONOP • Perfil de Vuelo
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#EEF2FA] mt-3">
              Fases de la Misión CanSat CONAE
            </h3>
            <p className="text-sm text-[#C9D6F2] mt-2">
              Desde el encendido en rampa hasta la entrega a 2m y recuperación en el campo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {missionStages.map((stage) => (
              <div
                key={stage.num}
                className="p-5 rounded-2xl bg-[#17264F]/50 border border-white/10 hover:border-[#FF7A1A]/40 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#FF7A1A] px-2 py-0.5 rounded bg-[#FF7A1A]/10">
                    FASE {stage.num}
                  </span>
                  <span className="text-xs font-semibold text-[#C9D6F2] font-mono">
                    {stage.alt}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#EEF2FA] group-hover:text-white mb-2">
                  {stage.title}
                </h4>
                <p className="text-xs text-[#C9D6F2] leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
