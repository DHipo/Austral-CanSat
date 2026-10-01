'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Flag, List, MapPin, Pencil, Plus, Trash2, User } from 'lucide-react';
import { EventCategory } from '@orbit/shared';
import { cn } from '../../lib/cn';
import { EVENT_CATEGORY } from '../../lib/orbit/labels';
import {
  createEvent,
  deleteEvent,
  listEvents,
  updateEvent,
  type CalendarEvent,
  type CalendarEventInput,
} from '../../lib/orbit/calendar';
import { formatDate, formatTime, isSameDay } from '../../lib/orbit/format';
import { useNow } from '../../lib/orbit/useNow';
import { Button, Card, EmptyState, Modal, Notice, Select } from './ui';
import { EventFormModal } from './EventFormModal';

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

function monthGrid(cursor: Date): Date[] {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7; // semana empieza el lunes
  const start = new Date(first);
  start.setDate(first.getDate() - offset);
  const lastOfMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
  const totalCells = Math.ceil((offset + lastOfMonth.getDate()) / 7) * 7;
  return Array.from({ length: totalCells }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export const MissionCalendar: React.FC = () => {
  const now = useNow();
  const [cursor, setCursor] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'agenda'>('month');
  const [category, setCategory] = useState<EventCategory | ''>('');
  const [selected, setSelected] = useState<CalendarEvent | null>(null);
  const [allEvents, setAllEvents] = useState<CalendarEvent[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState<{ open: boolean; event: CalendarEvent | null; date: Date | null }>({
    open: false,
    event: null,
    date: null,
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const month = cursor ?? (now ? new Date(now.getFullYear(), now.getMonth(), 1) : null);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      setAllEvents(await listEvents());
      setStatus('ready');
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'No se pudieron cargar los eventos.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const events = useMemo(
    () =>
      allEvents
        .filter((e) => !category || e.category === category)
        .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate)),
    [allEvents, category],
  );

  const openDetails = (e: CalendarEvent) => {
    setSelected(e);
    setConfirmDelete(false);
    setActionError(null);
  };
  const closeDetails = useCallback(() => setSelected(null), []);
  const openCreate = (date: Date | null = null) => setForm({ open: true, event: null, date });
  const closeForm = useCallback(() => setForm((f) => ({ ...f, open: false })), []);

  const handleSubmit = async (input: CalendarEventInput) => {
    if (form.event) {
      const updated = await updateEvent(form.event.id, input);
      setAllEvents((list) => list.map((e) => (e.id === updated.id ? updated : e)));
      setSelected(updated);
    } else {
      const created = await createEvent(input);
      const start = new Date(created.startDate);
      setAllEvents((list) => [...list, created]);
      setCursor(new Date(start.getFullYear(), start.getMonth(), 1));
    }
    closeForm();
  };

  const handleDelete = async () => {
    if (!selected) return;
    setDeleting(true);
    setActionError(null);
    try {
      await deleteEvent(selected.id);
      setAllEvents((list) => list.filter((e) => e.id !== selected.id));
      setSelected(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'No se pudo eliminar el evento.');
    } finally {
      setDeleting(false);
    }
  };

  if (!now || !month) return null;

  const shiftMonth = (delta: number) => setCursor(new Date(month.getFullYear(), month.getMonth() + delta, 1));

  const eventsOn = (day: Date) => events.filter((e) => isSameDay(new Date(e.startDate), day));
  const monthEvents = events.filter((e) => {
    const d = new Date(e.startDate);
    return d.getFullYear() === month.getFullYear() && d.getMonth() === month.getMonth();
  });

  return (
    <div className="space-y-5">
      {/* Barra de controles */}
      <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={() => shiftMonth(-1)} aria-label="Mes anterior">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => shiftMonth(1)} aria-label="Mes siguiente">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="min-w-44 text-xl font-bold capitalize tracking-tight text-fg">
            {formatDate(month.toISOString(), { month: 'long', year: 'numeric' })}
          </h2>
          <Button size="sm" variant="secondary" onClick={() => setCursor(null)}>
            Hoy
          </Button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button variant="primary" size="sm" onClick={() => openCreate()}>
            <Plus className="h-4 w-4" />
            Nuevo evento
          </Button>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value as EventCategory | '')}
            className="sm:w-56"
            aria-label="Filtrar por categoría"
          >
            <option value="">Todas las categorías</option>
            {Object.entries(EVENT_CATEGORY).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        <div className="flex rounded-full border border-line bg-fg/[0.04] p-1 text-sm font-semibold">
          {(
            [
              { id: 'month', label: 'Mes', icon: CalendarDays },
              { id: 'agenda', label: 'Agenda', icon: List },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-1.5 transition-all cursor-pointer',
                view === id ? 'bg-brand text-brand-fg shadow-[0_0_20px_-6px_rgba(255,122,26,0.5)]' : 'text-fg-subtle hover:text-fg',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
        </div>
      </Card>

      {status === 'error' && (
        <Notice>
          {loadError}{' '}
          <button onClick={load} className="font-semibold text-brand hover:underline cursor-pointer">
            Reintentar
          </button>
        </Notice>
      )}

      {view === 'month' ? (
        <Card className="overflow-hidden">
          <div className="grid grid-cols-7 border-b border-line bg-fg/[0.03] text-center text-xs font-bold uppercase tracking-wider text-fg-subtle">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-3">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {monthGrid(month).map((day, i) => {
              const inMonth = day.getMonth() === month.getMonth();
              const isToday = isSameDay(day, now);
              const dayEvents = eventsOn(day);
              return (
                <div
                  key={i}
                  className={cn(
                    'group min-h-16 border-b border-r border-line p-2 sm:min-h-32 [&:nth-child(7n)]:border-r-0',
                    !inMonth && 'bg-fg/[0.015]',
                  )}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <div
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-full text-sm tabular-nums',
                        isToday ? 'bg-brand font-semibold text-brand-fg' : inMonth ? 'text-fg-muted' : 'text-fg-subtle/50',
                      )}
                    >
                      {day.getDate()}
                    </div>
                    <button
                      onClick={() => openCreate(day)}
                      aria-label={'Nuevo evento el ' + formatDate(day.toISOString(), { day: 'numeric', month: 'long' })}
                      className="hidden rounded-full p-1 text-fg-subtle opacity-0 transition-opacity hover:bg-fg/[0.06] hover:text-fg focus-visible:opacity-100 group-hover:opacity-100 sm:block cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Mobile: solo puntos */}
                  <div className="flex flex-wrap gap-1 sm:hidden">
                    {dayEvents.map((e) => (
                      <button key={e.id} onClick={() => openDetails(e)} aria-label={e.title} className="cursor-pointer p-0.5">
                        <span className={cn('block h-2 w-2 rounded-full', e.isMilestone ? 'bg-brand' : 'bg-fg-subtle')} />
                      </button>
                    ))}
                  </div>

                  {/* Desktop: chips */}
                  <div className="hidden space-y-1 sm:block">
                    {dayEvents.slice(0, 2).map((e) => (
                      <button
                        key={e.id}
                        onClick={() => openDetails(e)}
                        className={cn(
                          'flex w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 py-1 text-left text-xs font-medium transition-colors hover:bg-fg/[0.06]',
                          e.isMilestone ? 'text-brand' : 'text-fg-muted hover:text-fg',
                        )}
                      >
                        {e.isMilestone && <Flag className="h-3 w-3 shrink-0" />}
                        <span className="truncate">{e.title}</span>
                      </button>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="px-1 text-xs text-fg-subtle">+{dayEvents.length - 2} más</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        <Card>
          {status === 'loading' ? (
            <div className="flex justify-center py-16">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-brand" aria-label="Cargando" />
            </div>
          ) : monthEvents.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No hay eventos este mes"
              description="Probá con otro mes, cambiá el filtro o creá un evento nuevo."
            />
          ) : (
            <ul className="divide-y divide-line">
              {monthEvents.map((e) => (
                <li key={e.id}>
                  <button
                    onClick={() => openDetails(e)}
                    className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-fg/[0.04] cursor-pointer"
                  >
                    <div className="w-12 shrink-0 rounded-2xl border border-line bg-fg/[0.04] py-1.5 text-center">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brand">
                        {formatDate(e.startDate, { weekday: 'short' })}
                      </div>
                      <div className="text-xl font-bold leading-tight tabular-nums text-fg">{new Date(e.startDate).getDate()}</div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-base font-semibold text-fg">{e.title}</span>
                        {e.isMilestone && <Flag className="h-3.5 w-3.5 shrink-0 text-brand" />}
                      </div>
                      <div className="mt-0.5 truncate text-sm text-fg-subtle">
                        {formatTime(e.startDate)}
                        {e.location && ` · ${e.location}`}
                      </div>
                    </div>
                    <span className="hidden shrink-0 text-sm text-fg-subtle sm:block">{EVENT_CATEGORY[e.category]}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      <Modal
        open={!!selected && !form.open}
        onClose={closeDetails}
        title={selected?.title}
        footer={
          confirmDelete ? (
            <>
              <span className="mr-auto self-center text-sm text-fg-muted">¿Eliminar este evento?</span>
              <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)} disabled={deleting}>
                No
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Eliminando…' : 'Sí, eliminar'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="mr-auto text-err hover:text-err" onClick={() => setConfirmDelete(true)}>
                <Trash2 className="h-4 w-4" />
                Eliminar
              </Button>
              <Button variant="secondary" size="sm" onClick={() => selected && setForm({ open: true, event: selected, date: null })}>
                <Pencil className="h-4 w-4" />
                Editar
              </Button>
              <Button variant="secondary" size="sm" onClick={closeDetails}>
                Cerrar
              </Button>
            </>
          )
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-fg-subtle">
              <span>{EVENT_CATEGORY[selected.category]}</span>
              {selected.isMilestone && (
                <span className="inline-flex items-center gap-1 font-semibold text-brand">
                  · <Flag className="h-3.5 w-3.5" /> Hito
                </span>
              )}
            </div>
            {selected.description && <p className="text-base leading-relaxed text-fg-muted">{selected.description}</p>}
            <dl className="space-y-3 rounded-2xl border border-line bg-fg/[0.04] p-5 text-[15px]">
              <div className="flex items-center gap-3">
                <dt className="sr-only">Fecha</dt>
                <CalendarDays className="h-4 w-4 shrink-0 text-fg-subtle" />
                <dd className="capitalize text-fg">
                  {formatDate(selected.startDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="sr-only">Horario</dt>
                <Clock className="h-4 w-4 shrink-0 text-fg-subtle" />
                <dd className="text-fg">
                  {formatTime(selected.startDate)}
                  {selected.endDate !== selected.startDate && ` – ${formatTime(selected.endDate)}`}
                </dd>
              </div>
              {selected.location && (
                <div className="flex items-center gap-3">
                  <dt className="sr-only">Lugar</dt>
                  <MapPin className="h-4 w-4 shrink-0 text-fg-subtle" />
                  <dd className="text-fg">{selected.location}</dd>
                </div>
              )}
              <div className="flex items-center gap-3">
                <dt className="sr-only">Responsable</dt>
                <User className="h-4 w-4 shrink-0 text-fg-subtle" />
                <dd className="text-fg">{selected.createdBy?.name ?? 'Equipo AuSat'}</dd>
              </div>
            </dl>
            {actionError && (
              <p role="alert" className="text-sm font-medium text-err">
                {actionError}
              </p>
            )}
          </div>
        )}
      </Modal>

      <EventFormModal
        open={form.open}
        event={form.event}
        initialDate={form.date}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
