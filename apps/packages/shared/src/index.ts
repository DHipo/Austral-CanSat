/**
 * @orbit/shared - Common DTOs, Enums, Types and Interfaces
 * AuSat (Universidad Austral) - CanSat CONAE 2026 Project
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum UserRole {
  LEAD = 'LEAD',
  AVIONICS = 'AVIONICS',
  FLIGHT_DYNAMICS = 'FLIGHT_DYNAMICS',
  ADMIN = 'ADMIN',
}

export enum EventCategory {
  HARDWARE_TEST = 'HARDWARE_TEST',
  CONAE_DELIVERY = 'CONAE_DELIVERY',
  PARACHUTE_TEST = 'PARACHUTE_TEST',
  MEETING = 'MEETING',
  INTEGRATION = 'INTEGRATION',
}

export enum FlightStage {
  PAD_IDLE = 'PAD_IDLE',
  POWERED_ASCENT = 'POWERED_ASCENT',
  APOGEE_EJECTION = 'APOGEE_EJECTION',
  PARACHUTE_DESCENT = 'PARACHUTE_DESCENT',
  PARAGLIDER_GLIDE = 'PARAGLIDER_GLIDE',
  EGG_RELEASE_2M = 'EGG_RELEASE_2M',
  TOUCHDOWN_RECOVERY = 'TOUCHDOWN_RECOVERY',
}

export enum ReportCategory {
  INVESTIGATION = 'INVESTIGATION',
  PDR_CDR = 'PDR_CDR',
  MEETING_MINUTES = 'MEETING_MINUTES',
  ENVIRONMENTAL_TEST = 'ENVIRONMENTAL_TEST',
  TELEMETRY_LOG = 'TELEMETRY_LOG',
}

export enum ReportStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  OFFICIAL_ARCHIVED = 'OFFICIAL_ARCHIVED',
}

export enum SubsystemType {
  AVIONICS = 'AVIONICS',
  RECOVERY_AERODYNAMICS = 'RECOVERY_AERODYNAMICS',
  STRUCTURE_MECHANISM = 'STRUCTURE_MECHANISM',
  FLIGHT_SOFTWARE = 'FLIGHT_SOFTWARE',
  GENERAL_MISSION = 'GENERAL_MISSION',
}

// ============================================================================
// USER & AUTHENTICATION INTERFACES
// ============================================================================

export interface UserProfileDto {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  career: string;
  subsystem: SubsystemType;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthSessionDto {
  authenticated: boolean;
  user: UserProfileDto;
}

// ============================================================================
// CALENDAR INTERFACES
// ============================================================================

export interface CalendarEventDto {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO 8601
  endDate: string;   // ISO 8601
  category: EventCategory;
  location?: string;
  isMilestone: boolean;
  createdById: string;
  createdByName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCalendarEventDto {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  category: EventCategory;
  location?: string;
  isMilestone?: boolean;
}

export interface UpdateCalendarEventDto {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  category?: EventCategory;
  location?: string;
  isMilestone?: boolean;
}

// ============================================================================
// REPORTS & ATTACHMENTS INTERFACES
// ============================================================================

export interface ReportAttachmentDto {
  id: string;
  reportId: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  createdAt: string;
}

export interface ReportDto {
  id: string;
  title: string;
  subtitle?: string;
  category: ReportCategory;
  subsystem: SubsystemType;
  flightStage?: FlightStage;
  contentMarkdown: string;
  objective?: string;
  findings?: string;
  conclusions?: string;
  nextSteps?: string;
  status: ReportStatus;
  revisionHash: string; // SHA-256 integrity hash
  authorId: string;
  authorName?: string;
  authorRole?: string;
  attachments: ReportAttachmentDto[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportDto {
  title: string;
  subtitle?: string;
  category: ReportCategory;
  subsystem: SubsystemType;
  flightStage?: FlightStage;
  contentMarkdown: string;
  objective?: string;
  findings?: string;
  conclusions?: string;
  nextSteps?: string;
  status?: ReportStatus;
}

export interface UpdateReportDto {
  title?: string;
  subtitle?: string;
  category?: ReportCategory;
  subsystem?: SubsystemType;
  flightStage?: FlightStage;
  contentMarkdown?: string;
  objective?: string;
  findings?: string;
  conclusions?: string;
  nextSteps?: string;
  status?: ReportStatus;
}

// ============================================================================
// TELEMETRY & FLIGHT SPECIFICATIONS
// ============================================================================

export interface FlightTelemetrySample {
  timestampMs: number;
  altitudeMeters: number;
  velocityVerticalMs: number;
  accelX: number;
  accelY: number;
  accelZ: number;
  gyroPitch: number;
  gyroRoll: number;
  gyroYaw: number;
  pressureHpa: number;
  temperatureCelsius: number;
  gpsLat: number;
  gpsLng: number;
  batteryVolts: number;
  currentStage: FlightStage;
  eggSensorDistanceCm: number;
  paragliderLeftServoDeg: number;
  paragliderRightServoDeg: number;
}

// ============================================================================
// NEWSLETTER & PUBLIC SUBSCRIPTIONS
// ============================================================================

export interface NewsletterSubscribeDto {
  email: string;
  fullName?: string;
  institution?: string;
}

export interface NewsletterSubscriptionResponseDto {
  success: boolean;
  message: string;
  subscriptionId?: string;
}
