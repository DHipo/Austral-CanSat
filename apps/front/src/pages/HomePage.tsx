import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  ChevronRight, 
  Wind, 
  Egg, 
  Radio, 
  Layers,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Linkedin,
  Mail
} from 'lucide-react'
import { handleLinkClick } from '../router/useRouter'

interface HomePageProps {
  navigate: (path: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)

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
      badge: 'Fase de Factibilidad',
      name: 'PDR',
      fullTitle: 'Preliminary Design Review (Diseño Preliminar)',
      summary: 'Aprobación del concepto de misión y solvencia técnica por el jurado evaluador.',
      description: 'En esta etapa teórica y de cálculo se demuestra la viabilidad global del satélite. Se presenta la arquitectura de descenso dual, el dimensionamiento de masa bajo el límite estricto de 1000g ± 10g, el presupuesto de potencia con celdas de litio 18650 y la selección de componentes de aviónica.',
      deliverables: [
        'Informe PDR formal con balance de masas y centro de gravedad',
        'Diagrama de bloques de aviónica, potencia y bus de sensores',
        'Modelo matemático de descenso en paracaídas y paraglider',
        'Cronograma y presupuesto inicial del equipo de la Universidad Austral'
      ],
      metric: '1000g ± 10g',
      metricLabel: 'Límite Estricto de Masa'
    },
    {
      step: '02',
      badge: 'Ingeniería de Detalle',
      name: 'CDR',
      fullTitle: 'Critical Design Review (Diseño Crítico)',
      summary: 'Validación exhaustiva de planos y circuitos antes de la manufactura final.',
      description: 'Demostración de que el diseño está completamente maduro para pasar al taller. Se congelan los modelos CAD con ajuste cilíndrico de 136 mm, los esquemáticos y layouts de PCBs de a bordo, el algoritmo de control de servomotores y la calibración del sensor de proximidad para el huevo.',
      deliverables: [
        'Planos CAD completos del chasis cilíndrico y mecanismo de pestillo',
        'Ruteo de PCB para microcontrolador ESP32-S3 y módulo LoRa',
        'Código de vuelo preliminar con arquitectura de máquina de estados',
        'Plan formal para la ejecución de ensayos ambientales'
      ],
      metric: '136 mm',
      metricLabel: 'Diámetro de Contenedor'
    },
    {
      step: '03',
      badge: 'Instancia Eliminatoria',
      name: 'Calificación',
      fullTitle: 'Ensayos Ambientales Obligatorios',
      summary: '4 pruebas físicas continuas grabadas en video para certificar la supervivencia en vuelo.',
      description: 'Para recibir autorización de lanzamiento, el CanSat debe superar y documentar en video sin cortes 4 ensayos de laboratorio extremos: 1) Drop Test de 30G para anclajes; 2) Horno térmico a 60°C por 2 horas; 3) Vibración aleatoria de 0 a 233 Hz con lijadora orbital; 4) Prueba de despresurización en cámara de vacío.',
      deliverables: [
        'Video continuo de la prueba de impacto Drop Test (~30G)',
        'Gráfico térmico de 2 horas a 60°C continuo con batería activa',
        'Ensayo de vibración (0-233 Hz) sin desprendimiento de soldaduras',
        'Verificación de despliegue mecánico por cambio de presión'
      ],
      metric: '30 G',
      metricLabel: 'Resistencia a Impacto'
    },
    {
      step: '04',
      badge: 'Operación en Campo',
      name: 'Lanzamiento',
      fullTitle: 'Campaña de Vuelo en el Centro Espacial',
      summary: 'Vuelo real a bordo del cohete lanzador en las instalaciones de CONAE en Córdoba.',
      description: 'El CanSat se integra como morro del vector. A 1000m de apogeo se eyecta del lanzador, abre su paracaídas primario (≤ 15 m/s) y, al 80% de altitud, despliega el paraglider guiado hacia la zona de recuperación. A 2 metros del suelo, activa el mecanismo para soltar el huevo sin romperse.',
      deliverables: [
        'Pesaje oficial y verificación de seguridad en base CETT',
        'Transmisión ininterrumpida de paquetes de telemetría a 1 Hz',
        'Planeo autónomo hacia el punto de aterrizaje diana',
        'Liberación milimétrica de la carga frágil a exactamente 2m'
      ],
      metric: '2.0 m',
      metricLabel: 'Altitud de Despliegue de Huevo'
    },
    {
      step: '05',
      badge: 'Veredicto de Jurado',
      name: 'PFR',
      fullTitle: 'Post-Flight Review & Exposición',
      summary: 'Inspección pública del huevo intacto y defensa de datos de misión ante el jurado.',
      description: 'Inmediatamente tras el aterrizaje y localización por baliza acústica y GPS, los jueces inspeccionan que el huevo no tenga ninguna fisura. Posteriormente, el equipo expone el procesamiento de telemetría (altitud, velocidad, IMU 6-DOF) y las lecciones aprendidas de la misión.',
      deliverables: [
        'Certificación ocular de huevo de gallina (54-64g) 100% intacto',
        'Curvas completas de telemetría recuperadas de la tarjeta SD',
        'Sustentación técnica y defensa ante el panel de expertos',
        'Reporte de cierre y contribución a la comunidad aeroespacial'
      ],
      metric: '100% OK',
      metricLabel: 'Integridad de Carga'
    }
  ]

  // Exactamente 6 personas, todas de la Universidad Austral con contacto directo
  const teamMembers = [
    {
      name: 'Bautista D\'Hipólito',
      role: 'Líder de Proyecto & Sistemas',
      career: 'Ingeniería Informática',
      university: 'Universidad Austral',
      subsystem: 'Arquitectura & Aviónica',
      initials: 'BD',
      email: 'bdhipolito@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/bautistadhipolito'
    },
    {
      name: 'Mateo Fernández',
      role: 'Responsable de Aviónica & Hardware',
      career: 'Ingeniería Informática',
      university: 'Universidad Austral',
      subsystem: 'Aviónica & Sensores',
      initials: 'MF',
      email: 'mfernandez@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/mateo-fernandez'
    },
    {
      name: 'Sofía Rossi',
      role: 'Navegación & Control de Paraglider',
      career: 'Ingeniería Industrial',
      university: 'Universidad Austral',
      subsystem: 'Recuperación & Aerodinámica',
      initials: 'SR',
      email: 'srossi@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/sofia-rossi'
    },
    {
      name: 'Lucas Benítez',
      role: 'Estructura & Mecanismo de Huevo',
      career: 'Ingeniería Industrial',
      university: 'Universidad Austral',
      subsystem: 'Estructura Mecánica',
      initials: 'LB',
      email: 'lbenitez@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/lucas-benitez'
    },
    {
      name: 'Valentina Gómez',
      role: 'Software de Vuelo & Estación Terrena',
      career: 'Ingeniería Informática',
      university: 'Universidad Austral',
      subsystem: 'Software & Telemetría',
      initials: 'VG',
      email: 'vgomez@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/valentina-gomez'
    },
    {
      name: 'Ignacio Álvarez',
      role: 'Ensayos Ambientales & Calificación',
      career: 'Ingeniería Industrial',
      university: 'Universidad Austral',
      subsystem: 'Aseguramiento de Calidad',
      initials: 'IA',
      email: 'ialvarez@austral.edu.ar',
      linkedin: 'https://linkedin.com/in/ignacio-alvarez'
    }
  ]

  const currentPhase = competitionPhases[activePhaseIndex]

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

      {/* 3. FASES DE LA COMPETENCIA (APPLE INTERACTIVE DEEP DIVE) */}
      <section className="py-24 bg-[#0a0a0c] border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="mb-12">
            <p className="text-xs uppercase font-semibold text-[#86868b] tracking-widest mb-2">
              PROCESO DE CALIFICACIÓN OFICIAL
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Las 5 fases de la competencia.
            </h2>
            <p className="text-base text-[#86868b] mt-2 max-w-2xl">
              Cada equipo debe superar rigurosas instancias eliminatorias evaluadas por el comité técnico de CONAE antes de recibir autorización de vuelo en Córdoba.
            </p>
          </div>

          {/* Apple Phase Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            {competitionPhases.map((phase, idx) => (
              <button
                key={phase.step}
                onClick={() => setActivePhaseIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-all flex items-center gap-2 ${
                  activePhaseIndex === idx
                    ? 'bg-white text-black font-semibold shadow-lg shadow-white/10'
                    : 'bg-[#161617] text-[#86868b] border border-white/[0.08] hover:text-white'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">{phase.step}</span>
                <span>{phase.name}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Apple Bento Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhase.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="apple-bento-card p-8 sm:p-12 border-white/[0.12]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Summary and Core Explanation */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#e29b68] px-2.5 py-0.5 rounded-full bg-[#c87d55]/15 border border-[#c87d55]/30">
                      FASE {currentPhase.step}
                    </span>
                    <span className="text-xs text-[#a1a1a6] font-medium">
                      {currentPhase.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                      {currentPhase.fullTitle}
                    </h3>
                    <p className="text-base text-[#e29b68] font-medium mt-1">
                      {currentPhase.summary}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#a1a1a6] leading-relaxed font-normal">
                    {currentPhase.description}
                  </p>

                  <div className="pt-2">
                    <p className="text-xs uppercase font-semibold text-[#86868b] tracking-wider mb-3">
                      Entregables Clave de la Fase:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentPhase.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-[#f5f5f7]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#e29b68] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Key Spec Metric Box & Rules Reference */}
                <div className="lg:col-span-5 bg-[#000000] rounded-2xl p-6 sm:p-8 border border-white/[0.08] flex flex-col justify-between h-full space-y-6">
                  <div>
                    <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider block mb-2">
                      Criterio Técnico Central
                    </span>
                    <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1">
                      {currentPhase.metric}
                    </div>
                    <p className="text-xs text-[#e29b68] font-medium">
                      {currentPhase.metricLabel}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs text-[#86868b] leading-relaxed">
                    <p className="font-semibold text-white mb-1">Estándar de Evaluación:</p>
                    Esta fase requiere aprobación unánime de los evaluadores designados para habilitar al satélite a pasar a la siguiente etapa de desarrollo.
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-[#86868b]">
                    <span>Fase {currentPhase.step} de 05</span>
                    <a 
                      href="https://www.argentina.gob.ar/ciencia/conae/cansat-argentina" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#e29b68] hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>Bases CONAE</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* 4. EQUIPO AUSTRAL (6 PERSONAS DE LA UNIVERSIDAD AUSTRAL CON BIOGRAFÍAS) */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="mb-14 text-center sm:text-left">
          <p className="text-xs uppercase font-semibold text-[#86868b] tracking-widest mb-2">
            TALENTO UNIVERSITARIO • 6 INTEGRANTES
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            El equipo AuSat.
          </h2>
          <p className="text-base text-[#86868b] mt-2 max-w-2xl">
            Somos 6 estudiantes e investigadores de la <strong>Universidad Austral</strong>, comprometidos con el contrato de 6 horas semanales para llevar la ingeniería argentina a la cima de CanSat 2026.
          </p>
        </div>

        {/* 6 Members Grid (2 Columns, Wide Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, i) => (
            <div 
              key={i}
              className="apple-bento-card p-6 sm:p-7 flex flex-col justify-between group hover:border-[#c87d55]/40 transition-all duration-300"
            >
              <div>
                {/* Header: Avatar, Name, Role & Subsystem Badge */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#1f1f23] to-[#2e2e34] border border-white/[0.12] flex items-center justify-center text-sm font-mono font-bold text-white shadow-inner group-hover:border-[#e29b68] transition-colors shrink-0">
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-medium text-[#e29b68]">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[#a1a1a6] border border-white/[0.08] shrink-0">
                    {member.subsystem}
                  </span>
                </div>

                {/* University and Career */}
                <div className="flex items-center gap-1.5 text-xs text-[#86868b] pl-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#6e6e73]" />
                  <span>{member.university} • {member.career}</span>
                </div>
              </div>

              {/* Action Links: LinkedIn & Email */}
              <div className="pt-5 mt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#0077b5]/15 border border-white/[0.08] hover:border-[#0077b5]/40 text-xs font-medium text-[#a1a1a6] hover:text-[#38bdf8] transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] text-xs font-medium text-[#a1a1a6] hover:text-white transition-all font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-[#e29b68]" />
                  <span>{member.email}</span>
                </a>
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
            <p>© 2026 AuSat. Equipo representativo de la Universidad Austral.</p>
            <p>6 estudiantes comprometidos con la ingeniería aeroespacial argentina.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
