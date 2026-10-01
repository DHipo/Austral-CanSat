import { EventCategory, FlightStage, ReportCategory, ReportStatus, UserRole } from '@orbit/shared';
import type { Tone } from '../../components/orbit/ui/Status';

export const EVENT_CATEGORY: Record<EventCategory, string> = {
  [EventCategory.CONAE_DELIVERY]: 'Entrega CONAE',
  [EventCategory.HARDWARE_TEST]: 'Ensayo de hardware',
  [EventCategory.PARACHUTE_TEST]: 'Recuperación',
  [EventCategory.INTEGRATION]: 'Integración',
  [EventCategory.MEETING]: 'Reunión',
};

export const REPORT_CATEGORY: Record<ReportCategory, string> = {
  [ReportCategory.INVESTIGATION]: 'Investigación',
  [ReportCategory.PDR_CDR]: 'PDR / CDR',
  [ReportCategory.ENVIRONMENTAL_TEST]: 'Ensayo ambiental',
  [ReportCategory.MEETING_MINUTES]: 'Minuta de reunión',
  [ReportCategory.TELEMETRY_LOG]: 'Bitácora de telemetría',
};

export const REPORT_STATUS: Record<ReportStatus, { label: string; tone: Tone }> = {
  [ReportStatus.DRAFT]: { label: 'Borrador', tone: 'neutral' },
  [ReportStatus.IN_REVIEW]: { label: 'En revisión', tone: 'warn' },
  [ReportStatus.APPROVED]: { label: 'Aprobado', tone: 'ok' },
  [ReportStatus.OFFICIAL_ARCHIVED]: { label: 'Archivado', tone: 'info' },
};

export const FLIGHT_STAGE: Record<FlightStage, string> = {
  [FlightStage.PAD_IDLE]: 'Rampa / pre-lanzamiento',
  [FlightStage.POWERED_ASCENT]: 'Ascenso',
  [FlightStage.APOGEE_EJECTION]: 'Apogeo / separación',
  [FlightStage.PARACHUTE_DESCENT]: 'Descenso en paracaídas',
  [FlightStage.PARAGLIDER_GLIDE]: 'Planeo con paraglider',
  [FlightStage.EGG_RELEASE_2M]: 'Liberación del huevo (2 m)',
  [FlightStage.TOUCHDOWN_RECOVERY]: 'Aterrizaje & recuperación',
};

export const SUBSYSTEMS = [
  'Aviónica & Sistemas',
  'Energía',
  'Telemetría & Enlace RF',
  'Recuperación & Paraglider',
  'Mecanismo de carga (huevo)',
  'Estructura & Mecánica',
  'General & Gestión',
] as const;

export type EnvTestStatus = 'pending' | 'scheduled' | 'passed' | 'failed';

export const ENV_TEST_STATUS: Record<EnvTestStatus, { label: string; tone: Tone }> = {
  pending: { label: 'Pendiente', tone: 'neutral' },
  scheduled: { label: 'Programado', tone: 'info' },
  passed: { label: 'Aprobado', tone: 'ok' },
  failed: { label: 'Falló', tone: 'err' },
};

export const USER_ROLE: Record<UserRole, string> = {
  [UserRole.LEAD]: 'Líder & Sistemas',
  [UserRole.AVIONICS]: 'Aviónica & Hardware',
  [UserRole.FLIGHT_DYNAMICS]: 'Dinámica & Vuelo',
  [UserRole.ADMIN]: 'Administración',
};
