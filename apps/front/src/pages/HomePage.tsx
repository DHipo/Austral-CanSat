import React from 'react'
import { motion } from 'motion/react'
import { 
  Rocket, 
  Wind, 
  Egg, 
  ArrowRight, 
  FileText, 
  Activity, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react'
import { handleLinkClick } from '../router/useRouter'

interface HomePageProps {
  navigate: (path: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const competitionPhases = [
    {
      num: '01',
      name: 'Propuesta & PDR',
      full: 'Preliminary Design Review',
      desc: 'Definición de requerimientos de misión, arquitectura conceptual y balance preliminar de masa y potencia.',
      tag: 'Diseño'
    },
    {
      num: '02',
      name: 'Diseño Crítico (CDR)',
      full: 'Critical Design Review',
      desc: 'Validación final de esquemáticos electrónicos, modelo CAD del CanSat, algoritmos de navegación y contratos de equipo.',
      tag: 'Ingeniería'
    },
    {
      num: '03',
      name: 'Ensayos Ambientales',
      full: 'Pruebas de Calificación',
      desc: 'Calificación obligatoria: Drop Test (30G), prueba térmica a 60°C (2h), ensayo de vibración (0-233 Hz) y prueba de vacío.',
      tag: 'Ensayos'
    },
    {
      num: '04',
      name: 'Campaña de Vuelo',
      full: 'Lanzamiento en Cohete',
      desc: 'Integración en el morro del lanzador en el Centro Espacial, eyección en apogeo y despliegue del sistema paraglider.',
      tag: 'Operaciones'
    },
    {
      num: '05',
      name: 'Post-Flight Review',
      full: 'Análisis de Misión',
      desc: 'Evaluación del estado de la carga frágil entregada a 2m, análisis de telemetría recuperada y presentación final.',
      tag: 'Resultados'
    }
  ]

  const teamMembers = [
    {
      name: 'Bautista D\'Hipólito',
      role: 'Líder de Proyecto & Sistemas',
      area: 'Arquitectura & Aviónica',
      initials: 'BD'
    },
    {
      name: 'Equipo de Aviónica',
      role: 'Hardware & Sensores',
      area: 'IMU, Barómetro & Enlace LoRa',
      initials: 'AV'
    },
    {
      name: 'Equipo de Software',
      role: 'Telemetría & Ground Station',
      area: 'Plataforma Orbit & Control',
      initials: 'SW'
    },
    {
      name: 'Equipo Mecánico',
      role: 'Estructura & Paraglider',
      area: 'Chasis PETG & Mecanismo Huevo',
      initials: 'MC'
    },
    {
      name: 'Facultad de Ingeniería',
      role: 'Asesoría Académica',
      area: 'Universidad Austral',
      initials: 'UA'
    }
  ]

  return (
    <div className="bg-[#090a0d] min-h-screen text-slate-200">
      
      {/* 1. HERO / QUIÉNES SOMOS (Minimalista, sobrio y conciso) */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#c87d55]/15 bg-metal-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Official Metallic Medallion */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#c87d55] to-[#b36740] opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />
              <img 
                src="/logo.png" 
                alt="AuSat Insignia Oficial" 
                className="relative w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </motion.div>

          {/* Title & University Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161a24] border border-[#c87d55]/30 text-xs font-mono text-[#e29b68]">
              <span>UNIVERSIDAD AUSTRAL</span>
              <span>•</span>
              <span>COMPETENCIA CANSAT 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">
              AuSat <span className="text-bronze-metallic">— Proyecto Orbit</span>
            </h1>

            {/* Brief and concise text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Somos el equipo representativo de la Universidad Austral para la competencia 
              <strong> CanSat 2026</strong>. Desarrollamos un satélite tamaño lata diseñado 
              para controlar su trayectoria mediante un paraglider autónomo y proteger una 
              carga frágil para su entrega segura a 2 metros del suelo.
            </p>
          </motion.div>

          {/* Minimalist Action Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="/informes"
              onClick={(e) => handleLinkClick(e, '/informes', navigate)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#e29b68] to-[#c87d55] hover:from-[#f3cfb3] hover:to-[#e29b68] transition-all shadow-md shadow-[#c87d55]/20 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Ver Informes del Equipo</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/dashboard"
              onClick={(e) => handleLinkClick(e, '/dashboard', navigate)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-slate-300 bg-[#141722] hover:bg-[#1a1f2e] border border-slate-700/80 hover:border-[#c87d55]/40 transition-all active:scale-95"
            >
              <Activity className="w-4 h-4 text-[#e29b68]" />
              <span>Centro de Telemetría</span>
            </a>
          </motion.div>

        </div>
      </section>

      {/* 2. ¿QUÉ ES LA COMPETENCIA Y CÓMO SE EJECUTA? */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[#e29b68] px-3 py-0.5 rounded-full bg-[#c87d55]/10 border border-[#c87d55]/20">
            EL DESAFÍO TÉCNICO
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            ¿Qué es CanSat y cómo se compite?
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Una competencia aeroespacial universitaria donde cada equipo diseña, construye y opera un satélite funcional a escala reducida.
          </p>
        </div>

        {/* 3 Core Rules / Context Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="metal-panel rounded-2xl p-6 border-metal">
            <div className="w-10 h-10 rounded-xl bg-[#1e2330] border border-[#c87d55]/30 flex items-center justify-center text-[#e29b68] mb-4">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Formato & Restricciones
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              El satélite debe integrarse como el morro del cohete. Tiene límites estrictos de masa de <strong>1000g ± 10g</strong> y dimensiones cilíndricas de 136 mm de diámetro, con autonomía energética superior a 2 horas.
            </p>
          </div>

          <div className="metal-panel rounded-2xl p-6 border-metal">
            <div className="w-10 h-10 rounded-xl bg-[#1e2330] border border-[#c87d55]/30 flex items-center justify-center text-[#e29b68] mb-4">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Navegación Guiada
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tras ser eyectado en el apogeo (~1000m), el CanSat despliega un <strong>paraglider dirigible</strong> con servomotores que corrigen su curso de planeo hacia el punto objetivo de recuperación.
            </p>
          </div>

          <div className="metal-panel rounded-2xl p-6 border-metal">
            <div className="w-10 h-10 rounded-xl bg-[#1e2330] border border-amber-600/30 flex items-center justify-center text-amber-400 mb-4">
              <Egg className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Carga Frágil a 2m
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              El reto culminante: A exactamente <strong>2 metros del suelo</strong>, el satélite debe activar su mecanismo de liberación y depositar un huevo de gallina real (54-64g) sin ninguna rotura ni fisura.
            </p>
          </div>

        </div>

        {/* Fases que deben atravesar los equipos */}
        <div className="metal-panel rounded-2xl p-6 sm:p-8 border-metal">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white font-heading mb-1">
              Fases de Evaluación y Calificación
            </h3>
            <p className="text-xs text-slate-400">
              Cada equipo debe aprobar rigurosas instancias eliminatorias antes de recibir autorización de vuelo:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {competitionPhases.map((phase) => (
              <div 
                key={phase.num}
                className="p-4 rounded-xl bg-[#10131b] border border-slate-800/80 hover:border-[#c87d55]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#e29b68]">{phase.num}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{phase.tag}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{phase.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono mb-2">{phase.full}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#e29b68]" />
              <span>Ensayos de calificación: Drop Test 30G • Térmico 60°C • Vibración 0-233 Hz • Vacío</span>
            </div>
            <a 
              href="https://www.argentina.gob.ar/ciencia/conae/cansat-argentina" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 text-[#e29b68] hover:underline"
            >
              <span>Bases Oficiales CONAE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </section>

      {/* 3. INTEGRANTES DEL EQUIPO */}
      <section className="py-20 border-t border-slate-900 bg-[#0d0f14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase font-mono font-semibold tracking-wider text-[#e29b68]">
              TALENTO AUSTRAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Integrantes del Proyecto AuSat
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Estudiantes e investigadores de la Universidad Austral comprometidos con las 6 horas mínimas semanales del contrato de equipo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {teamMembers.map((member, i) => (
              <div 
                key={i}
                className="metal-panel rounded-xl p-5 border-metal text-center hover:border-[#c87d55]/40 transition-all flex flex-col items-center justify-between"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#1b202c] to-[#252c3d] border border-[#c87d55]/40 flex items-center justify-center text-sm font-mono font-bold text-[#e29b68] mb-3 shadow-inner">
                  {member.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{member.name}</h4>
                  <p className="text-xs text-[#e29b68] font-mono mt-0.5">{member.role}</p>
                  <p className="text-[11px] text-slate-400 mt-2">{member.area}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="border-t border-slate-900 bg-[#07080a] py-12 text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="AuSat" className="w-8 h-8 object-contain" />
            <div>
              <p className="font-heading font-bold text-white text-sm">AuSat • Proyecto Orbit</p>
              <p className="text-[11px] text-slate-500">Universidad Austral • Competencia CanSat 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <a 
              href="/informes" 
              onClick={(e) => handleLinkClick(e, '/informes', navigate)}
              className="hover:text-[#e29b68] transition-colors"
            >
              Informes
            </a>
            <a 
              href="/todo" 
              onClick={(e) => handleLinkClick(e, '/todo', navigate)}
              className="hover:text-[#e29b68] transition-colors"
            >
              Tareas
            </a>
            <a 
              href="/dashboard" 
              onClick={(e) => handleLinkClick(e, '/dashboard', navigate)}
              className="hover:text-[#e29b68] transition-colors"
            >
              Telemetría
            </a>
          </div>

          <p className="text-slate-500 text-[11px]">
            © 2026 AuSat Team. Todos los derechos reservados.
          </p>
        </div>
      </footer>

    </div>
  )
}
