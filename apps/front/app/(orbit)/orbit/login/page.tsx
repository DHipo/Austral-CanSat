'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle, ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '@/components/orbit/auth/AuthProvider';
import { FullScreenLoader } from '@/components/orbit/auth/RequireAuth';
import { Button, Field, Input } from '@/components/orbit/ui';
import { ApiError } from '@/lib/api';

// Solo se permite volver a rutas de la suite (evita redirecciones abiertas).
function safeNext(next: string | null): string {
  return next && next.startsWith('/orbit') && !next.startsWith('/orbit/login') ? next : '/orbit';
}

function LoginForm() {
  const { status, login } = useAuth();
  const router = useRouter();
  const next = safeNext(useSearchParams().get('next'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') router.replace(next);
  }, [status, next, router]);

  if (status !== 'unauthenticated') return <FullScreenLoader />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión.');
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4 py-12 font-sans text-fg">
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="animate-ambient-mesh absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-halo-brand blur-[140px]" />
        <div className="animate-ambient-mesh-slow absolute -bottom-48 -left-24 h-[480px] w-[480px] rounded-full bg-halo-blue blur-[140px]" />
      </div>

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-fg">
          <ArrowLeft className="h-4 w-4" />
          Volver al sitio
        </Link>

        <div className="orbit-card rounded-[32px] p-8 sm:p-10">
          <div className="mb-8 text-center">
            <img
              src="/logo.png"
              alt="AuSat"
              className="mx-auto mb-5 h-16 w-16 object-contain drop-shadow-[0_2px_16px_rgba(255,122,26,0.4)]"
            />
            <div className="apple-label-small mb-3 text-brand">Acceso del equipo</div>
            <h1 className="text-3xl font-bold tracking-tight">Ingresá a Orbit</h1>
            <p className="mt-2 text-base text-fg-muted">Centro de control técnico de AuSat.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Email institucional" htmlFor="login-email">
              <Input
                id="login-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@austral.edu.ar"
              />
            </Field>
            <Field label="Contraseña" htmlFor="login-password">
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            {error && (
              <div role="alert" className="flex items-start gap-2.5 rounded-2xl border border-err/30 bg-err/10 px-4 py-3 text-sm text-err">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" variant="primary" disabled={submitting} className="mt-2 h-12 w-full text-base">
              <Lock className="h-4 w-4" />
              {submitting ? 'Ingresando…' : 'Ingresar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function OrbitLoginPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <LoginForm />
    </Suspense>
  );
}
