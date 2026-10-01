'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, FileText, Flag, FlaskConical, Plus } from 'lucide-react';
import { ReportStatus } from '@orbit/shared';
import { Avatar, ButtonLink, Card, CardBody, CardHeader, EmptyState, Notice, PageHeader, ProgressBar, StatusText } from '@/components/orbit/ui';
import { firstName, getMember } from '@/lib/orbit/team';
import { useCurrentUser } from '@/components/orbit/auth/AuthProvider';
import { ENV_TEST_STATUS, EVENT_CATEGORY, REPORT_CATEGORY, REPORT_STATUS } from '@/lib/orbit/labels';
import { ENVIRONMENTAL_TESTS, MOCK_REPORTS, upcomingEvents } from '@/lib/orbit/mock';
import { daysUntil, formatDate, formatRelative, formatTime, greeting } from '@/lib/orbit/format';
import { useNow } from '@/lib/orbit/useNow';

function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-brand-hover">
      {children}
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}

export default function OrbitHomePage() {
  const now = useNow();
  const user = useCurrentUser();
  if (!now) return null;

  const upcoming = upcomingEvents(now);
  const nextMilestone = upcoming.find((e) => e.isMilestone);
  const nextEvents = upcoming.slice(0, 4);
  const recentReports = [...MOCK_REPORTS].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 5);
  const inReview = MOCK_REPORTS.filter((r) => r.status === ReportStatus.IN_REVIEW).length;
  const drafts = MOCK_REPORTS.filter((r) => r.status === ReportStatus.DRAFT).length;
  const testsPassed = ENVIRONMENTAL_TESTS.filter((t) => t.status === 'passed').length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={<span className="capitalize">{formatDate(now.toISOString(), { weekday: 'long', day: 'numeric', month: 'long' })}</span>}
        title={`${greeting(now)}, ${firstName(user.name)}`}
        description="Esto es lo que está pasando en la misión."
        actions={
          <>
            <ButtonLink href="/orbit/calendar" variant="secondary">
              <Calendar className="h-4 w-4" />
              Calendario
            </ButtonLink>
            <ButtonLink href="/orbit/reports/new" variant="primary">
              <Plus className="h-4 w-4" />
              Nuevo informe
            </ButtonLink>
          </>
        }
      />

      <Notice>
        Estás viendo <strong className="font-semibold text-fg">datos de ejemplo</strong>. El calendario y los informes
        todavía no están conectados al servidor.
      </Notice>

      {/* Resumen */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden sm:col-span-2">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/15 blur-3xl" />
          <CardBody className="relative flex h-full flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="apple-label-small inline-flex items-center gap-2 text-brand">
                <Flag className="h-3.5 w-3.5" />
                Próximo hito
              </span>
              {nextMilestone && <span className="text-sm text-fg-subtle">{EVENT_CATEGORY[nextMilestone.category]}</span>}
            </div>
            {nextMilestone ? (
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xl font-bold leading-snug tracking-tight text-fg sm:text-2xl">{nextMilestone.title}</div>
                  <div className="mt-1.5 text-sm capitalize text-fg-muted">{formatDate(nextMilestone.startDate, { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-5xl font-bold tabular-nums tracking-tight text-brand">{daysUntil(nextMilestone.startDate, now)}</div>
                  <div className="apple-label-small text-[10px] text-fg-subtle">días</div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-fg-muted">No hay hitos programados.</p>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <span className="apple-label-small inline-flex items-center gap-2 text-info">
              <FileText className="h-3.5 w-3.5" />
              Informes
            </span>
            <div className="text-4xl font-bold tabular-nums tracking-tight text-fg">{MOCK_REPORTS.length}</div>
            <div className="text-sm text-fg-muted">
              {inReview} en revisión · {drafts} {drafts === 1 ? 'borrador' : 'borradores'}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-3">
            <span className="apple-label-small inline-flex items-center gap-2 text-ok">
              <FlaskConical className="h-3.5 w-3.5" />
              Ensayos ambientales
            </span>
            <div className="text-4xl font-bold tabular-nums tracking-tight text-fg">
              {testsPassed}
              <span className="text-xl text-fg-subtle">/{ENVIRONMENTAL_TESTS.length}</span>
            </div>
            <ProgressBar value={testsPassed} max={ENVIRONMENTAL_TESTS.length} />
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Informes recientes */}
        <Card className="lg:col-span-2">
          <CardHeader icon={FileText} title="Informes recientes" action={<CardLink href="/orbit/reports">Ver todos</CardLink>} />
          {recentReports.length === 0 ? (
            <EmptyState icon={FileText} title="Todavía no hay informes" description="Creá el primero para empezar a documentar la misión." />
          ) : (
            <ul className="divide-y divide-line">
              {recentReports.map((r) => {
                const author = getMember(r.authorId);
                const status = REPORT_STATUS[r.status];
                return (
                  <li key={r.id}>
                    <Link href={`/orbit/reports/${r.id}`} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-fg/[0.04]">
                      <Avatar name={author?.name ?? 'AuSat'} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-base font-semibold text-fg">{r.title}</div>
                        <div className="mt-0.5 truncate text-sm text-fg-subtle">
                          {REPORT_CATEGORY[r.category]} · {author?.shortName ?? 'Equipo'} · {formatRelative(r.updatedAt, now)}
                        </div>
                      </div>
                      <StatusText tone={status.tone}>{status.label}</StatusText>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <div className="space-y-6">
          {/* Próximos eventos */}
          <Card>
            <CardHeader icon={Calendar} title="Próximos eventos" action={<CardLink href="/orbit/calendar">Calendario</CardLink>} />
            {nextEvents.length === 0 ? (
              <EmptyState icon={Calendar} title="Sin eventos próximos" />
            ) : (
              <ul className="divide-y divide-line">
                {nextEvents.map((e) => (
                  <li key={e.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="w-12 shrink-0 rounded-2xl border border-line bg-fg/[0.04] py-1.5 text-center">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-brand">{formatDate(e.startDate, { month: 'short' })}</div>
                      <div className="text-xl font-bold leading-tight tabular-nums text-fg">{new Date(e.startDate).getDate()}</div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-[15px] font-semibold text-fg">{e.title}</span>
                        {e.isMilestone && <Flag className="h-3.5 w-3.5 shrink-0 text-brand" />}
                      </div>
                      <div className="mt-0.5 truncate text-sm text-fg-subtle">
                        {EVENT_CATEGORY[e.category]} · {formatRelative(e.startDate, now)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Ensayos ambientales */}
          <Card>
            <CardHeader icon={FlaskConical} title="Ensayos obligatorios" description="Deben documentarse en video" />
            <ul className="divide-y divide-line">
              {ENVIRONMENTAL_TESTS.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 px-6 py-4">
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold text-fg">{t.name}</div>
                    <div className="mt-0.5 truncate text-sm text-fg-subtle">{t.spec}</div>
                  </div>
                  <StatusText tone={ENV_TEST_STATUS[t.status].tone}>{ENV_TEST_STATUS[t.status].label}</StatusText>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
