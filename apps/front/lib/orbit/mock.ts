/**
 * Datos de ejemplo para la suite Orbit mientras el front no consume la API.
 * TODO(Fase 3/4): reemplazar por /api/calendar y /api/reports.
 */
import { EventCategory, FlightStage, ReportCategory, ReportStatus } from '@orbit/shared';
import type { EnvTestStatus } from './labels';

export interface OrbitEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  category: EventCategory;
  location?: string;
  isMilestone: boolean;
  ownerId: string;
}

export interface OrbitReport {
  id: string;
  title: string;
  subtitle?: string;
  category: ReportCategory;
  status: ReportStatus;
  subsystem: string;
  flightStage?: FlightStage;
  authorId: string;
  contentMarkdown: string;
  objective?: string;
  findings?: string;
  conclusions?: string;
  nextSteps?: string;
  attachmentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface EnvironmentalTest {
  id: string;
  name: string;
  spec: string;
  status: EnvTestStatus;
  eventId?: string;
}

export const MOCK_EVENTS: OrbitEvent[] = [
  {
    id: 'ev-weekly-1',
    title: 'Reunión semanal del equipo',
    description: 'Avance por subsistema y bloqueos de la semana.',
    startDate: '2026-10-06T21:00:00-03:00',
    endDate: '2026-10-06T22:00:00-03:00',
    category: EventCategory.MEETING,
    location: 'Meet',
    isMilestone: false,
    ownerId: 'bautista',
  },
  {
    id: 'ev-power',
    title: 'Prueba de autonomía con celdas 18650',
    description: 'Descarga continua del banco de baterías con carga simulada para validar 2 h de operación.',
    startDate: '2026-10-10T15:00:00-03:00',
    endDate: '2026-10-10T18:00:00-03:00',
    category: EventCategory.HARDWARE_TEST,
    location: 'Laboratorio - Universidad Austral',
    isMilestone: false,
    ownerId: 'mariapaz',
  },
  {
    id: 'ev-weekly-2',
    title: 'Reunión semanal del equipo',
    startDate: '2026-10-13T21:00:00-03:00',
    endDate: '2026-10-13T22:00:00-03:00',
    category: EventCategory.MEETING,
    location: 'Meet',
    isMilestone: false,
    ownerId: 'bautista',
  },
  {
    id: 'ev-drop',
    title: 'Drop test (~30 G)',
    description: 'Ensayo de caída para verificar anclajes y montaje de componentes. Grabar en video.',
    startDate: '2026-10-24T10:00:00-03:00',
    endDate: '2026-10-24T13:00:00-03:00',
    category: EventCategory.HARDWARE_TEST,
    location: 'Laboratorio - Universidad Austral',
    isMilestone: false,
    ownerId: 'joaquin',
  },
  {
    id: 'ev-paraglider',
    title: 'Primer ensayo de despliegue del paraglider',
    description: 'Suelta desde altura con payload de masa equivalente.',
    startDate: '2026-11-07T09:00:00-03:00',
    endDate: '2026-11-07T13:00:00-03:00',
    category: EventCategory.PARACHUTE_TEST,
    location: 'Campus Pilar',
    isMilestone: true,
    ownerId: 'joaquin',
  },
  {
    id: 'ev-pdr',
    title: 'Entrega PDR (Preliminary Design Review)',
    description: 'Documento de diseño preliminar para la CONAE.',
    startDate: '2026-11-20T23:59:00-03:00',
    endDate: '2026-11-20T23:59:00-03:00',
    category: EventCategory.CONAE_DELIVERY,
    location: 'Plataforma CONAE',
    isMilestone: true,
    ownerId: 'bautista',
  },
  {
    id: 'ev-integration',
    title: 'Integración en banco: aviónica + energía',
    startDate: '2026-11-28T14:00:00-03:00',
    endDate: '2026-11-28T19:00:00-03:00',
    category: EventCategory.INTEGRATION,
    location: 'Laboratorio - Universidad Austral',
    isMilestone: false,
    ownerId: 'mariapaz',
  },
];

export const MOCK_REPORTS: OrbitReport[] = [
  {
    id: 'rep-005',
    title: 'Minuta reunión semanal #12',
    subtitle: 'Estado de subsistemas y próximos ensayos',
    category: ReportCategory.MEETING_MINUTES,
    status: ReportStatus.DRAFT,
    subsystem: 'General & Gestión',
    authorId: 'joaquin',
    contentMarkdown:
      'Asistentes: Bautista, María Paz, Joaquín.\n\n- Se revisó el presupuesto de masa preliminar.\n- Se definió fecha tentativa para el drop test.\n- Pendiente: cotizar celdas 18650.',
    nextSteps: 'Cerrar fecha del drop test y comprar celdas para la prueba de autonomía.',
    attachmentsCount: 0,
    createdAt: '2026-09-29T22:10:00-03:00',
    updatedAt: '2026-09-29T22:10:00-03:00',
  },
  {
    id: 'rep-004',
    title: 'Selección de celdas 18650 y autonomía de 2 h',
    subtitle: 'Alternativas a LiPo (prohibidas por reglamento)',
    category: ReportCategory.INVESTIGATION,
    status: ReportStatus.IN_REVIEW,
    subsystem: 'Energía',
    authorId: 'mariapaz',
    contentMarkdown:
      'El reglamento prohíbe baterías LiPo y exige al menos 2 h de operación. Se comparan celdas 18650 en empaque metálico según capacidad, masa y corriente máxima.',
    objective: 'Elegir una configuración de celdas que cubra 2 h con margen y respete el presupuesto de masa.',
    findings: 'Consumo estimado a validar en banco. Ver planilla adjunta.',
    attachmentsCount: 1,
    createdAt: '2026-09-25T18:30:00-03:00',
    updatedAt: '2026-09-27T11:05:00-03:00',
  },
  {
    id: 'rep-003',
    title: 'Mecanismos de liberación del huevo a 2 m',
    subtitle: 'Relevamiento de soluciones de equipos anteriores',
    category: ReportCategory.INVESTIGATION,
    status: ReportStatus.IN_REVIEW,
    subsystem: 'Mecanismo de carga (huevo)',
    flightStage: FlightStage.EGG_RELEASE_2M,
    authorId: 'joaquin',
    contentMarkdown:
      'Se relevan mecanismos de retención y liberación (servo, electroimán, hilo térmico) y cómo detectar los 2 m sobre el suelo.',
    objective: 'Definir candidatos para el mecanismo de liberación y el sensor de altura de activación.',
    attachmentsCount: 0,
    createdAt: '2026-09-18T20:00:00-03:00',
    updatedAt: '2026-09-22T09:40:00-03:00',
  },
  {
    id: 'rep-002',
    title: 'Presupuesto de masa preliminar',
    subtitle: 'Objetivo 1000 g ± 10 g (CanSat + contenedor)',
    category: ReportCategory.PDR_CDR,
    status: ReportStatus.DRAFT,
    subsystem: 'Estructura & Mecánica',
    authorId: 'mariapaz',
    contentMarkdown: 'Primer reparto de masa por subsistema. Se completa a medida que se eligen componentes.',
    attachmentsCount: 1,
    createdAt: '2026-09-10T17:00:00-03:00',
    updatedAt: '2026-09-15T12:00:00-03:00',
  },
  {
    id: 'rep-001',
    title: 'Resumen de la competencia CanSat 2025',
    subtitle: 'Fases, entregables, requisitos y ensayos obligatorios',
    category: ReportCategory.INVESTIGATION,
    status: ReportStatus.APPROVED,
    subsystem: 'General & Gestión',
    authorId: 'bautista',
    contentMarkdown:
      'Concepto de operaciones: ascenso como nariz del cohete, separación en apogeo con paracaídas (≤ 15 m/s), liberación del payload al 80% del apogeo con paraglider (~5 m/s), liberación del huevo a 2 m y baliza audible al aterrizar.',
    objective: 'Entender qué se va a pedir, los entregables, las fases y los ensayos necesarios.',
    findings:
      'Masa 1000 g ± 10 g. Ø136 mm × 250 mm. Operación ≥ 2 h, sin LiPo. Telemetría ASCII a 1 Hz por XBee. Ensayos: drop, térmico, vibración y vacío.',
    conclusions: 'El foco está en el control del paraglider y la entrega del huevo. El margen de masa obliga a controlarla desde el diseño.',
    nextSteps: 'Analizar CanSats de años anteriores y empezar la investigación por subsistema.',
    attachmentsCount: 1,
    createdAt: '2026-05-20T12:00:00-03:00',
    updatedAt: '2026-05-20T12:00:00-03:00',
  },
];

export const ENVIRONMENTAL_TESTS: EnvironmentalTest[] = [
  { id: 'drop', name: 'Drop test', spec: '~30 G sobre anclajes y montaje', status: 'scheduled', eventId: 'ev-drop' },
  { id: 'thermal', name: 'Térmico', spec: '60 °C durante 2 h', status: 'pending' },
  { id: 'vibration', name: 'Vibración', spec: '0–233 Hz', status: 'pending' },
  { id: 'vacuum', name: 'Vacío', spec: 'Despliegue por cambio de presión', status: 'pending' },
];

export function getReport(id: string) {
  return MOCK_REPORTS.find((r) => r.id === id);
}

export function upcomingEvents(now = new Date(), limit?: number) {
  const list = MOCK_EVENTS.filter((e) => new Date(e.endDate) >= now).sort(
    (a, b) => +new Date(a.startDate) - +new Date(b.startDate),
  );
  return limit ? list.slice(0, limit) : list;
}
