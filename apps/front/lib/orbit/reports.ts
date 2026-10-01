/**
 * Cliente de /api/reports y /api/files (informes técnicos y adjuntos).
 */
import { ReportStatus, type FlightStage, type ReportCategory, type UserRole } from '@orbit/shared';
import { apiFetch } from '../api';

export interface ReportAttachment {
  id: string;
  reportId: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  createdAt: string;
}

export interface Report {
  id: string;
  title: string;
  subtitle: string | null;
  category: ReportCategory;
  subsystem: string;
  flightStage: FlightStage | null;
  contentMarkdown: string;
  objective: string | null;
  findings: string | null;
  conclusions: string | null;
  nextSteps: string | null;
  status: ReportStatus;
  revisionHash: string;
  authorId: string;
  author: { id: string; name: string; email: string; role: UserRole };
  attachments: ReportAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface ReportInput {
  title: string;
  subtitle: string;
  category: ReportCategory;
  subsystem: string;
  flightStage: FlightStage | null;
  contentMarkdown: string;
  objective: string;
  findings: string;
  conclusions: string;
  nextSteps: string;
}

/** Transiciones permitidas por el backend, con el texto del botón que la dispara. */
export const STATUS_ACTIONS: Record<ReportStatus, { to: ReportStatus; label: string }[]> = {
  [ReportStatus.DRAFT]: [{ to: ReportStatus.IN_REVIEW, label: 'Enviar a revisión' }],
  [ReportStatus.IN_REVIEW]: [
    { to: ReportStatus.DRAFT, label: 'Volver a borrador' },
    { to: ReportStatus.APPROVED, label: 'Aprobar' },
  ],
  [ReportStatus.APPROVED]: [
    { to: ReportStatus.IN_REVIEW, label: 'Reabrir revisión' },
    { to: ReportStatus.OFFICIAL_ARCHIVED, label: 'Archivar' },
  ],
  [ReportStatus.OFFICIAL_ARCHIVED]: [],
};

export const MAX_FILE_MB = 25;
export const ACCEPTED_FILES = '.csv,.txt,.json,.png,.jpg,.jpeg,.pdf';

export function listReports(): Promise<Report[]> {
  return apiFetch<Report[]>('/reports');
}

export function getReport(id: string): Promise<Report> {
  return apiFetch<Report>(`/reports/${id}`);
}

export function createReport(input: ReportInput): Promise<Report> {
  // Al crear, "sin etapa" se omite en vez de mandarse como null.
  const { flightStage, ...rest } = input;
  return apiFetch<Report>('/reports', {
    method: 'POST',
    body: JSON.stringify(flightStage ? input : rest),
  });
}

export function updateReport(id: string, input: Partial<ReportInput> & { status?: ReportStatus }): Promise<Report> {
  return apiFetch<Report>(`/reports/${id}`, { method: 'PUT', body: JSON.stringify(input) });
}

export function deleteReport(id: string): Promise<void> {
  return apiFetch<void>(`/reports/${id}`, { method: 'DELETE' });
}

export function uploadAttachment(reportId: string, file: File): Promise<ReportAttachment> {
  const body = new FormData();
  body.append('reportId', reportId);
  body.append('file', file);
  return apiFetch<ReportAttachment>('/files/upload', { method: 'POST', body });
}

export function deleteAttachment(id: string): Promise<void> {
  return apiFetch<void>(`/files/${id}`, { method: 'DELETE' });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
