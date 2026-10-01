import { UserRole } from '@orbit/shared';
import { USER_ROLE } from './labels';

export interface OrbitMember {
  id: string;
  name: string;
  shortName: string;
  email: string;
  role: string;
  userRole: UserRole;
  career: string;
}

// Equipo técnico con acceso a Orbit. Fuente única para el front.
export const ORBIT_TEAM: OrbitMember[] = [
  {
    id: 'bautista',
    name: "Bautista D'Hipólito",
    shortName: 'Bautista',
    email: 'bdhipolito@austral.edu.ar',
    role: 'Líder & Sistemas',
    userRole: UserRole.LEAD,
    career: 'Ingeniería Informática (3er año)',
  },
  {
    id: 'mariapaz',
    name: 'María Paz Fogliato',
    shortName: 'María Paz',
    email: 'mfogliato@austral.edu.ar',
    role: 'Aviónica & Hardware',
    userRole: UserRole.AVIONICS,
    career: 'Ingeniería Informática (2do año)',
  },
  {
    id: 'joaquin',
    name: 'Joaquín Viani',
    shortName: 'Joaquín',
    email: 'jviani@austral.edu.ar',
    role: 'Dinámica & Vuelo',
    userRole: UserRole.FLIGHT_DYNAMICS,
    career: 'Ingeniería Informática (1er año)',
  },
];

export function getMember(id: string): OrbitMember | undefined {
  return ORBIT_TEAM.find((m) => m.id === id);
}

export function roleLabel(user: { email: string; role: UserRole }): string {
  return ORBIT_TEAM.find((m) => m.email === user.email.toLowerCase())?.role ?? USER_ROLE[user.role] ?? user.role;
}

/** Nombre corto del equipo ("María Paz"), o el primer nombre si no es del equipo. */
export function shortName(user: { name: string; email: string }): string {
  return ORBIT_TEAM.find((m) => m.email === user.email.toLowerCase())?.shortName ?? firstName(user.name);
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

export function initials(name: string): string {
  return name
    .replace(/[^\p{L}\s]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('');
}
