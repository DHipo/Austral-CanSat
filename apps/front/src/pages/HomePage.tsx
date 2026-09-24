import React from 'react'
import { motion } from 'motion/react'
import { 
  ChevronRight, 
  Wind, 
  Egg, 
  Radio, 
  Layers
} from 'lucide-react'
import { handleLinkClick } from '../router/useRouter'

interface HomePageProps {
  navigate: (path: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const bentoSpecs = [
    {
      span: 'md:col-span-8',
      title: 'Paraglider Autónomo.',
      tagline: 'Vuelo guiado en caída libre.',
      description: 'Tras la eyección en el apogeo a 1000 metros, Orbit despliega un paraglider dirigible. Dos servomotores metálicos controlan los frenos del ala, corrigiendo la deriva del viento hacia las coordenadas de recuperación.',
      badge: 'Control Aerodinámico',
      icon: Wind,
      stat: '5 m/s',
      statLabel: 'Tasa de Descenso Estable'
    },
    {
      span: 'md:col-span-4',
      title: 'Carga Frágil.',
      tagline: 'Entrega suave a 2 metros.',
      description: 'El desafío central: a exactamente 2 metros del suelo, un sensor de proximidad ToF acciona un pestillo electromecánico para depositar un huevo de gallina real (54-64g) completamente intacto.',
      badge: 'Reto Crítico',
      icon: Egg,
      stat: '2.0 m',
      statLabel: 'Altitud de Despliegue'
    },
    {
      span: 'md:col-span-4',
      title: 'Chasis & Resistencia.',
      tagline: '1000g de ingeniería pura.',
      description: 'Estructura cilíndrica de 136 mm de diámetro construida en polímero reforzado y herrajes metálicos. Calificada para soportar 15G de aceleración de lanzamiento y un impacto directo de 30G.',
      badge: 'Estructura',
      icon: Layers,
      stat: '30 G',
      statLabel: 'Prueba de Caída Calificada'
    },
    {
      span: 'md:col-span-8',
      title: 'Telemetría LoRa 915 MHz.',
      tagline: 'Monitoreo en tiempo real a 1 Hz.',
      description: 'Transmisión continua de presión barométrica, temperatura, acelerómetro IMU de 6 grados de libertad y coordenadas GPS mediante modulación LoRa SX1262 a la estación terrena con alcance de hasta 5 km.',
      badge: 'Aviónica & RF',
      icon: Radio,
      stat: '1 Hz',
      statLabel: 'Frecuencia de Muestreo'
    }
  ]

  const competitionPhases = [
    {
      step: '01',
      name: 'PDR',
      title: 'Diseño Preliminar',
      desc: 'Revisión y aprobación de la arquitectura conceptual, balance de masa y viabilidad de los subsistemas.'
    },
    {
      step: '02',
      name: 'CDR',
      title: 'Diseño Crítico',
      desc: 'Congelamiento de esquemáticos electrónicos, planos CAD y algoritmos de control de vuelo.'
    },
    {
      step: '03',
      name: 'Calificación',
      title: 'Ensayos Ambientales',
      desc: 'Superación de 4 pruebas obligatorias: Caída libre (30G), horno térmico (60°C), vibración (0-233 Hz) y vacío.'
    },
    {
      step: '04',
      name: 'Lanzamiento',
      title: 'Campaña en Cohete',
      desc: 'Integración en el morro del vector lanzador en el Centro Espacial de CONAE y vuelo a 1000 metros.'
    },
    {
      step: '05',
      name: 'PFR',
      title: 'Post-Flight Review',
      desc: 'Verificación del huevo intacto, procesamiento de telemetría y presentación final de resultados.'
    }
  ]

  const teamMembers = [
    { name: 'Bautista D\'Hipólito', role: 'Liderazgo & Sistemas', area: 'Arquitectura General' },
    { name: 'Equipo de Aviónica', role: 'Hardware & RF', area: 'ESP32-S3 • LoRa 915MHz • IMU' },
    { name: 'Equipo de Software', role: 'Estación Terrena & Datos', area: 'Plataforma Orbit • Telemetría' },
    { name: 'Equipo Mecánico', role: 'Mecanismos & Paraglider', area: 'Cápsula Huevo 2m • Servos' },
    { name: 'Facultad de Ingeniería', role: 'Asesoría Académica', area: 'Universidad Austral' }
  ]

  return (
    <div className="bg-[#000000] min-h-screen text-[#f5f5f7] selection:bg-white/20">
      
      {/* 1. CINEMATIC APPLE HERO */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden text-center">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#e29b68]/10 via-[#c87d55]/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="text-xs uppercase font-medium tracking-widest text-[#a1a1a6]">
              Universidad Austral • Competencia CanSat 2026
            </span>
          </motion.div>

          {/* Monumental Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-white leading-none mb-4"
          >
            Orbit.
          </motion.h1>

          {/* Sub-headline Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight apple-bronze-gradient max-w-3xl mx-auto mb-6"
          >
            Diseñado para llegar intacto.
          </motion.p>

          {/* Minimalist Narrative Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto font-normal leading-relaxed mb-10"
          >
            Mil metros de caída en cohete. Vuelo autónomo guiado por paraglider.
            Y la entrega milimétrica de una carga viva a dos metros del suelo.
          </motion.p>

          {/* Apple Pill Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <a
              href="/informes"
              onClick={(e) => handleLinkClick(e, '/informes', navigate)}
              className="apple-pill-primary px-7 py-3 text-sm flex items-center gap-1.5"
            >
              <span>Ver Informes Oficiales</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="/todo"
              onClick={(e) => handleLinkClick(e, '/todo', navigate)}
              className="apple-pill-secondary px-7 py-3 text-sm flex items-center gap-1.5"
            >
              <span>Tareas de Misión</span>
            </a>
          </motion.div>

          {/* Hardware Medallion Showcase with Ambient Reflection */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center mb-20"
          >
            <div className="relative group">
              <div className="absolute -inset-4 rounded-full bg-[#c87d55]/15 blur-2xl group-hover:bg-[#c87d55]/25 transition-all duration-500" />
              <img 
                src="/logo.png" 
                alt="AuSat Medallón Oficial" 
                className="relative w-44 h-44 sm:w-56 sm:h-56 object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </motion.div>

          {/* Apple Key Spec Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/[0.08] text-left sm:text-center">
            <div>
              <p className="text-xs uppercase font-medium text-[#86868b] tracking-wider mb-1">Apogeo en Cohete</p>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">1.000 m</p>
              <p className="text-xs text-[#6e6e73] mt-1">Eyección a máxima altitud</p>
            </div>
            <div>
              <p className="text-xs uppercase font-medium text-[#86868b] tracking-wider mb-1">Entrega de Carga</p>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#e29b68]">2,0 m</p>
              <p className="text-xs text-[#6e6e73] mt-1">Liberación de huevo intacto</p>
            </div>
            <div>
              <p className="text-xs uppercase font-medium text-[#86868b] tracking-wider mb-1">Masa Límite</p>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">1.000 g</p>
              <p className="text-xs text-[#6e6e73] mt-1">Tolerancia ±10g estricta</p>
            </div>
            <div>
              <p className="text-xs uppercase font-medium text-[#86868b] tracking-wider mb-1">Calificación de Impacto</p>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white">30 G</p>
              <p className="text-xs text-[#6e6e73] mt-1">Drop test certificado</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. APPLE BENTO GRID: LA INGENIERÍA DE ORBIT */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs uppercase font-semibold text-[#86868b] tracking-widest mb-2">
            ARQUITECTURA DE MISIÓN
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            La ingeniería detrás del vuelo.
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] mt-2 max-w-xl">
            Cada subsistema fue optimizado para cumplir con las exigencias críticas de la competencia CanSat 2026.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {bentoSpecs.map((spec, i) => {
            const Icon = spec.icon
            return (
              <div 
                key={i} 
                className={`${spec.span} apple-bento-card p-8 sm:p-10 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-medium tracking-tight px-3 py-1 rounded-full bg-white/[0.06] text-[#a1a1a6] border border-white/[0.08]">
                      {spec.badge}
                    </span>
                    <Icon className="w-6 h-6 text-[#a1a1a6] group-hover:text-[#e29b68] transition-colors" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                    {spec.title}
                  </h3>
                  <p className="text-lg text-[#e29b68] font-medium tracking-tight mb-4">
                    {spec.tagline}
                  </p>
                  <p className="text-sm text-[#86868b] leading-relaxed max-w-xl">
                    {spec.description}
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-white/[0.06] flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      {spec.stat}
                    </span>
                    <span className="text-xs text-[#86868b] block mt-0.5">
                      {spec.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </section>

      {/* 3. FASES DE COMPETENCIA (APPLE TIMELINE) */}
      <section className="py-24 bg-[#0a0a0c] border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="mb-14 text-center sm:text-left">
            <p className="text-xs uppercase font-semibold text-[#86868b] tracking-widest mb-2">
              ROADMAP DE CALIFICACIÓN
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Las 5 fases de la competencia.
            </h2>
            <p className="text-sm sm:text-base text-[#86868b] mt-1">
              Instancias eliminatorias que evalúan el rigor técnico de cada equipo antes del lanzamiento en Córdoba.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {competitionPhases.map((phase) => (
              <div 
                key={phase.step}
                className="apple-bento-card p-6 flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#e29b68] mb-4 block">
                    {phase.step}
                  </span>
                  <h4 className="text-lg font-bold text-white tracking-tight mb-0.5">
                    {phase.name}
                  </h4>
                  <p className="text-xs font-medium text-[#a1a1a6] mb-3">
                    {phase.title}
                  </p>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. EQUIPO AUSTRAL (APPLE ENGINEERING TEAM BENTO) */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="mb-14 text-center sm:text-left">
          <p className="text-xs uppercase font-semibold text-[#86868b] tracking-widest mb-2">
            TALENTO UNIVERSITARIO
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            El equipo AuSat.
          </h2>
          <p className="text-sm sm:text-base text-[#86868b] mt-1">
            Estudiantes e ingenieros de la Universidad Austral comprometidos con la misión CanSat 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {teamMembers.map((member, i) => (
            <div 
              key={i}
              className="apple-bento-card p-6 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {member.name}
                </h4>
                <p className="text-xs text-[#e29b68] font-medium mt-1">
                  {member.role}
                </p>
                <p className="text-xs text-[#86868b] mt-3">
                  {member.area}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 5. APPLE-STYLE MINIMALIST FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#000000] py-14 text-[#86868b] text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="AuSat" className="w-7 h-7 object-contain opacity-80" />
              <div>
                <p className="text-sm font-semibold text-[#f5f5f7]">AuSat • Proyecto Orbit</p>
                <p className="text-[11px] text-[#6e6e73]">Universidad Austral • Competencia CanSat 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs">
              <a 
                href="/informes" 
                onClick={(e) => handleLinkClick(e, '/informes', navigate)}
                className="hover:text-[#f5f5f7] transition-colors"
              >
                Informes
              </a>
              <a 
                href="/todo" 
                onClick={(e) => handleLinkClick(e, '/todo', navigate)}
                className="hover:text-[#f5f5f7] transition-colors"
              >
                Tareas
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[#6e6e73] text-[11px] gap-2">
            <p>© 2026 AuSat. Desarrollado con tecnología web de última generación.</p>
            <p>Diseñado bajo los estándares de ingeniería de la Universidad Austral.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
