'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FileQuestion, Pencil, Trash2 } from 'lucide-react';
import { ReportStatus } from '@orbit/shared';
import { ReportPrintView } from '@/components/orbit/ReportPrintView';
import { Button, ButtonLink, Card, EmptyState, Notice } from '@/components/orbit/ui';
import { ApiError } from '@/lib/api';
import { STATUS_ACTIONS, deleteReport, getReport, updateReport, type Report } from '@/lib/orbit/reports';
import { roleLabel } from '@/lib/orbit/team';

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'not-found' | 'error'>('loading');
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getReport(id)
      .then((r) => {
        if (cancelled) return;
        setReport(r);
        setState('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        setState(err instanceof ApiError && err.status === 404 ? 'not-found' : 'error');
        setError(err instanceof Error ? err.message : null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const changeStatus = async (to: ReportStatus) => {
    if (!report) return;
    setBusy(true);
    setError(null);
    try {
      setReport(await updateReport(report.id, { status: to }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cambiar el estado.');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!report) return;
    setBusy(true);
    setError(null);
    try {
      await deleteReport(report.id);
      router.push('/orbit/reports');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar el informe.');
      setBusy(false);
    }
  };

  if (state === 'loading') {
    return (
      <div className="flex justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand" aria-label="Cargando" />
      </div>
    );
  }

  if (state !== 'ready' || !report) {
    return (
      <Card>
        <EmptyState
          icon={FileQuestion}
          title={state === 'not-found' ? 'Informe no encontrado' : 'No se pudo cargar el informe'}
          description={state === 'not-found' ? 'Puede que se haya eliminado.' : error ?? undefined}
          action={<ButtonLink href="/orbit/reports">Volver a informes</ButtonLink>}
        />
      </Card>
    );
  }

  const archived = report.status === ReportStatus.OFFICIAL_ARCHIVED;

  const actions = confirmDelete ? (
    <>
      <span className="text-sm text-fg-muted">¿Eliminar este informe y sus adjuntos?</span>
      <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(false)} disabled={busy}>
        No
      </Button>
      <Button size="sm" variant="danger" onClick={handleDelete} disabled={busy}>
        Sí, eliminar
      </Button>
    </>
  ) : (
    <>
      {STATUS_ACTIONS[report.status].map((a) => (
        <Button key={a.to} size="sm" variant="secondary" onClick={() => changeStatus(a.to)} disabled={busy}>
          {a.label}
        </Button>
      ))}
      {!archived && (
        <ButtonLink href={`/orbit/reports/${report.id}/edit`} size="sm" variant="secondary">
          <Pencil className="h-3.5 w-3.5" />
          Editar
        </ButtonLink>
      )}
      <Button size="sm" variant="ghost" className="text-err hover:text-err" onClick={() => setConfirmDelete(true)} disabled={busy}>
        <Trash2 className="h-3.5 w-3.5" />
        Eliminar
      </Button>
    </>
  );

  return (
    <div className="space-y-4">
      {archived && <Notice className="no-print">Informe archivado: es la versión oficial y ya no se puede editar.</Notice>}
      {error && (
        <p role="alert" className="no-print rounded-2xl border border-err/30 bg-err/10 px-5 py-3.5 text-sm font-medium text-err">
          {error}
        </p>
      )}
      <ReportPrintView
        onBack={() => router.push('/orbit/reports')}
        backLabel="Informes"
        actions={actions}
        report={{
          ...report,
          author: { name: report.author.name, role: roleLabel(report.author), email: report.author.email },
        }}
      />
    </div>
  );
}
