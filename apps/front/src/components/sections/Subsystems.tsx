import React from 'react'
import { Cpu, Radio, Wind, Egg, Box, Laptop, CheckCircle } from 'lucide-react'

export const Subsystems: React.FC = () => {
  const subsystems = [
    {
      title: 'Aviónica & Procesamiento',
      tag: 'CEREBRO DE A BORDO',
      desc: 'Computadora de vuelo de doble núcleo con muestreo a 50Hz, filtrado de Kalman para altitud y bus I2C/SPI para sensores inerciales y barométricos.',
      icon: Cpu,
      specs: ['MCU 32-bit Dual Core', 'Filtro Kalman Extendido', 'Almacenamiento microSD Blackbox'],
      accent: 'cyan'
    },
    {
      title: 'Comunicaciones RF LoRa',
      tag: 'TELEMETRÍA 915 MHz',
      desc: 'Enlace de radio de largo alcance con modulación LoRa optimizada para penetración en campo abierto y baja tasa de error de paquete.',
      icon: Radio,
      specs: ['Transceptor SX1262 LoRa', 'Potencia configurable 100mW', 'Antena monopolo de cuarto de onda'],
      accent: 'blue'
    },
    {
      title: 'Guía y Paraglider',
      tag: 'CONTROL DE TRAYECTORIA',
      desc: 'Sistema de control aerodinámico con dos servomotores metálicos que tensan los frenos del paraglider para dirigir el CanSat hacia la zona designada.',
      icon: Wind,
      specs: ['2x Microservos metálicos MG90S', 'Paraglider ripstop de 0.6 m²', 'Algoritmo de compensación de viento'],
      accent: 'teal'
    },
    {
      title: 'Cápsula de Carga Crítica',
      tag: 'PROTECCIÓN DE HUEVO',
      desc: 'Cámara interna con suspensión viscoelástica y mecanismo de liberación rápida para depositar el huevo de gallina intacto a 2 metros de altura.',
      icon: Egg,
      specs: ['Amortiguación de gel no newtoniano', 'Mecanismo de pestillo servoactivado', 'Sensor de proximidad ToF / Ultrasonido'],
      accent: 'amber'
    },
    {
      title: 'Estructura & Chasis',
      tag: 'MECÁNICA CANSAT',
      desc: 'Chasis cilíndrico estándar CanSat (66 mm x 115 mm) fabricado con aleación de polímeros reforzados, diseñado para soportar 15G de aceleración en eyección.',
      icon: Box,
      specs: ['Diámetro 66mm estándar CanSat', 'PETG / Fibra de Carbono', 'Masa total menor a 350g'],
      accent: 'purple'
    },
    {
      title: 'Centro de Control Orbit',
      tag: 'SOFTWARE TERRENO',
      desc: 'Interfaz web reactiva construida en React 19 y Tailwind v4 para graficar telemetría, monitorear la salud del satélite y registrar la misión.',
      icon: Laptop,
      specs: ['Visualización en tiempo real', 'Exportación de datos de vuelo', 'Alertas de seguridad automáticas'],
      accent: 'emerald'
    }
  ]

  return (
    <section id="subsistemas" className="py-20 bg-slate-950/60 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-mono font-semibold tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40">
            ARQUITECTURA DE INGENIERÍA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Subsistemas del Satélite Orbit
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Módulos integrados desarrollados por estudiantes e investigadores de la Universidad Austral para garantizar una misión exitosa.
          </p>
        </div>

        {/* Subsystems Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsystems.map((sub, i) => {
            const Icon = sub.icon
            return (
              <div
                key={i}
                className="rounded-2xl glass-panel p-6 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-semibold tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400">
                      {sub.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-heading">
                    {sub.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {sub.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  {sub.specs.map((spec, specIdx) => (
                    <div key={specIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
