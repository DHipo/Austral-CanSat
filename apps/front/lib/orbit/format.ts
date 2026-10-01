const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function daysUntil(iso: string, now = new Date()): number {
  return Math.round((startOfDay(new Date(iso)) - startOfDay(now)) / DAY_MS);
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  return new Date(iso).toLocaleDateString('es-AR', opts);
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

export function formatRelative(iso: string, now = new Date()): string {
  const days = daysUntil(iso, now);
  if (days === 0) return 'hoy';
  if (days === 1) return 'mañana';
  if (days === -1) return 'ayer';
  if (days > 1) return `en ${days} días`;
  if (days > -30) return `hace ${-days} días`;
  return formatDate(iso);
}

export function greeting(now = new Date()): string {
  const h = now.getHours();
  if (h < 12) return 'Buen día';
  if (h < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

export function isSameDay(a: Date, b: Date): boolean {
  return startOfDay(a) === startOfDay(b);
}
