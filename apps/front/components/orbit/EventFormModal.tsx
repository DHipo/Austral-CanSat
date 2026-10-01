'use client';

import React, { useEffect, useState } from 'react';
import { EventCategory } from '@orbit/shared';
import { EVENT_CATEGORY } from '../../lib/orbit/labels';
import type { CalendarEvent, CalendarEventInput } from '../../lib/orbit/calendar';
import { Button, Field, Input, Modal, Select, Textarea } from './ui';

interface EventFormModalProps {
  open: boolean;
  /** Evento a editar; si no hay, se crea uno nuevo. */
  event?: CalendarEvent | null;
  /** Día preseleccionado al crear desde la grilla. */
  initialDate?: Date | null;
  onClose: () => void;
  onSubmit: (input: CalendarEventInput) => Promise<void>;
}

interface FormState {
  title: string;
  category: EventCategory;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  isMilestone: boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');
const toDateInput = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toTimeInput = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

function initialState(event?: CalendarEvent | null, initialDate?: Date | null): FormState {
  if (event) {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    return {
      title: event.title,
      category: event.category,
      date: toDateInput(start),
      startTime: toTimeInput(start),
      endTime: toTimeInput(end),
      location: event.location ?? '',
      description: event.description ?? '',
      isMilestone: event.isMilestone,
    };
  }
  return {
    title: '',
    category: EventCategory.MEETING,
    date: toDateInput(initialDate ?? new Date()),
    startTime: '10:00',
    endTime: '11:00',
    location: '',
    description: '',
    isMilestone: false,
  };
}

export function EventFormModal({ open, event, initialDate, onClose, onSubmit }: EventFormModalProps) {
  const [form, setForm] = useState<FormState>(() => initialState(event, initialDate));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initialState(event, initialDate));
      setError(null);
    }
  }, [open, event, initialDate]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(`${form.date}T${form.startTime}`);
    const end = new Date(`${form.date}T${form.endTime}`);
    if (!form.title.trim()) return setError('Poné un título.');
    if (Number.isNaN(+start) || Number.isNaN(+end)) return setError('Revisá la fecha y los horarios.');
    if (end < start) return setError('La hora de fin no puede ser anterior a la de inicio.');

    setSaving(true);
    setError(null);
    try {
      await onSubmit({
        title: form.title.trim(),
        category: form.category,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        location: form.location.trim(),
        description: form.description.trim(),
        isMilestone: form.isMilestone,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el evento.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={event ? 'Editar evento' : 'Nuevo evento'}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="primary" size="sm" type="submit" form="event-form" disabled={saving}>
            {saving ? 'Guardando…' : event ? 'Guardar cambios' : 'Crear evento'}
          </Button>
        </>
      }
    >
      <form id="event-form" onSubmit={handleSubmit} className="space-y-4">
        <Field label="Título" htmlFor="ev-title">
          <Input
            id="ev-title"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Ej. Drop test (~30 G)"
            autoFocus
            required
          />
        </Field>

        <Field label="Categoría" htmlFor="ev-category">
          <Select id="ev-category" value={form.category} onChange={(e) => set('category', e.target.value as EventCategory)}>
            {Object.entries(EVENT_CATEGORY).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Fecha" htmlFor="ev-date">
            <Input id="ev-date" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} required />
          </Field>
          <Field label="Desde" htmlFor="ev-start">
            <Input id="ev-start" type="time" value={form.startTime} onChange={(e) => set('startTime', e.target.value)} required />
          </Field>
          <Field label="Hasta" htmlFor="ev-end">
            <Input id="ev-end" type="time" value={form.endTime} onChange={(e) => set('endTime', e.target.value)} required />
          </Field>
        </div>

        <Field label="Lugar" htmlFor="ev-location">
          <Input
            id="ev-location"
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
            placeholder="Ej. Laboratorio - Universidad Austral"
          />
        </Field>

        <Field label="Descripción" htmlFor="ev-description">
          <Textarea
            id="ev-description"
            rows={3}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Objetivo, qué preparar, quiénes participan…"
          />
        </Field>

        <label className="flex cursor-pointer items-center gap-3 text-[15px] text-fg">
          <input
            type="checkbox"
            checked={form.isMilestone}
            onChange={(e) => set('isMilestone', e.target.checked)}
            className="h-4 w-4 cursor-pointer accent-[var(--o-brand)]"
          />
          Es un hito de la misión
        </label>

        {error && (
          <p role="alert" className="text-sm font-medium text-err">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}
