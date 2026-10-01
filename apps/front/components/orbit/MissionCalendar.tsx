'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  MapPin, 
  Clock, 
  Flag
} from 'lucide-react';

export type EventCategory = 
  | 'HARDWARE_TEST' 
  | 'CONAE_DELIVERY' 
  | 'PARACHUTE_TEST' 
  | 'MEETING' 
  | 'INTEGRATION';

export interface CalendarEventItem {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  category: EventCategory;
  location?: string;
  isMilestone: boolean;
  authorName?: string;
}

const CATEGORY_CONFIG: Record<EventCategory, { label: string; color: string; bg: string; border: string }> = {
  HARDWARE_TEST: {
    label: 'Ensayos de Hardware',
    color: '#FF7A1A',
    bg: 'rgba(255, 122, 26, 0.15)',
    border: 'rgba(255, 122, 26, 0.4)',
  },
  CONAE_DELIVERY: {
    label: 'Entregas CONAE',
    color: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.15)',
    border: 'rgba(6, 182, 212, 0.4)',
  },
  PARACHUTE_TEST: {
    label: 'Pruebas Paracaídas & Suelta 2m',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.4)',
  },
  MEETING: {
    label: 'Reuniones de Sincronización',
    color: '#A855F7',
    bg: 'rgba(168, 85, 247, 0.15)',
    border: 'rgba(168, 85, 247, 0.4)',
  },
  INTEGRATION: {
    label: 'Integración en Banco',
    color: '#3B82F6',
    bg: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.4)',
  },
};

const DEFAULT_EVENTS: CalendarEventItem[] = [
  {
    id: 'ev-1',
    title: 'Entrega Informe PDR CONAE',
    description: 'Envío formal del Preliminary Design Review ante la comisión de CONAE.',
    startDate: '2026-06-15T18:00:00Z',
    endDate: '2026-06-15T23:59:00Z',
    category: 'CONAE_DELIVERY',
    location: 'Plataforma Virtual CONAE',
    isMilestone: true,
    authorName: "Bautista D'Hipólito",
  },
  {
    id: 'ev-2',
    title: 'Ensayo Drop Test 30G y Ensayo Térmico 60°C',
    description: 'Verificación de resistencia mecánica del chasis de fibra y ausencia de fisura en huevo.',
    startDate: '2026-06-28T14:00:00Z',
    endDate: '2026-06-28T18:00:00Z',
    category: 'HARDWARE_TEST',
    location: 'Laboratorio de Materiales Austral',
    isMilestone: false,
    authorName: 'Mateo Fernández',
  },
  {
    id: 'ev-3',
    title: 'Prueba de Despliegue de Paraglider Guiado',
    description: 'Calibración de deflexión en servos MG90S y estabilidad de planeo a 5 m/s.',
    startDate: '2026-07-08T10:00:00Z',
    endDate: '2026-07-08T16:00:00Z',
    category: 'PARACHUTE_TEST',
    location: 'Campo Abierto Pilar (Univ. Austral)',
    isMilestone: true,
    authorName: 'Sofía Rossi',
  },
  {
    id: 'ev-4',
    title: 'Sincronización Técnica Semanal AuSat',
    description: 'Revisión del bus SPI, telemetría LoRa 915MHz y validación de antena monopolo.',
    startDate: '2026-07-14T21:00:00Z',
    endDate: '2026-07-14T22:30:00Z',
    category: 'MEETING',
    location: 'Meet Virtual AuSat',
    isMilestone: false,
    authorName: "Bautista D'Hipólito",
  },
];

export const MissionCalendar: React.FC = () => {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([
    'HARDWARE_TEST',
    'CONAE_DELIVERY',
    'PARACHUTE_TEST',
    'MEETING',
    'INTEGRATION',
  ]);
  const [events] = useState<CalendarEventItem[]>(DEFAULT_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventItem | null>(null);

  const toggleCategory = (cat: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredEvents = events.filter((e) => selectedCategories.includes(e.category));

  return (
    <div className="space-y-6">
      
      {/* Calendar Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#17264F] border border-white/10 backdrop-blur-md">
        
        {/* Date Navigator */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#0B1633] text-[#FF7A1A]">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#EEF2FA]">
              Junio - Julio 2026
            </h3>
            <p className="text-xs text-[#5A6785]">Fase Crítica PDR & Ensayos Ambientales</p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button className="p-1.5 rounded-lg bg-[#0B1633] text-[#C9D6F2] hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg bg-[#0B1633] text-[#C9D6F2] hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Switcher (Month / Week) */}
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-[#0B1633] p-1 border border-white/5 text-xs font-medium">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'month'
                  ? 'bg-[#17264F] text-[#EEF2FA] font-bold shadow'
                  : 'text-[#5A6785] hover:text-[#C9D6F2]'
              }`}
            >
              Vista Mensual
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'week'
                  ? 'bg-[#17264F] text-[#EEF2FA] font-bold shadow'
                  : 'text-[#5A6785] hover:text-[#C9D6F2]'
              }`}
            >
              Vista Semanal
            </button>
          </div>
        </div>

      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
        <span className="text-xs font-semibold text-[#5A6785] uppercase tracking-wider flex items-center gap-1.5 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filtrar:
        </span>
        {(Object.keys(CATEGORY_CONFIG) as EventCategory[]).map((cat) => {
          const cfg = CATEGORY_CONFIG[cat];
          const active = selectedCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 flex items-center gap-1.5 ${
                active
                  ? 'shadow-sm'
                  : 'opacity-40 hover:opacity-75 bg-[#0B1633] border-white/5 text-[#5A6785]'
              }`}
              style={{
                backgroundColor: active ? cfg.bg : undefined,
                borderColor: active ? cfg.border : undefined,
                color: active ? cfg.color : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: cfg.color }}
              />
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Events List / Agenda Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((event) => {
          const cfg = CATEGORY_CONFIG[event.category] || CATEGORY_CONFIG.MEETING;
          const start = new Date(event.startDate).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="p-5 rounded-2xl bg-[#17264F] border border-white/10 hover:border-[#FF7A1A]/40 transition-all duration-200 cursor-pointer shadow-md group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span
                  className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border"
                  style={{
                    backgroundColor: cfg.bg,
                    color: cfg.color,
                    borderColor: cfg.border,
                  }}
                >
                  {cfg.label}
                </span>

                {event.isMilestone && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF7A1A] bg-[#FF7A1A]/10 px-2 py-0.5 rounded">
                    <Flag className="w-3 h-3" /> Hito Crítico
                  </span>
                )}
              </div>

              <h4 className="text-base font-bold text-[#EEF2FA] group-hover:text-white mb-2">
                {event.title}
              </h4>

              {event.description && (
                <p className="text-xs text-[#C9D6F2] line-clamp-2 mb-4 leading-relaxed">
                  {event.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5A6785] pt-3 border-t border-white/5">
                <div className="flex items-center gap-1 text-[#C9D6F2]">
                  <Clock className="w-3.5 h-3.5 text-[#FF7A1A]" />
                  <span>{start}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details Drawer/Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#17264F] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md"
                style={{
                  backgroundColor: CATEGORY_CONFIG[selectedEvent.category].bg,
                  color: CATEGORY_CONFIG[selectedEvent.category].color,
                }}
              >
                {CATEGORY_CONFIG[selectedEvent.category].label}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-xs text-[#5A6785] hover:text-white p-1"
              >
                Cerrar
              </button>
            </div>

            <h3 className="text-xl font-bold text-[#EEF2FA] mb-2">
              {selectedEvent.title}
            </h3>

            <p className="text-sm text-[#C9D6F2] leading-relaxed mb-6">
              {selectedEvent.description}
            </p>

            <div className="space-y-2 text-xs text-[#C9D6F2] bg-[#0B1633] p-4 rounded-xl mb-6">
              <div className="flex justify-between">
                <span className="text-[#5A6785]">Inicio:</span>
                <span>{new Date(selectedEvent.startDate).toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6785]">Fin:</span>
                <span>{new Date(selectedEvent.endDate).toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6785]">Ubicación:</span>
                <span>{selectedEvent.location || 'Laboratorio Austral'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6785]">Responsable:</span>
                <span className="text-[#FF7A1A]">{selectedEvent.authorName || 'Equipo AuSat'}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-2.5 rounded-full bg-[#FF7A1A] hover:bg-[#D9620B] text-white text-xs font-semibold"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
