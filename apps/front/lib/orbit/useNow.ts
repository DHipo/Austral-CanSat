'use client';

import { useEffect, useState } from 'react';

/**
 * Fecha actual del navegador. Devuelve null en el render del servidor para que
 * saludos y fechas relativas no generen diferencias de hidratación.
 */
export function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  return now;
}
