'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FileQuestion } from 'lucide-react';
import { ReportPrintView } from '@/components/orbit/ReportPrintView';
import { ButtonLink, Card, EmptyState } from '@/components/orbit/ui';
import { getReport } from '@/lib/orbit/mock';
import { getMember } from '@/lib/orbit/team';

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const report = getReport(id);

  if (!report) {
    return (
      <Card>
        <EmptyState
          icon={FileQuestion}
          title="Informe no encontrado"
          description={`No existe un informe con ID ${id}.`}
          action={<ButtonLink href="/orbit/reports">Volver a informes</ButtonLink>}
        />
      </Card>
    );
  }

  const author = getMember(report.authorId);

  return (
    <ReportPrintView
      onBack={() => router.push('/orbit/reports')}
      report={{
        ...report,
        // TODO(Fase 4): el hash lo calcula el backend al guardar.
        revisionHash: 'pendiente (se genera al guardar en el servidor)',
        author: { name: author?.name ?? 'Equipo AuSat', role: author?.role ?? '', email: author?.email },
      }}
    />
  );
}
