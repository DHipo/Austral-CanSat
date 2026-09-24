import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Trash2
} from 'lucide-react'

export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type PriorityLevel = 'P0_CRITICAL' | 'P1_HIGH' | 'P2_MEDIUM' | 'P3_LOW'

export interface TodoCard {
  id: string
  number: number
  title: string
  description: string
  status: TodoStatus
  priority: PriorityLevel
  assignee: string
  label: string
  subsystem: string
  dueDate: string
}

const DEFAULT_TODOS: TodoCard[] = [
  {
    id: 'task-101',
    number: 101,
    title: 'Mecanismo de pestillo de huevo a 2m',
    description: 'Diseñar en CAD y probar servomecanismo de liberación rápida con sensor ultrasónico a 2 metros.',
    status: 'IN_PROGRESS',
    priority: 'P0_CRITICAL',
    assignee: 'Bautista D.',
    label: 'misión-crítica',
    subsystem: 'Mecánica',
    dueDate: '2026-06-15'
  },
  {
    id: 'task-102',
    number: 102,
    title: 'PCB de aviónica con ESP32-S3 y LoRa',
    description: 'Integrar transceptor SX1262 a 915 MHz, barómetro BMP280 e IMU MPU-6050 en placa compacta.',
    status: 'IN_PROGRESS',
    priority: 'P1_HIGH',
    assignee: 'Equipo Aviónica',
    label: 'hardware',
    subsystem: 'Aviónica',
    dueDate: '2026-06-20'
  },
  {
    id: 'task-103',
    number: 103,
    title: 'Prueba de impacto Drop Test (30G)',
    description: 'Armar banco de prueba de caída para calificar anclajes estructurales ante aceleraciones de 30G.',
    status: 'TODO',
    priority: 'P1_HIGH',
    assignee: 'Equipo Mecánico',
    label: 'calificación',
    subsystem: 'Estructura',
    dueDate: '2026-06-25'
  },
  {
    id: 'task-104',
    number: 104,
    title: 'Prueba térmica en horno a 60°C por 2h',
    description: 'Verificar estabilidad de las celdas de batería 18650 y adhesivos durante exposición continua a 60°C.',
    status: 'TODO',
    priority: 'P2_MEDIUM',
    assignee: 'Laboratorio',
    label: 'ensayo-ambiental',
    subsystem: 'Calificación',
    dueDate: '2026-07-02'
  },
  {
    id: 'task-105',
    number: 105,
    title: 'Consolidar entrega PDR para la competencia',
    description: 'Compilar especificaciones de masa, consumo y simulaciones de vuelo en el informe formal PDR.',
    status: 'TODO',
    priority: 'P0_CRITICAL',
    assignee: 'AuSat Team',
    label: 'entregable-conae',
    subsystem: 'Documentación',
    dueDate: '2026-07-10'
  },
  {
    id: 'task-106',
    number: 106,
    title: 'Firma de contratos de equipo y aportes',
    description: 'Formalización del compromiso de 6 horas semanales y fondo de inicio de 30 USD.',
    status: 'DONE',
    priority: 'P2_MEDIUM',
    assignee: 'Liderazgo',
    label: 'gestión',
    subsystem: 'General',
    dueDate: '2026-05-18'
  }
]

export const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<TodoCard[]>(() => {
    const saved = localStorage.getItem('ausat_todos_v1')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Error loading todos', e)
      }
    }
    return DEFAULT_TODOS
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('TODOS')
  const [isAdding, setIsAdding] = useState(false)

  // New task form state
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newAssignee, setNewAssignee] = useState('')
  const [newPriority, setNewPriority] = useState<PriorityLevel>('P1_HIGH')
  const [newSubsystem, setNewSubsystem] = useState('Aviónica')
  const [newLabel, setNewLabel] = useState('tarea')

  useEffect(() => {
    localStorage.setItem('ausat_todos_v1', JSON.stringify(todos))
  }, [todos])

  const handleMoveStatus = (id: string, newStatus: TodoStatus) => {
    setTodos(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item))
  }

  const handleDeleteTask = (id: string) => {
    setTodos(prev => prev.filter(item => item.id !== id))
  }

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const maxNum = todos.reduce((max, t) => Math.max(max, t.number), 100)
    const newTask: TodoCard = {
      id: `task-${Date.now()}`,
      number: maxNum + 1,
      title: newTitle,
      description: newDesc,
      status: 'TODO',
      priority: newPriority,
      assignee: newAssignee || 'Equipo AuSat',
      label: newLabel,
      subsystem: newSubsystem,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }

    setTodos(prev => [newTask, ...prev])
    setNewTitle('')
    setNewDesc('')
    setNewAssignee('')
    setIsAdding(false)
  }

  const columns: { status: TodoStatus; title: string; color: string; icon: any }[] = [
    { status: 'TODO', title: 'Por Hacer', color: '#94a3b8', icon: Circle },
    { status: 'IN_PROGRESS', title: 'En Progreso', color: '#e29b68', icon: Clock },
    { status: 'DONE', title: 'Completado', color: '#10b981', icon: CheckCircle2 }
  ]

  const filteredTodos = todos.filter(t => {
    const matchesSearch = 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSub = selectedSubsystem === 'TODOS' || t.subsystem === selectedSubsystem
    return matchesSearch && matchesSub
  })

  return (
    <div className="bg-[#090a0d] min-h-screen text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* GitHub-Style Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e29b68] animate-pulse"></span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#e29b68] font-bold">
                GITHUB-STYLE PROJECT BOARD
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading flex items-center gap-3">
              <span>Hitos & Tareas de Misión</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#1c2230] text-slate-400 border border-slate-700">
                Sprint CanSat 2026
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-[#e29b68] to-[#c87d55] hover:from-[#f3cfb3] hover:to-[#e29b68] transition-all shadow-md shadow-[#c87d55]/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Tarea / Issue</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Search and Filter Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Filtrar tareas por nombre o responsable..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#12151e] border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-[#e29b68] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs font-mono text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Subsistema:</span>
            </span>
            {['TODOS', 'Aviónica', 'Mecánica', 'Estructura', 'Calificación', 'Documentación'].map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubsystem(sub)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                  selectedSubsystem === sub
                    ? 'bg-[#c87d55]/25 text-[#f3cfb3] border border-[#c87d55]/50'
                    : 'bg-[#12151e] text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* New Task Drawer / Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <form onSubmit={handleCreateTask} className="metal-panel rounded-2xl p-6 border-metal space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#e29b68]" />
                    <span>Crear Nuevo Item de Trabajo</span>
                  </h3>
                  <button 
                    type="button" 
                    onClick={() => setIsAdding(false)}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Cerrar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">TÍTULO DEL ISSUE *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej: Calibrar servomotores MG90S del paraglider"
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#090b10] border border-slate-700 text-sm text-white focus:border-[#e29b68] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">RESPONSABLE</label>
                    <input 
                      type="text" 
                      placeholder="Nombre del integrante"
                      value={newAssignee}
                      onChange={e => setNewAssignee(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#090b10] border border-slate-700 text-sm text-white focus:border-[#e29b68] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">DESCRIPCIÓN</label>
                  <textarea 
                    rows={2}
                    placeholder="Detalles técnicos, entregables esperados o criterios de aceptación..."
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#090b10] border border-slate-700 text-sm text-white focus:border-[#e29b68] focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">PRIORIDAD</label>
                    <select
                      value={newPriority}
                      onChange={e => setNewPriority(e.target.value as any)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#090b10] border border-slate-700 text-xs text-white focus:border-[#e29b68] focus:outline-none"
                    >
                      <option value="P0_CRITICAL">P0 - Crítica</option>
                      <option value="P1_HIGH">P1 - Alta</option>
                      <option value="P2_MEDIUM">P2 - Media</option>
                      <option value="P3_LOW">P3 - Baja</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">SUBSISTEMA</label>
                    <select
                      value={newSubsystem}
                      onChange={e => setNewSubsystem(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#090b10] border border-slate-700 text-xs text-white focus:border-[#e29b68] focus:outline-none"
                    >
                      <option value="Aviónica">Aviónica</option>
                      <option value="Mecánica">Mecánica</option>
                      <option value="Estructura">Estructura</option>
                      <option value="Calificación">Calificación</option>
                      <option value="Documentación">Documentación</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">ETIQUETA (LABEL)</label>
                    <input 
                      type="text" 
                      value={newLabel}
                      onChange={e => setNewLabel(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#090b10] border border-slate-700 text-xs text-white focus:border-[#e29b68] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-slate-950 bg-[#e29b68] hover:bg-[#f3cfb3] transition-all"
                  >
                    Crear Tarea
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Kanban Board Columns (GitHub Projects Look & Feel) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {columns.map((col) => {
            const ColIcon = col.icon
            const colTodos = filteredTodos.filter(t => t.status === col.status)

            return (
              <div 
                key={col.status}
                className="rounded-2xl bg-[#0f121a] border border-slate-800/80 p-4 shadow-xl flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <ColIcon className="w-4 h-4" style={{ color: col.color }} />
                    <h2 className="text-sm font-bold text-white font-mono tracking-tight">
                      {col.title}
                    </h2>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#1b202c] text-slate-300 border border-slate-700">
                    {colTodos.length}
                  </span>
                </div>

                {/* Cards Container with Motion Animations */}
                <div className="space-y-3 flex-grow">
                  <AnimatePresence>
                    {colTodos.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-xl p-4 bg-[#141724] border border-slate-800 hover:border-[#c87d55]/40 transition-all shadow-md group relative"
                      >
                        {/* Issue Header: Number & Priority */}
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                          <span className="text-slate-500 font-bold group-hover:text-[#e29b68] transition-colors">
                            #{task.number}
                          </span>

                          <span className={`text-[10px] px-2 py-0.2 rounded font-semibold border ${
                            task.priority === 'P0_CRITICAL' 
                              ? 'bg-red-950/60 text-red-300 border-red-800/60'
                              : task.priority === 'P1_HIGH'
                              ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            {task.priority === 'P0_CRITICAL' ? 'P0 Crítico' : task.priority === 'P1_HIGH' ? 'P1 Alto' : 'P2 Medio'}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-bold text-white leading-snug mb-1.5 group-hover:text-[#f3cfb3] transition-colors">
                          {task.title}
                        </h3>

                        {/* Description */}
                        {task.description && (
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                            {task.description}
                          </p>
                        )}

                        {/* Labels & Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1e2434] text-slate-300 border border-slate-700">
                            {task.subsystem}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#c87d55]/15 text-[#e29b68] border border-[#c87d55]/30">
                            {task.label}
                          </span>
                        </div>

                        {/* Footer: Assignee & Move Actions */}
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <User className="w-3 h-3 text-[#e29b68]" />
                            <span className="truncate max-w-[110px] text-[11px]">{task.assignee}</span>
                          </span>

                          {/* Move action buttons */}
                          <div className="flex items-center gap-1">
                            {task.status !== 'TODO' && (
                              <button
                                onClick={() => handleMoveStatus(task.id, task.status === 'DONE' ? 'IN_PROGRESS' : 'TODO')}
                                title="Mover a la izquierda"
                                className="p-1 rounded bg-[#090b10] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {task.status !== 'DONE' && (
                              <button
                                onClick={() => handleMoveStatus(task.id, task.status === 'TODO' ? 'IN_PROGRESS' : 'DONE')}
                                title="Mover a la derecha"
                                className="p-1 rounded bg-[#090b10] hover:bg-slate-800 text-[#e29b68] hover:text-[#f3cfb3] transition-colors"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              title="Eliminar tarea"
                              className="p-1 rounded bg-[#090b10] hover:bg-red-950 text-slate-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {colTodos.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-slate-800/80 rounded-xl flex items-center justify-center text-xs font-mono text-slate-600">
                      Sin tareas en esta columna
                    </div>
                  )}
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
