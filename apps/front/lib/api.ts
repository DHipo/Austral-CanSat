/**
 * Cliente HTTP de Orbit. Siempre same-origin (`/api`, que Next reescribe al
 * backend) para que la cookie HttpOnly de sesión quede en el dominio del front
 * y el middleware pueda verla.
 */
const API_BASE = '/api';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      credentials: 'include',
      headers: {
        ...(init.body && !(init.body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}),
        ...init.headers,
      },
    });
  } catch {
    throw new ApiError(0, 'No se pudo conectar con el servidor de Orbit.');
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = Array.isArray(data?.message) ? data.message.join(' ') : data?.message;
    // El proxy de Next responde 500 sin cuerpo JSON cuando el backend está caído.
    if (res.status >= 500 && !message) throw new ApiError(res.status, 'No se pudo conectar con el servidor de Orbit.');
    throw new ApiError(res.status, message || `Error ${res.status}`);
  }
  return data as T;
}
