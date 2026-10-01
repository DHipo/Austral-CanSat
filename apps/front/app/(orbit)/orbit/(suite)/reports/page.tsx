'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FileText, Paperclip, Plus, Search } from 'lucide-react';
import { ReportCategory, ReportStatus } from '@orbit/shared';
import { Avatar, ButtonLink, Card, EmptyState, Input, Notice, PageHeader, Select, StatusText } from '@/components/orbit/ui';
import { REPORT_CATEGORY, REPORT_STATUS } from '@/lib/orbit/labels';
import { MOCK_REPORTS } from '@/lib/orbit/mock';
import { getMember } from '@/lib/orbit/team';
import { formatDate } from '@/lib/orbit/format';

export default function OrbitReportsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ReportCategory | ''>('');
  const [status, setStatus] = useState<ReportStatus | ''>('');

  const reports = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_REPORTS.filter(
      (r) =>
        (!category || r.category === category) &&
        (!status || r.status === status) &&
        (!q || `${r.title} ${r.subtitle ?? ''} ${r.subsystem}`.toLowerCase().includes(q)),
    ).sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
  }, [query, category, status]);

  const hasFilters = !!(query || category || status);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Documentación técnica"
        title="Informes"
        description="Investigaciones, minutas, ensayos y entregables PDR/CDR del equipo."
        actions={
          <ButtonLink href="/orbit/reports/new" variant="primary">
            <Plus className="h-4 w-4" />
            Nuevo informe
          </ButtonLink>
        }
      />

      <Notice>Informes de ejemplo. El guardado real llega cuando se conecte la API de informes.</Notice>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título o subsistema…"
            className="pl-11"
            aria-label="Buscar informes"
          />
        </div>
        <Select value={category} onChange={(e) => setCategory(e.target.value as ReportCategory | '')} className="sm:w-56" aria-label="Categoría">
          <option value="">Todas las categorías</option>
          {Object.entries(REPORT_CATEGORY).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select value={status} onChange={(e) => setStatus(e.target.value as ReportStatus | '')} className="sm:w-48" aria-label="Estado">
          <option value="">Todos los estados</option>
          {Object.entries(REPORT_STATUS).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <Card>
        {reports.length === 0 ? (
          <EmptyState
            icon={FileText}
            title={hasFilters ? 'Ningún informe coincide' : 'Todavía no hay informes'}
            description={hasFilters ? 'Probá con otros filtros.' : 'Creá el primero para empezar a documentar la misión.'}
          />
        ) : (
          <ul className="divide-y divide-line">
            {reports.map((r) => {
              const author = getMember(r.authorId);
              const st = REPORT_STATUS[r.status];
              return (
                <li key={r.id}>
                  <Link href={`/orbit/reports/${r.id}`} className="flex items-start gap-4 px-6 py-5 transition-colors hover:bg-fg/[0.04] sm:items-center">
                    <Avatar name={author?.name ?? 'AuSat'} className="mt-0.5 sm:mt-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-base font-semibold text-fg sm:text-lg">{r.title}</span>
                        {r.attachmentsCount > 0 && (
                          <span className="inline-flex shrink-0 items-center gap-0.5 text-xs text-fg-subtle">
                            <Paperclip className="h-3 w-3" />
                            {r.attachmentsCount}
                          </span>
                        )}
                      </div>
                      {r.subtitle && <div className="mt-0.5 truncate text-sm text-fg-muted">{r.subtitle}</div>}
                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-fg-subtle">
                        <span>{REPORT_CATEGORY[r.category]}</span>
                        <span>·</span>
                        <span>{r.subsystem}</span>
                        <span>·</span>
                        <span>{author?.shortName ?? 'Equipo'}</span>
                        <span>·</span>
                        <span>{formatDate(r.updatedAt)}</span>
                      </div>
                    </div>
                    <StatusText tone={st.tone}>{st.label}</StatusText>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
