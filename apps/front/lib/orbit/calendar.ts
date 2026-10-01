/**
 * Cliente de /api/calendar (eventos de la misión).
 */
import type { EventCategory, UserRole } from '@orbit/shared';
import { apiFetch } from '../api';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  category: EventCategory;
  location: string | null;
  isMilestone: boolean;
  createdById: string;
  createdBy: { id: string; name: string; email: string; role: UserRole };
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEventInput {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  category: EventCategory;
  location: string;
  isMilestone: boolean;
}

export function listEvents(): Promise<CalendarEvent[]> {
  return apiFetch<CalendarEvent[]>('/calendar');
}

export function createEvent(input: CalendarEventInput): Promise<CalendarEvent> {
  return apiFetch<CalendarEvent>('/calendar', { method: 'POST', body: JSON.stringify(input) });
}

export function updateEvent(id: string, input: CalendarEventInput): Promise<CalendarEvent> {
  return apiFetch<CalendarEvent>(`/calendar/${id}`, { method: 'PUT', body: JSON.stringify(input) });
}

export function deleteEvent(id: string): Promise<void> {
  return apiFetch<void>(`/calendar/${id}`, { method: 'DELETE' });
}
