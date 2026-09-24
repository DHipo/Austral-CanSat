import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Download, 
  Printer, 
  Calendar, 
  User, 
  ArrowLeft, 
  Eye, 
  Edit3, 
  Trash2, 
  Check, 
  BookOpen
} from 'lucide-react'

export interface ReportItem {
  id: string
  title: string
  subtitle: string
  author: string
  date: string
  category: 'Investigación' | 'PDR / CDR' | 'Minuta de Reunión' | 'Ensayo Ambiental' | 'Contrato'
  subsystem: 'Aviónica' | 'Mecánica & Paraglider' | 'Software & Telemetría' | 'Carga Crítica (Huevo)' | 'General'
  objective: string
  findings: string
  conclusions: string
  nextSteps: string
}

const DEFAULT_REPORTS: ReportItem[] = [
  {
    id: 'rep-001',
    title: 'Análisis de Requisitos y CONOP Competencia CanSat',
    subtitle: 'Extracción de requerimientos críticos del reporte 2025: masa, paraglider y entrega a 2m.',
    author: 'Bautista D\'Hipólito',
    date: '2026-05-20',
    category: 'Investigación',
    subsystem: 'General',
    objective: 'Analizar las bases técnicas y lecciones aprendidas de la competencia previa para dimensionar los subsistemas de Orbit.',
    findings: `1. Masa y Volumen: Masa estricta de 1000g ± 10g. El CanSat actúa como morro del cohete lanzador con 136 mm de hombro.
2. Vuelo y Descenso: Eyección en apogeo (~1000m). Descenso inicial en paracaídas (≤15 m/s) y despliegue de paraglider guiado al 80% de altitud (5 m/s).
3. Carga Frágil (Huevo): A 2 metros de altitud, el satélite debe activar la liberación mecánica de un huevo de gallina real (54-64g) sin sufrir ninguna fisura.
4. Pruebas Ambientales Obligatorias: Calificación por Drop Test (30G), horno térmico a 60°C por 2 horas, vibración con lijadora orbital (0-233 Hz) y prueba de vacío.`,
    conclusions: 'El diferencial competitivo de AuSat radicará en el control aerodinámico de planeo con el paraglider y un mecanismo de amortiguación neumática/resorte para el huevo a 2m.',
    nextSteps: 'Comenzar diseño CAD del mecanismo de pestillo para el huevo y pruebas de servomotores MG90S con paraglider a escala.'
  },
  {
    id: 'rep-002',
    title: 'Minuta de Reunión con Asesor Docente',
    subtitle: 'Definición de compromisos de equipo, presupuesto inicial y cronograma preliminar.',
    author: 'Equipo AuSat',
    date: '2026-05-17',
    category: 'Minuta de Reunión',
    subsystem: 'General',
    objective: 'Alinear expectativas con el profesor Fernando Litchstein sobre el reglamento, dedicación horaria y financiamiento.',
    findings: `1. Contrato de Equipo: Se fijó una dedicación mínima de 6 horas semanales y respuesta a mensajes en menos de 24 horas.
2. Financiamiento Inicial: Contribución individual de 30 USD para adquisición temprana de sensores y radios LoRa.
3. Foco Técnico: El asesor remarcó destacar en un aspecto específico del satélite: aprovechar lo que ya funciona y perfeccionar la precisión de aterrizaje y protección de carga.`,
    conclusions: 'El equipo formalizó su estructura de trabajo y se aprobó el cronograma de diseño preliminar (PDR).',
    nextSteps: 'Firmar contrato de convivencia por todos los integrantes y crear el repositorio oficial con estructura de investigación.'
  },
  {
    id: 'rep-003',
    title: 'Estudio de Radiocomunicaciones LoRa vs XBee',
    subtitle: 'Comparativa de alcance, consumo y modulación para telemetría a 1 Hz en 915 MHz.',
    author: 'Equipo de Aviónica',
    date: '2026-06-02',
    category: 'Investigación',
    subsystem: 'Aviónica',
    objective: 'Seleccionar la tecnología de enlace de radio óptima para transmitir paquetes ASCII a la estación terrena durante el vuelo.',
    findings: `1. XBee Pro 900MHz: Buena fiabilidad pero alto costo y consumo peak elevado.
2. LoRa SX1262 (915 MHz): Excelente sensibilidad (-148 dBm), bajo consumo y capacidad de operar con potencia de 100mW permitida por ENACOM.
3. Antena: Se evaluó antena monopolo de 1/4 de onda flexible para montaje exterior en el chasis cilíndrico.`,
    conclusions: 'Se adopta el módulo SX1262 con microcontrolador ESP32-S3 como computadora de a bordo por su doble núcleo y bus SPI veloz.',
    nextSteps: 'Diseñar el PCB preliminar de aviónica integrando IMU MPU-6050 y barómetro BMP280.'
  }
]

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('ausat_reports_v1')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error loading reports', e)
      }
    }
    return DEFAULT_REPORTS
  })

  const [activeReport, setActiveReport] = useState<ReportItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('TODOS')

  const [formData, setFormData] = useState<ReportItem>({
    id: '',
    title: '',
    subtitle: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Investigación',
    subsystem: 'General',
    objective: '',
    findings: '',
    conclusions: '',
    nextSteps: ''
  })

  useEffect(() => {
    localStorage.setItem('ausat_reports_v1', JSON.stringify(reports))
  }, [reports])

  const handleStartCreate = () => {
    setFormData({
      id: `rep-${Date.now().toString().slice(-4)}`,
      title: '',
      subtitle: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Investigación',
      subsystem: 'General',
      objective: '',
      findings: '',
      conclusions: '',
      nextSteps: ''
    })
    setIsEditing(true)
    setActiveReport(null)
  }

  const handleStartEdit = (report: ReportItem) => {
    setFormData({ ...report })
    setIsEditing(true)
  }

  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    setReports(prev => {
      const exists = prev.some(r => r.id === formData.id)
      if (exists) {
        return prev.map(r => r.id === formData.id ? formData : r)
      } else {
        return [formData, ...prev]
      }
    })

    setActiveReport(formData)
    setIsEditing(false)
  }

  const handleDeleteReport = (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este informe?')) {
      setReports(prev => prev.filter(r => r.id !== id))
      if (activeReport?.id === id) {
        setActiveReport(null)
      }
    }
  }

  const handleDownloadMarkdown = (report: ReportItem) => {
    const slug = report.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    const filename = `${report.date}_${slug}.md`

    const mdContent = `# Investigation Summary: [${report.title}]

- **Author:** [${report.author}]
- **Date:** ${report.date}
- **Category:** ${report.category}
- **Subsystem:** ${report.subsystem}

## 1. Objective
${report.objective}

## 2. Findings / Research
${report.findings}

## 3. Conclusions
${report.conclusions}

## 4. Next Steps
${report.nextSteps}

---
*Documento oficial generado desde la plataforma AuSat Orbit (Universidad Austral - CanSat 2026)*
`
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    window.print()
  }

  const filteredReports = reports.filter(r => {
    const matchesSearch = 
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.findings.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = categoryFilter === 'TODOS' || r.category === categoryFilter
    return matchesSearch && matchesCat
  })

  return (
    <div className="bg-[#000000] min-h-screen text-[#f5f5f7]">
      
      {/* ========================================================================= */}
      {/* MODO 1: VISTA DE DOCUMENTO FORMAL APPLE-STYLE */}
      {/* ========================================================================= */}
      {activeReport && !isEditing ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          
          {/* Top Control Bar (Apple Pill Actions) */}
          <div className="no-print flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <button
              onClick={() => setActiveReport(null)}
              className="apple-pill-secondary px-4 py-2 text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a Informes</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleStartEdit(activeReport)}
                className="apple-pill-secondary px-4 py-2 text-xs flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#e29b68]" />
                <span>Editar</span>
              </button>

              <button
                onClick={() => handleDownloadMarkdown(activeReport)}
                className="apple-pill-secondary px-4 py-2 text-xs flex items-center gap-1.5 text-[#e29b68]"
                title="Descargar Markdown para commitear al repo"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar .md</span>
              </button>

              <button
                onClick={handlePrint}
                className="apple-pill-primary px-5 py-2 text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Guardar PDF</span>
              </button>
            </div>
          </div>

          {/* DOCUMENT SHEET WITH WATERMARK & COVER */}
          <div className="print-document relative bg-[#121214] print:bg-white text-[#f5f5f7] print:text-black border border-white/[0.08] print:border-none rounded-[2rem] p-8 sm:p-14 shadow-2xl overflow-hidden">
            
            {/* WATERMARK: Large Centered Medallion */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
              <img 
                src="/logo.png" 
                alt="AuSat Watermark" 
                className="w-[450px] h-[450px] object-contain opacity-[0.035] print:opacity-[0.05] filter grayscale contrast-125" 
              />
            </div>

            {/* Document Content */}
            <div className="relative z-10 space-y-12">
              
              {/* --- PORTADA / HEADER FORMAL --- */}
              <div className="border-b border-white/[0.1] print:border-slate-300 pb-8">
                
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3.5">
                    <img 
                      src="/logo.png" 
                      alt="AuSat Logo" 
                      className="w-14 h-14 object-contain" 
                    />
                    <div>
                      <p className="font-bold text-base text-white print:text-black tracking-tight">
                        AuSat • PROYECTO ORBIT
                      </p>
                      <p className="text-xs text-[#e29b68] print:text-amber-800 font-medium">
                        Universidad Austral • Competencia CanSat 2026
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-xs text-[#86868b] print:text-slate-600 font-mono space-y-0.5">
                    <p className="font-semibold text-white print:text-black">REPORTE TÉCNICO</p>
                    <p>DOC ID: <span className="text-[#e29b68] font-bold">{activeReport.id.toUpperCase()}</span></p>
                    <p>FECHA: {activeReport.date}</p>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mt-8 space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] text-[#a1a1a6] text-xs font-medium border border-white/[0.08]">
                    <span>{activeReport.category}</span>
                    <span>•</span>
                    <span>{activeReport.subsystem}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold text-white print:text-black tracking-tight leading-tight">
                    {activeReport.title}
                  </h1>

                  <p className="text-base text-[#86868b] print:text-slate-700 font-normal leading-relaxed">
                    {activeReport.subtitle}
                  </p>
                </div>

                {/* Metadata Strip */}
                <div className="mt-8 p-4 rounded-2xl bg-black/40 print:bg-slate-100 border border-white/[0.06] print:border-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[#86868b] print:text-slate-600 block text-[10px] uppercase">Autor</span>
                    <span className="font-semibold text-white print:text-black">{activeReport.author}</span>
                  </div>
                  <div>
                    <span className="text-[#86868b] print:text-slate-600 block text-[10px] uppercase">Subsistema</span>
                    <span className="font-semibold text-[#e29b68] print:text-amber-900">{activeReport.subsystem}</span>
                  </div>
                  <div>
                    <span className="text-[#86868b] print:text-slate-600 block text-[10px] uppercase">Estado</span>
                    <span className="font-semibold text-emerald-400 print:text-emerald-700">Aprobado</span>
                  </div>
                  <div>
                    <span className="text-[#86868b] print:text-slate-600 block text-[10px] uppercase">Versión</span>
                    <span className="font-semibold text-white print:text-black">v1.0 (Oficial)</span>
                  </div>
                </div>

              </div>

              {/* --- CUERPO --- */}
              <div className="space-y-8 text-sm sm:text-base text-[#e5e5ea] print:text-slate-800 leading-relaxed font-normal">
                
                <section>
                  <h2 className="text-lg font-bold text-white print:text-black tracking-tight mb-2 flex items-center gap-2">
                    <span className="text-[#e29b68] font-mono text-sm">01.</span>
                    <span>Objetivo</span>
                  </h2>
                  <p className="whitespace-pre-line text-[#a1a1a6] print:text-slate-800">
                    {activeReport.objective}
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-white print:text-black tracking-tight mb-2 flex items-center gap-2">
                    <span className="text-[#e29b68] font-mono text-sm">02.</span>
                    <span>Desarrollo Técnico y Resultados</span>
                  </h2>
                  <div className="p-4 rounded-xl bg-black/30 print:bg-slate-50 border border-white/[0.06] print:border-slate-200">
                    <p className="whitespace-pre-line font-mono text-xs sm:text-sm text-[#e5e5ea] print:text-slate-800 leading-relaxed">
                      {activeReport.findings}
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-white print:text-black tracking-tight mb-2 flex items-center gap-2">
                    <span className="text-[#e29b68] font-mono text-sm">03.</span>
                    <span>Conclusiones Principales</span>
                  </h2>
                  <p className="whitespace-pre-line text-[#a1a1a6] print:text-slate-800">
                    {activeReport.conclusions}
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-bold text-white print:text-black tracking-tight mb-2 flex items-center gap-2">
                    <span className="text-[#e29b68] font-mono text-sm">04.</span>
                    <span>Próximos Pasos</span>
                  </h2>
                  <p className="whitespace-pre-line text-[#a1a1a6] print:text-slate-800">
                    {activeReport.nextSteps}
                  </p>
                </section>

              </div>

              {/* --- PIE FORMAL --- */}
              <div className="pt-8 border-t border-white/[0.08] print:border-slate-300 flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868b] print:text-slate-500 gap-2">
                <span>AuSat • CanSat Argentina 2026 • Universidad Austral</span>
                <span>Documento de Ingeniería Oficial</span>
              </div>

            </div>
          </div>

        </div>
      ) : null}

      {/* ========================================================================= */}
      {/* MODO 2: FORMULARIO CREADOR / EDITOR APPLE STYLE */}
      {/* ========================================================================= */}
      {isEditing ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {formData.title ? 'Editar Informe' : 'Redactar Nuevo Informe Técnico'}
              </h2>
              <p className="text-xs text-[#86868b] mt-0.5">
                Generador oficial con portada, marca de agua institucional y exportación Markdown.
              </p>
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className="apple-pill-secondary px-4 py-1.5 text-xs"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSaveReport} className="apple-bento-card p-6 sm:p-10 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#a1a1a6] mb-1.5">TÍTULO DEL INFORME *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Calibración del Sensor de Altitud y Despliegue de Huevo"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/[0.1] text-white text-sm focus:border-white/[0.3] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a1a1a6] mb-1.5">AUTOR / INVESTIGADOR *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Nombre de la persona o sub-equipo"
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/[0.1] text-white text-sm focus:border-white/[0.3] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a1a1a6] mb-1.5">DE QUÉ SE TRATA (SUBTÍTULO / RESUMEN) *</label>
              <input 
                type="text" 
                required
                placeholder="Breve descripción del alcance del reporte para la portada"
                value={formData.subtitle}
                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/[0.1] text-white text-sm focus:border-white/[0.3] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#a1a1a6] mb-1.5">CATEGORÍA</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/[0.1] text-white text-xs focus:border-white/[0.3] focus:outline-none"
                >
                  <option value="Investigación">Investigación</option>
                  <option value="PDR / CDR">PDR / CDR</option>
                  <option value="Ensayo Ambiental">Ensayo Ambiental</option>
                  <option value="Minuta de Reunión">Minuta de Reunión</option>
                  <option value="Contrato">Contrato</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a1a1a6] mb-1.5">SUBSISTEMA</label>
                <select
                  value={formData.subsystem}
                  onChange={e => setFormData({ ...formData, subsystem: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/[0.1] text-white text-xs focus:border-white/[0.3] focus:outline-none"
                >
                  <option value="General">General</option>
                  <option value="Aviónica">Aviónica & Sensores</option>
                  <option value="Mecánica & Paraglider">Mecánica & Paraglider</option>
                  <option value="Software & Telemetría">Software & Telemetría</option>
                  <option value="Carga Crítica (Huevo)">Carga Crítica (Huevo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#a1a1a6] mb-1.5">FECHA</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/[0.1] text-white text-xs focus:border-white/[0.3] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a1a1a6] mb-1.5">1. OBJETIVO *</label>
              <textarea
                required
                rows={3}
                placeholder="¿Qué se buscaba investigar o solucionar?"
                value={formData.objective}
                onChange={e => setFormData({ ...formData, objective: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/[0.1] text-white text-sm focus:border-white/[0.3] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a1a1a6] mb-1.5">2. DESARROLLO, PRUEBAS Y RESULTADOS *</label>
              <textarea
                required
                rows={5}
                placeholder="Detalla las investigaciones, pruebas o mediciones..."
                value={formData.findings}
                onChange={e => setFormData({ ...formData, findings: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/[0.1] text-white text-sm focus:border-white/[0.3] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a1a1a6] mb-1.5">3. CONCLUSIONES *</label>
              <textarea
                required
                rows={3}
                placeholder="Resumen de aprendizajes..."
                value={formData.conclusions}
                onChange={e => setFormData({ ...formData, conclusions: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/[0.1] text-white text-sm focus:border-white/[0.3] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#a1a1a6] mb-1.5">4. PRÓXIMOS PASOS</label>
              <textarea
                rows={2}
                placeholder="Acciones resultantes..."
                value={formData.nextSteps}
                onChange={e => setFormData({ ...formData, nextSteps: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/[0.1] text-white text-sm focus:border-white/[0.3] focus:outline-none font-mono"
              />
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="apple-pill-secondary px-5 py-2.5 text-xs"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="apple-pill-primary px-7 py-2.5 text-xs font-semibold flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Guardar y Ver Documento</span>
              </button>
            </div>

          </form>
        </div>
      ) : null}

      {/* ========================================================================= */}
      {/* MODO 3: LISTA GENERAL DE INFORMES APPLE BENTO */}
      {/* ========================================================================= */}
      {!activeReport && !isEditing ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-8 border-b border-white/[0.08]">
            <div>
              <p className="text-xs uppercase font-semibold text-[#86868b] tracking-widest mb-1.5">
                CENTRO DOCUMENTAL
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Informes de Misión.
              </h1>
              <p className="text-sm sm:text-base text-[#86868b] mt-1 max-w-xl">
                Repositorio unificado de investigaciones, minutas y entregables oficiales de AuSat.
              </p>
            </div>

            <button
              onClick={handleStartCreate}
              className="apple-pill-primary px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Informe</span>
            </button>
          </div>

          {/* Search & Apple Pill Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar por título, autor o contenido..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#161617] border border-white/[0.08] text-sm text-white placeholder-[#86868b] focus:border-white/[0.2] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['TODOS', 'Investigación', 'PDR / CDR', 'Ensayo Ambiental', 'Minuta de Reunión'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    categoryFilter === cat
                      ? 'bg-white text-black'
                      : 'bg-[#161617] text-[#86868b] border border-white/[0.08] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Reports Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div 
                key={report.id}
                className="apple-bento-card p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 text-xs font-medium">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[#a1a1a6] border border-white/[0.08]">
                      {report.category}
                    </span>
                    <span className="text-[#86868b] flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#f5f5f7] transition-colors mb-2 leading-snug">
                    {report.title}
                  </h3>

                  <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed mb-6">
                    {report.subtitle}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/[0.06] space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#86868b]">
                    <span className="flex items-center gap-1.5 text-[#f5f5f7]">
                      <User className="w-3.5 h-3.5 text-[#e29b68]" />
                      <span className="truncate max-w-[130px]">{report.author}</span>
                    </span>
                    <span className="text-[11px] text-[#6e6e73]">{report.subsystem}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveReport(report)}
                      className="flex-1 apple-pill-primary py-2 text-xs flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Documento</span>
                    </button>

                    <button
                      onClick={() => handleDownloadMarkdown(report)}
                      title="Descargar .md"
                      className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#a1a1a6] hover:text-white transition-colors border border-white/[0.08]"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      title="Eliminar"
                      className="p-2 rounded-full bg-white/[0.06] hover:bg-red-950/60 text-[#a1a1a6] hover:text-red-400 transition-colors border border-white/[0.08]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-20 apple-bento-card">
              <BookOpen className="w-8 h-8 text-[#86868b] mx-auto mb-3" />
              <p className="text-white font-semibold text-sm">No se encontraron informes</p>
              <p className="text-xs text-[#86868b] mt-1">Prueba con otro término de búsqueda o crea uno nuevo.</p>
            </div>
          )}

        </div>
      ) : null}

    </div>
  )
}
