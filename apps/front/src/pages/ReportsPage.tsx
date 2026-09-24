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

  // Form State
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
*Documento generado desde la plataforma oficial AuSat Orbit (Universidad Austral - CanSat 2026)*
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
    <div className="bg-[#090a0d] min-h-screen text-slate-200">
      
      {/* ========================================================================= */}
      {/* MODO 1: VISTA DE DOCUMENTO OFICIAL FORMAL (CON PORTADA, WATERMARK Y HEADER) */}
      {/* ========================================================================= */}
      {activeReport && !isEditing ? (
        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* Top Control Bar (Hidden when printing) */}
          <div className="no-print flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <button
              onClick={() => setActiveReport(null)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 bg-[#141722] hover:bg-[#1a1f2e] border border-slate-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Lista</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleStartEdit(activeReport)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 bg-[#161a24] hover:bg-slate-800 border border-slate-700 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#e29b68]" />
                <span>Editar</span>
              </button>

              <button
                onClick={() => handleDownloadMarkdown(activeReport)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-[#f3cfb3] bg-[#c87d55]/20 hover:bg-[#c87d55]/30 border border-[#c87d55]/50 transition-all"
                title="Descargar archivo Markdown formateado para commitear al repo"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar .md</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-[#e29b68] to-[#c87d55] hover:from-[#f3cfb3] hover:to-[#e29b68] transition-all shadow-md shadow-[#c87d55]/20 active:scale-95"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / Guardar PDF</span>
              </button>
            </div>
          </div>

          {/* OFFICIAL FORMAL REPORT SHEET (A4 Document Style with Watermark & Cover Page) */}
          <div className="print-document relative bg-[#0f121a] print:bg-white text-slate-100 print:text-slate-900 border border-[#c87d55]/30 print:border-none rounded-2xl p-8 sm:p-14 shadow-2xl overflow-hidden">
            
            {/* WATERMARK: Large Centered Semi-Transparent Team Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
              <img 
                src="/logo.png" 
                alt="AuSat Watermark" 
                className="w-[450px] h-[450px] object-contain opacity-[0.04] print:opacity-[0.06] filter grayscale contrast-125" 
              />
            </div>

            {/* Content layer above watermark */}
            <div className="relative z-10 space-y-12">
              
              {/* --- PORTADA / ENCABEZADO FORMAL --- */}
              <div className="border-b-2 border-[#c87d55]/40 pb-8">
                
                {/* Header Row: Logo & Mission Tag */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src="/logo.png" 
                      alt="AuSat Logo" 
                      className="w-16 h-16 object-contain drop-shadow-md" 
                    />
                    <div>
                      <p className="font-heading font-extrabold text-lg text-white print:text-slate-950 tracking-wider">
                        AuSat • PROYECTO ORBIT
                      </p>
                      <p className="text-xs font-mono text-[#e29b68] print:text-amber-800 font-semibold">
                        Universidad Austral • Competencia CanSat 2026
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs text-slate-400 print:text-slate-600 space-y-0.5">
                    <p className="font-bold text-white print:text-slate-900">REPORTE TÉCNICO OFICIAL</p>
                    <p>DOC ID: <span className="text-[#e29b68] font-bold">{activeReport.id.toUpperCase()}</span></p>
                    <p>FECHA: {activeReport.date}</p>
                  </div>
                </div>

                {/* Report Title & Subtitle */}
                <div className="mt-8 space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#c87d55]/15 border border-[#c87d55]/30 text-[#e29b68] text-xs font-mono">
                    <span>{activeReport.category.toUpperCase()}</span>
                    <span>•</span>
                    <span>{activeReport.subsystem.toUpperCase()}</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white print:text-slate-950 font-heading leading-tight">
                    {activeReport.title}
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 print:text-slate-700 italic leading-relaxed">
                    {activeReport.subtitle}
                  </p>
                </div>

                {/* Author Metadata Box */}
                <div className="mt-8 p-4 rounded-xl bg-[#141724] print:bg-slate-100 border border-slate-800 print:border-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 print:text-slate-600 block text-[10px]">AUTOR</span>
                    <span className="font-bold text-white print:text-slate-900">{activeReport.author}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 print:text-slate-600 block text-[10px]">SUBSISTEMA</span>
                    <span className="font-bold text-[#e29b68] print:text-amber-900">{activeReport.subsystem}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 print:text-slate-600 block text-[10px]">ESTADO</span>
                    <span className="font-bold text-emerald-400 print:text-emerald-700">APROBADO</span>
                  </div>
                  <div>
                    <span className="text-slate-400 print:text-slate-600 block text-[10px]">VERSIÓN</span>
                    <span className="font-bold text-white print:text-slate-900">v1.0 (Final)</span>
                  </div>
                </div>

              </div>

              {/* --- CUERPO DEL INFORME --- */}
              <div className="space-y-8 text-sm sm:text-base text-slate-200 print:text-slate-800 leading-relaxed">
                
                {/* 1. Objetivo */}
                <section>
                  <h2 className="text-lg font-bold text-white print:text-slate-950 font-heading flex items-center gap-2 mb-3 pb-1 border-b border-slate-800 print:border-slate-300">
                    <span className="text-[#e29b68] font-mono">1.</span>
                    <span>Objetivo de la Investigación / Tarea</span>
                  </h2>
                  <p className="whitespace-pre-line text-slate-300 print:text-slate-800">
                    {activeReport.objective}
                  </p>
                </section>

                {/* 2. Hallazgos / Pruebas */}
                <section>
                  <h2 className="text-lg font-bold text-white print:text-slate-950 font-heading flex items-center gap-2 mb-3 pb-1 border-b border-slate-800 print:border-slate-300">
                    <span className="text-[#e29b68] font-mono">2.</span>
                    <span>Desarrollo Técnico y Resultados</span>
                  </h2>
                  <div className="p-4 rounded-xl bg-[#121622] print:bg-slate-50 border border-slate-800/80 print:border-slate-200">
                    <p className="whitespace-pre-line font-mono text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                      {activeReport.findings}
                    </p>
                  </div>
                </section>

                {/* 3. Conclusiones */}
                <section>
                  <h2 className="text-lg font-bold text-white print:text-slate-950 font-heading flex items-center gap-2 mb-3 pb-1 border-b border-slate-800 print:border-slate-300">
                    <span className="text-[#e29b68] font-mono">3.</span>
                    <span>Conclusiones Principales</span>
                  </h2>
                  <p className="whitespace-pre-line text-slate-300 print:text-slate-800">
                    {activeReport.conclusions}
                  </p>
                </section>

                {/* 4. Próximos Pasos */}
                <section>
                  <h2 className="text-lg font-bold text-white print:text-slate-950 font-heading flex items-center gap-2 mb-3 pb-1 border-b border-slate-800 print:border-slate-300">
                    <span className="text-[#e29b68] font-mono">4.</span>
                    <span>Próximos Pasos & Acciones Recomendadas</span>
                  </h2>
                  <p className="whitespace-pre-line text-slate-300 print:text-slate-800">
                    {activeReport.nextSteps}
                  </p>
                </section>

              </div>

              {/* --- PIE DE PÁGINA FORMAL DEL DOCUMENTO --- */}
              <div className="pt-10 mt-12 border-t border-slate-800 print:border-slate-300 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 print:text-slate-500 gap-2">
                <span>AuSat • CanSat Argentina 2026 • Universidad Austral</span>
                <span>Documento de Ingeniería Oficial — Confidencial para el Equipo</span>
              </div>

            </div>
          </div>

        </div>
      ) : null}

      {/* ========================================================================= */}
      {/* MODO 2: EDITOR / CREADOR DE INFORME FORMAL */}
      {/* ========================================================================= */}
      {isEditing ? (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold font-heading text-white">
                {formData.title ? 'Editar Informe' : 'Redactar Nuevo Informe Técnico'}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Generador de informes oficial con portada, marca de agua institucional y exportación Markdown.
              </p>
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-700"
            >
              Cancelar
            </button>
          </div>

          <form onSubmit={handleSaveReport} className="metal-panel rounded-2xl p-6 sm:p-8 space-y-6 border-metal">
            
            {/* Header info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">TÍTULO DEL INFORME *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Calibración del Sensor de Altitud y Despliegue de Huevo"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-slate-700 text-white text-sm focus:border-[#e29b68] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">AUTOR / INVESTIGADOR *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Nombre de la persona o sub-equipo"
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-slate-700 text-white text-sm focus:border-[#e29b68] focus:outline-none"
                />
              </div>
            </div>

            {/* Subtitle / Description */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">DE QUÉ SE TRATA (SUBTÍTULO / RESUMEN) *</label>
              <input 
                type="text" 
                required
                placeholder="Breve descripción del alcance del reporte para la portada"
                value={formData.subtitle}
                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-slate-700 text-white text-sm focus:border-[#e29b68] focus:outline-none"
              />
            </div>

            {/* Category, Subsystem, Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">CATEGORÍA</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-slate-700 text-white text-sm focus:border-[#e29b68] focus:outline-none"
                >
                  <option value="Investigación">Investigación</option>
                  <option value="PDR / CDR">PDR / CDR</option>
                  <option value="Ensayo Ambiental">Ensayo Ambiental</option>
                  <option value="Minuta de Reunión">Minuta de Reunión</option>
                  <option value="Contrato">Contrato</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">SUBSISTEMA</label>
                <select
                  value={formData.subsystem}
                  onChange={e => setFormData({ ...formData, subsystem: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-slate-700 text-white text-sm focus:border-[#e29b68] focus:outline-none"
                >
                  <option value="General">General</option>
                  <option value="Aviónica">Aviónica & Sensores</option>
                  <option value="Mecánica & Paraglider">Mecánica & Paraglider</option>
                  <option value="Software & Telemetría">Software & Telemetría</option>
                  <option value="Carga Crítica (Huevo)">Carga Crítica (Huevo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">FECHA (YYYY-MM-DD)</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-slate-700 text-white text-sm focus:border-[#e29b68] focus:outline-none"
                />
              </div>
            </div>

            {/* Sections of the Report */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">1. OBJETIVO *</label>
              <textarea
                required
                rows={3}
                placeholder="¿Qué se buscaba investigar o solucionar?"
                value={formData.objective}
                onChange={e => setFormData({ ...formData, objective: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-slate-700 text-white text-sm focus:border-[#e29b68] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">2. DESARROLLO, PRUEBAS Y RESULTADOS *</label>
              <textarea
                required
                rows={5}
                placeholder="Detalla las investigaciones, pruebas de laboratorio, mediciones o datos obtenidos..."
                value={formData.findings}
                onChange={e => setFormData({ ...formData, findings: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-slate-700 text-white text-sm focus:border-[#e29b68] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">3. CONCLUSIONES *</label>
              <textarea
                required
                rows={3}
                placeholder="Resumen de aprendizajes o decisiones tomadas..."
                value={formData.conclusions}
                onChange={e => setFormData({ ...formData, conclusions: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-slate-700 text-white text-sm focus:border-[#e29b68] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">4. PRÓXIMOS PASOS</label>
              <textarea
                rows={2}
                placeholder="Acciones resultantes o tareas a coordinar..."
                value={formData.nextSteps}
                onChange={e => setFormData({ ...formData, nextSteps: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#090b10] border border-slate-700 text-white text-sm focus:border-[#e29b68] focus:outline-none font-mono"
              />
            </div>

            {/* Save Buttons */}
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 bg-slate-900 hover:bg-slate-800 border border-slate-700"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#e29b68] to-[#c87d55] hover:from-[#f3cfb3] hover:to-[#e29b68] transition-all shadow-md shadow-[#c87d55]/20 active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Guardar y Ver Documento</span>
              </button>
            </div>

          </form>
        </div>
      ) : null}

      {/* ========================================================================= */}
      {/* MODO 3: LISTA GENERAL DE INFORMES CENTRALIZADOS */}
      {/* ========================================================================= */}
      {!activeReport && !isEditing ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#e29b68] animate-pulse"></span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#e29b68]">
                  GESTIÓN DOCUMENTAL CENTRALIZADA
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white font-heading">
                Informes del Proyecto Orbit
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Repositorio unificado de investigaciones, minutas de reunión y entregables oficiales de AuSat con formato institucional.
              </p>
            </div>

            <button
              onClick={handleStartCreate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#e29b68] to-[#c87d55] hover:from-[#f3cfb3] hover:to-[#e29b68] transition-all shadow-md shadow-[#c87d55]/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Redactar Nuevo Informe</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar por título, autor o contenido..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#12151e] border border-slate-800 text-sm text-white placeholder-slate-500 focus:border-[#e29b68] focus:outline-none"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {['TODOS', 'Investigación', 'PDR / CDR', 'Ensayo Ambiental', 'Minuta de Reunión'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                    categoryFilter === cat
                      ? 'bg-[#c87d55]/25 text-[#f3cfb3] border border-[#c87d55]/50'
                      : 'bg-[#12151e] text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div 
                key={report.id}
                className="metal-panel rounded-2xl p-6 border-metal hover:border-[#c87d55]/40 transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Category & Date */}
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#c87d55]/15 text-[#e29b68] border border-[#c87d55]/30">
                      {report.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-[#f3cfb3] transition-colors mb-2 leading-snug">
                    {report.title}
                  </h3>

                  {/* Subtitle / summary */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {report.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <User className="w-3.5 h-3.5 text-[#e29b68]" />
                      <span className="truncate max-w-[130px]">{report.author}</span>
                    </span>
                    <span className="text-[11px] text-slate-500">{report.subsystem}</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => setActiveReport(report)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-900 bg-[#e29b68] hover:bg-[#f3cfb3] transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Documento</span>
                    </button>

                    <button
                      onClick={() => handleDownloadMarkdown(report)}
                      title="Descargar .md"
                      className="p-1.5 rounded-lg bg-[#141724] hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      title="Eliminar"
                      className="p-1.5 rounded-lg bg-[#141724] hover:bg-red-950/60 border border-slate-700 hover:border-red-800 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-16 metal-panel rounded-2xl border-metal">
              <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-300 font-semibold text-sm">No se encontraron informes</p>
              <p className="text-xs text-slate-500 mt-1">Prueba con otro término de búsqueda o crea uno nuevo.</p>
            </div>
          )}

        </div>
      ) : null}

    </div>
  )
}
