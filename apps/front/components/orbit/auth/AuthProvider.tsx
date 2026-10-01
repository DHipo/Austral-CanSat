'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { UserRole } from '@orbit/shared';
import { apiFetch } from '../../../lib/api';

export interface OrbitUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  career: string;
  subsystem: string;
  avatarUrl?: string | null;
}

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextValue {
  user: OrbitUser | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<OrbitUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let cancelled = false;
    apiFetch<OrbitUser>('/auth/me')
      .then((me) => {
        if (cancelled) return;
        setUser(me);
        setStatus('authenticated');
      })
      .catch(() => {
        if (cancelled) return;
        setUser(null);
        setStatus('unauthenticated');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiFetch<{ user: OrbitUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setUser(res.user);
    setStatus('authenticated');
  }, []);

  const logout = useCallback(async () => {
    await apiFetch('/auth/logout', { method: 'POST' }).catch(() => undefined);
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  return <AuthContext.Provider value={{ user, status, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}

/** Usuario autenticado. Solo usar dentro de la suite protegida. */
export function useCurrentUser(): OrbitUser {
  const { user } = useAuth();
  if (!user) throw new Error('useCurrentUser requiere una sesión activa');
  return user;
}
