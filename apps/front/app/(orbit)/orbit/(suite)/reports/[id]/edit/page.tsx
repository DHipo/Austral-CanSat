'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import { ReportStatus } from '@orbit/shared';
import { ReportEditor } from '@/components/orbit/ReportEditor';
import { ButtonLink, Card, EmptyState } from '@/components/orbit/ui';
import { getReport, type Report } from '@/lib/orbit/reports';

export default function EditReportPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    getReport(id)
      .then((r) => {
        setReport(r);
        setState('ready');
      })
      .catch(() => setState('error'));
  }, [id]);

  if (state === 'loading') {
    return (
      <div className="flex justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand" aria-label="Cargando" />
      </div>
    );
  }

  if (!report || report.status === ReportStatus.OFFICIAL_ARCHIVED) {
    return (
      <Card>
        <EmptyState
          icon={FileQuestion}
          title={report ? 'Este informe está archivado' : 'No se pudo cargar el informe'}
          description={report ? 'Los informes archivados son la versión oficial y no se editan.' : undefined}
          action={<ButtonLink href={report ? `/orbit/reports/${report.id}` : '/orbit/reports'}>Volver</ButtonLink>}
        />
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Link href={`/orbit/reports/${report.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted hover:text-fg">
        <ArrowLeft className="h-3.5 w-3.5" />
        {report.title}
      </Link>
      <ReportEditor report={report} />
    </div>
  );
}
