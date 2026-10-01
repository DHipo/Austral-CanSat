'use client';

import React, { useState } from 'react';
import { Eye, FileText, Paperclip, ShieldCheck, Upload, X } from 'lucide-react';
import { FlightStage, ReportCategory, ReportStatus } from '@orbit/shared';
import { FLIGHT_STAGE, REPORT_CATEGORY, SUBSYSTEMS } from '../../lib/orbit/labels';
import { roleLabel } from '../../lib/orbit/team';
import { useCurrentUser } from './auth/AuthProvider';
import { ReportPrintView } from './ReportPrintView';
import { Button, Card, CardBody, CardHeader, Field, Input, Notice, PageHeader, Select, Textarea } from './ui';

const MAX_FILE_MB = 25;

export const ReportEditor: React.FC = () => {
  const user = useCurrentUser();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ReportCategory>(ReportCategory.INVESTIGATION);
  const [subsystem, setSubsystem] = useState<string>(SUBSYSTEMS[0]);
  const [flightStage, setFlightStage] = useState<FlightStage | ''>('');
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [objective, setObjective] = useState('');
  const [findings, setFindings] = useState('');
  const [conclusions, setConclusions] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isPreviewingPrint, setIsPreviewingPrint] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) => f.size <= MAX_FILE_MB * 1024 * 1024);
    setAttachments((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  if (isPreviewingPrint) {
    return (
      <ReportPrintView
        onBack={() => setIsPreviewingPrint(false)}
        report={{
          id: 'borrador',
          title: title || 'Informe sin título',
          subtitle,
          category,
          subsystem,
          flightStage: flightStage || undefined,
          contentMarkdown: contentMarkdown || 'Sin contenido.',
          objective,
          findings,
          conclusions,
          nextSteps,
          status: ReportStatus.DRAFT,
          revisionHash: 'pendiente (se genera al guardar en el servidor)',
          createdAt: new Date().toISOString(),
          author: { name: user.name, role: roleLabel(user), email: user.email },
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Documentación técnica"
        title="Nuevo informe"
        description="Documentá investigaciones, ensayos y minutas con el formato oficial del equipo."
        actions={
          <>
            <Button variant="secondary" onClick={() => setIsPreviewingPrint(true)}>
              <Eye className="h-4 w-4" />
              Vista previa
            </Button>
            <Button variant="primary" disabled title="Disponible cuando se conecte la API de informes">
              Guardar
            </Button>
          </>
        }
      />

      <Notice>El guardado todavía no está conectado al servidor. Podés redactar y usar la vista previa para imprimir.</Notice>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contenido */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardBody className="space-y-4">
              <Field label="Título" htmlFor="r-title">
                <Input
                  id="r-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Prueba de autonomía con celdas 18650"
                />
              </Field>
              <Field label="Subtítulo / alcance" htmlFor="r-subtitle">
                <Input
                  id="r-subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ej: Descarga continua de 2 h con carga simulada"
                />
              </Field>
            </CardBody>
          </Card>

          <Card>
            <CardHeader icon={FileText} title="Desarrollo" description="Procedimiento, instrumental y metodología. Admite Markdown." />
            <CardBody>
              <Textarea
                rows={12}
                value={contentMarkdown}
                onChange={(e) => setContentMarkdown(e.target.value)}
                placeholder="Describí el procedimiento experimental…"
                className="font-mono text-sm"
                aria-label="Desarrollo"
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4">
              <Field label="Objetivo" htmlFor="r-objective">
                <Textarea id="r-objective" rows={3} value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="Qué se busca validar o responder." />
              </Field>
              <Field label="Mediciones y hallazgos" htmlFor="r-findings">
                <Textarea id="r-findings" rows={3} value={findings} onChange={(e) => setFindings(e.target.value)} placeholder="Datos clave, curvas, resultados." />
              </Field>
              <Field label="Conclusiones" htmlFor="r-conclusions">
                <Textarea id="r-conclusions" rows={3} value={conclusions} onChange={(e) => setConclusions(e.target.value)} />
              </Field>
              <Field label="Próximos pasos" htmlFor="r-next">
                <Textarea id="r-next" rows={3} value={nextSteps} onChange={(e) => setNextSteps(e.target.value)} />
              </Field>
            </CardBody>
          </Card>
        </div>

        {/* Metadatos */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Detalles" />
            <CardBody className="space-y-4">
              <Field label="Categoría" htmlFor="r-category">
                <Select id="r-category" value={category} onChange={(e) => setCategory(e.target.value as ReportCategory)}>
                  {Object.entries(REPORT_CATEGORY).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Subsistema" htmlFor="r-subsystem">
                <Select id="r-subsystem" value={subsystem} onChange={(e) => setSubsystem(e.target.value)}>
                  {SUBSYSTEMS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Etapa de vuelo" htmlFor="r-stage" hint="Opcional. Solo si el informe aplica a una etapa concreta.">
                <Select id="r-stage" value={flightStage} onChange={(e) => setFlightStage(e.target.value as FlightStage | '')}>
                  <option value="">No aplica</option>
                  {Object.entries(FLIGHT_STAGE).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Field>
            </CardBody>
          </Card>

          <Card>
            <CardHeader icon={Paperclip} title="Adjuntos" description={`CSV, imágenes o PDF · hasta ${MAX_FILE_MB} MB`} />
            <CardBody className="space-y-3">
              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line px-4 py-8 text-center transition-colors hover:border-brand/50">
                <Upload className="mb-1.5 h-5 w-5 text-fg-subtle transition-colors group-hover:text-brand" />
                <span className="text-sm font-semibold text-fg-muted">Elegí archivos</span>
                <input type="file" multiple accept=".csv,.txt,.png,.jpg,.jpeg,.pdf,.json" onChange={handleFileUpload} className="hidden" />
              </label>
              {attachments.length > 0 && (
                <ul className="space-y-1.5">
                  {attachments.map((file, idx) => (
                    <li key={idx} className="flex items-center gap-2 rounded-xl border border-line bg-fg/[0.04] px-3 py-2.5 text-sm">
                      <span className="min-w-0 flex-1 truncate text-fg">{file.name}</span>
                      <span className="shrink-0 text-fg-subtle">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      <button
                        onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== idx))}
                        className="shrink-0 rounded p-0.5 text-fg-subtle hover:text-err cursor-pointer"
                        aria-label={`Quitar ${file.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
              <p className="text-sm leading-relaxed text-fg-muted">
                Al guardar, el servidor calcula un hash SHA-256 de la revisión que se imprime en el documento oficial.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
