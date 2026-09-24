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
  BookOpen,
  Bold,
  List,
  ListOrdered,
  Code,
  FileText,
  Tag,
  CheckCircle2
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
    author: 'Mateo Fernández',
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

const TEAM_MEMBERS_QUICK = [
  'Bautista D\'Hipólito',
  'Mateo Fernández',
  'Sofía Rossi',
  'Lucas Benítez',
  'Valentina Gómez',
  'Ignacio Álvarez',
  'Equipo AuSat'
]

// Professional Engineering Textarea Component
interface ProfessionalTextareaProps {
  step: string
  label: string
  helper: string
  value: string
  onChange: (val: string) => void
  placeholder: string
  rows?: number
  required?: boolean
}

const ProfessionalTextarea: React.FC<ProfessionalTextareaProps> = ({
  step,
  label,
  helper,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false
}) => {
  const insertText = (before: string, after: string = '') => {
    onChange(`${value}${before}${after}`)
  }

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0
  const charCount = value.length

  return (
    <div className="rounded-2xl bg-[#0e0e11] border border-white/[0.08] hover:border-white/[0.14] transition-colors p-4 sm:p-5 space-y-3">
      {/* Header with Step, Title, Helper and Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
        <div className="flex items-start gap-2.5">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#e29b68]/15 text-[#e29b68] border border-[#e29b68]/30">
            {step}
          </span>
          <div>
            <label className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5 uppercase">
              {label} {required && <span className="text-[#e29b68]">*</span>}
            </label>
            <p className="text-[11px] text-[#86868b] mt-0.5 leading-snug">
              {helper}
            </p>
          </div>
        </div>

        {/* Markdown Toolbar */}
        <div className="flex items-center gap-1 self-start sm:self-center bg-black/40 p-1 rounded-lg border border-white/[0.06]">
          <button
            type="button"
            onClick={() => insertText('**', '**')}
            title="Texto en negrita (**texto**)"
            className="p-1.5 rounded hover:bg-white/[0.08] text-[#86868b] hover:text-white transition-colors"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('\n- ')}
            title="Lista con viñetas"
            className="p-1.5 rounded hover:bg-white/[0.08] text-[#86868b] hover:text-white transition-colors"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('\n1. ')}
            title="Lista numerada"
            className="p-1.5 rounded hover:bg-white/[0.08] text-[#86868b] hover:text-white transition-colors"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertText('\n```\n', '\n```')}
            title="Bloque de código o datos de telemetría"
            className="p-1.5 rounded hover:bg-white/[0.08] text-[#86868b] hover:text-white transition-colors"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Textarea with smooth vertical resize and no transition lag */}
      <textarea
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-[#08080a] border border-white/[0.08] text-[#f5f5f7] text-xs sm:text-sm font-mono leading-relaxed focus:border-[#e29b68]/60 focus:ring-1 focus:ring-[#e29b68]/20 focus:outline-none resize-y min-h-[90px] transition-colors placeholder-[#48484a]"
      />

      {/* Word & Char Counter Footer */}
      <div className="flex items-center justify-between text-[10px] text-[#6e6e73] font-mono pt-1">
        <span>Soporta Markdown y tablas estándar</span>
        <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.04]">
          {wordCount} palabras • {charCount} caracteres
        </span>
      </div>
    </div>
  )
}

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
  const [editorTab, setEditorTab] = useState<'edit' | 'preview'>('edit')
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
      author: 'Bautista D\'Hipólito',
      date: new Date().toISOString().split('T')[0],
      category: 'Investigación',
      subsystem: 'General',
      objective: '',
      findings: '',
      conclusions: '',
      nextSteps: ''
    })
    setEditorTab('edit')
    setIsEditing(true)
    setActiveReport(null)
  }

  const handleStartEdit = (report: ReportItem) => {
    setFormData({ ...report })
    setEditorTab('edit')
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
    if (window.confirm('¿Seguro que deseas eliminar este informe técnico?')) {
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
      r.findings.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = categoryFilter === 'TODOS' || r.category === categoryFilter
    return matchesSearch && matchesCat
  })

  return (
    <div className="bg-[#000000] min-h-screen text-[#f5f5f7]">
      
      {/* ========================================================================= */}
      {/* MODO 1: VISTA DE DOCUMENTO FORMAL A4 (APPLE STYLE CON MARCA DE AGUA) */}
      {/* ========================================================================= */}
      {activeReport && !isEditing ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          
          {/* Top Control Bar */}
          <div className="no-print flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <button
              onClick={() => setActiveReport(null)}
              className="apple-pill-secondary px-4 py-2 text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Lista</span>
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
      {/* MODO 2: EDITOR TÉCNICO PROFESIONAL (ESTUDIO DE REDACCIÓN DE INFORMES) */}
      {/* ========================================================================= */}
      {isEditing ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          
          {/* Header Bar with Back Arrow and Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3.5">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#a1a1a6] hover:text-white border border-white/[0.08] transition-all"
                title="Volver a la lista"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#e29b68] bg-[#e29b68]/10 border border-[#e29b68]/20 px-2 py-0.5 rounded">
                    ESTUDIO DOCUMENTAL
                  </span>
                  <span className="text-xs text-[#6e6e73] font-mono">
                    ID: {formData.id || 'NUEVO'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {formData.title ? 'Editar Informe Técnico' : 'Redactar Nuevo Informe'}
                </h2>
              </div>
            </div>

            {/* Mode Switcher: Redacción vs Vista Previa */}
            <div className="flex items-center bg-[#141417] p-1 rounded-full border border-white/[0.08] self-start sm:self-center">
              <button
                type="button"
                onClick={() => setEditorTab('edit')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  editorTab === 'edit'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-[#86868b] hover:text-white'
                }`}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setEditorTab('preview')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  editorTab === 'preview'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-[#86868b] hover:text-white'
                }`}
              >
                Vista Previa
              </button>
            </div>
          </div>

          {/* TAB 1: EDITOR FORM */}
          {editorTab === 'edit' ? (
            <form onSubmit={handleSaveReport} className="space-y-8">
              
              {/* BLOQUE 1: DATOS DE PORTADA Y METADATOS */}
              <div className="apple-bento-card p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
                  <FileText className="w-4 h-4 text-[#e29b68]" />
                  <h3 className="text-xs uppercase font-bold tracking-widest text-[#a1a1a6]">
                    BLOQUE 01 • PORTADA Y CLASIFICACIÓN
                  </h3>
                </div>

                {/* Título Principal */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-white uppercase">
                      TÍTULO DEL INFORME <span className="text-[#e29b68]">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-[#6e6e73]">
                      {formData.title.length}/120
                    </span>
                  </div>
                  <input 
                    type="text" 
                    required
                    maxLength={120}
                    placeholder="Ej: Calibración del Sensor de Altitud y Despliegue de Huevo"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#08080a] border border-white/[0.1] text-white text-sm font-semibold focus:border-[#e29b68]/60 focus:ring-1 focus:ring-[#e29b68]/20 focus:outline-none transition-all placeholder-[#48484a]"
                  />
                </div>

                {/* Subtítulo / Resumen */}
                <div>
                  <label className="block text-xs font-bold text-white uppercase mb-2">
                    DE QUÉ SE TRATA (RESUMEN EJECUTIVO PARA LA PORTADA) <span className="text-[#e29b68]">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Breve síntesis (1-2 oraciones) que figurará en el encabezado oficial"
                    value={formData.subtitle}
                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#08080a] border border-white/[0.1] text-white text-sm focus:border-[#e29b68]/60 focus:ring-1 focus:ring-[#e29b68]/20 focus:outline-none transition-all placeholder-[#48484a]"
                  />
                </div>

                {/* Quick Author Selection */}
                <div>
                  <label className="block text-xs font-bold text-white uppercase mb-2">
                    AUTOR / RESPONSABLE TÉCNICO <span className="text-[#e29b68]">*</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    {TEAM_MEMBERS_QUICK.map((authorName) => (
                      <button
                        key={authorName}
                        type="button"
                        onClick={() => setFormData({ ...formData, author: authorName })}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                          formData.author === authorName
                            ? 'bg-[#e29b68]/20 text-[#e29b68] border-[#e29b68]/50 font-medium'
                            : 'bg-white/[0.04] text-[#86868b] border-white/[0.06] hover:text-white'
                        }`}
                      >
                        {authorName}
                      </button>
                    ))}
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="O escribe otro nombre de autor..."
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#08080a] border border-white/[0.1] text-white text-xs focus:border-[#e29b68]/60 focus:outline-none transition-all"
                  />
                </div>

                {/* Categoría, Subsistema y Fecha */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#a1a1a6] uppercase mb-1.5">
                      CATEGORÍA
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080a] border border-white/[0.1] text-white text-xs focus:border-[#e29b68]/60 focus:outline-none cursor-pointer"
                    >
                      <option value="Investigación">Investigación</option>
                      <option value="PDR / CDR">PDR / CDR</option>
                      <option value="Ensayo Ambiental">Ensayo Ambiental</option>
                      <option value="Minuta de Reunión">Minuta de Reunión</option>
                      <option value="Contrato">Contrato</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#a1a1a6] uppercase mb-1.5">
                      SUBSISTEMA
                    </label>
                    <select
                      value={formData.subsystem}
                      onChange={e => setFormData({ ...formData, subsystem: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080a] border border-white/[0.1] text-white text-xs focus:border-[#e29b68]/60 focus:outline-none cursor-pointer"
                    >
                      <option value="General">General</option>
                      <option value="Aviónica">Aviónica & Sensores</option>
                      <option value="Mecánica & Paraglider">Mecánica & Paraglider</option>
                      <option value="Software & Telemetría">Software & Telemetría</option>
                      <option value="Carga Crítica (Huevo)">Carga Crítica (Huevo)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#a1a1a6] uppercase mb-1.5">
                      FECHA DE EMISIÓN
                    </label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#08080a] border border-white/[0.1] text-white text-xs focus:border-[#e29b68]/60 focus:outline-none"
                    />
                  </div>
                </div>

              </div>

              {/* BLOQUE 2: DESARROLLO TÉCNICO Y TEXTAREAS PROFESIONALES */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 pb-1">
                  <Tag className="w-4 h-4 text-[#e29b68]" />
                  <h3 className="text-xs uppercase font-bold tracking-widest text-[#a1a1a6]">
                    BLOQUE 02 • CUERPO TÉCNICO ESTRUCTURADO
                  </h3>
                </div>

                {/* 1. OBJETIVO */}
                <ProfessionalTextarea
                  step="01"
                  label="Objetivo del Estudio o Ensayo"
                  helper="¿Qué requerimiento, hipótesis o desafío de misión se buscaba abordar?"
                  required
                  rows={3}
                  placeholder="Ej: Validar la tasa de transmisión de paquetes de telemetría a 1000m simulados garantizando un PER inferior al 1%..."
                  value={formData.objective}
                  onChange={val => setFormData({ ...formData, objective: val })}
                />

                {/* 2. DESARROLLO Y RESULTADOS */}
                <ProfessionalTextarea
                  step="02"
                  label="Desarrollo Técnico, Mediciones y Resultados"
                  helper="Detalla la metodología, pruebas realizadas, valores numéricos o conclusiones de laboratorio."
                  required
                  rows={6}
                  placeholder={`1. Configuración de prueba: Parámetros del banco experimental...\n2. Mediciones obtenidas: Aceleración en 3 ejes, consumo en mA...\n3. Análisis de discrepancias y comportamiento observado.`}
                  value={formData.findings}
                  onChange={val => setFormData({ ...formData, findings: val })}
                />

                {/* 3. CONCLUSIONES */}
                <ProfessionalTextarea
                  step="03"
                  label="Conclusiones Principales"
                  helper="Síntesis de aprendizajes clave y validación de factibilidad técnica."
                  required
                  rows={3}
                  placeholder="Ej: Se concluye que la configuración adoptada satisface los criterios de aceptación para la fase CDR..."
                  value={formData.conclusions}
                  onChange={val => setFormData({ ...formData, conclusions: val })}
                />

                {/* 4. PRÓXIMOS PASOS */}
                <ProfessionalTextarea
                  step="04"
                  label="Próximos Pasos y Asignación"
                  helper="Acciones concretas resultantes, responsables y fechas estimadas de entrega."
                  rows={3}
                  placeholder="1. Fabricación del prototipo v2 en PETG con fibra de carbono...\n2. Ensayos en cámara de vacío programados para el 15/07."
                  value={formData.nextSteps}
                  onChange={val => setFormData({ ...formData, nextSteps: val })}
                />
              </div>

              {/* STICKY BOTTOM ACTION BAR */}
              <div className="sticky bottom-6 p-4 rounded-2xl bg-[#141418]/90 backdrop-blur-xl border border-white/[0.1] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 z-30">
                <div className="text-xs text-[#86868b] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e29b68]" />
                  <span>Todos los cambios se compilarán en formato oficial A4 y Markdown</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="apple-pill-secondary px-4 py-2 text-xs"
                  >
                    Descartar
                  </button>

                  <button
                    type="submit"
                    className="apple-pill-primary px-6 py-2 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Guardar y Ver Documento</span>
                  </button>
                </div>
              </div>

            </form>
          ) : (
            /* TAB 2: LIVE PREVIEW BEFORE SAVING */
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-[#a1a1a6] flex items-center justify-between">
                <span>Esta es la vista previa de cómo quedará el documento formal una vez guardado:</span>
                <button
                  type="button"
                  onClick={() => setEditorTab('edit')}
                  className="text-[#e29b68] hover:underline font-semibold"
                >
                  Volver a editar
                </button>
              </div>

              {/* Render Document Sheet with Watermark */}
              <div className="relative bg-[#121214] border border-white/[0.08] rounded-[2rem] p-8 sm:p-12 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                  <img 
                    src="/logo.png" 
                    alt="AuSat Watermark" 
                    className="w-[350px] h-[350px] object-contain opacity-[0.035] filter grayscale contrast-125" 
                  />
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="border-b border-white/[0.1] pb-6">
                    <p className="font-bold text-sm text-white">AuSat • PROYECTO ORBIT</p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                      {formData.title || 'Título sin definir'}
                    </h1>
                    <p className="text-sm text-[#86868b] mt-1">
                      {formData.subtitle || 'Sin descripción'}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-[#86868b]">
                      <span>Autor: <strong className="text-white">{formData.author}</strong></span>
                      <span>Subsistema: <strong className="text-[#e29b68]">{formData.subsystem}</strong></span>
                      <span>Categoría: <strong className="text-white">{formData.category}</strong></span>
                      <span>Fecha: <strong className="text-white">{formData.date}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-6 text-sm text-[#e5e5ea]">
                    <section>
                      <h4 className="font-bold text-xs uppercase text-[#e29b68] mb-1 font-mono">01. Objetivo</h4>
                      <p className="whitespace-pre-line text-[#a1a1a6]">{formData.objective || 'Sin contenido'}</p>
                    </section>
                    <section>
                      <h4 className="font-bold text-xs uppercase text-[#e29b68] mb-1 font-mono">02. Desarrollo y Resultados</h4>
                      <p className="whitespace-pre-line font-mono text-xs text-[#a1a1a6] bg-black/30 p-3 rounded-lg border border-white/[0.06]">
                        {formData.findings || 'Sin contenido'}
                      </p>
                    </section>
                    <section>
                      <h4 className="font-bold text-xs uppercase text-[#e29b68] mb-1 font-mono">03. Conclusiones</h4>
                      <p className="whitespace-pre-line text-[#a1a1a6]">{formData.conclusions || 'Sin contenido'}</p>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : null}

      {/* ========================================================================= */}
      {/* MODO 3: VISTA DE INFORMES EN FORMA DE LISTA (LIST VIEW) */}
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
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar por título, autor, subsistema o contenido..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#161617] border border-white/[0.08] text-sm text-white placeholder-[#86868b] focus:border-white/[0.2] focus:outline-none"
              />
            </div>

            {/* Category Filter Select (Default: TODOS) */}
            <div className="shrink-0 min-w-[200px]">
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-[#161617] border border-white/[0.08] text-xs text-[#f5f5f7] focus:border-[#e29b68]/60 focus:outline-none cursor-pointer"
              >
                <option value="TODOS">Todas las categorías</option>
                <option value="Investigación">Investigación</option>
                <option value="PDR / CDR">PDR / CDR</option>
                <option value="Ensayo Ambiental">Ensayo Ambiental</option>
                <option value="Minuta de Reunión">Minuta de Reunión</option>
                <option value="Contrato">Contrato</option>
              </select>
            </div>
          </div>

          {/* Reports Count Bar */}
          <div className="flex items-center justify-between text-xs text-[#86868b] font-mono px-1 mb-4">
            <span>{filteredReports.length} {filteredReports.length === 1 ? 'informe registrado' : 'informes registrados'}</span>
            <span>Vista de Lista • Orden cronológico</span>
          </div>

          {/* Reports List View (Forma de Lista con Botones Completos) */}
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <div 
                key={report.id}
                className="apple-bento-card p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 group hover:border-[#c87d55]/40 transition-all duration-200"
              >
                {/* Left: Metadata, Title & Subtitle */}
                <div className="flex-1 min-w-0">
                  
                  {/* Category, Subsystem, ID & Date Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                    <span className="font-mono text-[11px] font-bold text-[#e29b68] bg-[#e29b68]/10 border border-[#e29b68]/25 px-2 py-0.5 rounded">
                      {report.id.toUpperCase()}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[#a1a1a6] border border-white/[0.08] font-medium text-[11px]">
                      {report.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#86868b] border border-white/[0.06] text-[11px]">
                      {report.subsystem}
                    </span>
                    <span className="text-[#6e6e73] text-[11px] flex items-center gap-1 font-mono ml-auto sm:ml-0">
                      <Calendar className="w-3 h-3 text-[#86868b]" />
                      {report.date}
                    </span>
                  </div>

                  {/* Title (Clickable to View) */}
                  <h3 
                    onClick={() => setActiveReport(report)}
                    className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-white transition-colors cursor-pointer mb-1 leading-snug hover:underline"
                  >
                    {report.title}
                  </h3>

                  {/* Subtitle / Scope */}
                  <p className="text-xs text-[#86868b] line-clamp-1 leading-relaxed mb-3">
                    {report.subtitle}
                  </p>

                  {/* Author Line */}
                  <div className="flex items-center gap-2 text-xs text-[#a1a1a6]">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#e29b68]" />
                      <span className="font-medium text-white">{report.author}</span>
                    </div>
                  </div>

                </div>

                {/* Right: Action Buttons (Ver, Editar, Descargar, Imprimir, Borrar) */}
                <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.06] shrink-0">
                  <button
                    onClick={() => setActiveReport(report)}
                    className="apple-pill-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
                    title="Ver informe en modo documento oficial"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver</span>
                  </button>

                  <button
                    onClick={() => handleStartEdit(report)}
                    className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#a1a1a6] hover:text-[#e29b68] border border-white/[0.08] transition-all"
                    title="Editar informe técnico"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDownloadMarkdown(report)}
                    title="Descargar Markdown (.md)"
                    className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#a1a1a6] hover:text-white border border-white/[0.08] transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setActiveReport(report)
                      setTimeout(() => window.print(), 100)
                    }}
                    title="Imprimir / Guardar en PDF"
                    className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#a1a1a6] hover:text-white border border-white/[0.08] transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    title="Eliminar informe"
                    className="p-2 rounded-full bg-white/[0.04] hover:bg-red-950/60 text-[#a1a1a6] hover:text-red-400 border border-white/[0.08] transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReports.length === 0 && (
            <div className="text-center py-20 apple-bento-card">
              <BookOpen className="w-8 h-8 text-[#86868b] mx-auto mb-3" />
              <p className="text-white font-semibold text-sm">No se encontraron informes</p>
              <p className="text-xs text-[#86868b] mt-1">Prueba con otro término de búsqueda o crea un nuevo informe técnico.</p>
            </div>
          )}

        </div>
      ) : null}

    </div>
  )
}
